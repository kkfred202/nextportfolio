import Link from "next/link";
import type { Project } from "../../types/portfolio";

const academicProjects: Project[] = [
  {
    label: "Networking · Packet Tracer",
    name: "VLAN segmentation & inter-VLAN routing lab",
    desc: "Configured VLANs, trunk ports, and inter-VLAN routing on Cisco switches and routers. Verified reachability and traffic isolation.",
    tags: ["Cisco IOS", "VLANs", "STP", "Packet Tracer"],
    slug: "vlan-lab",
    section: "ccna",
  },
  {
    label: "Routing · EVE-NG",
    name: "OSPF multi-area routing topology",
    desc: "Built a multi-router OSPF topology in EVE-NG. Configured areas, verified adjacencies, and traced routing tables.",
    tags: ["OSPF", "Routing", "EVE-NG", "Cisco IOS"],
    slug: "ospf-routing",
    section: "ccna",
  },
  {
    label: "Systems · Virtualisation",
    name: "Linux server environment setup",
    desc: "Installed and configured Linux VMs in VirtualBox and VMware for use as test endpoints in networking labs. CLI-based setup and administration.",
    tags: ["Linux", "VirtualBox", "VMware", "CLI"],
    slug: null,
    section: null,
  },
  {
    label: "Cloud · AWS",
    name: "AWS core services exploration",
    desc: "Hands-on with EC2, S3, VPC, IAM and CloudWatch through AWS free tier. Built foundational understanding for CCP certification.",
    tags: ["AWS", "EC2", "S3", "VPC", "IAM"],
    slug: "aws-core-services",
    section: "saa",
  },
];

const personalProjects: Project[] = [
  {
    label: "MikroTik · Home lab",
    name: "MikroTik hAP ac³ home network setup",
    desc: "Configured a MikroTik hAP ac³ from scratch using RouterOS. Set up secure SSH remote access using MikroTik Cloud DDNS and port forwarding. Hardened the device by disabling unused services and securing wireless with WPA2.",
    tags: ["MikroTik", "RouterOS", "SSH", "DDNS", "Port Forwarding", "WPA2"],
    slug: null,
    section: null,
  },
  {
    label: "MikroTik · Planning",
    name: "Café Wi-Fi hotspot design",
    desc: "Researched and planned a commercial Wi-Fi hotspot solution using MikroTik's built-in Hotspot Server. Design included a captive portal, per-user bandwidth limits, and voucher-based access control.",
    tags: ["MikroTik", "Hotspot Server", "Captive Portal", "Bandwidth Mgmt"],
    slug: null,
    section: null,
  },
];

function ProjectRow({ label, name, desc, tags, slug, section }: Project) {
  const inner = (
    <div className="proj-row">
      <div className="proj-left">
        <div className="proj-label">{label}</div>
        <div className="proj-name">{name}</div>
        <div className="proj-desc">{desc}</div>
        <div className="proj-tags">
          {tags.map((tag) => (
            <span key={tag} className="ptag">{tag}</span>
          ))}
        </div>
      </div>
      <span className="proj-arrow" aria-hidden="true">↗</span>
    </div>
  );

  if (slug && section) {
    return (
      <Link href={`/${section}/${slug}`} style={{ textDecoration: "none" }}>
        {inner}
      </Link>
    );
  }
  return inner;
}

export default function ProjectsSection() {
  return (
    <>
      <section className="section">
        <div className="sec-eyebrow">Lab write-ups</div>
        <div className="sec-title">Study labs</div>
        <div className="labs-list">
          <Link href="/ccna" className="lab-card">
            <div className="lab-card-top">
              <div className="lab-card-left">
                <div className="lab-card-title">CCNA Labs</div>
                <div className="lab-card-desc">
                  Routing, switching, VLANs, OSPF, ACLs and more.
                  Built in Packet Tracer and EVE-NG.
                </div>
              </div>
              <div className="lab-card-right">
                <span className="lab-arrow" aria-hidden="true">↗</span>
              </div>
            </div>
          </Link>
          <Link href="/saa" className="lab-card">
            <div className="lab-card-top">
              <div className="lab-card-left">
                <div className="lab-card-title">AWS SAA Labs</div>
                <div className="lab-card-desc">
                  VPC, EC2, IAM, S3, Load Balancers and more.
                  Built towards AWS Solutions Architect Associate.
                </div>
              </div>
              <div className="lab-card-right">
                <span className="lab-arrow" aria-hidden="true">↗</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="sec-eyebrow">Labs &amp; projects</div>
        <div className="sec-title">Academic &amp; lab work</div>
        <div className="proj-list">
          {academicProjects.map((p) => (
            <ProjectRow key={p.name} {...p} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="sec-eyebrow">Home networking</div>
        <div className="sec-title">Personal projects</div>
        <p className="sec-subtitle">
          Real-world work done outside of college on my own hardware.
        </p>
        <div className="proj-list">
          {personalProjects.map((p) => (
            <ProjectRow key={p.name} {...p} />
          ))}
        </div>
      </section>
    </>
  );
}
