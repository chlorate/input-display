import {action, observable} from "mobx";
import {Config} from "../config/config";
import {Direction4, sortedDirection4s} from "../direction/direction4";
import {getGamepads} from "../gamepad/service";
import {almostEqual} from "../math/util";
import {secondToMilliseconds} from "../time/const";
import {Axis} from "./axis";
import {Button} from "./button";
import {parseButtonJSON} from "./button.factory";
import {DpadButton} from "./dpad-button";
import {ControllerJSON, isControllerJSON} from "./json/controller-json";
import {NormalButton} from "./normal-button";

/**
 * When the d-pad is mapped to a single axis, these are the axis values that
 * correspond to a direction being pressed.
 */
const dpadAxisValues: {[id: string]: number[]} = {
	[Direction4.Up]: [1, -1, -5 / 7],
	[Direction4.Right]: [-5 / 7, -3 / 7, -1 / 7],
	[Direction4.Down]: [-1 / 7, 1 / 7, 3 / 7],
	[Direction4.Left]: [3 / 7, 5 / 7, 1],
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
	private sorted: boolean = true;
	private lastUpdated: number = -secondToMilliseconds;
	private requestId?: number;

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
		const poller = (now: number) => {
			const interval = secondToMilliseconds / this.config.pollRate;
			const delta = now - this.lastUpdated;
			if (delta >= interval) {
				// Round the timestamp down to the nearest multiple of interval
				// so that any drift won't accumulate and lower the frame rate.
				// Source: https://gist.github.com/addyosmani/5434533
				this.lastUpdated = now - (delta % interval);
				this.update();
			}
			this.requestId = requestAnimationFrame(poller);
		};
		poller(performance.now());
	}

	/**
	 * Stops polling the Gamepad API.
	 */
	public stopPoll(): void {
		if (this.requestId !== undefined) {
			cancelAnimationFrame(this.requestId);
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
		this.updateMashing();
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
		gamepad.axes.forEach((value, i) => {
			if (this.axes.length <= i) {
				this.axes.push(new Axis());
			}
			this.axes[i].value = value;
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
		sortedDirection4s.forEach((direction) => {
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

		const xAxis = this.config.dpadXAxis.resolve(this);
		const yAxis = this.config.dpadYAxis.resolve(this);
		if (xAxis === undefined || yAxis === undefined) {
			return;
		}

		const up = this.findOrCreateDpadButton(Direction4.Up);
		const right = this.findOrCreateDpadButton(Direction4.Right);
		const down = this.findOrCreateDpadButton(Direction4.Down);
		const left = this.findOrCreateDpadButton(Direction4.Left);

		const xNegative = xAxis.value <= -dpadAxisThreshold;
		const xPositive = xAxis.value >= dpadAxisThreshold;
		left.pressed = this.config.dpadXAxis.inverted ? xPositive : xNegative;
		right.pressed = this.config.dpadXAxis.inverted ? xNegative : xPositive;

		const yNegative = yAxis.value <= -dpadAxisThreshold;
		const yPositive = yAxis.value >= dpadAxisThreshold;
		up.pressed = this.config.dpadYAxis.inverted ? yPositive : yNegative;
		down.pressed = this.config.dpadYAxis.inverted ? yNegative : yPositive;
	}

	/**
	 * Finds and returns the d-pad button having a certain direction, creating
	 * it if necessary.
	 */
	@action private findOrCreateDpadButton(direction: Direction4): DpadButton {
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
	 * Updates the mashing flag of all buttons based on the current mash speed
	 * threshold in the config.
	 */
	@action private updateMashing(): void {
		this.buttons.forEach((button) => {
			button.mashing = button.mashSpeed >= this.config.mashSpeedThreshold;
		});
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
				return sortedDirection4s.indexOf(x.direction) - sortedDirection4s.indexOf(y.direction);
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
