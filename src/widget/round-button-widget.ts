import {RoundButtonWidgetJSON, WidgetType} from "./json/widget-json";
import {Widget} from "./widget";

/**
 * A widget that represents a button shaped like a circle or ellipse.
 */
export class RoundButtonWidget extends Widget {
	/**
	 * Returns a JSON representation of this widget.
	 */
	public toJSON(): RoundButtonWidgetJSON {
		return {
			type: WidgetType.RoundButton,
			name: this.name,
			button: this.button ? this.button.toJSON() : undefined,
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			borderWidth: this.borderWidth,
			showName: this.showName,
			showPresses: this.showPresses,
			showMashSpeed: this.showMashSpeed,
			nameLabel: this.nameLabel,
			pressesLabel: this.pressesLabel,
			mashSpeedLabel: this.mashSpeedLabel,
		};
	}
}
