import { expect, it, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { VirtuosoGridMockContext } from "react-virtuoso";
import userEvent from "@testing-library/user-event";
import CelebrityFetcherProvider from "../../CelebrityFetcherContext";
import Home from ".";
import * as useFetchDebouncedCelebrities from "../../CelebrityFetcherContext/useFetchDebouncedCelebrities";
import { mockedCelebrities } from "../../mockedApiData";
import "@testing-library/jest-dom/vitest";

const renderHomePage = () =>
  render(
    <CelebrityFetcherProvider>
      <Home />
    </CelebrityFetcherProvider>,
    {
      // As recommended by the virtuoso library for testing
      wrapper: ({ children }) => (
        <VirtuosoGridMockContext.Provider
          value={{
            viewportHeight: 300,
            viewportWidth: 300,
            itemHeight: 100,
            itemWidth: 100,
          }}
        >
          {children}
        </VirtuosoGridMockContext.Provider>
      ),
    }
  );

const mockedHookData = {
  celebrities: mockedCelebrities,
  loading: false,
  error: "",
  query: "",
  setQuery: vi.fn(),
  loadMoreCelebrities: vi.fn(),
};

describe("Home page", () => {
  it("renders and fetches celebrities", async () => {
    vi.spyOn(
      useFetchDebouncedCelebrities,
      "useFetchDebouncedCelebrities"
    ).mockReturnValue(mockedHookData);

    renderHomePage();

    expect(await screen.findByText("Tom Hardy")).toBeVisible();
    expect(await screen.findByText("Tom Cruise")).toBeVisible();
  });

  it("shows a modal with celebrity details when a card is clicked", async () => {
    vi.spyOn(
      useFetchDebouncedCelebrities,
      "useFetchDebouncedCelebrities"
    ).mockReturnValue(mockedHookData);

    renderHomePage();

    const tomCruiseCard = await screen.findByText("Tom Cruise");

    await userEvent.click(tomCruiseCard);

    // Check that a few things in the modal are shown
    expect(screen.getByText("Popularity:")).toBeVisible();
    expect(screen.getByText("86.151")).toBeVisible();
    expect(screen.getByText("Oblivion")).toBeVisible();
  });

  it("closes a celebrity modal after it was opened", async () => {
    vi.spyOn(
      useFetchDebouncedCelebrities,
      "useFetchDebouncedCelebrities"
    ).mockReturnValue(mockedHookData);

    renderHomePage();

    const tomCruiseCard = await screen.findByText("Tom Cruise");

    await userEvent.click(tomCruiseCard);

    const popularity = screen.getByText("Popularity:");
    const popularityValue = screen.getByText("86.151");
    const oblivionMovie = screen.getByText("Oblivion");
    expect(popularity).toBeVisible();
    expect(popularityValue).toBeVisible();
    expect(oblivionMovie).toBeVisible();

    const closeButton = screen.getByRole("button", {
      name: /close/i,
    });
    await userEvent.click(closeButton);

    expect(popularity).not.toBeVisible();
    expect(popularityValue).not.toBeVisible();
    expect(oblivionMovie).not.toBeVisible();
  });
});
