const skills = [
  {
    icon: "🌐",
    name: "Networking",
    items: "TCP/IP · VLANs · OSPF · STP · Routing concepts · Cisco IOS · MikroTik",
  },
  {
    icon: "🔌",
    name: "Physical infrastructure",
    items: "Cat5/6 cabling · Termination · Patching · Fibre awareness · Rack setup",
  },
  {
    icon: "🖥️",
    name: "Systems & virtualisation",
    items: "Linux CLI · Windows Server · VirtualBox · VMware · Hyper-V",
  },
  {
    icon: "☁️",
    name: "Cloud",
    items: "AWS EC2 · S3 · VPC · IAM · CloudWatch · Free tier labs",
  },
  {
    icon: "⚙️",
    name: "Automation",
    items: "Python basics · Ansible intro · Terraform fundamentals",
  },
  {
    icon: "🔬",
    name: "Lab platforms",
    items: "Packet Tracer · EVE-NG · Network simulation & topology design",
  },
];

export default function SkillsSection() {
  return (
    <section className="section" id="skills">
      <div className="sec-eyebrow">Technical skills</div>
      <div className="sec-title">What I work with</div>
      <div className="skills-grid">
        {skills.map((s) => (
          <article key={s.name} className="skill-card">
            <div className="skill-icon" aria-hidden="true">{s.icon}</div>
            <div className="skill-name">{s.name}</div>
            <div className="skill-items">{s.items}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
