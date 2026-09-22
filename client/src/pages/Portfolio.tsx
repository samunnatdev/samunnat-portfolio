import { Github } from "lucide-react";

export default function Portfolio() {
  return (
    <>
      <section className="page-hero page-wrap page-hero--compact">
        <div className="page-hero__eyebrow">Project / 02</div>
        <h1>One project.<br /><em>Still in progress.</em></h1>
        <p className="page-hero__lede">A focused work-in-progress space for documenting the learning, experiments, and implementation as they take shape.</p>
      </section>
      <section className="page-content page-wrap">
        <article className="portfolio-feature project-card--feature">
          <div className="portfolio-feature__visual"><div className="visual-orbit" /></div>
          <div className="portfolio-feature__body">
            <div>
              <div className="status-chip">Project 1 · in progress</div>
              <h2>Project 1</h2>
              <p>This project is currently in progress. More details will be added as the work develops and the ideas become ready to share.</p>
              <div className="tag-list"><span className="tag">In progress</span><span className="tag">Building</span><span className="tag">Learning</span></div>
            </div>
            <div className="feature-footer"><span style={{ color: "rgba(253,240,213,.52)", font: "11px DM Mono, monospace" }}>PROJECT 1 / IN PROGRESS</span><a className="button-primary" href="https://github.com/samunnatdev" target="_blank" rel="noreferrer">View GitHub <Github size={16} /></a></div>
          </div>
        </article>
      </section>
    </>
  );
}
