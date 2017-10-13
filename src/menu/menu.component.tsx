import createMemoryHistory from "history/createMemoryHistory";
import Component from "inferno-component";
import {IndexRoute, Route, Router} from "inferno-router";
import {ConfigComponent} from "./config/config.component";
import {ControllerComponent} from "./controller/controller.component";
import {MenuButtonComponent} from "./menu-button.component";
import {MenuCardComponent} from "./menu-card.component";

interface State {
	history;
}

/**
 * Renders the menu. A router is used to navigate between tabs and closing the
 * menu.
 */
export class MenuComponent extends Component<{}, State> {
	public state: State;

	constructor() {
		super();
		this.state = {
			history: createMemoryHistory({
				initialEntries: ["/config"],
			}),
		};
	}

	public render() {
		return (
			<Router history={this.state.history}>
				<IndexRoute component={MenuButtonComponent} />
				<Route component={MenuCardComponent}>
					<Route path="/config" component={ConfigComponent} />
					<Route path="/controller" component={ControllerComponent} />
				</Route>
			</Router>
		);
	}
}
