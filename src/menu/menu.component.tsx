import {linkEvent} from "inferno";
import Component from "inferno-component";
import {ConfigComponent} from "./config/config.component";
import {ControllerComponent} from "./controller/controller.component";

enum Tab {
	Config = "Config",
	Controller = "Controller",
}

const tabLinks = [
	{
		tab: Tab.Config,
		handler: handleClickConfig,
	},
	{
		tab: Tab.Controller,
		handler: handleClickController,
	},
];

interface State {
	tab?: Tab;
}

/**
 * Renders the menu. Tracks which tab is selected and shows its contents.
 */
export class MenuComponent extends Component<{}, State> {
	public state: State = {tab: Tab.Config};

	set tab(tab: Tab | undefined) {
		this.setState({tab});
	}

	public render() {
		if (!this.state.tab) {
			return (
				<div class="text-right">
					<button
						class="btn btn-primary"
						onClick={linkEvent(this, handleClickConfig)}
					>
						Menu
					</button>
				</div>
			);
		}

		return (
			<div class="card">
				<div class="card-header">
					<ul class="nav nav-tabs card-header-tabs">
						{tabLinks.map((link) => (
							<li class="nav-item">
								<a
									class={`nav-link ${this.state.tab === link.tab ? "active" : ""}`}
									href="#"
									onClick={linkEvent(this, link.handler)}
								>
									{link.tab}
								</a>
							</li>
						))}
						<li class="nav-item ml-auto">
							<button
								class="close"
								aria-label="Close"
								onClick={linkEvent(this, handleClickClose)}
							>
								<span aria-hidden="true">×</span>
							</button>
						</li>
					</ul>
				</div>
				<div class="card-body">
					{this.state.tab === Tab.Config &&
						<ConfigComponent />
					}
					{this.state.tab === Tab.Controller &&
						<ControllerComponent />
					}
				</div>
			</div>
		);
	}
}

function handleClickConfig(component: MenuComponent): void {
	component.tab = Tab.Config;
}

function handleClickController(component: MenuComponent): void {
	component.tab = Tab.Controller;
}

function handleClickClose(component: MenuComponent): void {
	component.tab = undefined;
}
