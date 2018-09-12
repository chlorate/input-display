import {MouseEvent, Component, VNode} from "inferno";
import {FormGroup, FormText, Input, Label} from "inferno-bootstrap";
import {inject, observer} from "inferno-mobx";
import {action} from "mobx";
import {Config} from "../../../config/config";
import {Store} from "../../../storage/store";

interface InjectedProps {
	config: Config;
}

@inject(Store.Config)
@observer
export class DisplayOutlineCheckbox extends Component {
	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public render = (): VNode => (
		<div>
			<FormGroup check>
				<Input
					id="config-display-outline"
					type="checkbox"
					value={this.injected.config.displayOutline}
					aria-describedby="config-display-outline-help"
					onClick={this.handleClick}
				/>
				<Label className="m-0" for="config-display-outline">
					Show outline
				</Label>
			</FormGroup>
			<FormText className="m-0" id="config-display-outline-help">
				Helps with cropping.
			</FormText>
		</div>
	);

	@action
	private handleClick = (event: MouseEvent<HTMLInputElement>): void => {
		if (event.target instanceof HTMLInputElement) {
			this.injected.config.displayOutline = event.target.checked;
		}
	};
}
