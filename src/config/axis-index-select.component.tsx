import {AxisSelectComponent} from "./axis-select.component";

interface Props {
	class?: string;
	id: string;
	label: string;
	value: number;
	onChange: any;
}

export const AxisIndexSelectComponent = (props: Props) => (
	<div class={`form-group ${props.class ? props.class : ""}`}>
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
