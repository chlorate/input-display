import {ChangeEvent, Component, FocusEvent, MouseEvent, VNode} from "inferno";
import {Manager, Target} from "inferno-popper";
import {observer} from "inferno-mobx";
import {action, observable} from "mobx";
import {AutoWidthInputGroup, ColorPicker} from "../config/field";
import {ensureColor} from "../../css/util";
import {Event} from "../../event";

import {
	Input,
	InputGroupAddon,
	InputGroupText,
	Popover,
	PopoverBody,
} from "inferno-bootstrap";

interface Props {
	id?: string;
	value: string;
	defaultValue: string;
	onChange: (color: string) => void;
}

/**
 * A field for selecting a color. A text field is provided to edit the hex
 * value. When the field has focus, a color picker is shown as a popover. The
 * selected color is shown beside the text field.
 */
@observer
export class ColorInput extends Component<Props> {
	private targetDiv: HTMLDivElement | null = null;
	private input: HTMLInputElement | null = null;

	@observable
	private dirtyValue?: string;

	@observable
	private opened: boolean = false;

	public componentDidMount(): void {
		window.addEventListener(Event.FocusIn, this.toggle);
		window.addEventListener(Event.MouseDown, this.toggle);
	}

	public componentWillUnmount(): void {
		window.removeEventListener(Event.FocusIn, this.toggle);
		window.removeEventListener(Event.MouseDown, this.toggle);
	}

	public render(): VNode {
		const {id, value, defaultValue} = this.props;
		const targetId = `${id}-target`;
		return (
			<Manager>
				<Target innerRef={this.setTargetDiv} className="d-inline-block">
					<AutoWidthInputGroup onMouseDown={this.handleMouseDown}>
						<Input
							innerRef={this.setInput}
							className="color-input"
							id={id}
							value={this.value}
							placeholder={defaultValue}
							maxLength={7}
							required
							spellCheck={false}
							onFocus={this.handleFocus}
							onInput={this.handleInput}
							onBlur={this.handleBlur}
						/>
						<InputGroupAddon addonType="append" id={targetId}>
							<InputGroupText
								className="color-input-preview"
								style={{backgroundColor: value}}
							/>
						</InputGroupAddon>
					</AutoWidthInputGroup>
					<Popover
						isOpen={this.opened}
						placement="top"
						target={targetId}
					>
						<PopoverBody>
							<ColorPicker
								color={this.value}
								onChange={this.triggerChange}
							/>
						</PopoverBody>
					</Popover>
				</Target>
			</Manager>
		);
	}

	private setTargetDiv = (div: HTMLDivElement): void => {
		this.targetDiv = div;
	};

	private setInput = (input: HTMLInputElement): void => {
		this.input = input;
	}

	private get value(): string {
		if (this.dirtyValue !== undefined) {
			return this.dirtyValue;
		}
		return this.props.value;
	}

	@action
	private toggle = (event: FocusEvent<Window> | MouseEvent<Window>): void => {
		if (this.targetDiv && event.target instanceof Node) {
			this.opened = this.targetDiv.contains(event.target);
		}
	};

	private handleMouseDown = (event: MouseEvent<HTMLDivElement>): void => {
		// Select input if color preview is clicked.
		if (this.input && event.target !== this.input) {
			this.input.select();
			event.preventDefault();
		}
	}

	private handleFocus = (): void => {
		if (this.input) {
			this.input.select();
		}
	}

	@action
	private handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
		this.dirtyValue = event.target.value;
		this.triggerChange(this.dirtyValue);
	};

	@action
	private handleBlur = (): void => {
		this.dirtyValue = undefined;
	};

	private triggerChange = (color: string): void => {
		this.props.onChange(ensureColor(color, this.props.defaultValue));
	};
}
