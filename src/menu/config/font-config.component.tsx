import {Component, VNode} from "inferno";
import {Col, FormGroup, Input, Label} from "inferno-bootstrap";
import {inject, observer} from "inferno-mobx";
import {action} from "mobx";
import {NumberGroup, TextGroup} from "./field";
import {Store} from "../../storage/store";

import {
	Config,
	defaultFontSize,
	maxFontNameLength,
	maxFontSize,
	minFontSize,
} from "../../config/config";

interface InjectedProps {
	config: Config;
}

/**
 * A section within the Config tab for customizing the font used in the display.
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
			<div>
				<div className="form-row">
					<Col>
						<TextGroup
							id="config-label-font-name"
							label="Font name"
							value={config.fontName}
							maxLength={maxFontNameLength}
							onChange={this.handleChangeName}
						/>
					</Col>
					<Col xs="auto">
						<NumberGroup
							inputClassName="number-input-4"
							id="config-label-font-size"
							label="Size"
							value={config.fontSize}
							min={minFontSize}
							max={maxFontSize}
							placeholder={defaultFontSize}
							suffix="px"
							onChange={this.handleChangeSize}
						/>
					</Col>
				</div>
				<FormGroup check className="form-check-inline">
					<Input
						id="config-label-font-bold"
						type="checkbox"
						checked={config.fontBold}
						onClick={this.handleClickBold}
					/>
					<Label check for="config-label-font-bold">
						Bold
					</Label>
				</FormGroup>
				<FormGroup check className="form-check-inline">
					<Input
						id="config-label-font-italic"
						type="checkbox"
						checked={config.fontItalic}
						onClick={this.handleClickItalic}
					/>
					<Label check for="config-label-font-italic">
						Italic
					</Label>
				</FormGroup>
				<FormGroup check className="form-check-inline">
					<Input
						id="config-label-font-shadow"
						type="checkbox"
						checked={config.fontShadow}
						onClick={this.handleClickShadow}
					/>
					<Label check for="config-label-font-shadow">
						Shadow
					</Label>
				</FormGroup>
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
	private handleClickBold = (event: any) => {
		this.injected.config.fontBold = event.target.checked;
	};

	@action
	private handleClickItalic = (event: any) => {
		this.injected.config.fontItalic = event.target.checked;
	};

	@action
	private handleClickShadow = (event: any) => {
		this.injected.config.fontShadow = event.target.checked;
	};
}
