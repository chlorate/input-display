import {Component, InfernoNode} from "inferno";
import {Button} from "inferno-bootstrap";
import {inject, observer} from "inferno-mobx";
import {Config} from "../../config/config";
import {isObs} from "../../obs/util";
import {saveFile} from "../../storage/file";
import {Store} from "../../storage/store";

interface Props {
	onSave: (url: string) => void;
}

interface InjectedProps extends Props {
	config: Config;
}

/**
 * A button that saves the config to a JSON file and responds with a URL where
 * that file can be downloaded.
 */
@inject(Store.Config)
@observer
export class SaveButton extends Component<Props> {
	private saveUrl?: string;

	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public componentWillUnmount(): void {
		this.revokeSaveUrl();
	}

	public render(): InfernoNode {
		if (isObs()) {
			return null;
		}

		return (
			<Button color="primary" onClick={this.handleClick}>
				Save
			</Button>
		);
	}

	private revokeSaveUrl(): void {
		if (this.saveUrl) {
			URL.revokeObjectURL(this.saveUrl);
		}
	}

	private handleClick = (): void => {
		this.revokeSaveUrl();
		this.saveUrl = saveFile(this.injected.config);
		this.props.onSave(this.saveUrl);
	};
}
