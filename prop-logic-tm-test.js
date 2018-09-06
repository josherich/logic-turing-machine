var cases = [
  "(~p>q):~(p&q)",
  "(p&~~p):(~~p&p)",
  "(~p>q)/~(p&q):r&(p>s)",
  "(p/q):~(~p&~q)",
  "(p/q):~(~p&(~q&q))",
  "p:~~p",
  "p:p"
];

cases.map(function(_case, i) {
  programs[5 + i + 1] = programs[5];
  tapes[5 + i + 1] = _case.split('');
});

// tapes[5] = "((~p>q)/~(p&q)):(r&(p>s))".split('')
// tapes[5] = "~~p:p".split('')
// tapes[5] = "(p&p):p".split('')
// tapes[5] = "(p&q):(q&p)".split('')
// tapes[5] = "p:~~p".split('')
// tapes[5] = "p:p".split('')
// tapes[5] = "(p/q):~(~p&~q)".split('')