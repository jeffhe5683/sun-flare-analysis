// set up API endpoint
let url = "http://localhost:5000/api/solarflare";

// Declare selectedYear in a broader scope
let selectedYear;
let data;
// get the data with D3
d3.json(url).then(function (loadeddata) {
    console.log(loadeddata);
    data = loadeddata;
    // Call initialization functions with the obtained data
    initializeXLevelGraph(data);
    initializeXLevelPieChart(data);
    initializePieChart(data, selectedYear);
    document.getElementById('yearDropdown').addEventListener('change', updateVisualizations);
    updateVisualizations();
  });
  function initializeXLevelGraph(data) {
    // Select the container div
    let graphContainer = d3.select("#x-level-graph");

    // Extract X level data from the API response
    let xLevelData = data.filter(entry => entry.classType.startsWith('X'))
                        .sort((a, b) => parseFloat(b.classType.slice(1)) - parseFloat(a.classType.slice(1))); // Sort in descending order

    // Create an HTML table
    let table = graphContainer.append("table")
        .attr("class", "x-level-table");

    // Add a caption (title) for the table
    table.append("caption");

    // Create table headers
    let headers = ["Flare ID", "Begin Time", "Class Type", "Link"];
    table.append("thead")
        .append("tr")
        .selectAll("th")
        .data(headers)
        .enter()
        .append("th")
        .text(d => d);

    // Create table rows
    let rows = table.append("tbody")
        .selectAll("tr")
        .data(xLevelData)
        .enter()
        .append("tr");

    // Create cells in each row
    let cells = rows
        .selectAll("td")
        .data(d => [
            d.flrID,
            d.beginTime,
            d.classType,
            `<a href="${d.link}" class="ultra-link" target="_blank">Link</a>`
        ])
        .enter()
        .append("td")
        .html(d => (d === null || d === undefined) ? "N/A" : d);

    // Add styling to links
    graphContainer.selectAll(".ultra-link").style("color", "green").style("text-decoration", "underline");

    // Add some additional styling to the table
    table.style("border-collapse", "collapse")
        .style("width", "100%")
        .style("border", "1px solid #ddd")
        .selectAll("th, td")
        .style("padding", "8px") 
        .style("text-align", "left")
        .style("border-bottom", "1px solid #ddd");

    // Style the header row
    table.select("thead")
        .selectAll("th")
        .style("background-color", "#f2f2f2");
};
// Function to initialize the pie chart for the amount of each year’s X level solar flare (Hermia)
function initializeXLevelPieChart(data) {

  //extract X level data
  let xLevelData = data.filter(entry => entry.classType.startsWith('X'));
  //group by year and count amount
  let countByYear = d3.rollup(
    xLevelData,
    v => v.length,
    d => new Date(d.beginTime).getFullYear()
  );
  //convert the map to an array
  let counts = Array.from(countByYear, ([year,count]) => ({year, count}));
  counts.sort((a,b) => a.year - b.year);
  //prepare data for the pie chart
  let pieData = counts.map(entry => entry.count);
  let pieLabels = counts.map(entry => entry.year);
  //creat the x level pie chart
  let xlevelPie = {
    values: pieData,
    labels: pieLabels,
    type: "pie",
    textinfo: "label+percent",
    insidetextorientation: "radial"
  };
  let layout = {
    title: "X Level Solar Flare Distribution by Year",
  };

  Plotly.newPlot("x-level-pie", [xlevelPie], layout);
};

// Function to update visualizations based on the selected year from the dropdown (Jeff, Eva, Hermia)
function updateVisualizations() {
    // Call functions for impacted visualizations (bar chart, map, pie chart)
    selectedYear = parseInt(document.getElementById('yearDropdown').value);
    initializePieChart(data,selectedYear);  
};

// Function to initialize the pie chart for solar flare class (Hermia)
function initializePieChart(data,selectedYear) {
    // Filter data for the year 2023
    let filteredData = data.filter(entry => new Date(entry.beginTime).getFullYear() === selectedYear);
  
    // Count the occurrences of the first letter in classType
    let countByClass = d3.rollup(
      filteredData,
      v => v.length,
      d => d.classType.slice(0, 1)
    );
  
    // Convert the map to an array
    let counts = Array.from(countByClass, ([classType, count]) => ({ classType, count }));
  
    // Prepare data for the pie chart
    let pieData = counts.map(entry => entry.count);
    let pieLabels = counts.map(entry => entry.classType);
  
    // Create the pie chart
    let pieChart = {
      values: pieData,
      labels: pieLabels,
      type: "pie",
      textinfo: "label+percent",
      insidetextorientation: "radial"
    };
  
    let layout = {
      title: `Solar Flare Distribution by Class in ${selectedYear}`,
    };
  
    // Create the pie chart
    Plotly.newPlot("pie-chart", [pieChart], layout);
  }
  
  // Function to add information display
// Function to add information display as a table
function addInfoDisplay() {
    // Select the info display container
    let infoDisplay = d3.select("#info-display");

    // Add title
    infoDisplay.append("h3")
        .text("Class Type Information")
        .style("color", "darkaqua");

    // Create a table
    let table = infoDisplay.append("table")
        .attr("class", "table table-bordered");

    // Create table header
    let thead = table.append("thead");
    thead.append("tr")
        .selectAll("th")
        .data(["Class Type", "Description"])
        .enter()
        .append("th")
        .text(d => d)
        .style("text-align", "center")
        .style("color", "darkaqua")
        .style("font-size", "16px");

    // Create table body
    let tbody = table.append("tbody");

    // Information for each class type
    let classInfo = {
        'A': 'Lowest level',
        'B': 'Low level',
        'C': 'Medium level',
        'M': 'High level',
        'X': 'Extreme level'
    };

    // Add information for each class type to the table
    Object.entries(classInfo).forEach(([classType, description]) => {
        let row = tbody.append("tr");
        row.append("td")
            .text(classType)
            .style("text-align", "center")
            .style("font-size", "14px");
        row.append("td")
            .text(description)
            .style("font-size", "14px");
    });
}

// Call the function to add information display
addInfoDisplay();

