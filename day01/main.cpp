#include <algorithm>
#include <fstream>
#include <iostream>
#include <iterator>
#include <numeric>
#include <sstream>
#include <stdexcept>
#include <stdio.h>
#include <string.h>
#include <string>
#include <vector>

using namespace std;

std::vector<string> read_input() {
  vector<string> result;
  ifstream input_file("input.txt");
  string line;

  while (getline(input_file, line)) {
    istringstream iss(line);
    if (line.empty()) {
      result.push_back("");
    } else {
      string a;
      if (!(iss >> a)) {
        break; // If error then break
      }
      result.push_back(a);
    }
  }

  return result;
}

vector<int> getCalories(vector<string> input) {
  vector<int> elfsCalories;

  int currentIndex = 0;
  for (string in : input) {
    if (in.empty()) {
      currentIndex++;
      continue;
    }
    try {
      elfsCalories.at(currentIndex) += std::stoi(in);
    } catch (const std::out_of_range &oor) {
      elfsCalories.push_back(0);
      elfsCalories.at(currentIndex) += std::stoi(in);
    }
  }
  return elfsCalories;
}

int solve1(vector<string> input) {
  vector<int> elfsCalories = getCalories(input);

  int max = *max_element(elfsCalories.begin(), elfsCalories.end());
  return max;
}

vector<int>::iterator getHighestValue(vector<int> calories) {
  return max_element(calories.begin(), calories.end());
}

int getIndexFromHighestValue(vector<int> calories,
                             vector<int>::iterator highestValue) {
  return distance(calories.begin(), highestValue);
}

int solve2(vector<string> input) {
  vector<int> calories = getCalories(input);
  vector<int> topThreeElves;

  vector<int>::iterator topElfIterator = getHighestValue(calories);
  topThreeElves.push_back(*topElfIterator);
  calories.erase(calories.begin() +
                 getIndexFromHighestValue(calories, topElfIterator));

  vector<int>::iterator secondTopElf = getHighestValue(calories);
  topThreeElves.push_back(*secondTopElf);
  calories.erase(calories.begin() +
                 getIndexFromHighestValue(calories, secondTopElf));

  vector<int>::iterator thirdTopElf = getHighestValue(calories);
  topThreeElves.push_back(*thirdTopElf);
  calories.erase(calories.begin() +
                 getIndexFromHighestValue(calories, thirdTopElf));

  return accumulate(topThreeElves.begin(), topThreeElves.end(), 0);
}

int main() {
  std::vector<string> input = read_input();

  const auto part = std::getenv("part");
  if (part == nullptr || strcmp(part, "part1") == 0) {
    std::cout << solve1(input) << '\n';
  } else {
    std::cout << solve2(input) << '\n';
  }
  return 0;
}
