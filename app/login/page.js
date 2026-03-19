"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import logoImage from "../logo.png";

export default function LoginPage() {
  const router = useRouter();
  const [regNumber, setRegNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!regNumber.trim() || !password.trim()) {
      setError("Регистрийн дугаар болон нууц үгээ оруулна уу.");
      return;
    }

    setError("");
    router.push("/dashboard");
  }

  return (
    <div className="login-screen">
      <div className="login-shell">
        <section className="login-side-panel">
          <div className="login-logo">
            <Image src={logoImage} alt="Намын лого" className="login-logo-img" priority />
          </div>
          <p className="login-logo-subtitle">Намын дотоод удирдлагын систем</p>
          <h2>Хурал, оролцогч, шийдвэрийн хяналтын нэгдсэн платформ</h2>
          <p className="login-panel-text">
            Аймаг, сум, баг тус бүрийн хурлын мэдээллийг нэгдсэн байдлаар удирдаж, оролцогчдын шийдвэрийн явцыг
            бодит хугацаанд хянах боломжтой.
          </p>
        </section>

        <section className="login-card">
          <h1>Нэвтрэх</h1>
          <p className="login-subtitle">Регистрийн дугаар болон нууц үгээ оруулна уу.</p>
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="regNumber">Регистрийн дугаар</label>
            <input
              id="regNumber"
              name="regNumber"
              type="text"
              autoComplete="username"
              placeholder="AA00000000"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              required
            />

            <label htmlFor="password">Нууц үг</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Нэвтрэх</button>
            <button type="button" className="secondary-btn" onClick={() => router.push("/dashboard")}>
              Шууд самбар руу орох
            </button>
            <p className="login-error" aria-live="polite">
              {error}
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}
