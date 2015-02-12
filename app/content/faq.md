### FAQs

<ul class="list-unstyled page-header">
  <li><a ng-click="scrollTo('faq-1')">How do I edit the colors for a Chart?</a></li>
  <li><a ng-click="scrollTo('faq-2')">How can I build a chart by pasting data?</a></li>
  <li><a ng-click="scrollTo('faq-3')">What's the difference between a datatype and a formatter?</a></li>
</ul>

<div id="faq-1" class="page-header"></div>

#### Editing Colors

There are two ways to manage the colors in your chart. The first is by using the **Color / Style** tab in **Chart Customizations**. You can use the spectrum color picker to choose a color, or you can paste hex values into the text box. The colors in the palette can be reordered by dragging and dropping the color boxes, or by using the reverse palette button.

The second option is for charts that have series data, like the Line Chart. In the **Live Edit Data Tables** window, there will be a swatch where you can pick a color from the default palette. It will override any values in the **Color / Style** tab.

<div id="faq-2" class="page-header"></div>

#### Pasting Data

You may paste or upload valid CSV or TSV data. Copying and pasting from a spreadsheet usually produces TSV data you can paste into the input box **Add Existing Data -> Paste**. Most charts have data groups with two dimensions, so your pasted data should have the constant in the first column, with each subsequent column containing a new data group. For example, to create two data groups for a Map:

    location,Traffic,Palm Trees
    California,Y,Y
    New York,Y,N
    Texas,N,Y
    Maine,N,N
    Florida,Y,Y

In the case of time series data, the first column values need not match, and null values will be skipped on input and line will be connected according to the interpolation method you choose.

<div id="faq-3" class="page-header"></div>

#### Datatypes & Formatters

When drawing charts from scratch, the most important options that need to be set are **x-Axis Datatype** and **y-Axis Datatype**. The settings ensure that the chart knows how to handle the data you've provided. Often the default will suffice, but for example, the x-Axis on a line chart can be made up of normal incremented numbers, or it can be a time series. Bar Charts have labels, line charts have *x* values, etc. Without the correct datatype, the chart probably won't look right, and you won't be able to use **formatters**.

ormatters can be set from either **Tick Formatter** or **Value Formatter** options, and affect only the display values on the chart. Number values can be transformed into currency or percentages and dates can be formatted to show only the year, month, or another time format.
