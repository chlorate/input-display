import {Component, InfernoNode} from "inferno";
import {Table} from "inferno-bootstrap";
import {inject, observer} from "inferno-mobx";
import {Controller} from "../../controller/controller";
import {Store} from "../../storage/store";

interface InjectedProps {
	controller: Controller;
}

/**
 * Displays general information about the controller.
 */
@inject(Store.Controller)
@observer
export class DeviceInfo extends Component {
	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public render(): InfernoNode {
		const {controller} = this.injected;
		if (controller.id === undefined) {
			return <p>Not connected.</p>;
		}

		return (
			<Table size="sm" className="table-device-info">
				<tr>
					<th>ID</th>
					<td>{controller.id}</td>
				</tr>
				{this.mappingRow}
			</Table>
		);
	}

	private get mappingRow(): InfernoNode | undefined {
		const {mapping} = this.injected.controller;
		if (mapping === undefined) {
			return;
		}

		let text: InfernoNode | string = mapping;
		if (!mapping) {
			text = <span className="text-muted">None</span>;
		}

		return (
			<tr>
				<th>Mapping</th>
				<td>{text}</td>
			</tr>
		);
	}
}
