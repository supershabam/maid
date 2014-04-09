# maid

An alternative to `npm install` that easily scales and easily hosts private modules. It also scrubs toilets.

## algorithm

// cycle => 
// need a history of what is
{
  unvisited: [
    ['/', 'q@0.9.3'],
    ['/', 'commander@1.3.2'],
    ['/', 'methods@0.1.0', 'something@latest']
  ],
  visited: [
    ['/', 'express@3.5.1'],
    ['/', 'methods@0.1.0']
  ]
}

// pop first off unvisisted
// if unresolved, resolve and push result onto unvisited
// check if cycle, fail
// ensure into node modules
// add sub dependencies to unvisited

A
  B
    C
  D
    C

unvisited     visited
[/a]           []                   
[/a/b, a/d]    [/a]              - a downloaded, placed into position
[/a/b/c, a/d]  [/a, /a/b]        - b downloaded, placed into position
[a/d]          [/a, /a/b, /a/b/c]
[a/d/c]        [/a, /a/b, /a/b/c, /a/d]
[]             [/a, /a/b, /a/b/c, /a/d, /a/d/c]

[a]    []
[b, d] [a]
[d]    [a, a/b]

## methods

resolver ::
implements versions(module) -> [version]
implements stream(module, version) -> readStream

versions(resolvers, module) -> [[version], resolver]
