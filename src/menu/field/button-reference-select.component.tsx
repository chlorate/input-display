import {ChangeEvent, Component, linkEvent} from "inferno";
import {inject, observer} from "inferno-mobx";
import {ButtonReference} from "../../config/button-reference";
import {DpadButtonReference} from "../../config/dpad-button-reference";
import {NormalButtonReference} from "../../config/normal-button-reference";
import {Controller} from "../../controller/controller";
import {DpadButton} from "../../controller/dpad-button";
import {NormalButton} from "../../controller/normal-button";
import {clampIndex} from "../../math/util";
import {Store} from "../../storage/store";

interface Props {
	className?: string;
	id: string;
	reference?: ButtonReference;
	onChange: (reference?: ButtonReference) => void;
}

interface InjectedProps extends Props {
	controller: Controller;
}

/**
 * A field for selecting a button.
 */
@inject(Store.Controller)
@observer
export class ButtonReferenceSelectComponent extends Component<Props, {}> {
	public get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public render(): JSX.Element {
		const {controller, reference} = this.injected;

		let index: number | undefined;
		if (reference) {
			const button = reference.resolve(controller);
			if (button) {
				index = controller.buttons.indexOf(button);
			}
		}

		let className = "form-group form-group-button-reference";
		if (this.props.className) {
			className += ` ${this.props.className}`;
		}

		return (
			<div className={className}>
				<label htmlFor={this.props.id}>Button</label>
				<select
					className="form-control"
					id={this.props.id}
					value={index !== undefined ? index : ""}
					required
					onChange={linkEvent(this, handleChange)}
				>
					{this.options(index)}
				</select>
			</div>
		);
	}

	private options(index?: number): JSX.Element[] {
		const {controller, reference} = this.injected;

		const options: JSX.Element[] = [<option value="">None</option>];
		options.push(
			...controller.buttons.map((button, i) => (
				<option value={i}>{button.name}</option>
			)),
		);
		if (reference && index === undefined) {
			options.push(<option value={index}>{reference.name}</option>);
		}
		return options;
	}
}

function handleChange(
	component: ButtonReferenceSelectComponent,
	event: ChangeEvent<HTMLSelectElement>,
): void {
	let reference: ButtonReference | undefined;
	if (event.target.value) {
		const i = clampIndex(event.target.value);
		const button = component.injected.controller.buttons[i];
		if (button instanceof NormalButton) {
			reference = new NormalButtonReference(button.index);
		} else if (button instanceof DpadButton) {
			reference = new DpadButtonReference(button.direction);
		}
	}

	component.props.onChange(reference);
}
