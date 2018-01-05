jQuery.sap.registerModulePath("chart_demo.HorizontalBarChart", "controls/HorizontalBarChart");
jQuery.sap.require("chart_demo.HorizontalBarChart");
jQuery.sap.registerModulePath("chart_demo.HorizontalBarChartItem", "controls/HorizontalBarChart");
jQuery.sap.require("chart_demo.HorizontalBarChartItem");

sap.ui.controller("chart_demo.view.TopDeals", {
	
	handleNavButtonPress : function (evt) {
		this.nav.back("Master");
	},
	
	handleNavBack : function (evt) { 
		this.nav.back("Master"); 
	},

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.Top20
*/
	onInit: function() {
		console.log("chart_demo.view.TopDeals.onInit()");
		this._rebindAll();
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.Top20
*/
	onBeforeRendering: function() {
		console.log("chart_demo.view.TopDeals.onBeforeRendering()");
		
	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.Top20
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.Top20
*/
//	onExit: function() {
//
//	}
	
	_rebindAll : function() {
		console.log("chart_demo.view.TopDeals._rebindAll");
		
		
		var oHorizontalBarHolder = this.byId("HorizontalBarChartHolder");
		var oHorizontalBarItem = new chart_demo.HorizontalBarChartItem({dim1:"{customer}", dim2:"{region}", dim3:"{date}", value: "{value}"});
		/* new  chart */
		
		var oHorizontalBar = new chart_demo.HorizontalBarChart({
			items: {path : "/", template : oHorizontalBarItem}
		});
		
		//console.log("chart_demo.views.launchPad._rebindAll: setting model");
		var oModel = sap.ui.getCore().getModel("top20deals");
		
		oHorizontalBar.setModel(oModel);
		oHorizontalBarHolder.addItem(oHorizontalBar);
		

	},

});