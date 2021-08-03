import "jsdom-global/register"

import { render } from "@testing-library/svelte"

import Index from "routes/index.svelte"

it("Should render empty cards during loading", async () => {
  const { getByText } = render(Index)

  expect(getByText("Link")).toBeInTheDocument()
  
  const elements = document.querySelectorAll(".card")

  console.log(elements)
})
