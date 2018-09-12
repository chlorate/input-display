import {Component, VNode} from "inferno";
import {Col} from "inferno-bootstrap";
import {inject, observer} from "inferno-mobx";
import {action} from "mobx";
import {Store} from "../../../storage/store";
import {NumberGroup} from "../field";

import {
	Config,
	defaultHeight,
	defaultWidth,
	maxHeight,
	maxWidth,
	minHeight,
	minWidth,
} from "../../../config/config";

interface InjectedProps {
	config: Config;
}

@inject(Store.Config)
@observer
export class DisplaySizeInputs extends Component {
	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public render(): VNode {
		const {config} = this.injected;
		return (
			<div class="form-row">
				<Col xs="auto">
					<NumberGroup
						inputClassName="display-size-input"
						id="config-display-width"
						label="Width"
						value={config.displayWidth}
						min={minWidth}
						max={maxWidth}
						placeholder={defaultWidth}
						suffix="px"
						onChange={this.handleChangeWidth}
					/>
				</Col>
				<Col xs="auto">
					<NumberGroup
						inputClassName="display-size-input"
						id="config-display-height"
						label="Height"
						value={config.displayHeight}
						min={minHeight}
						max={maxHeight}
						placeholder={defaultHeight}
						suffix="px"
						onChange={this.handleChangeHeight}
					/>
				</Col>
			</div>
		);
	}

	@action
	private handleChangeWidth = (width?: number): void => {
		this.injected.config.displayWidth = width || defaultWidth;
	};

	@action
	private handleChangeHeight = (height?: number): void => {
		this.injected.config.displayHeight = height || defaultHeight;
	};
}
