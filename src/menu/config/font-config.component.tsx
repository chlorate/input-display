import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {action} from "mobx";
import {Config, defaultFontSize, maxFontNameLength, maxFontSize, minFontSize} from "../../config/config";
import {Store} from "../../storage/store";
import {CheckboxInputComponent} from "../field/checkbox-input.component";
import {NumberInputComponent} from "../field/number-input.component";
import {TextInputComponent} from "../field/text-input.component";

interface Props {
	config: Config;
}

/**
 * A section within the Config tab for customizing the font used in the display.
 */
export const FontConfigComponent = connect([Store.Config], ({config}: Props) => (
	<section className="mb-5">
		<div className="form-row">
			<TextInputComponent
				className="col"
				id="config-font-name"
				label="Name"
				value={config.fontName}
				maxLength={maxFontNameLength}
				onInput={linkEvent(config, handleInputName)}
			/>
			<NumberInputComponent
				className="col-auto"
				id="config-font-size"
				label="Size"
				suffix="px"
				value={config.fontSize}
				min={minFontSize}
				max={maxFontSize}
				placeholder={defaultFontSize}
				onChange={linkEvent(config, handleChangeSize)}
			/>
		</div>
		<div className="form-row">
			<CheckboxInputComponent
				className="col-auto"
				label="Bold"
				checked={config.fontBold}
				onClick={linkEvent(config, handleClickBold)}
			/>
			<CheckboxInputComponent
				className="col-auto"
				label="Italic"
				checked={config.fontItalic}
				onClick={linkEvent(config, handleClickItalic)}
			/>
			<CheckboxInputComponent
				className="col-auto"
				label="Shadow"
				checked={config.fontShadow}
				onClick={linkEvent(config, handleClickShadow)}
			/>
		</div>
	</section>
));

const handleInputName = action((config: Config, event): void => {
	config.fontName = event.target.value;
});

const handleClickBold = action((config: Config, event): void => {
	config.fontBold = event.target.checked;
});

const handleClickItalic = action((config: Config, event): void => {
	config.fontItalic = event.target.checked;
});

const handleClickShadow = action((config: Config, event): void => {
	config.fontShadow = event.target.checked;
});

const handleChangeSize = action((config: Config, event): void => {
	config.fontSize = event.target.value || defaultFontSize;
});
