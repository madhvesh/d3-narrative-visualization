var tsvData = null;

var margin = {top: 20, right: 100, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var parseDate = d3.timeParse('%Y');
var formatSi = d3.format(".3s");
var formatNumber = d3.format(".1f"),
    formatBillion = function(x) { return formatNumber(x / 1e5); };

var x = d3.scaleTime()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

var color = d3.scaleOrdinal(d3.schemeDark2);

var xAxis = d3.axisBottom()
    .ticks(5)
    .scale(x);

var yAxis = d3.axisLeft()
    .scale(y)
    .ticks(1.5)
    .tickFormat(formatBillion);

var area = d3.area()
    .x(function(d) { return x(d.data.date); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); });

var stack = d3.stack()

var svg = d3.select('#line-area1').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

d3.csv('data/stacked_area.csv').then(function(data){
    color.domain(d3.keys(data[0]).filter(function(key) { return key !== 'date'; }));

    var keys = data.columns.filter(function(key) { return key !== 'date'; })

    data.forEach(function(d) {
        d.date = parseDate(d.date);
    });

    tsvData = (function(){ return data; })();

    var maxDateVal = d3.max(data, function(d){
        var vals = d3.keys(d).map(function(key){ return key !== 'date' ? d[key] : 0 });
        return d3.sum(vals);
    });

    // Set domains for axes
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, maxDateVal])

    stack.keys(keys);

    stack.order(d3.stackOrderNone);
    stack.offset(d3.stackOffsetNone);

    var browser = svg.selectAll('.browser')
        .data(stack(data))
        .enter().append('g')
        .attr('class', function(d){ return 'browser ' + d.key; })
        .attr('fill-opacity', 0.5);

    browser.append('path')
        .attr('class', 'area')
        .attr('d', area)
        .style('fill', function(d) {

            //console.log(d.key," ",color(d.key));
            return color(d.key); });


    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);



    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis);

    svg.append ("text")
        .attr("x", 0-margin.left)
        .attr("transform", "rotate(-90)")
        .attr("y", -35)
        .attr("x", -130)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("Total Sales")

    svg.append ("text")
        .attr("x", 0-margin.left)
        .attr("y", 380)
        .attr("x", 200)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("Years")
});