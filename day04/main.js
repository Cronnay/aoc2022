import { assert } from 'node:console';
import { readFile } from 'node:fs/promises';


const file = await readFile("input.txt", "utf8");
const rows = file.split("\n");


/**
  @param rows {Array<string>}
*/
const solveOne = rows => {
  const sum = rows.filter(row => {
    const [firstRange, secondRange] = row.split(',');
    if (firstRange && secondRange) {
      return isOverlapping(firstRange, secondRange);
    }
  })
  return sum.length;
}


/**
  @param rows {Array<string>}
*/
const solveTwo = rows => {
  const sum = rows.filter(row => {
    const [firstRange, secondRange] = row.split(',');
    if (firstRange && secondRange) {
      return isPartlyOverlapping(firstRange, secondRange);
    }
  })
  return sum.length;
}

/**
  @param firstRange {string}
  @param secondRange {string}
*/
const isPartlyOverlapping = (firstRange, secondRange) => {
  const [firstStart, firstEnd] = firstRange.split("-").map(char => parseInt(char, 10));
  const [secondStart, secondEnd] = secondRange.split("-").map(char => parseInt(char, 10));
  if (firstStart >= secondStart && firstStart <= secondEnd) {
    return true;
  }
  if (firstEnd >= secondStart && firstEnd <= secondEnd) {
    return true;
  }

  if (secondStart >= firstStart && secondStart <= firstEnd) {
    return true;
  }
  if (secondEnd >= firstStart && secondEnd <= firstEnd) {
    return true;
  }
  return false;

}

/**
  @param firstRange {string}
  @param secondRange {string}
*/
const isOverlapping = (firstRange, secondRange) => {
  const [firstStart, firstEnd] = firstRange.split("-").map(char => parseInt(char, 10));
  const [secondStart, secondEnd] = secondRange.split("-").map(char => parseInt(char, 10));

  if ((firstStart >= secondStart && firstStart <= secondEnd) && (firstEnd >= secondStart && firstEnd <= secondEnd)) {
    return true;
  }

  if ((secondStart >= firstStart && secondStart <= firstEnd) && (secondEnd >= firstStart && secondEnd <= firstEnd)) {
    return true;
  }

  return false
}

if (process.env.part === "part1") {
  assert(isOverlapping("2-2", "2-3"), "2-2 should be part of 2-3");
  assert(isOverlapping("1-10", "2-3"), "2-3 should be part of 1-10");
  assert(!isOverlapping("2-4", "6-8"), "2-4, 6-8 does not overlap")
  assert(!isOverlapping("2-3", "4-5"), "2-3, 4-5")
  assert(isOverlapping("2-8", "3-7"), "2-8, 3-7")
  assert(isOverlapping("6-6", "4-6"), "6-6, 4-6")
  console.log(solveOne(rows));
} else if (process.env.part === "part2") {
  assert(isPartlyOverlapping("5-7", "7-9"), "5-7 7-9")
  assert(isPartlyOverlapping("2-8", "3-7"), "2-8 3-7")
  assert(isPartlyOverlapping("6-6", "4-6"), "6-6 4-6")
  assert(isPartlyOverlapping("2-6", "4-8"), "2-6 4-8");
  const solution2 = solveTwo(["2-4,6-8", "2-3,4-5", "5-7,7-9", "2-8,3-7", "6-6,4-6", "2-6,4-8"])
  assert(solution2 === 4, "Actual value: " + solution2)
  console.log(solveTwo(rows));
} else {
  console.error("Part not recognized: " + process.env.part);
}
