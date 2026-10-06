import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <div className="min-h-screen h-full overflow-scroll w-full bg-slate-950 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-2xl">
        <div className="w-full rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-10">
          {/* Warning Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/10 ring-1 ring-amber-500/20">
            <svg
              className="h-10 w-10 text-amber-400"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 9V13"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              <path
                d="M12 17H12.01"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              <path
                d="M10.29 3.86L1.82 18C1.04 19.3 1.98 21 3.5 21H20.5C22.02 21 22.96 19.3 22.18 18L13.71 3.86C12.94 2.58 11.06 2.58 10.29 3.86Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Heading */}
          <div className="mt-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
              Website Temporarily Unavailable
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              Website access has been temporarily restricted due to an
              unresolved payment and compensation matter.
            </p>
          </div>

          {/* Payment Summary */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800">
            {/* Original Agreement */}
            <div className="border-b border-slate-800 p-5 sm:p-6">
              <p className="text-sm font-medium text-slate-400">
                Original Development Agreement
              </p>

              <div className="mt-3 flex items-center justify-between gap-4">
                <span className="text-sm text-slate-300 sm:text-base">
                  Agreed project fee
                </span>

                <span className="whitespace-nowrap font-semibold text-white">
                  PKR 90,000
                </span>
              </div>
            </div>

            {/* Received */}
            <div className="border-b border-slate-800 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-slate-300 sm:text-base">
                  Amount already received
                </span>

                <span className="whitespace-nowrap font-semibold text-emerald-400">
                  PKR 20,000
                </span>
              </div>
            </div>

            {/* Outstanding */}
            <div className="border-b border-slate-800 bg-red-500/5 p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-slate-200">
                    Original outstanding balance
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Remaining amount from the agreed project fee
                  </p>
                </div>

                <span className="text-xl font-bold text-red-400">
                  PKR 70,000
                </span>
              </div>
            </div>

            {/* Compensation */}
            <div className="border-b border-slate-800 bg-amber-500/5 p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-slate-200">
                    Requested compensation
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Compensation requested for the extended payment delay, time
                    commitment, and opportunity cost.
                  </p>
                </div>

                <span className="text-xl font-bold text-amber-400">
                  PKR 70,000
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="bg-white p-5 text-slate-950 sm:p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold">
                    Total Settlement Requested
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Outstanding balance + requested compensation
                  </p>
                </div>

                <span className="text-2xl font-black sm:text-3xl">
                  PKR 140,000
                </span>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-5 sm:p-6">
            <h2 className="font-semibold text-white">
              Why has access been restricted?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Significant time and development effort were committed to this
              project, including time that could otherwise have been allocated
              to other projects. The agreed project amount has remained
              partially unpaid for an extended period.
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              The requested settlement includes the original outstanding balance
              and a separate compensation request relating to the prolonged
              payment delay.
            </p>
          </div>

          {/* Resolution */}
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-5 sm:p-6">
            <h2 className="font-semibold text-white">
              Resolve the Payment Matter
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Please contact the developer to discuss payment or an agreed
              settlement arrangement.
            </p>

            <a
              href="tel:+92XXXXXXXXXX"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 sm:w-auto"
            >
              {/* Phone SVG */}
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 16.92V20C22 21.1 21.1 22 20 22C10.06 22 2 13.94 2 4C2 2.9 2.9 2 4 2H7.08C7.63 2 8.1 2.4 8.18 2.94C8.31 3.82 8.52 4.67 8.82 5.49C8.98 5.93 8.87 6.43 8.54 6.76L6.54 8.76C8.29 12.21 11.79 15.71 15.24 17.46L17.24 15.46C17.57 15.13 18.07 15.02 18.51 15.18C19.33 15.48 20.18 15.69 21.06 15.82C21.6 15.9 22 16.37 22 16.92Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Contact Developer - (+923084902959)
            </a>
          </div>

          {/* Footer */}
          <div className="mt-8 border-t border-slate-800 pt-6 text-center">
            <p className="text-xs leading-5 text-slate-600">
              Website access is currently restricted pending resolution of the
              payment matter.
            </p>
          </div>
        </div>
      </div>
    </div>
  </StrictMode>,
);
