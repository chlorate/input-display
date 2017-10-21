interface Props {
	className?: string;
	id: string;
	label: string;
	value: string;
	maxLength: number;
	onChange;
	onInput;
}

/**
 * A generic text field.
 */
export const TextInputComponent = (props: Props) => (
	<div className={`form-group ${props.className || ""}`}>
		<label for={props.id}>
			{props.label}
		</label>
		<input
			type="text"
			className="form-control"
			id={props.id}
			value={props.value}
			maxLength={props.maxLength}
			onChange={props.onChange}
			onInput={props.onInput}
		/>
	</div>
);
