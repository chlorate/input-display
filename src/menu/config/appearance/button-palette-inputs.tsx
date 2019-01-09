import {Component, VNode} from "inferno";
import {inject, observer} from "inferno-mobx";
import {Store} from "../../../storage/store";
import {Config, DefaultColors} from "../../../config/config";
import {ButtonPaletteRow} from "../field";

interface IInjectedProps {
	config: Config;
}

/**
 * A set of fields for customizing each of the default button palettes.
 */
@inject(Store.Config)
@observer
export class ButtonPaletteInputs extends Component {
	private get injected(): IInjectedProps {
		return this.props as IInjectedProps;
	}

	public render(): VNode {
		const {config} = this.injected;
		return (
			<div>
				<h4 className="h5">Unpressed</h4>
				<ButtonPaletteRow
					id="config-button-palette-unpressed"
					palette={config.buttonUnpressedPalette}
					borderDefault={DefaultColors.ButtonUnpressedBorder}
					fillDefault={DefaultColors.ButtonUnpressedFill}
					labelDefault={DefaultColors.ButtonUnpressedLabel}
				/>

				<h4 className="h5">Pressed</h4>
				<ButtonPaletteRow
					id="config-button-palette-pressed"
					palette={config.buttonPressedPalette}
					borderDefault={DefaultColors.ButtonPressedBorder}
					fillDefault={DefaultColors.ButtonPressedFill}
					labelDefault={DefaultColors.ButtonPressedLabel}
				/>

				<h4 className="h5">Mashing + unpressed</h4>
				<ButtonPaletteRow
					id="config-button-palette-mashing-unpressed"
					palette={config.buttonMashingUnpressedPalette}
					borderDefault={DefaultColors.ButtonMashingUnpressedBorder}
					fillDefault={DefaultColors.ButtonMashingUnpressedFill}
					labelDefault={DefaultColors.ButtonMashingUnpressedLabel}
				/>

				<h4 className="h5">Mashing + pressed</h4>
				<ButtonPaletteRow
					className="form-row-collapse-margin"
					id="config-button-palette-mashing-pressed"
					palette={config.buttonMashingPressedPalette}
					borderDefault={DefaultColors.ButtonMashingPressedBorder}
					fillDefault={DefaultColors.ButtonMashingPressedFill}
					labelDefault={DefaultColors.ButtonMashingPressedLabel}
				/>
			</div>
		);
	}
}
