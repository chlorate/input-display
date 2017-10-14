import {connect} from "inferno-mobx";
import {Config} from "../config/config";
import {Store} from "../storage/store";

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
	</svg>
));
