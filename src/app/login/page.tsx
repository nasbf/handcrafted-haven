"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import styles from "./Login.module.css";

export default function LoginPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = "/suppliers";
  }

  return (
    <main className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.authTitle}>
          Welcome Back
        </h1>

        <form
          onSubmit={handleSubmit}
          className={styles.authForm}
        >
          <input
            type="email"
            placeholder="Email Address"
            className={styles.authInput}
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className={styles.authInput}
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="submit"
            className={styles.authButton}
          >
            Login
          </button>
        </form>

        <p className={styles.authFooter}>
          Don&apos;t have an account?{" "}
          <Link href="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
