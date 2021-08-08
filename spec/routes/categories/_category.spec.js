import "jsdom-global/register"

import { render } from "@testing-library/svelte"

import Category from "routes/categories/_category.svelte"

it("Category should render title and correct style", async() => {
  const category = { title: "Test", type: "neutral" }
  const { getByText } = render(Category, { category: category })

  const element = getByText(category.title)

  expect(element).toBeInTheDocument()
  expect(element).toHaveClass(`category--${ category.type }`)
})

it("Category should render emoji based on type", async() => {
  const types = { neutral: "➖", positive: "👍", negative: "👎" }

  Object.keys(types).forEach(key => {
    const category = { title: "Test", type: key }
    const { getByText } = render(Category, { category: category })

    let element = getByText(types[key])
    expect(element).toBeInTheDocument()
  })
})
