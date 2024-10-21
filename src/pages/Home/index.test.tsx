import { expect, it, describe, vi, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CelebrityFetcherProvider from "../../CelebrityFetcherContext";
import Home from ".";

const renderHomePage = () =>
  render(
    <CelebrityFetcherProvider>
      <Home />
    </CelebrityFetcherProvider>
  );

describe("Home page", () => {
  it("renders", () => {
    renderHomePage();
  });
});
