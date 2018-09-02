import {InfernoChildren, VNode} from "inferno";
import {InputGroup} from "inferno-bootstrap";

interface Props {
	children: InfernoChildren;
}

/**
 * A Bootstrap input group that has an automatic width instead of 100% width.
 */
export const AutoWidthInputGroup = ({children}: Props): VNode => (
	<div>
		<InputGroup className="d-inline-flex w-auto">
			{children}
		</InputGroup>
	</div>
);
