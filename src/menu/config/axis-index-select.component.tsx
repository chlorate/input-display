import {AxisSelectComponent} from "./axis-select.component";

interface Props {
	className?: string;
	id: string;
	label: string;
	value: number;
	onChange: any;
}

/**
 * A field for editing an axis index. Allows the user to select an axis.
 */
export const AxisIndexSelectComponent = (props: Props) => (
	<div className={`form-group ${props.className || ""}`}>
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
