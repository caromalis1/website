import "./TheLab.css";

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
  return (
    <main className="lab">
      <section className="home-hero">
        <div className="home-hero-content">
          <p className="home-hero-greeting">Hola!</p>
          <h1 className="home-hero-title">Bienvenida al Storytelling Lab.</h1>
          <p className="home-hero-subtitle">
            Un laboratorio creativo para aprender a crear contenido que no depende de hacks
            virales, sino de lo que te hace única: tu historia.
          </p>
          <span className="home-hero-arrow" aria-hidden="true">↓</span>
        </div>
        <div className="home-hero-curve" aria-hidden="true" />
      </section>

      <section className="lab-proof">
        <span className="lab-proof-squiggle lab-proof-squiggle--left" aria-hidden="true" />
        <span className="lab-proof-squiggle lab-proof-squiggle--long" aria-hidden="true" />
        <span className="lab-proof-dot" aria-hidden="true" />

        <div className="lab-container lab-proof-intro">
          <h2 className="lab-proof-title">
            Tu forma de ver el mundo es única.
            <br />
            Tu contenido también debería serlo.
          </h2>
          <p className="lab-proof-copy">
            Bienvenida al laboratorio creativo para aprender a crear contenido que no depende de
            hacks virales, sino de lo que te hace única: tu historia.
          </p>
          <button className="lab-proof-cta" type="button">
            Únete al Storytelling Lab
          </button>
          <div className="lab-proof-social" aria-label="Prueba social">
            <div className="lab-proof-avatars" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <p>Únete a más de 450 emprendedores</p>
          </div>
        </div>

        <div className="lab-container lab-proof-reality">
          <h3 className="lab-proof-reality-title">
            Seamos sinceras: crear contenido no es fácil, sobre
            <br />
            todo cuando también tienes que sostener un negocio.
          </h3>
          <p className="lab-proof-reality-copy">
            Porque una cosa es “tener una idea” y otra muy distinta es sentarte a bajarla cuando
            eres la CEO, la de atención al cliente, la contadora, la diseñadora... y la que embala
            pedidos con una mano mientras responde mensajes con la otra.
          </p>
        </div>
      </section>

      <section className="lab-spiral">
        <svg className="lab-spiral-line" viewBox="0 0 1728 1460" aria-hidden="true" preserveAspectRatio="none">
          <path d="M246 0C280 58 336 126 420 178C514 236 648 258 786 238C930 218 1068 198 1160 230C1244 258 1306 314 1328 400C1360 520 1326 598 1266 646C1170 724 1004 744 842 738C676 732 532 746 450 828C362 914 374 1046 468 1142C564 1240 736 1286 900 1268C1050 1252 1168 1194 1298 1182C1396 1172 1476 1194 1544 1238C1602 1278 1632 1336 1640 1394" />
          <circle cx="592" cy="242" r="15" />
          <circle cx="1410" cy="452" r="15" />
        </svg>

        <div className="lab-container lab-spiral-inner">
          <h2 className="lab-spiral-title">Y es muy fácil caer en este espiral...</h2>

          <article className="lab-spiral-card lab-spiral-card--a">
            Quieres compartir
            <br />
            algo que amas en con
            <br />
            el mundo
          </article>
          <article className="lab-spiral-card lab-spiral-card--b">
            Pero mostrarlo en
            <br />
            redes se siente
            <br />
            tortuoso
          </article>
          <article className="lab-spiral-card lab-spiral-card--c">
            Y aparece la duda
            <br />
            existencial: ¿por
            <br />
            dónde parto?
          </article>
          <article className="lab-spiral-card lab-spiral-card--d">
            Abres Instagram y te
            <br />
            quedas paralizada
            <br />
            mirando la pantalla
          </article>
          <article className="lab-spiral-card lab-spiral-card--e">
            Pruebas algo pero
            <br />
            sientes que estás
            <br />
            siempre improvisando.
          </article>
          <article className="lab-spiral-card lab-spiral-card--f">
            Te frustras y te
            <br />
            cuestionas si realmente
            <br />
            “sirves” para esto.
          </article>

          <h3 className="lab-spiral-bottom-copy">
            Pero el secreto no es volverte una
            <br />
            máquina de contenido ni aprenderte “la
            <br />
            fórmula del algoritmo”, sino encontrar tu
            <br />
            forma única de comunicar lo que haces.
          </h3>
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
