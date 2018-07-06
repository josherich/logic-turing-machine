// JavaScript Document

function isVariable(whatchar) {
   return ("pqrs".indexOf(whatchar) > -1)
}

function isUnaryConnective(whatchar) {
    return (whatchar == "~")
}

function isDyadicConnective(whatchar) {
    return ("&/>:".indexOf(whatchar) > -1)
}

function isParen(whatchar) {
    return ("()".indexOf(whatchar) > -1)
}
	

function findCloseParen(whereopenparen,whatstring) {
	if (findCloseParen.arguments.length == 1) {whatstring = thestring}
	var opens = 1
	var n=whereopenparen + 1
	while (opens > 0 && n<whatstring.length) {
		if (whatstring.charAt(n) == "(") {opens += 1}
		if (whatstring.charAt(n) == ")") {opens -= 1}
		n+=1
	}
	return n-1
}

function findFirstDyadic(whatstring){
     var st = whatstring
     var opens = 0
     for (i=0; i<st.length; i++) {
        c = st.charAt(i)
        if (c == "(") {opens += 1}
        if (c == ")") {opens -= 1}
        if (isDyadicConnective(c) && opens == 0) {return i}
     }
     return "-1"
}

function polishOf(whatstatement) {
    var st = whatstatement
   if (st.charAt(0) == "(" && findCloseParen(0,st) == st.length-1) {
        return polishOf(st.substring(1,st.length-1))
    }
   var d = findFirstDyadic(st)
   if (d>-1) {
      return (polishOf(st.substring(0,d)) + polishOf(st.substring(d+1,st.length)) + st.charAt(d))
   }
   if (isVariable(st)) {
        return st
   }
   if (st.charAt(0) == "~") {
        var e = 1
        while (st.charAt(e) == "~") {
            e = e+1
        }
        if (e == st.length-1) {
            return st.substr(1) + "~"
        }
        if (st.charAt(e) == "(") {
            return polishOf(st.substr(e)) + st.substr(0,e)
        }
    }
}
