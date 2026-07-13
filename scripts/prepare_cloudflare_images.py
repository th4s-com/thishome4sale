"""Prepare Cloudflare Pages image assets for ThisHome4Sale.com.

The deployed site cannot use Manus preview-only ``/manus-storage`` URLs. This
script creates stable, optimized files under ``client/public/images`` so Vite
copies them into ``dist/public/images`` for Cloudflare Pages.
"""

from pathlib import Path
from shutil import rmtree

from PIL import Image, ImageOps


PROJECT = Path("/home/ubuntu/thishome4sale")
PROPERTY_SOURCE = Path("/home/ubuntu/webdev-static-assets/property")
GENERATED_SOURCE = Path("/home/ubuntu/webdev-static-assets")
OUTPUT = PROJECT / "client/public/images"

PROPERTY_IMAGES = [
    "IMG_7624.jpg",
    "IMG_7628.jpg",
    "IMG_7629.jpg",
    "IMG_7630.jpg",
    "IMG_7631.jpg",
    "IMG_7633.jpg",
    "IMG_7634.jpg",
    "IMG_7540.jpg",
    "IMG_7547.jpg",
    "IMG_7541.jpg",
    "IMG_7548.jpg",
    "IMG_7535.jpg",
    "IMG_7564.jpg",
    "IMG_7534.jpg",
    "IMG_7620.jpg",
    "IMG_7553.jpg",
    "IMG_7552.jpg",
    "IMG_7558.jpg",
    "IMG_7570.jpg",
]


def save_jpeg(source: Path, destination: Path, quality: int = 88) -> None:
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        image.thumbnail((2400, 2400), Image.Resampling.LANCZOS)
        image.save(
            destination,
            "JPEG",
            quality=quality,
            optimize=True,
            progressive=True,
        )


def save_webp(source: Path, destination: Path, max_size: tuple[int, int]) -> None:
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image)
        image.thumbnail(max_size, Image.Resampling.LANCZOS)
        image.save(destination, "WEBP", quality=84, method=6)


def save_png(source: Path, destination: Path, max_size: tuple[int, int]) -> None:
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image)
        image.thumbnail(max_size, Image.Resampling.LANCZOS)
        image.save(destination, "PNG", optimize=True)


def main() -> None:
    if OUTPUT.exists():
        rmtree(OUTPUT)
    OUTPUT.mkdir(parents=True)

    for filename in PROPERTY_IMAGES:
        quality = 80 if filename == "IMG_7570.jpg" else 88
        save_jpeg(PROPERTY_SOURCE / filename, OUTPUT / filename, quality)

    save_png(PROPERTY_SOURCE / "logo-cropped.png", OUTPUT / "logo.png", (900, 500))
    save_png(
        GENERATED_SOURCE / "thishome4sale-icon.png",
        OUTPUT / "favicon.png",
        (128, 128),
    )
    save_webp(
        GENERATED_SOURCE / "renovation-ledger-texture.png",
        OUTPUT / "renovation-ledger-texture.webp",
        (2400, 2400),
    )
    save_webp(
        GENERATED_SOURCE / "navy-blueprint-field.png",
        OUTPUT / "navy-blueprint-field.webp",
        (2400, 2400),
    )
    save_webp(
        GENERATED_SOURCE / "coming-soon-renovation-collage.png",
        OUTPUT / "coming-soon-renovation-collage.webp",
        (2400, 2400),
    )

    total_bytes = sum(path.stat().st_size for path in OUTPUT.iterdir())
    print(f"Prepared {len(list(OUTPUT.iterdir()))} files ({total_bytes / 1_000_000:.2f} MB)")


if __name__ == "__main__":
    main()
