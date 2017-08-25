import {observable} from "mobx";
import {secondToMilliseconds} from "./time";

export enum Type {
	Button = "button",
	Hat = "hat",
}

const typeNames: {[key: string]: string} = {
	[Type.Button]: "Button",
	[Type.Hat]: "POV Hat",
};

enum DirectionKey {
	Up = "up",
	Right = "right",
	Down = "down",
	Left = "left",
}

interface Direction {
	name: string;
	hatAxisValues: number[];
}

export const directions: {[key: string]: Direction} = {
	[DirectionKey.Up]: {
		name: "Up",
		hatAxisValues: [1, -1, -0.714],
	},
	[DirectionKey.Right]: {
		name: "Right",
		hatAxisValues: [-0.714, -0.429, -0.143],
	},
	[DirectionKey.Down]: {
		name: "Down",
		hatAxisValues: [-0.143, 0.143, 0.429],
	},
	[DirectionKey.Left]: {
		name: "Left",
		hatAxisValues: [0.429, 0.714, 1],
	},
};

export const orderedDirections: DirectionKey[] = [
	DirectionKey.Up,
	DirectionKey.Right,
	DirectionKey.Down,
	DirectionKey.Left,
];

export class Button {
	public type: Type;
	public id: number | DirectionKey;
	@observable public presses: number = 0;
	@observable public times: number[] = [];
	@observable public mashSpeed: number = 0;
	@observable public bestMashSpeed: number = 0;
	@observable private _pressed: boolean = false;

	get name(): string {
		let id = `${this.id}`;
		if (this.type === Type.Hat) {
			id = directions[this.id].name;
		}
		return `${typeNames[this.type]} ${id}`;
	}

	get pressed(): boolean { return this._pressed; }
	set pressed(pressed: boolean) {
		if (pressed && !this.pressed) {
			this.times.push(window.performance.now());
			this.presses++;
		}
		this._pressed = pressed;
	}

	constructor(type: Type, id: number | DirectionKey) {
		this.type = type;
		this.id = id;
	}

	public reset() {
		this.presses = 0;
		this.times = [];
		this.mashSpeed = 0;
		this.bestMashSpeed = 0;
	}

	public update() {
		this.mashSpeed = 0;

		const endTime = window.performance.now() - secondToMilliseconds;
		this.times = this.times.filter((time) => {
			if (time <= endTime) {
				return false;
			}
			this.mashSpeed++;
			return true;
		});

		this.bestMashSpeed = Math.max(this.mashSpeed, this.bestMashSpeed);
	}
}
