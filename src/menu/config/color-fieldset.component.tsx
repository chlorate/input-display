import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {Config, DefaultColors} from "../../config/config";
import {Store} from "../../storage/store";
import {ColorInputComponent} from "./color-input.component";
import {PaletteFieldsetComponent} from "./palette-fieldset.component";

interface Props {
	config: Config;
}

/**
 * A set of fields for customizing the colors of the display.
 */
export const ColorFieldsetComponent = connect([Store.Config], ({config}: Props) => (
	<fieldset>
		<div class="form-row">
			<ColorInputComponent
				className="col"
				id="config-background-color"
				label="Background"
				value={config.backgroundColor}
				placeholder={DefaultColors.Background}
				onChange={linkEvent(config, handleChange)}
			/>
			<div class="col-6"></div>
			<div class="col-2"></div>
		</div>

		<h3 class="h5">
			Button (unpressed)
		</h3>
		<PaletteFieldsetComponent
			id="config-button-unpressed-palette"
			palette={config.buttonUnpressedPalette}
		/>

		<h3 class="h5">
			Button (pressed)
		</h3>
		<PaletteFieldsetComponent
			id="config-button-pressed-palette"
			palette={config.buttonPressedPalette}
		/>

		<h3 class="h5">
			Button (mashing + unpressed)
		</h3>
		<PaletteFieldsetComponent
			id="config-button-mashing-unpressed-palette"
			palette={config.buttonMashingUnpressedPalette}
		/>

		<h3 class="h5">
			Button (mashing + pressed)
		</h3>
		<PaletteFieldsetComponent
			id="config-button-mashing-pressed-palette"
			palette={config.buttonMashingPressedPalette}
		/>
	</fieldset>
));

function handleChange(config: Config, event): void {
	config.backgroundColor = event.target.value;
}
