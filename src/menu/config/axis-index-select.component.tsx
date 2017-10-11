import {AxisSelectComponent} from "./axis-select.component";

interface Props {
	class?: string;
	id: string;
	label: string;
	value: number;
	onChange: any;
}

/**
 * A field for editing an axis index. Allows the user to select an axis.
 */
export const AxisIndexSelectComponent = (props: Props) => (
	<div class={`form-group ${props.class || ""}`}>
		<label for={props.id}>
			{props.label}
		</label>
		<AxisSelectComponent
			id={props.id}
			value={props.value}
			onChange={props.onChange}
		/>
	</div>
);
