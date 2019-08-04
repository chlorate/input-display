import {Component, InfernoNode} from "inferno";
import {inject} from "inferno-mobx";
import {BrowserRouter, Route, Switch} from "inferno-router";
import {MenuButton, MenuCard} from ".";
// import {Config} from "../config/config";
import {Store} from "../storage/store";
import {ConfigTab} from "./config";
import {AppearanceConfigTab} from "./config/appearance";
import {ControllerConfigTab} from "./config/controller";
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

	public render = (): InfernoNode => (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={MenuButton} />
				<MenuCard>
					<Route exact path="/config" component={ConfigTab} />
					<Route
						exact
						path="/config/controller"
						component={ControllerConfigTab}
					/>
					<Route
						exact
						path="/config/appearance"
						component={AppearanceConfigTab}
					/>
					<Route exact path="/controller" component={ControllerTab} />
					<Route exact path="/help" component={HelpTab} />
				</MenuCard>
			</Switch>
		</BrowserRouter>
	);
}
