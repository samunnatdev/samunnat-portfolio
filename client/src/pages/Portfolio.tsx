import { ArrowUpRight, Github } from "lucide-react";

export default function Portfolio() {
  return (
    <>
      <section className="page-hero page-wrap page-hero--compact">
        <div className="page-hero__eyebrow">Portfolio / 02</div>
        <h1>Ideas in motion.<br /><em>Projects in progress.</em></h1>
        <p className="page-hero__lede">A growing collection of experiments, exercises, and future builds. This section will evolve as the learning does.</p>
      </section>
      <section className="page-content page-wrap">
        <article className="portfolio-feature">
          <div className="portfolio-feature__visual"><div className="visual-orbit" /></div>
          <div className="portfolio-feature__body">
            <div>
              <div className="status-chip">Project status · in progress</div>
              <h2>AI / ML Learning Lab</h2>
              <p>A living space for small experiments while I build fluency in Python, data, and machine learning fundamentals. The project is intentionally open-ended: learn a concept, make it concrete, write down what changed.</p>
              <div className="tag-list"><span className="tag">Python</span><span className="tag">NumPy</span><span className="tag">pandas</span><span className="tag">PyTorch</span><span className="tag">Math for ML</span></div>
            </div>
            <div className="feature-footer"><span style={{ color: "rgba(253,240,213,.52)", font: "11px DM Mono, monospace" }}>01 / FEATURED DIRECTION</span><a className="button-primary" href="https://github.com/samunnatdev" target="_blank" rel="noreferrer">View GitHub <Github size={16} /></a></div>
          </div>
        </article>

        <div className="section-heading" style={{ marginTop: 92, marginBottom: 20 }}>
          <div><div className="eyebrow">What comes next</div><h2>More to come.</h2></div>
          <p>These are the directions I am shaping next — not polished case studies yet, but useful markers for the work ahead.</p>
        </div>
        <div className="project-list">
          <article className="project-card"><div className="project-card__number">02 / DIRECTION</div><h3>Data practice</h3><p>Small datasets, cleaner questions, and a better feel for how information behaves.</p></article>
          <article className="project-card"><div className="project-card__number">03 / DIRECTION</div><h3>Model experiments</h3><p>Simple models built to understand the trade-offs before reaching for complexity.</p></article>
          <article className="project-card"><div className="project-card__number">04 / DIRECTION</div><h3>Useful interfaces</h3><p>Thoughtful ways to make technical work easier to explore, explain, and use.</p></article>
        </div>
        <div style={{ marginTop: 34 }}><a className="text-link" href="https://github.com/samunnatdev" target="_blank" rel="noreferrer">See the code as it grows <ArrowUpRight size={15} /></a></div>
      </section>
    </>
  );
}
