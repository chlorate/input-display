import {Component, VNode} from "inferno";
import {inject, observer} from "inferno-mobx";
import {Store} from "../../storage/store";
import {ErrorAlert} from "./error-alert";
import {ErrorMessage} from "./error-message";

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

		return <div className="errors scroll">{alerts}</div>;
	}
}
