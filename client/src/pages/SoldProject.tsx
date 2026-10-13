import PhotoLightbox from "@/components/PhotoLightbox";
import SiteHeader from "@/components/SiteHeader";
import { listing } from "@/content/listing";
import { ArrowUpRight, Check, Copy, Download, Images, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SoldProject() {
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);

  useEffect(() => {
    const title = `${listing.address.street} | Sold Project | ThisHome4Sale.com`;
    const description = `Sold project archive for ${listing.address.street}, ${listing.address.cityStateZip}. Completed project record updated September 25, 2026.`;
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:image"]')?.setAttribute("content", listing.images[0]);

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SingleFamilyResidence",
      name: `Sold project — ${listing.address.street}`,
      url: window.location.href,
      image: listing.images,
      dateModified: listing.statusNotice.updated.isoDate,
      address: {
        "@type": "PostalAddress",
        streetAddress: listing.address.street,
        addressLocality: "Ballwin",
        addressRegion: "MO",
        postalCode: "63011",
        addressCountry: "US",
      },
      numberOfBedrooms: 3,
      numberOfBathroomsTotal: 2.5,
      floorSize: { "@type": "QuantitativeValue", value: 1400, unitCode: "FTK" },
      yearBuilt: 1965,
    });
    script.dataset.listingSchema = "true";
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(`${listing.address.street}, ${listing.address.cityStateZip}`);
    toast.success("Address copied");
  };

  return (
    <div className="site-shell" id="top">
      <SiteHeader current="archive" />
      <main>
        <section className="contract-notice archive-notice" aria-label="Project status" role="status">
          <div className="contract-notice__inner">
            <span className="contract-notice__eyebrow">Sold project archive</span>
            <div className="contract-notice__copy">
              <strong>{listing.statusNotice.title}</strong>
              <div>
                <p>This completed renovation is retained as part of the ThisHome4Sale project record.</p>
                <time dateTime={listing.statusNotice.updated.isoDate}>{listing.statusNotice.updated.label}</time>
              </div>
            </div>
          </div>
        </section>

        <section className="hero" aria-labelledby="property-address">
          <div className="hero__copy">
            <div>
              <p className="eyebrow eyebrow--green">Sold project / 001</p>
              <h1 id="property-address">
                {listing.address.street}
                <span>{listing.address.cityStateZip}</span>
              </h1>
            </div>
            <div className="hero__bottom">
              <p className="price">{listing.price}</p>
              <div className="hero__actions">
                <span className="button button--green button--status">Property sold</span>
                <a className="button button--ghost" href={listing.brochure.href} download>
                  {listing.brochure.label} <Download size={17} />
                </a>
              </div>
            </div>
          </div>
          <button className="hero__image" onClick={() => setPhotoIndex(0)} aria-label="Open property photo gallery">
            <img src={listing.images[0]} alt={`Exterior of ${listing.address.street}`} />
            <span className="hero__image-label"><Images size={16} /> View all {listing.images.length} photos</span>
          </button>
          <div className="hero__rail" aria-hidden="true"><span>TH4S / 001</span><span>WEST COUNTY</span></div>
        </section>

        <section className="fact-ledger" aria-label="Property facts">
          {listing.facts.map((fact) => (
            <div className="fact" key={fact.label}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </div>
          ))}
        </section>

        <section className="intro section-pad" id="details">
          <div className="section-index">01 / COMPLETED PROJECT</div>
          <div className="intro__main">
            <h2>{listing.headline}</h2>
            <p>{listing.description}</p>
          </div>
          <div className="intro__note">
            <span className="green-square"><Check size={16} /></span>
            <p><strong>Project complete.</strong> This home was renovated and sold; the page remains available as a project archive.</p>
          </div>
        </section>

        <section className="gallery section-pad" id="gallery">
          <div className="gallery__heading">
            <div>
              <p className="section-index">02 / PHOTO RECORD</p>
              <h2>Every finished space.</h2>
            </div>
            <button className="text-link" onClick={() => setPhotoIndex(0)}>
              Open full gallery <Images size={17} />
            </button>
          </div>
          <div className="photo-grid">
            {listing.images.slice(0, 9).map((image, index) => (
              <button className={`photo-grid__item photo-grid__item--${index + 1}`} onClick={() => setPhotoIndex(index)} key={image}>
                <img src={image} alt={`1210 Miremont Drive, property photo ${index + 1}`} loading={index > 2 ? "lazy" : "eager"} />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
          <button className="button button--navy gallery__more" onClick={() => setPhotoIndex(9)}>
            View all {listing.images.length} photos <ArrowUpRight size={17} />
          </button>
        </section>

        <section className="highlights section-pad">
          <div className="highlights__title">
            <p className="section-index section-index--light">03 / PROJECT NOTES</p>
            <h2>Established home.<br />New point of view.</h2>
          </div>
          <div className="highlights__list">
            {listing.highlights.map((highlight) => (
              <article className="highlight" key={highlight.number}>
                <span>{highlight.number}</span>
                <h3>{highlight.title}</h3>
                <p>{highlight.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="location section-pad" id="location">
          <div className="location__address">
            <p className="section-index">04 / LOCATION</p>
            <p className="eyebrow">{listing.neighborhood}</p>
            <h2>At home in<br />West County.</h2>
            <p><strong>Located in West County,</strong> with convenient access to shopping, parks, commuter routes, and the Parkway school community.</p>
            <div className="location__actions">
              <a className="button button--navy" href={listing.mapUrl} target="_blank" rel="noreferrer">
                Open in Maps <MapPin size={17} />
              </a>
              <button className="icon-button" onClick={copyAddress} aria-label="Copy property address"><Copy size={17} /></button>
            </div>
          </div>
          <div className="location__graphic" aria-hidden="true">
            <div className="map-ring map-ring--one" />
            <div className="map-ring map-ring--two" />
            <div className="map-cross" />
            <div className="map-pin"><span />1210</div>
            <p>38.592° N<br />90.568° W</p>
          </div>
        </section>

        <section className="archive-closing section-pad" aria-labelledby="next-project-heading">
          <div>
            <p className="section-index section-index--light">05 / WHAT’S NEXT</p>
            <h2 id="next-project-heading">Another home<br />is in progress.</h2>
          </div>
          <div className="archive-closing__copy">
            <p>1210 Miremont Drive is part of our completed-project record. The next ThisHome4Sale renovation is taking shape now.</p>
            <a className="button button--green" href="/">
              See the next project <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <img src={listing.logo} alt="This Home 4 Sale" />
        <p>Home remodel, renovations and sales.</p>
        <p>© 2026 ThisHome4Sale.com</p>
      </footer>

      <PhotoLightbox images={listing.images} index={photoIndex} onChange={setPhotoIndex} />
    </div>
  );
}
