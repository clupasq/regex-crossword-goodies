(function () {
  var addScript = function(url) {
    var s = document.createElement('script');
    s.src = chrome.extension.getURL(url);
    s.onload = function() { this.parentNode.removeChild(this); };
    (document.head||document.documentElement).appendChild(s);
  };

  addScript('regex-colorizer.js');
  addScript('regex-crossword.js');

}());


