import EventEmitter from "events";
import createMemoryHistory from "history/createMemoryHistory";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {IndexRoute, Route, Router} from "inferno-router";
import {Config} from "../config/config";
import {Event} from "../event";
import {Store} from "../storage/store";
import {ConfigComponent} from "./config/config.component";
import {ControllerComponent} from "./controller/controller.component";
import {HelpComponent} from "./help/help.component";
import {MenuButtonComponent} from "./menu-button.component";
import {MenuCardComponent} from "./menu-card.component";

interface Props {
	config: Config;
	events: EventEmitter;
}

/**
 * Renders the menu. A router is used to navigate between tabs and closing the
 * menu.
 */
@connect([Store.Config, Store.Events])
export class MenuComponent extends Component<Props, {}> {
	private history;

	constructor(props: Props) {
		super(props);
		this.history = createMemoryHistory({
			// Open menu on startup if no controls are defined.
			initialEntries: [props.config.controls.length ? "/" : "/config"],
		});
	}

	public render() {
		return (
			<Router history={this.history} onUpdate={() => this.handleUpdate()}>
				<IndexRoute component={MenuButtonComponent} />
				<Route component={MenuCardComponent}>
					<Route path="/config" component={ConfigComponent} />
					<Route path="/controller" component={ControllerComponent} />
					<Route path="/help" component={HelpComponent} />
				</Route>
			</Router>
		);
	}

	private handleUpdate(): void {
		this.props.events.emit(Event.NavigateTab);
	}
}
