var program5 = [
    [0, "#", "#", 1, 'start'],
    ['erase', '$', '#', 0, 'erase'],
    ['erase', '#', '#', 1, 'compute'],
    ['compute', '#', '#', 1, 'compute'],
    ['compute', "@", "#", 1, 'validate'],
    ['validate', "1", "#", 1, 'validate'],
    ['validate', "#", "T", 2, "x"],
    ['validate', "0", "#", 1, 'fail'], // fail
    ['fail', "$", "#", 1, 'fail'],
    ['fail', "#", "F", 'validate', "x"],
]

program5 = program5.concat(transform_negate())
program5 = program5.concat(transform_recursive_dyalic())

program5 = program5.concat(generateCompute("&", thekey[0]))
program5 = program5.concat(generateCompute("/", thekey[1]))
program5 = program5.concat(generateCompute(">", thekey[2]))
program5 = program5.concat(generateCompute(":", thekey[3]))

program5 = program5.concat(generateWrite("p", "0011001100110011"))
program5 = program5.concat(generateWrite("q", "0101010101010101"))
program5 = program5.concat(generateWrite("r", "0000000011111111"))
program5 = program5.concat(generateWrite("s", "0000111100001111"))

program5 = program5.concat(generateNegate())

// program5 = instNameToIndex(program5)

function instNameToIndex(prog) {
    var instDict = {};
    var index = 0;
    return prog.map(function(inst) {
        if (inst[0] !== 'x') {
            if (!instDict.hasOwnProperty(inst[0])) {
                instDict[inst[0]] = index;
                inst[0] = index;
                index++;
            } else {
                inst[0] = instDict[inst[0]];
            }
        }
        if (inst[4] !== 'x') {
            if (!instDict.hasOwnProperty(inst[4])) {
                instDict[inst[4]] = index;
                inst[4] = index;
                index++;
            } else {
                inst[4] = instDict[inst[4]];

            }
        }
        return inst;
    })
}


function transform_recursive_dyalic() {
    var right = 1,
        left = 0,
        halt = 2;
    return [
        // 1. move right close parenthesis
        ["sc_)", "(", "(", right, "sc_)"],
        ["sc_)", "p", "p", right, "sc_)"],
        ["sc_)", "q", "q", right, "sc_)"],
        ["sc_)", "r", "r", right, "sc_)"],
        ["sc_)", "s", "s", right, "sc_)"],
        ["sc_)", "&", "&", right, "sc_)"],
        ["sc_)", "/", "/", right, "sc_)"],
        ["sc_)", ">", ">", right, "sc_)"],
        ["sc_)", ":", ":", right, "sc_)"],
        ["sc_)", "~", "~", right, "sc_)"],
        ["sc_)", "[", "[", right, "sc_)"],
        ["sc_)", ")", "#", left, "sc_("],
        // ["sc_)", "#", "|", left, "rm_space"],

        ["sc_)", "|", "#", left, "rm_space"],
        ["sc_)", "#", "|", left, "seek_head"],
        ["seek_head", "p", "p", left, "seek_head"],
        ["seek_head", "q", "q", left, "seek_head"],
        ["seek_head", "r", "r", left, "seek_head"],
        ["seek_head", "s", "s", left, "seek_head"],
        ["seek_head", "&", "&", left, "seek_head"],
        ["seek_head", "/", "/", left, "seek_head"],
        ["seek_head", ">", ">", left, "seek_head"],
        ["seek_head", ":", ":", left, "seek_head"],
        ["seek_head", "~", "~", left, "seek_head"],

        ["seek_head", "[", "_", left, "seek_head"],
        ["seek_head", "_", "@", left, "seek_head"],
        ["seek_head", "@", "@", left, "seek_head"],
        ["seek_head", "#", "[", right, "sc_dy"],

        ["sc_(", "p", "p", left, "sc_("],
        ["sc_(", "q", "q", left, "sc_("],
        ["sc_(", "r", "r", left, "sc_("],
        ["sc_(", "s", "s", left, "sc_("],
        ["sc_(", "&", "&", left, "sc_("],
        ["sc_(", "/", "/", left, "sc_("],
        ["sc_(", ">", ">", left, "sc_("],
        ["sc_(", ":", ":", left, "sc_("],
        ["sc_(", "~", "~", left, "sc_("],
        ["sc_(", "#", "_", left, "sc_("],
        ["sc_(", "[", "_", left, "sc_("],
        ["sc_(", "_", "@", left, "sc_("],
        ["sc_(", "@", "@", left, "sc_("],

        ["sc_(", "(", "[", right, "sc_dy"],

        ["sc_dy", "p", "p", right, "sc_dy"],
        ["sc_dy", "q", "q", right, "sc_dy"],
        ["sc_dy", "r", "r", right, "sc_dy"],
        ["sc_dy", "s", "s", right, "sc_dy"],
        ["sc_dy", "~", "~", right, "sc_dy"],
        ["sc_dy", "[", "_", right, "sc_dy"],
        ["sc_dy", "#", "#", right, "sc_dy"],
        ["sc_dy", "_", "_", right, "sc_dy"],
        ["sc_dy", "@", "@", right, "sc_dy"],

        ["sc_dy", "&", "&", right, "valid_dy"],
        ["sc_dy", "/", "/", right, "valid_dy"],
        ["sc_dy", ">", ">", right, "valid_dy"],
        ["sc_dy", ":", ":", right, "valid_dy"],

        ["valid_dy", "#", "#", left, "mov_dy"],
        ["valid_dy", "p", "p", left, "mov_dy"],
        ["valid_dy", "q", "q", left, "mov_dy"],
        ["valid_dy", "r", "r", left, "mov_dy"],
        ["valid_dy", "s", "s", left, "mov_dy"],
        ["valid_dy", "_", "_", left, "mov_dy"],
        ["valid_dy", "[", "_", left, "mov_dy"],

        ["valid_dy", "&", "&", halt, "sc_dy"],
        ["valid_dy", "/", "/", halt, "sc_dy"],
        ["valid_dy", ">", ">", halt, "sc_dy"],
        ["valid_dy", ":", ":", halt, "sc_dy"],
        ["valid_dy", "~", "~", right, "sc_dy"],
        ["valid_dy", "@", "@", right, "sc_dy"],

        ["mov_dy", "&", "_", right, "mov_&"],
        ["mov_dy", "/", "_", right, "mov_/"],
        ["mov_dy", ">", "_", right, "move_>"],
        ["mov_dy", ":", "_", right, "move_:"],

        ["mov_&", "$", "$", right, "mov_&"],
        ["mov_&", "#", "&", left, "sc_)"],

        ["mov_/", "$", "$", right, "mov_/"],
        ["mov_/", "#", "/", left, "sc_)"],

        ["move_>", "$", "$", right, "move_>"],
        ["move_>", "#", ">", left, "sc_)"],

        ["move_:", "$", "$", right, "move_:"],
        ["move_:", "#", ":", left, "sc_)"],

        // search for open parenthesis
        ["uk_8", "p", "p", left, "uk_8"],
        ["uk_8", "q", "q", left, "uk_8"],
        ["uk_8", "r", "r", left, "uk_8"],
        ["uk_8", "s", "s", left, "uk_8"],
        ["uk_8", "~", "~", left, "uk_8"],
        ["uk_8", "&", "&", left, "uk_8"],
        ["uk_8", "/", "/", left, "uk_8"],
        ["uk_8", ">", ">", left, "uk_8"],
        ["uk_8", ":", ":", left, "uk_8"],
        ["uk_8", "_", "_", left, "uk_8"],
        ["uk_8", "[", "[", halt, "sc_)"],
        ["uk_8", "(", "(", halt, "sc_)"],


        ["rm_space", "#", "#", left, "rm_space"],
        ["rm_space", "&", "#", right, "cp_&"],
        ["rm_space", "/", "#", right, "cp_/"],
        ["rm_space", ">", "#", right, "cp_>"],
        ["rm_space", ":", "#", right, "cp_:"],
        ["rm_space", "~", "#", right, "cp_~"],
        ["rm_space", "p", "#", right, "cp_p"],
        ["rm_space", "q", "#", right, "cp_q"],
        ["rm_space", "r", "#", right, "cp_r"],
        ["rm_space", "s", "#", right, "cp_s"],
        ["rm_space", "@", "#", left, "rm_space"],
        ["rm_space", "_", "#", left, "rm_space"],
        ["rm_space", "[", "#", right, "sk_space"],
        ["sk_space", "#", "#", right, "sk_space"],
        ["sk_space", "$", "$", halt, "compute"],
        ["compute", "|", "#", right, 'start'], // start validate

        ["cp_&", "#", "#", right, "cp_&"],
        ["cp_&", "$", "$", left, "wr_&"],
        ["wr_&", "#", "&", left, "rm_space"],

        ["cp_/", "#", "#", right, "cp_/"],
        ["cp_/", "$", "$", left, "wr_/"],
        ["wr_/", "#", "/", left, "rm_space"],

        ["cp_>", "#", "#", right, "cp_>"],
        ["cp_>", "$", "$", left, "wr_>"],
        ["wr_>", "#", ">", left, "rm_space"],

        ["cp_:", "#", "#", right, "cp_:"],
        ["cp_:", "$", "$", left, "wr_:"],
        ["wr_:", "#", ":", left, "rm_space"],

        ["cp_~", "#", "#", right, "cp_~"],
        ["cp_~", "$", "$", left, "wr_~"],
        ["wr_~", "#", "~", left, "rm_space"],

        ["cp_p", "#", "#", right, "cp_p"],
        ["cp_p", "$", "$", left, "wr_p"],
        ["wr_p", "#", "p", left, "rm_space"],

        ["cp_q", "#", "#", right, "cp_q"],
        ["cp_q", "$", "$", left, "wr_q"],
        ["wr_q", "#", "q", left, "rm_space"],

        ["cp_r", "#", "#", right, "cp_r"],
        ["cp_r", "$", "$", left, "wr_r"],
        ["wr_r", "#", "r", left, "rm_space"],

        ["cp_s", "#", "#", right, "cp_s"],
        ["cp_s", "$", "$", left, "wr_s"],
        ["wr_s", "#", "s", left, "rm_space"],

        ["uk_8", "#", "#", halt, "end"], // end

    ]
}

function transform_negate() {
    var right = 1,
        left = 0,
        halt = 2;
    return [
        // scan right until ~
        ['start', "p", "p", right, 'start'],
        ['start', "q", "q", right, 'start'],
        ['start', "r", "r", right, 'start'],
        ['start', "s", "s", right, 'start'],
        ['start', "&", "&", right, 'start'],
        ['start', "/", "/", right, 'start'],
        ['start', ">", ">", right, 'start'],
        ['start', ":", ":", right, 'start'],
        ['start', "(", "(", right, 'start'],
        ['start', ")", ")", right, 'start'],
        ['start', "~", "~", right, "vldt_~"],
        ['start', "#", "#", left, "rt_head"],

        // ["rt_head", "$", "$", left, "rt_head"],
        // ["rt_head", "#", "#", right, s+31],

        ["vldt_~", "~", "~", right, "vldt_~"],
        ["vldt_~", "p", "~", left, "swp_p"],
        ["vldt_~", "q", "~", left, "swp_q"],
        ["vldt_~", "r", "~", left, "swp_r"],
        ["vldt_~", "s", "~", left, "swp_s"],

        ["vldt_~", "(", "(", left, "mk_~"],

        ["vldt_~", ")", ")", right, 'start'],
        ["vldt_~", "&", "&", right, 'start'],
        ["vldt_~", "/", "/", right, 'start'],
        ["vldt_~", ">", ">", right, 'start'],
        ["vldt_~", ":", ":", right, 'start'],

        ["vldt_~", "#", "#", left, "rt_head"],
        // return to head
        ["rt_head", "$", "$", left, "rt_head"],
        ["rt_head", "#", "#", right, "sc_)"],

        ["swp_p", "$", "p", left, "sc_left"],
        ["swp_q", "$", "q", left, "sc_left"],
        ["swp_r", "$", "r", left, "sc_left"],
        ["swp_s", "$", "s", left, "sc_left"],
        ["sc_left", "$", "$", left, "sc_left"],
        ["sc_left", "#", "#", right, 'start'],

        ["mk_~", "~", "@", right, "rm_par"],
        ["rm_par", "(", "(", right, "rm_par"],
        ["rm_par", "~", "~", right, "rm_par"],
        ["rm_par", "p", "p", right, "rm_par"],
        ["rm_par", "q", "q", right, "rm_par"],
        ["rm_par", "r", "r", right, "rm_par"],
        ["rm_par", "s", "s", right, "rm_par"],
        ["rm_par", "&", "&", right, "rm_par"],
        ["rm_par", "/", "/", right, "rm_par"],
        ["rm_par", ">", ">", right, "rm_par"],
        ["rm_par", ":", ":", right, "rm_par"],
        ["rm_par", "]", "]", right, "rm_par"],
        ["rm_par", ")", ")", left, "find_("],

        ["find_(", "p", "p", left, "find_("],
        ["find_(", "q", "q", left, "find_("],
        ["find_(", "r", "r", left, "find_("],
        ["find_(", "s", "s", left, "find_("],
        ["find_(", "&", "&", left, "find_("],
        ["find_(", "/", "/", left, "find_("],
        ["find_(", ">", ">", left, "find_("],
        ["find_(", ":", ":", left, "find_("],
        ["find_(", "~", "~", left, "find_("],
        ["find_(", "]", "]", left, "find_("],
        ["find_(", "[", "[", left, "find_("],

        ["find_(", "(", "(", left, "valid_~"],
        ["valid_~", "@", "*", right, "shf_l"],
        ["valid_~", "&", "&", right, ")2]"],
        ["valid_~", "/", "/", right, ")2]"],
        ["valid_~", ">", ">", right, ")2]"],
        ["valid_~", ":", ":", right, ")2]"],
        ["valid_~", "~", "~", right, ")2]"],

        [")2]", ")", "]", right, "rm_par"],
        [")2]", "p", "p", right, ")2]"],
        [")2]", "q", "q", right, ")2]"],
        [")2]", "r", "r", right, ")2]"],
        [")2]", "s", "s", right, ")2]"],
        [")2]", "&", "&", right, ")2]"],
        [")2]", "/", "/", right, ")2]"],
        [")2]", ">", ">", right, ")2]"],
        [")2]", ":", ":", right, ")2]"],
        [")2]", "~", "~", right, ")2]"],
        [")2]", "[", "[", right, ")2]"],
        [")2]", "]", "]", right, ")2]"],
        [")2]", "(", "[", right, ")2]"],

        ["shf_l", "*", "*", right, "shf_l"],
        ["shf_l", "~", "*", left, "shf_~"],
        ["shf_l", "p", "*", left, "shf_p"],
        ["shf_l", "q", "*", left, "shf_q"],
        ["shf_l", "r", "*", left, "shf_r"],
        ["shf_l", "s", "*", left, "shf_s"],
        ["shf_l", "&", "*", left, "shf_&"],
        ["shf_l", "/", "*", left, "shf_/"],
        ["shf_l", ">", "*", left, "shf_>"],
        ["shf_l", ":", "*", left, "shf_:"],
        ["shf_l", ")", "*", left, "shf_)"],
        ["shf_l", "(", "*", left, "shf_("],
        ["shf_l", "[", "*", left, "shf_["],
        ["shf_l", "]", "*", left, "shf_]"],

        ["shf_p", "*", "p", right, "shf_l"],
        ["shf_q", "*", "q", right, "shf_l"],
        ["shf_r", "*", "r", right, "shf_l"],
        ["shf_s", "*", "s", right, "shf_l"],
        ["shf_&", "*", "&", right, "shf_l"],
        ["shf_/", "*", "/", right, "shf_l"],
        ["shf_>", "*", ">", right, "shf_l"],
        ["shf_:", "*", ":", right, "shf_l"],
        ["shf_~", "*", "~", right, "shf_l"],
        ["shf_(", "*", "(", right, "shf_l"],
        ["shf_[", "*", "(", right, "shf_l"],
        ["shf_]", "*", ")", right, "shf_l"],
        ["shf_)", "*", ")", right, "shf_done"],

        ["shf_done", "*", "~", left, "sc_left"],
        // ["mv_right", "$", "$", left, "mv_right"],
        // ["mv_right", "#", "#", right, "mv_~"],
    ]
}

function generateNegate() {
    var right = 1,
        left = 0,
        halt = 2;
    var s = 'negate-'

    return [
        ["compute", "~", "#", right, s + 1],
        [s + 1, "$", "$", right, s + 1],
        [s + 1, "#", "#", left, s + 2],
        [s + 2, "@", "@", left, s + 3],

        [s + 2, "1", "0", left, s + 2],
        [s + 2, "0", "1", left, s + 2],

        [s + 3, "$", "$", left, s + 3],
        [s + 3, "#", "~", right, "compute"],
    ]
}

function generateCompute(op, looktable) {
    var right = 1,
        left = 0,
        halt = 2;
    var s = 'compute-' + op;

    var move_right = s + 1;
    var start = s + 2;
    var end = s + 37;
    return [
        ["compute", op, "#", right, s + 1],

        [move_right, "$", "$", right, move_right],
        [move_right, "#", "#", left, start],
        [start, "@", "#", left, end],

        [start, "1", "#", left, s + 3],
        [s + 3, "$", "$", left, s + 4],
        [s + 4, "$", "$", left, s + 5],
        [s + 5, "$", "$", left, s + 6],
        [s + 6, "$", "$", left, s + 7],

        [s + 7, "$", "$", left, s + 8],
        [s + 8, "$", "$", left, s + 9],
        [s + 9, "$", "$", left, s + 10],
        [s + 10, "$", "$", left, s + 11],

        [s + 11, "$", "$", left, s + 12],
        [s + 12, "$", "$", left, s + 13],
        [s + 13, "$", "$", left, s + 14],
        [s + 14, "$", "$", left, s + 15],

        [s + 15, "$", "$", left, s + 16],
        [s + 16, "$", "$", left, s + 17],
        [s + 17, "$", "$", left, s + 18],
        [s + 18, "$", "$", left, s + 19],

        [s + 19, "0", looktable[1][0], right, move_right],
        [s + 19, "1", looktable[1][1], right, move_right],


        [start, "0", "#", left, s + 20],
        [s + 20, "$", "$", left, s + 21],
        [s + 21, "$", "$", left, s + 22],
        [s + 22, "$", "$", left, s + 23],
        [s + 23, "$", "$", left, s + 24],

        [s + 24, "$", "$", left, s + 25],
        [s + 25, "$", "$", left, s + 26],
        [s + 26, "$", "$", left, s + 27],
        [s + 27, "$", "$", left, s + 28],

        [s + 28, "$", "$", left, s + 29],
        [s + 29, "$", "$", left, s + 30],
        [s + 30, "$", "$", left, s + 31],
        [s + 31, "$", "$", left, s + 32],

        [s + 32, "$", "$", left, s + 33],
        [s + 33, "$", "$", left, s + 34],
        [s + 34, "$", "$", left, s + 35],
        [s + 35, "$", "$", left, s + 36],

        [s + 36, "0", looktable[0][0], right, move_right],
        [s + 36, "1", looktable[0][1], right, move_right],

        [end, "$", "$", left, end],
        [end, "#", '#', left, "erase"],
        // [end, "#", op, right, "compute"],
    ];

}

function generateWrite(read, write) {
    var right = 1,
        left = 0,
        halt = 2;
    var s = 'write-' + read;
    return [
        ["compute", read, "#", right, s + 1],
        [s + 1, "$", "$", right, s + 1],
        [s + 1, "#", "@", right, s + 2],

        [s + 2, "#", write[0], right, s + 3],
        [s + 3, "#", write[1], right, s + 4],
        [s + 4, "#", write[2], right, s + 5],
        [s + 5, "#", write[3], right, s + 6],

        [s + 6, "#", write[4], right, s + 7],
        [s + 7, "#", write[5], right, s + 8],
        [s + 8, "#", write[6], right, s + 9],
        [s + 9, "#", write[7], right, s + 10],

        [s + 10, "#", write[8], right, s + 11],
        [s + 11, "#", write[9], right, s + 12],
        [s + 12, "#", write[10], right, s + 13],
        [s + 13, "#", write[11], right, s + 14],

        [s + 14, "#", write[12], right, s + 15],
        [s + 15, "#", write[13], right, s + 16],
        [s + 16, "#", write[14], right, s + 17],
        [s + 17, "#", write[15], left, s + 18],

        [s + 18, "$", "$", left, s + 18],
        [s + 18, "#", read, right, "compute"],
    ]
}

programs[5] = program5;
tapes[5] = "(p&~~p):(~~p&p)".split('')
