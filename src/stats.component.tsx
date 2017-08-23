import {connect} from "inferno-mobx";
import {Gamepad} from "./gamepad";

export const StatsComponent = connect(["gamepad"], ({gamepad}: {gamepad: Gamepad}) => {
	let rows = gamepad.buttons.map((button, i) => (
		<tr>
			<td class="text-center">
				{i}
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

	return (
		<section>
			<h2 class="h5">
				Buttons
			</h2>
			<table class="table table-bordered table-hover table-sm m-0 id-table-stats-buttons">
				<thead>
					<tr class="text-center">
						<th>#</th>
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
		</section>
	);
});
