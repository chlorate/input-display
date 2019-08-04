import {InfernoNode, SFC} from "inferno";
import {CardBody} from "inferno-bootstrap";
import {Link} from "inferno-router";

interface IProps {
	to: string;
	children?: InfernoNode;
}

/**
 * A heading with a linked back button.
 */
export const BackHeading: SFC<IProps> = ({to, children}) => (
	<CardBody className="border-bottom">
		<h2 class="h3 d-flex align-items-center justify-content-between mb-0">
			{children}
			<Link className="btn btn-secondary ml-2" to={to}>
				Back
			</Link>
		</h2>
	</CardBody>
);
