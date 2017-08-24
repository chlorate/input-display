import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {Gamepad} from "./gamepad";

export const StatsComponent = connect(["gamepad"], ({gamepad}: {gamepad: Gamepad}) => {
	let buttonRows = gamepad.buttons.map((button, i) => (
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
	let axisRows = gamepad.axes.map((axis, i) => (
		<tr>
			<td class="text-center">
				{i}
			</td>
			<td class="text-right">
				{axis.value.toFixed(3)}
			</td>
		</tr>
	));

	return (
		<section>
			<button class="btn btn-default mb-4" onClick={linkEvent(gamepad, reset)}>
				Reset
			</button>

			<h2 class="h5">
				Buttons
			</h2>
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
					{buttonRows}
				</tbody>
			</table>

			<h2 class="h5">
				Axes
			</h2>
			<table class="table table-bordered table-sm m-0 id-table-stats-axes">
				<thead>
					<tr class="text-center">
						<th>#</th>
						<th>Value</th>
					</tr>
				</thead>
				<tbody>
					{axisRows}
				</tbody>
			</table>
		</section>
	);
});

function reset(gamepad: Gamepad) {
	gamepad.reset();
}
