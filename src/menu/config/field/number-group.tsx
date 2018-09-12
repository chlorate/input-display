import {Component, InfernoChildren, VNode} from "inferno";
import {FormGroup, FormText, InputGroupAddon, Label} from "inferno-bootstrap";
import {AutoWidthInputGroup, NumberInput} from ".";

interface Props {
	className?: string;
	inputClassName?: string;
	id: string;
	label: string;
	value?: number;
	min: number;
	max: number;
	placeholder: number;
	suffix: string;
	describedBy?: string;
	onChange: (value?: number) => void;
	children?: InfernoChildren;
}

/**
 * A NumberInput wrapped in a FormGroup with a label, suffix add-on, and
 * optional help text.
 */
export class NumberGroup extends Component<Props> {
	public render = (): VNode => {
		const {
			className,
			inputClassName,
			id,
			label,
			value,
			min,
			max,
			placeholder,
			suffix,
			onChange,
		} = this.props;

		return (
			<FormGroup className={className}>
				<Label for={id}>{label}</Label>
				<AutoWidthInputGroup>
					<NumberInput
						className={inputClassName}
						id={id}
						value={value}
						min={min}
						max={max}
						placeholder={placeholder}
						describedBy={this.describedBy}
						onChange={onChange}
					/>
					<InputGroupAddon addonType="append">
						{suffix}
					</InputGroupAddon>
				</AutoWidthInputGroup>
				{this.formText}
			</FormGroup>
		);
	};

	private get describedBy(): string | undefined {
		const {id, describedBy, children} = this.props;
		return describedBy || (children ? `${id}-help` : undefined);
	}

	private get formText(): VNode | null {
		const {id, children} = this.props;
		if (!children) {
			return null;
		}
		return <FormText id={`${id}-help`}>{children}</FormText>;
	}
}
