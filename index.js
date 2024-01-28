
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
let tooltip = d3.select('#tooltip')

//creates the canvas for the plots
let createCanvas = () => {
    svg.attr('width', width)
    svg.attr('height', height)
}

//start creating function for the data//
//create the function that creates the scales

let createScales = () => {
    xScale = d3.scaleLinear()
                .domain([d3.min(values, (items) => {
                    return items['Year']
                }) - 1,d3.max(values, (items) => {
                    return items['Year']
                })+ 1])
                .range([padding, width-padding])

    yScale = d3.scaleTime ()
                .domain([d3.min(values, (items) => {
                    return new Date(items['Seconds'] * 1000)
                }), d3.max(values, (items) => {
                    return new Date(items['Seconds'] * 1000)
                })])
                .range([padding, height - padding])
}




//create a function that creates the points fort the scatter plot
let createPoints = () => {
    svg.selectAll('circle')
        .data(values)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('r', '5')
        .attr('data-xvalue', (items) => {
            return items['Year']
        })
        .attr('data-yvalue', (items) => {
            return new Date(items['Seconds'] * 1000)
        })
        .attr('cx', (items) => {
            return xScale(items['Year'])
        })
        .attr('cy', (items) => {
            return yScale(new Date(items['Seconds'] * 1000))
        })
        .attr('fill', (items) => {
        if (items['Doping'] != ''){
            return 'red'
        }else {
            return 'brown'
        }
        })
        .on('mouseover', (items) => {
            tooltip.transition()
                    .style('visibility', 'visible')

            if (items['Doping'] != ''){
                tooltip.text(items['Year'] + " | " + items['Name'] + " | " + items['Time'] + " | " + items['Doping'])
            }else {
                 tooltip.text(items['Year'] + " | " + items['Name'] + " | " + items['Time'] + " | " + "No Doping")

            }
            tooltip.attr('data-year', items['Year'])
        }) 
        .on('mouseout', (items) => {
            tooltip.transition()
                    .style('visibility', 'hidden')
        })
        

}

//functiuon that creates the axis

let createAxis = () => {
    let xAxis = d3.axisBottom(xScale)
                    .tickFormat(d3.format('d'))
    let yAxis = d3.axisLeft(yScale)
                    .tickFormat(d3.timeFormat('%M:%S'))


    svg.append('g')
        .call(xAxis)
        .attr('id', 'x-axis')
        .attr('transform', 'translate(0,'+ (height - padding) + ')')

    svg.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', 'translate(' + padding + ', 0 )')
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