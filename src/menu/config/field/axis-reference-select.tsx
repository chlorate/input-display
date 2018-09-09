import {ChangeEvent, Component, VNode} from "inferno";
import {AxisSelect} from ".";
import {AxisReference} from "../../../config/axis-reference";

import {
	FormGroup,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Label,
} from "inferno-bootstrap";

interface Props {
	className?: string;
	id: string;
	label: string;
	reference: AxisReference;
	required?: boolean;
	onChange: (reference?: AxisReference) => void;
}

/**
 * A field for editing an AxisReference. Allows the user to select an axis and
 * if its value should be inverted.
 */
export class AxisReferenceSelect extends Component<Props> {
	public render(): VNode {
		const {className, id, label, reference, required} = this.props;
		return (
			<FormGroup className={className}>
				<Label for={id}>{label}</Label>
				<InputGroup>
					<AxisSelect
						id={id}
						value={reference ? reference.index : undefined}
						required={required}
						onChange={this.handleChangeIndex}
					/>
					{this.invertedCheckbox}
				</InputGroup>
			</FormGroup>
		);
	}

	private get invertedCheckbox(): VNode | null {
		const {reference} = this.props;
		if (!reference) {
			return null;
		}

		return (
			<InputGroupAddon addonType="append">
				<InputGroupText tag="label">
					<FormGroup check className="form-check-inline m-0">
						<Input
							type="checkbox"
							checked={reference.inverted}
							onClick={this.handleChangeInverted}
						/>
						Invert
					</FormGroup>
				</InputGroupText>
			</InputGroupAddon>
		);
	}

	private handleChangeIndex = (index?: number): void => {
		const {reference: oldReference, onChange} = this.props;

		if (index === undefined) {
			onChange(undefined);
			return;
		}

		const inverted = oldReference ? oldReference.inverted : false;
		onChange(new AxisReference(index, inverted));
	};

	private handleChangeInverted = (
		event: ChangeEvent<HTMLInputElement>,
	): void => {
		const {reference, onChange} = this.props;
		onChange(new AxisReference(reference.index, event.target.checked));
	};
}
