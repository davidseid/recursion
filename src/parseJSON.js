// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {



  // make a nextChar function
  var nextChar = function() {
    index += 1;
    currentChar = json[index];
    if (currentChar === ' ' || currentChar === '\t' || currentChar === '\n' || currentChar === '\r') {
      nextChar();
    } 
    return currentChar;
  };
  
  
  var index = 0;
  var currentChar = json[index];
  
  // make a parseNumber function
  var parseNumber = function() {
    var number = '';

    
    while (isNaN(currentChar) === false || currentChar === '.' || currentChar === '-') {
      number += currentChar;
      nextChar();
    }
    index -= 1;
    currentChar = json[index];
    return Number(number);
  };
  
 
  

  // make a parseString function
  var parseString = function() {
    var string = '';
    nextChar();

    while (currentChar !== '"') {
      if (currentChar === '\\') {
      	nextChar();
      }
      string += currentChar;
      if (json[index+1] === ' ') {
      	string+= ' ';
      }
      nextChar();
    }
    return string;
    /*
    while (!(currentChar === '"' && json[index-1] !== '\\' )) {
      string += currentChar;
      string = string.replace('\\\\', '\\');
      nextChar();
    }
    
    return string;
    */

  };

  
  
  // make a parseTrue function
  var parseTrue = function() {
    nextChar();
    nextChar();
    nextChar();
    return true;
    // leaves off on the 'e' of true !!!!
  };
  
  // make a parseFalse function
  var parseFalse = function() {
    nextChar();
    nextChar();
    nextChar();
    nextChar();
    return false;
    // leaves off on the 'e' of false!!!
  };
  
  // make a parseNull function
  var parseNull = function() {
    nextChar();
    nextChar();
    nextChar();
    return null;
    // leaves off on the 'l' of null!!!
  };
  
  // make a parseArray function
  var parseArray = function() {
    var array = [];
    nextChar();
    if (currentChar === ']') {
      nextChar();
      return array;
    }
    while (currentChar !== ']') {
      
      if (currentChar === ',') {
        nextChar();
      }
      
      array.push(parseValue());
      nextChar();
    }
    return array;
    // leaves off on the ] !!! 
  };
  
  // make a parseObject function
  var parseObject = function() {
  
    
    var object = {};
    nextChar();
    
    if (currentChar === '}') {
      nextChar();
      return object;
    }
    
    
    var addPair = function() {
      var key = parseValue();
      nextChar(); // to get to :
      nextChar(); // to skip :
      var value = parseValue();
      object[key] = value;
      nextChar();
    };
    
    addPair();
    
    
    while (currentChar !== '}') {
      if (currentChar === ',') {
        nextChar();
        addPair();
      }
      if (currentChar === '"') {
        addPair();
      }
    }
    
    return object;
    // leaves off on the '}' !!!  
  };
  
    // depending on what the next character is,
    // call one of the other functions
  var parseValue = function() {
    switch (currentChar) {
      case '[':
        return parseArray();
        break;
      case '{':
        return parseObject();
        break;
      case '"':
        return parseString();
        break;
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '-':
      case '.':
        return parseNumber();
        break;
      case 't':
        return parseTrue();
        break;
      case 'f':
        return parseFalse();
        break;
      case 'n':
        return parseNull();
        break;
      default: 
        console.log(currentChar + ' does not match any cases');
        break;
    }
  };
  
  json =  '{\r\n' +
    '          "glossary": {\n' +
    '              "title": "example glossary",\n\r' +
    '      \t\t"GlossDiv": {\r\n' +
    '                  "title": "S",\r\n' +
    '      \t\t\t"GlossList": {\r\n' +
    '                      "GlossEntry": {\r\n' +
    '                          "ID": "SGML",\r\n' +
    '      \t\t\t\t\t"SortAs": "SGML",\r\n' +
    '      \t\t\t\t\t"GlossTerm": "Standard Generalized ' +
    'Markup Language",\r\n' +
    '      \t\t\t\t\t"Acronym": "SGML",\r\n' +
    '      \t\t\t\t\t"Abbrev": "ISO 8879:1986",\r\n' +
    '      \t\t\t\t\t"GlossDef": {\r\n' +
    '                              "para": "A meta-markup language,' +
    ' used to create markup languages such as DocBook.",\r\n' +
    '      \t\t\t\t\t\t"GlossSeeAlso": ["GML", "XML"]\r\n' +
    '                          },\r\n' +
    '      \t\t\t\t\t"GlossSee": "markup"\r\n' +
    '                      }\r\n' +
    '                  }\r\n' +
    '              }\r\n' +
    '          }\r\n' +
    '      }\r\n'
  

  currentChar = json[0];

  console.log(parseValue());
  console.log(JSON.parse(json));
}