import {Label} from "./label";

interface Props {
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
 * A generic component for rendering widget labels at some position with certain
 * spacing and alignment.
 */
export const WidgetLabelTextComponent = (props: Props) => (
	<text
		x={props.x}
		y={props.y}
		text-anchor={props.anchor}
		dominant-baseline={props.baseline}
		fill="white"
	>
		{props.labels.map((label, i) => (
			<tspan
				className={label.className}
				x={props.spanX}
				dx={i === 0 ? props.spanFirstShiftX : undefined}
				dy={i === 0 ? props.spanFirstShiftY : props.spanShiftY}
			>
				{label.text}{props.space ? " " : undefined}
			</tspan>
		))}
	</text>
);
