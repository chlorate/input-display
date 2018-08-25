import {VNode} from "inferno";
import {Link} from "inferno-router";

/**
 * The single button shown when the menu is closed. Clicking on it opens the
 * menu.
 */
export const MenuButton = (): VNode => (
	<div className="text-right">
		<Link to="/config" className="btn btn-primary">
			Menu
		</Link>
	</div>
);
