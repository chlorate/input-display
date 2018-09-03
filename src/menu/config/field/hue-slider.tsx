import {Component, KeyboardEvent, MouseEvent, VNode} from "inferno";
import {observer} from "inferno-mobx";
import {action, observable} from "mobx";
import {maxHue, minHue} from "../../../css";
import {Event, Key} from "../../../event";
import {clampInt} from "../../../math/util";

interface Props {
	value: number;
	onChange: (value: number) => void;
}

/**
 * A slider for selecting a color hue.
 */
@observer
export class HueSlider extends Component<Props> {
	@observable
	private gradientDiv: HTMLDivElement | null = null;

	private thumbDiv: HTMLDivElement | null = null;

	public componentWillUnmount(): void {
		this.removeListeners();
	}

	public render = (): VNode => (
		<div className="hue-slider border-outline">
			<div
				ref={this.setGradientDiv}
				className="hue-slider-gradient"
				onMouseDown={this.handleMouseDown}
			>
				<div
					ref={this.setThumbDiv}
					className="hue-slider-thumb border-outline"
					style={{top: this.thumbY}}
					tabIndex={0}
					role="slider"
					aria-label="Hue"
					aria-orientation="vertical"
					aria-valuemin={minHue}
					aria-valuemax={maxHue}
					aria-valuenow={this.props.value}
					onKeyDown={this.handleKeyDown}
				/>
			</div>
		</div>
	);

	private get thumbY(): string {
		if (!this.gradientDiv) {
			return "0";
		}

		const rect = this.gradientDiv.getBoundingClientRect();
		const y = (1 - this.props.value / maxHue) * (rect.height - 1);
		return `${y}px`;
	}

	@action
	private setGradientDiv = (div: HTMLDivElement): void => {
		this.gradientDiv = div;
	};

	private setThumbDiv = (div: HTMLDivElement): void => {
		this.thumbDiv = div;
	};

	private handleMouseDown = (event: MouseEvent<HTMLDivElement>): void => {
		this.readMousePosition(event);
		window.addEventListener(Event.MouseMove, this.handleMouseMove);
		window.addEventListener(Event.MouseUp, this.removeListeners);
		setTimeout(this.focusThumb); // Doesn't focus without timeout.
	};

	private handleMouseMove = (event: MouseEvent<HTMLElement>): void => {
		this.readMousePosition(event);
		event.preventDefault();
	};

	private readMousePosition(event: MouseEvent<HTMLElement>): void {
		if (this.gradientDiv) {
			const rect = this.gradientDiv.getBoundingClientRect();
			const y = event.clientY - rect.top;
			const value = (1 - y / (rect.height - 1)) * maxHue;
			this.triggerChange(value);
		}
	}

	private focusThumb = (): void => {
		if (this.thumbDiv) {
			this.thumbDiv.focus();
		}
	};

	private removeListeners = (): void => {
		window.removeEventListener(Event.MouseMove, this.handleMouseMove);
		window.removeEventListener(Event.MouseUp, this.removeListeners);
	};

	private handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
		let value = this.props.value;
		switch (event.key) {
			case Key.Home:
				value = maxHue;
				break;
			case Key.End:
				value = minHue;
				break;
			case Key.PageUp:
				value += 10;
				break;
			case Key.PageDown:
				value -= 10;
				break;
			case Key.Up:
			case Key.Right:
				value++;
				break;
			case Key.Down:
			case Key.Left:
				value--;
				break;
			default:
				return;
		}

		this.triggerChange(value);
	};

	private triggerChange(value: number): void {
		this.props.onChange(clampInt(value, minHue, maxHue));
	}
}
