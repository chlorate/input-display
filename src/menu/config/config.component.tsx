import {linkEvent} from "inferno";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {Config} from "../../config/config";
import {Store} from "../../mobx/store";
import {saveFile} from "../../storage/file";
import {DeviceSelectComponent} from "./device-select.component";
import {DpadMappingFieldsetComponent} from "./dpad-mapping-fieldset.component";
import {PollRateInputComponent} from "./poll-rate-input.component";

interface Props {
	config: Config;
}

interface State {
	saveUrl?: string;
}

/**
 * Contents of the Config tab. Provides fields for configuring the controller
 * and input display.
 */
@connect([Store.Config])
export class ConfigComponent extends Component<Props, State> {
	public state: State = {};

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
			<form onSubmit={linkEvent(undefined, handleSubmit)}>
				<div class="mb-3">
					<button type="button" class="btn btn-secondary">
						Open
					</button>{" "}
					<button
						type="button"
						class="btn btn-secondary"
						onClick={linkEvent(this, handleClickSave)}
					>
						Save
					</button>
				</div>

				{this.state.saveUrl &&
					<div class="alert alert-success" role="alert">
						<button
							class="close"
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

				<h2 class="h4">
					Controller
				</h2>
				<DeviceSelectComponent />
				<DpadMappingFieldsetComponent />
				<PollRateInputComponent />
			</form>
		);
	}
}

function handleSubmit(_: undefined, event): void {
	event.preventDefault();
}

function handleClickSave(component: ConfigComponent, event): void {
	component.saveUrl = saveFile(component.props.config);
}

function handleClickCloseSave(component: ConfigComponent, event): void {
	component.saveUrl = undefined;
}
