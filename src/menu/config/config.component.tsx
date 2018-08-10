import {EventEmitter} from "events";
import {Component, linkEvent} from "inferno";
import {inject} from "inferno-mobx";
import {action} from "mobx";
import {Config} from "../../config/config";
import {Event} from "../../event";
import {isObs} from "../../obs/util";
import {loadFile, saveFile} from "../../storage/file";
import {Store} from "../../storage/store";
import {AdvancedConfigComponent} from "./advanced-config.component";
import {ColorConfigComponent} from "./color-config.component";
import {ControlConfigComponent} from "./control-config.component";
import {ControllerConfigComponent} from "./controller-config.component";
import {DisplayConfigComponent} from "./display-config.component";
import {FontConfigComponent} from "./font-config.component";

interface InjectedProps {
	config: Config;
	errors: string[];
	events: EventEmitter;
}

interface State {
	saveUrl?: string;
	exportData?: string;
}

/**
 * Contents of the Config tab. Provides fields for configuring the controller
 * and input display.
 */
@inject(Store.Config, Store.Errors, Store.Events)
export class ConfigComponent extends Component<{}, State> {
	public state: State = {};
	public fileInput: HTMLInputElement | null = null;

	public get injected(): InjectedProps {
		return this.props as InjectedProps;
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
					{!isObs() &&
						<button
							type="button"
							className="btn btn-primary"
							onClick={linkEvent(this, handleClickSave)}
						>
							Save
						</button>
					}
					{isObs() &&
						<button
							type="button"
							className="btn btn-primary"
							onClick={linkEvent(this, handleClickExport)}
						>
							Export
						</button>
					}
				</div>

				{this.state.saveUrl &&
					<div className="alert alert-success alert-dismissible" role="alert">
						Right-click and "Save link as":{" "}
						<a href={this.state.saveUrl} download={`${Store.Config}.json`}>
							{Store.Config}.json
						</a>
						<button
							className="close"
							aria-label="Close"
							onClick={linkEvent(this, handleClickCloseSave)}
						>
							<span aria-hidden="true">×</span>
						</button>
					</div>
				}
				{this.state.exportData &&
					<div className="alert alert-success alert-dismissible" role="alert">
						<p>
							OBS Browser Source does not support file downloads.
							Copy and paste the following into a config.json
							file:
						</p>
						<input
							type="text"
							className="form-control"
							value={this.state.exportData}
							readOnly
							onClick={linkEvent(undefined, handleFocusExportData)}
							onFocus={linkEvent(undefined, handleFocusExportData)}
						/>
						<button
							className="close"
							aria-label="Close"
							onClick={linkEvent(this, handleClickCloseExport)}
						>
							<span aria-hidden="true">×</span>
						</button>
					</div>
				}

				<h2 className="h4">
					Controller
				</h2>
				<ControllerConfigComponent />

				<h2 className="h4">
					Display
				</h2>
				<DisplayConfigComponent />

				<h2 className="h4">
					Font
				</h2>
				<FontConfigComponent />

				<h2 className="h4">
					Colors
				</h2>
				<ColorConfigComponent />

				<h2 className="h4">
					Controls
				</h2>
				<ControlConfigComponent />

				<h2 className="h4">
					Advanced
				</h2>
				<AdvancedConfigComponent />
			</div>
		);
	}
}

const handleChangeFile = action((component: ConfigComponent): void => {
	if (component.fileInput && component.fileInput.files) {
		component.saveUrl = undefined;
		loadFile(component.fileInput.files[0], component.injected.config)
			.then(() => {
				component.injected.events.emit(Event.LoadConfig);
			})
			.catch(action((error: string) => {
				component.injected.errors.push("Failed to open config file: " + error);
			}))
			.then(() => {
				if (component.fileInput) {
					// Deselect current file.
					component.fileInput.value = "";
				}
			});
	}
});

function handleClickOpen(component: ConfigComponent): void {
	if (component.fileInput) {
		component.fileInput.click();
	}
}

function handleClickSave(component: ConfigComponent): void {
	component.saveUrl = saveFile(component.injected.config);
}

function handleClickCloseSave(component: ConfigComponent): void {
	component.saveUrl = undefined;
}

function handleClickExport(component: ConfigComponent): void {
	component.setState({exportData: JSON.stringify(component.injected.config)});
}

function handleFocusExportData(_, event): void {
	event.target.select();
}

function handleClickCloseExport(component: ConfigComponent): void {
	component.setState({exportData: undefined});
}
