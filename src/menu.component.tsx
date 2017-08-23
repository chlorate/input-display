import Component from "inferno-component";
import {ConfigComponent} from "./config.component";

enum Tab {
	Config,
};

export class MenuComponent extends Component<{}, {tab: Tab}> {
	public state = {
		tab: Tab.Config,
	};

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
						<li class="nav-item">
							<span class={this.linkClass(Tab.Config)}>Config</span>
						</li>
					</ul>
				</div>
				<div class="card-body">
					{this.state.tab === Tab.Config &&
						<ConfigComponent />
					}
				</div>
			</div>
		);
	}
};
