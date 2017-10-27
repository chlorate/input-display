import Component from "inferno-component";
import {connect} from "inferno-mobx";
import {Config} from "../config/config";
import {Control} from "../control/control";
import {DpadControl} from "../control/dpad-control";
import {EllipseControl} from "../control/ellipse-control";
import {RectangleControl} from "../control/rectangle-control";
import {TriangleControl} from "../control/triangle-control";
import {Store} from "../storage/store";
import {DpadControlComponent} from "./dpad-control.component";
import {EllipseControlComponent} from "./ellipse-control.component";
import {RectangleControlComponent} from "./rectangle-control.component";
import {TriangleControlComponent} from "./triangle-control.component";

interface Props {
	config: Config;
}

interface Item {
	key: number;
	zIndex: number;
	control: Control;
}

/**
 * Draws the entire input display.
 */
@connect([Store.Config, Store.Controller])
export class DisplayComponent extends Component<Props, {}> {
	public render() {
		const config = this.props.config;

		// Sort controls so pressed and mashing controls are drawn above
		// unpressed controls.
		const items: Item[] = config.controls.map((control, i) => ({
			key: i,
			zIndex: this.zIndex(control),
			control,
		}));
		items.sort((x: Item, y: Item) => x.zIndex - y.zIndex);

		return (
			<svg
				hasKeyedChildren
				className={config.displayOutline ? "display-outline" : undefined}
				width={config.displayWidth}
				height={config.displayHeight}
			>
				{items.map((item) => {
					if (item.control instanceof DpadControl) {
						return <DpadControlComponent key={item.key} control={item.control} />;
					} else if (item.control instanceof EllipseControl) {
						return <EllipseControlComponent key={item.key} control={item.control} />;
					} else if (item.control instanceof RectangleControl) {
						return <RectangleControlComponent key={item.key} control={item.control} />;
					} else if (item.control instanceof TriangleControl) {
						return <TriangleControlComponent key={item.key} control={item.control} />;
					}
				})}
			</svg>
		);
	}

	/**
	 * Returns a number representing the z-index of a control:
	 * Pressed + mashing > Pressed > Mashing > Unpressed
	 */
	private zIndex(control: Control): number {
		if (!control.button) {
			return 0;
		}

		const button = control.button.resolve(this.props.controller);
		if (!button) {
			return 0;
		}

		let z = 0;
		if (button.pressed) {
			z += 2;
		}
		if (button.mashing) {
			z++;
		}
		return z;
	}
}
