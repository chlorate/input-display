import {InfernoNode} from "inferno";
import {CardBody} from "inferno-bootstrap";

import {
	AxisTable,
	ButtonTable,
	DeviceInfo,
	ResetAxesButton,
	ResetButtonsButton,
} from ".";

/**
 * Contents of the Controller tab. It displays information about the controller,
 * buttons, and axes.
 */
export const ControllerTab = (): InfernoNode => (
	<CardBody>
		<h2 className="h4">Device</h2>
		<DeviceInfo />

		<h2 className="h4">
			Buttons
			<ResetButtonsButton />
		</h2>
		<ButtonTable />

		<h2 className="h4">
			Axes
			<ResetAxesButton />
		</h2>
		<AxisTable />
	</CardBody>
);
