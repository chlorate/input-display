import {observable} from "mobx";
import {Button, Type, directions, orderedDirections} from "./button";
import {Config} from "./config";
import {secondToMilliseconds} from "./time";

interface Axis {
	value: number;
}

export class Gamepad {
	@observable buttons: Button[] = [];
	@observable axes: Axis[] = [];
	private config: Config;

	constructor(config: Config) {
		this.config = config;
	}

	reset() {
		this.buttons = [];
		this.axes = [];
		this.update();
	}

	poll() {
		this.update();
		setTimeout(() => this.poll(), secondToMilliseconds / 60);
	}

	private update() {
		let gamepads = navigator.getGamepads();
		if (!gamepads.length) {
			return;
		}

		let gamepad = gamepads[0];
		if (!gamepad) {
			return;
		}
		this.updateButtons(gamepad);
		this.updateAxes(gamepad);
		this.updateHat(gamepad);

		this.buttons.forEach(button => button.update());
	}

	private updateButtons(gamepad) {
		gamepad.buttons.forEach((domButton, i) => {
			let button = this.buttons.find(button => (
				button.type === Type.Button && button.id === i
			));
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
		let i = this.config.hatAxis;
		if (i === null || i >= gamepad.axes.length) {
			return;
		}

		let axis = gamepad.axes[i];
		orderedDirections.forEach((key) => {
			let button = this.buttons.find(
				button => button.type === Type.Hat && button.id === key
			);
			if (!button) {
				button = new Button(Type.Hat, key);
				this.buttons.push(button);
			}
			button.pressed = directions[key].hatAxisValues.some(
				value => value.toFixed(3) === axis.toFixed(3)
			);
		});
	}
}
