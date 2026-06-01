import './SiteFooter.css';

export default function SiteFooter({ title = 'Storytelling Lab' }) {
  return (
    <footer className="site-lab-footer">
      <svg className="site-lab-footer-wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 38C184 24 335 34 493 45C681 58 823 65 1013 55C1177 47 1280 42 1440 30V0H0Z" />
      </svg>

      <div className="site-lab-footer-inner">
        <div className="site-lab-footer-top">
          <div className="site-lab-footer-socials" aria-label="Redes sociales">
            <a href="mailto:hola@caromalis.com" aria-label="Email">
              <span>
                <i className="fas fa-envelope" aria-hidden="true" />
              </span>
            </a>
            <a href="https://www.instagram.com/socialsbycaro/
" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <span>
                <i className="fab fa-instagram" aria-hidden="true" />
              </span>
            </a>
            {/* <a href="/pinterest" aria-label="Pinterest">
              <span>
                <i className="fab fa-pinterest-p" aria-hidden="true" />
              </span>
            </a> */}
            <a href=" https://www.linkedin.com/in/carolina-malis/
" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <span>
                <i className="fab fa-linkedin-in" aria-hidden="true" />
              </span>
            </a>
            {/* <a href="/facebook" aria-label="Facebook">
              <span>
                <i className="fab fa-facebook-f" aria-hidden="true" />
              </span>
            </a> */}
          </div>
          <nav className="site-lab-footer-links" aria-label="Legal">
            <a href="/terms">Términos y condiciones</a>
            <a href="/privacy">Política de privacidad</a>
            <a href="/contact">Contacto</a>
          </nav>
        </div>

        <div className="site-lab-footer-bottom">
          <small>© 2026 Socials by Caro</small>
          <h2>{title}</h2>
          <small>Todos los derechos reservados.</small>
        </div>
      </div>
    </footer>
  );
}
