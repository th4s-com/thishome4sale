/**
 * RENOVATION LEDGER PAGE
 * Editorial asymmetry, evidence-first copy, large real property photography,
 * Oxford navy, warm paper, and disciplined renovation-green accents.
 */

import ContactForm from "@/components/ContactForm";
import PhotoLightbox from "@/components/PhotoLightbox";
import { listing } from "@/content/listing";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Check,
  Copy,
  ExternalLink,
  Images,
  MapPin,
  Share2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function BrandHeader({ comingSoon = false }: { comingSoon?: boolean }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="This Home 4 Sale home">
        <img src={listing.logo} alt="This Home 4 Sale" />
      </a>
      {comingSoon ? (
        <span className="header-status">Next home in progress</span>
      ) : (
        <>
          <nav aria-label="Primary navigation">
            <a href="#details">Details</a>
            <a href="#gallery">Photos</a>
            <a href="#location">Location</a>
          </nav>
          <a className="header-cta" href="#contact">
            Contact owner <ArrowDown size={15} />
          </a>
        </>
      )}
    </header>
  );
}

function ComingSoon() {
  const share = async () => {
    const data = {
      title: "A new ThisHome4Sale.com renovation is coming soon",
      text: listing.comingSoon.text,
      url: window.location.href,
    };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Page link copied");
      }
    } catch {
      // Closing the native share sheet is not an error the visitor needs to see.
    }
  };

  return (
    <div className="coming-soon" id="top">
      <BrandHeader comingSoon />
      <main className="coming-soon__main">
        <img className="coming-soon__image" src={listing.comingSoon.image} alt="Architectural renovation materials and plans" />
        <div className="coming-soon__overlay" />
        <div className="coming-soon__content">
          <p className="eyebrow">{listing.comingSoon.eyebrow}</p>
          <h1>{listing.comingSoon.headline}</h1>
          <p className="coming-soon__text">{listing.comingSoon.text}</p>
          <div className="coming-soon__actions">
            <button className="button button--green" onClick={share}>
              Share this page <Share2 size={17} />
            </button>
            <a className="text-link" href="mailto:?subject=A%20new%20ThisHome4Sale.com%20property%20is%20coming%20soon&body=https%3A%2F%2Fthishome4sale.com">
              Tell a friend <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
        <div className="coming-soon__meter" aria-hidden="true"><span /></div>
      </main>
      <footer className="simple-footer">© 2026 ThisHome4Sale.com · Home remodel, renovations and sales.</footer>
    </div>
  );
}

export default function Home() {
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);

  useEffect(() => {
    const description = listing.status === "coming-soon"
      ? listing.comingSoon.text
      : `${listing.price} · 3 bedrooms · 2.5 bathrooms · approximately 1,400 sq. ft. · Basement bonus room · Open house ${listing.openHouse.date}, ${listing.openHouse.time}.`;
    document.title = listing.status === "coming-soon"
      ? "A New Renovation Is Coming Soon | ThisHome4Sale.com"
      : `${listing.address.street} | For Sale By Owner`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:image"]')?.setAttribute(
      "content",
      listing.status === "coming-soon" ? listing.comingSoon.image : listing.images[0],
    );

    if (listing.status === "coming-soon") return;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SingleFamilyResidence",
      name: `${listing.label} — ${listing.address.street}`,
      url: window.location.href,
      image: listing.images,
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
      offers: { "@type": "Offer", price: 399900, priceCurrency: "USD", availability: "https://schema.org/InStock" },
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    script.dataset.listingSchema = "true";
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  if (listing.status === "coming-soon") return <ComingSoon />;

  const copyAddress = async () => {
    await navigator.clipboard.writeText(`${listing.address.street}, ${listing.address.cityStateZip}`);
    toast.success("Address copied");
  };

  return (
    <div className="site-shell" id="top">
      <BrandHeader />
      <main>
        {listing.openHouse.enabled && (
          <a className="open-house-bar" href="#visit">
            <span className="open-house-bar__label">
              <CalendarDays size={19} />
              <strong>Open House</strong>
            </span>
            <span className="open-house-bar__date">
              <small>{listing.openHouse.weekday}</small>
              <strong>{listing.openHouse.month} {listing.openHouse.day}</strong>
            </span>
            <span className="open-house-bar__time">{listing.openHouse.time}</span>
            <span className="open-house-bar__link">View details <ArrowDown size={16} /></span>
          </a>
        )}

        <section className="hero" aria-labelledby="property-address">
          <div className="hero__copy">
            <div>
              <p className="eyebrow eyebrow--green">{listing.label}</p>
              <h1 id="property-address">
                {listing.address.street}
                <span>{listing.address.cityStateZip}</span>
              </h1>
            </div>
            <div className="hero__bottom">
              <p className="price">{listing.price}</p>
              <a className="button button--green" href="#contact">
                Contact the owner <ArrowDown size={18} />
              </a>
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
          <div className="section-index">01 / THE PROPERTY</div>
          <div className="intro__main">
            <h2>{listing.headline}</h2>
            <p>{listing.description}</p>
          </div>
          <div className="intro__note">
            <span className="green-square"><Check size={16} /></span>
            <p><strong>Move-in ready.</strong> The renovation is complete and the property is available directly from the owner.</p>
          </div>
        </section>

        <section className="gallery section-pad" id="gallery">
          <div className="gallery__heading">
            <div>
              <p className="section-index">02 / PHOTO RECORD</p>
              <h2>See every finished space.</h2>
            </div>
            <button className="text-link" onClick={() => setPhotoIndex(0)}>
              Open full gallery <Images size={17} />
            </button>
          </div>
          <div className="photo-grid">
            {listing.images.slice(0, 9).map((image, index) => (
              <button className={`photo-grid__item photo-grid__item--${index + 1}`} onClick={() => setPhotoIndex(index)} key={image}>
                <img src={image} alt={`Property photo ${index + 1}`} loading={index > 2 ? "lazy" : "eager"} />
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
            <p className="section-index section-index--light">03 / WHY THIS HOME</p>
            <h2>Established neighborhood.<br />New point of view.</h2>
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
            <p><strong>Waycliffe Estates is the established residential subdivision around Miremont Drive</strong> in the Ballwin–Manchester area of West County, well placed for shopping, parks, commuter routes, and the Parkway school community.</p>
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

        <section className="visit section-pad" id="visit">
          <div className="visit__date">
            <p className="section-index">05 / COME THROUGH</p>
            <div className="visit__calendar">
              <span>{listing.openHouse.month}</span>
              <strong>{listing.openHouse.day}</strong>
              <small>{listing.openHouse.weekday}</small>
            </div>
          </div>
          <div className="visit__copy">
            <p className="eyebrow">Open House · {listing.openHouse.weekday}</p>
            <h2>See it in person.</h2>
            <p>Tour the renovation, walk the layout, and explore the established West County neighborhood in person.</p>
            <div className="visit__actions">
              <a className="button button--green" href={listing.mapUrl} target="_blank" rel="noreferrer">
                Get directions <ExternalLink size={17} />
              </a>
              <span>{listing.openHouse.time}</span>
            </div>
          </div>
        </section>

        <section className="property-record" aria-label="Buyer property record">
          {listing.record.map((item, index) => (
            <div className="property-record__item" key={item.label}>
              <span>{String(index + 1).padStart(2, "0")} / {item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </section>

        <section className="offer section-pad">
          <p className="section-index">07 / OFFER GUIDELINES</p>
          <div>
            <h2>Prepared offers<br />move efficiently.</h2>
          </div>
          <p>{listing.offerGuidelines}</p>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="contact-section__intro">
            <p className="section-index section-index--light">08 / CONTACT OWNER</p>
            <p className="eyebrow eyebrow--green">For Sale By Owner</p>
            <h2>Ask about<br />1210 Miremont.</h2>
            <p>Request a private showing, ask a property question, or begin a conversation about submitting an offer directly with the owner.</p>
            <div className="contact-section__record">
              <span>{listing.price}</span>
              <span>{listing.address.street}</span>
              <span>Ballwin · Missouri</span>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer className="site-footer">
        <img src={listing.logo} alt="This Home 4 Sale" />
        <p>Home remodel, renovations and sales.</p>
        <p>© 2026 ThisHome4Sale.com</p>
      </footer>

      <a className="mobile-cta" href="#contact">
        Contact owner <ArrowDown size={17} />
      </a>

      <PhotoLightbox images={listing.images} index={photoIndex} onChange={setPhotoIndex} />
    </div>
  );
}
