import {SFC} from "inferno";
import {FormGroup, Label} from "inferno-bootstrap";
import {ColorInput} from ".";

interface Props {
	id: string;
	label: string;
	color?: string;
	placeholder: string;
	onChange: (color?: string) => void;
}

/**
 * A ColorInput wrapped in a FormGroup with a label.
 */
export const ColorGroup: SFC<Props> = ({
	id,
	label,
	color,
	placeholder,
	onChange,
}) => (
	<FormGroup>
		<Label for={id}>{label}</Label>
		<ColorInput
			id={id}
			color={color}
			placeholder={placeholder}
			onChange={onChange}
		/>
	</FormGroup>
);
