describe("the selectAll extender", function() {
	var Item = function() {
		this.selected = ko.observable(false);
	};

	var items = ko.observableArray([new Item(), new Item()]);
	var selectAll = ko.observable(false).extend({ selectAll: { collection: items, selectedMethod: 'selected' } });

	describe("when selectAll is selected", function() {
		beforeEach(function() {
			selectAll(true);
		});

		it("should select all items", function() {
			var allSelected = _.every(items(), function(i) { return i.selected(); });
			expect(allSelected).toBe(true);
		});

		describe("and then an item is deselected", function() {
			it("should deselect selectAll", function() {
				items()[0].selected(false);
				expect(selectAll()).toBe(false);
			});
		});
	});

	describe("when all items are selected", function() {
		beforeEach(function() {
			_.each(items(), function(i) { i.selected(true); });
		});

		it("should switch on the selectAll option", function() {
			expect(selectAll()).toBe(true);
		});

		describe("and then selectAll is deselected", function() {
			it("should deselect all items", function() {
				selectAll(false);
				var allDeselected = _.every(items(), function(i) { return !i.selected(); });
				expect(allDeselected).toBe(true);
			});
		});
	});
});
