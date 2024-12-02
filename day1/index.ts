// https://adventofcode.com/2024/day/1
// CuddlyBunion341

const file = Bun.file("./day1/input.txt")

const contents = await file.text()
const lines = contents.toString().split("\n")

const listA = []
const listB = []

lines.forEach((line) => {
  const [a, b] = line.split('   ').map(v => parseInt(v))
  if (a) { listA.push((a)) }
  if (b) { listB.push((b)) }
})

if (listA.length !== listB.length) {
  throw new Error(`Lists don't share same amount of elements: ${listA.length} ${listB.length}`)
}

listA.sort()
listB.sort()

const differences = listA.map((value,index) => {
  const diff = Math.abs(value - listB[index])
  console.log(`${value} - ${listB[index]} = ${diff}`)
  return diff
})

console.log(differences)

const sum = differences.reduce((sum, val) => sum + val, 0)

console.log(sum)
