# Regex Crossword Goodies

This is a Google Chrome Extension that provides a set of enhancements for the http://regexcrossword.com/ website.

## Installation

Make sure you're using [Google Chrome](http://www.google.com/chrome/). The extension is published [here](https://chrome.google.com/webstore/detail/regex-crossword-goodies/cfcmapoondlingnafablpgekhjiedckl), in the Chrome Web Store.

## Functionality

* **Load/Save Puzzles** - you can copy/paste a textual representation of the current solution in order to resume it later.
* **Regex Validation** - as soon as you complete a row/column, the corresponding regex clues are automatically validated and their status is shown in red or green. This also works for the newly introduced hexagonal puzzles.
* **Regex Explanation** - the clues are links to [the Regexper website](https://regexper.com).
* **Player Puzzle List Filter** - (only for authenticated users) - allows you to filter toggle between showing the entire puzzle list, or just the unsolved unambiguous puzzles available.
 
Have fun playing this awesome game!

## Release notes

### 0.1.8

* Added a syntax-highlighted view of the regex patterns.
* Better UI for redirecting to https://regexper.com

### 0.1.7

* Made the puzzle clues link to https://regexper.com for explanations.

### 0.1.6

* Use color-blind friendly colors ([issue #2](https://github.com/wolfascu/regex-crossword-goodies/issues/2))

### 0.1.5

* Added auto-validation of the answer when a puzzle page is loaded (because RegexCrossword now saves answers).

### 0.1.4

* Fixed Player puzzles page bug - filtering functionality was not working (did not wait for the data to arrive from the server).

### 0.1.3

* Player puzzles page - replaced the *Only show unsolved unambiguous* option with two options: *Hide solved* and *Hide ambiguous*.

### 0.1.2

Initial Release
