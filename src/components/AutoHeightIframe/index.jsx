import React, { useCallback, useRef, useState } from "react";

// Resizes the iframe to match its (same-origin) content height, so the
// embedded page never scrolls inside its own scrollbar on the docs site.
export default function AutoHeightIframe({ src, title, minHeight = 600 }) {
  const iframeRef = useRef(null);
  const observerRef = useRef(null);
  const [height, setHeight] = useState(minHeight);

  const measure = useCallback(() => {
    const doc = iframeRef.current?.contentDocument;
    const next = doc?.documentElement.scrollHeight;
    if (next) setHeight(next);
  }, []);

  const handleLoad = useCallback(() => {
    measure();

    const doc = iframeRef.current?.contentDocument;
    if (doc && typeof ResizeObserver !== "undefined") {
      observerRef.current?.disconnect();
      observerRef.current = new ResizeObserver(measure);
      observerRef.current.observe(doc.documentElement);
    }
  }, [measure]);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title={title}
      allow="clipboard-write"
      onLoad={handleLoad}
      style={{
        display: "block",
        width: "100%",
        height: `${height}px`,
        border: "none",
        borderRadius: "12px",
      }}
    />
  );
}
