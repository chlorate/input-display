import {connect} from "inferno-mobx";
import {Config} from "../config/config";
import {Store} from "../storage/store";
import {Label} from "./label";

interface Props {
	config: Config;
	labels: Label[];
	x: number;
	y: number;
	anchor: string;
	baseline: string;
	spanX?: number;
	spanFirstShiftX?: number;
	spanFirstShiftY?: number;
	spanShiftY?: number;
	space?: boolean;
}

/**
 * A generic component for rendering control labels at some position with certain
 * spacing and alignment.
 */
export const ControlLabelTextComponent = connect([Store.Config], (props: Props) => (
	<text
		x={props.x + props.config.labelOffsetX}
		y={props.y + props.config.labelOffsetY}
		text-anchor={props.anchor}
		dominant-baseline={props.baseline}
	>
		{props.labels.map((label, i) => (
			<tspan
				className={label.className}
				x={props.spanX ? props.spanX + props.config.labelOffsetX : undefined}
				dx={i === 0 ? props.spanFirstShiftX : undefined}
				dy={i === 0 ? props.spanFirstShiftY : props.spanShiftY}
			>
				{label.text}{props.space ? " " : undefined}
			</tspan>
		))}
	</text>
));
