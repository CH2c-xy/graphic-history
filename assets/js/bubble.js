(function () {

/* preperation   */
  var width = 900,
      height = 400;


  //creat the svg
  //set up the area of svg
  var svg = d3.select('#chart')
    .append("svg")
    .attr('width', width)
    .attr('height', height)
    .append("g")
    .attr("transform", "translate(0,0)")
  


  //Definitions
  //a reusable component, so the images can be applied to fill the circles
  var defs = svg.append("defs");


  //scale
  //sizing circles by area, square root scale
  var radiusScale = d3.scaleSqrt().domain([1, 300]).range([1, 80])//input and output


  var forceXCombine = d3.forceX(width / 2).strength(0.05)


  var forceXSeperate = d3.forceX(function (d) {
    if (d.decade === '1900-1970') {
      return 200
    } else {
      return 700
    }
  }).strength(0.03)

  //to get rid og overlap
  //match with the radius of circle  
  var forceCollide = d3.forceCollide(function (d) {
    return radiusScale(d.scale) + 2
    //then the circles getting bigger, collision foce will also getting bigger
  })



   /* interaction */
  //evert seconds goes by its going to update the position of nodes 
  var simulation = d3.forceSimulation()
    .force("x", forceXCombine)// force is like a gravity, pulling everything 
    .force("y", d3.forceY(height / 2).strength(0.03))//one from x axis and one from y axis
    .force("collide", forceCollide)//to make things not collide


  //add csv file
  d3.queue()
    .defer(d3.csv, "history08.csv")
    .await(ready)


 /* tooltips */
 // Initialize tooltip 
  tip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function (d) {
      return d.movement + "<br>" + d.time
    });
  //Invoke the tip in the context of visualization
  svg.call(tip);



  function ready(error, datapoints) {


/* circle and pattern */
//make a circle for every datapoint
    var circles = svg.selectAll(".name")
      .data(datapoints)
      .enter().append("circle")
      .attr("class", "name")
      .attr("r", function (d) {
        return radiusScale(d.scale)//the radius of the circle should base on csv
      })
      .attr("fill", function (d) {
        return "url(#" + d.name + ")"
      })
    
      //tooltips with hovering
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)



    //create pattern and the class of pattern to insert info
    defs.selectAll(".name-pattern")
      .data(datapoints)
      .enter().append("pattern")
      .attr("class", "name-pattern")

      .attr("id", function (d) {
        return d.name
      })
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("patternContentUnits", "objectBoundingBox")
      .append("image")
      .attr("height", 1)
      .attr("width", 1)
      .attr("preserveAspectRatio", "none")
      .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
      .attr("xlink:href", function (d) {
        return d.image_path
      })



    //button
    d3.select("#split").on('click', function () {
      simulation
        .force("x", forceXSeperate)//.d3 make a line
        .alphaTarget(0.3)//give energy
        .restart()// tell the simulation to restart
    })

    d3.select("#normal").on('click', function () {
      simulation
        .force("x", forceXCombine)//rewrite the X, replacing by forceXcombine
        .alphaTarget(0.3)//give energy, a little bit nudge
        .restart()// tell the simulation to restart
    })


    //simulation nodes 
    simulation.nodes(datapoints)
      .on('tick', ticked)

    // every single time tick happens, the simulation will look at the circles
    //and update with their position
    function ticked() {
      circles
        .attr("cx", function (d) {
          return d.x
        })
        .attr("cy", function (d) {

          return d.y
        })
    }
  }


})()


