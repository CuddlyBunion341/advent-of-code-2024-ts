const file = await Bun.file("./input").text()
const lines = file.split("\n")
const size = Math.min(lines.length, lines[0].length)
const rows = lines.slice(0, size)

const TERM = "XMAS"

const transpose = (matrix: String[]) => matrix.map((s, i) => s.split("").map((_, j) => matrix[j][i]).join(""))
const reverse = (str: String) => str.split("").reverse().join("")
const rangeStr = (count: number, call: (i: number) => string) => Array.from({ length: count }).map((_, i) => call(i)).join("")
const getMatches = (str: String) => [...str.matchAll(new RegExp(TERM, "g"))]
const range = (length: number, call: (i: number) => any) => Array.from({length}).map((_, i) => call(i))

const xmasStrings: String[] = []

const matricies = [
  rows,
  transpose(rows),
  rows.map(reverse),
  transpose(rows.map(reverse)),
]

range(size - TERM.length - 1, (a) => {
  matricies.forEach((matrix, mi) => {
    if (mi % 2 === 0 && a === 0) return
    xmasStrings.push(rangeStr(size, (i) => matrix[i][a + i]))
  })
})

for (let a = 0; a < size; a++) {
  xmasStrings.push(matricies[0][a])
  xmasStrings.push(matricies[1][a])
}

const totalMatches = xmasStrings.map(v => [v, reverse(v)].map(n => getMatches(n).length).reduce((a, v) => a + v)).reduce((sum, val) => sum + val)

console.log(totalMatches)
