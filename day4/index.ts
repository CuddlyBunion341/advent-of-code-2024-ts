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
const output = (matrix: String[]) => { matrix.forEach(row => console.log(format(row))); console.log('---') }
const print = (str: String) => console.log(format(str))

output(rows)
output(transpose(rows))

for (let a = 0; a < size - TERM.length; a++) {
  let diagonal = ""
  for (let d = 0; d < size - a; d++) {
    diagonal += rows[d][a + d]
  }
  print(diagonal)
}
