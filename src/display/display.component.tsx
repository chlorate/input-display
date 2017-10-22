import {connect} from "inferno-mobx";
import {Config} from "../config/config";
import {EllipseControl} from "../control/ellipse-control";
import {RectangleControl} from "../control/rectangle-control";
import {Store} from "../storage/store";
import {EllipseControlComponent} from "./ellipse-control.component";
import {RectangleControlComponent} from "./rectangle-control.component";

interface Props {
	config: Config;
}

/**
 * Draws the entire input display.
 */
export const DisplayComponent = connect([Store.Config], ({config}: Props) => (
	<svg
		className={config.displayOutline ? "display-outline" : undefined}
		width={config.displayWidth}
		height={config.displayHeight}
	>
		{config.controls.map((control, i) => {
			if (control instanceof EllipseControl) {
				return <EllipseControlComponent control={control} />;
			} else if (control instanceof RectangleControl) {
				return <RectangleControlComponent control={control} />;
			}
		})}
	</svg>
));
