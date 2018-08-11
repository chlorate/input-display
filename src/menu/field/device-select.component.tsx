import {Component, linkEvent} from "inferno";
import {inject, observer} from "inferno-mobx";
import {action} from "mobx";
import {arraysEqual} from "../../array/util";
import {Config} from "../../config/config";
import {getGamepadIds} from "../../gamepad/service";
import {Store} from "../../storage/store";
import {secondToMilliseconds} from "../../time/const";

const notConnected = "No controller connected";

interface InjectedProps {
	config: Config;
}

interface State {
	ids: Array<string | undefined>;
}

/**
 * A field for selecting which gamepad ("device") to read inputs from. This
 * watches for any gamepad connects or disconnects and updates itself.
 */
@inject(Store.Config)
@observer
export class DeviceSelectComponent extends Component<{}, State> {
	public state: State = {ids: []};
	private listener: () => void;
	private interval?: number;

	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	private get options(): JSX.Element[] {
		const options: JSX.Element[] = this.state.ids.map((id, i) => (
			<option value={i}>{i + 1}. {id}</option>
		));

		const index = this.injected.config.gamepadIndex;
		if (!this.state.ids[index]) {
			options.push(<option value={index}>{index + 1}. {notConnected}</option>);
		}

		return options;
	}

	constructor(props: {}, state: State) {
		super(props, state);
		this.listener = () => this.updateNames();
	}

	public componentDidMount(): void {
		this.updateNames();

		// Chrome (as of v61) doesn't fire the connect event in all cases (only
		// on page load), so this is also polled periodically.
		this.interval = setInterval(this.listener, secondToMilliseconds);
		window.addEventListener("gamepadconnected", this.listener);
		window.addEventListener("gamepaddisconnected", this.listener);
	}

	public componentWillUnmount(): void {
		if (this.interval !== undefined) {
			clearInterval(this.interval);
		}
		window.removeEventListener("gamepadconnected", this.listener);
		window.removeEventListener("gamepaddisconnected", this.listener);
	}

	public shouldComponentUpdate(nextProps: {}, nextState: State): boolean {
		return !arraysEqual(this.state.ids, nextState.ids);
	}

	public render() {
		const config = this.injected.config;

		return (
			<div className="form-group">
				<label htmlFor="config-controller">
					Device
				</label>
				<select
					className="form-control"
					id="config-controller"
					value={config.gamepadIndex}
					required
					onChange={linkEvent(config, handleChange)}
				>
					{this.options}
				</select>
			</div>
		);
	}

	private updateNames(): void {
		this.setState({ids: getGamepadIds()});
	}
}

const handleChange = action((config: Config, event): void => {
	config.gamepadIndex = event.target.value;
});
