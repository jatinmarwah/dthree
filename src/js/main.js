(function () {
    //Need to use browserify here var d3 = require("d3");
    var width = 960,
        height = 500,
        radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 70);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) {

            return d.timesClicked;
        });

    var svg = d3.selection("#donut-charts").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    d3.csv("js/data.csv", type, function(error, data) {
        if (error) throw error;
        var counts = [];
        console.log(getCount(arr))
        var g = svg.selectAll(".arc")
            .data(pie(getCount(arr)))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function(d) { return color(d.data.timesClicked); });

        g.append("text")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .text(function(d) { return d.data.Country; });
    });
    var arr = [];
    function type(data) {


        if(data.Clicked === "Clicked"){
            arr.push({
                "Country": data.Country,
                "count" : ''
            });
        }

        //dataset = data.map(function(d) { return [ +d["x-coordinate"], +d["y-coordinate"] ]; });
        return data;
    }

    function getCount(array) {
        var count = {};
        array.forEach(function (a) {
            count[a.Country] = (count[a.Country] || 0) + 1;
        });
        return Object.keys(count).map(function (k) {
            return { Country: k, timesClicked: +count[k] };
        });
    }

})();
