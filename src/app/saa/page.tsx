import type { Metadata } from "next";
import Link from "next/link";
import { getLabsForSection } from "../../lib/mdx";

export const metadata: Metadata = {
  title: "AWS SAA Labs",
  description:
    "Hands-on AWS labs covering VPC, EC2, IAM, S3, Route 53, Load Balancers, Auto Scaling and more. Built towards the AWS Solutions Architect Associate certification.",
};

export default function SAAPage() {
  const labs = getLabsForSection("saa");

  return (
    <div className="labs-page">
      <header className="labs-header">
        <div className="sec-eyebrow">Amazon Web Services · SAA</div>
        <h1 className="labs-title">AWS SAA Labs</h1>
        <p className="labs-desc">
          Hands-on AWS labs covering VPC, EC2, IAM, S3, Route 53,
          Load Balancers, Auto Scaling and more. Built towards the
          AWS Solutions Architect Associate certification.
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
            <Link href={`/saa/${lab.slug}`} key={lab.slug} className="lab-card">
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
