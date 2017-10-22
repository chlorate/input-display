import {connect} from "inferno-mobx";
import {Config} from "../config/config";
import {Palette} from "../config/palette";
import {quote} from "../css/util";
import {Store} from "../storage/store";

interface Props {
	config: Config;
}

/**
 * Generates a stylesheet based on all style-related settings.
 */
export const StylesheetComponent = connect([Store.Config], ({config}: Props) => (
	<style>
		{`
			.display svg {
				background-color: ${config.backgroundColor};
				${config.fontName ? `font-family: ${quote(config.fontName)};` : ""}
				${config.fontBold ? "font-weight: bold;" : ""}
				${config.fontItalic ? "font-style: italic;" : ""}
				${!config.fontShadow ? "text-shadow: none;" : ""}
				font-size: ${config.fontSize}px;
			}
		`}
		{paletteCss(config.buttonUnpressedPalette)}
		{paletteCss(config.buttonPressedPalette, ".control-button-pressed")}
		{paletteCss(config.buttonMashingUnpressedPalette, ".control-button-mashing")}
		{paletteCss(config.buttonMashingPressedPalette, ".control-button-mashing.control-button-pressed")}
		{config.customCss}
	</style>
));

function paletteCss(palette: Palette, selector?: string): string {
	selector = selector || "";
	return `
		${selector} .control-button {
			stroke: ${palette.border};
			fill: ${palette.fill};
		}
		${selector} .control-label {
			fill: ${palette.label};
		}
	`;
}
