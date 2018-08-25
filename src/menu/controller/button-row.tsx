import {Component, VNode} from "inferno";
import {observer} from "inferno-mobx";
import {Button} from "../../controller/button";
import {formatNumber} from "../../math/util";

interface Props {
	button: Button;
}

/**
 * A row in the ButtonTable component. Shows a button's current pressed state
 * and statistics.
 */
@observer
export class ButtonRow extends Component<Props> {
	public render(): VNode {
		const {button} = this.props;
		return (
			<tr>
				<td>{button.name}</td>
				{this.booleanCell(button.pressed)}
				{this.integerCell(button.presses)}
				{this.integerCell(button.mashSpeed)}
				{this.integerCell(button.bestMashSpeed)}
			</tr>
		);
	}

	private booleanCell = (value: boolean): VNode => (
		<td className={`table-${value ? "success" : "danger"} text-center`}>
			{value ? "Yes" : "No"}
		</td>
	);

	private integerCell = (value: number): VNode => (
		<td className="text-right">{formatNumber(value)}</td>
	);
}
