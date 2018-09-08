import {render} from "inferno";
import {configure} from "mobx";
import {App} from "./app";

configure({
	enforceActions: "observed",
});

render(<App />, document.getElementsByTagName("main")[0]);
