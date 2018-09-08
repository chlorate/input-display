import {ChangeEvent, Component, VNode} from "inferno";
import {Input} from "inferno-bootstrap";
import {observer} from "inferno-mobx";
import {action, observable} from "mobx";
import {clamp} from "../../../math/util";

interface Props {
	className?: string;
	id?: string;
	value: number;
	min: number;
	max: number;
	defaultValue: number;
	describedBy?: string;
	onChange: (value: number) => void;
}

/**
 * A number input field with extra error handling for invalid values.
 */
@observer
export class NumberInput extends Component<Props> {
	@observable
	private dirtyValue?: string;

	public render(): VNode {
		const {className, id, min, max, defaultValue, describedBy} = this.props;
		return (
			<Input
				className={className}
				id={id}
				type="number"
				value={this.value}
				min={`${min}`}
				max={`${max}`}
				placeholder={`${defaultValue}`}
				required
				aria-describedby={describedBy}
				onBlur={this.handleBlur}
				onInput={this.handleInput}
			/>
		);
	}

	private get value(): string {
		if (this.dirtyValue !== undefined) {
			return this.dirtyValue;
		}
		return `${this.props.value}`;
	}

	@action
	private handleBlur = (): void => {
		this.dirtyValue = undefined;
	};

	@action
	private handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
		const {min, max, defaultValue, onChange} = this.props;
		const {value: dirtyValue} = event.target;

		const value = parseFloat(dirtyValue);
		if (isNaN(value)) {
			onChange(defaultValue);
		} else {
			onChange(clamp(value, min, max));
		}

		this.dirtyValue = dirtyValue;
	};
}
