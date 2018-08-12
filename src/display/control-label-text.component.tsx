import {Component} from "inferno";
import {inject, observer} from "inferno-mobx";
import {Config} from "../config/config";
import {Store} from "../storage/store";
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

interface InjectedProps extends Props {
	config: Config;
}

/**
 * A generic component for rendering control labels at some position with certain
 * spacing and alignment.
 */
@inject(Store.Config)
@observer
export class ControlLabelTextComponent extends Component<Props, {}> {
	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	private get tspans(): JSX.Element[] {
		const {
			config: {labelOffsetX},
			labels,
			space,
			spanFirstShiftX,
			spanFirstShiftY,
			spanShiftY,
			spanX,
		} = this.injected;

		return labels.map((label, i) => (
			<tspan
				className={label.className}
				x={spanX ? spanX + labelOffsetX : undefined}
				dx={i === 0 ? spanFirstShiftX : undefined}
				dy={i === 0 ? spanFirstShiftY : spanShiftY}
			>
				{label.text}
				{space ? " " : undefined}
			</tspan>
		));
	}

	public render(): JSX.Element {
		const {
			config: {labelOffsetX, labelOffsetY},
			anchor,
			baseline,
			x,
			y,
		} = this.injected;

		return (
			<text
				x={x + labelOffsetX}
				y={y + labelOffsetY}
				text-anchor={anchor}
				dominant-baseline={baseline}
			>
				{this.tspans}
			</text>
		);
	}
}
