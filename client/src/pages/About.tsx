import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { profileImage } from "@/lib/profile-image";

export default function About() {
  return (
    <>
      <section className="page-hero page-wrap page-hero--compact">
        <div className="page-hero__eyebrow">About / 01</div>
        <h1>Still learning.<br /><em>Already building.</em></h1>
        <p className="page-hero__lede">A little context on where I am, what I am working towards, and why I choose small projects as a way to learn.</p>
      </section>
      <section className="page-content page-wrap">
        <div className="about-grid">
          <aside className="about-aside">
            <img className="about-photo" src={profileImage} alt="Samunnat Tuladhar" />
            <div className="aside-links">
              <a href="https://github.com/samunnatdev" target="_blank" rel="noreferrer"><Github size={15} /> GitHub <ArrowUpRight size={13} /></a>
              <a href="https://www.linkedin.com/in/samunnat-tuladhar-3528b0408/" target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn <ArrowUpRight size={13} /></a>
            </div>
          </aside>
          <div className="about-copy">
            <div className="eyebrow">The short version</div>
            <h2>I am building a stronger technical base for <span>AI and machine learning.</span></h2>
            <p>I am in the middle of learning AI and machine learning, working through Python, data structures, and the math fundamentals that everything else builds on.</p>
            <p>I learn best by doing, so I try to back up what I study with small projects — just to see if I actually understand something or only think I do. The work is intentionally modest right now, but the consistency is real.</p>
            <p>I do not have professional experience in this field yet. What I do have is a practice: showing up most days because I want to, not because a course is making me.</p>
            <div className="principles">
              <div className="principle"><div className="principle__number">01</div><h3>Small bets</h3><p>Keep the scope small enough to finish, reflect on, and improve.</p></div>
              <div className="principle"><div className="principle__number">02</div><h3>Clear thinking</h3><p>Learn the why behind the tools, not only the syntax that makes them run.</p></div>
              <div className="principle"><div className="principle__number">03</div><h3>Visible progress</h3><p>Document the process so progress has somewhere to accumulate.</p></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
