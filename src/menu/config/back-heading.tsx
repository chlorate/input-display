import {VNode} from "inferno";
import {CardBody} from "inferno-bootstrap";
import {Link} from "inferno-router";

interface IProps {
	to: string;
	children: string;
}

/**
 * A heading with a linked back button.
 */
export const BackHeading = ({to, children}: IProps): VNode => (
	<CardBody className="border-bottom">
		<h2 class="h3 d-flex align-items-center justify-content-between mb-0">
			{children}
			<Link className="btn btn-secondary ml-2" to={to}>
				Back
			</Link>
		</h2>
	</CardBody>
);
