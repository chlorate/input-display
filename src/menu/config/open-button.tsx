import {EventEmitter} from "events";
import {Component, VNode} from "inferno";
import {Button} from "inferno-bootstrap";
import {inject, observer} from "inferno-mobx";
import {action} from "mobx";
import {Config} from "../../config/config";
import {ErrorMessage} from "../../error";
import {Event} from "../../event";
import {loadFile} from "../../storage/file";
import {Store} from "../../storage/store";

interface Props {
	onOpen: () => void;
}

interface InjectedProps extends Props {
	config: Config;
	errors: ErrorMessage[];
	events: EventEmitter;
}

/**
 * A button that opens a file selection dialog when clicked. When a file is
 * selected, its content is loaded into the config object.
 */
@inject(Store.Config, Store.Errors, Store.Events)
@observer
export class OpenButton extends Component<Props> {
	private fileInput: HTMLInputElement | null = null;

	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public render = (): VNode => (
		<span>
			<Button color="primary" onClick={this.handleClick}>
				Open
			</Button>
			<input
				type="file"
				accept=".json"
				hidden
				ref={this.setFileInput}
				onChange={this.handleChange}
			/>
		</span>
	);

	private setFileInput = (input: HTMLInputElement | null): void => {
		this.fileInput = input;
	};

	private handleClick = (): void => {
		if (this.fileInput) {
			this.fileInput.click();
		}
	};

	private handleChange = (): void => {
		const {fileInput} = this;
		const {config, events, onOpen} = this.injected;

		if (!fileInput || !fileInput.files) {
			return;
		}

		loadFile(fileInput.files[0], config)
			.then(
				(): void => {
					events.emit(Event.LoadConfig);
					onOpen();
				},
			)
			.catch(this.handleFileError)
			.then(this.deselectFile);
	};

	@action
	private handleFileError = (error: string): void => {
		this.injected.errors.push(
			new ErrorMessage(`Failed to open config file: ${error}`),
		);
	};

	private deselectFile = (): void => {
		if (this.fileInput) {
			this.fileInput.value = "";
		}
	};
}
