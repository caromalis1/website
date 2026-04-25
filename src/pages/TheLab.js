import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./TheLab.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const FEATURES = [
  {
    title: "Curso completo en video (on-demand)",
    description: "6 módulos, 20 lecciones para entender el storytelling y cómo aplicarlo paso a paso a tu contenido, para pasar de improvisar semana a semana a tener una ruta que te guía."
  },
  {
    title: "El método central: tu Mapa Narrativo",
    description: "Una ruta clara para entender quién es y qué le importa a tu audiencia, cómo crear contenido que les hable, y cómo direccionar tu mensaje para que tu oferta se entienda de manera natural."
  },
  {
    title: "Storytelling Lab Workbook",
    description: "Un espacio práctico con más de 150 ejercicios y un sistema para convertir tus ideas en contenido usando estructuras probadas, para dejar de improvisar semana a semana y tener una ruta clara."
  },
  {
    title: "Banco de plantillas, ejemplos e ideas",
    description: "Estructuras narrativas editables, prompts y puntos de partida para abrir conversación, educar, mostrar tus procesos y vender desde lo humano. Para que nunca tengas que partir desde cero."
  },
  {
    title: "Método paso a paso para crear contenido",
    description: "Módulos para aprender a definir tus temáticas de contenido, cómo elegir una idea, cómo escribir un guión, y cómo sostener una narrativa visual coherente."
  },
  {
    title: "Tu universo visual",
    description: "Cómo traducir tu narrativa a lo visual: paleta, estética, luz y estilo para que tu contenido se vea coherente y se sienta tuyo, no genérico."
  }
];

const NARRATIVE_MAP_STEPS = [
  {
    title: "Tu protagonista",
    description: "Quién es tu audiencia de verdad"
  },
  {
    title: "Sus obstáculos",
    description: "Qué la frena por fuera y por dentro"
  },
  {
    title: "La brújula",
    description: "Tu historia de origen y tu autoridad"
  },
  {
    title: "La ruta",
    description: "Cómo se ve tu proceso paso a paso"
  },
  {
    title: "La apuesta",
    description: "Qué está en juego si no cambia nada"
  }
];

const LAB_PROCESS_STEPS = [
  {
    title: "Entras al Lab",
    description: "Acceso inmediato a todo el contenido, sin fechas límite. Este espacio es tuyo, y se adapta a tu ritmo (no al revés)."
  },
  {
    title: "Armas tu Mapa Narrativo",
    description: "Construyes tu mapa narrativo paso a paso: tu base para crear contenido sin depender de tendencias ni hacks."
  },
  {
    title: "Lo conviertes en contenido",
    description: "Eliges ideas, usas puertas de entrada, escribes guiones y captions que se sienten como tú."
  }
];

const LAB_USE_CASES = [
  "Stories, captions y carruseles mejor aterrizados",
  "Escribir guiones para reels con más dirección",
  "Hablar de lo que ofreces con más naturalidad",
  "Convertir ideas sueltas en contenido publicable",
  "Darle más narrativa a tus lanzamientos o ventas",
  "Encontrar una voz más clara y más tuya",
  "Una estructura a la que volver cuando te quedas en blanco"
];

const LAB_FIT_PILLS = [
  "Servicios",
  "Productos",
  "Marcas personales",
  "Educadoras",
  "Negocios locales",
  "Negocios creativos"
];

const TESTIMONIALS = [
  {
    quote: "I'm afraid I'm getting addicted to this great platform. It allows me to get into a flow state and not have autocorrect or voice dictation stop and interrupt me while I'm attempting to articulate my ideas.",
    name: "Greg Dickson",
    role: "Bestselling Author and Business Coach",
    avatar: "GD"
  },
  {
    quote: "I have Parkinson's, and this app has just made my life so much easier using my Mac. I can't even explain the change that it has provided for me.",
    name: "Rick Deeley",
    role: "Index Scanning Manager",
    avatar: "RD"
  },
  {
    quote: "I can make quick edits while speaking to it because flow really understands me perfectly and can make the necessary changes. Flow's accuracy and speed make it a real game changer.",
    name: "Shazabat Yousaf",
    role: "Scout at Soma Capital",
    avatar: "SY"
  },
  {
    quote: "Hey! Flow is currently blowing my mind with how fast and useful it is.",
    name: "Marcus Hajjar",
    role: "Platform at X",
    avatar: "MH"
  },
  {
    quote: "Flow is that extra little part of your brain that helps you formulate full sentences when you might be stuck in thought and have a jittery response.",
    name: "Jeannette Tan",
    role: "Fiction Writer",
    avatar: "JT"
  },
  {
    quote: "Stuttering and it still works well. I think it's really it.",
    name: "Aysen Webb",
    role: "Student",
    avatar: "AW"
  },
  {
    quote: "I rewrote 70% of our content calendar in one sitting. It felt clearer, more human, and finally sounded like us.",
    name: "D. Mejía",
    role: "Founder",
    avatar: "DM"
  }
];

const COURSE_MODULES = [
  {
    title: "Módulo 1: Bienvenida",
    meta: "2 lecciones",
    lessons: ["Introducción al curso", "Desafiemos la narrativa"]
  },
  {
    title: "Módulo 2: Los Fundamentos del Storytelling",
    meta: "3 lecciones",
    lessons: ["Qué hace que una historia conecte", "La diferencia entre informar y narrar", "Placeholder: práctica guiada de fundamentos"]
  },
  {
    title: "Módulo 3: Tu Mapa Narrativo",
    meta: "8 lecciones",
    lessons: ["Tu protagonista y sus obstáculos", "Tu punto de vista como brújula", "Placeholder: ejercicios para ordenar tu narrativa", "Placeholder: revisión de ejemplos aplicados"]
  },
  {
    title: "Módulo 4: Recursos Prácticos",
    meta: "5 lecciones",
    lessons: ["Puertas de entrada para nuevas ideas", "Estructuras para captions y carruseles", "Placeholder: banco de prompts editables"]
  },
  {
    title: "Módulo 5: Recursos Prácticos",
    meta: "1 lección",
    lessons: ["Placeholder: cómo convertir ideas sueltas en contenido publicable"]
  },
  {
    title: "Módulo 6: Cierre",
    meta: "1 lección",
    lessons: ["Placeholder: cómo sostener tu sistema después del Lab"]
  },
  {
    title: "Módulo 7: Storytelling Lab Workbook",
    meta: "7 capítulos",
    lessons: ["Placeholder: ejercicios de claridad", "Placeholder: plantillas de campaña", "Placeholder: checklist para publicar con intención"]
  }
];

const CAROLINA_FACTS = [
  "Soy Chilena",
  "Viví en New York por 10 años",
  "Ahora vivo en Londres",
  "No tengo un perrito, pero quiero un perrito"
];

const FAQ_ITEMS = [
  "¿Cuánto tiempo me tomará hacer el Lab?",
  "¿Necesito experiencia en marketing o creación de contenido?",
  "¿Necesito tener un negocio avanzado para aprovechar el Lab?",
  "¿Por cuánto tiempo tengo acceso al curso?",
  "¿Es un curso teórico?",
  "¿Para qué tipo de negocio es este curso?",
  "¿Necesito saber usar Notion para aprovechar el workbook?",
  "¿Es solo para Instagram?",
  "¿Cuánto tiempo necesito para hacerlo?",
  "¿Necesito ser creativa para hacer este curso?",
  "¿El Lab sirve si ya he tomado otros cursos de contenido?",
  "¿Hay soporte si me quedo con dudas?",
  "¿El acceso de por vida incluye futuras actualizaciones?",
  "¿Ofrecen reembolsos?",
  "¿Puedo hacer el curso desde el teléfono?",
  "Metodos de pago*******",
  "El curso aparece en dolares*****",
  "Si no puedo pagar en mi moneda*****"
];

const SPIRAL_MATCH = {
  reducedMotion: "(prefers-reduced-motion: no-preference)"
};
const SPIRAL_VIEWBOX = {
  width: 1000,
  height: 2200
};
const SPIRAL_PATH_D =
  "M786 0C872 70 904 201 868 303C822 431 659 464 486 508C322 550 146 603 123 742C96 908 218 1015 394 1058C558 1098 682 1033 760 1112C825 1179 706 1218 750 1284C782 1333 894 1293 913 1374C957 1560 715 1692 505 1787C397 1836 313 1856 296 1938C282 2006 338 2070 423 2054C487 2041 505 1985 468 1958C425 1927 359 1962 370 2030C384 2119 526 2137 635 2096";
const SPIRAL_SCROLL = {
  start: "top 74%",
  travelHeightScale: 0.86,
  minTravelHeightScale: 1.2,
  scrub: 0.55
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

function canAnimateSpiral() {
  return window.matchMedia(SPIRAL_MATCH.reducedMotion).matches;
}

export default function TheLab() {
  const [openModuleIndex, setOpenModuleIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);
  const smootherWrapperRef = useRef(null);
  const smootherContentRef = useRef(null);
  const homeHeroRef = useRef(null);
  const spiralSectionRef = useRef(null);
  const spiralInnerRef = useRef(null);
  const spiralSvgRef = useRef(null);
  const spiralPathRef = useRef(null);
  const depthStackRef = useRef(null);
  const methodSectionRef = useRef(null);

  const motionTweenRef = useRef(null);
  const depthPinRef = useRef(null);
  const smootherRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const resizeRafRef = useRef(0);

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

      if (!spiralSection || !pathElement) {
        return;
      }

      const svg = spiralSvgRef.current;
      if (svg) {
        svg.setAttribute("viewBox", `0 0 ${SPIRAL_VIEWBOX.width} ${SPIRAL_VIEWBOX.height}`);
      }

      if (pathElement.getAttribute("d") !== SPIRAL_PATH_D) {
        pathElement.setAttribute("d", SPIRAL_PATH_D);
      }

      const sectionRect = spiralSection.getBoundingClientRect();
      const totalLength = pathElement.getTotalLength();

      if (motionTweenRef.current) {
        motionTweenRef.current.scrollTrigger?.kill();
        motionTweenRef.current.kill();
        motionTweenRef.current = null;
      }

      gsap.set(pathElement, {
        strokeDasharray: totalLength,
        strokeDashoffset: canAnimateSpiral() ? totalLength : 0
      });

      if (!canAnimateSpiral()) {
        return;
      }

      const travelDistance = Math.max(
        sectionRect.height * SPIRAL_SCROLL.travelHeightScale,
        window.innerHeight * SPIRAL_SCROLL.minTravelHeightScale
      );
      const triggerNode = spiralSection;

      motionTweenRef.current = gsap.to(pathElement, {
        duration: 1,
        immediateRender: false,
        ease: "none",
        force3D: false,
        strokeDashoffset: 0,
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

    const updateDepthPin = () => {
      const depthStack = depthStackRef.current;
      const methodSection = methodSectionRef.current;

      if (!depthStack || !methodSection) {
        return;
      }

      if (depthPinRef.current) {
        depthPinRef.current.kill();
        depthPinRef.current = null;
      }

      gsap.set(methodSection, { clearProps: "all" });

      if (window.innerWidth <= 900) {
        return;
      }

      const pinDistance = Math.max(
        depthStack.offsetHeight - window.innerHeight,
        window.innerHeight * 0.9
      );

      depthPinRef.current = ScrollTrigger.create({
        trigger: depthStack,
        start: "top top",
        end: `+=${Math.round(pinDistance)}`,
        pin: methodSection,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true
      });
    };

    const scheduleUpdate = () => {
      if (resizeRafRef.current) {
        cancelAnimationFrame(resizeRafRef.current);
      }

      resizeRafRef.current = requestAnimationFrame(() => {
        resizeRafRef.current = 0;
        updatePathAndTween();
        updateDepthPin();
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

    const reduceMq = window.matchMedia(SPIRAL_MATCH.reducedMotion);

    const onPreferenceChange = () => {
      scheduleUpdate();
    };

    const cleanupReduceMq = createMotionPathMediaListener(reduceMq, onPreferenceChange);

    resizeObserverRef.current = resizeObserver;

    return () => {
      window.removeEventListener("resize", scheduleUpdate);
      cleanupReduceMq();

      if (resizeRafRef.current) {
        cancelAnimationFrame(resizeRafRef.current);
      }

      if (motionTweenRef.current) {
        motionTweenRef.current.scrollTrigger?.kill();
        motionTweenRef.current.kill();
        motionTweenRef.current = null;
      }

      if (depthPinRef.current) {
        depthPinRef.current.kill();
        depthPinRef.current = null;
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
                LOGO
              </a>
              <nav className="nav site-nav" aria-label="Primary">
                <a href="#/" className="nav-link">Home</a>
                <a href="#/storytelling-lab" className="nav-link">Storytelling Lab</a>
                <a href="#/about" className="nav-link">Sobre mi</a>
              </nav>
            </div>
          </header>

          <section className="home-hero" ref={homeHeroRef}>
            <div className="home-hero-content">
              <h1 className="home-hero-title">
                Tu forma de ver el mundo es única.
                <br />
                Tu contenido también debería serlo.
              </h1>
              <p className="home-hero-subtitle">
                Un curso de storytelling aplicado para que publicar contenido deje de sentirse
                como jugar a las adivinanzas.
              </p>
              <a className="home-hero-cta cta-button" href="#/storytelling-lab">
                <span aria-hidden="true">⊙</span>
                Únete al Storytelling Lab
              </a>
            </div>
            <div className="home-hero-bloom home-hero-bloom--pink" aria-hidden="true" />
            <div className="home-hero-bloom home-hero-bloom--peach" aria-hidden="true" />
            <svg className="home-hero-paths" viewBox="0 0 1440 520" aria-hidden="true" preserveAspectRatio="none">
              <path className="hero-path hero-path--red" d="M0 360 C115 310 245 372 360 360 C505 346 610 430 780 420" />
              <path className="hero-path hero-path--coral" d="M710 398 C835 402 1010 384 1165 392" />
              <path className="hero-path hero-path--gold" d="M1015 330 C1124 332 1230 312 1320 260 C1364 236 1406 232 1440 234" />
              <path className="hero-path hero-path--pink" d="M1190 270 C1300 302 1390 346 1440 392" />
              <path className="hero-path hero-path--brown" d="M1360 150 C1390 140 1414 146 1440 142" />
            </svg>
            <div className="home-hero-figures" aria-hidden="true">
              <span className="hero-figure hero-figure--one" />
              <span className="hero-figure hero-figure--two" />
              <span className="hero-figure hero-figure--three" />
              <span className="hero-figure hero-figure--four" />
              <span className="hero-figure hero-figure--five" />
              <span className="hero-figure hero-figure--six" />
            </div>
          </section>

          <section className="lab-storyline" ref={spiralSectionRef}>
            <div className="lab-storyline-inner" ref={spiralInnerRef}>
              <svg
                ref={spiralSvgRef}
                className="lab-storyline-line"
                viewBox={`0 0 ${SPIRAL_VIEWBOX.width} ${SPIRAL_VIEWBOX.height}`}
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <path ref={spiralPathRef} d={SPIRAL_PATH_D} />
              </svg>

              <article className="lab-storyline-copy lab-storyline-copy--first">
                <p>
                  Si llegaste aquí, me atrevo a adivinar que amas lo que haces,
                  pero cada vez que piensas en tener que crear contenido para Instagram
                  te dan ganas de salir corriendo.
                </p>
              </article>

              <figure className="lab-sketch lab-sketch--runner" aria-hidden="true">
                <span className="lab-sketch-runner-head" />
                <span className="lab-sketch-runner-body" />
                <span className="lab-sketch-runner-hair" />
              </figure>

              <article className="lab-storyline-copy lab-storyline-copy--second">
                <p>
                  Pero lo frustrante no es crear contenido. Es intentar hacerlo desde
                  reglas que no fueron escritas para ti. Que te piden sonar perfecta,
                  ser viral. Empujar cuando en verdad lo que quieres es conectar.
                </p>
              </article>

              <figure className="lab-sketch lab-sketch--knitter" aria-hidden="true">
                <span className="lab-sketch-knitter-head" />
                <span className="lab-sketch-knitter-body" />
                <span className="lab-sketch-knitter-thread" />
              </figure>

              <article className="lab-storyline-copy lab-storyline-copy--final">
                <p>
                  Pero la idea no es convertirte en un gurú de las redes sociales,
                  sino aprender a crear contenido desde lo que ya tienes: tu historia,
                  tu mirada y tu voz. Y ahí es donde entra el storytelling.
                </p>
              </article>

              <div className="lab-storyline-knot" aria-hidden="true" />
              <span className="lab-storyline-person" aria-hidden="true" />
            </div>
          </section>

          <div className="lab-depth-stack" ref={depthStackRef}>
            <section className="lab-method" ref={methodSectionRef}>
              <div className="lab-method-panel surface-panel">
                <div className="lab-method-copy">
                  <p className="lab-pill eyebrow-pill">
                    <span aria-hidden="true">⊙</span>
                    Dentro del Storytelling Lab
                  </p>
                  <h2>
                    Un método práctico de storytelling para que publicar contenido
                    deje de sentirse como adivinar en la oscuridad.
                  </h2>
                  <p>
                    El Lab NO es un curso de marketing tradicional, ni una colección
                    de fórmulas para "hacer contenido que venda". Es un laboratorio
                    creativo y práctico donde aprendes a entender tu historia, ordenar
                    tus ideas y convertirlas en contenido que se sienta auténtico y
                    emocionalmente honesto, con una ruta concreta que puedas sostener
                    en el tiempo, sin depender de la inspiración del día.
                  </p>
                </div>

                <div className="lab-method-visuals" aria-hidden="true">
                  <figure className="lab-laptop lab-laptop--video">
                    <div className="lab-laptop-screen">
                      <div className="lab-video-frame">
                        <span>La esencia del objeto</span>
                        <strong>Foto por intención</strong>
                      </div>
                    </div>
                  </figure>
                  <figure className="lab-laptop lab-laptop--workbook">
                    <div className="lab-laptop-screen">
                      <div className="lab-workbook-page">
                        <span>Taller Creativo</span>
                        <i />
                        <i />
                        <i />
                      </div>
                    </div>
                  </figure>
                  <figure className="lab-laptop lab-laptop--modules">
                    <div className="lab-laptop-screen">
                      <div className="lab-modules-list">
                        <span>MÓDULO 1: Bienvenida</span>
                        <i />
                        <i />
                        <span>MÓDULO 2: Los fundamentos del Storytelling</span>
                        <i />
                      </div>
                    </div>
                  </figure>
                </div>
              </div>
            </section>

            <section className="lab-includes">
              <div className="lab-includes-inner content-shell">
                <div className="lab-includes-heading">
                  <p className="lab-pill eyebrow-pill">
                    <span aria-hidden="true">⊙</span>
                    Dentro del Storytelling Lab
                  </p>
                  <h2>
                    Todo lo que incluye el Lab
                    <br />
                    para destrabar tu contenido
                  </h2>
                  <p>
                    Porque no se trata solo de tener ideas. Se trata de poder usarlas
                    en los espacios donde de verdad comunicas lo que haces.
                  </p>
                </div>

                <div className="lab-feature-grid">
                  {FEATURES.map((feature) => (
                    <article key={feature.title} className="lab-include-card surface-card">
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <section className="lab-map">
            <div className="lab-map-inner content-shell">
              <div className="lab-map-copy">
                <h2>
                  El Mapa Narrativo: la
                  <br />
                  brújula de todo tu contenido
                </h2>
                <p>
                  La mayoría de las emprendedoras empiezan a crear contenido a mitad de camino:
                  pensando en qué postear, en el calendario, en los hashtags... pero saltándose
                  un paso fundamental: entender qué historia está contando su marca.
                </p>
              </div>

              <div className="lab-map-stack" aria-label="Componentes del Mapa Narrativo">
                {NARRATIVE_MAP_STEPS.map((step, index) => (
                  <article
                    className="lab-map-card surface-card"
                    key={step.title}
                    style={{ "--stack-index": index }}
                  >
                    <span className="lab-map-card-icon" aria-hidden="true" />
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="lab-process">
            <div className="lab-process-panel surface-panel">
              <h2>Cómo funciona el Storytelling Lab</h2>
              <div className="lab-process-grid">
                {LAB_PROCESS_STEPS.map((step) => (
                  <article className="lab-process-step" key={step.title}>
                    <div className="lab-process-image-slot" aria-hidden="true" />
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="lab-use-cases">
            <div className="lab-use-cases-inner content-shell">
              <h2>
                Algunas de las formas
                <br />
                en que puedes usar el Lab
              </h2>
              <div className="lab-use-map">
                <svg className="lab-use-lines" viewBox="0 0 980 520" aria-hidden="true" preserveAspectRatio="none">
                  <path d="M155 96C192 57 288 127 363 83C424 47 474 54 532 91" />
                  <path d="M188 267C252 228 340 291 393 308C428 319 408 258 426 276C451 302 497 304 557 268" />
                  <path d="M166 385C150 432 175 459 213 447C249 434 230 404 196 418C169 429 162 478 188 518" />
                  <path d="M396 356C461 314 515 378 488 406" />
                  <path d="M623 119C672 70 771 73 775 131C778 181 728 239 772 286" />
                  <path d="M744 348C793 425 760 469 637 468C550 467 499 442 459 393" />
                </svg>
                {LAB_USE_CASES.map((item, index) => (
                  <p className={`lab-use-label lab-use-label--${index + 1}`} key={item}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </section>

          <section className="lab-fit">
            <div className="lab-fit-inner content-shell">
              <div className="lab-fit-copy">
                <h2>
                  ¿Pero cómo sé si el
                  <br />
                  Storytelling Lab es para mi?
                </h2>
                <div className="lab-fit-pills pill-cluster" aria-label="Tipos de negocios">
                  {LAB_FIT_PILLS.map((pill, index) => (
                    <span className={index === 0 ? "is-highlighted" : ""} key={pill}>
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lab-fit-card-wrap">
                <article className="lab-fit-card surface-card">
                  <h3>Para proveedoras de servicios</h3>
                  <p>
                    Si ofreces un servicio, probablemente sabes que el reto no es solo decir
                    "esto hago". También es mostrar tu proceso, tu criterio y qué hace distinto
                    tu enfoque. El Storytelling Lab te ayuda a convertir todo eso en contenido
                    más claro, más humano y mucho más fácil de sostener.
                  </p>
                </article>
              </div>
            </div>
          </section>

          <section className="lab-testimonials">
            <div className="lab-testimonials-inner content-shell">
              <h2>
                Cartitas de amor de nuestra
                <br />
                comunidad al Storytelling Lab
              </h2>
              <div className="lab-testimonial-row">
                {[...TESTIMONIALS, ...TESTIMONIALS].map((item, index) => (
                  <article
                    key={`${item.quote}-${index}`}
                    className="lab-testimonial-card"
                    aria-hidden={index >= TESTIMONIALS.length}
                  >
                    <span className="lab-testimonial-avatar" aria-hidden="true">
                      {item.avatar}
                    </span>
                    <p className="lab-quote">{item.quote}</p>
                    <p className="lab-meta">
                      {item.name}, {item.role}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="lab-curriculum">
            <div className="lab-curriculum-title" aria-label="El contenido del curso">
              <span className="lab-curriculum-word lab-curriculum-word--el">El</span>
              <span className="lab-curriculum-word lab-curriculum-word--contenido">contenido</span>
              <span className="lab-curriculum-word lab-curriculum-word--del">del</span>
              <span className="lab-curriculum-word lab-curriculum-word--curso">curso</span>
              <svg className="lab-curriculum-line" viewBox="0 0 520 360" aria-hidden="true">
                <path d="M126 44C204 29 296 38 356 68C442 112 430 196 366 206" />
                <path d="M119 144C63 148 38 165 56 200" />
                <path d="M94 147C190 133 242 134 287 142" />
                <path d="M128 242C184 296 349 315 359 220C367 144 263 110 218 174C174 237 183 302 222 352" />
              </svg>
              <span className="lab-curriculum-dot" aria-hidden="true" />
            </div>

            <div className="lab-curriculum-list" aria-label="Contenido del curso">
              {COURSE_MODULES.map((module, index) => (
                <article
                  className={`lab-curriculum-module${openModuleIndex === index ? " is-open" : ""}`}
                  key={module.title}
                >
                  <button
                    className="lab-curriculum-trigger"
                    type="button"
                    aria-expanded={openModuleIndex === index}
                    aria-controls={`course-module-${index}`}
                    onClick={() => setOpenModuleIndex((currentIndex) => (
                      currentIndex === index ? -1 : index
                    ))}
                  >
                    <span>
                      <h3>{module.title}</h3>
                      <p>{module.meta}</p>
                    </span>
                    <svg className="lab-curriculum-chevron ui-chevron" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6.5 9.5L12 15l5.5-5.5" />
                    </svg>
                  </button>

                  <div
                    className="lab-curriculum-panel"
                    id={`course-module-${index}`}
                    hidden={openModuleIndex !== index}
                  >
                    <ul>
                      {module.lessons.map((lesson) => (
                        <li key={lesson}>{lesson}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="lab-about">
            <div className="lab-about-inner">
              <h2>Hola! Soy Carolina</h2>
              <div className="lab-about-card">
                <div className="lab-about-photos" aria-label="Fotos de Carolina">
                  <figure className="lab-about-photo lab-about-photo--one">
                    <span />
                  </figure>
                  <figure className="lab-about-photo lab-about-photo--two">
                    <span />
                  </figure>
                  <figure className="lab-about-photo lab-about-photo--three">
                    <span />
                  </figure>
                  <figure className="lab-about-photo lab-about-photo--four">
                    <span />
                  </figure>
                </div>

                <div className="lab-about-copy">
                  <p>
                    Yo también pasé por la etapa de seguir las reglas invisibles del marketing:
                    publicar porque “hay que hacerlo”, repetir fórmulas, perseguir tendencias,
                    y sentir que lo que salía no era mío.
                  </p>
                  <p>
                    Así que decidí dejar de buscar “la fórmula mágica” y volví a lo único que
                    siempre me había hecho sentido: las historias. He pasado por varias esquinas
                    de las comunicaciones: estudié comunicación escénica, he escrito por años
                    para revistas, y he creado contenido para marcas y emprendimientos.
                  </p>
                  <p>
                    El Storytelling Lab nació desde ahí. No para que aprendas a “hacer mejor
                    contenido”, sino para que hacerlo no se sienta como una tortura futurista
                    digna de Black Mirror. Para reconectar con tu voz, ordenar tus ideas y
                    convertir tu historia y tu oferta en contenido claro, real y sostenible.
                  </p>
                </div>
              </div>

              <aside className="lab-about-facts" aria-label="Datos sobre Carolina">
                {CAROLINA_FACTS.map((fact) => (
                  <p key={fact}>{fact}</p>
                ))}
              </aside>
            </div>
          </section>

          <section className="lab-price">
            <div className="lab-price-panel">
              <div className="lab-price-heading">
                <h2>¿Entonces, de cuánto estamos hablando?</h2>
                <p>Si te sumas al Lab hoy, recibes acceso inmediato a todo el material del curso</p>
              </div>

              <div className="lab-price-options">
                <article className="lab-price-option">
                  <p className="lab-price-badge lab-price-badge--yellow">Más Conveniente</p>
                  <h3>Un Solo Pago</h3>
                  <p className="lab-price-installments">1 pago de</p>
                  <p className="lab-price-amount">
                    <span>$</span>69 <small>dólares</small>
                  </p>
                  <a href="#/storytelling-lab" className="lab-price-cta cta-button">
                    Únete al Storytelling Lab
                  </a>
                </article>

                <article className="lab-price-option">
                  <p className="lab-price-badge lab-price-badge--pink">Más Flexible</p>
                  <h3>Pago Mensual</h3>
                  <p className="lab-price-installments">2 pagos de</p>
                  <p className="lab-price-amount">
                    <span>$</span>39 <small>dólares</small>
                  </p>
                  <a href="#/storytelling-lab" className="lab-price-cta cta-button">
                    Únete al Storytelling Lab
                  </a>
                </article>
              </div>

              <div className="lab-payment-strip" aria-label="Métodos de pago aceptados">
                <span>VISA</span>
                <span>●●</span>
                <span>DISCOVER</span>
                <span>AMEX</span>
                <span>Pay</span>
                <span>G Pay</span>
                <span>$</span>
                <span>affirm</span>
                <span>Klarna</span>
              </div>
            </div>
          </section>

          <section className="lab-faq">
            <div className="lab-faq-panel">
              <h2>Tengo algunas preguntas...</h2>
              <p className="lab-faq-kicker">Sobre el curso</p>
              <div className="lab-faq-list">
                {FAQ_ITEMS.map((question, index) => (
                  <article
                    className={`lab-faq-item${openFaqIndex === index ? " is-open" : ""}`}
                    key={question}
                  >
                    <button
                      className="lab-faq-trigger"
                      type="button"
                      aria-expanded={openFaqIndex === index}
                      aria-controls={`faq-answer-${index}`}
                      onClick={() => setOpenFaqIndex((currentIndex) => (
                        currentIndex === index ? -1 : index
                      ))}
                    >
                      <span>{question}</span>
                      <svg className="lab-faq-chevron ui-chevron" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6.5 9.5L12 15l5.5-5.5" />
                      </svg>
                    </button>
                    <div
                      className="lab-faq-answer"
                      id={`faq-answer-${index}`}
                      hidden={openFaqIndex !== index}
                    >
                      <p>
                        Placeholder: aquí irá una respuesta clara y breve para esta pregunta.
                        La idea es resolver la duda sin sonar técnica ni prometer de más.
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <footer className="lab-footer">
            <svg className="lab-footer-wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 38C184 24 335 34 493 45C681 58 823 65 1013 55C1177 47 1280 42 1440 30V0H0Z" />
            </svg>

            <div className="lab-footer-inner">
              <div className="lab-footer-top">
                <div className="lab-footer-socials" aria-label="Redes sociales">
                  <a href="mailto:hola@socialsbycaro.com" aria-label="Email">
                    <span>✉</span>
                  </a>
                  <a href="#/instagram" aria-label="Instagram">
                    <span>◎</span>
                  </a>
                  <a href="#/pinterest" aria-label="Pinterest">
                    <span>p</span>
                  </a>
                  <a href="#/linkedin" aria-label="LinkedIn">
                    <span>in</span>
                  </a>
                  <a href="#/facebook" aria-label="Facebook">
                    <span>f</span>
                  </a>
                </div>
                <nav className="lab-footer-links" aria-label="Legal">
                  <a href="#/terms">Términos y condiciones</a>
                  <a href="#/privacy">Política de privacidad</a>
                  <a href="#/contact">Contacto</a>
                </nav>
              </div>

              <div className="lab-footer-bottom">
                <small>© 2026 Socials by Caro</small>
                <p>Storytelling Lab</p>
                <small>Todos los derechos reservados.</small>
              </div>
            </div>
          </footer>
    </main>
      </div>
    </div>
  );
}
