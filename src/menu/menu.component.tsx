import {Component} from "inferno";
import {inject} from "inferno-mobx";
import {HashRouter, Route, Switch} from "inferno-router";
import {MenuButton, MenuCard} from ".";
import {Config} from "../config/config";
import {Store} from "../storage/store";
import {ConfigComponent} from "./config/config.component";
import {ControllerComponent} from "./controller/controller.component";
import {HelpComponent} from "./help/help.component";

interface InjectedProps {
	config: Config;
}

/**
 * Renders the menu. A router is used to navigate between tabs and closing the
 * menu.
 */
@inject(Store.Config)
export class Menu extends Component {
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

	public render(): JSX.Element {
		return (
			<HashRouter>
				<Switch>
					<Route exact path="/" component={MenuButton} />
					<Route component={MenuCard}>
					{/*
						<Route path="/config" component={ConfigComponent} />
						<Route
							path="/controller"
							component={ControllerComponent}
						/>
						<Route path="/help" component={HelpComponent} />
					*/}
					</Route>
				</Switch>
			</HashRouter>
		);
	}
}
