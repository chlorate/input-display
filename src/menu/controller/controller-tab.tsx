import {Component, linkEvent, VNode} from "inferno";
import {inject, observer} from "inferno-mobx";
import {action} from "mobx";
import {AxisTable, ButtonTable, DeviceInfo} from ".";
import {Controller} from "../../controller/controller";
import {Store} from "../../storage/store";

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
				<ButtonTable />

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
				<AxisTable />
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
