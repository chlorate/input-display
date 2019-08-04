import {Component, InfernoNode} from "inferno";
import {observer} from "inferno-mobx";
import {Axis} from "../../controller/axis";

interface Props {
	axis: Axis;
	index: number;
}

/**
 * A row in the AxisTable component. Shows an axis' current state.
 */
@observer
export class AxisRow extends Component<Props> {
	public render(): InfernoNode {
		const {axis, index} = this.props;
		return (
			<tr>
				<td>Axis {index + 1}</td>
				{this.cell(axis.value)}
				{this.cell(axis.neutralValue)}
				{this.cell(axis.minValue)}
				{this.cell(axis.maxValue)}
			</tr>
		);
	}

	private cell(value?: number): InfernoNode {
		let className = "text-right";
		if (value === undefined) {
			className += " text-muted";
		}

		return (
			<td className={className}>
				{value === undefined ? "Unknown" : value.toFixed(3)}
			</td>
		);
	}
}
