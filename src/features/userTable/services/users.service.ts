export type User = {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
};
export async function getUsers(): Promise<User[]> {
  const res = await fetch("https://fakestoreapi.com/users");

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const data: User[] = await res.json();

  return data;
}
