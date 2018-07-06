// JavaScript Document

function assignStyle(object,selector) {
	object.className = selector.substring(1)
}

function makeTable(rows,cols,width,height,border,cellpadding,cellspacing,align) {
	var therows = new Array()
	var thecells = new Array()
	var thetable = document.createElement("table")
	thetable.width = width
	thetable.height = height
	thetable.border = border
	thetable.cellPadding = cellpadding
	thetable.cellSpacing = cellspacing
	thetable.align = align	
			 // doesn't work in "with" statement -- don't know why
		if (thetable.tBodies.length == 0) {						// IE Mac doesn't include a default tBody in the table
			var thebody = thetable.appendChild(document.createElement("tBody"))
		} else {
			var thebody = thetable.tBodies[0]
		}
		for (var i=0; i<rows; i++) { 
			therows[i] = thebody.appendChild(document.createElement("tr"))
			thecells[i] = new Array
			for (var j = 0; j<cols; j++) {
				thecells[i][j] = therows[i].appendChild(document.createElement("td"))
			}	
		}
						//IE does not properly support references via table.rows[i].  kitandkaboodle is a custom object whose element include arrays of the table's rows and cells 
	var kitandkaboodle = new ATable(thetable,therows,thecells)  	
	return kitandkaboodle
	
}

function ATable(table,rows,cols) {   //a custom object circumventing problems with references via table.rows[i]  in IE
	this.tbl = table              //the whole table
	this.rws = rows               //an array of the table's rows
	this.cls = cols	               //a 2-d array of the table's cells
}

function removeArrayElem(array,elemnum) {
	return array.slice(0,elemnum).concat(array.slice(elemnum+1))
}
	
function emptyIt(elem) {
	if (elem.hasChildNodes()) {
		while (elem.childNodes.length > 0) {
			elem.removeChild(elem.childNodes[0])
		}
	}
	return elem
}

function decimalOf(whatbinary) {
	thevalue = 0
	for (var i=0; i<whatbinary.length; i++) {
		if (whatbinary.charAt(i) == 1) {
			thevalue = thevalue + Math.pow(2,3-i)
		}
	}
	return thevalue
}


function binaryOf (whatdecimal) {
	var thedecimal = whatdecimal
	var thevalue = new Array()
	for (var i=3; i>=0; i--) {
		thevalue[3-i] = parseInt(thedecimal/Math.pow(2,i))
		thedecimal = thedecimal - thevalue[3-i] * Math.pow(2,i)
	} 
	return thevalue.join("")
}

function inCollection(expr,col)
{	for (var x=0; x<col.length; x++) if ((col[x].value) == expr) return x
 	return -1
}
		
function inArray(expr,array) {
	for (var x=0; x<array.length; x++) if (array[x] == expr) return x
	return -1
}
