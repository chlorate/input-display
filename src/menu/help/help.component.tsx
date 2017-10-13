import {version, versionDate} from "../../version";

/**
 * Contents of the Help tab.
 */
export const HelpComponent = () => (
	<section>
		<h1>Input Display</h1>
		<p class="lead text-muted">
			v{version} ({versionDate})
		</p>

		<h2 class="h4 mt-5">
			Limitations
		</h2>
		<ul>
			<li>
				Microsoft Edge only supports controllers with the "standard"
				mapping (Xbox 360 or similar).
			</li>
		</ul>

		<h2 class="h4">
			Control stick calibration
		</h2>
		<p>
			Leave all control sticks at their neutral position. In the
			Controller tab, click the axes Reset button. Rotate each control
			stick or push them in each direction to record their possible
			ranges.
		</p>
	</section>
);
