jQuery.sap.require("chart_demo.libs.d3");
jQuery.sap.declare("chart_demo.Chart");

sap.ui.core.Element.extend("chart_demo.LineChartItem", { metadata : {
	properties : {
		"date" : {type : "string", group : "Misc", defaultValue : null},
		"close" : {type : "string", group : "Misc", defaultValue : null}
	}
}});
sap.ui.core.Control.extend("chart_demo.LineChart", {
	metadata : {
		properties: {
			"title": {type : "string", group : "Misc", defaultValue : "Chart Title"}
		},
		aggregations : {
			"items" : { type: "chart_demo.LineChartItem", multiple : true, singularName : "item"}
		}
		,
		defaultAggregation : "items",
		events: {
			"onPress" : {},
			"onChange":{}
		}
	},
  init: function()
  {
                //initialisation code, in this case, ensure css is imported
                var libraryPath = jQuery.sap.getModulePath("chart_demo"); //get the server location of the ui library
                jQuery.sap.includeStyleSheet(libraryPath + "/../css/style.css"); //specify the css path relative from the ui folder
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
	onAfterRendering: function()
	{
		console.log("chart_demo.Chart.onAfterRendering()");
		console.log(this.sParentId);

		var cItems = this.getItems();
		var data = [];
		for (var i=0;i<cItems.length;i++)
		{
			var oEntry = {};
			for (var j in cItems[i].mProperties)
			{
				oEntry[j]=cItems[i].mProperties[j];
			}
			data.push(oEntry);
		}

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
          height = 500 - margin.top - margin.bottom;

      // parse the date / time
      var parseTime = d3.timeParse("%d-%b-%y");

      // set the ranges
      var x = d3.scaleTime().range([0, width]);
      var y = d3.scaleLinear().range([height, 0]);

      // define the line
      var valueline = d3.line()
                        .x(function(d)
                        {
                          return x(d.date);
                        })
                        .y(function(d)
                        {
                          return y(d.close);
                        });

      // append the svg obgect to the body of the page
      // appends a 'group' element to 'svg'
      // moves the 'group' element to the top left margin
      var svg = vis.append("svg")
        				    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .style("background-color","white")
                    .style("font", "12px sans-serif")
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // format the data
      data.forEach(function(d)
      {
        d.date = parseTime(d.date);
        d.close = +d.close;
      });

      // Scale the range of the data
      x.domain(d3.extent(data, function(d) { return d.date; }));
      y.domain([0, d3.max(data, function(d) { return d.close; })]);

      // Add the valueline path.
      svg.append("path")
          .data([data])
          .attr("class", "line")
          .attr("d", valueline);

      // Add the X Axis
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      // Add the Y Axis
      svg.append("g")
          .call(d3.axisLeft(y));
  }
});



	// 		var margin = {top: 20, right: 20, bottom: 30, left: 50},
	// 				width = 600 - margin.left - margin.right,
	// 				height = 300 - margin.top - margin.bottom;
  //
	// var parseTime = d3.timeParse("%d-%b-%y");
	// 				// Append SVG to Vis
	// 		var svg = vis.append("svg");
  // 							    // .attr("width", width + margin.left + margin.right)
	// 							    // .attr("height", height + margin.top + margin.bottom);
	//   						    // .style("background-color","white")
	// 							    // .style("font", "12px sans-serif")
	// 							    // .append("g")
	// 							    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  //
  //                   var x = d3.scaleTime()
  //                 						.rangeRound([0, width]);
  //
  //             			var y = d3.scaleLinear()
  //                 						.rangeRound([height, 0]);
  //
  //                   var line = d3.line()
  //                              .x(function(d) { return x(d.date); })
  //                              .y(function(d) { return y(d.close); });
  //
  //
  //
  //    			x.domain(d3.extent(data, function(d) { return d.date; }));
  //   			y.domain(d3.extent(data, function(d) { return d.close; }));
  //
  //
  //     g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  //
  //
  //
	// 		g.append("g")
  //     .attr("transform", "translate(0," + height + ")")
  //     .call(d3.axisBottom(x))
  //     .select(".domain")
  //     .remove();
  //
	// 		g.append("g")
  //     .call(d3.axisLeft(y))
  //   	.append("text")
  //     .attr("fill", "#000")
  //     .attr("transform", "rotate(-90)")
  //     .attr("y", 6)
  //     .attr("dy", "0.71em")
  //     .attr("text-anchor", "end")
  //     .text("Price ($)");
  //
  // 		g.append("path")
  //     .datum(data)
  //     .attr("fill", "none")
  //     .attr("stroke", "steelblue")
  //     .attr("stroke-linejoin", "round")
  //     .attr("stroke-linecap", "round")
  //     .attr("stroke-width", 1.5)
  //     .attr("d", line);


	// 		var margin =
	// 		{
	// 					top: 15,
	// 					right: 15,
	// 					bottom: 30,
	// 					left: 40
	// 		 },
	// 		width = 600 - margin.left - margin.right,
	// 		height = 300 - margin.top - margin.bottom;
	//
	// 		// Our X scale
	// 									var x = d3.scale.linear()
	// 									    .range([0, width-80])
	// 											.domain([2000,2010]);
	// 	  // Our Y scale
	// 									var y = d3.scale.linear()
	// 									    .range([height, 0])
	// 											.domain([134,215]);
	//
	// 		// Use our X scale to set a bottom axis
	// 											var xAxis = d3.svg.axis()
	// 											    .scale(x)
	// 											    .orient("bottom");
	//
	// 		// Same for our left axis
	// 											var yAxis = d3.svg.axis()
	// 											    .scale(y)
	// 											    .orient("left")
	// 											    .tickFormat(d3.format(".2s"));
	//
	// 													var lineGen = d3.svg.line()
	// 																			  .x(function(d)
	// 																				{
	// 																		    	return x(d.year);
	// 																			  })
	// 																			  .y(function(d)
	// 																				{
	// 																		    	return y(d.sale);
	// 																		  	});
	//
	// 		// Append SVG to Vis
	// 								var svg = vis.append("svg")
	// 																						    .attr("width", width + margin.left + margin.right)
	// 																						    .attr("height", height + margin.top + margin.bottom)
	// 																						    .style("background-color","white")
	// 																						    .style("font", "12px sans-serif")
	// 																						    .append("g")
	// 																						    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	//
	// 						// var svg =	vis.append('svg:path')
	// 					  // 					.attr('d', lineGen(data))
	// 					  // 					.attr('stroke', 'green')
	// 					  // 				.attr('stroke-width', 2)
	// 					  // .attr('fill', 'none');
	//
	// 			//Attach X axis
	// 																														    svg.append("g")
	// 																														        .attr("class", "x axis")
	// 																														        .style("fill", "none")
	// 																														        .style("stroke", "grey")
	// 																														        .style("shape-rendering", "crispEdges")
	// 																														        .attr("transform", "translate(0," + height + ")")
	// 																														        .call(xAxis);
	//
	// 			// Attach Y Axis
	// 																																							    svg.append("g")
	// 																																							        .attr("class", "y-axis")
	// 																																							        .style("fill", "none")
	// 																																							        .style("stroke", "grey")
	// 																																							        .style("shape-rendering", "crispEdges")
	// 																																							        .call(yAxis);
	//
	// 																																											g.append("path")
	// 																																										      .datum(data)
	// 																																										      .attr("fill", "none")
	// 																																										      .attr("stroke", "steelblue")
	// 																																										      .attr("stroke-linejoin", "round")
	// 																																										      .attr("stroke-linecap", "round")
	// 																																										      .attr("stroke-width", 1.5)
	// 																																										      .attr("d", lineGen);
	//
	//
	// }
