jQuery.sap.require("chart_demo.utils.Formatter");
jQuery.sap.require("chart_demo.utils.Grouper");

sap.ui.controller("chart_demo.view.Master", {

	handleListItemPress : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext("reports");
		var index = context.sPath.substring(18);

		switch(+index){
			case 0:
				this.nav.to("launchPad", context);
				break;
			case 1:
				this.nav.to("Growth", context);
				break;
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
				this.nav.to("GrowthRegion", context);
				break;
			case 7:
				this.nav.to("TopDeals", context);
				break;
			default:
				console.log("nothing matches");
				this.nav.to("launchPad", context);
		}

	},

	handleListSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext("reports");
		var index = context.sPath.substring(18);
		console.log(index);

		switch(+index){
			case 0:
				this.nav.to("launchPad", context);
				break;
			case 1:
				this.nav.to("Growth", context);
				break;
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
				this.nav.to("GrowthRegion", context);
				break;
			case 7:
				this.nav.to("TopDeals", context);
				break;
			case 8:
				this.nav.to("Line", context);
					break;
			case 9:
				this.nav.to("Area", context);
							break;
			case 10:
				this.nav.to("Pie", context);
			  			break;
			case 11:
				this.nav.to("MultiLine", context);
							break;
			  default:
				this.nav.to("launchPad", context);
		}

	},

	handleGroup : function (evt) {
		// compute sorters
		var sorters = [];
		var item = evt.getParameter("selectedItem");
		var key = (item) ? item.getKey() : null;
		if ("GrossAmount" === key || "LifecycleStatus" === key) {
			sap.ui.demo.myFiori.utils.Grouper.bundle = this.getView().getModel("i18n").getResourceBundle();
			var grouper = sap.ui.demo.myFiori.utils.Grouper[key];
			sorters.push(new sap.ui.model.Sorter(key, false, grouper));
		}
		// update binding
		var list = this.getView().byId("list");
		var oBinding = list.getBinding("items");
		oBinding.sort(sorters);
	}
});
