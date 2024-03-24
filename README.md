# How to install

## For neovim in packer

Add this somewhere in your treesitter configs.
```lua
local parser_config = require "nvim-treesitter.parsers".get_parser_configs()
parser_config.sil = {
  install_info = {
    url = "https://github.com/HueSamai/tree-sitter-sil.git",
    files = {"src/parser.c"},
    branch = "master",
    generate_requires_npm = false, 
    requires_generate_from_grammar = false,
  },
  filetype = "sil", 
}
```
Then you want to go to where your `nvim-data` folder is stored, and then go into your queries directory (for packer it will be under `site\pack\packer\start\nvim-treesitter\queries`), 
then create a new directory called `sil` and copy the `highlights.scm` from this repo into the `sil` directory you created.
