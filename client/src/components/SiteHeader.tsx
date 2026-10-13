import { ArrowUpRight } from "lucide-react";

type SiteHeaderProps = {
  current: "home" | "archive";
};

export default function SiteHeader({ current }: SiteHeaderProps) {
  const isArchive = current === "archive";

  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="This Home 4 Sale home">
        <img src="/images/logo.png" alt="This Home 4 Sale" />
      </a>
      <nav aria-label="Primary navigation">
        <a href="/" aria-current={isArchive ? undefined : "page"}>New Project</a>
        <a href="/sold/1210-miremont-drive" aria-current={isArchive ? "page" : undefined}>Sold Projects</a>
      </nav>
      {isArchive ? (
        <a className="header-cta" href="/">
          New project <ArrowUpRight size={15} />
        </a>
      ) : (
        <a className="header-cta" href="/sold/1210-miremont-drive">
          Sold project <ArrowUpRight size={15} />
        </a>
      )}
    </header>
  );
}
