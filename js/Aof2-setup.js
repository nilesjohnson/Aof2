/*
Visualization of A(2)
http://www.nilesjohnson.net/Aof2/

A web application using Raphael.js to organize A(2) and show 
it's structure by the coset decomposition A(2)//A(1)

Version 1.0

Copyright 2013 Robert Bruner and Niles Johnson
Licensed under GNU General Public License version 3 or later.
See README.txt

This file sets up the application interface.
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

var dotWidth = 4;

var dotOn  = {'stroke': '#cd2c48', 
	      'stroke-width': '2', 
	      'stroke-opacity': '.4',
	      'fill': '#8d0c28', 
	      r: 1.5*dotWidth};

var operationAttr = {'sq1': {},
		     'sq2': {},
		     'sq4': {}};
var operationColor = {'sq1': '#d87b06',
		       'sq2': '#62ba16',
		       'sq4': '#9f5cda'};
for (type in operationAttr) {
    operationAttr[type]['fill'] = operationColor[type];
    operationAttr[type]['stroke'] = '#222';//operationColor[type];
    operationAttr[type]['stroke-opacity'] = '.7';//operationColor[type];
    operationAttr[type]['stroke-width'] = '1.5';//operationColor[type];
    operationAttr[type]['r'] = 1.4*dotWidth;
}

var dotAttr = {
    'stroke-width': '1',
    'stroke-opacity': '1',
    'opacity': '1',
    'fill': '#cccccc',
    'stroke': '#8d0c28',
    r: dotWidth
};
var zebraDotAttr = {
    'stroke-width':0,
    r: 2.5*dotWidth,
    'fill':'#aaccff'
}
var dotAttrZero = {
    'opacity': '0'
}
var zeroBoxAttr = {
    'stroke-width': '2',
    'stroke-opacity': '.3',
    'stroke': '#d8d400',
    'opacity': '1',
    'fill': '#f6f056'
}

var gridLineEvenAttr = {
    'stroke-width': '1',
    'stroke': '#cde'
}
var gridLineOddAttr = {
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
var zebraPathTopAttr = {
    'stroke': '#7799cc',
    'stroke-width': '3',
    'opacity': .7
};

var infoAttr = {
    'opacity': '0',
    'font-size':'12'
};

var menuItemAttr = {
    'fill': '#9cf',
    'stroke-width': '0'
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
var menu = false;

var gridSize = 5*dotWidth;
var gridLabelWidth = 30;

//dots to show zero
var zeroBox = paper.rect(gridLabelWidth, aOfTwoStartY - 2*dotWidth, 
			 9*dotWidth, 4*dotWidth, 5).attr(zeroBoxAttr);
var zeroText = paper.text(gridLabelWidth + 4*dotWidth + 2, aOfTwoStartY + 3*dotWidth, 'zero');
for (n = 1; n < 4; n++) {
    var x = n*2*dotWidth + n + gridLabelWidth;
    var y = aOfTwoStartY;
    var d = paper.circle(x,y,dotWidth);
    if (n == 3) {
	// hack to get n = 1, 2, 4
	n++;
    }
    var dotId = 'z-'+n;
    d.attr(dotAttr);
    d.attr({'opacity': '0'})
    d.data('id',dotId);
    d.data('selected',0);
    d.data('position',[x,y]);
    //d.click(clickHandler);
    //d.node.style.cursor = 'pointer';
    dot[dotId] = d;
}

var aOfOne = function(x,y,i) {
    // draw dots for copy of A(1)
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


// offset positions for copies of A(1)
aOfOneOffset = [[0,0], // made aspect ratio 2 to 1, so vertical position equals
		[8,4], // degree, while lines defining the same operation remain 
		[12,6], // parallel
		[14,7],
		[20,10],
		[22,11],
		[26,13],
		[34,17]];

// draw A(2) as copies of A(1)    
for (var i=0; i < aOfOneOffset.length; i++) {
    x = aOfOneOffset[i][0];
    y = aOfOneOffset[i][1];
    aOfOne(aOfTwoStartX+x*gridSize, aOfTwoStartY + y*gridSize,x);
};


// highlight zebra
var showZebra = function() {
    zebraOffset = [[0,0],
		   [8,4],
		   [12,6],
		   [20,10]];
    for (var i=0; i < zebraOffset.length; i++) {
	x = zebraOffset[i][0];
	y = zebraOffset[i][1];
	//aOfOne(aOfTwoStartX+x*gridSize, aOfTwoStartY + y*gridSize,x+100);
	//paper.ellipse(aOfTwoStartX+x*gridSize, aOfTwoStartY + (y+3)*gridSize,.65*gridSize,3.8*gridSize).attr(zebraDotAttr);
	//paper.ellipse(aOfTwoStartX+x*gridSize, aOfTwoStartY + (y+3)*gridSize,1.3*gridSize,1*gridSize).attr(zebraDotAttr);
	paper.ellipse(aOfTwoStartX+(x+.3)*gridSize, aOfTwoStartY + (y+3-.4)*gridSize,1.2*gridSize,1.2*gridSize).attr(zebraDotAttr).toBack();
	paper.ellipse(aOfTwoStartX+(x-.3)*gridSize, aOfTwoStartY + (y+3+.4)*gridSize,1.2*gridSize,1.2*gridSize).attr(zebraDotAttr).toBack();
	paper.ellipse(aOfTwoStartX+(x-.05)*gridSize, aOfTwoStartY + (y+.9)*gridSize,.85*gridSize,1.55*gridSize).attr(zebraDotAttr).toBack();
	paper.ellipse(aOfTwoStartX+(x+.05)*gridSize, aOfTwoStartY + (y+5.1)*gridSize,.85*gridSize,1.55*gridSize).attr(zebraDotAttr).toBack();
	paperGrid.toBack();
    };
}



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
    var instructions = [["M", x0, y0],
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
    var instructions = [["M", x0, y0],
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



// Draw background grid
var paperGrid = paper.set();
for (var i = 0; i+4 < canvasHeight/gridSize; i++) {
    gridLineAttr = (i%2) == 0 ? gridLineEvenAttr : gridLineOddAttr;
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


// set up initial state of application
var basisType;
setBasisType('none');
toggleOperation('sq1');
toggleOperation('sq2');
toggleOperation('sq4');
dot['12-2'].animate( dotOn, 150 ).data('selected', 1);
showOperations('12-2');
//menu = drawMenu('12-2');
menu = {'id': '12-2'};


// set click anywhere to clear menu
document.body.addEventListener('click',clearMenu,true);

// redraw balloon menu
// when window is resized (e.g. on mobile devices)
window.addEventListener("resize", function() {
    // set a timeout so this function does not
    // run continuously while window is resizing
    clearTimeout(this.id);
    this.id = setTimeout(function() {
	// what to do when the timeout interval has elapsed:
	// recompute canvas offset, then clear balloon menu and redraw
	recomputeCanvasOffset();
	if (menu) {
	    clearMenu();
	    menu = drawMenu(menu['id']);
	}
    },100) // timeout of 100 ms
    return false;
});
