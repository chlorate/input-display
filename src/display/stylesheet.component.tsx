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
		{paletteCss(config.buttonPressedPalette, ".widget-button-pressed")}
		{paletteCss(config.buttonMashingUnpressedPalette, ".widget-button-mashing")}
		{paletteCss(config.buttonMashingPressedPalette, ".widget-button-mashing.widget-button-pressed")}
		{config.customCss}
	</style>
));

function paletteCss(palette: Palette, selector?: string): string {
	selector = selector || "";
	return `
		${selector} .widget-button {
			stroke: ${palette.border};
			fill: ${palette.fill};
		}
		${selector} .widget-label {
			fill: ${palette.label};
		}
	`;
}
