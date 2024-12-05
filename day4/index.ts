const file = await Bun.file("./input2").text()
const rows = file.split("\n")

const size = rows[0].length
while(rows.length > size) rows.pop()

let totalMatchCount = 0

const findMatches = (row) => {
  let matches = row.match(/XMAS/g)
  if (matches) return matches.length
    return 0
}

const transpose = (matrix: String[]) => matrix.map((s,i) => s.split("").map((_,j) => matrix[j][i]).join(""))
const reverse = (str) => str.split("").reverse().join("")

const trows = transpose(rows)

for (let r = 0; r < size; r++) {
  totalMatchCount += findMatches(rows[r])
  totalMatchCount += findMatches(reverse(rows[r]))
  totalMatchCount += findMatches(trows[r])
  totalMatchCount += findMatches(reverse(trows[r]))
}

for (let dsX = 0; dsX < size; dsX++) {
  for (let dsY = 0; dsY < size; dsY++) {

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
