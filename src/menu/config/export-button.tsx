import {Component, InfernoNode} from "inferno";
import {Button} from "inferno-bootstrap";
import {inject, observer} from "inferno-mobx";
import {Config} from "../../config/config";
import {isObs} from "../../obs/util";
import {Store} from "../../storage/store";

interface Props {
	onExport: (json: string) => void;
}

interface InjectedProps extends Props {
	config: Config;
}

/**
 * A button that exports the config to a JSON string when clicked.
 */
@inject(Store.Config)
@observer
export class ExportButton extends Component<Props> {
	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public render(): InfernoNode {
		if (!isObs()) {
			return null;
		}

		return (
			<Button color="primary" onClick={this.onClick}>
				Export
			</Button>
		);
	}

	private onClick = (): void => {
		const json = JSON.stringify(this.injected.config);
		this.props.onExport(json);
	};
}
