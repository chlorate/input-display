import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {Config, maxHeight, maxWidth, minHeight, minWidth} from "../../config/config";
import {Store} from "../../storage/store";
import {CheckboxInputComponent} from "./checkbox-input.component";
import {NumberInputComponent} from "./number-input.component";

interface Props {
	config: Config;
}

/**
 * A set of fields related to overall configuration of the display.
 */
export const DisplayFieldsetComponent = connect([Store.Config], ({config}: Props) => (
	<fieldset>
		<div className="form-row">
			<NumberInputComponent
				className="col"
				id="config-display-width"
				label="Width"
				suffix="px"
				value={config.displayWidth}
				min={minWidth}
				max={maxWidth}
				onChange={linkEvent(config, handleChangeWidth)}
			/>
			<NumberInputComponent
				className="col"
				id="config-display-height"
				label="Height"
				suffix="px"
				value={config.displayHeight}
				min={minHeight}
				max={maxHeight}
				onChange={linkEvent(config, handleChangeHeight)}
			/>
		</div>
		<CheckboxInputComponent
			className="mb-3"
			id="config-display-outline"
			label="Show outline"
			checked={config.displayOutline}
			help="Helps with cropping a window capture."
			onClick={linkEvent(config, handleClickOutline)}
		/>
	</fieldset>
));

function handleChangeWidth(config: Config, event): void {
	config.displayWidth = event.target.value;
}

function handleChangeHeight(config: Config, event): void {
	config.displayHeight = event.target.value;
}

function handleClickOutline(config: Config, event): void {
	config.displayOutline = event.target.checked;
}
