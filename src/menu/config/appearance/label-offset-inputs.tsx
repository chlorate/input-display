import {Component, VNode} from "inferno";
import {Col, FormText} from "inferno-bootstrap";
import {inject, observer} from "inferno-mobx";
import {action} from "mobx";
import {NumberGroup} from "../field";
import {Store} from "../../../storage/store";

import {
	Config,
	defaultLabelOffset,
	maxLabelOffset,
	minLabelOffset,
} from "../../../config/config";

interface InjectedProps {
	config: Config;
}

/**
 * Fields for changing the offset applied to control labels.
 */
@inject(Store.Config)
@observer
export class LabelOffsetInputs extends Component {
	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public render(): VNode {
		const {config} = this.injected;
		return (
			<div>
				<div class="form-row">
					<Col xs="auto">
						<NumberGroup
							className="m-0"
							inputClassName="number-input-4"
							id="config-label-offset-x"
							label="Offset X"
							value={config.labelOffsetX}
							min={minLabelOffset}
							max={maxLabelOffset}
							placeholder={defaultLabelOffset}
							suffix="px"
							describedBy="config-label-offset-help"
							onChange={this.handleChangeX}
						/>
					</Col>
					<Col xs="auto">
						<NumberGroup
							className="m-0"
							inputClassName="number-input-4"
							id="config-label-offset-y"
							label="Offset Y"
							value={config.labelOffsetY}
							min={minLabelOffset}
							max={maxLabelOffset}
							placeholder={defaultLabelOffset}
							suffix="px"
							describedBy="config-label-offset-help"
							onChange={this.handleChangeY}
						/>
					</Col>
				</div>
				<FormText id="config-label-offset-help">
					Adjusts the position of all labels. Some fonts might not be
					perfectly centered and this can be used to correct the
					centering.
				</FormText>
			</div>
		);
	}

	@action
	private handleChangeX = (x?: number): void => {
		this.injected.config.labelOffsetX = x || defaultLabelOffset;
	};

	@action
	private handleChangeY = (y?: number): void => {
		this.injected.config.labelOffsetY = y || defaultLabelOffset;
	};
}
