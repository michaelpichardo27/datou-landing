"use client"

import { useEffect } from 'react';

declare global {
  interface Window {
    FlodeskObject?: string;
    fd?: (...args: any[]) => void;
  }
}

export default function FlodeskForm() {
  useEffect(() => {
    // Inject custom styles for Flodesk form
    const styleId = 'flodesk-custom-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        /* Flodesk Custom Styles - Override default card/container */
        .waitlist-embed {
          max-width: 640px;
          margin: 0 auto;
          width: 100%;
        }

        /* Remove Flodesk default card styling */
        .waitlist-embed > div,
        .waitlist-embed .fd-card,
        .waitlist-embed .fd-container,
        .waitlist-embed .flodesk-card,
        .waitlist-embed [class*="Card"],
        .waitlist-embed [class*="Container"],
        .waitlist-embed [class*="container"],
        .waitlist-embed [class*="wrapper"] {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        /* Force transparent background on all nested divs except inputs */
        .waitlist-embed div:not(input):not(button) {
          background-color: transparent !important;
        }

        /* Hide Flodesk default headings/subcopy - keep only form fields */
        .waitlist-embed h1,
        .waitlist-embed h2,
        .waitlist-embed h3,
        .waitlist-embed h4,
        .waitlist-embed h5,
        .waitlist-embed h6,
        .waitlist-embed .fd-heading,
        .waitlist-embed .fd-title,
        .waitlist-embed .fd-subtitle,
        .waitlist-embed .fd-description,
        .waitlist-embed .fd-subcopy,
        .waitlist-embed .flodesk-heading,
        .waitlist-embed .flodesk-title,
        .waitlist-embed [class*="Heading"],
        .waitlist-embed [class*="Title"],
        .waitlist-embed [class*="Description"]:not([aria-live]),
        .waitlist-embed [class*="Subtitle"],
        .waitlist-embed div[class*="heading"],
        .waitlist-embed div[class*="title"] {
          display: none !important;
        }

        /* Hide descriptive paragraphs but keep error/success messages */
        .waitlist-embed > div > div > p:first-child,
        .waitlist-embed p.fd-description,
        .waitlist-embed p[class*="description"]:not([class*="error"]):not([class*="success"]) {
          display: none !important;
        }

        /* Form layout - vertical stacking with proper spacing */
        .waitlist-embed form,
        .waitlist-embed [role="form"] {
          display: grid !important;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          width: 100%;
        }

        /* Email field and button span full width */
        .waitlist-embed form > *:nth-child(3),
        .waitlist-embed form > *:nth-child(4),
        .waitlist-embed form > button {
          grid-column: 1 / -1;
        }

        @media (max-width: 767.98px) {
          .waitlist-embed form,
          .waitlist-embed [role="form"] {
            grid-template-columns: 1fr !important;
          }

          .waitlist-embed form > *:nth-child(3),
          .waitlist-embed form > *:nth-child(4),
          .waitlist-embed form > button {
            grid-column: 1;
          }
        }

        /* Input field styling */
        .waitlist-embed input[type="email"],
        .waitlist-embed input[type="text"],
        .waitlist-embed .fd-input,
        .waitlist-embed input[class*="Input"] {
          height: 56px !important;
          border: 1px solid #E6E6E6 !important;
          border-radius: 14px !important;
          padding: 0 16px !important;
          font-size: 16px !important;
          line-height: 1.2 !important;
          background: #FFFFFF !important;
          color: #0B0B0B !important;
          width: 100%;
          flex: 1;
          transition: all 0.2s ease;
          font-family: inherit !important;
        }

        .waitlist-embed input[type="email"]::placeholder,
        .waitlist-embed input[type="text"]::placeholder,
        .waitlist-embed .fd-input::placeholder,
        .waitlist-embed input::placeholder {
          color: #999999 !important;
          opacity: 1 !important;
        }

        /* Ensure placeholder text shows on webkit browsers */
        .waitlist-embed input::-webkit-input-placeholder {
          color: #999999 !important;
          opacity: 1 !important;
        }

        .waitlist-embed input::-moz-placeholder {
          color: #999999 !important;
          opacity: 1 !important;
        }

        .waitlist-embed input:-ms-input-placeholder {
          color: #999999 !important;
          opacity: 1 !important;
        }

        /* Focus state */
        .waitlist-embed input[type="email"]:focus,
        .waitlist-embed input[type="text"]:focus,
        .waitlist-embed .fd-input:focus {
          outline: none !important;
          border-color: #9EB6FF !important;
          box-shadow: 0 0 0 3px rgba(158, 182, 255, 0.35) !important;
        }

        /* Button styling - pill shape with brand color */
        .waitlist-embed button[type="submit"],
        .waitlist-embed .fd-btn,
        .waitlist-embed .fd-button,
        .waitlist-embed button[class*="Button"],
        .waitlist-embed [role="button"][type="submit"] {
          height: 56px !important;
          border: 2px solid #E88E56 !important;
          border-radius: 9999px !important;
          padding: 0 40px !important;
          background: #F29B63 !important;
          color: #0B0B0B !important;
          font-weight: 700 !important;
          font-size: 16px !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          white-space: nowrap !important;
          font-family: inherit !important;
          flex-shrink: 0;
          margin-top: 12px !important;
          align-self: center !important;
          min-width: 200px;
          text-transform: none !important;
          letter-spacing: normal !important;
        }

        /* Ensure button text is visible */
        .waitlist-embed button[type="submit"] span,
        .waitlist-embed button[type="submit"] *,
        .waitlist-embed .fd-btn span,
        .waitlist-embed .fd-btn * {
          color: #0B0B0B !important;
        }

        @media (max-width: 767.98px) {
          .waitlist-embed button[type="submit"],
          .waitlist-embed .fd-btn {
            width: 100%;
            max-width: 100%;
            align-self: stretch !important;
          }
        }

        /* Button hover state */
        .waitlist-embed button[type="submit"]:hover,
        .waitlist-embed .fd-btn:hover {
          background: #E88E56 !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(242, 155, 99, 0.3) !important;
        }

        /* Button active state */
        .waitlist-embed button[type="submit"]:active,
        .waitlist-embed .fd-btn:active {
          transform: translateY(1px);
        }

        /* Button disabled/loading state */
        .waitlist-embed button[type="submit"]:disabled,
        .waitlist-embed button[type="submit"][disabled],
        .waitlist-embed .fd-btn:disabled {
          opacity: 0.7 !important;
          cursor: progress !important;
          pointer-events: none;
        }

        /* Error messages */
        .waitlist-embed .fd-error,
        .waitlist-embed .flodesk-error,
        .waitlist-embed [class*="Error"],
        .waitlist-embed [role="alert"][class*="error"],
        .waitlist-embed [class*="error"],
        .waitlist-embed div[class*="Error"] {
          color: #C62828 !important;
          background: transparent !important;
          margin-top: 6px !important;
          font-size: 13px !important;
          padding: 0 !important;
          border: none !important;
          display: block !important;
          text-align: left !important;
        }

        /* Error state for inputs */
        .waitlist-embed input.error,
        .waitlist-embed input[aria-invalid="true"],
        .waitlist-embed input.fd-error {
          border-color: #C62828 !important;
          box-shadow: 0 0 0 1px #C62828 !important;
        }

        /* Success messages */
        .waitlist-embed .fd-success,
        .waitlist-embed .flodesk-success,
        .waitlist-embed [class*="Success"],
        .waitlist-embed [role="status"][class*="success"] {
          margin-top: 16px !important;
          background: #EDF7EE !important;
          color: #155724 !important;
          padding: 12px 20px !important;
          border-radius: 9999px !important;
          display: inline-block !important;
          font-size: 14px !important;
          font-weight: 600 !important;
          border: none !important;
          box-shadow: none !important;
        }

        /* Status/message container */
        .waitlist-embed [aria-live="polite"],
        .waitlist-embed [role="status"],
        .waitlist-embed [role="alert"] {
          margin-top: 16px;
        }

        /* Ensure proper input wrapper styling */
        .waitlist-embed .fd-input-wrapper,
        .waitlist-embed .fd-field,
        .waitlist-embed [class*="Field"],
        .waitlist-embed [class*="InputWrapper"],
        .waitlist-embed [class*="field"],
        .waitlist-embed div[class*="input"] {
          background: transparent !important;
          border: none !important;
          padding: 0 !important;
          margin: 0 !important;
          box-shadow: none !important;
        }

        /* Ensure all wrapper divs are transparent */
        .waitlist-embed form > div,
        .waitlist-embed form > div > div {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }

        /* Ensure input text is always visible */
        .waitlist-embed input {
          color: #0B0B0B !important;
          -webkit-text-fill-color: #0B0B0B !important;
        }

        .waitlist-embed input:focus {
          color: #0B0B0B !important;
          -webkit-text-fill-color: #0B0B0B !important;
        }

        /* Show labels above fields */
        .waitlist-embed label {
          font-size: 14px !important;
          color: #4A4A4A !important;
          margin-bottom: 6px !important;
          display: block !important;
          font-weight: 500 !important;
          text-align: left !important;
        }

        /* Style field containers to be vertical */
        .waitlist-embed .fd-field,
        .waitlist-embed [class*="Field"],
        .waitlist-embed div[class*="field"] {
          display: flex !important;
          flex-direction: column !important;
          align-items: stretch !important;
        }

        /* Override any centered text alignment */
        .waitlist-embed {
          text-align: left !important;
        }

        /* Hide any remaining visible text nodes in the header area */
        .waitlist-embed > div > div:first-child:not(form) {
          display: none !important;
        }

        /* Prevent duplicate forms from showing */
        .waitlist-embed form ~ form,
        .waitlist-embed form:not(:first-of-type) {
          display: none !important;
        }

        /* Hide duplicate field containers beyond the expected 4 (first, last, email, button) */
        .waitlist-embed form > *:nth-child(n+5):not(button):not([role="alert"]):not([aria-live]) {
          display: none !important;
        }

        /* Screen reader only labels */
        .waitlist-embed .sr-only,
        .waitlist-embed [class*="visuallyHidden"] {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `;
      document.head.appendChild(style);
    }

    // Inject Flodesk script into <head> if not already present
    const existingScript = document.querySelector('script[src*="flodesk"]');
    if (!existingScript) {
      (function(w: any, d: Document, t: string, h: string, s: string, n: string) {
        w.FlodeskObject = n;
        var fn = function() {
          (w[n].q = w[n].q || []).push(arguments);
        };
        w[n] = w[n] || fn;
        var f = d.getElementsByTagName(t)[0];
        var v = '?v=' + Math.floor(new Date().getTime() / (120 * 1000)) * 60;
        var sm = d.createElement(t) as HTMLScriptElement;
        sm.async = true;
        sm.type = 'module';
        sm.src = h + s + '.mjs' + v;
        f.parentNode!.insertBefore(sm, f);
        var sn = d.createElement(t) as HTMLScriptElement;
        sn.async = true;
        (sn as any).noModule = true;
        sn.src = h + s + '.js' + v;
        f.parentNode!.insertBefore(sn, f);
      })(window, document, 'script', 'https://assets.flodesk.com', '/universal', 'fd');
    }

    // Initialize the form only once
    const formContainer = document.getElementById('fd-form-691edb28d5435631768d7e1b');
    if (window.fd && formContainer && !formContainer.hasChildNodes()) {
      window.fd('form', {
        formId: '691edb28d5435631768d7e1b',
        containerEl: '#fd-form-691edb28d5435631768d7e1b'
      });
    }
  }, []);

  return (
    <div className="waitlist-embed" data-flodesk-inline>
      <div id="fd-form-691edb28d5435631768d7e1b" key="flodesk-form-container"></div>
    </div>
  );
}

