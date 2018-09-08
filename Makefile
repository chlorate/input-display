KARMA=node_modules/.bin/karma
NPM_CHECK=node_modules/.bin/npm-check
WEBPACK=node_modules/.bin/webpack
WEBPACK_DEV_SERVER=node_modules/.bin/webpack-dev-server

.PHONY: build
build: node_modules
	$(WEBPACK) -p
	rm dist/styles.*.js

.PHONY: test
test: node_modules
	$(KARMA) start --browsers ChromeHeadless,FirefoxHeadless --single-run

.PHONY: watch
watch: node_modules
	DEVELOPMENT=true $(WEBPACK_DEV_SERVER) -d --host 0.0.0.0

.PHONY: watch-test
watch-test: node_modules
	$(KARMA) start

.PHONY: clean
clean: 
	rm --recursive --force dist junit

.PHONY: clean-deps
clean-deps:
	rm --recursive --force node_modules

.PHONY: upgrade
upgrade:
	# inferno-mobx requires mobx v4
	$(NPM_CHECK) --update --ignore mobx --save-exact

node_modules: package.json
	npm install
	touch $@
