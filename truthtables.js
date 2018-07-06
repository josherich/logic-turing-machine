// JavaScript Document

 var thechosen = ""
 var thevars = ""
 var firstfield = ""
 var completedrows = 0
 var thetable = ""
 var thetruthtable = ""

 var thekey = new Array(4)
       thekey[0] = new Array(2) 
          thekey[0][0]= new Array(0,0)
          thekey[0][1] = new Array(0,1)
       thekey[1] = new Array(2)
          thekey[1][0] = new Array(0,1)
          thekey[1][1] = new Array(1,1)
       thekey[2] = new Array(2)
          thekey[2][0] = new Array(1,1)
          thekey[2][1] = new Array(0,1)
       thekey[3] = new Array(2)
          thekey[3][0] = new Array(1,0)
          thekey[3][1] = new Array(0,1)
			
function countVars(whatstring) {
	thevars = ""
	for (y=0; y<whatstring.length; y++) {
		if (isVariable(whatstring.charAt(y))) {
			if (thevars.indexOf(whatstring.charAt(y)) == -1) {
				thevars += whatstring.charAt(y)
			}
		}
	}
	combinationstried = new Array()
	for (b=0; b<Math.pow(2,thevars.length); b++) {
		combinationstried[b] = 0
	}
}

function drawTable() {
	var st = thestring
	var thelink = ""
	var thecell = ""
	var therow = ""
    thetable = makeTable(Math.pow(2,thevars.length)+1,st.length,"","",0,0,0,"center")
	therow = thetable.rws[0]
	therow.style.height = "25px"
	therow.style.textAlign = "center"
	therow.style.verticalAlign = "bottom"
	for (var i=0; i<st.length; i++) {
		thecell = thetable.cls[0][i]
		thecell.style.width = "25px"
		thecell.appendChild(document.createTextNode(st.charAt(i)))
	}
	for (var a=0; a<thetable.cls.length-1; a++) {
		therow = thetable.rws[a+1]
		therow.style.textAlign = "center"
		therow.style.verticalAlign = "middle"
		for (d=0; d<st.length; d++) {
			thecell = thetable.cls[a+1][d]
			thecell.style.height = "25px"
			thecell.style.width="25px"
			thecell.style.textAlign = "center"
			thecell.style.verticalAlign = "middle"
		}
	}	
	var thespan = document.getElementById("tableresults")
	emptyIt(thespan)
	thespan.appendChild(thetable.tbl)
	if (diagramvisible == "0") {addLinks()}
	updateTable()
}

function addLinks() {
	var thecell = ""
	for (u=0; u<thestring.length; u++) {
		if ("&/>:~".indexOf(thestring.charAt(u)) > -1) {
			thecell = thetable.cls[0][u]
			emptyIt(thecell)
			thelink = thecell.appendChild(document.createElement("a"))
			thelink.href = "javascript:chooseCol(" + u + ")"
			thelink.style.textDecoration = "none"
			thelink.appendChild(document.createTextNode(thestring.charAt(u)))
		}
	}
}

function removeLinks() {
	var thecell = ""
	for (u=0; u<thestring.length; u++) {
		if ("&/>:~".indexOf(thestring.charAt(u)) > -1) {
			thecell = thetable.cls[0][u]
			emptyIt(thecell)
			thecell.appendChild(document.createTextNode(thestring.charAt(u)))
		}
	}
}

function updateTable() {

	var flag = ""
	var thefield = ""
	var thecell = ""
	var firstfield = ""
	var therow = transcribeCounter()
	for (var w=0; w<thetruthtable.length; w++)   //empty cells; enter values; add color if last column, otherwise remove color)
	{   for (var z=0; z<thestring.length; z++) {
			thecell = thetable.cls[w+1][z]
			emptyIt(thecell)
			if (thetruthtable[w][z] != "") {
				thetable.cls[w+1][z].appendChild(document.createTextNode(thetruthtable[w][z]))
				if (inArray(z,theunqueue[0]) > -1) {
					thecell.style.backgroundColor = "FFFF99"
					completedrows += 1
				}  else {
					thecell.style.backgroundColor = "#FFFFFF"
				} 
			}
		}
	}
	if (thechosen != "" && therow < thetruthtable.length) {							// if a column has been chosen, find rows where input is available, then install fields and set color of inputs 		
		var z = thechosen[1]
		var theinput = thetree[z]
		for (w=0; w<thetruthtable.length; w++) {
			if (thetruthtable[w][z] == "") {
				flag = true
				for (var q=0; q<theinput.length; q++) {
					if (thetruthtable[w][theinput[q]] == "") {
						flag = false
						break
					}
				}
				if (flag) {
					for (var q=0; q<theinput.length; q++) {
						thetable.cls[w+1][theinput[q]].style.backgroundColor = "#FFCC99"
					}
					thecell = thetable.cls[w+1][z]
					emptyIt(thecell)
					thefield = thecell.appendChild(document.createElement("input"))
					thefield.size = "1"
					thefield.onclick = callsetcounterfromTable
					thefield.onchange = enterMe
					thefield.id = "f" + (w) + ",f" + z
					if (firstfield == "" || w == therow) {firstfield = thefield}  //this field slated for selection if none has been, or it matches the counter	
				}
			}
		}
	}
	if (firstfield == "") {
		thechosen = ""
		if (window.clearWorlds) {clearWorlds()}
	} else {
		setcounterfromTable(firstfield)
	}
	entercounter = 0
}

function callsetcounterfromTable(evt) {
	if (evt != null) {var what = evt.target} else {var what = event.srcElement}
	setcounterfromTable(what)
}


function setcounterfromTable(what) {
	var thebinary = ""
	var thevalue = ""
	var row = parseInt(what.id.split(",")[0].substring(1))
	for (y=0; y<thevars.length; y++) {
		thevalue = thetruthtable[row][thestring.indexOf(thevars.charAt(thevars.length-y-1))]
		theplaces[y].nodeValue = thevalue
		thebinary = thevalues.indexOf(thevalue) + thebinary
	}
	for (y=thevars.length; y<4; y++) {
		theplaces[y].nodeValue = thevalues.charAt(0)
		thebinary = "0" + thebinary
	}
	thedecimal.nodeValue = theordinals[parseInt(decimalOf(thebinary))]
	if (document.getElementById("searchresults")) {registerCounter()}
	what.focus()
	what.select()
}


function checkKey(evt)   //blocks the use of 'return' and 'enter' keys, which "submit" the page when used in the last open <input> field
{	if (evt.which) var keynum = evt.which
	else if (window.event) var keynum = window.event.keyCode
	if (keynum == 13) 
	{	
		return(false)
	}

}

function normalForm(whatstring) {
	var s = whatstring
	var firstbullet = s.indexOf("*")
	if (firstbullet > -1) {
		return (normalForm("(" + s.substring(0,firstbullet) + ")&(" + s.substring(firstbullet+1) + ")"))
	} else {
		return (s)
	}
}	
			  
		  
function isVariable(whatchar) {
   return ("pqrs".indexOf(whatchar) > -1)
}

function isUnaryConnective(whatchar) {
    return (whatchar == "~")
}

function isDyadicConnective(whatchar) {
    return ("&/>:".indexOf(whatchar) > -1)
}
