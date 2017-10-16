import {connect} from "inferno-mobx";
import {Controller} from "../controller/controller";
import {formatNumber} from "../math/util";
import {Store} from "../storage/store";
import {ButtonWidget} from "../widget/button-widget";

interface Props {
	controller: Controller;
	widget: ButtonWidget;
}

/**
 * Draws the label for a widget. The widget name, button press count, and button
 * mash speed can be toggled for display.
 */
export const WidgetLabelComponent = connect([Store.Controller], (props: Props) => {
	if (!props.widget.button) {
		return;
	}

	const button = props.widget.button.resolve(props.controller);
	if (!button) {
		return;
	}

	const showMashSpeed = props.widget.showMashSpeed && button.mashSpeed >= 5;
	const showTopLabel = props.widget.showName || showMashSpeed;
	const showBottomLabel = props.widget.showPresses;
	if (!showTopLabel && !showBottomLabel) {
		return;
	}

	let topLabel = props.widget.name;
	if (showMashSpeed) {
		topLabel = `×${button.mashSpeed}`;
	}

	// This is limited to two lines because there isn't really any support for
	// multi-line text in SVG. It sort of has to be done manually. These
	// settings accomplish two lines by placing one line above the baseline and
	// one line below. The line spacing is good enough in this case. Otherwise
	// I would have to place it down like 1em and then there's a chance the
	// lines might overlap because fonts vary.
	let topBaseline = "central";
	let bottomBaseline = "central";
	if (showTopLabel && showBottomLabel) {
		topBaseline = "text-after-edge";
		bottomBaseline = "text-before-edge";
	}

	return (
		<g class="widget-label">
			{showTopLabel &&
				<text
					className={`widget-label-${showMashSpeed ? "mash-speed" : "name"}`}
					x={props.widget.centerX}
					y={props.widget.centerY}
					text-anchor="middle"
					dominant-baseline={topBaseline}
					fill="white"
				>
					{topLabel}
				</text>
			}
			{showBottomLabel &&
				<text
					className="widget-label-presses"
					x={props.widget.centerX}
					y={props.widget.centerY}
					text-anchor="middle"
					dominant-baseline={bottomBaseline}
					fill="white"
				>
					{formatNumber(button.presses)}
				</text>
			}
		</g>
	);
});
