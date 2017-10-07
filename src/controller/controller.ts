import {observable} from "mobx";
import {Config} from "../config/config";
import {getGamepads} from "../gamepad/service";
import {secondToMilliseconds} from "../time";
import {Axis} from "./axis";
import {Button} from "./button";
import {Direction, directionAxisValues, orderedDirections} from "./direction";
import {DpadButton} from "./dpad-button";

export class Controller {
	private config: Config;
	@observable private _axes: Axis[] = [];
	@observable private _buttons: Button[] = [];

	constructor(config: Config) {
		this.config = config;
	}

	get axes(): Axis[] {
		return this._axes;
	}

	get buttons(): Button[] {
		return this._buttons;
	}

	public resetAxes() {
		this._axes = [];
		this.update();
	}

	public resetButtons() {
		this._buttons = [];
		this.update();
	}

	public poll() {
		this.update();
		setTimeout(() => this.poll(), secondToMilliseconds / this.config.pollRate);
	}

	private update() {
		const gamepads = getGamepads();
		if (gamepads.length <= this.config.gamepadIndex) {
			return;
		}

		const gamepad = gamepads[this.config.gamepadIndex];
		if (!gamepad) {
			return;
		}

		this.updateAxes(gamepad);
		this.updateButtons(gamepad);
		this.updateDpadSingleAxis(gamepad);
	}

	private updateAxes(gamepad: Gamepad) {
		gamepad.axes.forEach((value, i) => {
			if (this.axes.length <= i) {
				this.axes.push(new Axis());
			}
			this.axes[i].value = value;
		});
	}

	private updateButtons(gamepad: Gamepad) {
		gamepad.buttons.forEach((gamepadButton, i) => {
			let button = this.buttons.find((b) => b instanceof Button && b.index === i);
			if (!button) {
				button = new Button(i);
				this.buttons.push(button);
			}
			button.pressed = gamepadButton.pressed;
		});
	}

	private updateDpadSingleAxis(gamepad: Gamepad) {
		if (this.config.dpadAxisIndex === undefined || this.axes.length <= this.config.dpadAxisIndex) {
			return;
		}

		const value = this.axes[this.config.dpadAxisIndex].value;
		orderedDirections.forEach((direction) => {
			const button = this.findOrCreateDpadButton(direction);
			button.pressed = directionAxisValues[direction].some((v) => v.toFixed(3) === value.toFixed(3));
		});
	}

	private findOrCreateDpadButton(direction: Direction): DpadButton {
		// TODO: Array.find doesn't consider type guards:
		// https://github.com/Microsoft/TypeScript/issues/18112
		let button = this.buttons.find((b) => b instanceof DpadButton && b.direction === direction) as DpadButton | undefined;
		if (!button) {
			button = new DpadButton(0, direction);
			this.buttons.push(button);
		}
		return button;
	}
}
