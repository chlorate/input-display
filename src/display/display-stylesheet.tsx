import {Component, InfernoNode} from "inferno";
import {inject, observer} from "inferno-mobx";
import {ButtonPalette} from "../config/button-palette";
import {Config} from "../config/config";
import {Palette} from "../config/palette";
import {quote} from "../css";
import {Store} from "../storage/store";

interface InjectedProps {
	config: Config;
}

/**
 * Generates a stylesheet based on all style-related settings.
 */
@inject(Store.Config)
@observer
export class DisplayStylesheet extends Component {
	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public render(): InfernoNode {
		const {config} = this.injected;
		return (
			<style>
				{this.displayCss}
				{this.buttonPaletteCss(config.buttonUnpressedPalette)}
				{this.buttonPaletteCss(
					config.buttonPressedPalette,
					".control-button-pressed",
				)}
				{this.buttonPaletteCss(
					config.buttonMashingUnpressedPalette,
					".control-button-mashing",
				)}
				{this.buttonPaletteCss(
					config.buttonMashingPressedPalette,
					".control-button-mashing.control-button-pressed",
				)}
				{this.axisPaletteCss(config.axisNeutralPalette)}
				{this.axisPaletteCss(
					config.axisMovedPalette,
					".control-axis-moved",
				)}
				{config.customCss}
			</style>
		);
	}

	private get displayCss(): string {
		const {config} = this.injected;
		return `
			.display svg {
				background-color: ${config.backgroundColor};
				${config.fontName ? `font-family: ${quote(config.fontName)};` : ""}
				${config.fontBold ? "font-weight: bold;" : ""}
				${config.fontItalic ? "font-style: italic;" : ""}
				${!config.fontShadow ? "text-shadow: none;" : ""}
				font-size: ${config.fontSize}px;
			}
		`;
	}

	private buttonPaletteCss(
		palette: ButtonPalette,
		selector?: string,
	): string {
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

	private axisPaletteCss(palette: Palette, selector?: string): string {
		selector = selector || "";
		return `
			${selector} .control-axis {
				stroke: ${palette.border};
				fill: ${palette.fill};
			}
		`;
	}
}
