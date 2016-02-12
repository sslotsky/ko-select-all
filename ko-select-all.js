ko.extenders.selectAll = function(target, options) {
	var collection = options.collection || ko.observableArray();
	var selectedMethod = options.selectedMethod;
	_.each(collection(), function(item) {
		item[selectedMethod].changedFromParent = ko.observable(false);
		item[selectedMethod].subscribe(function (newValue) {
			if (!item[selectedMethod].changedFromParent()) {
				target.onChildToggle(newValue);
			}

			item[selectedMethod].changedFromParent(false);
		});
	});

	target.changedFromChild = ko.observable(false);
	target.subscribe(function(newValue) {
		if (!target.changedFromChild()) {
			_.each(collection(), function(item) {
				item[selectedMethod].changedFromParent(true);
				item[selectedMethod](!!newValue);
			});
		}

		target.changedFromChild(false);
	});

	target.onChildToggle = function (isSelected) {
		target.changedFromChild(true);
		target(isSelected && _.every(collection(), function (item) {
			return item[selectedMethod]();
		}));
	};

	_.each(collection(), function(item) {
	});
};

//var Item = function() {
//	this.selected = ko.observable(false);
//};
//
//var items = ko.observableArray([new Item(), new Item()]);
//var selectAll = ko.observable(false).extend({ selectAll: { collection: items, selectedMethod: 'selected' } });
//
//selectAll(true);
//console.log(_.every(items(), function(i) { return i.selected(); })); // true
//items()[0].selected(false);
//console.log(selectAll()); // false
