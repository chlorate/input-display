import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {Controller} from "./controller";

export const ControllerComponent = connect(["gamepad"], ({gamepad}: {gamepad: Controller}) => {
	let buttonTable = (
		<p class="mb-4">
			No buttons detected.
		</p>
	);
	if (gamepad.buttons.length) {
		const rows = gamepad.buttons.map((button, i) => (
			<tr>
				<td>{button.name}</td>
				{booleanCell(button.pressed)}
				{integerCell(button.presses)}
				{integerCell(button.mashSpeed)}
				{integerCell(button.bestMashSpeed)}
			</tr>
		));
		buttonTable = (
			<table class="table table-bordered table-sm table-stats-buttons mb-4">
				<thead>
					<tr>
						<th>Name</th>
						<th class="text-center">Pressed</th>
						<th class="text-right"># presses</th>
						<th class="text-right">Mash speed</th>
						<th class="text-right">Mash best</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		);
	}

	let axesTable = (
		<p class="m-0">
			No axes detected.
		</p>
	);
	if (gamepad.axes.length) {
		const rows = gamepad.axes.map((axis, i) => (
			<tr>
				<td>Axis {i + 1}</td>
				{floatCell(axis.value)}
				{floatCell(axis.neutralValue)}
				{floatCell(axis.minValue)}
				{floatCell(axis.maxValue)}
			</tr>
		));
		axesTable = (
			<table class="table table-bordered table-sm table-stats-axes m-0">
				<thead>
					<tr>
						<th>Name</th>
						<th class="text-right">Value</th>
						<th class="text-right">Neutral</th>
						<th class="text-right">Min</th>
						<th class="text-right">Max</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		);
	}

	return (
		<section>
			<button class="btn btn-danger mb-4" onClick={linkEvent(gamepad, reset)}>
				Reset
			</button>

			<h2 class="h5">
				Buttons
			</h2>
			{buttonTable}

			<h2 class="h5">
				Axes
			</h2>
			{axesTable}
		</section>
	);
});

function booleanCell(value: boolean): any {
	return (
		<td class={`table-${value ? "success" : "danger"} text-center`}>
			{value ? "Yes" : "No"}
		</td>
	);
}

function floatCell(value: number | undefined): any {
	return (
		<td class="text-right">
			{value === undefined ? <span class="text-muted">None</span> : value.toFixed(3)}
		</td>
	);
}

function integerCell(value: number): any {
	return (
		<td class="text-right">
			{value}
		</td>
	);
}

function reset(controller: Controller) {
	controller.resetButtons();
	controller.resetAxes();
}
