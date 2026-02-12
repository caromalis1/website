import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./TheLab.css";

gsap.registerPlugin(MotionPathPlugin, ScrollSmoother, ScrollTrigger);

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
    quote: "\"Testimonio breve que hable de claridad y confianza.\"",
    name: "Nombre Apellido",
    role: "Rol / Negocio"
  },
  {
    quote: "\"Testimonio breve sobre ventas o comunidad.\"",
    name: "Nombre Apellido",
    role: "Rol / Negocio"
  },
  {
    quote: "\"Testimonio breve sobre desbloquear ideas.\"",
    name: "Nombre Apellido",
    role: "Rol / Negocio"
  }
];

const PATH_SEGMENTS = 28;
const SPIRAL_MATCH = {
  desktop: "(min-width: 901px)",
  reducedMotion: "(prefers-reduced-motion: no-preference)"
};
const SPIRAL_SCROLL = {
  start: "top 80%",
  travelHeightScale: 1.1,
  minTravelHeightScale: 1.0,
  scrub: 0.35,
  minimumTopOffset: 24
};
const SMOOTHER_OPTIONS = {
  smooth: 1.1,
  smoothTouch: 0.08,
  normalizeScroll: true,
  effects: false
};

const createMotionPathMediaListener = (query, handler) => {
  if (query.addEventListener) {
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }

  query.addListener(handler);
  return () => query.removeListener(handler);
};

function catmullRom(points, i, t) {
  const p0 = points[Math.max(i - 1, 0)];
  const p1 = points[i];
  const p2 = points[Math.min(i + 1, points.length - 1)];
  const p3 = points[Math.min(i + 2, points.length - 1)];

  const t2 = t * t;
  const t3 = t2 * t;

  return {
    x:
      0.5 *
      (2 * p1.x +
        (-p0.x + p2.x) * t +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
    y:
      0.5 *
      (2 * p1.y +
        (-p0.y + p2.y) * t +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3)
  };
}

function buildPathD(points) {
  if (!points.length) {
    return "";
  }

  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }

  const commands = [`M ${points[0].x} ${points[0].y}`];

  for (let i = 0; i < points.length - 1; i += 1) {
    for (let step = 1; step <= PATH_SEGMENTS; step += 1) {
      const point = catmullRom(points, i, step / PATH_SEGMENTS);
      commands.push(`L ${point.x} ${point.y}`);
    }
  }

  return commands.join(" ");
}

function createMotionPathFromCards(sectionRect, cards) {
  const sortedCards = cards
    .map((card) => {
      const rect = card.getBoundingClientRect();
      return {
        x: rect.left - sectionRect.left + rect.width / 2,
        y: rect.top - sectionRect.top + rect.height / 2
      };
    })
    .sort((a, b) => a.y - b.y);

  const marginY = Math.max(sectionRect.height * 0.06, SPIRAL_SCROLL.minimumTopOffset);
  return [
    { x: sectionRect.width / 2, y: marginY },
    ...sortedCards,
    { x: sectionRect.width / 2, y: sectionRect.height - marginY }
  ];
}

function canAnimateSpiral() {
  return (
    window.matchMedia(SPIRAL_MATCH.desktop).matches &&
    window.matchMedia(SPIRAL_MATCH.reducedMotion).matches
  );
}

function killMotionTween(tweenRef) {
  if (!tweenRef.current) {
    return;
  }

  tweenRef.current.scrollTrigger?.kill();
  tweenRef.current.kill();
  tweenRef.current = null;
}

export default function TheLab() {
  const smootherWrapperRef = useRef(null);
  const smootherContentRef = useRef(null);
  const homeHeroRef = useRef(null);
  const spiralSectionRef = useRef(null);
  const spiralSvgRef = useRef(null);
  const spiralPathRef = useRef(null);
  const spiralDotRef = useRef(null);
  const spiralCardsRef = useRef([]);

  const motionTweenRef = useRef(null);
  const smootherRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const resizeRafRef = useRef(0);

  const setCardRef = (index) => (element) => {
    spiralCardsRef.current[index] = element;
  };

  useLayoutEffect(() => {
    const smootherWrapper = smootherWrapperRef.current;
    const smootherContent = smootherContentRef.current;

    if (!smootherWrapper || !smootherContent) {
      return;
    }

    if (smootherWrapper && smootherContent) {
      smootherRef.current = ScrollSmoother.create({
        wrapper: smootherWrapper,
        content: smootherContent,
        ...SMOOTHER_OPTIONS
      });
    }

    const updatePathAndTween = () => {
      const spiralSection = spiralSectionRef.current;
      const pathElement = spiralPathRef.current;
      const dot = spiralDotRef.current;
      const cards = spiralCardsRef.current.filter(Boolean);

      if (!spiralSection || !pathElement || !dot || !cards.length) {
        return;
      }

      if (!canAnimateSpiral()) {
        if (motionTweenRef.current) {
          motionTweenRef.current.scrollTrigger?.kill();
          motionTweenRef.current.kill();
          motionTweenRef.current = null;
        }

        gsap.set(dot, { opacity: 0 });
        return;
      }

      gsap.set(dot, {
        opacity: 1,
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "50% 50%"
      });

      const sectionRect = spiralSection.getBoundingClientRect();
      const pathPoints = createMotionPathFromCards(sectionRect, cards);

      const svg = spiralSvgRef.current;
      if (svg) {
        svg.setAttribute("viewBox", `0 0 ${sectionRect.width} ${sectionRect.height}`);
      }

      const pathD = buildPathD(pathPoints);
      pathElement.setAttribute("d", pathD);

      if (motionTweenRef.current) {
        motionTweenRef.current.kill();
        motionTweenRef.current = null;
      }

      const travelDistance = Math.max(
        sectionRect.height * SPIRAL_SCROLL.travelHeightScale,
        window.innerHeight * SPIRAL_SCROLL.minTravelHeightScale
      );
      const triggerNode = spiralSection;

      motionTweenRef.current = gsap.to(dot, {
        duration: 1,
        immediateRender: false,
        ease: "none",
        force3D: false,
        motionPath: {
          path: pathElement,
          align: false,
          alignOrigin: [0.5, 0.5],
          autoRotate: false
        },
        scrollTrigger: {
          trigger: triggerNode,
          start: SPIRAL_SCROLL.start,
          end: `+=${Math.round(travelDistance)}`,
          scrub: SPIRAL_SCROLL.scrub,
          invalidateOnRefresh: true,
          markers: false
        }
      });

      ScrollTrigger.refresh();
    };

    const scheduleUpdate = () => {
      if (resizeRafRef.current) {
        cancelAnimationFrame(resizeRafRef.current);
      }

      resizeRafRef.current = requestAnimationFrame(() => {
        resizeRafRef.current = 0;
        updatePathAndTween();
      });
    };

    scheduleUpdate();
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      scheduleUpdate();
    });

    if (spiralSectionRef.current) {
      resizeObserver.observe(spiralSectionRef.current);
    }

    if (homeHeroRef.current) {
      resizeObserver.observe(homeHeroRef.current);
    }

    const motionMq = window.matchMedia(SPIRAL_MATCH.desktop);
    const reduceMq = window.matchMedia(SPIRAL_MATCH.reducedMotion);

    const onPreferenceChange = () => {
      scheduleUpdate();
    };

    const cleanupMotionMq = createMotionPathMediaListener(motionMq, onPreferenceChange);
    const cleanupReduceMq = createMotionPathMediaListener(reduceMq, onPreferenceChange);

    resizeObserverRef.current = resizeObserver;

    return () => {
      window.removeEventListener("resize", scheduleUpdate);
      cleanupMotionMq();
      cleanupReduceMq();

      if (resizeRafRef.current) {
        cancelAnimationFrame(resizeRafRef.current);
      }

      if (motionTweenRef.current) {
        motionTweenRef.current.scrollTrigger?.kill();
        motionTweenRef.current.kill();
        motionTweenRef.current = null;
      }

      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }

      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
    };
  }, []);

  return (
    <div className="lab-scroll-wrapper" ref={smootherWrapperRef}>
      <div className="lab-scroll-content" ref={smootherContentRef}>
        <main className="lab">
          <header className="site-header">
            <div className="site-header-inner">
              <a href="#/" className="brand" aria-label="Socials by Caro">
                LOGO AQUÍ
              </a>
              <nav className="nav site-nav" aria-label="Primary">
                <a href="#/" className="nav-link">Home</a>
                <a href="#/storytelling-lab" className="nav-link">Storytelling Lab</a>
                <a href="#/about" className="nav-link">Sobre mi</a>
              </nav>
              <div className="header-actions">
                <a href="#/get-started" className="header-button header-button--primary">Empieza aquí</a>
              </div>
            </div>
          </header>

          <section className="home-hero" ref={homeHeroRef}>
            <div className="home-hero-content">
              <p className="home-hero-greeting">Hola!</p>
              <h1 className="home-hero-title">Bienvenida al Storytelling Lab.</h1>
              <p className="home-hero-subtitle">
                Un laboratorio creativo para aprender a crear contenido que no depende de hacks virales,
                sino de lo que te hace única: tu historia.
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
                <p>Únete a más de 450 emprendedoras</p>
              </div>
            </div>

            <div className="lab-container lab-proof-reality">
              <h3 className="lab-proof-reality-title">
                Seamos sinceras: crear contenido no es fácil, sobre
                <br />
                todo cuando también tienes que sostener un negocio.
              </h3>
              <p className="lab-proof-reality-copy">
                Porque una cosa es "tener una idea" y otra muy distinta es sentarte a bajarla cuando
                eres la CEO, la de atención al cliente, la contadora, la diseñadora... y la que embala
                pedidos con una mano mientras responde mensajes con la otra.
              </p>
            </div>
          </section>

          <section className="lab-spiral" ref={spiralSectionRef}>
            <svg
              ref={spiralSvgRef}
              className="lab-spiral-line"
              aria-hidden="true"
              preserveAspectRatio="none"
            >
              <path ref={spiralPathRef} />
            </svg>
            <span
              className="lab-spiral-motion-dot"
              ref={spiralDotRef}
              aria-hidden="true"
            />

            <div className="lab-container lab-spiral-inner">
              <h2 className="lab-spiral-title">Y es muy fácil caer en este espiral...</h2>

              <article ref={setCardRef(0)} className="lab-spiral-card lab-spiral-card--a">
                Quieres compartir
                <br />
                algo que amas en con
                <br />
                el mundo
              </article>
              <article ref={setCardRef(1)} className="lab-spiral-card lab-spiral-card--b">
                Pero mostrarlo en
                <br />
                redes se siente
                <br />
                tortuoso
              </article>
              <article ref={setCardRef(2)} className="lab-spiral-card lab-spiral-card--c">
                Y aparece la duda
                <br />
                existencial: ¿por
                <br />
                dónde parto?
              </article>
              <article ref={setCardRef(3)} className="lab-spiral-card lab-spiral-card--d">
                Abres Instagram y te
                <br />
                quedas paralizada
                <br />
                mirando la pantalla
              </article>
              <article ref={setCardRef(4)} className="lab-spiral-card lab-spiral-card--e">
                Pruebas algo pero
                <br />
                sientes que estás
                <br />
                siempre improvisando.
              </article>
              <article ref={setCardRef(5)} className="lab-spiral-card lab-spiral-card--f">
                Te frustras y te
                <br />
                cuestionas si realmente
                <br />
                "sirves" para esto.
              </article>

              <h3 className="lab-spiral-bottom-copy">
                Pero el secreto no es volverte una
                <br />
                máquina de contenido ni aprenderte "la
                <br />
                fórmula del algoritmo", sino encontrar tu
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

          <footer className="site-footer">
            <div className="inner">
              <small>© {new Date().getFullYear()} Socials by Caro</small>
              <nav className="nav">
                <a href="#/" className="nav-link">Home</a>
                <a href="#/storytelling-lab" className="nav-link">Storytelling Lab</a>
              </nav>
            </div>
          </footer>
    </main>
      </div>
    </div>
  );
}
