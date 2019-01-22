import {connect} from "inferno-mobx";
import {Axis} from "../../controller/axis";

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

function cell(value?: number) {
	if (value === undefined) {
		return <td className="text-muted text-right">Unknown</td>;
	}
	return (
		<td className="text-right" title={value.toFixed(10)}>
			{value.toFixed(3)}
		</td>
	);
}
