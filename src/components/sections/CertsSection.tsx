const certs = [
  {
    badge: "AWS",
    cls: "cb-aws",
    name: "AWS Academy Cloud Foundations",
    sub: "Course badge · Amazon Web Services",
  },
  {
    badge: "SAFE",
    cls: "cb-safe",
    name: "SafePass",
    sub: "Valid · Ireland",
  },
  {
    badge: "CCNA",
    cls: "cb-cisco",
    name: "CCNA",
    sub: "Cisco · Studying, exam Feb 2027",
  },
  {
    badge: "SAA",
    cls: "cb-aws",
    name: "AWS Solutions Architect",
    sub: "Amazon · Planned",
  },
];

export default function CertsSection() {
  return (
    <section className="section" id="certs">
      <div className="sec-eyebrow">Certifications</div>
      <div className="sec-title">Credentials &amp; progress</div>
      <div className="certs-row">
        {certs.map((c) => (
          <div key={c.name} className="cert">
            <div className={`cert-badge ${c.cls}`} aria-hidden="true">{c.badge}</div>
            <div>
              <div className="cert-name">{c.name}</div>
              <div className="cert-sub">{c.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
