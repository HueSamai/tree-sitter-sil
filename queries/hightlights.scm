[
    "fun"
    "return"
    "if"
    "else"
    "for"
    "while"
    "stop"
    "skip",
    "var",
    "print",
    "input"
] @kewyord

((identifier) @function.builtin (#match? @function.builtin "^(num|read|write|exists|rng|seed|push|pop)$"))
(identifier) @variable
(string) @string
(number) @number
(block) @local.scope
(funcDecl name: (identifier) @function)
(funcDecl params: (params (identifier) @variable.parameter))
[
    (true)
    (false)
    (novalue)
] @constant.builtin

[
    ";"
    "."
    ","
] @punctuation.delimiter

[
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
    "!",
    "and",
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
