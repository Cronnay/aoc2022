import { assert } from 'node:console';
import { readFile } from 'node:fs/promises';


const file = await readFile("input.txt", "utf8");
const rows = file.split("\n");

const createRange = (a, b, step) => {
  let A = [];
  if (typeof a == 'number') {
    A[0] = a;
    step = step || 1;
    while (a + step <= b) {
      A[A.length] = a += step;
    }
  }
  else {
    let s = 'abcdefghijklmnopqrstuvwxyz'
    if (a === a.toUpperCase()) {
      b = b.toUpperCase();
      s = s.toUpperCase();
    }
    s = s.substring(s.indexOf(a), s.indexOf(b) + 1);
    A = s.split('');
  }
  return A;
}

const lowerCaseRange = createRange('a', 'z');
const upperCaseRange = createRange('A', 'Z');


/**
  @param compartment {Array<string>}
  @param character string
*/
const hasCompartmentItem = (compartment, character) => {
  for (const char of compartment) {
    if (character === char) {
      return true;
    }
  }
}

/**
  @param rows {Array<string>}
*/
const solveOne = rows => {
  const foundItems = [];

  rows.forEach(row => {
    const firstCompartment = row.slice(0, row.length / 2);
    const secondCompartment = row.slice((row.length / 2));
    const foundCharacter = [...firstCompartment].filter(char => hasCompartmentItem(secondCompartment, char));
    if (foundCharacter[0]) {
      foundItems.push(foundCharacter[0])
    }
  });


  console.log(getSumOfCharacters(foundItems));
};

/**
  @param rows {Array<string>}

*/
const solveTwo = rows => {
  const foundItems = [];
  for (let i = 0; i < rows.length; i += 3) {
    const chunks = rows.slice(i, i + 3);
    let foundInLowerCase = false;
    lowerCaseRange.forEach(character => {
      const existsInAll = chunks.map(chunk => hasCompartmentItem(chunk, character)).every(chunk => chunk);
      if (existsInAll) {
        foundItems.push(character);
        foundInLowerCase = true;
      }
    });
    if (!foundInLowerCase) {
      upperCaseRange.forEach(character => {
        const existsInAll = chunks.map(chunk => hasCompartmentItem(chunk, character)).every(chunk => chunk);
        if (existsInAll) {
          foundItems.push(character);
        }
      });
    }
  }

  console.log(getSumOfCharacters(foundItems));
}

/**
  @param characterArray {Array<string>}
*/
const getSumOfCharacters = characterArray => {
  let sum = 0;
  characterArray.forEach(character => sum += getValueOfCharacter(character));
  return sum;
}

/**
  @param character {string}
*/
const getValueOfCharacter = character => {
  const lowerCaseIndex = lowerCaseRange.findIndex(char => char === character);
  if (lowerCaseIndex >= 0) {
    return lowerCaseIndex + 1;
  }

  const upperCaseIndex = upperCaseRange.findIndex(char => char === character);
  if (upperCaseIndex >= 0) {
    return upperCaseIndex + 26 + 1;
  }

  throw new Error(`could not find letter ${character}`);
}



if (process.env.part === "part1") {
  assert(getValueOfCharacter("a") === 1, "a is not 1");
  assert(getValueOfCharacter("p") === 16, "p is not 16");
  assert(getValueOfCharacter("L") === 38, "L is not 38");
  assert(getValueOfCharacter("P") === 42, "P is not 42");
  assert(getSumOfCharacters(["p", "L", "P", "v", "t", "s"]) === 157, "Sum is not 157")
  solveOne(rows);
} else if (process.env.part === "part2") {
  solveTwo(rows);
} else {
  console.log("We outta here");
}
