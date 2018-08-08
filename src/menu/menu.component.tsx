import EventEmitter from "events";
import {Component} from "inferno";
import {inject} from "inferno-mobx";
import {MemoryRouter, Route, Switch} from "inferno-router";
import {Config} from "../config/config";
import {Event} from "../event";
import {Store} from "../storage/store";
import {ConfigComponent} from "./config/config.component";
import {ControllerComponent} from "./controller/controller.component";
import {HelpComponent} from "./help/help.component";
import {MenuButtonComponent} from "./menu-button.component";
import {MenuCardComponent} from "./menu-card.component";

interface InjectedProps {
	config: Config;
	events: EventEmitter;
}

/**
 * Renders the menu. A router is used to navigate between tabs and closing the
 * menu.
 */
@inject(Store.Config, Store.Events)
export class MenuComponent extends Component {
	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public render(): JSX.Element {
		// Open menu on startup if no controls are defined.
		let entry = "/";
		if (!this.injected.config.controls.length) {
			entry = "/config";
		}

		// TODO: onUpdate={() => this.handleUpdate()}
		// No more onUpdate
		return (
			<MemoryRouter initialEntries={[entry]}>
				<Switch>
					<Route exact path="/" component={MenuButtonComponent} />
					<Route component={MenuCardComponent}>
						<Route path="/config" component={ConfigComponent} />
						<Route
							path="/controller"
							component={ControllerComponent}
						/>
						<Route path="/help" component={HelpComponent} />
					</Route>
				</Switch>
			</MemoryRouter>
		);
	}

	private handleUpdate(): void {
		this.injected.events.emit(Event.NavigateTab);
	}
}
