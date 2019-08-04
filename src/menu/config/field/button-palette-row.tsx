import {Component, InfernoNode} from "inferno";
import {Col} from "inferno-bootstrap";
import {observer} from "inferno-mobx";
import {action} from "mobx";
import {ColorGroup} from ".";
import {ButtonPalette} from "../../../config/button-palette";

interface Props {
	className?: string;
	id: string;
	palette: ButtonPalette;
	borderDefault: string;
	fillDefault: string;
	labelDefault: string;
}

/**
 * A row of fields for customizing the colors of a button palette.
 */
@observer
export class ButtonPaletteRow extends Component<Props> {
	public render(): InfernoNode {
		const {
			className,
			id,
			palette,
			borderDefault,
			fillDefault,
			labelDefault,
		} = this.props;

		return (
			<div className={`form-row ${className || ""}`}>
				<Col xs="auto">
					<ColorGroup
						id={`${id}-border`}
						label="Border"
						color={palette.border}
						placeholder={borderDefault}
						onChange={this.handleChangeBorder}
					/>
				</Col>
				<Col xs="auto">
					<ColorGroup
						id={`${id}-fill`}
						label="Fill"
						color={palette.fill}
						placeholder={fillDefault}
						onChange={this.handleChangeFill}
					/>
				</Col>
				<Col xs="auto">
					<ColorGroup
						id={`${id}-label`}
						label="Label"
						color={palette.label}
						placeholder={labelDefault}
						onChange={this.handleChangeLabel}
					/>
				</Col>
			</div>
		);
	}

	@action
	private handleChangeBorder = (color?: string): void => {
		const {palette, borderDefault} = this.props;
		palette.border = color || borderDefault;
	};

	@action
	private handleChangeFill = (color?: string): void => {
		const {palette, fillDefault} = this.props;
		palette.fill = color || fillDefault;
	};

	@action
	private handleChangeLabel = (color?: string): void => {
		const {palette, labelDefault} = this.props;
		palette.label = color || labelDefault;
	};
}
