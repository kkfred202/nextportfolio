export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-eyebrow">
        <span className="live-dot" aria-hidden="true"></span>
        Open to junior roles &middot; Dublin
      </div>
      <h1>
        BSc Computing &amp; IT<br />
        <strong>Network &amp; Cloud<br />Infrastructure</strong>
      </h1>
      <p className="hero-bio">
        3rd-year student at CCT College Dublin. Hands-on with physical infrastructure,
        structured cabling, virtualisation labs on EVE-NG, and cloud fundamentals.
        Working towards CCNA and AWS Solutions Architect.
      </p>
      <div className="pill-row" aria-label="Technologies">
        {["EVE-NG", "Cisco IOS", "MikroTik", "Python", "Ansible", "Terraform", "AWS", "Linux CLI", "Cat5/6 Cabling"].map((pill) => (
          <span key={pill} className="pill">{pill}</span>
        ))}
      </div>
      <div className="cta-row">
        <a href="#contact" className="btn-dark">Get in touch</a>
        <a href="#projects" className="btn-ghost">View labs &amp; projects</a>
      </div>
    </section>
  );
}
