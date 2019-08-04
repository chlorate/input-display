import {Component, InfernoNode} from "inferno";
import {inject, observer} from "inferno-mobx";
import {ErrorAlert, ErrorMessage} from ".";
import {Store} from "../storage/store";

interface InjectedProps {
	errors: ErrorMessage[];
}

/**
 * A list of error messages displayed as alerts.
 */
@inject(Store.Errors)
@observer
export class ErrorAlertList extends Component {
	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public render(): InfernoNode {
		if (!this.injected.errors.length) {
			return null;
		}

		return <div className="error-alert-list scroll">{this.alerts}</div>;
	}

	private get alerts(): InfernoNode[] {
		return this.injected.errors.map((error) => (
			<ErrorAlert key={error.id} error={error} />
		));
	}
}
