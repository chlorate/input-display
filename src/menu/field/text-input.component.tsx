interface Props {
	className?: string;
	id: string;
	inputRef?: (input: HTMLInputElement) => void;
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
			ref={props.inputRef}
			value={props.value}
			maxLength={props.maxLength}
			onChange={props.onChange}
			onInput={props.onInput}
		/>
	</div>
);
