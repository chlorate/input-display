import {observable} from "mobx";
import {secondToMilliseconds} from "../time/const";

/**
 * An abstract controller button. It has a unique name, can be pressed, and
 * tracks statistics.
 */
export abstract class Button {
	@observable private _pressed: boolean = false;
	@observable private _presses: number = 0;
	@observable private pressTimes: number[] = [];
	@observable private _bestMashSpeed: number = 0;

	abstract get name(): string;

	get pressed(): boolean {
		return this._pressed;
	}
	set pressed(pressed: boolean) {
		const now = window.performance.now();
		if (pressed && !this.pressed) {
			this.pressTimes.push(now);
			this._presses++;
		}

		this.prunePressTimes(now - secondToMilliseconds);
		this._bestMashSpeed = Math.max(this.mashSpeed, this._bestMashSpeed);
		this._pressed = pressed;
	}

	get presses(): number {
		return this._presses;
	}

	get mashSpeed(): number {
		return this.pressTimes.length;
	}

	get bestMashSpeed(): number {
		return this._bestMashSpeed;
	}

	/**
	 * Remove all press timestamps that are older than a certain time.
	 */
	private prunePressTimes(endTime: number) {
		while (this.pressTimes.length > 0 && this.pressTimes[0] <= endTime) {
			this.pressTimes.shift();
		}
	}
}
