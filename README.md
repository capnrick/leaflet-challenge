# leaflet-challenge - Visualizing Data with Leaflet
My solution for Northwestern University Data Science and Visualization Bootcamp Assignment 17 Leaflet Challenge 

# Background
![USGS Logo](/Leaflet-Step-1/Images/1-Logo.png)

Welcome to the United States Geological Survey, or USGS for short! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!

The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.

# Level 1: Basic Visualization

1. Data set
![USGS site screenshot](/Leaflet-Step-1/Images/3-Data.png)

The USGS provides earthquake data in a number of different formats, updated every 5 minutes. The [USGS GeoJSON Feed page](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) was used to find a data set to visualize. In this case,an API endpoint was stored inside `queryUrl`. For this challange the dat set chosen is [Earthquakes in the Past 30 days M4.5+ Earthquakes](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson) and is updated every minute.


