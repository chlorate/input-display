import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {ButtonReference} from "../../config/button-reference";
import {DpadButtonReference} from "../../config/dpad-button-reference";
import {NormalButtonReference} from "../../config/normal-button-reference";
import {Controller} from "../../controller/controller";
import {DpadButton} from "../../controller/dpad-button";
import {NormalButton} from "../../controller/normal-button";
import {clampIndex} from "../../math/util";
import {Store} from "../../storage/store";

interface Props {
	controller: Controller;
	className?: string;
	id: string;
	reference?: ButtonReference;
	onChange: LinkedEvent;
}

interface LinkedEvent {
	data: any;
	event: (data: any, reference?: ButtonReference) => void;
}

const notFound = -1;

/**
 * A field for selecting a button.
 */
export const ButtonReferenceSelectComponent = connect([Store.Controller], (props: Props) => {
	let index: number | undefined;
	if (props.reference !== undefined) {
		const button = props.reference.resolve(props.controller);
		if (button !== undefined) {
			index = props.controller.buttons.indexOf(button);
		} else {
			index = notFound;
		}
	}

	return (
		<div className={`form-group form-group-button-reference ${props.className || ""}`}>
			<label htmlFor={props.id}>
				Button
			</label>
			<select
				className="form-control"
				id={props.id}
				value={index !== undefined ? index : ""}
				required
				onChange={linkEvent(props, handleChange)}
			>
				<option value="">None</option>
				{props.controller.buttons.map((button, i) => (
					<option value={i}>{button.name}</option>
				))}
				{props.reference !== undefined && index === notFound &&
					<option value={index}>{props.reference.name}</option>
				}
			</select>
		</div>
	);
});

function handleChange(props: Props, event): void {
	let reference: ButtonReference | undefined;
	if (event.target.value) {
		const i = clampIndex(event.target.value);
		const button = props.controller.buttons[i];
		if (button instanceof NormalButton) {
			reference = new NormalButtonReference(button.index);
		} else if (button instanceof DpadButton) {
			reference = new DpadButtonReference(button.direction);
		}
	}

	props.onChange.event(props.onChange.data, reference);
}
