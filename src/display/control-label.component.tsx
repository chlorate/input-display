import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {Config} from "../config/config";
import {Control} from "../control/control";
import {LabelPosition} from "../control/label-position";
import {LabelReplacement} from "../control/label-replacement";
import {Button} from "../controller/button";
import {Controller} from "../controller/controller";
import {formatNumber} from "../math/util";
import {Store} from "../storage/store";
import {ControlLabelTextComponent} from "./control-label-text.component";
import {Label, LabelClass} from "./label";

interface Props {
	config: Config;
	controller: Controller;
	control: Control;
}

interface Labels {
	name?: Label;
	presses?: Label;
	mashSpeed?: Label;
}

interface PositionedLabels {
	[position: string]: Label[];
}

// In em units.
const lineHeight = 1.1;
const horizontalMargin = 0.3;

/**
 * Draws the labels for a control. The control name, button press count, and
 * button mash speed can be positioned in multiple places relative to the
 * control.
 */
@connect([Store.Config, Store.Controller])
export class ControlLabelComponent extends Component<Props, {}> {
	public render() {
		const control = this.props.control;
		const labels = this.makeLabels();
		const positionedLabels = this.positionLabels(labels);
		return (
			<g className="control-label">
				{positionedLabels[LabelPosition.Above].length > 0 &&
					<ControlLabelTextComponent
						labels={positionedLabels[LabelPosition.Above]}
						x={control.centerX}
						y={control.topY}
						anchor="middle"
						baseline="text-after-edge"
						spanX={control.centerX}
						spanFirstShiftY="0"
						spanShiftY={`${-lineHeight}em`}
					/>
				}
				{positionedLabels[LabelPosition.Left].length > 0 &&
					<ControlLabelTextComponent
						labels={positionedLabels[LabelPosition.Left]}
						x={control.leftX}
						y={control.centerY}
						anchor="end"
						baseline="central"
						spanFirstShiftX={`${-horizontalMargin}em`}
						space={true}
					/>
				}
				{positionedLabels[LabelPosition.Center].length > 0 &&
					<ControlLabelTextComponent
						labels={positionedLabels[LabelPosition.Center]}
						x={control.centerX}
						y={control.centerY}
						anchor="middle"
						baseline="central"
						spanX={control.centerX}
						spanFirstShiftY={`${-lineHeight * (positionedLabels[LabelPosition.Center].length - 1) / 2}em`}
						spanShiftY={`${lineHeight}em`}
					/>
				}
				{positionedLabels[LabelPosition.Right].length > 0 &&
					<ControlLabelTextComponent
						labels={positionedLabels[LabelPosition.Right]}
						x={control.rightX}
						y={control.centerY}
						anchor="start"
						baseline="central"
						spanFirstShiftX={`${horizontalMargin}em`}
						space={true}
					/>
				}
				{positionedLabels[LabelPosition.Below].length > 0 &&
					<ControlLabelTextComponent
						labels={positionedLabels[LabelPosition.Below]}
						x={control.centerX}
						y={control.bottomY}
						anchor="middle"
						baseline="text-before-edge"
						spanX={control.centerX}
						spanFirstShiftY="0"
						spanShiftY={`${lineHeight}em`}
					/>
				}
			</g>
		);
	}

	/**
	 * Generates labels based on control settings. Press count and mash speed
	 * labels will be generated if the control references a valid button. Takes
	 * into account the replacement settings for the mash speed label.
	 */
	private makeLabels(): Labels {
		const control = this.props.control;
		const labels: Labels = {};

		let button: Button | undefined;
		if (control.button && (control.pressesLabel || control.mashSpeedLabel)) {
			button = control.button.resolve(this.props.controller);
		}

		let mashSpeedLabel: Label | undefined;
		if (control.mashSpeedLabel && button && button.mashing) {
			mashSpeedLabel = {
				className: LabelClass.MashSpeed,
				text: `×${button.mashSpeed}`,
			};
		}

		if (control.nameLabel) {
			if (control.mashSpeedLabel === LabelReplacement.Name && mashSpeedLabel) {
				labels.name = mashSpeedLabel;
			} else if (control.name) {
				labels.name = {
					className: LabelClass.Name,
					text: control.name,
				};
			}
		}

		if (control.pressesLabel) {
			if (control.mashSpeedLabel === LabelReplacement.Presses && mashSpeedLabel) {
				labels.presses = mashSpeedLabel;
			} else if (button) {
				labels.presses = {
					className: LabelClass.Presses,
					text: formatNumber(button.presses),
				};
			}
		}

		if (
			mashSpeedLabel &&
			control.mashSpeedLabel &&
			control.mashSpeedLabel !== LabelReplacement.Name &&
			control.mashSpeedLabel !== LabelReplacement.Presses
		) {
			labels.mashSpeed = mashSpeedLabel;
		}

		return labels;
	}

	/**
	 * Positions labels in their proper places and returns an object that can be
	 * used to look up the labels at each position.
	 */
	private positionLabels(labels: Labels): PositionedLabels {
		const control = this.props.control;
		const positionedLabels: PositionedLabels = {
			[LabelPosition.Above]: [],
			[LabelPosition.Left]: [],
			[LabelPosition.Center]: [],
			[LabelPosition.Right]: [],
			[LabelPosition.Below]: [],
		};

		if (labels.name && control.nameLabel) {
			positionedLabels[control.nameLabel].push(labels.name);
		}
		if (labels.presses && control.pressesLabel) {
			positionedLabels[control.pressesLabel].push(labels.presses);
		}
		if (labels.mashSpeed && control.mashSpeedLabel) {
			positionedLabels[control.mashSpeedLabel].push(labels.mashSpeed);
		}

		// Left position uses right-to-left order.
		positionedLabels[LabelPosition.Left].reverse();

		return positionedLabels;
	}
}
