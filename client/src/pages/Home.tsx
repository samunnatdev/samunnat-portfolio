import { ArrowUpRight, BrainCircuit, Code2, Database } from "lucide-react";
import { Link } from "wouter";
import { profileImage } from "@/lib/profile-image";

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="page-wrap hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">Personal profile · AI / ML</div>
            <h1 className="hero-title">Samunnat<span>Tuladhar.</span></h1>
            <p className="hero-lede">Aspiring AI/ML Engineer building foundations in Python, data, and intelligent systems — one deliberate experiment at a time.</p>
            <div className="hero-actions">
              <Link href="/project" className="button-primary">Explore the work <ArrowUpRight size={16} /></Link>
              <Link href="/about" className="button-ghost">More about me</Link>
            </div>
            <div className="hero-meta"><span className="hero-meta__line" /> <span>Learning in public / Kathmandu · Nepal</span></div>
          </div>
          <div className="hero-image-wrap">
            <div className="hero-index">01 / INTRODUCTION</div>
            <div className="hero-image-card">
              <img className="hero-image" src={profileImage} alt="Portrait of Samunnat Tuladhar" />
              <div className="hero-image-caption"><span>Profile / 2026</span><span>Curiosity over certainty.</span></div>
            </div>
          </div>
        </div>
      </section>

      <div className="ticker-strip">
        <div className="ticker-strip__inner"><span>Python</span><strong>●</strong><span>Data structures</span><strong>●</strong><span>Math fundamentals</span><strong>●</strong><span>Machine learning</span></div>
      </div>

      <section className="section section--cream">
        <div className="page-wrap">
          <div className="section-heading">
            <div><div className="eyebrow">A little context</div><h2>A work in progress,<br /><em>by design.</em></h2></div>
            <p>There is no finish line on this page yet. The point is to document the process: what I am learning, what I am building, and what comes next.</p>
          </div>
          <div className="home-intro-grid">
            <blockquote className="pull-quote">“I learn best by doing — and by making the <em>small ideas</em> visible.”</blockquote>
            <div className="intro-copy">
              <p>I am in the middle of learning AI and machine learning, working through Python, data structures, and the math fundamentals that everything else builds on.</p>
              <p>I try to back up what I study with small projects, so the learning stays practical and honest. This project site is a place to keep that momentum in view.</p>
              <Link href="/about" className="text-link">Read the longer version <ArrowUpRight size={15} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--deep">
        <div className="page-wrap">
          <div className="section-heading">
            <div><div className="eyebrow">Current focus</div><h2>Three directions,<br />one <span style={{ color: "var(--red)" }}>practice.</span></h2></div>
            <div className="section-heading__number">02 / 04</div>
          </div>
          <div className="focus-grid">
            <article className="focus-card"><div className="focus-card__index">01</div><BrainCircuit size={25} color="var(--steel)" style={{ marginTop: 54 }} /><h3>Understand the foundations</h3><p>Python, algorithms, data structures, and the math that makes models meaningful.</p></article>
            <article className="focus-card"><div className="focus-card__index">02</div><Database size={25} color="var(--steel)" style={{ marginTop: 54 }} /><h3>Experiment with data</h3><p>Small, focused exercises that turn concepts into something I can test and explain.</p></article>
            <article className="focus-card"><div className="focus-card__index">03</div><Code2 size={25} color="var(--steel)" style={{ marginTop: 54 }} /><h3>Keep building</h3><p>A portfolio that grows alongside the learning, without pretending the work is finished.</p></article>
          </div>
        </div>
      </section>
    </>
  );
}
