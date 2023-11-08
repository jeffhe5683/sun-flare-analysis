# SOLAR FLARE DATA 2018-2023
​
Project Team:  
Hermia  
Jeff  
Eva  
​
<img src="https://www.slashgear.com/img/gallery/heres-how-solar-storms-can-impact-the-earth/l-intro-1663205183.jpg" jsaction="VQAsE" class="sFlh5c pT0Scc iPVvYb" style="max-width: 1600px; height: 226px; margin: 0px; width: 402px;" alt="Here's How Solar Storms Can Impact The Earth" jsname="kn3ccd" aria-hidden="false">
​
## Background
​
### Solar Cycle
This is the cycle that the Sun’s magnetic field goes through approximately every 11 years.
The Sun's magnetic field completely flips, with the flip occurring when the solar cycle is near its maximum. This means that the Sun's north and south poles switch places. Then it takes about another 11 years for the Sun’s north and south poles to flip back again.
​
The most recent solar cycle commenced in 2019 and peak sunspot and solar flare activity is due in 2024.
Activity then slowly reduces and a solar minimum is predicted in about 2030.
​
### Solar Flares
Solar Flares appear near sunspots.   
Sunspots are areas that appear dark on the surface of the Sun. They appear dark because they are cooler than other parts of the Sun’s surface. The temperature of a sunspot is still very hot, around 3593 degrees Celsius!  
Sunspots are relatively cool because they form at areas where magnetic fields are particularly strong. These magnetic fields are so strong that they keep some of the heat within the Sun from reaching the surface.   
​<br> 
The magnetic field lines near sunspots often tangle, cross, and reorganize. This can cause a sudden explosion of energy called a solar flare. Solar flares release a lot of radiation into space.
This activity can have effects on Earth. For example, eruptions can cause lights in the sky, called aurora, or impact radio communications. Extreme eruptions can even affect electricity grids on Earth.  
​
Solar flares are classified according to their X-ray brightness, in the wavelength range 1 to 8 Angstroms.  
Flare classes have names: A, B, C, M and X, with A being the tiniest and X being the largest. Each category has nine subdivisions ranging from A1 to A9, M1 to M9 etc.
​
Forecasting of the solar cycle can help scientists protect our radio communications on Earth, and help keep NASA satellites and astronauts safe.  
<br>  
​
## Data Collection
To effectively showcase the latest solar cycle data from the NASA website, we made a deliberate choice to present Solar Flare data spanning from the start of the most recent solar cycle up to October 2023.   
This data was subsequently archived in a MongoDB database and we extracted the pertinent data fields for our visual representation.  
The data visualisation aspect is powered by a Python Flask API.
​
Our primary objective was to analyse the increase in solar activity, specifically focusing on solar flares, and to establish a correlation with Earth's activities. To achieve this, our visual representation includes the following components:
​
1. The initial line graph illustrates the yearly Solar Flare activity.
2. A bar chart provides a comprehensive overview of combined activity across the years for each month.
3. We mapped the locations of each solar flare on the sun's surface to determine if there was a discernible distribution pattern. Hover the mouse over each marker to show the Latitude, Longitude and Peak time of each Solar Flare.
4. A pie chart shows the X level solar flare distribution by year.
5. A pie chart shows the solar flare distribution by Flare Class for each year.
6. A table representing all X level solar flare events with a link showing more detailed information.
​
​
​
