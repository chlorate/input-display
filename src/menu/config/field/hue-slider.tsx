import {
	Component,
	InfernoKeyboardEvent,
	InfernoMouseEvent,
	InfernoNode,
} from "inferno";
import {observer} from "inferno-mobx";
import {action, computed, observable} from "mobx";
import {maxHue, minHue} from "../../../css";
import {Event, Key} from "../../../event";
import {clamp} from "../../../math/util";

interface Props {
	hue: number;
	onChange: (hue: number) => void;
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

	public render = (): InfernoNode => (
		<div className="hue-slider border-outline mr-2">
			<div
				ref={this.setGradientDiv}
				className="hue-slider-gradient"
				onMouseDown={this.handleMouseDown}
			>
				<div
					ref={this.setThumbDiv}
					className="hue-slider-thumb border-outline"
					style={`top: ${this.thumbY};`}
					tabIndex={0}
					role="slider"
					aria-label="Hue"
					aria-orientation="vertical"
					aria-valuemin={minHue}
					aria-valuemax={maxHue}
					aria-valuenow={Math.floor(this.props.hue)}
					onKeyDown={this.handleKeyDown}
				/>
			</div>
		</div>
	);

	@action
	private setGradientDiv = (div: HTMLDivElement): void => {
		this.gradientDiv = div;
	};

	private setThumbDiv = (div: HTMLDivElement): void => {
		this.thumbDiv = div;
	};

	private focusThumb(): void {
		if (this.thumbDiv) {
			this.thumbDiv.focus();
		}
	}

	private get thumbY(): string {
		if (!this.gradientDiv) {
			return "0";
		}

		const y = (1 - this.props.hue / maxHue) * this.maxThumbY;
		return `${clamp(y, 0, this.maxThumbY)}px`;
	}

	@computed
	private get maxThumbY(): number {
		if (!this.gradientDiv) {
			return 0;
		}

		return this.gradientDiv.getBoundingClientRect().height - 1;
	}

	private handleMouseDown = (
		event: InfernoMouseEvent<HTMLDivElement>,
	): void => {
		this.focusThumb();
		this.readMousePosition(event);
		window.addEventListener(Event.MouseMove, this.readMousePosition);
		window.addEventListener(Event.MouseUp, this.removeListeners);
		event.preventDefault();
	};

	private readMousePosition = (
		event: InfernoMouseEvent<HTMLElement>,
	): void => {
		if (this.gradientDiv) {
			const rect = this.gradientDiv.getBoundingClientRect();
			const y = event.clientY - rect.top;
			const hue = (1 - y / this.maxThumbY) * maxHue;
			this.triggerChange(hue);
		}
	};

	private removeListeners = (): void => {
		window.removeEventListener(Event.MouseMove, this.readMousePosition);
		window.removeEventListener(Event.MouseUp, this.removeListeners);
	};

	private handleKeyDown = (
		event: InfernoKeyboardEvent<HTMLDivElement>,
	): void => {
		let {hue} = this.props;
		switch (event.key) {
			case Key.Home:
				hue = maxHue;
				break;
			case Key.End:
				hue = minHue;
				break;
			case Key.PageUp:
				hue += 10;
				break;
			case Key.PageDown:
				hue -= 10;
				break;
			case Key.Up:
			case Key.Right:
				hue++;
				break;
			case Key.Down:
			case Key.Left:
				hue--;
				break;
			default:
				return;
		}

		this.triggerChange(hue);
		event.preventDefault();
	};

	private triggerChange(hue: number): void {
		this.props.onChange(clamp(hue, minHue, maxHue));
	}
}
