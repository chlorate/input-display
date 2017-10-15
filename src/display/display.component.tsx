import {connect} from "inferno-mobx";
import {Config} from "../config/config";
import {Store} from "../storage/store";
import {RoundButtonWidget} from "../widget/round-button-widget";
import {RoundButtonWidgetComponent} from "./round-button-widget.component";
import {WidgetGroupComponent} from "./widget-group.component";

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
		{config.widgets.map((widget, i) => (
			<WidgetGroupComponent index={i} widget={widget}>
				{widget instanceof RoundButtonWidget &&
					<RoundButtonWidgetComponent widget={widget} />
				}
			</WidgetGroupComponent>
		))}
	</svg>
));
