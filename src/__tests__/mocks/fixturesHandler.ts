// In your fixturesHandler.ts file
import { rest } from "msw";

// Define the mock handler for the fixtures endpoint.
export const fixturesHandler = rest.get(
  "https://v3.football.api-sports.io/fixtures",
  (_, res, ctx) => {
    // Modify the response to return an array of fixtures
    const fixtures = [
      {
        fixture: {},
        league: {},
        teams: {
          home: {},
          away: {},
        },
      },
      {
        fixture: {},
        league: {},
        teams: {
          home: {},
          away: {},
        },
      },
    ];

    return res(
      ctx.status(200),
      ctx.json({
        data: {
          get: "fixtures",
          parameters: {
            season: "2023",
            team: "42",
            from: "2023-09-30",
            to: "2023-10-07",
          },
          errors: [],
          results: 2,
          paging: {
            current: 1,
            total: 1,
          },
          response: fixtures, // Use the array of fixtures here
        },
        status: 200,
        statusText: "",
        headers: {
          "content-type": "application/json",
        },
      })
    );
  }
);
