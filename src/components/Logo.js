import './Logo.css';

export default function Logo({ label = 'Caro Malis', sublabel = 'Content Studio' }) {
  return (
    <span className="brand-logo" aria-hidden="true">
      <span className="brand-logo-mark">
        <span>C</span>
        <span>M</span>
        <svg viewBox="0 0 76 42" focusable="false">
          <path d="M8 25C20 8 45 6 58 18C70 29 58 42 38 35C20 29 27 12 43 16" />
        </svg>
      </span>
      <span className="brand-logo-wordmark">
        <span>{label}</span>
        <small>{sublabel}</small>
      </span>
    </span>
  );
}
