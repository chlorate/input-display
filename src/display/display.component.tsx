import {connect} from "inferno-mobx";
import {Config} from "../config/config";
import {RoundButtonControl} from "../control/round-button-control";
import {Store} from "../storage/store";
import {RoundButtonControlComponent} from "./round-button-control.component";

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
			if (control instanceof RoundButtonControl) {
				return <RoundButtonControlComponent control={control} />;
			}
		})}
	</svg>
));
