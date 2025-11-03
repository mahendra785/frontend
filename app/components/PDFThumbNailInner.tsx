"use client";

import { useEffect, useState } from "react";

export default function PdfThumbnailInner({
  fileUrl,
  width = 160,
}: {
  fileUrl: string;
  width?: number;
}) {
  const [thumb, setThumb] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    (async () => {
      // ✅ Load *browser-only* pdfjs build dynamically
      const pdfjsLib = await import("pdfjs-dist/build/pdf");
      await import("pdfjs-dist/build/pdf.worker.min.js");

      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js";

      const pdf = await pdfjsLib.getDocument(fileUrl).promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 1 });
      const scale = width / viewport.width;
      const scaledViewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      canvas.height = scaledViewport.height;
      canvas.width = scaledViewport.width;

      await page.render({ canvasContext: ctx, viewport: scaledViewport })
        .promise;

      if (isMounted) setThumb(canvas.toDataURL());
    })();

    return () => {
      isMounted = false;
    };
  }, [fileUrl, width]);

  if (!thumb)
    return <div className="w-full h-44 animate-pulse bg-[#111] rounded" />;

  return (
    <img
      src={thumb}
      className="rounded shadow-md select-none"
      alt="PDF thumbnail"
      draggable={false}
    />
  );
}
