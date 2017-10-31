import {computed} from "mobx";
import {ControlType, OctagonStickControlJSON} from "./json/control-json";
import {StickControl} from "./stick-control";

/**
 * A control that represents an analog stick with an octagonal outer shape
 * commonly seen on Nintendo controllers.
 */
export class OctagonStickControl extends StickControl {
	get type(): string {
		return "Analog stick (octagon)";
	}

	@computed get path(): string {
		// Draw points every 45 degrees.
		const radius = this.outerSize / 2 - this.nudge;
		const lines: string[] = [];
		for (let i = 0; i <= 7; i++) {
			const x = Math.cos(i * Math.PI / 4) * radius + this.centerX;
			const y = Math.sin(i * Math.PI / 4) * radius + this.centerY;
			lines.push(`${!i ? "M" : "L"} ${x.toFixed(3)} ${y.toFixed(3)}`);
		}
		return `${lines.join(" ")} Z`;
	}

	/**
	 * Returns a JSON representation of this control.
	 */
	public toJSON(): OctagonStickControlJSON {
		const json = {type: ControlType.OctagonStick};
		return Object.assign(json, this.toBaseJSON()) as OctagonStickControlJSON;
	}
}
