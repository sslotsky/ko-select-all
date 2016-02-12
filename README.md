![BuildStatus](https://travis-ci.org/sslotsky/ko-select-all.svg?branch=master)

# ko-select-all

This plugin provides an easy way to add 'Select All' functionality to a knockout obervableArray.

## Installation

At this time, `src/ko-select-all.js` and its dependencies must be downloaded manually to your project. Packaging options may be provided in the future.

### Dependencies

This package depends on the knockout and underscore libraries. 
* knockout - https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.0/knockout-min.js
* underscore - https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js

## Basic Usage

Many use cases are documented in the Jasmine tests. In a nutshell:

```javascript
var Item = function() {
	this.selected = ko.observable(false);
};

var items = ko.observableArray([new Item(), new Item()]);
var selectAll = ko.observable(false).extend({ selectAll: { collection: items, selectedMethod: 'selected' } });

selectAll(true);
console.log(_.every(items(), function(i) { return i.selected(); })); // true
items()[0].selected(false);
console.log(selectAll()); // false
```
## Contributing

If you wish to contribute, please create a fork and submit a pull request. Do not submit without adding tests for your changes.

### Tests

This repository has continuous integration through Travis CI. Tests can also be run locally by opening `test/test-runner.html` in the browser. To add a new Jasmine test, create a `.js` file for it in the `test` directory and reference it in `test-runner.html` with a `<script>` tag. This test will be automatically picked up by the task that Travis uses to run tests.
