import {VNode} from "inferno";
import {CardBody} from "inferno-bootstrap";
import {BackgroundColorInput} from ".";
import {BackHeading} from "..";

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

			<h3 className="h4 mt-4">Control colors</h3>

			<h3 className="h4 mt-4">Control labels</h3>
		</CardBody>
	</div>
);
