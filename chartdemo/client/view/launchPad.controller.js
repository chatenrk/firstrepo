jQuery.sap.registerModulePath("chart_demo.MiniGauge", "controls/MiniGauge");
jQuery.sap.require("chart_demo.MiniGauge");
jQuery.sap.registerModulePath("chart_demo.MiniGaugeItem", "controls/MiniGauge");
jQuery.sap.require("chart_demo.MiniGaugeItem");
jQuery.sap.registerModulePath("chart_demo.PerformanceToTargetComparison", "controls/PerformanceToTargetComparison");
jQuery.sap.require("chart_demo.PerformanceToTargetComparison");
jQuery.sap.registerModulePath("chart_demo.PerformanceToTargetComparisonItem", "controls/PerformanceToTargetComparison");
jQuery.sap.require("chart_demo.PerformanceToTargetComparisonItem");
jQuery.sap.registerModulePath("chart_demo.StackedBarChart", "controls/StackedBarChart");
jQuery.sap.require("chart_demo.StackedBarChart");
jQuery.sap.registerModulePath("chart_demo.StackedBarChartItem", "controls/StackedBarChart");
jQuery.sap.require("chart_demo.StackedBarChartItem");

sap.ui.controller("chart_demo.view.launchPad", {
	
	handleNavButtonPress : function (evt) {
		this.nav.back("Master");
	},
	
	handleNavBack : function (evt) { 
		this.nav.back("Master"); 
	},

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf views.launchPad
	 */
	onInit : function() {
		console.log("chart_demo.view.launchPad.onInit()");
		this._rebindAll();

	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 * @memberOf views.launchPad
	 */
		onBeforeRendering: function() {
			
			console.log("chart_demo.view.launchPad.onBeforeRendering()");
			//var oModel = sap.ui.getCore().getModel("gauges");
			/*
			console.log("chart_demo.views.launchPad.onBeforeRendering(): oModel");
			console.log(oModel);
			console.log("chart_demo.views.launchPad.onBeforeRendering(): oModel.getJSON()");
			console.log(oModel.getJSON());
			console.log("chart_demo.views.launchPad.onBeforeRendering(): oModel.getData()");
			var chData = oModel.getData();
			console.log(chData);
			console.log(JSON.stringify(chData));
			*/
			//this._rebindAll();
		},
	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * @memberOf views.launchPad
	 */
	//	onAfterRendering: function() {
	//
	//	},
	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf views.launchPad
	 */
	//	onExit: function() {
	//
	//	}
	
	/*
	_handleRouteMatched : function(oEvent) {
		console.log("chart_demo.views.launchPad._handleRouteMatched()");
		
		var oMerge = {};
		console.log(oEvent);
		if (oEvent.getParameter("name") !== "launchPad") {
			return;
		} else {
			oMerge = $.extend({}, this.oContext, oEvent
					.getParameter("arguments"));
			// comparison needs to happen this way since == would check for object
			// identity and underscore.js's isEqual method not available in UI5/jQuery
			if (JSON.stringify(oMerge) !== JSON.stringify(this.oContext)) {
				this.oContext = oMerge;
				
				console.log("chart_demo.views.launchPad._handleRouteMatched(): this._rebindAll()");
				this._rebindAll();
			}
		}
	},
	*/

	_rebindAll : function() {
		console.log("chart_demo.view.launchPad._rebindAll");
		
		var oGaugeHolder = this.byId("miniGaugeHolder");
		var oGaugeItem = new chart_demo.MiniGaugeItem({region:"{region}", budget:"{budget}", best:"{best}", forecast:"{forecast}", worst:"{worst}"});
		/* new  chart */
		var oGauge = new chart_demo.MiniGauge({
			items: {path : "/regions", template : oGaugeItem}
		});
		
		//console.log("chart_demo.views.launchPad._rebindAll: setting model");
		var oModel = sap.ui.getCore().getModel("gauges");
		/*
		console.log("chart_demo.views.launchPad._rebindAll: model.getData()");
		console.log(oModel.getData());
		console.log("chart_demo.views.launchPad._rebindAll: oModel");
		console.log(oModel);
		*/
		oGauge.setModel(oModel);
		oGaugeHolder.addItem(oGauge);
		
		var oComparisonHolder = this.byId("QperformanceToTargetComparisonHolder");
		var oComparisonItem = new chart_demo.PerformanceToTargetComparisonItem({region:"{region}", budget:"{budget}", bw:"{budget}", forecast:"{forecast}"});
		/* new  chart */
		var oComparison = new chart_demo.PerformanceToTargetComparison({
			items: {path : "/regions", template : oComparisonItem}
		});
		
		//console.log("chart_demo.views.launchPad._rebindAll: setting model");
		/*
		console.log("chart_demo.views.launchPad._rebindAll: model.getData()");
		console.log(oModel.getData());
		console.log("chart_demo.views.launchPad._rebindAll: oModel");
		console.log(oModel);
		*/
		oComparison.setModel(oModel);
		oComparisonHolder.addItem(oComparison);
		
		var oComparisonHolder = this.byId("YTDperformanceToTargetComparisonHolder");
		var oComparisonItem = new chart_demo.PerformanceToTargetComparisonItem({region:"{region}", budget:"{budget}", bw:"{bw_ytd}", forecast:"{forecast}"});
		/* new  chart */
		var oComparison = new chart_demo.PerformanceToTargetComparison({
			items: {path : "/regions", template : oComparisonItem}
		});
		
		//console.log("chart_demo.views.launchPad._rebindAll: setting model");
		oModel = sap.ui.getCore().getModel("comparison");
		oComparison.setModel(oModel);
		oComparisonHolder.addItem(oComparison);
		
		var oStackedBarHolder = this.byId("InProcessStackedBarChartHolder");
		var oStackedBarItem = new chart_demo.StackedBarChartItem({quarter:"{region}", values:"{values}"});
		/* new  chart */
		var oStackedBar = new chart_demo.StackedBarChart({
			items: {path : "/buckets", template : oStackedBarItem}
		});
		
		//console.log("chart_demo.views.launchPad._rebindAll: setting model");
		oModel = sap.ui.getCore().getModel("inprocess");
		
		oStackedBar.setModel(oModel);
		oStackedBarHolder.addItem(oStackedBar);
		

	},

});