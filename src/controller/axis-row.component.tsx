import {connect} from "inferno-mobx";
import {Axis} from "./axis";

interface Props {
	axis: Axis;
	index: number;
}

/**
 * A row in the Axes table in the Controller tab. Shows information about an
 * axis.
 */
export const AxisRowComponent = connect(({axis, index}: Props) => (
	<tr>
		<td>Axis {index + 1}</td>
		{cell(axis.value)}
		{cell(axis.neutralValue)}
		{cell(axis.minValue)}
		{cell(axis.maxValue)}
	</tr>
));

function cell(value: number | undefined) {
	return (
		<td class="text-right">
			{value !== undefined ? value.toFixed(3) : <span class="text-muted">None</span>}
		</td>
	);
}
