import {render} from "inferno";
import Component from "inferno-component";
import {Provider} from "inferno-mobx";
import {observable} from "mobx";
import {Config} from "./config/config";
import {Controller} from "./controller/controller";
import {GamepadComponent} from "./display/gamepad.component";
import {ErrorsComponent} from "./error/errors.component";
import {MenuComponent} from "./menu/menu.component";
import {Store} from "./mobx/store";
import {loadLocalStorage, saveLocalStorage} from "./storage/local";

interface State {
	config: Config;
	controller: Controller;
	errors: string[];
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
			errors: observable([]),
		};
	}

	public componentDidMount(): void {
		try {
			loadLocalStorage(Store.Controller, this.state.controller);
		} catch (exception) {
			this.state.errors.push("Failed to load controller data: " + exception.toString());
		}
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
			<Provider
				config={this.state.config}
				controller={this.state.controller}
				errors={this.state.errors}
			>
				<section class="d-flex justify-content-between h-100">
					<div class="gamepads p-3">
						<GamepadComponent />
					</div>
					<div class="menu p-3">
						<ErrorsComponent />
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
