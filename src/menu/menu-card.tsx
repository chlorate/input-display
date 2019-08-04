import {Location} from "history";
import {Component, InfernoNode} from "inferno";
import {Card, CardHeader, Nav, NavItem} from "inferno-bootstrap";
import {NavLink, withRouter} from "inferno-router";

interface Props {
	children: InfernoNode;
}

interface InjectedProps extends Props {
	location: Location;
}

const links = [
	{
		path: "/config",
		name: "Config",
	},
	{
		path: "/controller",
		name: "Controller",
	},
	{
		path: "/help",
		name: "Help",
	},
];

/**
 * The outer layout and navigation for the menu.
 */
@withRouter
export class MenuCard extends Component<Props, {}> {
	private scrollDiv: HTMLDivElement | null = null;

	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public componentDidUpdate(prevProps: InjectedProps) {
		if (this.injected.location !== prevProps.location) {
			this.scrollToTop();
		}
	}

	public render = (): InfernoNode => (
		<Card>
			<CardHeader>
				<Nav tabs className="card-header-tabs">
					{this.navItems}
				</Nav>
			</CardHeader>
			<div className="card-scroll" ref={this.setScrollDiv}>
				{this.props.children}
			</div>
		</Card>
	);

	private get navItems(): InfernoNode[] {
		const items = links.map((link) => (
			<NavItem>
				<NavLink
					to={link.path}
					className="nav-link"
					activeClassName="active"
				>
					{link.name}
				</NavLink>
			</NavItem>
		));
		items.push(
			<NavItem className="ml-auto">
				<NavLink to="/" className="close" aria-label="Close">
					<span aria-hidden="true">×</span>
				</NavLink>
			</NavItem>,
		);
		return items;
	}

	private setScrollDiv = (div: HTMLDivElement): void => {
		this.scrollDiv = div;
	};

	private scrollToTop(): void {
		if (this.scrollDiv) {
			this.scrollDiv.scrollTop = 0;
		}
	}
}
