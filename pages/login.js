import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import Link from "next/link";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/auth";

export default function Login() {
  const authContext = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.email.length > 0 && form.password.length > 0) {
      const req = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await req.json();
      if (res.success) {
        authContext.setUser(res.id);
        router.push("/home");
      } else {
        alert("Some fields are incorrect");
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Less bullying, more Happiness</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={`${styles.header} ${styles.grid1}`}>
        <Image
          className={styles.logoApp}
          src="/logo.png"
          alt="Less bullying, more Happiness"
          width={80}
          height={80}
          onClick={() => {
            router.push("/");
          }}
        />
      </header>

      <main className={styles.main}>
        <div className={styles.grid}>
          <h1 className={styles.title}>Log in:</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label1}>Email:</label>
            <input
              className={styles.input1}
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
              }}
            />
            <label className={styles.label2}>Password:</label>
            <input
              className={styles.input2}
              type="password"
              value={form.password}
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
              }}
            />
            <button className={styles.button1}>Log In</button>
            <p className={styles.p}>
              Don{"'"}t have an account?{" "}
              <Link href="/signup" className={styles.link}>
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
