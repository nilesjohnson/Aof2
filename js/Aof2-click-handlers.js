/*
  Functions for handling clicks
  
  Version 0.3
*/





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


/*
var operationMenuHandler = function() {
    //  This function is called when a menu item is clicked, with 'this'
    //  referring to the item that was clicked
    
    for (var j = 0; j < itemLabel.length; j++) {
	// clear all other menu output
	document.getElementById('dot-'+this.data('id')+'-'+itemLabel[j]).style.display = "none";
    }
    //
    infoId = 'dot-'+this.data('id')+'-'+this.data('type');
    document.getElementById(infoId).style.display = "block";
};
*/

/*
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
*/

/*
var pointerMouseover = function() {
    this.style.cursor = 'pointer';
}
*/

/*
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
*/

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
    dot[dotId].toFront();
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

