import {Link} from "inferno-router";

interface Props {
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
];

/**
 * The outer layout and navigation for the menu.
 */
export const MenuCardComponent = ({children}: Props) => (
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
		<div className="card-body">
			{children}
		</div>
	</div>
);
