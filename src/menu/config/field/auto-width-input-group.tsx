import {InfernoChildren, MouseEvent, VNode} from "inferno";
import {InputGroup} from "inferno-bootstrap";

interface Props {
	onMouseDown?: (event?: MouseEvent<HTMLDivElement>) => void;
	children: InfernoChildren;
}

/**
 * A Bootstrap input group that has an automatic width instead of 100% width.
 */
export const AutoWidthInputGroup = ({onMouseDown, children}: Props): VNode => (
	<div>
		<InputGroup className="d-inline-flex w-auto" onMouseDown={onMouseDown}>
			{children}
		</InputGroup>
	</div>
);
