if (typeof window === 'undefined') {
  require('console.table');
}

function validXML(xml) {
  if(xml === '') {
    return true;
  }
  
  var stack = [];
  for(var i = 0; i < xml.length; i++) {
    // keep adding '<' to the stack until it we run into '>' 
    if(xml[i] === '>') {
      if(stack.length === 0) {
        return false;
      } else if (stack[stack.length - 1] === '<') {
        // if the top of the stack is '<', we can remove it from the 
        // stack because we have found a '>' to match it
        stack.pop();
      }
    } else {
      stack.push(xml[i]);
    }
  }
  
  // if the stack length is not 0, that means we couldn't find an opposite
  // pairs for the remaining entries in the stack 
  return stack.length === 0 ? true : false;
}

function runTest(fcn, testcases, expect) {
  var testArr = [];
  for(var i = 0; i < testcases.length; i++) {
      var testCase = new TestCase(testcases[i], 
                                  expect,
                                  fcn(testcases[i]) ? 'Pass' : 'Fail');
      testArr.push(testCase);
  }

  return testArr;
}

function TestCase(input, expecting, result) {
  this.input = input;
  this.expecting = expecting;
  this.result = result;
}

(function() {
  var test1 = runTest(validXML, ['<><>', '<>', '', '<<>>', '<<><>>'], 'Pass');
  var test2 = runTest(validXML, ['<', '<><', '<<<>>', '<<><>'], 'Fail');
  console.table(test1.concat(test2));
})();