import EventEmitter from "events";
import createMemoryHistory from "history/createMemoryHistory";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {IndexRoute, Route, Router} from "inferno-router";
import {Event} from "../event";
import {Store} from "../storage/store";
import {ConfigComponent} from "./config/config.component";
import {ControllerComponent} from "./controller/controller.component";
import {HelpComponent} from "./help/help.component";
import {MenuButtonComponent} from "./menu-button.component";
import {MenuCardComponent} from "./menu-card.component";

interface Props {
	events: EventEmitter;
}

/**
 * Renders the menu. A router is used to navigate between tabs and closing the
 * menu.
 */
@connect([Store.Events])
export class MenuComponent extends Component<Props, {}> {
	private history;

	constructor(props: Props) {
		super(props);
		this.history = createMemoryHistory({
			initialEntries: ["/config"],
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
