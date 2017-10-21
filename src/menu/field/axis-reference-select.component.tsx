import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {AxisReference} from "../../config/axis-reference";
import {AxisSelectComponent} from "./axis-select.component";

interface Props {
	className?: string;
	id: string;
	label: string;
	reference: AxisReference;
}

/**
 * A field for editing an AxisReference. Allows the user to select an axis and
 * if its value should be inverted.
 */
export const AxisReferenceSelectComponent = connect((props: Props) => (
	<div className={`form-group form-group-axis-reference ${props.className || ""}`}>
		<label for={props.id}>
			{props.label}
		</label>
		<div className="input-group">
			<AxisSelectComponent
				id={props.id}
				value={props.reference.index}
				onChange={linkEvent(props.reference, handleChangeIndex)}
			/>
			<label className="input-group-addon">
				<input
					type="checkbox"
					className="mr-1"
					checked={props.reference.inverted}
					onClick={linkEvent(props.reference, handleChangeInverted)}
				/> Invert
			</label>
		</div>
	</div>
));

function handleChangeIndex(reference: AxisReference, event): void {
	reference.index = event.target.value;
}

function handleChangeInverted(reference: AxisReference, event): void {
	reference.inverted = event.target.checked;
}
