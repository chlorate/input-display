import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {Button} from "../controller/button";
import {Controller} from "../controller/controller";
import {formatNumber} from "../math/util";
import {Store} from "../storage/store";
import {LabelPosition} from "../widget/label-position";
import {LabelReplacement} from "../widget/label-replacement";
import {Widget} from "../widget/widget";

interface Props {
	controller: Controller;
	widget: Widget;
}

interface LabelSet {
	name?: Label;
	presses?: Label;
	mashSpeed?: Label;
}

interface Label {
	className: LabelClassName;
	text: string;
}

enum LabelClassName {
	Name = "widget-label-name",
	Presses = "widget-label-presses",
	MashSpeed = "widget-label-mash-speed",
}

// In em units.
const lineHeight = 1.2;
const horizontalMargin = 0.3;

/**
 * Draws the label for a widget. The widget name, button press count, and button
 * mash speed can be positioned in multiple places relative to the widget.
 */
@connect([Store.Controller])
export class WidgetLabelComponent extends Component<Props, {}> {
	public render() {
		const widget = this.props.widget;
		const labelSet = this.getLabelSet();
		const lines: {[key: string]: Label[]} = {
			[LabelPosition.Above]: [],
			[LabelPosition.Left]: [],
			[LabelPosition.Center]: [],
			[LabelPosition.Right]: [],
			[LabelPosition.Below]: [],
		};

		if (labelSet.name && widget.nameLabel) {
			lines[widget.nameLabel].push(labelSet.name);
		}
		if (labelSet.presses && widget.pressesLabel) {
			lines[widget.pressesLabel].push(labelSet.presses);
		}
		if (labelSet.mashSpeed && widget.mashSpeedLabel) {
			lines[widget.mashSpeedLabel].push(labelSet.mashSpeed);
		}

		lines[LabelPosition.Left].reverse();

		const centerFirstLine = -lineHeight * (lines[LabelPosition.Center].length - 1) / 2;
		return (
			<g className="widget-label">
				{lines[LabelPosition.Above].length > 0 &&
					<text
						x={widget.centerX}
						y={widget.topY}
						text-anchor="middle"
						dominant-baseline="text-after-edge"
						fill="white"
					>
						{lines[LabelPosition.Above].map((label, i) => (
							<tspan
								className={label.className}
								x={widget.centerX}
								dy={`${i === 0 ? 0 : -lineHeight}em`}
							>
								{label.text}
							</tspan>
						))}
					</text>
				}
				{lines[LabelPosition.Left].length > 0 &&
					<text
						x={widget.leftX}
						y={widget.centerY}
						text-anchor="end"
						dominant-baseline="central"
						fill="white"
					>
						{lines[LabelPosition.Left].map((label, i) => (
							<tspan
								className={label.className}
								dx={i === 0 ? `${-horizontalMargin}em` : undefined}
							>
								{`${label.text} `}
							</tspan>
						))}
					</text>
				}
				{lines[LabelPosition.Center].length > 0 &&
					<text
						x={widget.centerX}
						y={widget.centerY}
						text-anchor="middle"
						dominant-baseline="central"
						fill="white"
					>
						{lines[LabelPosition.Center].map((label, i) => (
							<tspan
								className={label.className}
								x={widget.centerX}
								dy={`${i === 0 ? centerFirstLine : lineHeight}em`}
							>
								{label.text}
							</tspan>
						))}
					</text>
				}
				{lines[LabelPosition.Right].length > 0 &&
					<text
						x={widget.rightX}
						y={widget.centerY}
						text-anchor="start"
						dominant-baseline="central"
						fill="white"
					>
						{lines[LabelPosition.Right].map((label, i) => (
							<tspan
								className={label.className}
								dx={i === 0 ? `${horizontalMargin}em` : undefined}
							>
								{`${label.text} `}
							</tspan>
						))}
					</text>
				}
				{lines[LabelPosition.Below].length > 0 &&
					<text
						x={widget.centerX}
						y={widget.bottomY}
						text-anchor="middle"
						dominant-baseline="text-before-edge"
						fill="white"
					>
						{lines[LabelPosition.Below].map((label, i) => (
							<tspan
								className={label.className}
								x={widget.centerX}
								dy={`${i === 0 ? 0 : lineHeight}em`}
							>
								{label.text}
							</tspan>
						))}
					</text>
				}
			</g>
		);
	}

	private getLabelSet(): LabelSet {
		const widget = this.props.widget;
		const labelSet: LabelSet = {};

		let button: Button | undefined;
		if (widget.button && (widget.pressesLabel || widget.mashSpeedLabel)) {
			button = widget.button.resolve(this.props.controller);
		}

		let mashSpeedLabel: Label | undefined;
		if (widget.mashSpeedLabel && button && button.mashSpeed >= 5) {
			mashSpeedLabel = {
				className: LabelClassName.MashSpeed,
				text: `×${button.mashSpeed}`,
			};
		}

		if (widget.nameLabel) {
			if (widget.mashSpeedLabel === LabelReplacement.Name && mashSpeedLabel) {
				labelSet.name = mashSpeedLabel;
			} else if (widget.name) {
				labelSet.name = {
					className: LabelClassName.Name,
					text: widget.name,
				};
			}
		}

		if (widget.pressesLabel) {
			if (widget.mashSpeedLabel === LabelReplacement.Presses && mashSpeedLabel) {
				labelSet.presses = mashSpeedLabel;
			} else if (button) {
				labelSet.presses = {
					className: LabelClassName.Presses,
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
			labelSet.mashSpeed = mashSpeedLabel;
		}

		return labelSet;
	}
}
