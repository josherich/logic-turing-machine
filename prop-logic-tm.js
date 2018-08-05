var tapelength = 84
var rules = new Array()
var state = 0
var position = 0
var rightbuffer = ""
var leftbuffer = ""
var thekey = [
  [
    [0, 0],
    [0, 1]
  ],
  [
    [0, 1],
    [1, 1]
  ],
  [
    [1, 1],
    [0, 1]
  ],
  [
    [1, 0],
    [0, 1]
  ]
]

var programs = new Array()
var tapes = new Array()
programs[1] = new Array()
programs[1][0] = [0, "#", "#", 1, 0]
programs[1][1] = [0, 0, 0, 1, 1]
programs[1][2] = [0, 1, 1, 1, 1]
programs[1][3] = [1, 0, 0, 1, 1]
programs[1][4] = [1, 1, 1, 1, 1]
programs[1][5] = [1, "#", "#", 0, 2]
programs[1][6] = [2, "#", "#", 2, "x"]
programs[1][7] = [2, 0, 1, 1, 1]
programs[1][8] = [2, 1, 0, 0, 2]
tapes[1] = [0, 0, 0, 0]

programs[2] = new Array()
programs[2][0] = [0, "#", "#", 1, 0]
programs[2][1] = [0, 0, 0, 1, 1]
programs[2][2] = [0, 1, 1, 1, 1]
programs[2][3] = [1, 0, 0, 1, 1]
programs[2][4] = [1, 1, 1, 1, 1]
programs[2][5] = [1, "#", "#", 0, 2]
programs[2][6] = [2, "#", "#", 2, "x"]
programs[2][7] = [2, 0, 1, 0, 2]
programs[2][8] = [2, 1, 0, 1, 1]
tapes[2] = [1, 1, 1, 1]

programs[3] = new Array()
programs[3][0] = [0, "#", "#", 1, 0]
programs[3][1] = [0, 0, 0, 1, 1]
programs[3][2] = [0, 1, 1, 1, 1]
programs[3][3] = [1, 0, 0, 1, 1]
programs[3][4] = [1, 1, 1, 1, 1]
programs[3][5] = [1, "#", "#", 0, 2]
programs[3][6] = [2, "#", "#", 1, 9]
programs[3][7] = [2, 0, 1, 0, 2]
programs[3][8] = [2, 1, 0, 1, 3]
programs[3][9] = [3, 0, 0, 1, 3]
programs[3][10] = [3, 1, 1, 1, 3]
programs[3][11] = [3, "#", "#", 1, 4]
programs[3][12] = [4, "#", "#", 1, 4]
programs[3][13] = [4, 0, 0, 1, 5]
programs[3][14] = [4, 1, 1, 1, 5]
programs[3][15] = [5, 0, 0, 1, 5]
programs[3][16] = [5, 1, 1, 1, 5]
programs[3][17] = [5, "#", "#", 0, 6]
programs[3][18] = [6, "#", 1, 0, 7]
programs[3][19] = [6, 0, 1, 2, 7]
programs[3][20] = [6, 1, 0, 0, 6]
programs[3][21] = [7, 0, 0, 0, 7]
programs[3][22] = [7, 1, 1, 0, 7]
programs[3][23] = [7, "#", "#", 0, 8]
programs[3][24] = [8, "#", "#", 0, 8]
programs[3][25] = [8, 0, 0, 1, 1]
programs[3][26] = [8, 1, 1, 1, 1]
programs[3][27] = [9, 0, "#", 1, 9]
programs[3][28] = [9, 1, "#", 1, 9]
programs[3][29] = [9, "#", "#", 2, "x"]
tapes[3] = [0, 1, 1, 0, , , 1, 1, 1, 0]

programs[4] = new Array()
programs[4][0] = [0, "#", "#", 1, 1]
programs[4][1] = [1, "p", "*", 1, 2]
programs[4][2] = [1, "q", "*", 1, 3]
programs[4][3] = [1, "/", "*", 1, 4]
programs[4][4] = [1, "~", "*", 1, 5]
programs[4][5] = [2, "$", "$", 1, 2]
programs[4][6] = [2, "#", "#", 1, 6]
programs[4][7] = [3, "$", "$", 1, 3]
programs[4][8] = [3, "#", "#", 1, 7]
programs[4][9] = [4, "$", "$", 1, 4]
programs[4][10] = [4, "#", "#", 1, 8]
programs[4][11] = [5, "$", "$", 1, 5]
programs[4][12] = [5, "#", "#", 1, 9]
programs[4][13] = [6, "$", "$", 1, 6]
programs[4][14] = [6, "#", "p", 0, 10]
programs[4][15] = [7, "$", "$", 1, 7]
programs[4][16] = [7, "#", "q", 0, 11]
programs[4][17] = [8, "$", "$", 1, 8]
programs[4][18] = [8, "#", "/", 0, 12]
programs[4][19] = [9, "$", "$", 1, 9]
programs[4][20] = [9, "#", "~", 0, 13]
programs[4][21] = [10, "#", "#", 0, 10]
programs[4][22] = [10, "q", "q", 0, 10]
programs[4][23] = [10, "/", "/", 0, 10]
programs[4][24] = [10, "~", "~", 0, 10]
programs[4][25] = [10, "*", "p", 1, 1]
programs[4][26] = [11, "#", "#", 0, 11]
programs[4][27] = [11, "p", "p", 0, 11]
programs[4][28] = [11, "/", "/", 0, 11]
programs[4][29] = [11, "~", "~", 0, 11]
programs[4][30] = [11, "*", "q", 1, 1]
programs[4][31] = [12, "#", "#", 0, 12]
programs[4][32] = [12, "p", "p", 0, 12]
programs[4][33] = [12, "q", "q", 0, 12]
programs[4][34] = [12, "~", "~", 0, 12]
programs[4][35] = [12, "*", "/", 1, 1]
programs[4][36] = [13, "#", "#", 0, 13]
programs[4][37] = [13, "p", "p", 0, 13]
programs[4][38] = [13, "q", "q", 0, 13]
programs[4][39] = [13, "/", "/", 0, 13]
programs[4][40] = [13, "*", "~", 1, 1]
programs[4][41] = [1, "#", "#", 1, 14]
programs[4][42] = [14, "$", "$", 1, 14]
programs[4][43] = [14, "#", "#", 1, 15]
programs[4][44] = [15, "#", 0, 1, 16]
programs[4][45] = [16, "#", 0, 0, 17]
programs[4][46] = [17, "$", "$", 0, 17]
programs[4][47] = [17, "#", "#", 0, 18]
programs[4][48] = [18, "$", "$", 0, 18]
programs[4][49] = [18, "#", "#", 1, "x"]
tapes[4] = ["/", "p", "q"]


function drawMachine() {
  var machine = makeTable(3, tapelength, "", "", 0, 1, 1, "center")
  var thecell
  machine.rws[0].style.height = "25px"
  machine.rws[1].style.height = "10px"
  machine.rws[2].style.height = "25px"
  for (var i = 0; i < tapelength; i++) {
    thecell = machine.cls[0][i]
    thecell.style.width = "25px"
    thecell.style.backgroundColor = "white"
    thecell.style.verticalAlign = "middle"
    thecell.style.textAlign = "center"
    thecell.id = "h" + i
  }
  for (var i = 0; i < tapelength; i++) {
    thecell = machine.cls[1][i]
    thecell.id = "c" + i
  }
  for (var i = 0; i < tapelength; i++) {
    thecell = machine.cls[2][i]
    thecell.id = "t" + i
    thecell.style.backgroundColor = "blue"
    thecell.style.verticalAlign = "middle"
    thecell.style.textAlign = "center"
    thecell.onclick = showField
  }
  document.getElementById("machine").appendChild(machine.tbl)
  placeHead()
}

function placeHead() {
  var thecell = document.getElementById("h" + position)
  thecell.style.backgroundColor = "yellow"
  thecell.style.fontFamily = "sans"
  thecell.style.fontWeight = "bold"
  thecell.appendChild(document.createTextNode(state))
  thecell = document.getElementById("c" + position)
  var theimg = thecell.appendChild(document.createElement("img"))
  theimg.style.height = "11px"
  theimg.style.width = "23px"
  theimg.src = "./ubar.png"
}

function moveHead(newposition, newstate) {
  var thecell = document.getElementById("h" + position)
  emptyIt(thecell)
  thecell.style.backgroundColor = "white"
  var thecell = document.getElementById("c" + position)
  emptyIt(thecell)
  position = newposition
  state = newstate
  placeHead()
}

function addRule() {
  var thebody = document.getElementById("rules")
  var therows = thebody.getElementsByTagName("tr")
  if (therows.length > 1) {
    var lastrow = parseInt(thebody.childNodes[thebody.childNodes.length - 1].id)
    var rownum = lastrow + 1
  } else {
    var rownum = 1
  }
  var newrow = document.createElement("tr")
  newrow.style.height = "25px"
  newrow.id = rownum
  var firstcell = newrow.appendChild(document.createElement("td"))
  firstcell.align = "center"
  firstcell.style.fontFamily = "sans"
  firstcell.style.fontWeight = "bold"
  firstcell.id = rownum + ",1"
  var firstfield = firstcell.appendChild(document.createElement("input"))
  firstfield.size = "1"
  firstfield.onblur = enterField
  var secondcell = newrow.appendChild(document.createElement("td"))
  secondcell.align = "center"
  secondcell.style.fontFamily = "monospace"
  secondcell.id = rownum + ",2"
  var secondfield = secondcell.appendChild(document.createElement("input"))
  secondfield.size = "1"
  secondfield.onblur = enterField
  var thirdcell = newrow.appendChild(document.createElement("td"))
  thirdcell.align = "center"
  thirdcell.style.fontFamily = "monospace"
  thirdcell.id = rownum + ",3"
  var thirdfield = thirdcell.appendChild(document.createElement("input"))
  thirdfield.size = "1"
  thirdfield.onblur = enterField
  var fourthcell = newrow.appendChild(document.createElement("td"))
  fourthcell.align = "center"
  fourthcell.id = rownum + ",4"
  var movemenu = fourthcell.appendChild(document.createElement("select"))
  movemenu.options[0] = document.createElement("option")
  movemenu.options[0].text = "left"
  movemenu.options[0].value = "left"
  movemenu.options[1] = document.createElement("option")
  movemenu.options[1].text = "right"
  movemenu.options[1].value = "right"
  movemenu.options[2] = document.createElement("option")
  movemenu.options[2].text = "halt"
  movemenu.options[2].value = "halt"
  movemenu.onchange = readRules
  var fifthcell = newrow.appendChild(document.createElement("td"))
  fifthcell.align = "center"
  fifthcell.style.fontFamily = "monospace"
  fifthcell.id = rownum + ",5"
  var fourthfield = fifthcell.appendChild(document.createElement("input"))
  fourthfield.size = "1"
  fourthfield.onblur = enterField
  var sixthcell = newrow.appendChild(document.createElement("td"))
  sixthcell.style.backgroundColor = "#CCCCCC"
  sixthcell.align = "center"
  sixthcell.style.fontfamily = "serif"
  sixthcell.id = rownum + ",6"
  var deletelink = sixthcell.appendChild(document.createElement("a"))
  deletelink.href = "javascript:deleteRule(" + rownum + ")"
  deletelink.appendChild(document.createTextNode("delete"))
  deletelink.style.textDecoration = "none"
  document.getElementById("rules").appendChild(newrow)

}

function showField(evt, thecell) {
  if (showField.arguments.length == 1)
    if (evt != null) {
      var thecell = evt.target
    } else {
      var thecell = event.srcElement
    }
  var cellid = thecell.id.substring(1)
  var contents = ""
  if (thecell.hasChildNodes()) {
    contents = thecell.childNodes[0].nodeValue
    emptyIt(thecell)
  }
  hideFields()
  var newfield = thecell.appendChild(document.createElement("input"))
  newfield.size = "1"
  if (contents != "") newfield.value = contents
  thecell.onclick = ""
  setTimeout("document.getElementById('" + thecell.id + "').childNodes[0].select()", 400)
  newfield.onchange = enterField
}


function replaceText(what) {
  var thecell = document.getElementById(what)
  var contents = thecell.childNodes[0].childNodes[0].nodeValue
  hideFields()
  emptyIt(thecell)
  var thefield = thecell.appendChild(document.createElement("input"))
  thefield.size = "1"
  thefield.value = contents
  thefield.onchange = enterField
  setTimeout("document.getElementById('" + what + "').childNodes[0].select()", 400)
}

function hideFields() {
  var thecell
  for (var i = 0; i < tapelength; i++) {
    thecell = document.getElementById("t" + i)
    if (thecell.hasChildNodes() && !thecell.childNodes[0].hasChildNodes()) //There's something in the cell, and it's not a link (which has a textnode as child)
    {
      if (thecell.childNodes[0].value != "") enterField(false, thecell.childNodes[0])
      else emptyIt(thecell)
    }
  }
}

function enterField(evt, thefield) {
  if (enterField.arguments.length == 1)
    if (evt != null) {
      var thefield = evt.target
    } else {
      var thefield = event.srcElement
    }
  var thelink
  var contents = thefield.value
  var thecell = thefield.parentNode
  var theid = thecell.id
  if (theid.charAt(0) == "t") {
    emptyIt(document.getElementById(theid))
    if (contents == "") {
      thecell.onclick = showField
    } else {
      addLink(thecell, contents)
      var nextcellnum = parseInt(theid.substring(1)) + 1
      if (nextcellnum < tapelength) {
        var nextcell = document.getElementById("t" + nextcellnum)
        if (nextcell.hasChildNodes()) {
          replaceText("t" + nextcellnum)
        } else {
          showField(false, nextcell)
        }
      }
    }
  } else {
    if (contents != "") {
      setTimeout("emptyIt(document.getElementById('" + theid + "'))", 100)
      setTimeout("addLink(document.getElementById('" + theid + "'),'" + contents + "')", 200)
    }
    if (!setTimeout("readRules()", 300)) {
      replaceText(theid)
    }
  }
}

function addLink(thecell, contents) {
  var theid = thecell.id
  var thelink = thecell.appendChild(document.createElement("A"))
  var thetext = thelink.appendChild(document.createTextNode(contents))
  thelink.href = "javascript:replaceText('" + theid + "')"
  thelink.style.textDecoration = "none"
  if (theid.charAt(0) == "t") thelink.style.color = "white"
  thecell.onclick = ""
}

function ruleDone(which) {
  var thecell
  var values = new Array()
  var celllist = [1, 2, 3, 5]
  var i = 0
  do {
    thecell = document.getElementById(which + "," + celllist[i])
    if (!thecell.childNodes[0].hasChildNodes()) break
    i += 1
  } while (i < 4)
  return (i)
}

function readRules() {
  var values, whichmenu, menuvalue, whichrule, ruleindex, rulesubindex
  var thebody = document.getElementById("rules")
  var therows = thebody.getElementsByTagName("tr")
  rules = new Array()
  for (var i = 1; i < therows.length; i++) {
    whichrule = therows[i].id
    if (ruleDone(whichrule) >= 2) {
      ruleindex = document.getElementById(whichrule + ",1").childNodes[0].childNodes[0].nodeValue
      rulesubindex = '"' + document.getElementById(whichrule + ",2").childNodes[0].childNodes[0].nodeValue + '"'
      if (rules[ruleindex] != null && (eval('rules[ruleindex][' + rulesubindex + ']') != null || ("#$".indexOf(rulesubindex) > -1 && rules[ruleindex]["$"] != null)))
      // If there is a rule numbered rulindex and either: it already has a clause for the case subindex, or that case is a character and there is already
      // a wildcard rule for for the case of any character...
      {
        alert("You can't define two rules for the same case.  Rule " + ruleindex + "," + rulesubindex)
        return false
      } else {
        if (ruleDone(whichrule) == 4) {
          whichmenu = document.getElementById(whichrule + ",4").childNodes[0]
          menuvalue = whichmenu.options[whichmenu.selectedIndex].value
          writevalue = document.getElementById(whichrule + ",3").childNodes[0].childNodes[0].nodeValue
          statevalue = document.getElementById(whichrule + ",5").childNodes[0].childNodes[0].nodeValue
          if (rules[ruleindex] == null) rules[ruleindex] = new Array()
          eval('rules[ruleindex][' + rulesubindex + '] = [writevalue,menuvalue,statevalue,whichrule]')
        }
      }
    }
  }
  return true
}


function deleteRule(which) {
  var thisrule = document.getElementById(which)
  thisrule.parentNode.removeChild(thisrule)
  readRules()
}

function clearRules() {
  var thebody = document.getElementById("rules")
  var therows = thebody.getElementsByTagName("tr")
  for (var i = therows.length - 1; i > 0; i--) {
    thebody.removeChild(therows[i])
  }
}

function clearTape() {
  var thecell
  for (var i = 0; i < tapelength; i++) {
    thecell = document.getElementById("t" + i)
    emptyIt(thecell)
    thecell.onclick = showField
  }
}

function oneStep() {
  var input, thenode
  hideFields()
  var thecell = document.getElementById("t" + position)
  if (!thecell.hasChildNodes() || thecell.childNodes[0].childNodes[0].nodeValue == "") {
    input = "#"
  } else {
    input = thecell.childNodes[0].childNodes[0].nodeValue
  }
  if (input != "#" && rules[state]["$"] != null) //If the cell contains a character and there is a wildcard rule...
  {
    var therule = rules[state]["$"] //... then that is the applicable rule.
  } else //Otherwise ....
  {
    var therule = eval("rules[state]['" + input + "']") // the applicable rule is identified by the state and the specific input.
  }
  if (therule == null) {
    alert("You have failed to define a rule for this case.")
    exit
  } else {
    if (therule[0] == "#") {
      if (input != "#") {
        emptyIt(thecell)
      }
    } else {
      if (thecell.hasChildNodes()) {
        if (therule[0] != "$") {
          thecell.childNodes[0].childNodes[0].nodeValue = therule[0] //If therule[0] is "$", that means "leave the character in place"
        }
      } else addLink(thecell, therule[0])
    }
    switch (therule[1]) {
      case "left":
        if (position == 0) {
          shiftIt("right")
          moveHead(position, therule[2])
        } else {
          moveHead((position - 1), therule[2])
        }
        break
      case "right":
        if (position == tapelength - 1) {
          shiftIt("left")
          moveHead(position, therule[2])
        } else {
          moveHead((position + 1), therule[2])
        }
        break
      case "halt":
        moveHead(position, therule[2])
        break
    }
  }
}

function tenStep() {
  oneStep()
  oneStep()
  oneStep()
  oneStep()
  oneStep()

  oneStep()
  oneStep()
  oneStep()
  oneStep()
  oneStep()
}

function runIt() {
  if (state != "x") {
    oneStep()
    setTimeout("runIt()", 5)
  }
}

function shiftIt(whichway) {
  hideFields()
  var thecell, contents, thelink, thechar
  if (whichway == "right") {
    thecell = document.getElementById("t" + (tapelength - 1))
    if (thecell.hasChildNodes()) {
      rightbuffer = thecell.childNodes[0].childNodes[0].nodeValue + rightbuffer
      emptyIt(thecell)
    } else {
      rightbuffer = "#" + rightbuffer
    }
    for (var i = tapelength - 2; i >= 0; i--) {
      thecell = document.getElementById("t" + i)
      if (thecell.hasChildNodes()) {
        contents = thecell.childNodes[0].childNodes[0].nodeValue
        emptyIt(thecell)
        thecell = document.getElementById("t" + (i + 1))
        if (thecell.hasChildNodes()) emptyIt(thecell)
        addLink(thecell, contents)
      }
    }
    if (leftbuffer != "") {
      thechar = leftbuffer.charAt(leftbuffer.length - 1)
      if (thechar != "#") {
        thecell = document.getElementById("t0")
        addLink(thecell, thechar)
      }
    }
    leftbuffer = leftbuffer.substring(0, leftbuffer.length - 1)
  } else {
    thecell = document.getElementById("t0")
    if (thecell.hasChildNodes()) {
      leftbuffer += thecell.childNodes[0].childNodes[0].nodeValue
      emptyIt(thecell)
    } else {
      leftbuffer += "#"
    }
    for (var i = 1; i < tapelength; i++) {
      thecell = document.getElementById("t" + i)
      if (thecell.hasChildNodes()) {
        contents = thecell.childNodes[0].childNodes[0].nodeValue
        emptyIt(thecell)
        thecell = document.getElementById("t" + (i - 1))
        if (thecell.hasChildNodes()) emptyIt(thecell)
        addLink(thecell, contents)
      }
    }
    if (rightbuffer != "") {
      thechar = rightbuffer.charAt(0)
      if (thechar != "#") {
        thecell = document.getElementById("t" + tapelength - 1)
        addLink(thecell, thechar)
      }
      rightbuffer = rightbuffer.substring(1)
    }
  }
}

function reSet() {
  moveHead(0, 0)
}

function loadProgram(prognum) {
  var rulenum, thecell, thelink
  var themenu = document.getElementById("programmenu")
  if (!prognum) var prognum = themenu.options[themenu.selectedIndex].value
  clearRules()
  for (var i = 0; i < programs[prognum].length; i++) {
    addRule()
    for (var j = 0; j < 5; j++) {
      thecell = document.getElementById((i + 1) + "," + (j + 1))
      if (j == 3) {
        thecell.childNodes[0].selectedIndex = programs[prognum][i][3]
      } else {
        emptyIt(thecell)
        addLink(thecell, programs[prognum][i][j])
      }
    }
  }
  readRules()
  clearTape()
  reSet()
  for (var i = 0; i < tapes[prognum].length; i++) {
    if (tapes[prognum][i] != null) addLink(document.getElementById("t" + (i + 1)), tapes[prognum][i])
  }
}