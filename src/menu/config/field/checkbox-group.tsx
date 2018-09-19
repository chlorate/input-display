import {SFC} from "inferno";
import {FormGroup, Label} from "inferno-bootstrap";
import {Checkbox} from ".";

interface Props {
	inline?: boolean;
	id: string;
	label: string;
	checked: boolean;
	describedBy?: string;
	onChange: (checked: boolean) => void;
}

/**
 * A Checkbox wrapped in a FormGroup with a label.
 */
export const CheckboxGroup: SFC<Props> = ({
	inline,
	id,
	label,
	checked,
	describedBy,
	onChange,
}) => (
	<FormGroup check className={inline ? "form-check-inline" : ""}>
		<Checkbox
			id={id}
			checked={checked}
			describedBy={describedBy}
			onChange={onChange}
		/>
		<Label check for={id}>
			{label}
		</Label>
	</FormGroup>
);
