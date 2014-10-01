var width = 2400;
var height = 2400;

var vertices = d3.range(540).map(function(d) {
  return [Math.random() * width, Math.random() * height];
});

var voronoi = d3.geom.voronoi()
    .clipExtent([[0, 0], [width, height]]);

var svg = d3.select("body #svg-wrapper").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "PiYG");

var path = svg.append("g").selectAll("path");

redraw();

function redraw() {
  path = path.data(voronoi(vertices).map(function(d) { return "M" + d.join("L") + "Z"; }), String);
  path.exit().remove();
  path.enter().append("path").attr("class", function(d, i) { return "q" + (i % 9) + "-9"; }).attr("d", String);
  path.order();
}


$(function() {
  $(window).resize(function() {
    $('.svg').attr('width', $(window).width());
    $('.svg').attr('height', $(window).height());
  });
});
