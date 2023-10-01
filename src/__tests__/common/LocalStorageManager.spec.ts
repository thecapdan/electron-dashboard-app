import { LocalStorageManager } from "../../common/utils";

// Mock the global localStorage object
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  length: 0,
  clear: jest.fn(),
  key: jest.fn(),
  removeItem: jest.fn(),
};

global.localStorage = localStorageMock;

describe("LocalStorageManager", () => {
  afterEach(() => {
    // Clear the mock localStorage after each test
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  it("should check and return cached data if it is not expired", () => {
    // Set up mock data in localStorage
    const key = "testKey";
    const data = [{ name: "Item 1" }];
    const timestamp = new Date().getTime().toString();
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(data));
    localStorageMock.getItem.mockReturnValueOnce(timestamp);

    // Call the checkLocalStorage method
    const cachedData = LocalStorageManager.checkLocalStorage(key, 1);

    // Expectations
    expect(localStorageMock.getItem).toHaveBeenCalledTimes(2);
    expect(cachedData).toEqual(data);
  });

  it("should return null if cached data is expired", () => {
    // Set up mock data in localStorage with an expired timestamp
    const key = "testKey";
    const data = [{ name: "Item 1" }];
    const expiredTimestamp = (new Date().getTime() - 3600000).toString();
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(data));
    localStorageMock.getItem.mockReturnValueOnce(expiredTimestamp);

    // Call the checkLocalStorage method
    const cachedData = LocalStorageManager.checkLocalStorage(key, 1);

    // Expectations
    expect(localStorageMock.getItem).toHaveBeenCalledTimes(2);
    expect(cachedData).toBeNull();
  });

  it("should return null if no cached data exists", () => {
    // Mock localStorage to return null for both getItem calls
    localStorageMock.getItem.mockReturnValueOnce(null);
    localStorageMock.getItem.mockReturnValueOnce(null);

    // Call the checkLocalStorage method
    const cachedData = LocalStorageManager.checkLocalStorage(
      "nonexistentKey",
      1
    );

    // Expectations
    expect(localStorageMock.getItem).toHaveBeenCalledTimes(2);
    expect(cachedData).toBeNull();
  });

  it("should save data to localStorage", () => {
    const key = "testKey";
    const data = [{ name: "Item 1" }];

    // Call the keepInLocalStorage method
    LocalStorageManager.keepInLocalStorage(key, data);

    // Expectations
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(2);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(data)
    );
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      `${key}Timestamp`,
      expect.any(String)
    );
  });
});
