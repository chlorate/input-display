import {action, observable} from "mobx";
import {Config} from "../config/config";
import {getGamepads} from "../gamepad/service";
import {almostEqual} from "../math/util";
import {secondToMilliseconds} from "../time/const";
import {Axis} from "./axis";
import {Button} from "./button";
import {parseButtonJSON} from "./button.factory";
import {Direction, sortedDirections} from "./direction";
import {DpadButton} from "./dpad-button";
import {ControllerJSON, isControllerJSON} from "./json/controller-json";
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
	@observable private _id?: string;
	@observable private _mapping?: string;
	@observable private _axes: Axis[] = [];
	@observable private _buttons: Button[] = [];
	private timeout?: number;
	private sorted: boolean = true;

	constructor(config: Config) {
		this.config = config;
	}

	get id(): string | undefined {
		return this._id;
	}

	get mapping(): string | undefined {
		return this._mapping;
	}

	get axes(): Axis[] {
		return this._axes;
	}

	get buttons(): Button[] {
		return this._buttons;
	}

	/**
	 * Returns a JSON representation of this controller.
	 */
	public toJSON(): ControllerJSON {
		return {
			axes: this.axes.map((axis) => axis.toJSON()),
			buttons: this.buttons.map((button) => button.toJSON()),
		};
	}

	/**
	 * Assigns properties from a JSON representation of this controller.
	 */
	@action public loadJSON(json: any): void {
		if (!isControllerJSON(json)) {
			throw new TypeError("invalid controller JSON");
		}

		this._axes = json.axes.map((axis) => Axis.fromJSON(axis));
		this._buttons = json.buttons.map((button) => parseButtonJSON(button));
	}

	/**
	 * Clears all axes and re-reads them from the gamepad.
	 */
	@action public resetAxes(): void {
		this._axes = [];
		this.update();
	}

	/**
	 * Clears all buttons and re-reads them from the gamepad.
	 */
	@action public resetButtons(): void {
		this._buttons = [];
		this.update();
	}

	/**
	 * Starts periodically reading the Gamepad API for data and updating the
	 * state of the controller. The poll rate setting determines how often this
	 * happens.
	 */
	@action public poll(): void {
		this.update();

		// setTimeout drifts a bit. Set the delay so the next call happens at
		// a multiple of the poll rate. For example, if the poll rate is 60 Hz
		// and this current call happened 1/3 through a frame, set the delay to
		// 2/3 of a frame so the next call approximately happens at the
		// beginning of the next frame.
		let delay = secondToMilliseconds / this.config.pollRate;
		delay = delay - window.performance.now() % delay;
		this.timeout = setTimeout(() => this.poll(), delay);
	}

	/**
	 * Stops polling the Gamepad API.
	 */
	public stopPoll(): void {
		if (this.timeout !== undefined) {
			clearTimeout(this.timeout);
		}
	}

	/**
	 * Performs a full update of the controller state if the selected gamepad in
	 * the config exists.
	 */
	@action private update(): void {
		const gamepads = getGamepads();
		if (gamepads.length <= this.config.gamepadIndex) {
			this.clearGamepad();
			return;
		}

		const gamepad = gamepads[this.config.gamepadIndex];
		if (!gamepad) {
			this.clearGamepad();
			return;
		}

		this.updateGamepad(gamepad);
		this.updateAxes(gamepad);
		this.updateButtons(gamepad);
		this.updateDpadSingleAxis(gamepad);
		this.updateDpadDualAxes(gamepad);
		this.sortButtons();
	}

	/**
	 * Clears the stored gamepad ID and mapping.
	 */
	@action private clearGamepad(): void {
		this._id = undefined;
		this._mapping = undefined;
	}

	/**
	 * Stores the gamepad ID and mapping.
	 */
	@action private updateGamepad(gamepad: Gamepad): void {
		this._id = gamepad.id;
		this._mapping = gamepad.mapping;
	}

	/**
	 * Reads all axis values, creating axes if necessary.
	 */
	@action private updateAxes(gamepad: Gamepad): void {
		// Ignore if all axes read zero which means the gamepad hasn't been
		// fully activated yet.
		const active = gamepad.axes.some((value) => value !== 0);
		gamepad.axes.forEach((value, i) => {
			if (this.axes.length <= i) {
				this.axes.push(new Axis());
			}
			if (active) {
				this.axes[i].value = value;
			}
		});
	}

	/**
	 * Reads all normal button pressed states, creating buttons if necessary.
	 */
	@action private updateButtons(gamepad: Gamepad): void {
		gamepad.buttons.forEach((gamepadButton, i) => {
			const button = this.findOrCreateNormalButton(i);
			button.pressed = gamepadButton.pressed;
		});
	}

	/**
	 * Finds and returns the normal button having a certain index, creating it
	 * if necessary.
	 */
	@action private findOrCreateNormalButton(index: number): NormalButton {
		// TODO: Array.find doesn't consider type guards:
		// https://github.com/Microsoft/TypeScript/issues/18112
		let button = this.buttons.find((b) => b instanceof NormalButton && b.index === index) as NormalButton | undefined;
		if (!button) {
			button = new NormalButton(index);
			this.buttons.push(button);
			this.sorted = false;
		}
		return button;
	}

	/**
	 * Reads the d-pad button pressed states from a selected axis if the d-pad
	 * mapping is set to single axis. Creates d-pad buttons if necessary.
	 */
	@action private updateDpadSingleAxis(gamepad: Gamepad) {
		if (this.config.dpadAxisIndex === undefined || this.axes.length <= this.config.dpadAxisIndex) {
			return;
		}

		const value = this.axes[this.config.dpadAxisIndex].value;
		sortedDirections.forEach((direction) => {
			const button = this.findOrCreateDpadButton(direction);
			button.pressed = dpadAxisValues[direction].some((v) => almostEqual(v, value));
		});
	}

	/**
	 * Reads the d-pad button pressed states from selected axes if the d-pad
	 * mapping is set to dual axes. Creates d-pad buttons if necessary.
	 */
	@action private updateDpadDualAxes(gamepad: Gamepad): void {
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

	/**
	 * Finds and returns the d-pad button having a certain direction, creating
	 * it if necessary.
	 */
	@action private findOrCreateDpadButton(direction: Direction): DpadButton {
		// TODO: Array.find doesn't consider type guards:
		// https://github.com/Microsoft/TypeScript/issues/18112
		let button = this.buttons.find((b) => b instanceof DpadButton && b.direction === direction) as DpadButton | undefined;
		if (!button) {
			button = new DpadButton(direction);
			this.buttons.push(button);
			this.sorted = false;
		}
		return button;
	}

	/**
	 * Sorts the buttons if a new button was recently added. Normal buttons
	 * first sorted by index, then d-pad buttons sorted by direction.
	 */
	@action private sortButtons(): void {
		if (this.sorted) {
			return;
		}

		// TODO: mobx doesn't sort arrays in-place. Might change in future:
		// https://github.com/mobxjs/mobx/issues/1076
		this._buttons = this.buttons.sort((x: Button, y: Button): number => {
			if (x instanceof NormalButton && y instanceof NormalButton) {
				return x.index - y.index;
			} else if (x instanceof DpadButton && y instanceof DpadButton) {
				return sortedDirections.indexOf(x.direction) - sortedDirections.indexOf(y.direction);
			} else if (x instanceof NormalButton) {
				return -1;
			} else if (x instanceof DpadButton) {
				return 1;
			}
			return 0;
		});
		this.sorted = true;
	}
}
