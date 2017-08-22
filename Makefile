WEBPACK=node_modules/.bin/webpack
WEBPACK_DEV_SERVER=node_modules/.bin/webpack-dev-server

.PHONY: build
build: node_modules
	$(WEBPACK) -p
	rm dist/styles.*.js

.PHONY: watch
watch: node_modules
	$(WEBPACK_DEV_SERVER)

.PHONY: clean
clean: 
	rm --recursive --force dist

.PHONY: clean-deps
clean-deps:
	rm --recursive --force node_modules

node_modules: package.json
	npm install
	touch $@
