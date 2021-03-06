import {action, computed, observable} from "mobx";
import {clampInt} from "../math/util";
import {secondToMilliseconds} from "../time/const";
import {ButtonJSON} from "./json/button-json";

/**
 * An abstract controller button. It has a unique name, can be pressed, and
 * tracks statistics. Whenever the button is pressed, a timestamp is recorded.
 * The mashing speed is determined by how many timestamps were recorded in the
 * last second.
 */
export abstract class Button {
	@observable public mashing: boolean = false;
	@observable private _pressed: boolean = false;
	@observable private _presses: number = 0;
	@observable private pressTimes: number[] = [];
	@observable private _bestMashSpeed: number = 0;

	abstract get name(): string;

	get pressed(): boolean {
		return this._pressed;
	}
	set pressed(pressed: boolean) {
		const now = performance.now();
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
	set presses(presses: number) {
		this._presses = clampInt(presses, 0);
	}

	@computed get mashSpeed(): number {
		return this.pressTimes.length;
	}

	get bestMashSpeed(): number {
		return this._bestMashSpeed;
	}
	set bestMashSpeed(bestMashSpeed: number) {
		this._bestMashSpeed = clampInt(bestMashSpeed, 0);
	}

	public abstract toJSON(): ButtonJSON;

	/**
	 * Remove all press timestamps that are older than a certain time.
	 */
	@action private prunePressTimes(endTime: number) {
		while (this.pressTimes.length > 0 && this.pressTimes[0] <= endTime) {
			this.pressTimes.shift();
		}
	}
}
