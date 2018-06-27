interface Props {
	className?: string;
	id: string;
	label: string;
	suffix: string;
	value: number;
	min: number;
	max: number;
	step?: number;
	placeholder?: number;
	help?: string;
	helpId?: string;
	onChange;
}

/**
 * A generic number field.
 */
export const NumberInputComponent = (props: Props) => (
	<div className={`form-group form-group-number ${props.className || ""}`}>
		<label htmlFor={props.id}>
			{props.label}
		</label>
		<div className="input-group">
			<input
				type="number"
				className="form-control"
				id={props.id}
				value={props.value}
				min={props.min}
				max={props.max}
				step={props.step}
				placeholder={props.placeholder !== undefined ? `${props.placeholder}` : undefined}
				required
				aria-describedby={`${props.id}-addon ${props.help ? `${props.id}-help` : ""} ${props.helpId || ""}`}
				onChange={props.onChange}
			/>
			<span className="input-group-addon" id={`${props.id}-addon`}>
				{props.suffix}
			</span>
		</div>
		{props.help &&
			<small className="form-text text-muted" id={`${props.id}-help`}>
				{props.help}
			</small>
		}
	</div>
);
