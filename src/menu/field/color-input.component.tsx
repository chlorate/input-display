interface Props {
	className?: string;
	id: string;
	label: string;
	value: string;
	placeholder: string;
	onChange;
}

/**
 * A generic color input field. The user can either edit the hex value of the
 * color or use the system color picker.
 */
export const ColorInputComponent = (props: Props) => (
	<div className={`form-group form-group-color ${props.className || ""}`}>
		<label for={props.id} id={`${props.id}-label`}>
			{props.label}
		</label>
		<div className="input-group">
			<input
				type="text"
				className="form-control"
				id={props.id}
				value={props.value}
				placeholder={props.placeholder}
				required
				maxLength="7"
				spellCheck="false"
				onChange={props.onChange}
			/>
			<span className="input-group-addon">
				<input
					className="form-control-color"
					type="color"
					value={props.value}
					required
					aria-labelledby={`${props.id}-label`}
					onInput={props.onChange}
				/>
			</span>
		</div>
	</div>
);
