ko.extenders.selectAll = function(target, options) {
	var collection = options.collection || ko.observableArray();
	var selectedMethod = options.selectedMethod;
	_.each(collection(), function(item) {
		var observable = item[selectedMethod];
		observable.changedFromParent = ko.observable(false);
		observable.subscribe(function (newValue) {
			if (!observable.changedFromParent()) {
				target.onChildToggle(newValue);
			}

			observable.changedFromParent(false);
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
