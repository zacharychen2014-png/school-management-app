"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const projects = [
  { n: "01", title: "Tideboard", type: "Analytics platform", desc: "A calm, clear dashboard that turns complex ocean-quality data into decisions communities can trust.", tech: ["Next.js", "TypeScript", "D3.js"], color: "a", link: "View case study" },
  { n: "02", title: "Lunaria", type: "Commerce experience", desc: "An immersive storefront for a thoughtful skincare brand, designed around slow rituals and small details.", tech: ["React", "Shopify", "Framer"], color: "b", link: "Visit website" },
  { n: "03", title: "Waypoint", type: "Travel companion", desc: "A beautifully simple mobile planning tool for building routes worth remembering.", tech: ["React Native", "Expo", "Maps API"], color: "c", link: "Explore project" },
];

const skills = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Figma"];

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

  return <main onMouseMove={move}>
    <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
    <div className="cursor-glow" style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }} />
    <div className="ripples" aria-hidden="true">{ripples.map((ripple) => <i key={ripple.id} style={{ left: ripple.x, top: ripple.y }} />)}</div>
    <div className="stars" /><div className="shooting-star one" /><div className="shooting-star two" />
    <nav className="nav"><a className="logo" href="#top">n<span>.</span></a><div className="nav-links"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></div><a className="nav-cta" href="#contact">Let&apos;s talk <Arrow /></a></nav>

    <section className="hero" id="top">
      <div className="moon"><i /><i /><i /></div><div className="moon-reflection" />
      <div className="cloud cloud-one" /><div className="cloud cloud-two" />
      <div className="hero-copy"><p className="eyebrow">PORTFOLIO · 2025</p><h1>Hi, I&apos;m <em>Nova.</em><br />I build calm, memorable<br />digital experiences.</h1><p className="intro">A creative developer turning thoughtful ideas into expressive, high-performing websites and products.</p><a href="#work" className="primary">Explore my work <Arrow /></a></div>
      <p className="scroll-note">SCROLL TO DRIFT <b>↓</b></p><div className="ocean"><div className="wave wave-1" /><div className="wave wave-2" /><div className="wave wave-3" /></div>
    </section>

    <section className="section projects" id="work"><div className="section-head reveal"><p className="eyebrow">SELECTED WORK · 01 — 03</p><h2>Made with care,<br /><em>built for people.</em></h2><p>I partner with ideas that deserve a distinctive place in the world.</p></div>
      <div className="project-list">{projects.map((p, i) => <article className={`project reveal ${p.color}`} key={p.title} style={{ transitionDelay: `${i * 90}ms` }}><div className="project-preview"><div className="preview-top"><span>◉</span><span>◌</span><span>◒</span></div><div className="preview-ui"><b>{p.title}</b><div className="fake-chart"><i /><i /><i /><i /><i /><i /></div><div className="fake-lines"><i /><i /><i /></div></div><div className="preview-orb" /></div><div className="project-info"><div><span className="project-num">{p.n}</span><p className="eyebrow">{p.type}</p><h3>{p.title}</h3><p>{p.desc}</p><ul>{p.tech.map((t) => <li key={t}>{t}</li>)}</ul></div><div className="project-actions"><a href="#contact">{p.link} <Arrow /></a><a href="https://github.com" target="_blank">GitHub <Arrow /></a></div></div></article>)}</div>
    </section>

    <section className="section skills-section"><div className="section-head narrow reveal"><p className="eyebrow">THE TOOLKIT</p><h2>Fluent in the<br /><em>languages of the web.</em></h2></div><div className="skill-grid reveal">{skills.map((skill, i) => <div className="skill" key={skill}><span>{["◇", "✦", "⌁", "◒", "⚛", "▲", "⬡", "◈"][i]}</span>{skill}</div>)}</div></section>

    <section className="section journey"><div className="section-head reveal"><p className="eyebrow">THE CURRENT SO FAR</p><h2>A small timeline<br />of <em>big curiosity.</em></h2></div><div className="timeline reveal">{[["2021", "First line of code", "Fell in love with the magic of making something from nothing."], ["2022", "Design meets development", "Started crafting websites for people with ideas worth sharing."], ["2024", "Building independently", "Shipped products, collaborated with lovely teams, never stopped learning."], ["NOW", "Looking toward the horizon", "Creating work that makes the internet feel more human."]].map(([year, title, desc]) => <div className="moment" key={year}><b>{year}</b><div><i /><h3>{title}</h3><p>{desc}</p></div></div>)}</div></section>

    <section className="section achievements reveal"><p className="eyebrow">SOME NUMBERS, GENTLY</p><div className="achievement-grid"><div><strong>24<span>+</span></strong><p>projects brought to life</p></div><div><strong>3<span>+</span></strong><p>years of focused craft</p></div><div><strong>12<span>k</span></strong><p>lines written with love</p></div><div><strong>∞</strong><p>ideas still to explore</p></div></div></section>

    <section className="section gallery"><div className="section-head reveal"><p className="eyebrow">IN THE WILD</p><h2>Little glimpses<br />of the <em>work.</em></h2></div><div className="gallery-grid reveal">{["tall", "wide", "small", "small two", "wide last"].map((c, i) => <div key={c} className={`gallery-card ${c}`}><span>{["01 / TIDEBOARD", "02 / LUNARIA", "03 / WAYPOINT", "04 / EDITORIAL", "05 / OCEAN NOTES"][i]}</span><div /></div>)}</div></section>

    <section className="contact" id="contact"><div className="contact-glow" /><div className="contact-copy reveal"><p className="eyebrow">SEND A SIGNAL</p><h2>Let&apos;s make<br />some <em>waves.</em></h2><p>Have an idea, a collaboration, or just want to say hello? My inbox is always open.</p><a href="mailto:hello@novamakes.dev">hello@novamakes.dev <Arrow /></a><div className="socials"><a href="https://github.com">GitHub</a><a href="https://linkedin.com">LinkedIn</a><a href="https://instagram.com">Instagram</a></div></div><form className="contact-form reveal" onSubmit={submit}><label>Your name<input required placeholder="What should I call you?" /></label><label>Email address<input required type="email" placeholder="you@example.com" /></label><label>Tell me a little about it<textarea required placeholder="A new project, a wild idea..." /></label><button className="primary" type="submit">{sent ? "Message sent — thank you!" : "Send it into the sea"} <Arrow /></button></form><footer>© 2025 NOVA. MADE UNDER A MOONLIT SKY. <a href="#top">BACK TO THE TOP ↑</a></footer></section>
  </main>;
}
