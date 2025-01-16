"use client";
import Link from "next/link";
import LoginPage from "./loginPage";
import { useUser } from "./getUserData";
import { useState, useEffect } from "react";
export function Navbar() {
  const { user, accessToken, setAccessToken } = useUser();
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    setIsLogged(accessToken !== null);
  }, [user, accessToken]);
  return (
    <div className="flex bg-cyan-600 leading-9 ">
      <div className="text-white gap-3 flex px-5">
        <Link
          href={"/"}
          className=" rounded-md hover:cursor-pointer hover:bg-cyan-400"
        >
          Home
        </Link>
        <Link
          href={"/myListings "}
          className="hover:cursor-pointer hover:bg-cyan-400 rounded-md"
        >
          Listings
        </Link>
        <Link
          href={"/myOrders"}
          className="hover:cursor-pointer hover:bg-cyan-400 rounded-md"
        >
          {" "}
          Orders
        </Link>
        <Link
          href={"/chat"}
          className="hover:cursor-pointer hover:bg-cyan-400 rounded-md"
        >
          Messages
        </Link>
        <Link
          href={"/myAccount"}
          className="hover:cursor-pointer hover:bg-cyan-400 rounded-md"
        >
          My account
        </Link>
      </div>
      {isLogged ? (
        <>
          <div className="text-white absolute top-1 right-48 text-xl">
            {" "}
            Hello user {user?.username}
          </div>
          <button
            className="rounded-md hover:bg-cyan-400 text-white"
            onClick={() => setAccessToken(null)}
          >
            Logout
          </button>{" "}
        </>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}
