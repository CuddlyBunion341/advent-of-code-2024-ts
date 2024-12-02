// https://adventofcode.com/2024/day/2
// CuddlyBunion341

// The unusual data (your puzzle input) consists of many reports, one report per line. Each report is a list of numbers called levels that are separated by spaces. For example:
//
// 7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9
//
// This example data contains six reports each containing five levels.
//
// The engineers are trying to figure out which reports are safe. The Red-Nosed reactor safety systems can only tolerate levels that are either gradually increasing or gradually decreasing. So, a report only counts as safe if both of the following are true:
//
//     The levels are either all increasing or all decreasing.
//     Any two adjacent levels differ by at least one and at most three.
//
// In the example above, the reports can be found safe or unsafe by checking those rules:
//
//     7 6 4 2 1: Safe because the levels are all decreasing by 1 or 2.
//     1 2 7 8 9: Unsafe because 2 7 is an increase of 5.
//     9 7 6 2 1: Unsafe because 6 2 is a decrease of 4.
//     1 3 2 4 5: Unsafe because 1 3 is increasing but 3 2 is decreasing.
//     8 6 4 4 1: Unsafe because 4 4 is neither an increase or a decrease.
//     1 3 6 7 9: Safe because the levels are all increasing by 1, 2, or 3.
//
// So, in this example, 2 reports are safe.
//
// Analyze the unusual data from the engineers. How many reports are safe?

const file = await Bun.file("./input.txt").text()

const reports = file.split("\n")

const reportMap = reports.map((report) => {
  const levelsString = report.split(" ")

  if (levelsString[0] == "") return

  const levels = levelsString.map(v => parseInt(v))
  const diffs = levels.map((level, index) => {
    if (index == 0) return 0
    return level - levels[index - 1]
  })

  diffs.shift()

  const diffRanges = diffs.map(d => 1 <= Math.abs(d) && Math.abs(d) <= 3)
  const diffDirections = diffs.map(d => Math.sign(d))

  const diffsAreWithinRange = diffRanges.indexOf(false) === -1
  const allPositive = diffDirections.indexOf(-1) === -1
  const allNegative = diffDirections.indexOf(1) === -1

  const safe = diffsAreWithinRange && ((allPositive && !allNegative)  || (!allPositive && allNegative))

  return safe
})

const safeReports = reportMap.filter(v => v === true)
console.log(safeReports.length)
