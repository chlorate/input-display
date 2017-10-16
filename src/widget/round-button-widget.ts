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
		return {
			type: WidgetType.RoundButton,
			name: this.name,
			x: this.x,
			y: this.y,
			showName: this.showName,
			showPresses: this.showPresses,
			showMashSpeed: this.showMashSpeed,
			width: this.width,
			height: this.height,
			borderWidth: this.borderWidth,
			button: this.button.toJSON(),
		};
	}
}
