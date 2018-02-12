// jQuery.sap.require("sap/ui/thirdparty/d3");
jQuery.sap.declare("chart_demo.PieChart");

sap.ui.core.Element.extend("chart_demo.PieChartItem", { metadata : {
	properties : {
		"age" : {type : "string", group : "Misc", defaultValue : null},
		"population" : {type : "string", group : "Misc", defaultValue : null}
	}
}});
sap.ui.core.Control.extend("chart_demo.PieChart", {
	metadata : {
		properties: {
			"title": {type : "string", group : "Misc", defaultValue : "Chart Title"}
		},
		aggregations : {
			"items" : { type: "chart_demo.PieChartItem", multiple : true, singularName : "item"}
		}
		,
		defaultAggregation : "items",
		events: {
			"onPress" : {},
			"onChange":{}
		}
	},


	init : function() {
		console.log("chart_demo.Chart.init()");
		this.sParentId = "";
	},


	createChart : function() {
		/*
		 * Called from renderer
		 */
		console.log("chart_demo.Chart.createChart()");
		var oChartLayout = new sap.m.VBox({alignItems:sap.m.FlexAlignItems.Center,justifyContent:sap.m.FlexJustifyContent.Center});
		var oChartFlexBox = new sap.m.FlexBox({height:"auto",alignItems:sap.m.FlexAlignItems.Center});
		/* ATTENTION: Important
		 * This is where the magic happens: we need a handle for our SVG to attach to. We can get this using .getIdForLabel()
		 * Check this in the 'Elements' section of the Chrome Devtools:
		 * By creating the layout and the Flexbox, we create elements specific for this control, and SAPUI5 takes care of
		 * ID naming. With this ID, we can append an SVG tag inside the FlexBox
		 */
		this.sParentId=oChartFlexBox.getIdForLabel();
		oChartLayout.addItem(oChartFlexBox);

		return oChartLayout;

	},


	/**
	 * The renderer render calls all the functions which are necessary to create the control,
	 * then it call the renderer of the vertical layout
	 * @param oRm {RenderManager}
	 * @param oControl {Control}
	 */
	renderer : function(oRm, oControl) {
		var layout = oControl.createChart();

		oRm.write("<div");
		oRm.writeControlData(layout); // writes the Control ID and enables event handling - important!
		oRm.writeClasses(); // there is no class to write, but this enables
		// support for ColorBoxContainer.addStyleClass(...)

		oRm.write(">");
		oRm.renderControl(layout);
		oRm.addClass('verticalAlignment');

		oRm.write("</div>");

	},

	onAfterRendering: function(){
		console.log("chart_demo.Chart.onAfterRendering()");
		console.log(this.sParentId);
		var cItems = this.getItems();
		var data = [];
		for (var i=0;i<cItems.length;i++){
			var oEntry = {};
			for (var j in cItems[i].mProperties) {
				oEntry[j]=cItems[i].mProperties[j];
			}
			data.push(oEntry);
		}
		//console.log("Data:");
		//console.log(data);

		/*
		 * ATTENTION: See .createChart()
		 * Here we're picking up a handle to the "parent" FlexBox with the ID we got in .createChart()
		 * Now simply .append SVG elements as desired
		 * EVERYTHING BELOW THIS IS PURE D3.js
		 */

		var vis = d3.select("#" + this.sParentId);

		// set the dimensions and margins of the graph
		var margin = {top: 20, right: 20, bottom: 30, left: 50},
				width = 960 - margin.left - margin.right,
				height = 500 - margin.top - margin.bottom,
				radius = Math.min(width, height) / 2

		// append the svg obgect to the body of the page
		// appends a 'group' element to 'svg'
		// moves the 'group' element to the top left margin
		var svg = vis.append("svg")
									.attr("width", width + margin.left + margin.right)
									.attr("height", height + margin.top + margin.bottom);
									// .attr("radius",radius);
									// .style("background-color","white")
									// .style("font", "12px sans-serif");

		var g=  svg.append("g")
						  	.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// var color = d3.scale.category10();
	 var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

	 var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.population; });

		var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

		var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

		// format the data
		data.forEach(function(d)
		{
			d.population = +d.population;
			return d;
		});

		var arc = g.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  arc.append("path")
      .attr("d", path)
      .attr("fill", function(d) { return color(d.data.age); });

  arc.append("text")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      .attr("dy", "0.35em")
      .text(function(d) { return d.data.age; });
	}


});
