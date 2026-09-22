import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section className="contact-section page-wrap">
      <div className="contact-grid">
        <div>
          <div className="eyebrow">Contact / 04</div>
          <h1 className="contact-heading">Let’s make<br /><span>something useful.</span></h1>
          <p className="contact-copy">For collaborations, learning conversations, thoughtful feedback, or just saying hello — email is the best place to reach me.</p>
        </div>
        <aside className="contact-card">
          <div className="contact-card__label">Email me directly</div>
          <a className="contact-card__email" href="mailto:samunnat.dev@gmail.com">samunnat.dev@gmail.com <ArrowUpRight size={18} /></a>
          <div className="contact-card__links">
            <a href="https://github.com/samunnatdev" target="_blank" rel="noreferrer"><span><Github size={16} style={{ verticalAlign: "middle", marginRight: 8 }} />GitHub</span><ArrowUpRight size={15} /></a>
            <a href="https://www.linkedin.com/in/samunnat-tuladhar-3528b0408/" target="_blank" rel="noreferrer"><span><Linkedin size={16} style={{ verticalAlign: "middle", marginRight: 8 }} />LinkedIn</span><ArrowUpRight size={15} /></a>
            <a href="mailto:samunnat.dev@gmail.com"><span><Mail size={16} style={{ verticalAlign: "middle", marginRight: 8 }} />Send an email</span><ArrowUpRight size={15} /></a>
          </div>
        </aside>
      </div>
    </section>
  );
}
