import {VNode} from "inferno";
import {FormGroup, Label} from "inferno-bootstrap";
import {AxisSelect} from "../config";

interface Props {
	className?: string;
	id: string;
	label: string;
	value: number;
	onChange: (index: number) => void;
}

/**
 * A field for selecting an axis index.
 */
export class AxisIndexSelect extends Component<Props> {
	public render(): VNode {
		const {className, id, label, value} = this.props;
		return (
			<FormGroup className={className}>
				<Label for={id}>{label}</Label>
				<AxisSelect
					id={id}
					value={value}
					required
					onChange={onChange}
				/>
			</FormGroup>
		);
	}

	private handleChange = (index?: number): void => {
		if (index !== undefined) {
			this.props.onChange(index);
		}
	};
}
