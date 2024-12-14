const file = await Bun.file("./input2").text()
const rows = file.split("\n")
const size = rows[0].length
while (rows.length > size) rows.pop()

const TERM = "XMAS"

const findMatches = (row: String) => {
  let matches = row.match(/XMAS/g)
  return matches ? matches.length : 0 
}

const transpose = (matrix: String[]) => matrix.map((s, i) => s.split("").map((_, j) => matrix[j][i]).join(""))
const reverse = (str: String) => str.split("").reverse().join("")
const format = (str: String) => [...str.split("")].join(" ")
