
let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
let req = new XMLHttpRequest();

let values = []

let heightScale
let xScale
let xAxisScale
let yAxisScale
let yScale 

let width = 800;
let height = 600;
let padding = 40;

//selects the SVG with d3
let svg = d3.select('svg')

//creates the canvas for the plots
let createCanvas = () => {
    svg.attr('width', width)
    svg.attr('height', height)
}

//start creating function for the data//
//create the function that creates the scales

let createScales = () => {
    xScale = d3.scaleLinear()
                .range([padding, width-padding])
}




//create a function that creates the points fort the scatter plot
let createPoints = () => {

}

//functiuon that creates the axis

let createAxis = () => {
    let xAxis = d3.axisBottom(xScale)

    svg.append('g')
        .call(xAxis)
        .attr('id', 'x-axis')


}




// call the api for the data

req.open('GET', url, true)
req.onload = () => {
    values = JSON.parse(req.responseText)
    console.log(values)
    createCanvas()
    createScales()
    createPoints()
    createAxis()
}
req.send() 