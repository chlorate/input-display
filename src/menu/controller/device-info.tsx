import {Component, VNode} from "inferno";
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

	public render(): VNode {
		const {controller} = this.injected;
		if (controller.id === undefined) {
			return <p>Not connected.</p>;
		}

		return (
			<table className="table table-sm table-device-info">
				<tr>
					<th>ID</th>
					<td>{controller.id}</td>
				</tr>
				{this.mappingRow}
			</table>
		);
	}

	private get mappingRow(): VNode | undefined {
		const {mapping} = this.injected.controller;
		if (mapping === undefined) {
			return;
		}

		let text: VNode | string = mapping;
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
