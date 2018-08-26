import {Component, VNode} from "inferno";
import {Table} from "inferno-bootstrap";
import {inject, observer} from "inferno-mobx";
import {AxisRow} from ".";
import {Store} from "../../storage/store";

interface InjectedProps {
	controller: Controller;
}

/**
 * A table displaying the current state of each controller axis.
 */
@inject(Store.Controller)
@observer
export class AxisTable extends Component {
	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public render(): VNode {
		if (!this.injected.controller.axes.length) {
			return <p className="m-0">No axes detected.</p>;
		}

		return (
			<Table size="sm" className="table-axes m-0">
				<thead>
					<tr>
						<th>Name</th>
						<th className="text-right">Value</th>
						<th className="text-right">Neutral</th>
						<th className="text-right">Min</th>
						<th className="text-right">Max</th>
					</tr>
				</thead>
				<tbody>{this.rows}</tbody>
			</Table>
		);
	}

	private get rows(): VNode[] {
		return this.injected.controller.axes.map((axis, i) => (
			<AxisRow axis={axis} index={i} />
		));
	}
}
