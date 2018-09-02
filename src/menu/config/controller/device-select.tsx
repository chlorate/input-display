import {ChangeEvent, Component, VNode} from "inferno";
import {FormGroup, FormText, Input, Label} from "inferno-bootstrap";
import {inject, observer} from "inferno-mobx";
import {action, observable} from "mobx";
import {Config} from "../../../config/config";
import {getGamepadIds} from "../../../gamepad/service";
import {Store} from "../../../storage/store";
import {secondToMilliseconds} from "../../../time/const";

interface InjectedProps {
	config: Config;
}

/**
 * A field for selecting which gamepad ("device") to read inputs from. This
 * watches for any gamepad connects or disconnects and updates itself.
 */
@inject(Store.Config)
@observer
export class DeviceSelect extends Component {
	private interval?: number;

	@observable
	private ids: Array<string | undefined> = [];

	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public componentDidMount(): void {
		this.updateIds();

		// Poll periodically just in case the browser doesn't fire connection
		// events. Old versions of Chrome didn't fire events in all cases. This
		// seems to be fixed as of Chrome 68.
		this.interval = setInterval(this.updateIds, secondToMilliseconds);

		window.addEventListener("gamepadconnected", this.updateIds);
		window.addEventListener("gamepaddisconnected", this.updateIds);
	}

	public componentWillUnmount(): void {
		if (this.interval !== undefined) {
			clearInterval(this.interval);
		}

		window.removeEventListener("gamepadconnected", this.updateIds);
		window.removeEventListener("gamepaddisconnected", this.updateIds);
	}

	public render = (): VNode => (
		<FormGroup>
			<Label for="config-device">Device</Label>
			<Input
				id="config-device"
				type="select"
				value={this.injected.config.gamepadIndex}
				required
				aria-describedby="config-device-help"
				onChange={this.handleChange}
			>
				{this.options}
			</Input>
			<FormText id="config-device-help">
				Inputs will be read from this device.
			</FormText>
		</FormGroup>
	);

	private get options(): VNode[] {
		const options: VNode[] = [];
		this.ids.forEach((id, i) => {
			if (id !== undefined) {
				options.push(
					<option value={i}>
						{i + 1}. {id}
					</option>,
				);
			}
		});

		const index = this.injected.config.gamepadIndex;
		if (index >= this.ids.length || !this.ids[index]) {
			options.push(
				<option value={index}>{index + 1}. Not connected</option>,
			);
		}

		return options;
	}

	@action
	private updateIds = (): void => {
		this.ids = getGamepadIds();
	};

	@action
	private handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
		this.injected.config.gamepadIndex = parseInt(event.target.value, 10);
	};
}
