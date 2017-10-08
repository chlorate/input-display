import {connect} from "inferno-mobx";
import {formatNumber} from "../math/math";
import {Button} from "./button";

interface Props {
	button: Button;
}

/**
 * A row in the Buttons table in the Controller tab.
 */
export const ButtonRowComponent = connect(({button}: Props) => (
	<tr>
		<td>{button.name}</td>
		{booleanCell(button.pressed)}
		{integerCell(button.presses)}
		{integerCell(button.mashSpeed)}
		{integerCell(button.bestMashSpeed)}
	</tr>
));

function booleanCell(value: boolean): any {
	return (
		<td class={`table-${value ? "success" : "danger"} text-center`}>
			{value ? "Yes" : "No"}
		</td>
	);
}

function integerCell(value: number): any {
	return (
		<td class="text-right">
			{formatNumber(value)}
		</td>
	);
}
