const file = await Bun.file("./input2").text()
const rows = file.split("\n")

const size = rows[0].length
while (rows.length > size) rows.pop()

const word = "XMAS"

const findMatches = (row: String) => {
  let matches = row.match(/XMAS/g)
  if (matches) return matches.length
  return 0
}

const transpose = (matrix: String[]) => matrix.map((s, i) => s.split("").map((_, j) => matrix[j][i]).join(""))
const reverse = (str: String) => str.split("").reverse().join("")

const trows = transpose(rows)

let totalMatchCount = 0

for (let r = 0; r < size; r++) {
  totalMatchCount += findMatches(rows[r])
  totalMatchCount += findMatches(reverse(rows[r]))
  totalMatchCount += findMatches(trows[r])
  totalMatchCount += findMatches(reverse(trows[r]))
}

let otherInput = [
  "   x x x",
  "   x x x",
  "  m m m ",
  " a a a  ",
  "s s s   ",
  "  m m m ",
  " a a a  ",
  "s s s   ",
]

const printBox = (str: String) => [...str.split("")].join(" ")

const reversed = otherInput.map(row => {
  let el = [...row.split("")]
  el.reverse()
  return el.join("")
})

otherInput = reversed;

otherInput .forEach(el => {
  console.log(printBox(el.replaceAll(" ", ".")))
})

console.log('----')

let serachTerm = "xmas"
// let otherInput = transpose(otherInput)


let y = 0;
for (let x = 0; x < otherInput[0].length - serachTerm.length; x++) {
  let diagonal = ""
  for (let d = 0; d < otherInput[0].length - x; d++) {
    diagonal += otherInput[y + d][x + d];
  }
  console.log(printBox(diagonal.replaceAll(" ", ".")))
}

console.log('___')

let x = 0;
for (let y = 0; y < otherInput.length; y++) {
  let diagonal = ""
  for (let d = 0; d < otherInput[0].length - y; d++) {
    diagonal += otherInput[y + d][x + d];
  }
  console.log(printBox(diagonal.replaceAll(" ", ".")))
}

for (let dsX = 0; dsX < size - (word.length - 1); dsX++) {
  for (let dsY = 0; dsY < size - (word.length - 1); dsY++) {

    let diagonal = ""
    let tdiagonal = ""
    for (let d = 0; d < size - Math.max(dsX, dsY); d++) {
      diagonal += rows[dsY + d][dsX + d]
      tdiagonal += trows[dsY + d][dsX + d]
    }

    totalMatchCount += findMatches(diagonal)
    totalMatchCount += findMatches(reverse(diagonal))
    totalMatchCount += findMatches(tdiagonal)
    totalMatchCount += findMatches(reverse(tdiagonal))
  }
}

console.log(totalMatchCount)
