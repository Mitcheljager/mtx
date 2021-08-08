import "jsdom-global/register"

import { render } from "@testing-library/svelte"

import Grade from "routes/games/_grade.svelte"

it("Grade should render grade without categories given", async() => {
  const categories = []
  const { getByText } = render(Grade, { categories: categories })

  const element = getByText("A")

  expect(element).toBeInTheDocument()
  expect(element).toHaveClass("grade")
})

it("Grade should set lower grade is negative category is given", async() => {
  const categories = [{ title: "Negative", type: "negative" }]
  const { getByText } = render(Grade, { categories: categories })

  const element = getByText("B")

  expect(element).toBeInTheDocument()
  expect(element).toHaveClass("grade--B")
})

it("Grade should set lowest grade is many negative categories are given", async() => {
  const categories = []
  for(let i = 0; i < 10; i++) {
    categories.push({ title: "Negative", type: "negative" })
  }

  const { getByText } = render(Grade, { categories: categories })

  const element = getByText("F")

  expect(element).toBeInTheDocument()
  expect(element).toHaveClass("grade--F")
})

it("Grade should not be affected by neutral or positive categories", async() => {
  const categories = [{ title: "1", type: "positive" }, { title: "2", type: "neutral" }]

  const { getByText } = render(Grade, { categories: categories })

  const element = getByText("A")

  expect(element).toBeInTheDocument()
  expect(element).toHaveClass("grade--A")
})

it("Grade should render larger if size is set", async() => {
  const { getByText } = render(Grade, { categories: [], size: "large" })

  const element = getByText("A")

  expect(element).toBeInTheDocument()
  expect(element).toHaveClass("grade--large")
})
