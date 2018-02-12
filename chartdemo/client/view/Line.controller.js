jQuery.sap.registerModulePath("chart_demo.LineChart", "controls/LineChart");
jQuery.sap.require("chart_demo.LineChart");
jQuery.sap.registerModulePath("chart_demo.LineChartItem", "controls/LineChart");
jQuery.sap.require("chart_demo.LineChartItem");

sap.ui.controller("chart_demo.view.Line", {

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
			var linedata = sap.ui.getCore().getModel("linedata");
			oLineChartHolder = this.byId("LineChartHolder");
			oLineChartItem = new chart_demo.LineChartItem({date:"{date}", close:"{close}"});
			oLineChart = new chart_demo.LineChart({
				items: {path : "/", template : oLineChartItem}
			});


			oLineChart.setModel(linedata);
			oLineChartHolder.addItem(oLineChart);

	}

});
