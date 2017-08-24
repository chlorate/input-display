import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {Gamepad} from "./gamepad";

export const StatsComponent = connect(["gamepad"], ({gamepad}: {gamepad: Gamepad}) => {
	let buttonTable = (
		<p class="mb-4">
			No buttons found.
		</p>
	);
	if (gamepad.buttons.length) {
		let rows = gamepad.buttons.map((button, i) => (
			<tr>
				<td class="text-center">
					{button.name}
				</td>
				<td class={`table-${button.pressed ? "success" : "danger"} text-center`}>
					{button.pressed ? "Yes" : "No"}
				</td>
				<td class="text-right">
					{button.presses}
				</td>
				<td class="text-right">
					{button.mashSpeed}
				</td>
				<td class="text-right">
					{button.bestMashSpeed}
				</td>
			</tr>
		));
		buttonTable = (
			<table class="table table-bordered table-sm mb-4 id-table-stats-buttons">
				<thead>
					<tr class="text-center">
						<th>Name</th>
						<th>Pressed</th>
						<th>Total presses</th>
						<th>Mash speed</th>
						<th>Best<br />mash speed</th>
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
			No axes found.
		</p>
	);
	if (gamepad.axes.length) {
		let rows = gamepad.axes.map((axis, i) => (
			<tr>
				<td class="text-center">
					{i}
				</td>
				<td class="text-right">
					{axis.value.toFixed(3)}
				</td>
			</tr>
		));
		axesTable = (
			<table class="table table-bordered table-sm m-0 id-table-stats-axes">
				<thead>
					<tr class="text-center">
						<th>#</th>
						<th>Value</th>
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

function reset(gamepad: Gamepad) {
	gamepad.reset();
}
