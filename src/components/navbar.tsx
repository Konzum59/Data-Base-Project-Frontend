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
<<<<<<< HEAD
        <Link
          href={"/"}
          className=" rounded-md hover:cursor-pointer hover:bg-cyan-400"
        >
          Home!
        </Link>
        <Link
          href={"/myListings "}
          className="hover:cursor-pointer hover:bg-cyan-400 rounded-md"
=======
        <Link href={"/"} className="hover:cursor-pointer hover:bg-cyan-400">
          Home
        </Link>
        <Link
          href={"/myListings "}
          className="hover:cursor-pointer hover:bg-cyan-400"
>>>>>>> 2a2682fe5fc749d910797aa4aaf4072ba6d4b869
        >
          Listings
        </Link>
        <Link
          href={"/myOrders"}
<<<<<<< HEAD
          className="hover:cursor-pointer hover:bg-cyan-400 rounded-md"
=======
          className="hover:cursor-pointer hover:bg-cyan-400"
>>>>>>> 2a2682fe5fc749d910797aa4aaf4072ba6d4b869
        >
          {" "}
          Orders
        </Link>
<<<<<<< HEAD
        <Link
          href={"/chat"}
          className="hover:cursor-pointer hover:bg-cyan-400 rounded-md"
        >
=======
        <Link href={"/chat"} className="hover:cursor-pointer hover:bg-cyan-400">
>>>>>>> 2a2682fe5fc749d910797aa4aaf4072ba6d4b869
          Messages
        </Link>
        <Link
          href={"/myAccount"}
<<<<<<< HEAD
          className="hover:cursor-pointer hover:bg-cyan-400 rounded-md"
=======
          className="hover:cursor-pointer hover:bg-cyan-400"
>>>>>>> 2a2682fe5fc749d910797aa4aaf4072ba6d4b869
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
<<<<<<< HEAD
          <button
            className="rounded-md hover:bg-cyan-400 text-white"
            onClick={() => setAccessToken(null)}
          >
            Logout
          </button>{" "}
=======
          <button onClick={() => setAccessToken(null)}>Logout</button>{" "}
>>>>>>> 2a2682fe5fc749d910797aa4aaf4072ba6d4b869
        </>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}
