// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {

  var elementsWithClassName = [];
  
  function addIfHasClass(element) {
    if (element.classList && element.classList.contains(className)) {
      elementsWithClassName.push(element);
    }
    
    element.childNodes.forEach(function(child) {
      addIfHasClass(child);
    });
  }
  
  addIfHasClass(document.body);
  return elementsWithClassName;

}
