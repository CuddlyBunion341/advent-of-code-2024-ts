const file = await Bun.file("./input").text()

const [firstSection, secondSection] = file.split("\n\n")

const pairs = firstSection.split("\n")

const pageOrderings: Record<String, Set<String>> = {}

pairs.forEach((pair) => {
  const [key, value] = pair.split("|")
  pageOrderings[key] ||= new Set()
  pageOrderings[key].add(value)
})

const allPages = [...new Set(pairs.map((pair) => pair.split("|")).flat())]

allPages.sort((a,b) => {
  if (pageOrderings[a]) {
    return pageOrderings[a].has(b) ? 1 : -1
  }
  return -1
})

console.log(allPages)
