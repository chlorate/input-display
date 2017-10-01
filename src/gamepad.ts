import {observable} from "mobx";
import {Config} from "./config";
import {Button} from "./controller/button";
import {directionAxisValues, orderedDirections} from "./controller/direction";
import {DpadButton} from "./controller/dpad-button";
import {secondToMilliseconds} from "./time";

interface Axis {
	value: number;
}

export class Gamepad {
	@observable public buttons: Button[] = [];
	@observable public axes: Axis[] = [];
	private config: Config;

	constructor(config: Config) {
		this.config = config;
	}

	public reset() {
		this.buttons = [];
		this.axes = [];
		this.update();
	}

	public poll() {
		this.update();
		setTimeout(() => this.poll(), secondToMilliseconds / 60);
	}

	private update() {
		const gamepads = navigator.getGamepads();
		if (!gamepads.length) {
			return;
		}

		const gamepad = gamepads[0];
		if (!gamepad) {
			return;
		}
		this.updateButtons(gamepad);
		this.updateAxes(gamepad);
		this.updateHat(gamepad);
	}

	private updateButtons(gamepad) {
		gamepad.buttons.forEach((domButton, i) => {
			let button = this.buttons.find((b) => b instanceof Button && b.index === i);
			if (!button) {
				button = new Button(i);
				this.buttons.push(button);
			}
			button.pressed = domButton.pressed;
		});
	}

	private updateAxes(gamepad) {
		gamepad.axes.forEach((value, i) => {
			if (this.axes.length <= i) {
				this.axes.push({
					value: 0,
				});
			}
			this.axes[i].value = value;
		});
	}

	private updateHat(gamepad) {
		const i = this.config.hatAxis;
		if (i === null || i >= gamepad.axes.length) {
			return;
		}

		const axis = gamepad.axes[i];
		orderedDirections.forEach((key) => {
			let button = this.buttons.find((b) => b instanceof DpadButton && b.index === i && b.direction === key);
			if (!button) {
				button = new DpadButton(i, key);
				this.buttons.push(button);
			}
			button.pressed = directionAxisValues[key].some((value) => value.toFixed(3) === axis.toFixed(3));
		});
	}
}
