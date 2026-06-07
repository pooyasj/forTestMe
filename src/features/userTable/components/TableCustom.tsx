"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { getUsers, User } from "../services/users.service";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import ModeToggle from "@/src/components/ui/DarkMode";
export default function TableCustom() {
  const [user, setUser] = useState<User[] | null>(null);
  const [direction, setDirection] = useState("asc");
  useEffect(() => {
    const Users = async () => {
      const data = await getUsers();
      setUser(data);
      return;
    };
    Users();
  }, []);
  const Sorted = () => {
    if (!user) return;

    const sorted = [...user].sort((a, b) => {
      if (direction === "asc") {
        return a.username.localeCompare(b.username);
      } else {
        return b.username.localeCompare(a.username);
      }
    });

    setUser(sorted);
    setDirection(direction === "asc" ? "desc" : "asc");
  };
  return (
    <div>
      <Table className=" bg-indigo-400 rounded-2xl">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <div className="flex items-center gap-1 whitespace-nowrap">
                username
                <button onClick={Sorted}>
                  <CaretSortIcon className="h-4 w-4 bg-blue-800 text-white " />
                </button>
              </div>
            </TableHead>
            <TableHead className="text-center">email</TableHead>
            <TableHead className="text-center">password</TableHead>
            <TableHead className="text-end">
              <ModeToggle />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!user && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-blue-800 text-2xl"
              >
                please :))
              </TableCell>
            </TableRow>
          )}
          {user?.map((value) => {
            return (
              <TableRow key={value.id}>
                <TableCell className="font-medium">{value.username}</TableCell>
                <TableCell>{value.email}</TableCell>
                <TableCell>{value.password}</TableCell>
              </TableRow>
            );
          })}
          <TableRow className={user ? "" : "hidden"}>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
