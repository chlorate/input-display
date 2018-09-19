import {Component, VNode} from "inferno";
import {Col, FormText} from "inferno-bootstrap";
import {inject, observer} from "inferno-mobx";
import {action} from "mobx";
import {CheckboxGroup, NumberGroup, TextGroup} from "../field";
import {Store} from "../../../storage/store";

import {
	Config,
	defaultFontSize,
	maxFontNameLength,
	maxFontSize,
	minFontSize,
} from "../../../config/config";

interface InjectedProps {
	config: Config;
}

/**
 * Fields for changing the font used for control labels in the display.
 */
@inject(Store.Config)
@observer
export class LabelFontInputs extends Component {
	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public render(): VNode {
		const {config} = this.injected;
		return (
			<div className="mb-3">
				<div className="form-row">
					<Col>
						<TextGroup
							className="mb-2"
							id="config-label-font-name"
							label="Font name"
							value={config.fontName}
							maxLength={maxFontNameLength}
							describedBy="config-label-font-help"
							onChange={this.handleChangeName}
						/>
					</Col>
					<Col xs="auto">
						<NumberGroup
							className="mb-2"
							inputClassName="number-input-4"
							id="config-label-font-size"
							label="Size"
							value={config.fontSize}
							min={minFontSize}
							max={maxFontSize}
							placeholder={defaultFontSize}
							suffix="px"
							describedBy="config-label-font-help"
							onChange={this.handleChangeSize}
						/>
					</Col>
				</div>
				<CheckboxGroup
					inline
					id="config-label-font-bold"
					label="Bold"
					checked={config.fontBold}
					describedBy="config-label-font-help"
					onClick={this.handleClickBold}
				/>
				<CheckboxGroup
					inline
					id="config-label-font-italic"
					label="Italic"
					checked={config.fontItalic}
					describedBy="config-label-font-help"
					onClick={this.handleClickItalic}
				/>
				<CheckboxGroup
					inline
					id="config-label-font-shadow"
					label="Shadow"
					checked={config.fontShadow}
					describedBy="config-label-font-help"
					onClick={this.handleClickShadow}
				/>
				<FormText className="m-0" id="config-label-font-help">
					The default font used for control labels. Font sizes can
					also be customized for individual controls.
				</FormText>
			</div>
		);
	}

	@action
	private handleChangeName = (name: string): void => {
		this.injected.config.fontName = name;
	};

	@action
	private handleChangeSize = (size?: number): void => {
		this.injected.config.fontSize = size || defaultFontSize;
	};

	@action
	private handleClickBold = (bold: boolean) => {
		this.injected.config.fontBold = bold;
	};

	@action
	private handleClickItalic = (italic: boolean) => {
		this.injected.config.fontItalic = italic;
	};

	@action
	private handleClickShadow = (shadow: boolean) => {
		this.injected.config.fontShadow = shadow;
	};
}
