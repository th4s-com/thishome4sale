import SiteHeader from "@/components/SiteHeader";
import { ArrowDown, ArrowUpRight, Images } from "lucide-react";
import { useEffect } from "react";

const upcomingProject = {
  eyebrow: "The next project is taking shape",
  headline: "New project\ncoming.",
  description:
    "We are preparing the next thoughtfully renovated home. Check back for the announcement when it is ready, or revisit a recently completed ThisHome4Sale project.",
  image: "/images/coming-soon-renovation-collage.webp",
};

export default function Home() {
  useEffect(() => {
    const title = "New Project Coming | ThisHome4Sale.com";
    const description = "A new ThisHome4Sale renovation is in progress. Explore a recently sold project while the next address takes shape.";
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:image"]')?.setAttribute("content", upcomingProject.image);

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "ThisHome4Sale.com",
      url: window.location.href,
      description,
    });
    script.dataset.projectSchema = "true";
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <div className="coming-soon" id="top">
      <SiteHeader current="home" />
      <main>
        <section className="coming-soon__main" aria-labelledby="new-project-heading">
          <img
            className="coming-soon__image"
            src={upcomingProject.image}
            alt="Architectural renovation materials and plans"
          />
          <div className="coming-soon__overlay" />
          <div className="coming-soon__content">
            <p className="eyebrow eyebrow--green">{upcomingProject.eyebrow}</p>
            <h1 id="new-project-heading">{upcomingProject.headline}</h1>
            <p className="coming-soon__text">{upcomingProject.description}</p>
            <div className="coming-soon__actions">
              <a className="button button--green" href="/sold/1210-miremont-drive">
                Explore sold projects <ArrowUpRight size={17} />
              </a>
              <a className="text-link" href="#project-record">
                What we have sold <ArrowDown size={15} />
              </a>
            </div>
          </div>
          <div className="coming-soon__meter" aria-hidden="true"><span /></div>
        </section>

        <section className="project-ledger section-pad" id="project-record" aria-labelledby="project-record-heading">
          <div>
            <p className="section-index">01 / PROJECT RECORD</p>
            <h2 id="project-record-heading">Homes made<br />for what’s next.</h2>
          </div>
          <div className="project-ledger__copy">
            <p>Every completed project remains part of the record. Explore past renovations, photographs, and property details while the next home is being prepared.</p>
            <a className="text-link" href="/sold/1210-miremont-drive">
              <Images size={16} /> View 1210 Miremont Drive
            </a>
          </div>
        </section>
      </main>
      <footer className="simple-footer">© 2026 ThisHome4Sale.com · Home remodel, renovations and sales.</footer>
    </div>
  );
}
