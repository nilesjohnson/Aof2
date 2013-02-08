/*
Visualization of A(2)
http://www.nilesjohnson.net/Aof2/

A web application using Raphael.js to organize A(2) and show 
it's structure by the coset decomposition A(2)//A(1)

Version 1.0

Copyright 2013 Robert Bruner and Niles Johnson
Licensed under GNU General Public License version 3 or later.
See README.txt

This file defines functions for handling clicks on the application.
*/


var setBasisType = function(str) {
    // Set display for elements of A(2) to use
    // Adem (admissible) basis, Milnor basis, or none
    basisType = str;
    clearBasisType();
    document.getElementById('option-'+str).className = "selected";
    menu = drawMenu(menu['id']);
    return false;
}

var toggleOperation = function(str) {
    // Toggle to display or not display which 
    // of the Sq^i operations to show
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


var clickHandler = function() {
    // Handle click on dots
    // Clear previous display, 
    // show operations,
    // draw balloon menu
    //
    // 'this' refers to the dot that
    // was clicked
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


function drawMenu(dotId) {
    /*
      draw menu with pointer at given position      
    */
    //numItems = itemLabel.length
    if (dotId == undefined) {
	return false;
    }
    if (basisType == "none") {
	return {'id': dotId};
    }
    var posX = dot[dotId].data('position')[0]
    var posY = dot[dotId].data('position')[1]
    var pointerOffsetX = 0*dotWidth;
    var pointerOffsetY = 0*dotWidth;
    var menuOffsetX = 4*dotWidth; //these could be pulled from an array
    var menuOffsetY = 2*dotWidth;
    // putting menu on different sides and in different direction
    if (dotId.match(/^\d+/) == aOfOneOffset[0][0]) {
	// first A(1)
	var menuSide = 1; // +1 means right, -1 means left
	var menuDir = -1; // +1 means down, -1 means up
    }
    else if (dotId.match(/^\d+/) == aOfOneOffset[aOfOneOffset.length-1][0]) {
	// last A(1)
	var menuSide = -1; // +1 means right, -1 means left
	var menuDir = -1; // +1 means down, -1 means up
    }
    else {
	if (dotId.match(/\d+$/) < 3 || dotId.match(/\d+$/) == 4) {
	    // top right half of A(1)
	    var menuSide = 1; // +1 means right, -1 means left
	    var menuDir = -1; // +1 means down, -1 means up
	}
	else {
	    // bottom left half of A(1)
	    var menuSide = -1; // +1 means right, -1 means left
	    var menuDir = 1; // +1 means down, -1 means up
	}
    }
	
    // get basis info from HTML element for dot
    info = basisElement(dotId,basisType);
    info.style.display = "block";
    info.style.position = "absolute";

    // 
    var menuWidth = info.offsetWidth + 2*menuOffsetX;
    //var itemHeight = 25;
    var menuHeight = info.offsetHeight + 2*menuOffsetY;
    var h2 = menuHeight - 3*dotWidth;
    
    // reposition to lay on top of menu
    info.style.left = (posX + 
		       canvasOffsetX +
		       menuSide*menuOffsetX +
		       menuSide*pointerOffsetX +
		       1*2*dotWidth +
		       ((menuSide-1)/2)*menuWidth)+'px';
    info.style.top = (posY + 
		      canvasOffsetY + 
		      1*menuDir*menuOffsetY + 
		      1*menuDir*pointerOffsetY + 
		      (1*(menuDir-1)/2)*menuHeight+
		      (0*(menuDir+1)/2)*menuHeight) + 'px';
    info.style.zIndex = 1;

    // build path for menu
    var menuPath = 'M ' + posX + ' ' + posY + ' ';
    menuPath = menuPath.concat("m " + (menuSide*pointerOffsetX) +
			       " " + (-1*menuDir*pointerOffsetY) + " ");
    menuPath = menuPath.concat("l " + (menuSide*menuOffsetX) + 
			       " " + (menuDir*menuOffsetY) + " ");
    menuPath = menuPath.concat("l " + (menuSide*menuWidth) + " 0 ");
    menuPath = menuPath.concat("l 0 " + (menuDir*menuHeight) + " ");
    menuPath = menuPath.concat("l " + (-1*menuSide*menuWidth) + " 0 ");
    menuPath = menuPath.concat("l 0 " + (-1*menuDir*h2) + " z");


    var menuSet = paper.set();
    menuSet['id'] = dotId;

    var menuContainer = paper.path(menuPath);
    menuContainer.data('id', dotId);
    menuSet.push(menuContainer)
    menuContainer.attr(menuAttr);

    menuSet.toFront();
    dot[dotId].toFront();
    return menuSet;
};


