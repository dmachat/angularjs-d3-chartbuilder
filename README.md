# angularjs-d3-chartbuilder

## Installation

1. clone this repository
1. `cd $path/angularjs-d3-chartbuilder`
1. `npm install`
1. `bower install`

Then run `grunt serve` which will autoload the app in your default browser.

## Building vizualization modules

stub

## Embedding

### In WordPress

A plugin for WordPress can be found at http://github.com/alleyinteractive/wordpress-chartbuilder. Follow the instructions to install. You can create new charts and embed them in posts from your WordPress admin.

### With the embed script

If you'd just like to embed a single chart, you can use the included inline embed script by pasting this into your html after replacing the two data attributes with the text you saved from chartbuilder.

<script async
  data-chart='[CHART-JSON-STRING]'
  data-template='[TEMPLATE-STRING]'
  src='http://dmachat.github.io/angularjs-d3-chartbuilder/chartbuilder-widget/loader/dist/chartbuilder.load.v1.default.js?base_url=http://dmachat.github.io/angularjs-d3-chartbuilder/bower_components/chartbuilder-widget/dist/release'
  >
</script>

