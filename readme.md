# idris-ensure-clockwise

For when your geojson polygons cover the whole projection with a hole in the shape of your polygon. Happened to me using OSM data with D3.

JS implementation of [Shoelace formula](https://en.wikipedia.org/wiki/Shoelace_formula) taken from **kodkod**s answer to this [question](http://stackoverflow.com/questions/14505565/detect-if-a-set-of-points-in-an-array-that-are-the-vertices-of-a-complex-polygon#14506549)

No dependencies

## Install 

```
$ npm install idris-ensure-clockwise
```

## Usage

Takes a GeoJSON collection, fixes the Polygons and MultiPolygons that are not clockwise and returns a new collection

```
var ensureClockwise = require('idris-ensure-clockwise')

ensureClockwise(GeoJSON_collection, function(fixed_GeoJSON_collection) {

})
```
