"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

const gameVaultUrl =
  "https://school-management-n8nt6svh1-zacharychen2014-4965s-projects.vercel.app/";


const projects = [
  { n: "01", title: "GameVault", type: "Web project", desc: "A project I made and wanted to feature here so it can be opened directly from this site.", tech: ["Next.js", "TypeScript"], color: "a", link: "Open project", url: gameVaultUrl },
  { n: "02", title: "", type: "", desc: "", tech: [], color: "b", link: "" },
  { n: "03", title: "", type: "", desc: "", tech: [], color: "c", link: "" },
];

const skills = ["", "", "", "", "", "", "", ""];

function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const lastRipple = useRef(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const update = () => setProgress(window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
    const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
    window.addEventListener("scroll", update, { passive: true }); update();
    return () => { window.removeEventListener("scroll", update); reveal.disconnect(); };
  }, []);

  const submit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setSent(true); e.currentTarget.reset(); };

  const move = (e: React.MouseEvent<HTMLElement>) => {
    setCursor({ x: e.clientX, y: e.clientY });
    if (e.clientY < window.innerHeight * .48 || Date.now() - lastRipple.current < 135) return;
    lastRipple.current = Date.now();
    const id = Date.now();
    setRipples((current) => [...current.slice(-5), { id, x: e.clientX, y: e.clientY }]);
    window.setTimeout(() => setRipples((current) => current.filter((ripple) => ripple.id !== id)), 1400);
  };

  return (
    <main onMouseMove={move}>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
      <div className="cursor-glow" style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }} />
      <div className="ripples" aria-hidden="true">{ripples.map((ripple) => <i key={ripple.id} style={{ left: ripple.x, top: ripple.y }} />)}</div>
      <div className="stars" /><div className="shooting-star one" /><div className="shooting-star two" />
      <nav className="nav">
        <a className="logo" href="#top">n<span>.</span></a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href={gameVaultUrl}>Game Vault</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="nav-cta" href="#contact">Let&apos;s talk <Arrow /></a>
      </nav>

      <section className="hero" id="top">
        <div className="moon"><i /><i /><i /></div>
        <div className="moon-reflection" />
        <div className="cloud cloud-one" />
        <div className="cloud cloud-two" />
        <div className="hero-copy">
          <p className="eyebrow">PORTFOLIO · 2025</p>
          <h1>Hi, I&apos;m <em>Zachary.</em><br />I build calm, memorable<br />digital experiences.</h1>
          <p className="intro">A creative developer turning thoughtful ideas into expressive, high-performing websites and products.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1rem" }}>
            <a href="#work" className="primary">Explore my work <Arrow /></a>
            <a
              href={gameVaultUrl}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.9rem 1.1rem",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.08)",
                color: "#f8fafc",
              }}
            >
              Open GameVault <Arrow />
            </a>
          </div>
        </div>
        <p className="scroll-note">SCROLL TO DRIFT <b>↓</b></p>
        <div className="ocean"><div className="wave wave-1" /><div className="wave wave-2" /><div className="wave wave-3" /></div>
      </section>

      <section className="section projects" id="work">
        <div className="section-head reveal" />
        <div className="project-list">
          {projects.map((p, i) => (
            <article className={`project reveal ${p.color}`} key={p.title || i} style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="project-preview">
                <div className="preview-top"><span>◉</span><span>◌</span><span>◒</span></div>
                <div className="preview-ui"><b>{p.title}</b><div className="fake-chart"><i /><i /><i /><i /><i /><i /></div><div className="fake-lines"><i /><i /><i /></div></div>
                <div className="preview-orb" />
              </div>
              <div className="project-info">
                <div>
                  <span className="project-num">{p.n}</span>
                  <p className="eyebrow">{p.type}</p>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <ul>{p.tech.map((t) => <li key={t}>{t}</li>)}</ul>
                </div>
                <div className="project-actions">
                  <Link href={p.url || "#contact"}>
                    {p.link ? `${p.link} ` : ""}<Arrow />
                  </Link>
                  <a href="https://github.com" target="_blank">GitHub <Arrow /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section skills-section">
        <div className="section-head narrow reveal">
          <p className="eyebrow">THE TOOLKIT</p>
          <h2>Fluent in the<br /><em>languages of the web.</em></h2>
        </div>
        <div className="skill-grid reveal">
          {skills.map((skill, i) => <div className="skill" key={skill || i}><span>{["◇", "✦", "⌁", "◒", "⚛", "▲", "⬡", "◈"][i]}</span>{skill}</div>)}
        </div>
      </section>


      <section className="section achievements reveal">
        <p className="eyebrow">SOME NUMBERS, GENTLY</p>
        <div className="achievement-grid">
          <div><strong>24<span>+</span></strong><p>projects brought to life</p></div>
          <div><strong>3<span>+</span></strong><p>years of focused craft</p></div>
          <div><strong>12<span>k</span></strong><p>lines written with love</p></div>
          <div><strong>∞</strong><p>ideas still to explore</p></div>
        </div>
      </section>

      <section className="section gallery">
        <div className="section-head reveal">
          <p className="eyebrow">IN THE WILD</p>
          <h2>Little glimpses<br />of the <em>work.</em></h2>
        </div>
        <div className="gallery-grid reveal">
          {['tall','wide','small','small two','wide last'].map((c, i) => (
            <div key={c} className={`gallery-card ${c}`}><span>{["01 / TIDEBOARD", "02 / LUNARIA", "03 / WAYPOINT", "04 / EDITORIAL", "05 / OCEAN NOTES"][i]}</span><div /></div>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-glow" />
        <div className="contact-copy reveal">
          <p className="eyebrow">SEND A SIGNAL</p>
          <h2>Let&apos;s make<br />some <em>waves.</em></h2>
          <p>Have an idea, a collaboration, or just want to say hello? My inbox is always open.</p>
          <a href="mailto:hello@novamakes.dev">hello@novamakes.dev <Arrow /></a>
          <div className="socials">
            <a href="https://github.com">GitHub</a>
            <a href="https://linkedin.com">LinkedIn</a>
            <a href="https://instagram.com">Instagram</a>
          </div>
        </div>
        <form className="contact-form reveal" onSubmit={submit}>
          <label>Your name<input required placeholder="What should I call you?" /></label>
          <label>Email address<input required type="email" placeholder="you@example.com" /></label>
          <label>Tell me a little about it<textarea required placeholder="A new project, a wild idea..." /></label>
          <button className="primary" type="submit">{sent ? "Message sent — thank you!" : "Send it into the sea"} <Arrow /></button>
        </form>
        <footer>© 2025 NOVA. MADE UNDER A MOONLIT SKY.</footer>
      </section>
    </main>
  );
}