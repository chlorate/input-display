import {linkEvent} from "inferno";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {arraysEqual} from "../array";
import {secondToMilliseconds} from "../time";
import {Config} from "./config";

const notConnected = "No controller connected";

interface Props {
	config: Config;
}

interface State {
	names: string[];
}

@connect(["config"])
export class DeviceSelectComponent extends Component<Props, State> {
	public state = {names: []};
	private interval?: number;

	public componentDidMount() {
		// There are connect and disconnect events, but they are unreliable.
		// Chrome (as of v61) doesn't fire the connect event in all cases. It
		// will fire it on page load, but not when controllers are connected
		// after page load.
		this.updateNames();
		this.interval = setInterval(() => this.updateNames(), secondToMilliseconds);
	}

	public componentWillUnmount() {
		if (this.interval !== undefined) {
			clearInterval(this.interval);
		}
	}

	public shouldComponentUpdate(nextProps: Props, nextState: State) {
		return !arraysEqual(this.state.names, nextState.names);
	}

	public render() {
		return (
			<div class="form-group">
				<label for="config-controller">
					Device
				</label>
				<select
					class="form-control"
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

	private updateNames() {
		const names: string[] = [];
		const gamepads = navigator.getGamepads();
		for (let i = 0; i < gamepads.length; i++) {
			if (gamepads[i]) {
				names[i] = gamepads[i].id;
			}
		}
		this.setState({names});
	}

	private options(): any[] {
		const out: any[] = this.state.names.map((name, i) => (
			<option value={i}>{i + 1} - {name}</option>
		));

		const index = this.props.config.gamepadIndex;
		if (!this.state.names[index]) {
			out.push(<option value={index}>{index + 1} - {notConnected}</option>);
		}

		return out;
	}
}

function handleChange(config: Config, event) {
	config.gamepadIndex = event.target.value;
}
