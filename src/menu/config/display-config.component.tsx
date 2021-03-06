import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {action} from "mobx";
import {Config, defaultHeight, defaultWidth, maxHeight, maxWidth, minHeight, minWidth} from "../../config/config";
import {Store} from "../../storage/store";
import {CheckboxInputComponent} from "../field/checkbox-input.component";
import {NumberInputComponent} from "../field/number-input.component";

interface Props {
	config: Config;
}

/**
 * A section within the Config tab related to overall configuration of the
 * display.
 */
export const DisplayConfigComponent = connect([Store.Config], ({config}: Props) => (
	<section className="mb-5">
		<div className="form-row">
			<NumberInputComponent
				className="col"
				id="config-display-width"
				label="Width"
				suffix="px"
				value={config.displayWidth}
				min={minWidth}
				max={maxWidth}
				placeholder={defaultWidth}
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
				placeholder={defaultHeight}
				onChange={linkEvent(config, handleChangeHeight)}
			/>
			<div className="col-4 col-spacer"></div>
			<div className="col-2 col-spacer"></div>
		</div>
		<CheckboxInputComponent
			id="config-display-outline"
			label="Show outline"
			checked={config.displayOutline}
			help="Helps with cropping a window capture."
			onClick={linkEvent(config, handleClickOutline)}
		/>
	</section>
));

const handleChangeWidth = action((config: Config, event): void => {
	config.displayWidth = event.target.value || defaultWidth;
});

const handleChangeHeight = action((config: Config, event): void => {
	config.displayHeight = event.target.value || defaultHeight;
});

const handleClickOutline = action((config: Config, event): void => {
	config.displayOutline = event.target.checked;
});
