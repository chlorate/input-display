import {App} from "./app";

configure({
	enforceActions: true,
});

render(<App />, document.getElementsByTagName("main")[0]);
