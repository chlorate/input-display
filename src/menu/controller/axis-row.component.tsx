import {Component, VNode} from "inferno";
import {observer} from "inferno-mobx";
import {Axis} from "../../controller/axis";

interface Props {
	axis: Axis;
	index: number;
}

/**
 * A row in the Axes table in the Controller tab. Shows information about an
 * axis.
 */
@observer
export class AxisRowComponent extends Component<Props> {
	public render(): VNode {
		const {axis, index} = this.props;

		return (
			<tr>
				<td>Axis {index + 1}</td>
				{cell(axis.value)}
				{cell(axis.neutralValue)}
				{cell(axis.minValue)}
				{cell(axis.maxValue)}
			</tr>
		);
	}
}

function cell(value: number | undefined) {
	return (
		<td className="text-right">
			{value !== undefined ? (
				value.toFixed(3)
			) : (
				<span className="text-muted">Unknown</span>
			)}
		</td>
	);
}
