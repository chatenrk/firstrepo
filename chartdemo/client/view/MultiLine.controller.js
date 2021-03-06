jQuery.sap.registerModulePath("chart_demo.MultiLineChart", "controls/MultiLineChart");
jQuery.sap.require("chart_demo.MultiLineChart");
jQuery.sap.registerModulePath("chart_demo.MultiLineChartItem", "controls/MultiLineChart");
jQuery.sap.require("chart_demo.MultiLineChartItem");

sap.ui.controller("chart_demo.view.MultiLine", {

	handleNavButtonPress : function (evt) {
		this.nav.back("Master");
	},

	handleNavBack : function (evt) {
		this.nav.back("Master");
	},

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.Growth
*/
	onInit: function() {
		// this._rebindAll();
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.Growth
*/
	onBeforeRendering: function() {
		console.log("chart_demo.view.Line.onBeforeRendering()");
	},


/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.Growth
*/
	onAfterRendering: function() {
		this._rebindAll();
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.Growth
*/
//	onExit: function() {
//
//	}


	_rebindAll : function()
		{
			var multilinedata = sap.ui.getCore().getModel("multilinedata");
			oMultiLineChartHolder = this.byId("MultiLineChartHolder");
			oMultiLineChartItem = new chart_demo.MultiLineChartItem({date:"{date}", close:"{close}"});
			oMultiLineChart = new chart_demo.MultiLineChart({
				items: {path : "/", template : oMultiLineChartItem}
			});

			oMultiLineChart.setModel(multilinedata);
			oMultiLineChartHolder.addItem(oMultiLineChart);

	}

});
