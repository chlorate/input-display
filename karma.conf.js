module.exports = function(config) {
	config.set({
		frameworks: ["es6-shim", "jasmine"],
		reporters: ["progress"],
		files: ["src/**/*.spec.ts"],
		mime: {
			"text/x-typescript": ["ts", "tsx"],
		},
		preprocessors: {
			"**/*.spec.ts": ["webpack"],
		},
		webpack: {
			resolve: {
				extensions: [".tsx", ".ts", ".js"],
			},
			module: {
				rules: [
					{
						test: /\.tsx?$/,
						use: ["babel-loader", "ts-loader"],
					},
				],
			},
		},
	});
};
