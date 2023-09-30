import React from "react";
import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";

process.env.REACT_APP_SPORTS_API_KEY = "mocks - key";

import SportDisplay from "../../components/Sport/SportDisplay";
import { fixturesHandler } from "../mocks/fixturesHandler";

// Define a mock API server using msw
const server = setupServer(fixturesHandler);
const originalEnv = process.env;
beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});
afterAll(() => server.close());

test("renders SportDisplay without errors", async () => {
  render(<SportDisplay summary={false} collapsed={false} />);
});
