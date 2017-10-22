import EventEmitter from "events";
import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {Link} from "inferno-router";
import {Store} from "../storage/store";
import {Event} from "./event";

interface Props {
	events: EventEmitter;
	children;
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
@connect([Store.Events])
export class MenuCardComponent extends Component<Props, {}> {
	private scrollDiv?: HTMLDivElement;
	private listener: () => void;

	constructor(props: Props) {
		super(props);
		this.listener = () => this.scrollToTop();
	}

	public componentDidMount(): void {
		this.props.events.addListener(Event.NavigateTab, this.listener);
	}

	public componentWillUnmount(): void {
		this.props.events.removeListener(Event.NavigateTab, this.listener);
	}

	public render() {
		return (
			<div className="card">
				<div className="card-header">
					<ul className="nav nav-tabs card-header-tabs">
						{links.map((link) => (
							<li className="nav-item">
								<Link to={link.path} className="nav-link" activeClassName="active">
									{link.name}
								</Link>
							</li>
						))}
						<li className="nav-item ml-auto">
							<Link to="/" className="close" aria-label="Close">
								<span aria-hidden="true">×</span>
							</Link>
						</li>
					</ul>
				</div>
				<div className="card-scroll" ref={(div) => this.scrollDiv = div}>
					<div className="card-body">
						{this.props.children}
					</div>
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
