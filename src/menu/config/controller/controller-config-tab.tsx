import {SFC} from "inferno";
import {CardBody} from "inferno-bootstrap";
import {
	DeviceSelect,
	DpadDualAxesSelects,
	DpadMappingSelect,
	DpadSingleAxisSelect,
	MashSpeedThresholdInput,
	PollRateInput,
} from ".";
import {BackHeading} from "..";

/**
 * The contents of the Controller screen of the Config tab. Provides fields for
 * controller-related configuration.
 */
export const ControllerConfigTab: SFC = () => (
	<div>
		<BackHeading to="/config">Controller</BackHeading>
		<CardBody>
			<DeviceSelect />

			<h3 className="h4 mt-4">Directional pad</h3>
			<DpadMappingSelect />
			<DpadSingleAxisSelect />
			<DpadDualAxesSelects />

			<h3 className="h4 mt-4">Inputs</h3>
			<PollRateInput />
			<MashSpeedThresholdInput />
		</CardBody>
	</div>
);
