import {VNode} from "inferno";
import {CardBody} from "inferno-bootstrap";
import {BackHeading} from "..";

import {
	BackgroundColorInput,
	DisplayOutlineCheckbox,
	DisplaySizeInputs,
	LabelFontInputs,
} from ".";

/**
 * The contents of the Appearance screen of the Config tab. Provides fields
 * related to the display size, colors, and fonts.
 */
export const AppearanceConfigTab = (): VNode => (
	<div>
		<BackHeading to="/config">Appearance</BackHeading>
		<CardBody>
			<h3 className="h4">Display</h3>
			<BackgroundColorInput />
			<DisplaySizeInputs />
			<DisplayOutlineCheckbox />

			<h3 className="h4 mt-4">Buttons</h3>
			<h4 className="h5">Unpressed</h4>
			<h4 className="h5">Pressed</h4>
			<h4 className="h5">Mashing + unpressed</h4>
			<h4 className="h5">Mashing + pressed</h4>

			<h3 className="h4 mt-4">Analog sticks</h3>
			<h4 className="h5">Neutral</h4>
			<h4 className="h5">Moved</h4>

			<h3 className="h4 mt-4">Labels</h3>
			<LabelFontInputs />
		</CardBody>
	</div>
);
