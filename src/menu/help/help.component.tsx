import {version, versionDate} from "../../version";

/**
 * Contents of the Help tab.
 */
export const HelpComponent = () => (
	<section>
		<h1>Input Display</h1>
		<p className="lead text-muted">
			v{version} ({versionDate})
		</p>
		<ul className="list-unstyled m-0">
			<li>
				<a href="https://github.com/chlorate/input-display" target="_blank">
					GitHub
				</a>
			</li>
			<li>
				<a href="https://github.com/chlorate/input-display/wiki" target="_blank">
					Documentation
				</a>
			</li>
			<li>
				<a href="https://github.com/chlorate/input-display/wiki/Compatibility" target="_blank">
					Browser and controller compatibility
				</a>
			</li>
		</ul>
	</section>
);
