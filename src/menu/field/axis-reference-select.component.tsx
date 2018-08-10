import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {action} from "mobx";
import {AxisReference} from "../../config/axis-reference";
import {clampIndex} from "../../math/util";
import {AxisSelectComponent} from "./axis-select.component";

interface Props {
	className?: string;
	id: string;
	label: string;
	reference: AxisReference;
	required?: boolean;

	// onChange is only required if required=true. Otherwise, the existing
	// reference will be updated.
	onChange?: LinkedEvent;
}

interface LinkedEvent {
	data: any;
	event: (data: any, reference?: AxisReference) => void;
}

/**
 * A field for editing an AxisReference. Allows the user to select an axis and
 * if its value should be inverted.
 */
export const AxisReferenceSelectComponent = connect((props: Props) => (
	<div className={`form-group form-group-axis-reference ${props.className || ""}`}>
		<label htmlFor={props.id}>
			{props.label}
		</label>
		<div className="input-group">
			<AxisSelectComponent
				id={props.id}
				value={props.reference ? props.reference.index : ""}
				required={props.required}
				onChange={linkEvent(props, handleChangeIndex)}
			/>
			{props.reference &&
				<label className="input-group-addon">
					<input
						type="checkbox"
						className="mr-1"
						checked={props.reference.inverted}
						onClick={linkEvent(props.reference, handleChangeInverted)}
					/> Invert
				</label>
			}
		</div>
	</div>
));

const handleChangeIndex = action((props: Props, event): void => {
	let reference: AxisReference | undefined;
	if (event.target.value) {
		const i = clampIndex(event.target.value);
		if (props.reference) {
			props.reference.index = i;
			return;
		}
		reference = new AxisReference(i, false);
	}
	if (props.onChange) {
		props.onChange.event(props.onChange.data, reference);
	}
});

const handleChangeInverted = action((reference: AxisReference, event): void => {
	reference.inverted = event.target.checked;
});
