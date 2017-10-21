import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {Config} from "../config/config";
import {Button} from "../controller/button";
import {Controller} from "../controller/controller";
import {formatNumber} from "../math/util";
import {Store} from "../storage/store";
import {LabelPosition} from "../widget/label-position";
import {LabelReplacement} from "../widget/label-replacement";
import {Widget} from "../widget/widget";
import {Label, LabelClass} from "./label";
import {WidgetLabelTextComponent} from "./widget-label-text.component";

interface Props {
	config: Config;
	controller: Controller;
	widget: Widget;
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
 * Draws the labels for a widget. The widget name, button press count, and
 * button mash speed can be positioned in multiple places relative to the
 * widget.
 */
@connect([Store.Config, Store.Controller])
export class WidgetLabelComponent extends Component<Props, {}> {
	public render() {
		const widget = this.props.widget;
		const labels = this.makeLabels();
		const positionedLabels = this.positionLabels(labels);
		return (
			<g className="widget-label">
				{positionedLabels[LabelPosition.Above].length > 0 &&
					<WidgetLabelTextComponent
						labels={positionedLabels[LabelPosition.Above]}
						x={widget.centerX}
						y={widget.topY}
						anchor="middle"
						baseline="text-after-edge"
						spanX={widget.centerX}
						spanFirstShiftY="0"
						spanShiftY={`${-lineHeight}em`}
					/>
				}
				{positionedLabels[LabelPosition.Left].length > 0 &&
					<WidgetLabelTextComponent
						labels={positionedLabels[LabelPosition.Left]}
						x={widget.leftX}
						y={widget.centerY}
						anchor="end"
						baseline="central"
						spanFirstShiftX={`${-horizontalMargin}em`}
						space={true}
					/>
				}
				{positionedLabels[LabelPosition.Center].length > 0 &&
					<WidgetLabelTextComponent
						labels={positionedLabels[LabelPosition.Center]}
						x={widget.centerX}
						y={widget.centerY}
						anchor="middle"
						baseline="central"
						spanX={widget.centerX}
						spanFirstShiftY={`${-lineHeight * (positionedLabels[LabelPosition.Center].length - 1) / 2}em`}
						spanShiftY={`${lineHeight}em`}
					/>
				}
				{positionedLabels[LabelPosition.Right].length > 0 &&
					<WidgetLabelTextComponent
						labels={positionedLabels[LabelPosition.Right]}
						x={widget.rightX}
						y={widget.centerY}
						anchor="start"
						baseline="central"
						spanFirstShiftX={`${horizontalMargin}em`}
						space={true}
					/>
				}
				{positionedLabels[LabelPosition.Below].length > 0 &&
					<WidgetLabelTextComponent
						labels={positionedLabels[LabelPosition.Below]}
						x={widget.centerX}
						y={widget.bottomY}
						anchor="middle"
						baseline="text-before-edge"
						spanX={widget.centerX}
						spanFirstShiftY="0"
						spanShiftY={`${lineHeight}em`}
					/>
				}
			</g>
		);
	}

	/**
	 * Generates labels based on widget settings. Press count and mash speed
	 * labels will be generated if the widget references a valid button. Takes
	 * into account the replacement settings for the mash speed label.
	 */
	private makeLabels(): Labels {
		const widget = this.props.widget;
		const labels: Labels = {};

		let button: Button | undefined;
		if (widget.button && (widget.pressesLabel || widget.mashSpeedLabel)) {
			button = widget.button.resolve(this.props.controller);
		}

		let mashSpeedLabel: Label | undefined;
		if (widget.mashSpeedLabel && button && button.mashSpeed >= this.props.config.mashSpeedThreshold) {
			mashSpeedLabel = {
				className: LabelClass.MashSpeed,
				text: `×${button.mashSpeed}`,
			};
		}

		if (widget.nameLabel) {
			if (widget.mashSpeedLabel === LabelReplacement.Name && mashSpeedLabel) {
				labels.name = mashSpeedLabel;
			} else if (widget.name) {
				labels.name = {
					className: LabelClass.Name,
					text: widget.name,
				};
			}
		}

		if (widget.pressesLabel) {
			if (widget.mashSpeedLabel === LabelReplacement.Presses && mashSpeedLabel) {
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
			widget.mashSpeedLabel &&
			widget.mashSpeedLabel !== LabelReplacement.Name &&
			widget.mashSpeedLabel !== LabelReplacement.Presses
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
		const widget = this.props.widget;
		const positionedLabels: PositionedLabels = {
			[LabelPosition.Above]: [],
			[LabelPosition.Left]: [],
			[LabelPosition.Center]: [],
			[LabelPosition.Right]: [],
			[LabelPosition.Below]: [],
		};

		if (labels.name && widget.nameLabel) {
			positionedLabels[widget.nameLabel].push(labels.name);
		}
		if (labels.presses && widget.pressesLabel) {
			positionedLabels[widget.pressesLabel].push(labels.presses);
		}
		if (labels.mashSpeed && widget.mashSpeedLabel) {
			positionedLabels[widget.mashSpeedLabel].push(labels.mashSpeed);
		}

		// Left position uses right-to-left order.
		positionedLabels[LabelPosition.Left].reverse();

		return positionedLabels;
	}
}
