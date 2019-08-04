import {SFC} from "inferno";
import {CardBody} from "inferno-bootstrap";
import {
	BackgroundColorInput,
	ButtonPaletteInputs,
	DisplayOutlineCheckbox,
	DisplaySizeInputs,
	LabelFontInputs,
	LabelOffsetInputs,
} from ".";
import {BackHeading} from "..";

/**
 * The contents of the Appearance screen of the Config tab. Provides fields
 * related to the display size, colors, and fonts.
 */
export const AppearanceConfigTab: SFC = () => (
	<div>
		<BackHeading to="/config">Appearance</BackHeading>
		<CardBody>
			<h3 className="h4">Display</h3>
			<BackgroundColorInput />
			<DisplaySizeInputs />
			<DisplayOutlineCheckbox />

			<h3 className="h4 mt-4">Buttons</h3>
			<ButtonPaletteInputs />

			<h3 className="h4 mt-4">Analog sticks</h3>
			<h4 className="h5">Neutral</h4>
			<h4 className="h5">Moved</h4>

			<h3 className="h4 mt-4">Labels</h3>
			<LabelFontInputs />
			<LabelOffsetInputs />
		</CardBody>
	</div>
);
