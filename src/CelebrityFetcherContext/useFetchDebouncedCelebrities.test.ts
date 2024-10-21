import { expect, it, describe, afterEach, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useFetchDebouncedCelebrities } from "./useFetchDebouncedCelebrities";

// First globally mock fetch and then in the test cases customize returned data
window.fetch = vi.fn();

describe("useFetchDebouncedCelebrities hook", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useFetchDebouncedCelebrities());

    expect(result.current.celebrities).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe("");
    expect(result.current.query).toBe("");
    expect(result.current.loadMoreCelebrities).toBeInstanceOf(Function);
    expect(result.current.setQuery).toBeInstanceOf(Function);
    expect(result.current.fetchCelebrities).toBeInstanceOf(Function);
  });

  it("should debounce the query update and fetch data", async () => {
    const mockApiResponse = {
      results: [{ id: 1, name: "Tom Hanks", gender: 2 }],
      total_pages: 1,
    };
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const { result } = renderHook(() => useFetchDebouncedCelebrities());

    expect(window.fetch).toHaveBeenCalledWith(
      expect.stringContaining("person/popular")
    );

    act(() => {
      result.current.setQuery("Tom");
    });

    await waitFor(
      () => {
        expect(window.fetch).toHaveBeenCalledWith(
          expect.stringContaining("search/person")
        );
        expect(result.current.loading).toBe(false);
      },
      { timeout: 2000 } // To ensure we wait long enough for the debounce timeout
    );
  });

  it("should handle pagination and load more celebrities", async () => {
    const mockApiResponsePage1 = {
      results: [{ id: 1, name: "Tom Hanks", gender: 2 }],
      total_pages: 2,
    };
    const mockApiResponsePage2 = {
      results: [{ id: 2, name: "Will Smith", gender: 2 }],
      total_pages: 2,
    };

    window.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponsePage1,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponsePage2,
      });

    const { result } = renderHook(() => useFetchDebouncedCelebrities());

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledWith(
        expect.stringContaining("person/popular")
      );
      expect(result.current.celebrities).toEqual([
        { id: 1, name: "Tom Hanks", gender: 2 },
      ]);
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.loadMoreCelebrities();
    });

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(2);

      // Check if celebrities array contains both pages' results
      expect(result.current.celebrities).toEqual([
        { id: 1, name: "Tom Hanks", gender: 2 },
        { id: 2, name: "Will Smith", gender: 2 },
      ]);
      expect(result.current.loading).toBe(false);
    });
  });

  it("should handle any errors", async () => {
    window.fetch.mockRejectedValueOnce(new Error("Something happened"));

    const { result } = renderHook(() => useFetchDebouncedCelebrities());

    await waitFor(() => {
      expect(result.current.error).toBe("Something happened");
      expect(result.current.loading).toBe(false);
    });
  });
});
