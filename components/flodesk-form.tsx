"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    FlodeskObject?: string;
    fd?: (...args: any[]) => void;
  }
}

export default function FlodeskForm() {
  useEffect(() => {
    const styleId = "flodesk-custom-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        /* -----------------------------
         * Custom DATOU Flodesk Styling
         * ----------------------------- */
        .waitlist-embed {
          max-width: 640px;
          margin: 0 auto;
          width: 100%;
          text-align: left !important;
        }

        .waitlist-embed > div,
        .waitlist-embed .fd-card,
        .waitlist-embed .fd-container,
        .waitlist-embed .flodesk-card {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        .waitlist-embed form {
          display: grid !important;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          width: 100%;
        }

        .waitlist-embed form > *:nth-child(3),
        .waitlist-embed form > *:nth-child(4),
        .waitlist-embed form > button {
          grid-column: 1 / -1;
        }

        @media (max-width: 767.98px) {
          .waitlist-embed form {
            grid-template-columns: 1fr !important;
          }
        }

        .waitlist-embed input[type="text"],
        .waitlist-embed input[type="email"] {
          height: 56px !important;
          border: 1px solid #e6e6e6 !important;
          border-radius: 14px !important;
          padding: 0 16px !important;
          font-size: 16px !important;
          background: #fff !important;
          color: #0b0b0b !important;
          width: 100%;
          transition: all 0.2s ease;
          font-family: inherit !important;
        }

        .waitlist-embed input:focus {
          outline: none !important;
          border-color: #9eb6ff !important;
          box-shadow: 0 0 0 3px rgba(158, 182, 255, 0.35) !important;
        }

        .waitlist-embed button[type="submit"] {
          height: 56px !important;
          border: 2px solid #e88e56 !important;
          border-radius: 9999px !important;
          padding: 0 40px !important;
          background: #f29b63 !important;
          color: #0b0b0b !important;
          font-weight: 700 !important;
          font-size: 16px !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          margin-top: 12px !important;
          align-self: center !important;
          min-width: 200px;
        }

        .waitlist-embed button[type="submit"]:hover {
          background: #e88e56 !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(242, 155, 99, 0.3) !important;
        }

        .waitlist-embed label {
          font-size: 14px !important;
          color: #4a4a4a !important;
          margin-bottom: 6px !important;
          font-weight: 500 !important;
          display: block !important;
        }

        .waitlist-embed h1,
        .waitlist-embed h2,
        .waitlist-embed h3,
        .waitlist-embed h4,
        .waitlist-embed h5,
        .waitlist-embed h6,
        .waitlist-embed .fd-heading,
        .waitlist-embed .fd-subcopy,
        .waitlist-embed .fd-description {
          display: none !important;
        }

        /* Hide duplicate Flodesk fields */
        .waitlist-embed input:nth-of-type(n+4),
        .waitlist-embed label:nth-of-type(n+4),
        .waitlist-embed form > div:nth-of-type(n+4):not(:has(button)) {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    const loadFlodesk = () => {
      const formContainer = document.getElementById("fd-form-691edb28d5435631768d7e1b");
      if (window.fd && formContainer && !formContainer.dataset.initialized) {
        formContainer.dataset.initialized = "true";
        window.fd("form", {
          formId: "691edb28d5435631768d7e1b",
          containerEl: "#fd-form-691edb28d5435631768d7e1b",
        });
      } else if (!window.fd) {
        setTimeout(loadFlodesk, 300);
      }
    };

    if (!document.querySelector('script[src*="flodesk"]')) {
      const script = document.createElement("script");
      script.src = "https://assets.flodesk.com/universal.js";
      script.async = true;
      script.onload = loadFlodesk;
      document.head.appendChild(script);
    } else {
      loadFlodesk();
    }

    return () => {
      const form = document.getElementById("fd-form-691edb28d5435631768d7e1b");
      if (form) form.innerHTML = "";
    };
  }, []);

  return (
    <div className="waitlist-embed" data-flodesk-inline>
      <div id="fd-form-691edb28d5435631768d7e1b" key="flodesk-form-container"></div>
    </div>
  );
}
