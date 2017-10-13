import {linkEvent} from "inferno";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {arraysEqual} from "../../array/util";
import {Config} from "../../config/config";
import {getGamepadIds} from "../../gamepad/service";
import {Store} from "../../storage/store";
import {secondToMilliseconds} from "../../time/const";

const notConnected = "No controller connected";

interface Props {
	config: Config;
}

interface State {
	ids: Array<string | undefined>;
}

/**
 * A field for selecting which gamepad ("device") to read inputs from. This
 * watches for any gamepad connects or disconnects and updates itself.
 */
@connect([Store.Config])
export class DeviceSelectComponent extends Component<Props, State> {
	public state: State = {ids: []};
	private interval?: number;

	public componentDidMount(): void {
		// There are connect and disconnect events, but they are unreliable.
		// Chrome (as of v61) doesn't fire the connect event in all cases. It
		// will fire it on page load, but not when controllers are connected
		// after page load.
		this.updateNames();
		this.interval = setInterval(() => this.updateNames(), secondToMilliseconds);
	}

	public componentWillUnmount(): void {
		if (this.interval !== undefined) {
			clearInterval(this.interval);
		}
	}

	public shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
		return !arraysEqual(this.state.ids, nextState.ids);
	}

	public render() {
		return (
			<div className="form-group">
				<label for="config-controller">
					Device
				</label>
				<select
					className="form-control"
					id="config-controller"
					value={this.props.config.gamepadIndex}
					required
					onChange={linkEvent(this.props.config, handleChange)}
				>
					{this.options()}
				</select>
			</div>
		);
	}

	private updateNames(): void {
		this.setState({ids: getGamepadIds()});
	}

	private options(): any[] {
		const out: any[] = this.state.ids.map((id, i) => (
			<option value={i}>{i + 1} - {id}</option>
		));

		const index = this.props.config.gamepadIndex;
		if (!this.state.ids[index]) {
			out.push(<option value={index}>{index + 1} - {notConnected}</option>);
		}

		return out;
	}
}

function handleChange(config: Config, event): void {
	config.gamepadIndex = event.target.value;
}
