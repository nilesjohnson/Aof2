/*
  helper functions
  Version 0.3
*/

var basisElement = function(id,basisType) {
    // given input id, return html element storing milnor basis for dot i
    // type is either 'adem' or 'milnor'
    //alert(id+' '+basisType);
    return document.getElementById('dot-'+id+'-'+basisType);
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




