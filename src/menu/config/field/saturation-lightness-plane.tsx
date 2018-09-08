import {Component, KeyboardEvent, MouseEvent, VNode} from "inferno";
import {observer} from "inferno-mobx";
import {action, computed, observable} from "mobx";
import {Event, Key} from "../../../event";
import {clamp} from "../../../math/util";

import {
	maxLightness,
	maxSaturation,
	minLightness,
	minSaturation,
} from "../../../css";

interface Props {
	hue: number;
	saturation: number;
	lightness: number;
	onChange: (saturation: number, lightness: number) => void;
}

/**
 * A 2-dimensional plane for selecting a color's saturation and lightness
 * values.
 */
@observer
export class SaturationLightnessPlane extends Component<Props> {
	@observable
	private gradientDiv: HTMLDivElement | null = null;

	private pointDiv: HTMLDivElement | null = null;

	public componentWillUnmount(): void {
		this.removeListeners();
	}

	public render = (): VNode => (
		<div className="saturation-lightness-plane border-outline">
			<div
				ref={this.setGradientDiv}
				className="saturation-lightness-plane-gradient"
				style={`background-color: ${this.hueColor};`}
				onMouseDown={this.handleMouseDown}
			>
				<div
					ref={this.setPointDiv}
					className="saturation-lightness-plane-point border-outline"
					style={`left: ${this.pointX}; top: ${this.pointY};`}
					tabIndex={0}
					aria-label="Saturation and lightness"
					aria-valuetext={this.valueText}
					onKeyDown={this.handleKeyDown}
				/>
			</div>
			<p className="sr-only">
				A 2-dimensional plane representing a color's saturation and
				lightness values. Left and right adjust saturation. Up and down
				adjust lightness.
			</p>
		</div>
	);

	@action
	private setGradientDiv = (div: HTMLDivElement): void => {
		this.gradientDiv = div;
	};

	private setPointDiv = (div: HTMLDivElement): void => {
		this.pointDiv = div;
	};

	private focusPoint(): void {
		if (this.pointDiv) {
			this.pointDiv.focus();
		}
	};

	private get hueColor(): string {
		return `hsl(${this.props.hue}, 100%, 50%)`;
	}

	private get pointX(): string {
		if (!this.gradientDiv) {
			return "0";
		}

		const x = (this.props.saturation / maxSaturation) * this.maxPointX;
		return `${clamp(x, 0, this.maxPointX)}px`;
	}

	private get pointY(): string {
		if (!this.gradientDiv) {
			return "0";
		}

		const {saturation, lightness} = this.props;
		const scaledMaxLightness = this.scaledMaxLightness(saturation);
		const y = (1 - lightness / scaledMaxLightness) * this.maxPointY;
		return `${clamp(y, 0, this.maxPointY)}px`;
	}

	@computed
	private get maxPointX(): number {
		if (!this.gradientDiv) {
			return 0;
		}

		return this.gradientDiv.getBoundingClientRect().width - 1;
	}

	@computed
	private get maxPointY(): number {
		if (!this.gradientDiv) {
			return 0;
		}

		return this.gradientDiv.getBoundingClientRect().height - 1;
	}

	private get valueText(): string {
		const {saturation, lightness} = this.props;
		return (
			`${saturation.toFixed(1)}% saturation, ` +
			`${lightness.toFixed(1)}% lightness`
		);
	}

	private handleMouseDown = (event: MouseEvent<HTMLDivElement>): void => {
		this.focusPoint();
		this.readMousePosition(event);
		window.addEventListener(Event.MouseMove, this.readMousePosition);
		window.addEventListener(Event.MouseUp, this.removeListeners);
		event.preventDefault();
	};

	private readMousePosition = (event: MouseEvent<HTMLElement>): void => {
		if (this.gradientDiv) {
			const rect = this.gradientDiv.getBoundingClientRect();

			const x = event.clientX - rect.left;
			const saturation = (x / this.maxPointX) * maxSaturation;

			const y = event.clientY - rect.top;
			const scaledMaxLightness = this.scaledMaxLightness(saturation);
			const lightness = (1 - y / this.maxPointY) * scaledMaxLightness;

			this.triggerChange(saturation, lightness);
		}
	};

	private removeListeners = (): void => {
		window.removeEventListener(Event.MouseMove, this.readMousePosition);
		window.removeEventListener(Event.MouseUp, this.removeListeners);
	};

	private handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
		let {saturation, lightness} = this.props;
		switch (event.key) {
			case Key.Left:
				saturation--;
				break;
			case Key.Right:
				saturation++;
				break;
			case Key.Up:
				lightness++;
				break;
			case Key.Down:
				lightness--;
				break;
			default:
				return;
		}

		this.triggerChange(saturation, lightness);
		event.preventDefault();
	};

	private triggerChange(saturation: number, lightness: number): void {
		saturation = clamp(saturation, minSaturation, maxSaturation);

		const scaledMaxLightness = this.scaledMaxLightness(saturation);
		lightness = clamp(lightness, minLightness, scaledMaxLightness);

		this.props.onChange(saturation, lightness);
	}

	private scaledMaxLightness(saturation: number): number {
		// Maximum lightness is proportional to the current saturation. At
		// 0% saturation, the max lightness is 100%. At 100% saturation, the max
		// lightness is 50%. On this plane, this places the fully saturated
		// color in the top-right corner, white in the top-left, and black along
		// the bottom.

		saturation = clamp(saturation, minSaturation, maxSaturation);
		const scale = 1 - saturation / (2 * maxSaturation);
		return maxLightness * scale;
	}
}
