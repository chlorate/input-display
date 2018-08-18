import EventEmitter from "events";
import {Component, render, VNode} from "inferno";
import {Alert} from "inferno-bootstrap";
import {Provider} from "inferno-mobx";
import {action, configure, observable} from "mobx";
import {Config} from "./config/config";
import {Controller} from "./controller/controller";
import {DisplayComponent} from "./display/display.component";
import {StylesheetComponent} from "./display/stylesheet.component";
import {supportsGamepadApi} from "./gamepad/service";
import {ErrorsComponent} from "./menu/error/errors.component";
import {MenuComponent} from "./menu/menu.component";
import {loadLocalStorage, saveLocalStorage} from "./storage/local";
import {Store} from "./storage/store";

/**
 * Renders the entire app and holds its state. The state is loaded from
 * localStorage upon initialization. When the user navigates away from the app,
 * the state is saved to localStorage.
 */
export class App extends Component {
	private config: Config;
	private controller: Controller;
	private events: EventEmitter;

	@observable
	private errors: string[] = [];

	constructor() {
		super();
		this.config = new Config();
		this.controller = new Controller(this.config);
		this.events = new EventEmitter();
	}

	@action
	public componentWillMount(): void {
		try {
			loadLocalStorage(Store.Config, this.config);
		} catch (exception) {
			this.errors.push(
				"Failed to load config data: " + exception.toString(),
			);
		}

		try {
			loadLocalStorage(Store.Controller, this.controller);
		} catch (exception) {
			this.errors.push(
				"Failed to load controller data: " + exception.toString(),
			);
		}

		this.controller.poll();

		window.addEventListener("beforeunload", () => {
			saveLocalStorage(Store.Config, this.config);
			saveLocalStorage(Store.Controller, this.controller);
		});
	}

	public render(): VNode {
		if (!supportsGamepadApi()) {
			return (
				<Alert color="danger" className="text-center m-3">
					This browser doesn't support the Gamepad API.
				</Alert>
			);
		}

		return (
			<Provider
				config={this.config}
				controller={this.controller}
				errors={this.errors}
				events={this.events}
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
