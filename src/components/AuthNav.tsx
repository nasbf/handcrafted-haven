"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import LogoutButton from "./LogoutButton";
import styles from "./Navbar.module.css";

export default function AuthNav() {
  const supabase = createClient();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    getUser();
  }, [supabase]);

  if (!user) {
    return (
      <div className={styles.authLinks}>
        {pathname !== "/login" && (
          <Link href="/login">Login</Link>
        )}

        {pathname !== "/register" && (
          <Link href="/register">Register</Link>
        )}
      </div>
    );
  }

  return (
    <div className={styles.authLinks}>
      <Link href="/dashboard">Dashboard</Link>
      <LogoutButton />
    </div>
  );
}
