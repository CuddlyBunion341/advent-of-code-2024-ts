const file = await Bun.file("./input2").text()
const lines = file.split("\n")
const size = Math.min(lines.length, lines[0].length)
const rows = lines.slice(0, size)

const TERM = "XMAS"

const transpose = (matrix: String[]) => matrix.map((s, i) => s.split("").map((_, j) => matrix[j][i]).join(""))
const reverse = (str: String) => str.split("").reverse().join("")
const getMatches = (str: String) => [...str.matchAll(new RegExp(TERM, "g"))]
const range = (length: number, call: (i: number) => any) => Array.from({length}).map((_, i) => call(i))

const matricies = [
  rows,
  transpose(rows),
  rows.map(reverse),
  transpose(rows.map(reverse)),
]

const xmasStrings: String[] = [
  ...range(size - TERM.length - 1, (a) => (
    matricies.map((matrix, mi) => {
      if (mi % 2 === 0 && a === 0) return
      return range(size, (i) => matrix[i][a + i]).join("")
    })
  )).flat(),
  ...range(size, a => matricies[0][a]),
  ...range(size, a => matricies[1][a]),
].filter(v => v)

  console.log(xmasStrings)

const totalMatches = xmasStrings.map(v => [v, reverse(v)].map(n => getMatches(n).length).reduce((a, v) => a + v)).reduce((sum, val) => sum + val)

console.log(totalMatches)
