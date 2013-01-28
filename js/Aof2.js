/*
Version 0.2
*/


// global options for basis type and operation type
var basisType = 'adem';
var showSqOne = true;
var showSqTwo = false;
var showSqFour = false;
var operationType = {'sq1': true,
		     'sq2': false,
		     'sq4': false};
var operationData = {'sq1': {},  // fake data generated at end of file
		     'sq2': {},
		     'sq4': {}};
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



var setBasisType = function(str) {
    basisType = str;
    clearBasisType();
    document.getElementById('option-'+str).className = "selected";
    menu = drawMenu(menu['id']);
    return false;
}
var clearBasisType = function() {
    document.getElementById('option-adem').className = 'unselected';
    document.getElementById('option-milnor').className = 'unselected';
    document.getElementById('option-none').className = 'unselected';
}

/*
// no longer used
setOperationType = function(str) {
    operationType = str;
    return false;
}
*/
var toggleOperation = function(str) {
    operationType[str] = !operationType[str];
    if (operationType[str]) {
	document.getElementById('option-'+str).style.backgroundColor = operationColor[str];
    }
    else {
	document.getElementById('option-'+str).style.backgroundColor = 'inherit';
    }
    if (menu) {
	showOperations(menu['id']);
	menu = drawMenu(menu['id']);
    }


}

function cancelBubble(e) {
    // stop (click) event bubbling
    alert(e);
    var evt = e ? e:window.event;
    if (evt.stopPropagation) {
	evt.stopPropagation();
    }
    if (evt.cancelBubble!=null) {
	evt.cancelBubble = true;
    }
}


// offset of canvas
var canvasOffsetX = 5;
var canvasOffsetY = 95;
var canvasWidth = 800;
var canvasHeight = 500;
var paper = new Raphael(document.getElementById('canvas_container'), canvasWidth, canvasHeight);
document.getElementById('canvas_container').style.width = canvasWidth+'px';
document.getElementById('canvas_container').style.height = canvasHeight+'px';


// styling attributes

var dotAttr = {
    'stroke-width': '1',
    'stroke-opacity': '1',
    'opacity': '1',
    'fill': '#cccccc',
    'stroke': '#992244'
};
var dotOn  = {'stroke-width': '3', 'fill': 'white' };



var dotWidth = 4;

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
    'stroke': '#ddd',
    'stroke-width': 2,
    'opacity': '.8'
};



var basisElement = function(id,basisType) {
    // given input id, return html element storing milnor basis for dot i
    // type is either 'adem' or 'milnor'
    //alert(id+' '+basisType);
    return document.getElementById('dot-'+id+'-'+basisType);
}

var clearAll = function(cleardots) {
    /*
      Clear all menus and set all info boxes to display:none

      if cleardots is false, then clear menu but not dots
     */
    cleardots = typeof cleardots !== 'undefined' ? cleardots : true
    for (id in dot) {
	var dotItem = dot[id];
        if ( dotItem.data( 'selected' ) == 1 ) {
	    if (cleardots) {
		dotItem.animate( dotAttr, 150 ).data('selected', 0 );
	    }
	    clearMenu();
	    menu = false;
	    //document.getElementById('dot-'+i+'-info').style.display = "none";
        }
    }
};


var clearMenu = function() {
    // remove a menu object, and the html elements inside it
    if (menu[0] === undefined) {
	return false;
    }
    var id = menu['id'];
    if (id !== undefined) {
	basisElement(id,'milnor').style.display = 'none';
	basisElement(id,'milnor').style.position = 'static';
	basisElement(id,'adem').style.display = 'none';
	basisElement(id,'adem').style.position = 'static';
    }
    menu.attr({'opacity': 0}).toBack();
};



var clickHandler = function() {
    /*
      this function will be called with 'this' referring to the dot
      element that was clicked on
    */
    clearAll();
    this.animate( dotOn, 150 ).data('selected', 1 );
    showOperations(this.data('id'));
    menu = drawMenu(this.data('id'));
    var elt = basisElement(this.data('id'),basisType);
    if ( elt !== null) {
	elt.style.display = "block";
    }
    //document.getElementById('dot-'+this.data('id')+'-info').style.display = "block";
};

var updateDot = function(id,attr,selected) {
    // highlight dot with given id
    if (selected) {
	dot[id].animate(attr, 150).data('selected', 1);
    }
    else {
	dot[id].animate(dotAttr, 150).data('selected', 0);
    }
}

var showOperations = function(id) {
    // show summands of Sq^n applied element with given id
    for (str in operationType) {
	var data = operationData[str][id];
	for (var i = 0; i < data.length; i++) {
	    updateDot(data[i],operationAttr[str],operationType[str]);
	}
    }
}

var operationMenuHandler = function() {
    /*
      This function is called when a menu item is clicked, with 'this'
      referring to the item that was clicked
    */
    for (var j = 0; j < itemLabel.length; j++) {
	// clear all other menu output
	document.getElementById('dot-'+this.data('id')+'-'+itemLabel[j]).style.display = "none";
    }
    //
    infoId = 'dot-'+this.data('id')+'-'+this.data('type');
    document.getElementById(infoId).style.display = "block";
};

var basisMenuHandler = function() {
    var id = this.data('id');
    infoId = 'dot-'+id+'-'+this.data('type');
    //clear basis display for this dot
    document.getElementById('dot-'+id+'-milnor').style.display = 'none';
    document.getElementById('dot-'+id+'-milnor').style.position = 'static';
    document.getElementById('dot-'+id+'-adem').style.display = 'none';
    document.getElementById('dot-'+id+'-adem').style.position = 'static';
    info = document.getElementById(infoId);
    info.style.display = "block";
    info.style.position = "absolute";
    info.style.left = (dot[id].data('position')[0]+canvasOffsetX)+'px';
    info.style.top = (dot[id].data('position')[1]+canvasOffsetY)+'px';
}



var pointerMouseover = function() {
    this.style.cursor = 'pointer';
}


itemLabel = ['adem',
	     'milnor',
	     'sq1',
	     'sq2',
	     'sq4',
	     'submodule'];

itemHandler = [basisMenuHandler,
	       basisMenuHandler,
	       operationMenuHandler,
	       operationMenuHandler,
	       operationMenuHandler,
	       operationMenuHandler];

var drawMenu = function(dotId) {
    /*
      draw menu with pointer at given position      
    */
    //numItems = itemLabel.length
    if (basisType == "none") {
	return {'id': dotId};
    }
    var posX = dot[dotId].data('position')[0]
    var posY = dot[dotId].data('position')[1]
    var pointerOffsetX = dotWidth;
    var pointerOffsetY = dotWidth;
    var menuWidth = 150;
    var itemHeight = 25;
    var menuHeight = 70;//itemHeight*numItems;
    var menuOffsetX = 4*dotWidth; //these could be pulled from an array
    var menuOffsetY = 2*dotWidth;
    var h2 = menuHeight - 2*dotWidth;
    var menuPath = "M " + (posX+pointerOffsetX) + " " + (posY-pointerOffsetY) + " ";
    var menuPath = menuPath.concat("l " + menuOffsetX + " -" + menuOffsetY + " ");
    var menuPath = menuPath.concat("l " + menuWidth + " 0 ");
    var menuPath = menuPath.concat("l 0 " + menuHeight + " ");
    var menuPath = menuPath.concat("l -" + menuWidth + " 0 ");
    var menuPath = menuPath.concat("l 0 -" + h2 + " z");
    var menuSet = paper.set();
    menuSet['id'] = dotId;
    var menuContainer = paper.path(menuPath);
    menuContainer.data('id', dotId);
    menuSet.push(menuContainer)
    menuContainer.attr(menuAttr);
    /*
    for (var i = 0; i < numItems; i++) {
	// add items to menu
	itemPosX = posX+10;
	itemPosY = posY-10 + i*itemHeight;
	var item = paper.set();
	var itemRect = paper.rect(itemPosX,itemPosY,menuWidth,itemHeight,0).attr({opacity: '0'});
	itemRect.attr(menuItemAttr);
	item.push(itemRect);
	var itemText = paper.text(itemPosX+menuWidth/2,itemPosY+itemHeight/2,itemLabel[i]).attr({opacity: '0'});
	item.push(itemText);
	item.attr({cursor: 'pointer'});
	item.data('number',dotNum);
	item.data('type',itemLabel[i]);
	item.click(itemHandler[i]);	
	menuSet.push(item);
    }
    */
    menuSet.toFront();
    if (basisType == 'adem' || basisType == 'milnor') {
	info = basisElement(dotId,basisType);
	if (info !== null) {
	    info.style.display = "block";
	    info.style.position = "absolute";
	    info.style.left = (posX+canvasOffsetX+menuOffsetX)+'px';
	    info.style.top = (posY+canvasOffsetY-menuOffsetY)+'px';
	    info.style.zIndex = 1;
	}
    }
    return menuSet;
};





//circle.attr({fill: '#000', stroke: 'none'});
//var text = paper.text(250, 250, 'Bye Bye Circle!');
//text.attr({opacity: 0, 'font-size': 12}).toBack(); 

/*
circle.node.onmouseover = function() {  
    this.style.cursor = 'pointer';  
}  

circle.node.onclick = function() {  
    text.animate({opacity: 1}, 2000);  
    circle.animate({opacity: 0}, 2000, function() {  
        this.remove();  
    });  
}  
*/

// Create rectangles (er...circles)
var dot = {};
currentDotId = false;
var menu = false;
//var info = [];
//var menuList = [];


var gridSize = 5*dotWidth;
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

// draw copies of A(1)
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
    aOfOne(2*gridSize+x*gridSize,25 + y*gridSize,x);
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

/*
var canvas = $("#canvas_container");
$("#canvas_container").click(canvasClick);

function canvasClick(e) {
    if (e.target.nodeName == 'svg') {
	clearAll();
    }
}

*/

document.body.addEventListener('click',clearMenu,true);