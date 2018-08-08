import EventEmitter from "events";
import {Component} from "inferno";
import {inject} from "inferno-mobx";
import {NavLink} from "inferno-router";
import {Event} from "../event";
import {Store} from "../storage/store";

interface Props {
	children: JSX.Element[];
}

interface InjectedProps extends Props {
	events: EventEmitter;
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
@inject(Store.Events)
export class MenuCardComponent extends Component<Props, {}> {
	private scrollDiv: HTMLDivElement | null = null;
	private listener: () => void;

	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	constructor(props: Props) {
		super(props);
		this.listener = () => this.scrollToTop();
	}

	public componentDidMount(): void {
		this.injected.events.addListener(Event.NavigateTab, this.listener);
	}

	public componentWillUnmount(): void {
		this.injected.events.removeListener(Event.NavigateTab, this.listener);
	}

	public render(): JSX.Element {
		const items = links.map((link) => (
			<li className="nav-item">
				<NavLink
					to={link.path}
					className="nav-link"
					activeClassName="active"
				>
					{link.name}
				</NavLink>
			</li>
		));
		items.push(
			<li className="nav-item ml-auto">
				<NavLink to="/" className="close" aria-label="Close">
					<span aria-hidden="true">×</span>
				</NavLink>
			</li>,
		);

		return (
			<div className="card">
				<div className="card-header">
					<ul className="nav nav-tabs card-header-tabs">{items}</ul>
				</div>
				<div
					className="card-scroll"
					ref={(div) => (this.scrollDiv = div)}
				>
					<div className="card-body">{this.props.children}</div>
				</div>
			</div>
		);
	}

	private scrollToTop(): void {
		if (this.scrollDiv) {
			this.scrollDiv.scrollTop = 0;
		}
	}
}
