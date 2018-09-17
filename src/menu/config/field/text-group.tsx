import {SFC} from "inferno";
import {FormGroup, Label} from "inferno-bootstrap";
import {TextInput} from ".";

interface Props {
	className?: string;
	id: string;
	label: string;
	value: string;
	maxLength: number;
	onChange: (value: string) => void;
}

/**
 * A TextInput wrapped in a FormGroup with a label.
 */
export const TextGroup: SFC<Props> = ({
	className,
	id,
	label,
	value,
	maxLength,
	onChange,
}) => (
	<FormGroup className={className}>
		<Label for={id}>{label}</Label>
		<TextInput
			id={id}
			value={value}
			maxLength={maxLength}
			onChange={onChange}
		/>
	</FormGroup>
);
