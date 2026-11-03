
import type { Metadata } from "next";

interface PageMetadataOptions {
  title: string;
  description?: string;
}

const SITE_NAME = "BookNook";

const DEFAULT_DESCRIPTION =
  "Discover books, borrow your favorite reads, and share knowledge with the BookNook community.";

export function getPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
}: PageMetadataOptions): Metadata {
  return {
    title: `${SITE_NAME} | ${title}`,
    description,
  };
}
