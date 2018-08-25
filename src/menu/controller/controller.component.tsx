import {Component, linkEvent, VNode} from "inferno";
import {inject, observer} from "inferno-mobx";
import {action} from "mobx";
import {DeviceInfo} from ".";
import {Controller} from "../../controller/controller";
import {Store} from "../../storage/store";
import {AxisRowComponent} from "./axis-row.component";
import {ButtonRowComponent} from "./button-row.component";

interface InjectedProps {
	controller: Controller;
}

/**
 * Contents of the Controller tab. It displays information about the controller,
 * buttons, and axes.
 */
@inject(Store.Controller)
@observer
export class ControllerTab extends Component {
	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public render(): VNode {
		const {controller} = this.injected;

		return (
			<section>
				<h2 className="h4">Device</h2>
				<DeviceInfo />

				<h2 className="h4">
					Buttons
					{controller.buttons.length > 0 && (
						<button
							className="btn btn-warning btn-sm float-right"
							onClick={linkEvent(
								controller,
								handleClickResetButtons,
							)}
						>
							Reset
						</button>
					)}
				</h2>
				{!controller.buttons.length && <p>No buttons detected.</p>}
				{controller.buttons.length > 0 && (
					<table className="table table-sm table-controller-buttons">
						<thead>
							<tr>
								<th>Name</th>
								<th className="text-center">Pressed</th>
								<th className="text-right">Press count</th>
								<th className="text-right">Mash speed</th>
								<th className="text-right">Mash best</th>
							</tr>
						</thead>
						<tbody>
							{controller.buttons.map((button) => (
								<ButtonRowComponent button={button} />
							))}
						</tbody>
					</table>
				)}

				<h2 className="h4">
					Axes
					{controller.axes.length > 0 && (
						<button
							className="btn btn-warning btn-sm float-right"
							onClick={linkEvent(
								controller,
								handleClickResetAxes,
							)}
						>
							Reset
						</button>
					)}
				</h2>
				{!controller.axes.length && (
					<p className="m-0">No axes detected.</p>
				)}
				{controller.axes.length > 0 && (
					<table className="table table-sm table-controller-axes m-0">
						<thead>
							<tr>
								<th>Name</th>
								<th className="text-right">Value</th>
								<th className="text-right">Neutral</th>
								<th className="text-right">Min</th>
								<th className="text-right">Max</th>
							</tr>
						</thead>
						<tbody>
							{controller.axes.map((axis, i) => (
								<AxisRowComponent axis={axis} index={i} />
							))}
						</tbody>
					</table>
				)}
			</section>
		);
	}
}

const handleClickResetButtons = action(
	(controller: Controller): void => {
		controller.resetButtons();
	},
);

const handleClickResetAxes = action(
	(controller: Controller): void => {
		controller.resetAxes();
	},
);
