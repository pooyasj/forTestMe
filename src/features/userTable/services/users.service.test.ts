import { getUsers } from "./users.service";
import  { User } from "./users.service";

describe("getUsers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should fetch users successfully", async () => {
    const mockUsers: User[] = [
      {
        id: 1,
        email: "test@example.com",
        username: "testuser",
        password: "123456",
        name: {
          firstname: "John",
          lastname: "Doe",
        },
        phone: "123456789",
      },
    ];

    const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    } as Response);

    global.fetch = mockFetch;

    const users = await getUsers();

    expect(global.fetch).toHaveBeenCalledWith("https://fakestoreapi.com/users");
    expect(users).toEqual(mockUsers);
  });

  test("should throw an error when fetch fails", async () => {
    const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;

    mockFetch.mockResolvedValue({
      ok: false,
    } as Response);

    global.fetch = mockFetch;

    await expect(getUsers()).rejects.toThrow("Failed to fetch users");
  });
});