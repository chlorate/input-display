interface Props {
	id?: string;
	label: string;
	checked: boolean;
	help?: string;
	onClick;
}

/**
 * A generic checkbox field.
 */
export const CheckboxInputComponent = (props: Props) => (
	<div className="form-check">
		<label className="form-check-label">
			<input
				type="checkbox"
				className="form-check-input"
				checked={props.checked}
				aria-describedby={props.help ? `${props.id}-help` : undefined}
				onClick={props.onClick}
			/>
			{props.label}
		</label>
		{props.help !== undefined &&
			<small className="form-text text-muted" id={`${props.id}-help`}>
				{props.help}
			</small>
		}
	</div>
);
