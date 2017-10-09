import {render} from "inferno";
import Component from "inferno-component";
import {Provider} from "inferno-mobx";
import {Config} from "./config/config";
import {Controller} from "./controller/controller";
import {GamepadComponent} from "./display/gamepad.component";
import {MenuComponent} from "./menu/menu.component";
import {Store} from "./mobx/store";
import {loadLocalStorage, saveLocalStorage} from "./storage/local";

interface State {
	config: Config;
	controller: Controller;
}

/**
 * Root component that renders the entire app and holds its state. The state is
 * loaded from localStorage upon initialization. When the user navigates away
 * from the app, the state is saved to localStorage.
 */
class IndexComponent extends Component<{}, State> {
	public state: State;

	constructor() {
		super();
		const config = new Config();
		this.state = {
			config,
			controller: new Controller(config),
		};
	}

	public componentDidMount(): void {
		loadLocalStorage(Store.Controller, this.state.controller);
		this.state.controller.poll();

		window.addEventListener("beforeunload", () => {
			saveLocalStorage(Store.Controller, this.state.controller);
		});
	}

	public render() {
		if (!navigator.getGamepads) {
			return (
				<div class="alert alert-danger text-center m-3" role="alert">
					Your browser doesn't support the Gamepad API.
				</div>
			);
		}

		return (
			<Provider config={this.state.config} controller={this.state.controller}>
				<section class="d-flex justify-content-between h-100">
					<div class="gamepads p-3">
						<GamepadComponent />
					</div>
					<div class="menu p-3">
						<MenuComponent />
					</div>
				</section>
			</Provider>
		);
	}
}

render(
	<IndexComponent />,
	document.getElementsByTagName("main")[0],
);
