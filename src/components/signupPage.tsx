"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/signup/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      router.push("");
    } else {
      const data = await response.json();
      setErrorMessage("Unable to register.");
      console.log(data);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-row gap-2 ml-20">
        <div>
          <input
            className="rounded-md m-1"
            type="text"
            name="username"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            className="rounded-md m-1"
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            className="rounded-md m-1"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="hover:cursor-pointer hover:bg-cyan-400 rounded-md text-white"
        >
          Sign Up
        </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
