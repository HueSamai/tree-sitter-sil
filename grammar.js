module.exports = grammar({
    name: 'sil',

    extras: $ => [
        /\s/,
        $.comment,
        $.include,
    ],

    rules: {
        source_file: $ => repeat($.statement),
        
        statement: $ => choice(
            $.block,
            $.ifStmt,
            $.printStmt,
            $.varDecl,
            $.exprStmt,
            $.funcDecl,
            $.returnStmt,
            $.stop,
            $.skip,
            $.whileStmt,
            $.forStmt,
            $.varSet
        ),

        returnStmt: $ => seq(
            "return", 
            optional($.expression),
            ";"
        ),

        stop: $ => seq(
            "stop",
            optional($.expression),
            ";"
        ),

        skip: $ => seq(
            "skip",
            optional($.expression),
            ";"
        ),

        exprStmt: $ => seq(
            optional($.expression),
            ";"
        ),

        ifStmt: $ => prec.left(seq(
            "if",
            field("expr", $.expression),
            field("stmt", $.statement),
            field("else", optional(
                seq(
                    "else",
                    $.statement
                )
            ))
        )),

        block: $ => seq(
            "{",
            repeat($.statement),
            "}"
        ),

        printStmt: $ => seq(
            "print",
            $.expression,
            ";"
        ),
        
        varDecl: $ => seq(
            "var",
            $.identifier,
            optional(
                seq(
                    "=",
                    $.expression
                )
            ),
            ";"
        ),

        varSet: $ => seq(
            $.identifier,
            repeat(
                seq(
                    "[",
                    $.expression,
                    "]"
                )
            ),
            $.assignment_op,
            $.expression,
            ";"
        ),
        
        whileStmt: $ => seq(
            "while",
            $.expression,
            $.statement
        ),

        forStmt: $ => seq(
            "for",
            choice(
                $.varDecl,
                $.varSet,
                ";"
            ),
            optional($.expression),
            ";",
            $.exprStmt,
            $.statement
        ),
        
        exprList: $ => prec(-2, seq(
            $.expression,
            repeat(
                seq(
                    ",",
                    $.expression
                )
            )
        )),

        params: $ => seq(
            $.identifier,
            repeat(
                seq(
                    ",",
                    $.identifier
                )
            )
        ),

        funcDecl: $ => seq(
            "fun",
            field("name", $.identifier),
            "(",
            field("params", optional($.params)),
            ")",
            field("body", $.statement)
        ),

        expression: $ => choice(
            $.logic,
            $.conditional,
            $.term,
            $.factor,
            $.unary,
            $.listAccess,
            $.call,
            $.inputExpr,
            $.primary
        ),
        
        inputExpr: $ => prec(-1, seq(
            "input",
            $.expression
        )),

        logic: $ => prec.left(0, seq(
            $.expression,
            choice("and", "or"),
            $.expression
        )),

        conditional: $ => prec.left(1, seq(
            $.expression,
            choice(
                "==",
                "!=",
                ">=",
                "<=",
                ">",
                "<",
            ),
            $.expression
        )),

        term: $ => prec.left(2, seq(
            $.expression,
            choice("+", "-"),
            $.expression
        )),

        factor: $ => prec.left(3, seq(
            $.expression,
            choice("*", "/"),
            $.expression
        )),

        unary: $ => prec(4, seq(
            choice("!", "-"),
            $.expression
        )),

        listAccess: $ => prec(5, seq(
            $.expression,
            repeat1(
                seq(
                    "[",
                    $.expression,
                    "]"
                )
            )
        )),

        call: $ => prec(6, seq(
            $.expression,
            optional(seq(".", $.identifier)),
            repeat1(seq("(", optional($.exprList), ")"))
        )),

        primary: $ => prec(7, choice(
            seq("(", $.expression, ")"),
            $.identifier,
            $.string,
            $.number,
            "true",
            "false",
            "novalue",
            seq("[", optional($.exprList), "]")
        )),

        identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,
        
        number: $ => /\d+(\.\d+)?/,

        string: $ => seq(
            '"',
            repeat(choice(
                token.immediate(prec(1, /[^\\"]+/)),
                token.immediate(prec(1, seq("\\", /./))),
            )),
            prec(0, '"'),
        ),

        assignment_op: $ => choice(
            "=",
            "*=",
            "/=",
            "+=",
            "-="
        ),

        comment: $ => seq("//", /.*/),

        include: $ => seq("#", /.*/)
    }
});
