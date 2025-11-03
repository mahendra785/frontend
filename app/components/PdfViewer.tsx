"use client";
import dynamic from "next/dynamic";

const PdfThumbnailInner = dynamic(() => import("./PDFThumbNailInner"), {
  ssr: false,
});

export default function PdfThumbnail(props: any) {
  return <PdfThumbnailInner {...props} />;
}
