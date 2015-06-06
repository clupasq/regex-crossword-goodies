(function (w, d) {
  'use strict';

  var config, logger;

  config = w.goodies = w.goodies || { debugMode: 'on' };

  logger = {};
  ['debug', 'log', 'info', 'error', 'warn'].forEach(function (funcName) {
    logger[funcName] = function () {
      if (config.debugMode) {
        console[funcName].apply(console, arguments);
      }
    };
  });

  function addPlayerPuzzlesPageFunctionality(scope, titleElement) {
    var chk, ui = d.createElement('div');
    ui.innerHTML = '<input type="checkbox" id="chkTodo" /> &nbsp;' +
                   '<label for="chkTodo">Only show unsolved unambiguous puzzles</label>';

    titleElement.parentElement.insertBefore(ui, titleElement.nextElementSibling);

    chk = d.getElementById('chkTodo');
    chk.addEventListener('click', function () {
      scope.allPuzzles = scope.allPuzzles || scope.puzzles;

      if (this.checked) {
        scope.puzzles = scope.allPuzzles.filter(function (p) {
          return !(p.solved || p.ambiguous);
        });
      } else {
        scope.puzzles = scope.allPuzzles;
      }

      scope.$apply();
    });
  }

  function addPuzzleFunctionality(puzzleScope) {
    if (!puzzleScope.puzzle) {
      // puzzle not yet loaded...
      return;
    }

    logger.info('puzzle: ', puzzleScope.puzzle);
  }

  function onViewChanged() {
    logger.log('View changed!');

    var scope, puzzleListTitleElement,
      puzzleElement = d.querySelector('div.challenge-puzzle') || d.querySelector('div.playerpuzzle');

    if (puzzleElement) {
      scope = angular.element(puzzleElement).scope();
      addPuzzleFunctionality(scope, puzzleElement);
      return;
    }

    puzzleListTitleElement = d.querySelector('div.container h2');

    if (puzzleListTitleElement && puzzleListTitleElement.textContent === 'Puzzles') {
      scope = angular.element(puzzleListTitleElement).scope();
      addPlayerPuzzlesPageFunctionality(scope, puzzleListTitleElement);
    }
  }


  function start() {
    config.rootElement = d.querySelector('div[ng-view]');

    if (!config.rootElement) {
      logger.warn('root element not yet found.');
      w.setTimeout(start, 100);
      return;
    }

    logger.info('root element found!');
    config.rootScope = angular.element(config.rootElement).scope().$root;

    config.rootScope.$on('$viewContentLoaded', onViewChanged);
    onViewChanged();
  }

  start();

}(window, document));

