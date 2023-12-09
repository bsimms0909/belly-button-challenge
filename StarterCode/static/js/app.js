const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function init(){
    d3.json(url).then(function(data) {
        console.log(data);
        const names = data.names
        const sample_id = names[0]
        buildcharts(sample_id)
        buildmetadata(sample_id)
      });
  }
  init()
  function buildcharts(sample_id){
    d3.json(url).then(function(data) {
        const sample = data.samples.filter(element => element.id==sample_id)[0]
        console.log(sample)
      });  
  }
  function buildmetadata(sample_id){
    d3.json(url).then(function(data) {
        const metadata = data.metadata.filter(element => element.id==sample_id)[0]
        console.log(metadata)
      });  
  } 