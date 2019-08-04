import {Component, InfernoNode} from "inferno";
import {Button} from "inferno-bootstrap";
import {inject, observer} from "inferno-mobx";
import {action} from "mobx";
import {Controller} from "../../controller/controller";
import {Store} from "../../storage/store";

interface InjectedProps {
	controller: Controller;
}

/**
 * A button that resets all of the controller's buttons when clicked.
 */
@inject(Store.Controller)
@observer
export class ResetButtonsButton extends Component {
	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public render(): InfernoNode | undefined {
		if (!this.injected.controller.buttons.length) {
			return;
		}

		return (
			<Button
				color="warning"
				size="sm"
				className="float-right"
				onClick={this.handleClick}
			>
				Reset
			</Button>
		);
	}

	@action
	private handleClick = (): void => {
		this.injected.controller.resetButtons();
	};
}
