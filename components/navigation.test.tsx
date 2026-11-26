import { fireEvent, render, screen } from "@testing-library/react"
import Navigation from "@/components/navigation"
import { navBrand, navItems } from "@/lib/siteConfig"

jest.mock("next/navigation", () => ({ usePathname: () => "/celebrate" }))

describe("Navigation", () => {
  it("links the wordmark home", () => {
    render(<Navigation />)
    expect(screen.getByRole("link", { name: navBrand })).toHaveAttribute("href", "/")
  })

  it("renders every configured destination", () => {
    render(<Navigation />)
    for (const item of navItems) {
      expect(screen.getByRole("link", { name: item.label })).toHaveAttribute("href", item.href)
    }
  })

  it("marks the current page", () => {
    render(<Navigation />)
    expect(screen.getByRole("link", { name: "Celebrate" })).toHaveAttribute("aria-current", "page")
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current")
  })

  it("opens and closes the menu on small screens", () => {
    render(<Navigation />)
    const toggle = screen.getByRole("button", { name: "Open menu" })
    expect(toggle).toHaveAttribute("aria-expanded", "false")
    fireEvent.click(toggle)
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true")
  })
})

describe("Mode toggle", () => {
  afterEach(() => {
    delete document.documentElement.dataset.mode
    localStorage.clear()
  })

  it("switches to dark and remembers it", async () => {
    render(<Navigation />)
    fireEvent.click(screen.getByRole("button", { name: "Switch to dark mode" }))
    expect(document.documentElement.dataset.mode).toBe("dark")
    expect(localStorage.getItem("mode")).toBe("dark")
    // the label follows <html data-mode>, which the toggle observes asynchronously
    expect(await screen.findByRole("button", { name: "Switch to light mode" })).toBeInTheDocument()
  })
})
