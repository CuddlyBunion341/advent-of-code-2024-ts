const lines = (await Bun.file("./input").text()).split("\n")
const size = Math.min(lines.length, lines[0].length)
const rows = lines.slice(0, size)

const TERM = "XMAS"

const transpose = (matrix: String[]) => matrix.map((s, i) => s.split("").map((_, j) => matrix[j][i]).join(""))
const reverse = (str: String) => str.split("").reverse().join("")
const getMatches = (str: String) => [...str.matchAll(new RegExp(TERM, "g"))]
const range = (length: number, call: (i: number) => any) => Array.from({ length }).map((_, i) => call(i))

const matricies = [
  rows,
  transpose(rows),
  rows.map(reverse),
  transpose(rows.map(reverse)),
]

const totalMatches = [
  ...range(size - TERM.length - 1, (a) => matricies.map((matrix, mi) => {
    if (mi % 2 === 0 && a === 0) return
    return range(size, (i) => matrix[i][a + i]).join("")
  }).filter(v => v !== undefined)
  ),
  ...range(size, i => matricies[0][i]),
  ...range(size, i => matricies[1][i]),
].flat().map(v => [v, reverse(v)].map(n => getMatches(n).length)).flat().reduce((s, v) => s + v)

console.log(totalMatches)
