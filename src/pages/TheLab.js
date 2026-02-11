import { useState } from "react";
import "./TheLab.css";

const TABS = [
  {
    id: "emprendedoras",
    label: "Emprendedoras",
    title: "Storytelling para negocios con voz propia",
    copy: "Aquí iría un párrafo breve sobre cómo el Lab ayuda a emprendedoras a contar su historia con claridad."
  },
  {
    id: "creadoras",
    label: "Creadoras",
    title: "Contenido que se siente tuyo",
    copy: "Aquí iría un párrafo breve sobre cómo el Lab convierte ideas dispersas en narrativa auténtica."
  },
  {
    id: "marcas",
    label: "Marcas personales",
    title: "De la historia a la comunidad",
    copy: "Aquí iría un párrafo breve sobre cómo el Lab conecta la historia personal con la oferta."
  }
];

const FEATURES = [
  {
    title: "Mapa narrativo (placeholder)",
    description: "Descripción corta de la herramienta principal del Lab."
  },
  {
    title: "Plantillas prácticas (placeholder)",
    description: "Descripción corta del recurso descargable."
  },
  {
    title: "Sistema simple (placeholder)",
    description: "Descripción corta del proceso paso a paso."
  }
];

const TESTIMONIALS = [
  {
    quote: "“Testimonio breve que hable de claridad y confianza.”",
    name: "Nombre Apellido",
    role: "Rol / Negocio"
  },
  {
    quote: "“Testimonio breve sobre ventas o comunidad.”",
    name: "Nombre Apellido",
    role: "Rol / Negocio"
  },
  {
    quote: "“Testimonio breve sobre desbloquear ideas.”",
    name: "Nombre Apellido",
    role: "Rol / Negocio"
  }
];

export default function TheLab() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const currentTab = TABS.find((tab) => tab.id === activeTab);

  return (
    <main className="lab">
      <section className="lab-hero">
        <div className="lab-container">
          <div className="lab-hero-grid">
            <div>
              <h1 className="lab-headline">
              Tu forma de ver el mundo es única. Tu contenido también debería serlo.
              </h1>
              <p className="lab-subhead">
              Un laboratorio creativo para aprender a crear contenido que no depende de hacks virales, sino de lo que te hace única: tu historia.

              </p>
              <div className="lab-cta-row">
                <button className="lab-button lab-button--primary" type="button">
                  Entra al Storytelling Lab
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lab-proof">
        <div className="lab-container">
          <p className="lab-label">Social proof</p>
          <div className="lab-logos">
            <span>Logo 1</span>
            <span>Logo 2</span>
            <span>Logo 3</span>
            <span>Logo 4</span>
            <span>Logo 5</span>
          </div>
          <p className="lab-note">
            Frase corta de confianza (placeholder).
          </p>
        </div>
      </section>

      <section className="lab-tabs">
        <div className="lab-container">
          <p className="lab-label">Use cases</p>
          <div className="lab-tab-row">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`lab-chip${activeTab === tab.id ? " is-active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="lab-tab-panel">
            <div>
              <h2>{currentTab.title}</h2>
              <p>{currentTab.copy}</p>
              <div className="lab-cta-row">
                <button className="lab-button lab-button--primary" type="button">
                  CTA del tab
                </button>
                <button className="lab-button lab-button--tertiary" type="button">
                  Ver detalles
                </button>
              </div>
            </div>
            <div className="lab-tab-visual" aria-hidden="true">
              <p>Ilustración o screenshot (placeholder)</p>
            </div>
          </div>
        </div>
      </section>

      <section className="lab-features">
        <div className="lab-container">
          <p className="lab-label">Features</p>
          <h2>Qué incluye el Lab (placeholder)</h2>
          <div className="lab-feature-grid">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="lab-card">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lab-testimonials">
        <div className="lab-container">
          <p className="lab-label">Testimonios</p>
          <h2>Lo que dicen nuestras alumnas (placeholder)</h2>
          <div className="lab-testimonial-grid">
            {TESTIMONIALS.map((item) => (
              <div key={item.quote} className="lab-card">
                <p className="lab-quote">{item.quote}</p>
                <p className="lab-meta">{item.name}</p>
                <p className="lab-meta">{item.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lab-price">
        <div className="lab-container lab-price-grid">
          <div>
            <p className="lab-label">Precio</p>
            <h2>Acceso completo al Storytelling Lab</h2>
            <p>Descripción de la oferta (placeholder).</p>
          </div>
          <div className="lab-card lab-card--price">
            <p className="lab-price-amount">$000</p>
            <p>Pago único (placeholder)</p>
            <button className="lab-button lab-button--primary" type="button">
              CTA final
            </button>
            <p className="lab-note">Nota de garantía (placeholder).</p>
          </div>
        </div>
      </section>

      <section className="lab-faq">
        <div className="lab-container">
          <p className="lab-label">FAQ</p>
          <h2>Preguntas frecuentes (placeholder)</h2>
          <div className="lab-faq-grid">
            <div className="lab-card">
              <h3>Pregunta 1</h3>
              <p>Respuesta breve (placeholder).</p>
            </div>
            <div className="lab-card">
              <h3>Pregunta 2</h3>
              <p>Respuesta breve (placeholder).</p>
            </div>
            <div className="lab-card">
              <h3>Pregunta 3</h3>
              <p>Respuesta breve (placeholder).</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
