import { useLocation } from "react-router-dom";

/**
 * PageTransition
 * --------------
 * Re-keys its children on every route change so the page plays a fresh
 * "enter" animation (fade + lift + un-blur), making navigation feel like
 * a deliberate change of context. See `.page-enter` in index.css.
 */
export default function PageTransition({ children }) {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-enter">
      {children}
    </div>
  );
}
