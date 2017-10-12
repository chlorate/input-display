import {loadFile, saveFile} from "./file";
import {TestObject} from "./test";

describe("loadFile", () => {
	let obj;

	beforeEach(() => {
		obj = new TestObject();
	});

	it("should resolve if successful", (done) => {
		const file = new File(["{}"], "test.json");
		loadFile(file, obj).then(() => {
			expect(obj.json).toEqual({});
			done();
		});
	});

	it("should reject if the file contains invalid JSON", (done) => {
		const file = new File(["bad"], "test.json");
		loadFile(file, obj).catch((error) => {
			expect(error.startsWith("SyntaxError")).toBe(true);
			done();
		});
	});
});

describe("saveFile", () => {
	it("should create an object URL", () => {
		const url = saveFile(new TestObject());
		expect(url.startsWith("blob:")).toBe(true);
		URL.revokeObjectURL(url);
	});
});
