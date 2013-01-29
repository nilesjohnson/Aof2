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

