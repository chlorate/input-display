import {linkEvent} from "inferno";
import Component from "inferno-component";
import {ConfigComponent} from "./config.component";
import {StatsComponent} from "./stats.component";

enum Tab {
	Config = "Config",
	Stats = "Stats",
};

const tabLinks = [
	{
		tab: Tab.Config,
		handler: setConfigTab,
	},
	{
		tab: Tab.Stats,
		handler: setStatsTab,
	},
];

export class MenuComponent extends Component<{}, {tab: Tab}> {
	public state = {
		tab: Tab.Config,
	};

	setTab(tab: Tab) {
		this.setState({tab: tab});
	}

	linkClass(tab): string {
		let classes = ["nav-link"];
		if (this.state.tab === tab) {
			classes.push("active");
		}
		return classes.join(" ");
	}

	render() {
		return (
			<div class="card">
				<div class="card-header">
					<ul class="nav nav-tabs card-header-tabs">
						{tabLinks.map(link => {
							return (
								<li class="nav-item">
									<span
										class={this.linkClass(link.tab)}
										onClick={linkEvent(this, link.handler)}
									>
										{link.tab}
									</span>
								</li>
							);
						})}
					</ul>
				</div>
				<div class="card-body">
					{this.state.tab === Tab.Config &&
						<ConfigComponent />
					}
					{this.state.tab === Tab.Stats &&
						<StatsComponent />
					}
				</div>
			</div>
		);
	}
};

function setConfigTab(instance: MenuComponent) {
	instance.setTab(Tab.Config);
}

function setStatsTab(instance: MenuComponent) {
	instance.setTab(Tab.Stats);
}
