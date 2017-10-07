import {observable} from "mobx";
import {Config} from "../config/config";
import {getGamepads} from "../gamepad/service";
import {almostEqual} from "../math/math";
import {secondToMilliseconds} from "../time";
import {Axis} from "./axis";
import {Button} from "./button";
import {Direction, sortedDirections} from "./direction";
import {DpadButton} from "./dpad-button";
import {NormalButton} from "./normal-button";

/**
 * When the d-pad is mapped to a single axis, these are the axis values that
 * correspond to a direction being pressed.
 */
const dpadAxisValues: {[id: string]: number[]} = {
	[Direction.Up]: [1, -1, -5 / 7],
	[Direction.Right]: [-5 / 7, -3 / 7, -1 / 7],
	[Direction.Down]: [-1 / 7, 1 / 7, 3 / 7],
	[Direction.Left]: [3 / 7, 5 / 7, 1],
};

/**
 * When the d-pad is mapped to dual axes and an axis' absolute value is at least
 * this, then a direction is considered pressed.
 */
const dpadAxisThreshold = 0.3;

/**
 * Controller stores data and tracks statistics for a single controller. It
 * continuously reads data from the Gamepad API.
 */
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
		this.updateDpadDualAxes(gamepad);
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
			let button = this.buttons.find((b) => b instanceof NormalButton && b.index === i);
			if (!button) {
				button = new NormalButton(i);
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
		sortedDirections.forEach((direction) => {
			const button = this.findOrCreateDpadButton(direction);
			button.pressed = dpadAxisValues[direction].some((v) => almostEqual(v, value));
		});
	}

	private updateDpadDualAxes(gamepad: Gamepad) {
		if (!this.config.dpadXAxis || !this.config.dpadYAxis) {
			return;
		}

		const x = this.config.dpadXAxis.resolveValue(this);
		const y = this.config.dpadYAxis.resolveValue(this);
		if (x === undefined || y === undefined) {
			return;
		}

		const up = this.findOrCreateDpadButton(Direction.Up);
		up.pressed = y <= -dpadAxisThreshold;

		const right = this.findOrCreateDpadButton(Direction.Right);
		right.pressed = x >= dpadAxisThreshold;

		const down = this.findOrCreateDpadButton(Direction.Down);
		down.pressed = y >= dpadAxisThreshold;

		const left = this.findOrCreateDpadButton(Direction.Left);
		left.pressed = x <= -dpadAxisThreshold;
	}

	private findOrCreateDpadButton(direction: Direction): DpadButton {
		// TODO: Array.find doesn't consider type guards:
		// https://github.com/Microsoft/TypeScript/issues/18112
		let button = this.buttons.find((b) => b instanceof DpadButton && b.direction === direction) as DpadButton | undefined;
		if (!button) {
			button = new DpadButton(direction);
			this.buttons.push(button);
		}
		return button;
	}
}
