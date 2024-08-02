const { readFileSync } = require("fs")
const path = require("path")

const coverageFilePath = path.join(
  __dirname,
  "..",
  "coverage",
  "coverage-summary.json"
)

try {
  const coverageData = JSON.parse(readFileSync(coverageFilePath, "utf-8"))
  const coverage = coverageData.total.lines.pct

  if (coverage < 80) {
    console.error(`Coverage is below 80%: ${coverage}%`)
    process.exit(1)
  } else {
    console.log(`Coverage is sufficient: ${coverage}%`)
  }
} catch (error) {
  console.error("Error reading coverage report:", error)
  process.exit(1)
}
