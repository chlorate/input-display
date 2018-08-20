import {Component, VNode} from "inferno";
import {Alert} from "inferno-bootstrap";
import {inject, observer} from "inferno-mobx";
import {action} from "mobx";
import {ErrorMessage} from ".";
import {Store} from "../storage/store";

interface Props {
	error: ErrorMessage;
}

interface InjectedProps extends Props {
	errors: ErrorMessage[];
}

/**
 * An error message displayed as an alert. The user can dismiss the error.
 */
@inject(Store.Errors)
@observer
export class ErrorAlert extends Component<Props, {}> {
	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public render(): VNode | undefined {
		const {error} = this.props;
		return (
			<Alert color="warning" onClose={this.handleClose}>
				{error.message}
			</Alert>
		);
	}

	@action
	private handleClose = (): void => {
		const {error, errors} = this.injected;
		errors.splice(errors.indexOf(error), 1);
	};
}
