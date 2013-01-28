/*
Version 0.1, 1/25

*/


var basisType = 'none';
var operationType = 'sq1';

setBasisType = function(str) {
    basisType = str;
    return false;
}

setOperationType = function(str) {
    operationType = str;
    return false;
}


var titleHeight = 50;

var paper = new Raphael(document.getElementById('canvas_container'), 500, 500);


var dotAttr = {
    'stroke-width': '1',
    'stroke-opacity': '1',
    'opacity': '1',
    'fill': '#cccccc',
    'stroke': '#992244'
};

var menuItemAttr = {
    'fill': '#9cf',
    'stroke-width': '0'
};


var clearAll = function() {
    /*
      Clear all menus and set all info boxes to display:none
     */
    var dotOff = { 'stroke-width': '1', 'fill': '#cccccc' };
    var menuOff = {'opacity': '0'};
    for (var i = 0; i < dot.length; i++) {
	var dotItem = dot[i];
        if ( dotItem.data( 'dot-sel' ) == 1 ) {
	    dotItem.animate( dotOff, 250 ).data('dot-sel', 0 );
	    menu[i].animate( menuOff, 250 );
	    menu[i].toBack();
	    //document.getElementById('dot-'+i+'-info').style.display = "none";
        }
    }
}

var clickHandler = function() {
    /*
      this function will be called with 'this' referring to the dot
      element that was clicked on
    */
    var dotOn  = { 'stroke-width': '5', 'fill': 'white' };
    var infoOn = {'opacity' : '1'};
    clearAll();
    this.animate( dotOn, 350 ).data('dot-sel', 1 );
    menu[this.data('dot-num')].toFront().animate({'opacity': '1'}, 350);
    //info[this.data('dot-num')].animate( infoOn, 350);
    document.getElementById('dot-'+this.data('dot-num')+'-info').style.display = "block";
};

var menuClickHandler = function() {
    /*
      This function is called when a menu item is clicked, with 'this'
      referring to the item that was clicked
    */
    for (var j = 0; j < itemLabel.length; j++) {
	// clear all other menu output
	document.getElementById('dot-'+this.data('number')+'-'+itemLabel[j]).style.display = "none";
    }
    //
    infoId = 'dot-'+this.data('number')+'-'+this.data('type');
    document.getElementById(infoId).style.display = "block";
};

var pointerMouseover = function() {
    this.style.cursor = 'pointer';
}

var basisMenuHandler = function() {
    i = this.data('number');
    infoId = 'dot-'+i+'-'+this.data('type');
    //clear basis display for this dot
    document.getElementById('dot-'+i+'-milnor').style.display = 'none';
    document.getElementById('dot-'+i+'-milnor').style.position = 'static';
    document.getElementById('dot-'+i+'-adem').style.display = 'none';
    document.getElementById('dot-'+i+'-adem').style.position = 'static';
    info = document.getElementById(infoId);
    info.style.display = "block";
    info.style.position = "fixed";
    info.style.left = dot[i].data('dot-pos')[0]+'px';
    info.style.top = (dot[i].data('dot-pos')[1]+titleHeight-10)+'px';
}




itemLabel = ['adem',
	     'milnor',
	     'sq1',
	     'sq2',
	     'sq4',
	     'submodule'];

itemHandler = [basisMenuHandler,
	       basisMenuHandler,
	       menuClickHandler,
	       menuClickHandler,
	       menuClickHandler,
	       menuClickHandler];

var drawMenu = function(posX,posY,dotNum) {
    /*
      draw menu with pointer at given position      
    */
    numItems = itemLabel.length
    var menuWidth = 100;
    var itemHeight = 25;
    var menuHeight = itemHeight*numItems;
    var pointerSize = 10;
    var h2 = menuHeight - 2*pointerSize;
    var menuPath = "M " + posX + " " + posY + " ";
    var menuPath = menuPath.concat("l " + pointerSize + " -" + pointerSize + " ");
    var menuPath = menuPath.concat("l " + menuWidth + " 0 ");
    var menuPath = menuPath.concat("l 0 " + menuHeight + " ");
    var menuPath = menuPath.concat("l -" + menuWidth + " 0 ");
    var menuPath = menuPath.concat("l 0 -" + h2 + " z");
    var menuSet = paper.set();
    var menuContainer = paper.path(menuPath).attr({opacity: '0'});
    menuSet.push(menuContainer)
    menuContainer.attr({fill: '#9cf', stroke: '#ddd', 'stroke-width': 5});
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
    menuSet.toBack();
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
var dot = [];
var info = [];
var menu = [];
for ( var i = 0; i < 6; i++ ) {
    var posX = 30 + i*70;
    var posY = 30+ i*40;
    var dotWidth = 10;
    var dotItem = paper.circle(posX, posY, dotWidth);
    dotItem.attr( dotAttr );
    dotItem.data('dot-num',i);
    dotItem.data('dot-sel',0);
    dotItem.data('dot-info','dot '+i.toString());
    dotItem.data('dot-pos',[posX,posY]);
    dotItem.click( clickHandler );
    dotItem.node.style.cursor = 'pointer';
    dot[i] = dotItem;    
/*
    var textOffset = dotWidth * 1.5;
    var infoItem = paper.text(posX + textOffset, posY, 'info for dot '+i.toString());
    infoItem.attr(infoAttr);
    info[i] = infoItem;
*/
    menu[i] = drawMenu(posX,posY,i);
}







