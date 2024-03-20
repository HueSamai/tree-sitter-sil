[
    "fun"
    "return"
    "if"
    "else"
    "for"
    "while"
    "stop"
    "skip"
    "var"
    "print"
    "input"
] @keyword

(identifier) @variable
(string) @string
(number) @number
(block) @local.scope
(funcDecl name: (identifier) @function)
(comment) @comment
(include) @keyword.directive
(escapeChar) @constant

((identifier) @function.builtin
 (#match? @function.builtin "(num|read|push|pop|exists|rng|seed|length|round|write)"))

[
    ";"
    "."
    ","
] @punctuation.delimiter

[
    "="
    "-"
    "+"
    "/"
    "*"
    "-="
    "+="
    "*="
    "/="
    "=="
    "!="
    ">="
    "<="
    ">"
    "<"
    "!"
    "and"
    "or"
] @operator

[
    "("
    ")"
    "{"
    "}"
    "["
    "]"
] @punctuation.bracket

[
    "true"
    "false"
    "novalue"
] @constant

