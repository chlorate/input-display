import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {AxisReference} from "../../config/axis-reference";
import {AxisSelectComponent} from "./axis-select.component";

interface Props {
	class?: string;
	id: string;
	label: string;
	reference: AxisReference;
}

/**
 * A field for editing an AxisReference. Allows the user to select an axis and
 * if its value should be inverted.
 */
export const AxisReferenceSelectComponent = connect((props: Props) => (
	<div class={`form-group form-group-axis-reference ${props.class || ""}`}>
		<label for={props.id}>
			{props.label}
		</label>
		<div class="input-group">
			<AxisSelectComponent
				id={props.id}
				value={props.reference.index}
				onChange={linkEvent(props.reference, handleChangeIndex)}
			/>
			<label class="input-group-addon">
				<input
					type="checkbox"
					class="mr-1"
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
