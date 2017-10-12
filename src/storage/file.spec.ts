import {saveFile} from "./file";
import {TestObject} from "./test";

describe("saveFile", () => {
	it("should create an object URL", () => {
		const url = saveFile(new TestObject());
		expect(url.startsWith("blob:")).toBe(true);
		URL.revokeObjectURL(url);
	});
});
