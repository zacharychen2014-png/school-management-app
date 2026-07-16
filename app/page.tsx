"use client";

import { useEffect, useState } from "react";

type Ripple = {
  id: number;
  x: number;
  y: number;
};

const projects = [
  {
    title: "Northstar Studio",
    description:
      "A cinematic design system for a creative agency with modular product pages and immersive storytelling.",
    stack: ["Next.js", "TypeScript", "Framer Motion"],
    live: "https://vercel.com",
    repo: "https://github.com",
    accent: "linear-gradient(135deg, #0f2b4d 0%, #25c5ff 100%)",
  },
  {
    title: "Tidal Commerce",
    description:
      "A polished e-commerce experience with fluid product discovery, checkout journeys, and animated interactions.",
    stack: ["React", "Node.js", "Tailwind"],
    live: "https://netlify.com",
    repo: "https://github.com",
    accent: "linear-gradient(135deg, #102748 0%, #5cf5d6 100%)",
  },
  {
    title: "Moonlit Notes",
    description:
      "A journaling platform centered on calm visuals, thoughtful writing, and delightful micro-interactions.",
    stack: ["Next.js", "Supabase", "PostgreSQL"],
    live: "https://nextjs.org",
    repo: "https://github.com",
    accent: "linear-gradient(135deg, #081223 0%, #7ea8ff 100%)",
  },
];

const skills = [
  { name: "React", icon: "⚛" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "TS" },
  { name: "Tailwind", icon: "T" },
  { name: "UI Systems", icon: "▣" },
  { name: "Design Thinking", icon: "✦" },
];

const journey = [
  { year: "This year", title: "First steps into web development", body: "I started exploring web development this year and began turning ideas into polished digital experiences." },
  { year: "This year", title: "Building with curiosity", body: "I’m learning through hands-on projects, improving my design sense, and growing my confidence as a developer." },
  { year: "This year", title: "Creating with intention", body: "I’m focusing on thoughtful interfaces, clean code, and projects that feel both modern and memorable." },
];

const highlights = [
  { value: "1", label: "Finished project" },
  { value: "3 days", label: "Experience so far" },
  { value: "100%", label: "Care for detail" },
];

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev: string[]) =>
              prev.includes(entry.target.id) ? prev : [...prev, entry.target.id],
            );
          }
        });
      },
      { threshold: 0.2 },
    );

    document.querySelectorAll(".reveal").forEach((element) => io.observe(element));
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setMouse({ x: event.clientX, y: event.clientY });
      const id = Date.now() + Math.random();
      setRipples((prev: Ripple[]) => [...prev, { id, x: event.clientX, y: event.clientY }]);
      window.setTimeout(() => {
        setRipples((prev: Ripple[]) => prev.filter((ripple: Ripple) => ripple.id !== id));
      }, 700);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <main className="portfolio-shell">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <div className="cursor-glow" style={{ transform: `translate(${mouse.x}px, ${mouse.y}px)` }} />
      <div className="ripple-layer">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="water-ripple"
            style={{ left: ripple.x, top: ripple.y }}
          />
        ))}
      </div>

      <section className="hero reveal visible" id="home">
        <nav className="top-nav">
          <a href="#home" className="brand-mark">A</a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">Developer • crafting calm, luminous web experiences</p>
          <h1>
            Hi, I’m <span>Zachary Chen</span>.
          </h1>
          <p className="hero-copy">
            I’m a growing developer building thoughtful digital experiences with a focus on clarity, simplicity, and polished design.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="#projects">
              Explore my work
            </a>
            <a className="secondary-btn" href="#about">
              Learn more
            </a>
          </div>
          <div className="hero-stats">
            {highlights.map((item) => (
              <div key={item.label} className="stat-pill">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="moon" />
          <div className="cloud cloud-a" />
          <div className="cloud cloud-b" />
          <div className="wave wave-a" />
          <div className="wave wave-b" />
          <div className="wave wave-c" />
        </div>
      </section>

      <section className={`section reveal ${visibleSections.includes("about") ? "visible" : ""}`} id="about">
        <div className="section-heading">
          <p className="eyebrow">About me</p>
          <h2>Building graceful digital experiences with purpose.</h2>
        </div>
        <div className="about-grid">
          <div className="panel">
            <p>
              I’m a developer who is still building my experience, but I already care deeply about creating elegant,
              user-friendly digital work with a calm and modern feel.
            </p>
            <p>
              I’m focused on learning quickly, refining the details of each project, and creating experiences that feel
              thoughtful and memorable.
            </p>
          </div>
          <div className="panel highlight-panel">
            <h3>Currently focused on</h3>
            <ul>
              <li>Beautiful interfaces with responsive layouts</li>
              <li>Fast, elegant front-end experiences</li>
              <li>Thoughtful systems that scale with the product</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={`section reveal ${visibleSections.includes("skills") ? "visible" : ""}`} id="skills">
        <div className="section-heading">
          <p className="eyebrow">Skills</p>
          <h2>Tools and disciplines that power my work.</h2>
        </div>
        <div className="skills-grid">
          {skills.map((skill) => (
            <article key={skill.name} className="skill-card">
              <div className="skill-icon">{skill.icon}</div>
              <h3>{skill.name}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className={`section reveal ${visibleSections.includes("journey") ? "visible" : ""}`} id="journey">
        <div className="section-heading">
          <p className="eyebrow">Programming journey</p>
          <h2>A timeline of how my craft has grown.</h2>
        </div>
        <div className="timeline">
          {journey.map((step) => (
            <div key={step.year} className="timeline-card">
              <span>{step.year}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`section reveal ${visibleSections.includes("achievements") ? "visible" : ""}`} id="achievements">
        <div className="section-heading">
          <p className="eyebrow">Achievements</p>
          <h2>Milestones that shape the work I create.</h2>
        </div>
        <div className="achievements-grid">
          <article className="panel achievement-card">
            <h3>1 finished project</h3>
            <p>Built a complete project that reflects my current style and growing development skills.</p>
          </article>
          <article className="panel achievement-card">
            <h3>3 days of experience</h3>
            <p>My work is still early, but I’m learning quickly and applying each lesson with care.</p>
          </article>
          <article className="panel achievement-card">
            <h3>Detail-first approach</h3>
            <p>Every interface is shaped to feel calm, intuitive, and memorable from the first glance onward.</p>
          </article>
        </div>
      </section>

      <section className={`section reveal ${visibleSections.includes("projects") ? "visible" : ""}`} id="projects">
        <div className="section-heading">
          <p className="eyebrow">Featured projects</p>
          <h2>Selected work that reflects my creative direction.</h2>
        </div>
        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.title} className="project-card">
              <div className="project-preview" style={{ background: project.accent }}>
                <div className="screen-top" />
                <div className="screen-body">
                  <div className="screen-bar" />
                  <div className="screen-bar short" />
                  <div className="screen-card" />
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-list">
                  {project.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <div className="card-actions">
                  <a href={project.live} target="_blank" rel="noreferrer">
                    Live site
                  </a>
                  <a href={project.repo} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`section reveal ${visibleSections.includes("gallery") ? "visible" : ""}`} id="gallery">
        <div className="section-heading">
          <p className="eyebrow">Gallery</p>
          <h2>Moments from recent work and explorations.</h2>
        </div>
        <div className="gallery-grid">
          <div className="gallery-card tall" />
          <div className="gallery-card" />
          <div className="gallery-card" />
        </div>
      </section>

      <section className={`section reveal ${visibleSections.includes("contact") ? "visible" : ""}`} id="contact">
        <div className="section-heading">
          <p className="eyebrow">Contact</p>
          <h2>Let’s build something beautiful together.</h2>
        </div>
        <div className="contact-grid">
          <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
            <input type="text" placeholder="Your name" />
            <input type="email" placeholder="Your email" />
            <textarea placeholder="Tell me about your idea" rows={5} />
            <button type="submit">Send message</button>
          </form>
          <div className="contact-links">
            <a href="mailto:alex@example.com">alex@example.com</a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
