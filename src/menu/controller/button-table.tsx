import {Component, VNode} from "inferno";
import {Table} from "inferno-bootstrap";
import {inject, observer} from "inferno-mobx";
import {ButtonRow} from ".";
import {Controller} from "../../controller/controller";
import {Store} from "../../storage/store";

interface InjectedProps {
	controller: Controller;
}

/**
 * A table displaying the current state and statistics for each controller
 * button.
 */
@inject(Store.Controller)
@observer
export class ButtonTable extends Component {
	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public render(): VNode {
		if (!this.injected.controller.buttons.length) {
			return <p>No buttons detected.</p>;
		}

		return (
			<Table size="sm" className="table-buttons">
				<thead>
					<tr>
						<th>Name</th>
						<th className="text-center">Pressed</th>
						<th className="text-right">Press count</th>
						<th className="text-right">Mash speed</th>
						<th className="text-right">Mash best</th>
					</tr>
				</thead>
				<tbody>{this.rows}</tbody>
			</Table>
		);
	}

	private get rows(): VNode[] {
		return this.injected.controller.buttons.map((button) => (
			<ButtonRow button={button} />
		));
	}
}
