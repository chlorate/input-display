import {render} from "inferno";

const IndexComponent = () => {
	return <div>Input Display</div>;
};

render(
	<IndexComponent />,
	document.getElementsByTagName("main")[0]
);
