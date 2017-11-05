import {secondToMilliseconds} from "../time/const";

const fps = 60;

/**
 * A mock for requestAnimationFrame.
 */
export class MockAnimationFrame {
	private frames: number = 0;
	private id: number = 0;
	private callbacks: {[id: number]: FrameRequestCallback} = {};

	public request(callback: FrameRequestCallback): number {
		const id = this.id++;
		this.callbacks[id] = callback;
		return id;
	}

	public tick(frames: number) {
		for (let i = 0; i < frames; i++) {
			this.frames++;
			Object.keys(this.callbacks).forEach((id) => {
				this.callbacks[id](secondToMilliseconds * this.frames / fps);
				delete this.callbacks[id];
			});
		}
	}
}
