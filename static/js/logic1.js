const apiUrl = "http://localhost:5000/api/solarflare";
function shorthandToCoordinates(shorthand) {
  // Define a regular expression pattern to match the shorthand format
  const regexPattern = /^([NS])(\d+)([EW])(\d+)$/;
  // Use the regex pattern to match and extract components of the shorthand
  const matches = shorthand.match(regexPattern);
  // If the shorthand doesn't match the expected format, return null
  if (!matches) {
    return { latitude: null, longitude: null };
  }
  // Extract latitude and longitude values
  const [, latDirection, latValue, lonDirection, lonValue] = matches;
  // Convert latitude and longitude values to numbers
  const latitude = parseFloat(latValue);
  const longitude = parseFloat(lonValue);
  // Apply the direction signs (N/S and E/W) to the values
  const finalLatitude = latDirection === 'S' ? -latitude : latitude;
  const finalLongitude = lonDirection === 'W' ? -longitude : longitude;
  return { latitude: finalLatitude, longitude: finalLongitude };
}
// Define an empty array to hold the filtered solar coordinates
let filteredSolarCoordinates = [];
const width = 825
const height = 840
const boundaryRadius = 400
// Create an SVG element for the plot
const svg = d3.select('#map')
    .append('svg')
    .attr('width', width)
    .attr('height', height);
// Define a scale for mapping solar coordinates to screen coordinates
const xScale = d3.scaleLinear()
    .domain([-140, 140]) // Solar longitude range
    .range([0, width]);
const yScale = d3.scaleLinear()
    .domain([-70, 70]) // Solar latitude range
    .range([height, 0]);

const tooltip = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('position', 'absolute')
    .style('visibility', 'hidden')
    .style('background-color', 'rgba(0, 0, 0, 0.7)')
    .style('color', 'white')
    .style('border-radius', '4px')
    .style('padding', '4px 8px')
    .style('font-size', '12px');


// Add the boundary circle
svg.append('circle')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', boundaryRadius)
    .attr('stroke', 'transparent') // Boundary circle color
    .attr('stroke-width', 2) // Boundary circle width
    .attr('fill', 'transparent'); // Make the boundary circle transparent

// Function to fetch data from the API
function fetchDataAndFilterByYear() {
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Process the data to include a "year" property
            data.forEach((item) => {
                const coordinates = shorthandToCoordinates(item.sourceLocation);
                if (coordinates.latitude !== null && coordinates.longitude !== null) {
                    item.latitude = coordinates.latitude;
                    item.longitude = coordinates.longitude;
                    delete item.sourceLocation;
                    // Add a "year" property based on the event date
                    const eventDate = new Date(item.peakTime);
                    item.year = eventDate.getFullYear();
                }
            });
            // Store the data in the filteredSolarCoordinates array
            filteredSolarCoordinates = data;
            // Create circles for the initial year (e.g., 2018)
            createCirclesForSelectedYear(2018);
           
        })
        .catch((error) => {
            console.error("Error fetching data from the API:", error);
        });
}
// Function to create circles for the selected year
function createCirclesForSelectedYear(selectedYear) {
    // Filter solar coordinates for the selected year
    const yearFilteredCoordinates = filteredSolarCoordinates.filter((data) => data.year === selectedYear);
    // Remove existing markers
    svg.selectAll('circle').remove();

    // Get the dimensions of the img element
    const img = document.querySelector('.map-image');
    const imgWidth = img.width;
    const imgHeight = img.height;

    // Create circles for the filtered solar coordinates, scaling them to fit the img dimensions
    svg.selectAll('circle')
        .data(yearFilteredCoordinates)
        .enter()
        .append('circle')
        .attr('cx', (d) => (xScale(d.longitude) / width) * imgWidth)
        .attr('cy', (d) => (yScale(d.latitude) / height) * imgHeight)
        .attr('r', 5) // Circle radius
        .attr('fill', 'red') // Circle color
        .attr('stroke', 'black') // Black border 
        .attr('stroke-width', 0.5); // Width of border

    // Add Latitude, Longitude and Date information as text labels
    // Scale to fit the img dimensions
    svg.selectAll('text')
        .data(yearFilteredCoordinates)
        .enter()
        .append('text')
        .attr('x', (d) => (xScale(d.longitude) / width) * imgWidth)
        .attr('y', (d) => (yScale(d.latitude) / height) * imgHeight)
        .attr('dy', -10) // Adjust the label position above the circle
     

    // Update the mouseover event handler to display Location and Date in the tooltip
    svg.selectAll('circle')
        .on('mouseover', (event, d) => {
          // Show tooltip on mouseover with Latitude, Longitude and Date information
          tooltip.html(`Latitude: ${d.latitude}, Longitude: ${d.longitude}, Date: ${new Date(d.peakTime)}`)
              .style('visibility', 'visible');
        })
        .on('mousemove', (event) => {
          // Move tooltip with the mouse
          tooltip.style('top', (event.pageY - 10) + 'px')
              .style('left', (event.pageX + 10) + 'px');
        })
        .on('mouseout', () => {
          // Hide tooltip on mouseout
          tooltip.style('visibility', 'hidden');
        });
}

// Event listener for the year dropdown
document.getElementById('yearDropdown').addEventListener('change', function () {
    const selectedYear = parseInt(this.value);
    createCirclesForSelectedYear(selectedYear);
});
// Initial rendering: fetch data and create circles for the initial year (e.g., 2018)
fetchDataAndFilterByYear();