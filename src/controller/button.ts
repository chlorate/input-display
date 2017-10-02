import {observable} from "mobx";
import {clampInt} from "../math";
import {secondToMilliseconds} from "../time";

export class Button {
	private _index: number;
	@observable private _pressed: boolean = false;
	@observable private _presses: number = 0;
	@observable private _pressTimes: number[] = [];
	@observable private _bestMashSpeed: number = 0;

	constructor(index: number) {
		this._index = clampInt(index, 0);
	}

	get name(): string {
		return `Button ${this.index + 1}`;
	}

	get index(): number {
		return this._index;
	}

	get pressed(): boolean {
		return this._pressed;
	}
	set pressed(pressed: boolean) {
		const now = window.performance.now();
		if (pressed && !this.pressed) {
			this._pressTimes.push(now);
			this._presses++;
		}

		const endTime = now - secondToMilliseconds;
		this._pressTimes = this._pressTimes.filter((time) => time > endTime);
		this._bestMashSpeed = Math.max(this.mashSpeed, this._bestMashSpeed);

		this._pressed = pressed;
	}

	get presses(): number {
		return this._presses;
	}

	get mashSpeed(): number {
		return this._pressTimes.length;
	}

	get bestMashSpeed(): number {
		return this._bestMashSpeed;
	}

	public reset() {
		this._presses = 0;
		this._pressTimes = [];
		this._bestMashSpeed = 0;
	}
}
