import {render} from "inferno";
import Component from "inferno-component";
import {Provider} from "inferno-mobx";
import {observable} from "mobx";
import {Config} from "./config/config";
import {Controller} from "./controller/controller";
import {DisplayComponent} from "./display/display.component";
import {StylesheetComponent} from "./display/stylesheet.component";
import {ErrorsComponent} from "./menu/error/errors.component";
import {MenuComponent} from "./menu/menu.component";
import {loadLocalStorage, saveLocalStorage} from "./storage/local";
import {Store} from "./storage/store";

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
			loadLocalStorage(Store.Config, this.state.config);
		} catch (exception) {
			this.state.errors.push("Failed to load config data: " + exception.toString());
		}

		try {
			loadLocalStorage(Store.Controller, this.state.controller);
		} catch (exception) {
			this.state.errors.push("Failed to load controller data: " + exception.toString());
		}
		this.state.controller.poll();

		window.addEventListener("beforeunload", () => {
			saveLocalStorage(Store.Config, this.state.config);
			saveLocalStorage(Store.Controller, this.state.controller);
		});
	}

	public render() {
		if (!navigator.getGamepads) {
			return (
				<div className="alert alert-danger text-center m-3" role="alert">
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
				<section className="d-flex justify-content-between h-100">
					<div className="display">
						<DisplayComponent />
						<StylesheetComponent />
					</div>
					<div className="menu">
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
