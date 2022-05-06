install:
	npm install

build:
	npm run build

develop:
	npm start

start: develop

lint:
	npx editorconfig-checker
	npx eslint './src/**/*{.js,.jsx}'

test:
	npx react-scripts test --watchAll=false --passWithNoTests

deploy:
	npm run deploy

.PHONY: build
