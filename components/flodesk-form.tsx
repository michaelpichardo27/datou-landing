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
    // Set page load timestamp - used to verify form was submitted in this session
    const pageLoadTime = Date.now().toString();
    sessionStorage.setItem("flodesk-page-load-time", pageLoadTime);
    
    // Clear any previous submission state on page load (reset on refresh)
    sessionStorage.removeItem("flodesk-form-submitted");

    // Store observer reference for cleanup
    let observer: MutationObserver | null = null;

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
        .waitlist-embed > div > div,
        .waitlist-embed .fd-card,
        .waitlist-embed .fd-container,
        .waitlist-embed .flodesk-card,
        .waitlist-embed [class*="card"],
        .waitlist-embed [class*="Card"],
        .waitlist-embed [class*="container"],
        .waitlist-embed [class*="Container"],
        .waitlist-embed [class*="wrapper"],
        .waitlist-embed [class*="Wrapper"] {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        /* Force remove any white background from all divs */
        .waitlist-embed div {
          background-color: transparent !important;
        }

        .waitlist-embed form {
          display: grid !important;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          width: 100%;
          margin: 0 !important;
          padding: 0 !important;
        }

        /* First two fields (first name, last name) stay in grid */
        .waitlist-embed form > *:nth-child(1),
        .waitlist-embed form > *:nth-child(2) {
          grid-column: auto;
        }

        /* Email field and button span full width */
        .waitlist-embed form > *:nth-child(3),
        .waitlist-embed form > *:nth-child(4),
        .waitlist-embed form > button,
        .waitlist-embed form button[type="submit"] {
          grid-column: 1 / -1;
        }

        @media (max-width: 767.98px) {
          .waitlist-embed form {
            grid-template-columns: 1fr !important;
          }
          
          .waitlist-embed form > *:nth-child(1),
          .waitlist-embed form > *:nth-child(2),
          .waitlist-embed form > *:nth-child(3),
          .waitlist-embed form > *:nth-child(4),
          .waitlist-embed form > button {
            grid-column: 1;
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
          -webkit-text-fill-color: #0b0b0b !important;
        }

        .waitlist-embed input::placeholder {
          color: #999999 !important;
          opacity: 1 !important;
        }

        .waitlist-embed input::-webkit-input-placeholder {
          color: #999999 !important;
          opacity: 1 !important;
        }

        .waitlist-embed input::-moz-placeholder {
          color: #999999 !important;
          opacity: 1 !important;
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
          background: #ff914c !important;
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
          box-shadow: 0 4px 12px rgba(255, 145, 76, 0.3) !important;
        }

        .waitlist-embed button[type="submit"]:disabled {
          opacity: 0.7 !important;
          cursor: progress !important;
        }

        /* Ensure button text is visible */
        .waitlist-embed button[type="submit"] span,
        .waitlist-embed button[type="submit"] * {
          color: #0b0b0b !important;
        }

        /* Error messages */
        .waitlist-embed .fd-error,
        .waitlist-embed [class*="error"],
        .waitlist-embed [role="alert"] {
          color: #c62828 !important;
          margin-top: 6px !important;
          font-size: 13px !important;
          display: block !important;
        }

        /* Success messages - inline - hidden by default */
        .waitlist-embed .fd-success,
        .waitlist-embed [class*="success"]:not([class*="modal"]):not([class*="popup"]),
        .waitlist-embed [role="status"] {
          margin-top: 16px !important;
          background: #fff4ed !important;
          color: #ff914c !important;
          padding: 12px 20px !important;
          border-radius: 9999px !important;
          display: none !important;
          font-size: 14px !important;
          font-weight: 600 !important;
        }

        /* Show success message only when form is submitted */
        .waitlist-embed .fd-success.show-success,
        .waitlist-embed [class*="success"].show-success:not([class*="modal"]):not([class*="popup"]),
        .waitlist-embed [role="status"].show-success {
          display: inline-block !important;
        }

        /* Flodesk success modal/popup - allow to display */
        body .fd-modal,
        body .fd-popup,
        body [class*="flodesk-modal"],
        body [class*="flodesk-popup"],
        body [class*="fd-success-modal"],
        body [class*="fd-success-popup"],
        body [id*="flodesk"],
        body [id*="fd-modal"],
        body [id*="fd-popup"] {
          display: block !important;
          z-index: 9999 !important;
        }

        /* Style Flodesk success modal */
        .fd-modal,
        .fd-popup,
        [class*="flodesk-modal"],
        [class*="flodesk-popup"] {
          position: fixed !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          background: white !important;
          border-radius: 16px !important;
          padding: 32px !important;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3) !important;
          max-width: 500px !important;
          width: 90% !important;
          z-index: 9999 !important;
        }

        /* Success message inside modal - orange theme */
        .fd-modal .fd-success,
        .fd-popup .fd-success,
        [class*="modal"] [class*="success"],
        [class*="popup"] [class*="success"] {
          display: block !important;
          color: #ff914c !important;
          font-size: 16px !important;
          text-align: center !important;
          background: #fff4ed !important;
          padding: 16px 24px !important;
          border-radius: 9999px !important;
        }

        /* Field container styling */
        .waitlist-embed .fd-field,
        .waitlist-embed [class*="Field"],
        .waitlist-embed [class*="field"],
        .waitlist-embed form > div {
          margin: 0 !important;
          padding: 0 !important;
          background: transparent !important;
          border: none !important;
        }

        .waitlist-embed label {
          font-size: 14px !important;
          color: #4a4a4a !important;
          margin-bottom: 6px !important;
          font-weight: 500 !important;
          display: block !important;
        }

        /* Hide all headings and descriptions */
        .waitlist-embed h1,
        .waitlist-embed h2,
        .waitlist-embed h3,
        .waitlist-embed h4,
        .waitlist-embed h5,
        .waitlist-embed h6,
        .waitlist-embed .fd-heading,
        .waitlist-embed .fd-title,
        .waitlist-embed .fd-subtitle,
        .waitlist-embed .fd-subcopy,
        .waitlist-embed .fd-description,
        .waitlist-embed [class*="heading"],
        .waitlist-embed [class*="Heading"],
        .waitlist-embed [class*="title"],
        .waitlist-embed [class*="Title"],
        .waitlist-embed [class*="subtitle"],
        .waitlist-embed [class*="Subtitle"],
        .waitlist-embed [class*="description"],
        .waitlist-embed [class*="Description"],
        .waitlist-embed p:not([role]):not([aria-live]):not(.fd-error):not(.fd-success):not([class*="success"]):not([class*="error"]) {
          display: none !important;
        }

        /* Ensure success messages are always visible */
        .waitlist-embed p.fd-success,
        .waitlist-embed p[class*="success"],
        .waitlist-embed div[class*="success"],
        .waitlist-embed [class*="success-message"] {
          display: block !important;
        }

        /* Hide any text content before the form */
        .waitlist-embed > div > div:first-child:not(form):not([role="form"]) {
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
      const container = document.getElementById("fd-form-691edb28d5435631768d7e1b");
      if (!container) {
        console.log("Flodesk: Container not found");
        return;
      }

      // Check if fd is available
      if (window.fd) {
        if (!container.dataset.initialized) {
          console.log("Flodesk: Initializing form");
          container.dataset.initialized = "true";
          container.innerHTML = ""; // clear any stale markup
          window.fd("form", {
            formId: "691edb28d5435631768d7e1b",
            containerEl: "#fd-form-691edb28d5435631768d7e1b",
          });
          console.log("Flodesk: Form initialized");

          // Hide any success messages on initial load
          setTimeout(() => {
            const successMessages = container.querySelectorAll(
              ".fd-success, [class*='success']:not([class*='modal']):not([class*='popup']), [role='status']"
            );
            successMessages.forEach((msg) => {
              msg.classList.remove("show-success");
            });
          }, 100);

          // Listen for form submission
          setTimeout(() => {
            const form = container.querySelector("form");
            if (form) {
              form.addEventListener("submit", (e) => {
                console.log("Flodesk: Form submitted");
                // Mark form as submitted with current page load time
                const currentPageLoadTime = sessionStorage.getItem("flodesk-page-load-time");
                sessionStorage.setItem("flodesk-form-submitted", "true");
                sessionStorage.setItem("flodesk-submission-page-time", currentPageLoadTime || Date.now().toString());
                
                // Show success messages after a delay (when Flodesk adds them)
                setTimeout(() => {
                  const successMessages = container.querySelectorAll(
                    ".fd-success, [class*='success']:not([class*='modal']):not([class*='popup']), [role='status']"
                  );
                  successMessages.forEach((msg) => {
                    msg.classList.add("show-success");
                  });
                }, 500);
              });
            }
          }, 1000);

          // Watch for Flodesk success modal/popup and success messages - only show if form was submitted
          observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) {
                  const element = node as Element;
                  
                  // Check if it's a Flodesk modal/popup
                  if (
                    element.classList.contains("fd-modal") ||
                    element.classList.contains("fd-popup") ||
                    element.classList.contains("flodesk-modal") ||
                    element.classList.contains("flodesk-popup") ||
                    element.id?.includes("flodesk") ||
                    element.id?.includes("fd-modal") ||
                    element.id?.includes("fd-popup") ||
                    element.querySelector(".fd-modal, .fd-popup, [class*='flodesk-modal'], [class*='flodesk-popup']")
                  ) {
                    // Only show success modal if form was submitted in this page session
                    const wasSubmitted = sessionStorage.getItem("flodesk-form-submitted");
                    const currentPageLoadTime = sessionStorage.getItem("flodesk-page-load-time");
                    const submissionPageTime = sessionStorage.getItem("flodesk-submission-page-time");
                    
                    // Verify submission happened after current page load (not from previous session)
                    const isValidSubmission = wasSubmitted === "true" && 
                                             submissionPageTime === currentPageLoadTime;
                    
                    if (isValidSubmission) {
                      console.log("Flodesk: Success modal detected - showing thank you message");
                      // Ensure it's visible
                      (element as HTMLElement).style.display = "block";
                      (element as HTMLElement).style.zIndex = "9999";
                    } else {
                      console.log("Flodesk: Modal detected but form not submitted in this session - hiding");
                      // Hide if form wasn't submitted in this session (prevents showing on page load/refresh)
                      (element as HTMLElement).style.display = "none";
                    }
                  }
                  
                  // Check if it's an inline success message
                  if (
                    element.classList.contains("fd-success") ||
                    element.classList.contains("flodesk-success") ||
                    (element.classList.contains("success") && !element.classList.contains("modal") && !element.classList.contains("popup")) ||
                    element.getAttribute("role") === "status"
                  ) {
                    const wasSubmitted = sessionStorage.getItem("flodesk-form-submitted");
                    const currentPageLoadTime = sessionStorage.getItem("flodesk-page-load-time");
                    const submissionPageTime = sessionStorage.getItem("flodesk-submission-page-time");
                    
                    const isValidSubmission = wasSubmitted === "true" && 
                                             submissionPageTime === currentPageLoadTime;
                    
                    if (isValidSubmission) {
                      console.log("Flodesk: Success message detected - showing");
                      element.classList.add("show-success");
                    } else {
                      console.log("Flodesk: Success message detected but form not submitted - hiding");
                      element.classList.remove("show-success");
                    }
                  }
                }
              });
            });
          });

          // Start observing the document body for new elements
          observer.observe(document.body, {
            childList: true,
            subtree: true,
          });

          // Hide any existing modals and success messages on page load (if form wasn't submitted in this session)
          setTimeout(() => {
            const wasSubmitted = sessionStorage.getItem("flodesk-form-submitted");
            const currentPageLoadTime = sessionStorage.getItem("flodesk-page-load-time");
            const submissionPageTime = sessionStorage.getItem("flodesk-submission-page-time");
            
            const isValidSubmission = wasSubmitted === "true" && 
                                     submissionPageTime === currentPageLoadTime;
            
            if (!isValidSubmission) {
              // Hide modals
              const existingModals = document.querySelectorAll(
                ".fd-modal, .fd-popup, [class*='flodesk-modal'], [class*='flodesk-popup'], [id*='flodesk'], [id*='fd-modal'], [id*='fd-popup']"
              );
              existingModals.forEach((modal) => {
                (modal as HTMLElement).style.display = "none";
              });
              
              // Hide success messages
              const existingSuccessMessages = container.querySelectorAll(
                ".fd-success, [class*='success']:not([class*='modal']):not([class*='popup']), [role='status']"
              );
              existingSuccessMessages.forEach((msg) => {
                msg.classList.remove("show-success");
              });
            }
          }, 500);
        }
      } else {
        console.log("Flodesk: window.fd not ready, retrying...");
        // Keep retrying until fd loads
        setTimeout(loadFlodesk, 400);
      }
    };

    // Use the original Flodesk loader script
    const existingScript = document.querySelector('script[src*="flodesk"]');
    if (!existingScript) {
      console.log("Flodesk: Loading script");
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
      
      // Start trying to load the form
      setTimeout(loadFlodesk, 500);
    } else {
      console.log("Flodesk: Script already loaded");
      loadFlodesk();
    }


    return () => {
      const form = document.getElementById("fd-form-691edb28d5435631768d7e1b");
      if (form) form.innerHTML = "";
      if (observer) {
        observer.disconnect();
      }
      // Note: sessionStorage persists across refreshes, but we clear it on mount
      // This cleanup runs on unmount, but we want to clear on mount (refresh)
    };
  }, []);

  return (
    <div className="waitlist-embed" data-flodesk-inline>
      <div id="fd-form-691edb28d5435631768d7e1b" key="flodesk-form-container"></div>
    </div>
  );
}
