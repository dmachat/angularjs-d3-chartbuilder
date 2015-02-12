### Tutorials

### **Scatter Plot With Trend Lines**

Creating a scatter plot is pretty straightforward, but adding trend lines can be a little tricky. Lets tackle that with Simplechart.

We'll start by importing our data. Select **Scatter Plus Line Chart** as your chart type, then upload a tsv file containing data for [the density of MRI units in the US vs other countries from 1995-2010](demos/tutorial2.tsv) by clicking **Add Existing Data -> Upload**. The tsv file has some basic time series data that Simplechart will convert into groups for editing.

Scatter charts allow you to change the size and shape for the data point markers from the live edit table view. After that we can make a few more tweaks if we like. I've added text and scaled the y-axis to show 0-40.

Now comes the tricky part. The charting library doesn't do the calculations for the trend line automatically, so we'll have to do it ourselves, and input in the two special data group fields: **slope** and **intercept**. Slope can be calculated by via a simple equation:

> *y1 - y2 / x1 - x2* (You can use different points if you want to adjust the trend line.)

Intercept is the point on the Y-axis where the line intersects at x = 0. So for this data it's actually a little odd since we're using the numerical point values of the year. Finding the intercept:

> *[slope] x [-xmin]* or *1.3052941176470592 x -1995*

for the second line in our data. This calculation is imperfect, so we can nudge the intercept manually until we get the line in the right place. I settled on *-2593*. Be aware that if you change the Datatype of your axis, the calculation may change eg choosing **Date** for the X-axis would necessitate using the timestamp value in that calculation instead.

## \{\{ tutorial2.meta.title \}\}

#### \{\{ tutorial2.meta.subtitle \}\}

<nvd3 options="tutorial2.options" data="tutorial2.data" colors="tutorial2.colors" events="$root.events" config="\{ extended: true \}"></nvd3>

\{\{ tutorial2.meta.caption \}\}

<h6 ng-if="tutorial2.meta.attribution">{{ tutorial2.meta.attribution }}</h6>

### **Line Chart with Two Highlight Lines**

This one is a little different, since we only want to highlight two lines, but still show the rest. This is the chart we want to match:

<img class="img-thumbnail" src="../images/tutorial1-requirement.png" />

There are some things we can't do with Simplechart, yet, like adding the persistent labels to a line, or adding a generic label. The chart we build is going to be a little different, and will supplement the plot lines with an interactive tooltip.

First, let's import data. In [the csv file](demos/tutorial1.csv) for this example we have years and percentages for several countries. The first column is a standard four digit year, the second is a formatted percentage. Upload the csv data to Simplechart by clicking **Add Existing Data -> Upload**. Now we have values populated in our data groups, and some plotted lines. To get these to plot properly for our line graph, we'll need to set the datatypes and formatters for our axis. For the first column, we set **x-Axis Datatype** to *Date*. This attempts to parse dates from the values in the first column, and handles most common date formats, like this four digit year as well as 2005-12-14, etc. Now the graph knows we are making a time series, and will plot accordingly. We can also use the available time formatters to make our axis label look like it should. **xAxis -> Tick Formatter** has a few available options. We'll pick *Year (YYYY)*. As for the y-Axis, since our percent values are already formatted, we can use the default **y-Axis Datatype** of *Y,* and set the **y-Axis Tick Formatter** to *Percent (unmultiplied).* Other percent formatters take raw decimal data and multiply it to get percentages, but we don't need to do that here.

Next we want to adjust our scale, so that the y-Axis goes from 0 to 18%. Use the **y-Axis Endpoints** option to set *0 *(the start) and *1 *(the end) to 0 and 18.

To smooth the lines, set **Interpolate** to *bundle*.

Since we're using custom colors in this chart, click **Enable Live Edit**, and go through each data series to associate highlight colors with United States and Comparable Country Average, and a grey for the other comparison countries. Enable **useInteractiveGuideline** for a nice tooltip that tracks the mouse on the x-Axis and summarizes the value group.

It's not exact, but we have replicated the data plot for this graph, and have a nice interactive tooltip for line values instead of the static line labels. This graph is also responsive and can be styled to match your site's theme.

## \{\{ tutorial1.meta.title \}\}

#### \{\{ tutorial1.meta.subtitle \}\}

<nvd3 options="tutorial1.options" data="tutorial1.data" colors="tutorial1.colors" events="$root.events" config="\{ extended: true \}"></nvd3>

\{\{ tutorial1.meta.caption \}\}

<h6 ng-if="tutorial1.meta.attribution">{{ tutorial1.meta.attribution }}</h6>
