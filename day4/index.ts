const file = await Bun.file("./input").text()
const rows = file.split("\n")
const size = rows[0].length
while (rows.length > size) rows.pop()

const TERM = "XMAS"

const transpose = (matrix: String[]) => matrix.map((s, i) => s.split("").map((_, j) => matrix[j][i]).join(""))
const reverse = (str: String) => str.split("").reverse().join("")
const stRange = (start: number, end: number, call: (index: number) => string) => {
  return Array.from({ length: end - start }).map((_, i) => call(start + i)).join("")
}
const range = (count: number, call: (index: number) => string) => stRange(0, count, call)
const getMatches = (str: String) => [...str.matchAll(/XMAS/g)]
const removeNonMatches = (str: String) => {
  return [...str.split("")].map((v, i) => getMatches(str).some(({ index }) => i >= index && i < index + TERM.length) ? v : '.')
}

const xmasStrings: String[] = []

const limit = TERM.length - 1

const matricies = [
  rows,
  transpose(rows),
  rows.map(reverse),
  transpose(rows.map(reverse)),
]

for (let a = 0; a < size - limit; a++) {
  matricies.forEach((matrix, mi) => {
    if (mi % 2 === 0 && a === 0) return
    xmasStrings.push(range(size, (i) => matrix[i][a + i]))
  })
}

for (let a = 0; a < size; a++) {
  xmasStrings.push(matricies[0][a])
  xmasStrings.push(matricies[1][a])
}

const totalMatches = xmasStrings.map(v => [v, reverse(v)].map(n => getMatches(n).length).reduce((a,v) => a + v)).reduce((sum, val) => sum + val)

console.log(totalMatches)
