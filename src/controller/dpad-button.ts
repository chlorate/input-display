import {Button} from "./button";
import {Direction} from "./direction";

export class DpadButton extends Button {
	private _direction: Direction;

	constructor(index: number, direction: Direction) {
		super(index);
		this._direction = direction;
	}

	get direction(): Direction {
		return this._direction;
	}

	get name(): string {
		return `D-pad ${this.index + 1} ${this.direction}`;
	}
}
