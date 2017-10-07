import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {AxisReference} from "./axis-reference";
import {AxisSelectComponent} from "./axis-select.component";

interface Props {
	class?: string;
	id: string;
	label: string;
	reference: AxisReference;
}

export const AxisReferenceSelectComponent = connect((props: Props) => (
	<div class={`form-group ${props.class ? props.class : ""}`}>
		<label for={props.id}>
			{props.label}
		</label>
		<div class="input-group">
			<AxisSelectComponent
				id={props.id}
				value={props.reference.index}
				onChange={linkEvent(props.reference, handleIndexChange)}
			/>
			<label class="input-group-addon">
				<input
					type="checkbox"
					class="mr-1"
					checked={props.reference.inverted}
					onClick={linkEvent(props.reference, handleInvertChange)}
				/> Invert
			</label>
		</div>
	</div>
));

function handleIndexChange(reference: AxisReference, event) {
	reference.index = event.target.value;
}

function handleInvertChange(reference: AxisReference, event) {
	reference.inverted = event.target.checked;
}
