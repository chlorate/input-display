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
			<div class="scroll">
				<table class="table table-sm table-controller-buttons">
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
			</div>
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
			<div class="scroll m-0">
				<table class="table table-sm table-controller-axes">
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
			</div>
		);
	}

	return (
		<section>
			{gamepad.id !== undefined && [
				<h2 class="h4">
					General
				</h2>,
				<table class="table table-sm table-controller-general">
					<tr>
						<th>ID</th>
						<td>{gamepad.id}</td>
					</tr>
					{gamepad.alias !== undefined &&
						<tr>
							<th>Alias</th>
							<td>{gamepad.alias}</td>
						</tr>
					}
					{gamepad.mapping !== undefined &&
						<tr>
							<th>Mapping</th>
							<td>{gamepad.mapping === "" ? <span class="text-muted">None</span> : gamepad.mapping}</td>
						</tr>
					}
					{gamepad.timestamp !== undefined &&
						<tr>
							<th>Timestamp</th>
							<td>{gamepad.timestamp}</td>
						</tr>
					}
				</table>,
			]}

			<h2 class="h4">
				Buttons
				{gamepad.buttons.length > 0 &&
					<button
						class="btn btn-warning btn-sm float-right"
						onClick={linkEvent(gamepad, handleClickResetButtons)}
					>
						Reset
					</button>
				}
			</h2>
			{buttonTable}

			<h2 class="h4">
				Axes
				{gamepad.axes.length > 0 &&
					<button
						class="btn btn-warning btn-sm float-right"
						onClick={linkEvent(gamepad, handleClickResetAxes)}
					>
						Reset
					</button>
				}
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

function handleClickResetButtons(controller: Controller) {
	controller.resetButtons();
}

function handleClickResetAxes(controller: Controller) {
	controller.resetAxes();
}
