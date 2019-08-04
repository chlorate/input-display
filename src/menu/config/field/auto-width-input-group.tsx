import {InfernoMouseEvent, InfernoNode, SFC} from "inferno";
import {InputGroup} from "inferno-bootstrap";

interface Props {
	onMouseDown?: (event?: InfernoMouseEvent<HTMLDivElement>) => void;
	children: InfernoNode;
}

/**
 * A Bootstrap input group that has an automatic width instead of 100% width.
 */
export const AutoWidthInputGroup: SFC<Props> = ({onMouseDown, children}) => (
	<div>
		<InputGroup className="d-inline-flex w-auto" onMouseDown={onMouseDown}>
			{children}
		</InputGroup>
	</div>
);
