import {Component, VNode} from "inferno";
import {FormGroup, Label} from "inferno-bootstrap";
import {inject, observer} from "inferno-mobx";
import {Config, DefaultColors} from "../../../config/config";
import {Store} from "../../../storage/store";
import {ColorInput} from "../field";

interface InjectedProps {
	config: Config;
}

/**
 * A field for selecting the background color of the display.
 */
@inject(Store.Config)
@observer
export class BackgroundColorInput extends Component {
	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public render = (): VNode => (
		<FormGroup>
			<Label for="config-background">Background</Label>
			<ColorInput
				id="config-background"
				color={this.injected.config.backgroundColor}
				placeholder={DefaultColors.Background}
				onChange={this.handleChange}
			/>
		</FormGroup>
	);

	private handleChange = (color?: string): void => {
		this.injected.config.backgroundColor =
			color || DefaultColors.Background;
	};
}
