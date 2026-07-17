"use client";

import Link from "next/link";

const portfolioUrl = "/";

export default function GameVaultPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #07111d 0%, #14233a 100%)",
        color: "#f8fafc",
        fontFamily: "Arial, sans-serif",
        padding: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: 800, width: "100%", textAlign: "center" }}>
        <p style={{ letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.75, marginBottom: "0.75rem" }}>
          GameVault project
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", margin: "0 0 1rem" }}>
          A clean, modern project page for GameVault.
        </h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.7, opacity: 0.92, marginBottom: "1.5rem" }}>
          This page now shows a proper project landing experience with a clear intro and a direct link back to the portfolio.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link
            href={portfolioUrl}
            style={{
              display: "inline-flex",
              padding: "0.8rem 1rem",
              borderRadius: "999px",
              background: "#f8fafc",
              color: "#07111d",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Back to portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}
