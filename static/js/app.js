// 1) Use the D3 library to read in samples.json from the URL 
//https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.


let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(url).then((data) => {
  console.log( data);
});

//2.)  Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
//dropdown menu

function init(){
  let selector = d3.select("#selDataset");
  d3.json(url).then(data => {
      let sampleNames = data.names;
      for (let i = 0; i < sampleNames.length; i++){
          selector
            .append("option")
            .text(sampleNames[i])
            .property("value", sampleNames[i]);
        };
      let firstSample = sampleNames[0];
        buildCharts(firstSample);
  });
}

function buildCharts(sample){
  // Bar Graph:
  d3.json(url).then(data => {
      let samples = data.samples;
      let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      let result = resultArray[0];

      // declare values and extract for graph:
      let sample_values = result.sample_values;
      let otu_ids = result.otu_ids;
      let title = 'Top 10 OTUs'
      let otu_labels = result.otu_labels
    
      // trace/graph stucture:
      let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
      
      let barData = [
          {
              y: yticks,
              x: sample_values.slice(0, 10).reverse(),
              text: otu_labels.slice(0, 10).reverse(),
              type: "bar",
              orientation: "h",
          }
      ];
      
      let bar = [barData];

      let layout = {
          title: title, width:500
      };
      
      // Plot
      Plotly.newPlot('bar', barData, layout)
  });

  // Bubble Graph:
  d3.json(url).then(data => {
    let samples = data.samples;
    let resultArray = samples.filter(sampleObj => sampleObj.id === sample);
    let result = resultArray[0];

    // declare values and extract for graph:        
    let otuIds = result.otu_ids;
    let sampleValues = result.sample_values;
    let otuLabels = result.otu_labels;
    let title = 'OTU Bubble';

    // trace/structure for Bubble Graph:
    let trace = {
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: 'markers',
        marker: {
            size: sampleValues,
            color: otuIds,
            colorscale: 'Earth'
        }
    };

    // Bubble Layout:
    let  bubble_layout=  {
        title: title, width : 1200,
        xaxis: {title: 'OTU ID'},
        yaxis: {title: 'Sample Values'},
    };

    let bubbGraph = [trace];
    
    // Plot:
    Plotly.newPlot('bubble', bubbGraph, bubble_layout);
});
}  

// Create ability for the dropdown box to change values without error:
function optionChanged(newSample) {
  buildCharts(newSample);
};

init();
