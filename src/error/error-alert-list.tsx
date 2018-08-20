import {Component, VNode} from "inferno";
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

	public render(): VNode | undefined {
		const {errors} = this.injected;
		if (!errors.length) {
			return;
		}

		const alerts: VNode[] = errors.map((error) => (
			<ErrorAlert key={error.id} error={error} />
		));

		return <div className="error-alert-list scroll">{alerts}</div>;
	}
}
