import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/components/layout/Header";

describe("Header Component", () => {
  it("renders logo with home link", () => {
    render(<Header />);

    const homeLink = screen.getByRole("link", { name: /book rec home/i });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders nav links with correct hrefs", () => {
    render(<Header />);

    const dashboardLinks = screen.getAllByRole("link", { name: /dashboard/i });
    expect(dashboardLinks[0]).toHaveAttribute("href", "/dashboard");
    const recLinks = screen.getAllByRole("link", { name: /recommendations/i });
    expect(recLinks[0]).toHaveAttribute("href", "/recommendations");
    // Sign-in has no providers yet, so the header doesn't offer it.
    expect(screen.queryByRole("link", { name: /sign in/i })).not.toBeInTheDocument();
  });

  it("toggles mobile menu on hamburger click", () => {
    render(<Header />);

    const menuButton = screen.getByRole("button", {
      name: /open menu/i,
    });
    expect(menuButton).toBeInTheDocument();

    fireEvent.click(menuButton);

    expect(
      screen.getByRole("button", { name: /close menu/i }),
    ).toBeInTheDocument();
  });
});
