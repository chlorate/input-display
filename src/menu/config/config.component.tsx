import EventEmitter from "events";
import {linkEvent} from "inferno";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {Config} from "../../config/config";
import {loadFile, saveFile} from "../../storage/file";
import {Store} from "../../storage/store";
import {AddWidgetFormComponent} from "../widget/add-widget-form.component";
import {EditWidgetFieldsetComponent} from "../widget/edit-widget-fieldset.component";
import {ColorFieldsetComponent} from "./color-fieldset.component";
import {ControllerFieldsetComponent} from "./controller-fieldset.component";
import {DisplayFieldsetComponent} from "./display-fieldset.component";

interface Props {
	config: Config;
	errors: string[];
}

interface State {
	saveUrl?: string;
}

/**
 * Contents of the Config tab. Provides fields for configuring the controller
 * and input display.
 */
@connect([Store.Config, Store.Errors])
export class ConfigComponent extends Component<Props, State> {
	public state: State = {};
	public fileInput?: HTMLInputElement;
	private events: EventEmitter;

	constructor(props: Props, state: State) {
		super(props, state);
		this.events = new EventEmitter();
	}

	set saveUrl(url: string | undefined) {
		if (this.state.saveUrl) {
			URL.revokeObjectURL(this.state.saveUrl);
		}
		this.setState({saveUrl: url});
	}

	public componentWillUnmount(): void {
		this.saveUrl = undefined;
	}

	public render() {
		return (
			<div>
				<div className="mb-3">
					<input
						type="file"
						accept=".json"
						hidden
						ref={(input) => this.fileInput = input}
						onChange={linkEvent(this, handleChangeFile)}
					/>
					<button
						type="button"
						className="btn btn-primary"
						onClick={linkEvent(this, handleClickOpen)}
					>
						Open
					</button>{" "}
					<button
						type="button"
						className="btn btn-primary"
						onClick={linkEvent(this, handleClickSave)}
					>
						Save
					</button>
				</div>

				{this.state.saveUrl &&
					<div className="alert alert-success" role="alert">
						<button
							className="close"
							aria-label="Close"
							onClick={linkEvent(this, handleClickCloseSave)}
						>
							<span aria-hidden="true">×</span>
						</button>
						Right-click and "Save link as":{" "}
						<a href={this.state.saveUrl} download={`${Store.Config}.json`}>
							{Store.Config}.json
						</a>
					</div>
				}

				<h2 className="h4">
					Controller
				</h2>
				<ControllerFieldsetComponent />

				<h2 className="h4">
					Display
				</h2>
				<DisplayFieldsetComponent />

				<h2 className="h4">
					Colors
				</h2>
				<ColorFieldsetComponent />

				<h2 className="h4">
					Widgets
				</h2>
				<AddWidgetFormComponent events={this.events} />
				<EditWidgetFieldsetComponent events={this.events} />
			</div>
		);
	}
}

function handleChangeFile(component: ConfigComponent): void {
	if (component.fileInput && component.fileInput.files) {
		loadFile(component.fileInput.files[0], component.props.config)
			.catch((error: string) => {
				component.props.errors.push("Failed to open config file: " + error);
			})
			.then(() => {
				if (component.fileInput) {
					// Deselect current file.
					component.fileInput.value = "";
				}
			});
	}
}

function handleClickOpen(component: ConfigComponent): void {
	if (component.fileInput) {
		component.fileInput.click();
	}
}

function handleClickSave(component: ConfigComponent): void {
	component.saveUrl = saveFile(component.props.config);
}

function handleClickCloseSave(component: ConfigComponent): void {
	component.saveUrl = undefined;
}
