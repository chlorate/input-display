import {observable} from "mobx";

export class Gamepad {
	@observable dpadUp: boolean;
	@observable dpadDown: boolean;
	@observable dpadLeft: boolean;
	@observable dpadRight: boolean;

	constructor() {
		this.dpadUp = false;
		this.dpadDown = false;
		this.dpadLeft = false;
		this.dpadRight = false;
	}
}
