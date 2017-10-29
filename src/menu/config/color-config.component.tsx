import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {action} from "mobx";
import {Config, DefaultColors} from "../../config/config";
import {Store} from "../../storage/store";
import {ColorInputComponent} from "../field/color-input.component";
import {PaletteFieldsetComponent} from "./palette-fieldset.component";

interface Props {
	config: Config;
}

/**
 * A section within the Config tab for customizing the colors of the display.
 */
export const ColorConfigComponent = connect([Store.Config], ({config}: Props) => (
	<section className="mb-5">
		<div className="form-row">
			<ColorInputComponent
				className="col"
				id="config-background-color"
				label="Background"
				value={config.backgroundColor}
				placeholder={DefaultColors.Background}
				onChange={linkEvent(config, handleChange)}
			/>
			<div className="col-6"></div>
			<div className="col-2"></div>
		</div>

		<h3 className="h5">
			Button (unpressed)
		</h3>
		<PaletteFieldsetComponent
			id="config-button-unpressed-palette"
			palette={config.buttonUnpressedPalette}
		/>

		<h3 className="h5">
			Button (pressed)
		</h3>
		<PaletteFieldsetComponent
			id="config-button-pressed-palette"
			palette={config.buttonPressedPalette}
		/>

		<h3 className="h5">
			Button (mashing + unpressed)
		</h3>
		<PaletteFieldsetComponent
			id="config-button-mashing-unpressed-palette"
			palette={config.buttonMashingUnpressedPalette}
		/>

		<h3 className="h5">
			Button (mashing + pressed)
		</h3>
		<PaletteFieldsetComponent
			id="config-button-mashing-pressed-palette"
			palette={config.buttonMashingPressedPalette}
		/>

		<h3 className="h5">
			Analog stick (neutral)
		</h3>
		<PaletteFieldsetComponent
			id="config-axis-neutral-palette"
			palette={config.axisNeutralPalette}
		/>

		<h3 className="h5">
			Analog stick (moved)
		</h3>
		<PaletteFieldsetComponent
			id="config-axis-moved-palette"
			palette={config.axisMovedPalette}
		/>
	</section>
));

const handleChange = action((config: Config, event): void => {
	config.backgroundColor = event.target.value;
});
