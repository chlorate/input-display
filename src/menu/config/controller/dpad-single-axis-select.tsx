import {Component, InfernoNode} from "inferno";
import {inject, observer} from "inferno-mobx";
import {action} from "mobx";
import {Config} from "../../../config/config";
import {Store} from "../../../storage/store";
import {AxisIndexSelect} from "../field";

interface InjectedProps {
	config: Config;
}

/**
 * A field for selecting which axis will be read when the single axis d-pad
 * mapping is used.
 */
@inject(Store.Config)
@observer
export class DpadSingleAxisSelect extends Component {
	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public render(): InfernoNode | null {
		const {dpadAxisIndex} = this.injected.config;
		if (dpadAxisIndex === undefined) {
			return null;
		}

		return (
			<AxisIndexSelect
				inputClassName="w-auto"
				id="config-dpad-single-axis"
				label="Axis"
				value={dpadAxisIndex}
				onChange={this.handleChange}
			/>
		);
	}

	@action
	private handleChange = (index: number): void => {
		this.injected.config.dpadAxisIndex = index;
	};
}
