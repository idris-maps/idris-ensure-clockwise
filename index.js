module.exports = function(geojson, callback) {
	var feats = geojson.features
	loop(0, feats, [], function(fixedFeats) {
		geojson.features = fixedFeats
		callback(geojson)
	})
}

function loop(i, feats, fixedFeats, callback) {
	if(i === feats.length) { callback(fixedFeats) }
	else {
		var f = feats[i]
		if(f.geometry.type === 'Polygon') {
			if(clockwise(f.geometry.coordinates) === false) {
				f.geometry.coordinates[0].reverse()
			}
			fixedFeats.push(f)
		} else if(f.geometry.type === 'MultiPolygon') {
			var polygons = f.geometry.coordinates
			var coords = []
			for(x=0;x<polygons.length;x++) {
				if(clockwise(polygons[x]) === false) {
					polygons[x][0].reverse()
					coords.push(polygons[x])
				} else {
					coords.push(polygons[x])
				}
			}
			f.geometry.coordinates = coords
			fixedFeats.push(f)
		} else {
			fixedFeats.push(f)
		}
		i = i + 1
		if(i/100 === Math.floor(i/100)) {
			setTimeout(function() {
				loop(i, feats, fixedFeats, callback)
			},1)
		} else {
			loop(i, feats, fixedFeats, callback)
		}
	}
}

function clockwise(coords) {
	var resp = polygonArea(coords[0]) < 0;
	return resp
}

function polygonArea(vertices) { 
/* Slightly modified version of kodkod's answer here:
http://stackoverflow.com/questions/14505565/detect-if-a-set-of-points-in-an-array-that-are-the-vertices-of-a-complex-polygon 
*/
    var area = 0;
    for (var i = 0; i < vertices.length; i++) {
        j = (i + 1) % vertices.length;
        area += vertices[i][0] * vertices[j][1];
        area -= vertices[j][0] * vertices[i][1];
    }
    return area / 2;
}

