interface Props {
	className?: string;
	id?: string;
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
	<div class={`form-group form-group-color ${props.className || ""}`}>
		<label for={props.id}>
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
				onChange={props.onChange}
			/>
			<span class="input-group-addon">
				<input
					className="form-control-color"
					type="color"
					value={props.value}
					required
					onInput={props.onChange}
				/>
			</span>
		</div>
	</div>
);