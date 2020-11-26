const canvas = d3.select("#canvas");

const width = 700;
const height = 500;
const margin = { top:10, left:70, bottom: 50, right: 10};
const iwidth = width - margin.left - margin.right;
const iheight = height - margin.top -margin.bottom;

const svg = canvas.append("svg");
svg.attr("width", width);
svg.attr("height", height);
const url = "https://gist.githubusercontent.com/josejbocanegra/000e838b77c6ec8e5d5792229c1cdbd0/raw/83cd9161e28e308ef8c5363e217bad2b6166f21a/countries.json";
let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);




d3.json(url).then(  data => {
    let max= 0;
    let max2= 0;
    let max3 = 0;
    for ( let a in data)
    {
        max = Math.max( max, data[a].purchasingpower);
        max2 = Math.max( max2, data[a].lifeexpectancy);
        max3 = Math.max( max3, data[a].population);
    }
    const y = d3.scaleLinear()
    .domain([0, max2+20])
    .range([iheight,0 ]); 

    const z = d3.scaleLinear()
    .domain([0, max3+60])
    .range([0,  60]); 

    const x = d3.scaleLinear() 
    .domain([0, max+5000])
    .range([ 0, iwidth]);
    const circles = g.selectAll("rect").data(data);

    circles.enter().append("circle")
    .style("fill", "steelblue")
    .attr("cx", d => x(d.purchasingpower))
    .attr("cy", d => y(d.lifeexpectancy))
    .attr("r", d => z(d.population));
    
    g.append("g")
    .classed("x--axis", true)
    .call(d3.axisBottom(x))
    .attr("transform", `translate(0, ${iheight})`);  

    g.append("g")
    .classed("y--axis", true)
    .call(d3.axisLeft(y));

})



