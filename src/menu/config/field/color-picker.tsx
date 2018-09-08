import convert from "color-convert";
import {Component, VNode} from "inferno";
import {observer} from "inferno-mobx";
import {action, observable} from "mobx";
import {HueSlider, SaturationLightnessPlane} from ".";
import {ensureColor} from "../../../css";

interface Props {
	color: string;
	onChange: (color: string) => void;
}

/**
 * An graphical widget for selecting a color by adjusting hue, saturation, and
 * lightness values.
 */
@observer
export class ColorPicker extends Component<Props> {
	@observable
	private hue: number = 0;

	@observable
	private saturation: number = 0;

	@observable
	private lightness: number = 0;

	private lastHex?: string;

	public componentDidMount(): void {
		this.handleChangeHex();
	}

	public componentDidUpdate(prevProps: Props): void {
		const {color} = this.props;
		if (color !== prevProps.color && color !== this.lastHex) {
			this.handleChangeHex();
		}
	}

	public render = (): VNode => (
		<div>
			<HueSlider hue={this.hue} onChange={this.handleChangeHue} />
			<SaturationLightnessPlane
				hue={this.hue}
				saturation={this.saturation}
				lightness={this.lightness}
				onChange={this.handleChangeSaturationLightness}
			/>
		</div>
	);

	@action
	private handleChangeHex(): void {
		const hex = this.props.color;
		[this.hue, this.saturation, this.lightness] = convert.hex.hsl(hex);
	}

	@action
	private handleChangeHue = (hue: number): void => {
		this.hue = hue;
		this.triggerChange();
	};

	@action
	private handleChangeSaturationLightness = (
		saturation: number,
		lightness: number,
	): void => {
		this.saturation = saturation;
		this.lightness = lightness;
		this.triggerChange();
	};

	private triggerChange(): void {
		const hex = ensureColor(
			`#${convert.hsl.hex(this.hue, this.saturation, this.lightness)}`,
			"#000000",
		);

		this.lastHex = hex;
		this.props.onChange(hex);
	}
}
