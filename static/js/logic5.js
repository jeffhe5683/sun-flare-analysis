const Url = "http://localhost:5000/api/solarflare";
// Fetch data from the API
fetch(Url)
  .then((response) => response.json())
  .then((data) => {
    // Process the data and count events by year
    const eventCountsByYear = {};
    data.forEach((event) => {
      const beginTime = new Date(event.beginTime);
      const year = beginTime.getFullYear();
      if (eventCountsByYear[year]) {
        eventCountsByYear[year]++;
      } else {
        eventCountsByYear[year] = 1;
      }
    });
    // Define the trace for the line chart
    const trace = {
      x: Object.keys(eventCountsByYear), // Years
      y: Object.values(eventCountsByYear), // Event counts
      type: 'line',
      marker: {
        color: 'blue', // Line color
      },
    };
    // Create a data array with the trace
    const chartData = [trace];
    // Define the layout options for the chart
    const layout = {
      title: 'Solar Flare Events by Year',
      xaxis: {
        title: 'Year',
      },
      yaxis: {
        title: 'Number of Events',
      },
    };
    // Create the line chart using Plotly
    Plotly.newPlot('line-chart', chartData, layout);
    const eventCountsByMonth = {};
    data.forEach((event) => {
      const beginTime = new Date(event.beginTime);
      const year = beginTime.getFullYear();
      const month = beginTime.getMonth() + 1
      if (eventCountsByMonth[month]) {
        eventCountsByMonth[month]++;
      } else {
        eventCountsByMonth[month] = 1;
      }
    });
    // Define the trace for the bar chart
    const trace_1 = {
      x: Object.keys(eventCountsByMonth), // Years
      y: Object.values(eventCountsByMonth), // Event counts
      type: 'bar',
      marker: {
        color: 'blue', // Line color
      },
    };
    // Create a data array with the trace
    const chartData_1 = [trace_1];
    // Define the layout options for the chart
    const layout_1 = {
      title: 'Solar Flare Events by month',
      xaxis: {
        title: 'month',
      },
      yaxis: {
        title: 'Number of Events',
      },
    };
    // Create the line chart using Plotly
    Plotly.newPlot('bar-chart', chartData_1, layout_1);
})
.catch((error) => console.error('Error fetching data:', error));