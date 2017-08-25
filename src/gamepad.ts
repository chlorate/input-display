import {observable} from "mobx";
import {Button, directions, orderedDirections, Type} from "./button";
import {Config} from "./config";
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

		this.buttons.forEach((button) => button.update());
	}

	private updateButtons(gamepad) {
		gamepad.buttons.forEach((domButton, i) => {
			let button = this.buttons.find((b) => b.type === Type.Button && b.id === i);
			if (!button) {
				button = new Button(Type.Button, i);
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
			let button = this.buttons.find((b) => b.type === Type.Hat && b.id === key);
			if (!button) {
				button = new Button(Type.Hat, key);
				this.buttons.push(button);
			}
			button.pressed = directions[key].hatAxisValues.some((value) => value.toFixed(3) === axis.toFixed(3));
		});
	}
}
