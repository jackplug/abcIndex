abcIndex
========

Provides a numeric/alphabetical index for a list of items

Usage:

$('#ListOfItems').abcIndex()

Creates a set of links like [a-c] [d-f] [g-r] [s-v] [w-z]

$('#ListOfItems').abcIndex({ lettersets: 7 })

Creates a set of links like [a-c] [d-f] [g-q] [r-s] [t-v] [w-y] [z]

If there are numeric elements, [0-9] is prepended to the set
