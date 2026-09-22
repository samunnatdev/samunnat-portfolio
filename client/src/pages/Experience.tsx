import { ArrowUpRight } from "lucide-react";

const skills = ["Python", "SQL", "NumPy", "pandas", "PyTorch", "TensorFlow", "FastAPI", "PostgreSQL", "MySQL", "MongoDB", "AWS", "Google Cloud", "Docker", "Git", "GitHub", "VS Code", "Postman"];

export default function Experience() {
  return (
    <>
      <section className="page-hero page-wrap page-hero--compact">
        <div className="page-hero__eyebrow">Experience / 03</div>
        <h1>The path is<br /><em>the experience.</em></h1>
        <p className="page-hero__lede">I am early in the journey, so this page is less about job titles and more about the habits, foundations, and technical directions I am actively developing.</p>
      </section>
      <section className="page-content page-wrap">
        <div className="experience-grid">
          <div className="timeline">
            <article className="timeline-item"><div className="timeline-item__time">Now<br />In progress</div><div><h3>Building AI/ML foundations</h3><p>Working through Python, data structures, and the math fundamentals that support machine learning. The goal is understanding that compounds, not just collecting tools.</p></div></article>
            <article className="timeline-item"><div className="timeline-item__time">Practice<br />Ongoing</div><div><h3>Learning by making</h3><p>Backing up study with small projects and experiments. Each one is a chance to test whether a concept is understood well enough to explain and use.</p></div></article>
            <article className="timeline-item"><div className="timeline-item__time">Next<br />Direction</div><div><h3>Turning foundations into useful systems</h3><p>Growing from exercises into projects that connect data, models, and thoughtful interfaces — with the portfolio documenting that progression.</p></div></article>
          </div>
          <aside>
            <div className="skills-panel">
              <h3>Tools in the orbit</h3>
              <p>A working technical palette gathered from my public GitHub profile. Fluency is always a work in progress.</p>
              <div className="skills-cloud">{skills.map((skill) => <span className="tag" key={skill}>{skill}</span>)}</div>
              <div className="experience-note">The honest version: I am not presenting professional experience I do not have yet. I am presenting the direction I am consistently moving toward.</div>
            </div>
            <a className="text-link" style={{ marginTop: 27 }} href="https://github.com/samunnatdev" target="_blank" rel="noreferrer">Open my GitHub profile <ArrowUpRight size={15} /></a>
          </aside>
        </div>
      </section>
    </>
  );
}
