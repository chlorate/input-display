import {Component, VNode} from "inferno";
import {observer} from "inferno-mobx";
import {Button} from "../../controller/button";
import {formatNumber} from "../../math/util";

interface Props {
	button: Button;
}

/**
 * A row in the Buttons table in the Controller tab. Shows its current state and
 * statistics.
 */
@observer
export class ButtonRowComponent extends Component<Props> {
	public render(): VNode {
		const {button} = this.props;

		return (
			<tr>
				<td>{button.name}</td>
				{booleanCell(button.pressed)}
				{integerCell(button.presses)}
				{integerCell(button.mashSpeed)}
				{integerCell(button.bestMashSpeed)}
			</tr>
		);
	}
}

function booleanCell(value: boolean) {
	return (
		<td className={`table-${value ? "success" : "danger"} text-center`}>
			{value ? "Yes" : "No"}
		</td>
	);
}

function integerCell(value: number) {
	return <td className="text-right">{formatNumber(value)}</td>;
}
