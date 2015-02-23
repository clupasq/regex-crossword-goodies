(function () {
  'use strict';

  var emptyCellPlaceholder = '\xB7';

  var table = document.querySelector('table[ng-rotate]');
  var textBoxes = table.querySelectorAll('td input[type="text"]');
  var scope = angular.element(table).scope();

  var rowCount = scope.puzzle.answer.rows.length;
  var colCount = scope.puzzle.answer.rows[0].length;

  var getAnswerChar = function (textBox) {
    if (textBox.classList.contains('space')) {
      return ' ';
    }
    if (textBox.value) {
      return textBox.value.toUpperCase();
    }
    return null;
  };

  var getAnswerCharAsText = function (textBox) {
    return getAnswerChar(textBox) || emptyCellPlaceholder;
  };

  var save = function () {
    var answerText = Array.prototype.map.call(textBoxes, getAnswerCharAsText).join('');
    window.prompt('Here\'s your solution so far:', answerText);
  };

  var load = function () {
    var saved = window.prompt('Enter previous solution:');

    if (!saved) {
      return;
    }

    saved.split('').forEach(function (l,idx) { 
      if (idx >= textBoxes.length) {
        return;
      }

      var row = Math.floor(idx / colCount);
      var col = idx % colCount;
      var cell = scope.puzzle.answer.rows[row][col];
      cell.value = l === emptyCellPlaceholder ? undefined : l;

      var correspondingTextBox = textBoxes[idx];     
      if (l === ' ') {
        correspondingTextBox.classList.add('space');
      } else {
        correspondingTextBox.classList.remove('space');
      }
    });

    scope.$apply();
  };
  

  var showErrors = function () {
    var model = {
      getHorizontalPatterns: function () {
        return scope.puzzle.patternsY.patterns;
      },
      getVerticalPatterns: function () {
        return scope.puzzle.patternsX.patterns;
      },
      getHorizontalWord: function (wordIdx) {
        var word = '';
        var i, cellIndex, character;

        for (i = 0; i < colCount; i++) {
          cellIndex = wordIdx * colCount + i;
          character = getAnswerChar(textBoxes[cellIndex]);
          if(!character) { return null; }
          word += character;
        }
        return word;
      },
      getVerticalWord: function (wordIdx) {
        var word = '';
        var i, cellIndex, character;
        
        for (i = 0; i < rowCount; i++) {
          cellIndex = wordIdx + i * colCount;
          character = getAnswerChar(textBoxes[cellIndex]);
          if(!character) { return null; }
          word += character;
        }
        return word;
      }
    };

    var view = {
      regexDOMElements: table.querySelectorAll('th'),
      getRegexElementAtIndex: function (idx) {
        return view.regexDOMElements[idx];
      },
      getHorizontalExpressionElements: function (rowNo){
        var index = (colCount + 1) + 2 * rowNo;
        return [index, index + 1].map(this.getRegexElementAtIndex);
      },
      getVerticalExpressionElements: function (colNo){
        var index1 = colNo + 1;
        var index2 = index1 + rowCount * 2 + colCount + 1;
        return [index1, index2].map(this.getRegexElementAtIndex);
      },
      applyFormatting: function (element, validationResult) {
        element.classList.remove('alert-success');
        element.classList.remove('alert-danger');

        switch(validationResult){
          case 'ok':
            element.classList.add('alert-success');
            break;
          case 'fail':
            element.classList.add('alert-danger');
            break;
        }
      },
      renderHorizontalResults: function (idx, resultA, resultB){
        var elements = this.getHorizontalExpressionElements(idx);
        this.applyFormatting(elements[0], resultA);
        this.applyFormatting(elements[1], resultB);
      },
      renderVerticalResults: function (idx, resultA, resultB){
        var elements = this.getVerticalExpressionElements(idx);
        this.applyFormatting(elements[0], resultA);
        this.applyFormatting(elements[1], resultB);
      }
    };

    var controller = {
      validate: function (expressionText, word){
        if(expressionText && word) {
          var re = new RegExp('^' + expressionText + '$');
          return word.match(re) ? 'ok' : 'fail';
        }
        return 'inconclusive';
      },
      validateHorizontalExpressions: function () {
        model.getHorizontalPatterns().forEach(function (pattern, idx) {
          var word = model.getHorizontalWord(idx);
          view.renderHorizontalResults(idx, 
            controller.validate(pattern.a.value, word), 
            controller.validate(pattern.b.value, word));
        });        
      },
      validateVerticalExpressions: function () {
        model.getVerticalPatterns().forEach(function (pattern, idx) {
          var word = model.getVerticalWord(idx);
          view.renderVerticalResults(idx, 
            controller.validate(pattern.a.value, word), 
            controller.validate(pattern.b.value, word));
        });    
      },
      showErrors: function () {
        controller.validateHorizontalExpressions();
        controller.validateVerticalExpressions();
      }
    };

    return controller.showErrors;
  };

  var setupControls = function () {
    var existingControlBar = document.querySelector('p.controls');
    var newControlBar = document.createElement('p');
    existingControlBar.parentElement.insertBefore(newControlBar, existingControlBar.nextSibling);

    var addBtn = function (text, callback) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = text;
      btn.className = 'btn btn-info btn-sm';
      btn.addEventListener('click', callback);
      newControlBar.appendChild(btn);
    };

    addBtn('Save', save);
    addBtn('Load', load);
    addBtn('Show Errors', showErrors());
  };

  setupControls();
}());

