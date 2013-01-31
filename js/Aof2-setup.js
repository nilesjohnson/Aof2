/*
  Setup of the interface
  
  Version 0.3
*/


// global options for basis type and operation type
var basisType; // default set at bottom of this file

//var showSqOne = false; 
//var showSqTwo = false;
//var showSqFour = false;
var operationType = {'sq1': false, // toggled at bottom of this file
		     'sq2': false,
		     'sq4': false};
// operationData defined on Aof2-sqi-data.js
/*
var operationData = {'sq1': {},  // fake data generated at end of file
		     'sq2': {},
		     'sq4': {}};
*/





// styling attributes


var operationAttrGeneric = {'stroke-width': 3,
			    'fill': 'white',
			    'stroke': '#000'};
var operationAttr = {'sq1': {'stroke-width': 3,
			     'fill': 'white'},
		     'sq2': {'stroke-width': 3,
			     'fill': 'white'},
		     'sq4': {'stroke-width': 3,
			     'fill': 'white'}};
var operationColor = {'sq1': '#2fbfbf',
		       'sq2': '#77bf2f',
		       'sq4': '#772fbf'};
for (type in operationAttr) {
   operationAttr[type]['fill'] = operationColor[type];
   operationAttr[type]['stroke'] = operationColor[type];
}

var dotAttr = {
    'stroke-width': '1',
    'stroke-opacity': '1',
    'opacity': '1',
    'fill': '#cccccc',
    'stroke': '#992244'
};
var dotAttrZero = {
    'opacity': 1
}
var dotOn  = {'stroke-width': '3', 'fill': '#924' };

var dotWidth = 4;

var gridLineAttr = {
    'stroke-width': '1',
    'stroke': '#dee'
}
var gridLabelAttr = {
    'stroke': '#777',
    'font-size': '10',
    'stroke-width': '.5'
}

var pathBottomAttr = {
    'stroke': '#fff',
    'stroke-width': '4'
};
var pathTopAttr = {
    'stroke': '#000',
    'stroke-width': '1'
};

var infoAttr = {
    'opacity': '0',
    'font-size':'12'
};

var menuItemAttr = {
    'fill': '#9cf',
    'stroke-width': '0',
};

var menuAttr = {
    'fill': '#9cf', 
    'stroke': '#9cf',
    'stroke-width': '8',
    'stroke-linejoin': 'round',
    'opacity': '.8'
};





// Setup canvas

// offset of canvas from document body (0,0)
var canvasOffsetX = document.getElementById('canvas_container').offsetLeft;
var canvasOffsetY = document.getElementById('canvas_container').offsetTop;

var canvasWidth = 900;
var canvasHeight = 550;

// start position of A(2) on canvas
var aOfTwoStartX = 100;
var aOfTwoStartY = 60;

// paper
var paper = new Raphael(document.getElementById('canvas_container'), canvasWidth, canvasHeight);
document.getElementById('canvas_container').style.width = canvasWidth+'px';
document.getElementById('canvas_container').style.height = canvasHeight+'px';




var dot = {};
//currentDotId = false;
var menu = false;
//var info = [];
//var menuList = [];

var gridSize = 5*dotWidth;
var gridLabelWidth = 30;

//dots to show zero
for (n = 1; n < 4; n++) {
    var x = n*2*dotWidth + n+ gridLabelWidth;
    var y = aOfTwoStartY;
    var d = paper.circle(x,y,dotWidth);
    if (n == 3) {
	// hack to get n = 1, 2, 4
	n++;
    }
    var dotId = 'z-'+n;
    d.attr(dotAttr); // fix here
    d.data('id',dotId);
    d.data('selected',0);
    d.data('position',[x,y]);
    //d.click(clickHandler);
    //d.node.style.cursor = 'pointer';
    dot[dotId] = d;
}

var aOfOne = function(x,y,i) {
    // draw dots
    var gridSteps = [[0,0],
		     [0,1],
		     [0,1],
		     [-1,1],
		     [2,0],
		     [-1,1],
		     [0,1],
		     [0,1]];
    for (var j=0; j < 8; j++) {
	var dotId = i+'-'+j;
	var xStep = gridSteps[j][0]*gridSize;
	var yStep = gridSteps[j][1]*gridSize;
	x = x + xStep;
	y = y + yStep;
	var d = paper.circle(x,y,dotWidth);
	d.attr(dotAttr);
	d.data('id',dotId);
	d.data('selected',0);
	d.data('position',[x,y]);
	d.click(clickHandler);
	d.node.style.cursor = 'pointer';
	dot[dotId] = d;
    }
    // now draw straight lines connecting dots
    // numbers here indicate starting and ending dots
    var straightPaths = [[0,1],
			 [2,3],
			 [4,5],
			 [6,7]];
    for (var k=0; k < 4; k++) {
	var x0 = dot[i+'-'+straightPaths[k][0]].data('position')[0];
	var y0 = dot[i+'-'+straightPaths[k][0]].data('position')[1];
	var x1 = dot[i+'-'+straightPaths[k][1]].data('position')[0];
	var y1 = dot[i+'-'+straightPaths[k][1]].data('position')[1];
	var path = paper.path([["M", x0, y0],["L", x1,y1]]).toBack();
	path.attr(pathTopAttr);
    }
    // now draw curved lines 
    // numbers here indicate starting and ending dots, 
    // and direction of curve
    var curvedPaths = [[0,2,-1],
		       [1,4,1],
		       [2,5,1],
		       [3,6,-1],
		       [5,7,1]];
    for (var k=0; k < 5; k++) {
	var x0 = dot[i+'-'+curvedPaths[k][0]].data('position')[0];
	var y0 = dot[i+'-'+curvedPaths[k][0]].data('position')[1];
	var x1 = dot[i+'-'+curvedPaths[k][1]].data('position')[0];
	var y1 = dot[i+'-'+curvedPaths[k][1]].data('position')[1];
	var pm = curvedPaths[k][2];
	// control point
	var xc = (x1 + x0)/2 + pm*.5*(y1 - y0);
	var yc = (y1 + y0)/2 + pm*.1*(x1 - x0);
	var path = paper.path([["M", x0, y0],["Q", xc,yc, x1,y1]]).toBack();
	path.attr(pathTopAttr);	
    }
};

// draw A(2) as copies of A(1)
aOfOneOffset = [[0,0], // made aspect ratio 2 to 1, so vertical position equals
		[8,4], // degree, while lines defining the same operation remain 
		[12,6], // parallel
		[14,7],
		[20,10],
		[22,11],
		[26,13],
		[34,17]];

    
for (var i=0; i < aOfOneOffset.length; i++) {
    x = aOfOneOffset[i][0];
    y = aOfOneOffset[i][1];
    aOfOne(aOfTwoStartX+x*gridSize, aOfTwoStartY + y*gridSize,x);
};

// connect copies of A(1)
// list pairs of indices of top nodes
var connectAOfOne = {'square': [[0,8],
				[12,20],
				[14,22],  // change order to set top path
				[26,34]],
		     'curved': [[8,12],
				[22,26]],
		     'straight': [[12,14],
				  [20,22]]};
var squareLine = function(id0,id1,squareStepFactor) {
    /*
      Draw square line; step factor needs to be passed as an argument
      or it will be constant for all calls to the function (using the
      last-set value) -- I don't know why this is! [Niles]
     */
    var squareStep = squareStepFactor*gridSize;
    var x0 = dot[id0].data('position')[0];
    var y0 = dot[id0].data('position')[1];
    var x1 = dot[id1].data('position')[0];
    var y1 = dot[id1].data('position')[1];
    instructions = [["M", x0, y0],
		    ["l", squareStep, -squareStep],
		    ["L", x1+squareStep, y1-squareStep],
		    ["L", x1, y1]]
    var path1 = paper.path(instructions).attr(pathTopAttr).toBack();
    var path0 = paper.path(instructions).attr(pathBottomAttr).toBack();
}
var curvedLine = function(id0,id1) {
    var x0 = dot[id0].data('position')[0];
    var y0 = dot[id0].data('position')[1];
    var x1 = dot[id1].data('position')[0];
    var y1 = dot[id1].data('position')[1];
    // control point
    var xc = (x1 + x0)/2 + .5*(y1 - y0);
    var yc = (y1 + y0)/2 - .5*(x1 - x0);
    var path = paper.path([["M", x0, y0],["Q", xc,yc, x1,y1]]).toBack();
    path.attr(pathTopAttr);	
}
var straightLine = function(id0,id1) {
    var x0 = dot[id0].data('position')[0];
    var y0 = dot[id0].data('position')[1];
    var x1 = dot[id1].data('position')[0];
    var y1 = dot[id1].data('position')[1];
    instructions = [["M", x0, y0],
		    ["L", x1, y1]]
    var path = paper.path(instructions).attr(pathTopAttr).toBack();
}
connectionLines = {'square': squareLine,
		   'curved': curvedLine,
		   'straight': straightLine};
for (lineType in connectAOfOne) {
    // draw the lines, using function determined by line type
    idList = connectAOfOne[lineType];
    drawPath = connectionLines[lineType];
    for (var i = 0; i < idList.length; i++) {
	// determine square step size; the third argument for other
	// line types is ignored
	if (idList[i][0] == 12) {
	    var squareStepFactor = 1.1;
	}
	else {
	    var squareStepFactor = .9;
	}
	drawPath(idList[i][0]+'-0',idList[i][1]+'-0',squareStepFactor);
    }
}

// some fake Sq^n data
// keys are dot id's, and values are lists of dot id's 
// which sum to Sq^n of given dot
//var sqOneData = {};
/*
for (var i = 0; i < aOfOneOffset.length; i++) {
    ix = aOfOneOffset[i][0];
    for (var j = 0; j < 8; j++) {
	operationData['sq1'][ix+'-'+j] = [ix+'-'+((j+2) % 8),
					 ix+'-'+((j+3) % 8),
					 ix+'-'+((j+4) % 8)];
    }
}

//var sqTwoData = {};
for (var i = 0; i < aOfOneOffset.length; i++) {
    ix = aOfOneOffset[i][0];
    for (var j = 0; j < 8; j++) {
	iz = aOfOneOffset[(i+1) % aOfOneOffset.length][0]
	operationData['sq2'][ix+'-'+j] = [iz+'-'+((j+2) % 8),
					 iz+'-'+((j+3) % 8),
					 iz+'-'+((j+4) % 8),
					 iz+'-'+((j+7) % 8)];
    }
}

//var sqFourData = {};
for (var i = 0; i < aOfOneOffset.length; i++) {
    ix = aOfOneOffset[i][0];
    for (var j = 0; j < 8; j++) {
	iz = aOfOneOffset[(i+3) % aOfOneOffset.length][0]
	operationData['sq4'][ix+'-'+j] = [iz+'-'+((j+2) % 8),
					 iz+'-'+((j+4) % 8)];
    }
}
*/

// Draw background grid
var paperGrid = paper.set();
for (var i = 0; i+4 < canvasHeight/gridSize; i++) {
    var gridPath = paper.path('M ' +
			      gridLabelWidth + ' ' +
			      (i*gridSize+aOfTwoStartY) + ' ' +
			      'l ' + canvasWidth + ' 0');
    gridPath.attr(gridLineAttr);
    paperGrid.push(gridPath);
    var gridLabel = paper.text(gridLabelWidth/2,
			       i*gridSize+aOfTwoStartY,
			       (1*i).toString());
    gridLabel.attr(gridLabelAttr).toFront();
    paperGrid.push(gridLabel);
}
paperGrid.toBack();


setBasisType('adem');
toggleOperation('sq1');

document.body.addEventListener('click',clearMenu,true);