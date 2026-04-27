import './Logo.css';

export default function Logo({ label = 'Caro Malis', sublabel = 'Content Studio' }) {
  return (
    <span className="brand-logo">
      <img src="/logo.png" alt={`${label} ${sublabel}`} />
    </span>
  );
}
