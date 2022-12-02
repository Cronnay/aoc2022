import { assert } from 'node:console';
import { readFile } from 'node:fs/promises';


const file = await readFile("input.txt", "utf8");
const rows = file.split("\n");

const ROCK_OPPONENT = "A";
const SCISSORS_OPPONENT = "C";
const PAPER_OPPONENT = "B";

const ROCK_ME = "X";
const SCISSORS_ME = "Z";
const PAPER_ME = "Y";

const shapeBeatsMap = { [ROCK_OPPONENT]: SCISSORS_ME, [SCISSORS_OPPONENT]: PAPER_ME, [PAPER_OPPONENT]: ROCK_ME }
const shapeMapper = { [SCISSORS_OPPONENT]: SCISSORS_ME, [PAPER_OPPONENT]: PAPER_ME, [ROCK_OPPONENT]: ROCK_ME }
const shapeLosesMap = { [ROCK_OPPONENT]: PAPER_ME, [PAPER_OPPONENT]: SCISSORS_ME, [SCISSORS_OPPONENT]: ROCK_ME }

/**
@param opponent {string}
@param elf {string}
*/
const shapeBeatsValue = (opponent, elf) => {
  if (shapeBeatsMap[opponent] === elf) {
    return 0;
  }

  if (shapeMapper[opponent] === elf) {
    return 3;
  }

  return 6;
}

/**
@param shape {string}
*/
const getValueFromShape = shape => {
  if (shape === SCISSORS_ME) {
    return 3;
  } else if (shape === ROCK_ME) {
    return 1;
  }
  return 2;
}


/**
  @param rows {Array<string>}
*/
const partOne = (rows) => {
  let sum = 0;

  rows.forEach(row => {
    const [opponent, elf] = row.split(" ");
    if (!opponent || !elf) {
      return
    }
    sum += getValueFromShape(elf);
    sum += shapeBeatsValue(opponent, elf);

  })
  return sum;
}

const partTwo = rows => {
  let sum = 0;
  rows.forEach(row => {
    const [opponent, elf] = row.split(" ");
    if (!opponent || !elf) {
      return
    }
    //Y == draw
    if (elf === "Y") {
      sum += getValueFromShape(shapeMapper[opponent])
      sum += shapeBeatsValue(opponent, shapeMapper[opponent])
    } else if (elf === "Z") {
      sum += getValueFromShape(shapeLosesMap[opponent])
      sum += shapeBeatsValue(opponent, shapeLosesMap[opponent])
    } else if (elf === "X") {
      sum += getValueFromShape(shapeBeatsMap[opponent]);
      sum += shapeBeatsValue(opponent, shapeBeatsMap[opponent]);
    }
  })
  return sum;
}

if (process.env.part === "part1") {

  assert((getValueFromShape(SCISSORS_ME) + shapeBeatsValue(ROCK_OPPONENT, SCISSORS_ME)) === 3, "rock opp, scissors me")
  assert((getValueFromShape(PAPER_ME) + shapeBeatsValue(ROCK_OPPONENT, PAPER_ME)) === 8, "rock opp, paper me")
  assert((getValueFromShape(ROCK_ME) + shapeBeatsValue(PAPER_OPPONENT, ROCK_ME)) === 1, "paper opp, rock me")
  assert((getValueFromShape(SCISSORS_ME) + shapeBeatsValue(SCISSORS_OPPONENT, SCISSORS_ME)) === 6, "last failed")

  console.log(partOne(rows));
} else {
  const testWhat = ["A Y", "B X", "C Z"]
  assert(partTwo(testWhat) === 12, `Actual value: ${partTwo(testWhat)}`)
  console.log(partTwo(rows));
}
