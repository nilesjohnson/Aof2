/*
  helper functions
  Version 0.3
*/

var recomputeCanvasOffset = function() {
    // recompute offset of canvas from (0,0), for correct positioning of 
    // basis info in balloon menus
    canvasOffsetX = document.getElementById('canvas_container').offsetLeft;
    canvasOffsetY = document.getElementById('canvas_container').offsetTop;
}

var basisElement = function(id,basisType) {
    // given input id, return html element storing milnor basis for dot i
    // type is either 'adem' or 'milnor'
    //alert(id+' '+basisType);
    return document.getElementById('dot-'+id+'-'+basisType);
}

var clearBasisType = function() {
    // clear selection of basis type
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
    //alert('clearAll');
    cleardots = typeof cleardots !== 'undefined' ? cleardots : true
    for (id in dot) {
	var dotItem = dot[id];
        if ( dotItem.data('selected') == 1 ) {
	    if (cleardots) {
		dotItem.animate( dotAttr, 150 ).data('selected', 0 );
		if (dotItem.data('id').substring(0,1) == 'z') {
		    //alert('opacity: 0')
		    dotItem.animate({'opacity': '0'}, 150);
		}
	    }
	    clearMenu();
	    menu = false;
	    //document.getElementById('dot-'+i+'-info').style.display = "none";
        }
    }
};

function cancelBubble(e) {
    // stop (click) event bubbling
    // this function is currently unused
    alert(e);
    var evt = e ? e:window.event;
    if (evt.stopPropagation) {
	evt.stopPropagation();
    }
    if (evt.cancelBubble!=null) {
	evt.cancelBubble = true;
    }
}

function fireEvent(element,event) {
    // http://stackoverflow.com/questions/9855003/raphael-object-simulate-click
    // this function is currently unused
    if (document.createEventObject) {
        // dispatch for IE
        var evt = document.createEventObject();
        return element.fireEvent('on'+event,evt)
    } else {
        // dispatch for firefox + others
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(event, true, true); // event type,bubbling,cancelable
        return !element.dispatchEvent(evt);
    }
}
 


var updateDot = function(id,attr,selected) {
    // highlight dot with given id
    //alert('updateDot: '+id);
    if (selected) {
	dot[id].animate(attr, 150).data('selected', 1);
	if (id.substring(0,1) == 'z') {
	    var op = dot[id].attr('opacity');
	    dot[id].animate({'opacity': '1'}, 150);
	}
    }
    else {
	dot[id].animate(dotAttr, 150).data('selected', 0);
	if (id.substring(0,1) == 'z') {
	    var op = dot[id].attr('opacity');
	    dot[id].animate({'opacity': '0'}, 150);
	}
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




