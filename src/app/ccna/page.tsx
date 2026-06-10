import type { Metadata } from "next";
import Link from "next/link";
import { getLabsForSection } from "../../lib/mdx";

export const metadata: Metadata = {
  title: "CCNA Labs",
  description:
    "Hands-on networking labs covering routing, switching, VLANs, OSPF, ACLs, NAT and more. Built in Packet Tracer and EVE-NG.",
};

export default function CCNAPage() {
  const labs = getLabsForSection("ccna");

  return (
    <div className="labs-page">
      <header className="labs-header">
        <div className="sec-eyebrow">Cisco · CCNA</div>
        <h1 className="labs-title">CCNA Labs</h1>
        <p className="labs-desc">
          Hands-on networking labs covering routing, switching, VLANs,
          OSPF, ACLs, NAT and more. Built in Packet Tracer and EVE-NG.
        </p>
        <div className="labs-count">
          {labs.length} lab{labs.length !== 1 ? "s" : ""}
        </div>
      </header>

      {labs.length === 0 ? (
        <p className="labs-empty">NO LABS PUBLISHED YET — CHECK BACK SOON</p>
      ) : (
        <div className="labs-list">
          {labs.map((lab) => (
            <Link href={`/ccna/${lab.slug}`} key={lab.slug} className="lab-card">
              <div className="lab-card-top">
                <div className="lab-card-left">
                  <div className="lab-card-title">{lab.title}</div>
                  <div className="lab-card-desc">{lab.description}</div>
                  <div className="proj-tags" style={{ marginTop: "10px" }}>
                    {lab.tags.map((tag) => (
                      <span key={tag} className="ptag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="lab-card-right">
                  <span
                    className={`proj-status ${
                      lab.status === "done"
                        ? "status-done"
                        : lab.status === "progress"
                        ? "status-progress"
                        : "status-planned"
                    }`}
                  >
                    {lab.status === "done"
                      ? "✓ Completed"
                      : lab.status === "progress"
                      ? "In Progress"
                      : "Planned"}
                  </span>
                  <span className="lab-arrow" aria-hidden="true">↗</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
