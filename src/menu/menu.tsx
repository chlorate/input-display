import {Component, VNode} from "inferno";
import {inject} from "inferno-mobx";
import {HashRouter, Route, Switch} from "inferno-router";
import {MenuButton, MenuCard} from ".";
//import {Config} from "../config/config";
import {Store} from "../storage/store";
import {ConfigTab} from "./config";
import {ControllerConfigTab} from "./config/controller/controller-config-tab";
import {ControllerTab} from "./controller";
import {HelpTab} from "./help";

/*
interface InjectedProps {
	config: Config;
}
 */

/**
 * Renders the menu. A router is used to navigate between tabs and closing the
 * menu.
 */
@inject(Store.Config)
export class Menu extends Component {
	/*
	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	private get initialEntry(): string {
		const {config: {controls}} = this.injected;
		if (!controls.length) {
			return "/config";
		}
		return "/";
		// TODO: how to implement this
	}
		*/

	public render = (): VNode => (
		<HashRouter>
			<Switch>
				<Route exact path="/" component={MenuButton} />
				<MenuCard>
					<Route exact path="/config" component={ConfigTab} />
					<Route
						exact
						path="/config/controller"
						component={ControllerConfigTab}
					/>
					<Route exact path="/controller" component={ControllerTab} />
					<Route exact path="/help" component={HelpTab} />
				</MenuCard>
			</Switch>
		</HashRouter>
	);
}
