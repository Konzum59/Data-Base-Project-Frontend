"use client";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { serialize } from "cookie";
import { useUser } from "./getUserData";

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setAccessToken } = useUser();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    const response = await fetch("http://127.0.0.1:8000/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      document.cookie = serialize("access_token", data.access_token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60,
        path: "/",
      });
      document.cookie = serialize("refresh_token", data.refresh_token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60,
        path: "/",
      });
      document.cookie = serialize("user", JSON.stringify(data.user), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60,
        path: "/",
      });

      setUser(data.user);
      setAccessToken(data.access_token);

      router.push("/myAccount");

      console.log("Logged in successfully");
      console.log(`Token to jest: ${document.cookie}`);
    } else {
      console.log("Login failed");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className=" rounded-md leading-7 "
        type="username"
        name="username"
        placeholder="Username"
        required
      />
      <input
        type="password"
        className="rounded-md mr-3 ml-1 leading-7"
        name="password"
        placeholder="Password"
        required
      />
      <button
        type="submit"
        className=" hover:cursor-pointer hover:bg-cyan-400 text-white rounded-md"
      >
        Login
      </button>
    </form>
  );
}
