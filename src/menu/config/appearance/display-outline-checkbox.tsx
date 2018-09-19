import {Component, VNode} from "inferno";
import {FormText} from "inferno-bootstrap";
import {inject, observer} from "inferno-mobx";
import {action} from "mobx";
import {Config} from "../../../config/config";
import {Store} from "../../../storage/store";
import {CheckboxGroup} from "../field";

interface InjectedProps {
	config: Config;
}

/**
 * A checkbox for toggling an outline around the display.
 */
@inject(Store.Config)
@observer
export class DisplayOutlineCheckbox extends Component {
	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public render = (): VNode => (
		<div>
			<CheckboxGroup
				id="config-display-outline"
				label="Show outline"
				checked={this.injected.config.displayOutline}
				describedBy="config-display-outline-help"
				onChange={this.handleChange}
			/>
			<FormText className="m-0" id="config-display-outline-help">
				Helps with cropping.
			</FormText>
		</div>
	);

	@action
	private handleChange = (checked: boolean): void => {
		this.injected.config.displayOutline = checked;
	};
}
