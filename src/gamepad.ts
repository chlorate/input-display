import {observable} from "mobx";

const secondToMilliseconds = 1000;

interface Button {
	pressed: boolean;
	presses: number;
	mashSpeed: number;
	bestMashSpeed: number;
}

interface Axis {
	value: number;
}

interface Press {
	button: number;
	time: number;
}

export class Gamepad {
	@observable buttons: Button[];
	@observable axes: Axis[];
	private presses: Press[];

	constructor() {
		this.buttons = [];
		this.axes = [];
		this.presses = [];
	}

	reset() {
		this.buttons.forEach(button => {
			button.presses = 0;
			button.mashSpeed = 0;
			button.bestMashSpeed = 0;
		});
		this.presses = [];
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
		this.updateMashSpeeds(gamepad);
	}

	private updateButtons(gamepad) {
		gamepad.buttons.forEach((button, i) => {
			if (this.buttons.length <= i) {
				this.buttons.push({
					pressed: false,
					presses: 0,
					mashSpeed: 0,
					bestMashSpeed: 0,
				});
			}

			if (button.pressed && !this.buttons[i].pressed) {
				this.presses.push({
					button: i,
					time: window.performance.now(),
				});
				this.buttons[i].presses++;
			}
			this.buttons[i].pressed = button.pressed;
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

	private updateMashSpeeds(gamepad) {
		this.buttons.forEach(button => button.mashSpeed = 0);

		let endTime = window.performance.now() - secondToMilliseconds;
		this.presses = this.presses.filter(press => {
			if (press.time <= endTime) {
				return false;
			}
			this.buttons[press.button].mashSpeed++;
			return true;
		});

		this.buttons.forEach(button => button.bestMashSpeed = Math.max(button.mashSpeed, button.bestMashSpeed));
	}
}
