import {ButtonWidget} from "./button-widget";
import {RoundButtonWidgetJSON, WidgetType} from "./json/widget-json";

/**
 * A widget that represents a button shaped like a circle or ellipse.
 */
export class RoundButtonWidget extends ButtonWidget {
	/**
	 * Returns a JSON representation of this widget.
	 */
	public toJSON(): RoundButtonWidgetJSON {
		const json: RoundButtonWidgetJSON = {
			type: WidgetType.RoundButton,
			name: this.name,
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			borderWidth: this.borderWidth,
			showName: this.showName,
			showPresses: this.showPresses,
			showMashSpeed: this.showMashSpeed,
		};
		if (this.button) {
			json.button = this.button.toJSON();
		}
		return json;
	}
}
