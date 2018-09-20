import {Component, VNode} from "inferno";
import {inject, observer} from "inferno-mobx";
import {Config, DefaultColors} from "../../../config/config";
import {Store} from "../../../storage/store";
import {ColorGroup} from "../field";

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
		<ColorGroup
			id="config-background"
			label="Background"
			color={this.injected.config.backgroundColor}
			placeholder={DefaultColors.Background}
			onChange={this.handleChange}
		/>
	);

	private handleChange = (color?: string): void => {
		this.injected.config.backgroundColor =
			color || DefaultColors.Background;
	};
}
