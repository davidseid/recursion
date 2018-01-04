// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  if (typeof obj === 'number') {
    return obj.toString();
  }
  
  if (obj === null) {
    return 'null';
  }
  
  if (typeof obj === 'boolean') {
    return obj.toString();
  }
  
  if (typeof obj === 'string') {
    return '\"' + obj + '\"';
  }
  
  if (Array.isArray(obj)) {
    var answer = '[';
    
    for (var i = 0; i < obj.length; i++) {
      answer += stringifyJSON(obj[i]);
      answer += ',';
    }
    if (answer[answer.length - 1] === ',') {
      answer = answer.slice(0, answer.length - 1);
    }
    return answer + ']';
  }
  
  if (typeof obj === 'object') {
    var answer = '{';
    for (var propKey in obj) {
    
      if (typeof obj[propKey] === 'function') {
      } else if (obj[propKey] === undefined) {
      } else {
      
    
		  answer += stringifyJSON(propKey);
		  answer += ':';
		  answer += stringifyJSON(obj[propKey]);
		  answer += ',';
	  }
    }
    
    if (answer[answer.length - 1] === ',') {
      answer = answer.slice(0, answer.length - 1);
    }
    
    return answer += '}';
  }
};
