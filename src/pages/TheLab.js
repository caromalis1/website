import { useLayoutEffect, useRef, useState } from "react";
import Logo from "../components/Logo";
import "./TheLab.css";

const FEATURES = [
  {
    title: "Tu Mapa Narrativo",
    label: "El método central",
    illustration: "map",
    description: "La base de todo lo que vas a crear. Una ruta clara que te ayuda a entender a tu audiencia, qué necesita escuchar, qué la frena, tu rol en su historia, y cómo crear contenido que les hable."
  },
  {
    title: "Storytelling Lab Workbook",
    label: "Tu hub de trabajo",
    illustration: "workbook",
    description: "Más de 150 ejercicios para convertir tus ideas en posts, reels y stories usando estructuras probadas, para pasar de improvisar semana a semana a tener una ruta que te guía."
  },
  {
    title: "Banco de plantillas, ejemplos e ideas",
    label: "Tu banco de recursos",
    illustration: "templates",
    description: "Para cuando tienes algo que decir pero la pantalla en blanco gana. Estructuras narrativas editables para abrir conversación, educar, compartir tus procesos y vender desde lo humano."
  },
  {
    title: "6 módulos, 20 lecciones",
    label: "Curso on-demand",
    illustration: "modules",
    description: "Todo el recorrido, desde entender el storytelling y cómo aplicarlo paso a paso, hasta cómo elegir una idea, escribir un guión y crear contenido con tu voz."
  },
  {
    title: "Tu universo visual",
    label: "Identidad estética",
    illustration: "visual",
    description: "Tu contenido se ve antes de que lo lean. Este módulo te ayuda a que lo visual y lo escrito cuenten la misma historia."
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

const LAB_FIT_CONTENT = [
  {
    label: "Servicios",
    title: "Para proveedoras de servicios",
    description: "Si ofreces un servicio, probablemente sabes que el reto no es solo decir “esto hago”. También es mostrar tu proceso, tu criterio y qué hace distinto tu enfoque. El Storytelling Lab te ayuda a convertir todo eso en contenido más claro, más humano y mucho más fácil de sostener."
  },
  {
    label: "Productos",
    title: "Para marcas de productos",
    description: "Convierte detalles, usos, materiales y momentos cotidianos en historias simples que ayuden a entender por qué tu producto importa y cómo entra en la vida de tus clientes."
  },
  {
    label: "Marcas personales",
    title: "Para marcas personales",
    description: "Ordena tus ideas, tu experiencia y tu punto de vista para que tu contenido tenga una voz reconocible, sin depender de tendencias que no se sienten tuyas."
  },
  {
    label: "Educadoras",
    title: "Para educadoras y mentoras",
    description: "Transforma conceptos, ejemplos y frameworks en piezas narrativas, claras y fáciles de seguir, para que enseñar no se sienta como repetir lo mismo de mil formas."
  },
  {
    label: "Negocios locales",
    title: "Para negocios locales",
    description: "Cuenta lo que pasa detrás de tu negocio, muestra tus diferencias y convierte la experiencia diaria de tu marca en contenido cercano."
  },
  {
    label: "Negocios creativos",
    title: "Para negocios creativos",
    description: "Dale estructura a tus ideas sin quitarles personalidad, y convierte inspiración, referencias y procesos en contenido publicable."
  }
];

const TESTIMONIALS = [
  {
    quote: "Por fin pude explicar lo que hago sin sentir que estaba copiando una fórmula ajena.",
    name: "Camila R.",
    role: "Diseñadora de marca",
    avatar: "CR"
  },
  {
    quote: "El mapa narrativo me ordenó la cabeza. Ahora sé desde dónde escribir cada pieza de contenido.",
    name: "Valentina M.",
    role: "Mentora creativa",
    avatar: "VM"
  },
  {
    quote: "Dejé de publicar por cumplir. Mis captions volvieron a sonar como yo.",
    name: "Paula S.",
    role: "Fotógrafa",
    avatar: "PS"
  },
  {
    quote: "Me ayudó a convertir ideas sueltas en una narrativa clara para mi lanzamiento.",
    name: "Mariana F.",
    role: "Consultora",
    avatar: "MF"
  },
  {
    quote: "Nunca había sentido que un curso de contenido entendiera tan bien mi manera de trabajar.",
    name: "Daniela L.",
    role: "Ceramista",
    avatar: "DL"
  },
  {
    quote: "Volví a mirar mi historia como una herramienta, no como algo que tenía que esconder.",
    name: "Sofía G.",
    role: "Psicóloga",
    avatar: "SG"
  },
  {
    quote: "Reescribí todo mi calendario en una tarde. Se sintió más humano y mucho más sostenible.",
    name: "D. Mejía",
    role: "Fundadora",
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
  "No tengo un perrito, pero quiero un perrito",
  "Amo los días nublados",
  "Siempre llego temprano a todo",
  "Ya tengo pensado el nombre del perrito",
  "Soy adicta a las flores y plantas"
];

const PAYMENT_PLANS = [
  {
    label: "Un solo pago",
    eyebrow: "1 pago de",
    amount: "$69",
    suffix: "dólares",
    badge: "Más Conveniente"
  },
  {
    label: "3 cuotas",
    eyebrow: "3 pagos de",
    amount: "$25",
    suffix: "dólares",
    badge: "Más Flexible"
  }
];

const PAYMENT_INCLUDES = [
  "Acceso inmediato a todo el material del curso",
  "6 módulos y 20 lecciones on-demand",
  "Tu Mapa Narrativo",
  "Storytelling Lab Workbook con 150+ ejercicios",
  "Banco de plantillas, prompts y puntos de partida",
  "Módulo de universo visual",
  "Acceso de por vida y a todas las actualizaciones futuras"
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

function buildMapThreadPath(points, width) {
  if (points.length < 5) {
    return "";
  }

  const [bet, protagonist, obstacles, compass, route] = points;
  const leftEdge = { x: -8, y: bet.y };
  const rightEdge = { x: width + 8, y: route.y + 6 };
  const loop = {
    x: compass.x + (route.x - compass.x) * 0.46,
    y: Math.max(34, compass.y + 22)
  };

  return [
    `M${leftEdge.x.toFixed(1)} ${leftEdge.y.toFixed(1)}`,
    `C${(bet.x - 160).toFixed(1)} ${(bet.y - 10).toFixed(1)} ${(bet.x - 58).toFixed(1)} ${(bet.y - 8).toFixed(1)} ${bet.x.toFixed(1)} ${bet.y.toFixed(1)}`,
    `C${(bet.x + 90).toFixed(1)} ${(bet.y + 2).toFixed(1)} ${(protagonist.x - 150).toFixed(1)} ${(protagonist.y - 78).toFixed(1)} ${protagonist.x.toFixed(1)} ${protagonist.y.toFixed(1)}`,
    `C${(protagonist.x + 116).toFixed(1)} ${(protagonist.y - 126).toFixed(1)} ${(obstacles.x - 178).toFixed(1)} ${(obstacles.y - 112).toFixed(1)} ${obstacles.x.toFixed(1)} ${obstacles.y.toFixed(1)}`,
    `C${(obstacles.x + 86).toFixed(1)} ${(obstacles.y - 68).toFixed(1)} ${(compass.x - 110).toFixed(1)} ${(compass.y - 10).toFixed(1)} ${compass.x.toFixed(1)} ${compass.y.toFixed(1)}`,
    `C${(compass.x + 68).toFixed(1)} ${(compass.y + 4).toFixed(1)} ${(loop.x - 56).toFixed(1)} ${(loop.y - 34).toFixed(1)} ${loop.x.toFixed(1)} ${loop.y.toFixed(1)}`,
    `C${(loop.x + 56).toFixed(1)} ${(loop.y + 28).toFixed(1)} ${(loop.x + 36).toFixed(1)} ${(loop.y + 84).toFixed(1)} ${(loop.x - 12).toFixed(1)} ${(loop.y + 66).toFixed(1)}`,
    `C${(loop.x - 60).toFixed(1)} ${(loop.y + 48).toFixed(1)} ${(loop.x - 32).toFixed(1)} ${(loop.y - 16).toFixed(1)} ${(loop.x + 24).toFixed(1)} ${(loop.y + 4).toFixed(1)}`,
    `C${(loop.x + 68).toFixed(1)} ${(loop.y + 20).toFixed(1)} ${(route.x - 92).toFixed(1)} ${(route.y - 44).toFixed(1)} ${route.x.toFixed(1)} ${route.y.toFixed(1)}`,
    `C${(route.x + 74).toFixed(1)} ${(route.y + 38).toFixed(1)} ${(rightEdge.x - 180).toFixed(1)} ${(rightEdge.y - 6).toFixed(1)} ${rightEdge.x.toFixed(1)} ${rightEdge.y.toFixed(1)}`
  ].join("");
}

function ChevronIcon({ className }) {
  return (
    <svg className={`${className} ui-chevron`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.5 9.5L12 15l5.5-5.5" />
    </svg>
  );
}

function LabFeatureIllustration({ type }) {
  return (
    <figure className={`lab-include-illustration lab-include-illustration--${type}`} aria-hidden="true">
      <svg viewBox="0 0 180 150" focusable="false">
        {type === "map" && (
          <>
            <path d="M34 105C51 70 72 47 105 36C125 30 143 30 156 38" />
            <path d="M45 105L83 91L120 101L151 82" />
            <circle cx="82" cy="91" r="8" />
            <circle cx="121" cy="101" r="8" />
            <path d="M54 58L70 82L56 112L39 86Z" />
            <path d="M99 41L119 70L106 101L83 91Z" />
          </>
        )}
        {type === "workbook" && (
          <>
            <path d="M48 36H125C135 36 142 43 142 53V119H60C53 119 48 114 48 107Z" />
            <path d="M60 36V119" />
            <path d="M76 58H121" />
            <path d="M76 78H116" />
            <path d="M76 98H105" />
            <path d="M134 46C145 55 149 67 145 82" />
          </>
        )}
        {type === "templates" && (
          <>
            <rect x="35" y="42" width="55" height="68" rx="5" />
            <rect x="88" y="32" width="58" height="70" rx="5" />
            <path d="M47 60H76" />
            <path d="M47 78H70" />
            <path d="M101 52H133" />
            <path d="M101 71H127" />
            <path d="M70 116C88 126 118 124 139 110" />
          </>
        )}
        {type === "modules" && (
          <>
            <rect x="41" y="44" width="98" height="64" rx="7" />
            <path d="M83 64L110 76L83 89Z" />
            <path d="M51 122H129" />
            <path d="M69 108L62 122" />
            <path d="M111 108L118 122" />
            <circle cx="143" cy="45" r="13" />
            <path d="M143 38V52" />
            <path d="M136 45H150" />
          </>
        )}
        {type === "visual" && (
          <>
            <path d="M43 89C55 54 83 35 116 41C137 45 150 59 153 79" />
            <path d="M43 89C70 119 117 122 153 79" />
            <circle cx="97" cy="80" r="18" />
            <circle cx="97" cy="80" r="6" />
            <path d="M55 38C63 30 75 27 86 31" />
            <path d="M128 113C139 111 149 105 156 96" />
          </>
        )}
      </svg>
    </figure>
  );
}

export default function TheLab() {
  const [openModuleIndex, setOpenModuleIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);
  const [selectedFitIndex, setSelectedFitIndex] = useState(0);
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState(0);
  const [isFitCardVisible, setIsFitCardVisible] = useState(true);
  const smootherWrapperRef = useRef(null);
  const smootherContentRef = useRef(null);
  const homeHeroRef = useRef(null);
  const spiralSectionRef = useRef(null);
  const spiralInnerRef = useRef(null);
  const spiralSvgRef = useRef(null);
  const spiralPathRef = useRef(null);
  const depthStackRef = useRef(null);
  const methodSectionRef = useRef(null);
  const includesSectionRef = useRef(null);
  const mapCopyRef = useRef(null);
  const mapStackRef = useRef(null);
  const mapLineSvgRef = useRef(null);
  const mapLinePathRef = useRef(null);
  const useCasesRef = useRef(null);

  const motionTweenRef = useRef(null);
  const mapLineTweenRef = useRef(null);
  const depthPinRef = useRef(null);
  const mapCopyPinRef = useRef(null);
  const mapCardPinsRef = useRef([]);
  const fitFadeTimeoutRef = useRef(null);
  const smootherRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const resizeRafRef = useRef(0);

  useLayoutEffect(() => {
    let isActive = true;
    let cleanupMotion = () => {};

    const initMotion = async () => {
      const [
        gsapModule,
        { ScrollSmoother },
        { ScrollTrigger }
      ] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollSmoother"),
        import("gsap/ScrollTrigger")
      ]);

      if (!isActive) {
        if (!document.documentElement.classList.contains("lab-pin-sections")) {
          return;
        }
      }

      const gsap = gsapModule.gsap || gsapModule.default || gsapModule;
      gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

      const smootherWrapper = smootherWrapperRef.current;
      const smootherContent = smootherContentRef.current;

      if (!smootherWrapper || !smootherContent) {
        if (!document.documentElement.classList.contains("lab-pin-sections")) {
          return;
        }
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
        const includesSection = includesSectionRef.current;

        if (!depthStack || !methodSection || !includesSection) {
          return;
        }

        if (depthPinRef.current) {
          depthPinRef.current.kill();
          depthPinRef.current = null;
        }

        gsap.set(methodSection, { clearProps: "all" });

        if (!document.documentElement.classList.contains("lab-pin-sections")) {
          return;
        }

        if (window.innerWidth <= 900) {
          return;
        }

        const pinDistance = Math.max(
          includesSection.offsetTop - window.innerHeight * 0.08,
          window.innerHeight * 0.9
        );

        depthPinRef.current = ScrollTrigger.create({
          trigger: depthStack,
          start: "top top",
          end: `+=${Math.round(pinDistance)}`,
          pin: methodSection,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeave: () => {
            gsap.set(methodSection, { autoAlpha: 0, pointerEvents: "none" });
          },
          onEnterBack: () => {
            gsap.set(methodSection, { autoAlpha: 1, pointerEvents: "auto" });
          }
        });
      };

      const updateMapCardPins = () => {
        const mapStack = mapStackRef.current;
        const mapSection = mapStack?.closest(".lab-map");
        const mapCopy = mapCopyRef.current;

        if (mapCopyPinRef.current) {
          mapCopyPinRef.current.kill();
          mapCopyPinRef.current = null;
        }

        mapCardPinsRef.current.forEach((trigger) => trigger.kill());
        mapCardPinsRef.current = [];

        if (!document.documentElement.classList.contains("lab-pin-sections")) {
          return;
        }

        if (!mapStack || !mapSection || !mapCopy || window.innerWidth <= 900) {
          return;
        }

        mapCopyPinRef.current = ScrollTrigger.create({
          trigger: mapCopy,
          start: "top 132px",
          endTrigger: mapSection,
          end: "bottom 72%",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true
        });

        const mapCards = Array.from(mapStack.querySelectorAll(".lab-map-card"));
        const stackedGap = 72;
        const stackTop = Math.max(86, window.innerHeight * 0.12);

        mapCards.forEach((card, index) => {
          const pinTop = Math.round(stackTop + index * stackedGap);

          mapCardPinsRef.current.push(
            ScrollTrigger.create({
              trigger: card,
              start: () => `top ${pinTop}`,
              endTrigger: mapSection,
              end: () => `bottom ${pinTop + card.offsetHeight + 180}`,
              pin: true,
              pinSpacing: false,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onEnter: () => card.classList.add("is-stacked"),
              onLeaveBack: () => card.classList.remove("is-stacked")
            })
          );
        });
      };

      const updateMapLine = () => {
        const mapStack = mapStackRef.current;
        const svgElement = mapLineSvgRef.current;
        const pathElement = mapLinePathRef.current;

        if (mapLineTweenRef.current) {
          mapLineTweenRef.current.scrollTrigger?.kill();
          mapLineTweenRef.current.kill();
          mapLineTweenRef.current = null;
        }

        if (!mapStack || !svgElement || !pathElement) {
          return;
        }

        const svgRect = svgElement.getBoundingClientRect();
        const mapCards = Array.from(mapStack.querySelectorAll(".lab-map-card"));
        const anchorPoints = mapCards
          .map((card) => {
            const dot = card.querySelector(".lab-map-card-icon");
            const dotRect = dot?.getBoundingClientRect();

            if (!dotRect) {
              return null;
            }

            return {
              x: dotRect.left + dotRect.width / 2 - svgRect.left,
              y: dotRect.top + dotRect.height / 2 - svgRect.top
            };
          })
          .filter(Boolean)
          .sort((a, b) => a.x - b.x);

        if (anchorPoints.length < 5) {
          return;
        }

        const viewBoxWidth = Math.max(1, svgRect.width);
        const viewBoxHeight = Math.max(1, svgRect.height);
        const pathData = buildMapThreadPath(anchorPoints, viewBoxWidth);

        svgElement.setAttribute("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`);

        if (pathElement.getAttribute("d") !== pathData) {
          pathElement.setAttribute("d", pathData);
        }

        const pathLength = pathElement.getTotalLength();

        gsap.set(pathElement, {
          strokeDasharray: pathLength,
          strokeDashoffset: canAnimateSpiral() && window.innerWidth > 900 ? pathLength : 0
        });

        if (!canAnimateSpiral() || window.innerWidth <= 900) {
          return;
        }

        mapLineTweenRef.current = gsap.to(pathElement, {
          strokeDashoffset: 0,
          duration: 1,
          ease: "none",
          scrollTrigger: {
            trigger: mapStack,
            start: "top 72%",
            end: "bottom 58%",
            scrub: 0.8,
            invalidateOnRefresh: true
          }
        });
      };

      const useCases = useCasesRef.current;
      let useCasesAnimation;
      let useCasesObserver;

      if (useCases) {
        const paths = useCases.querySelectorAll(".lab-use-lines path");
        const dots = useCases.querySelectorAll(".lab-use-dot");
        const labels = useCases.querySelectorAll(".lab-use-label");
        const shuffledLabels = gsap.utils.shuffle(Array.from(labels));

        if (canAnimateSpiral() && window.innerWidth > 900) {
          paths.forEach((path) => {
            const pathLength = path.getTotalLength();

            gsap.set(path, {
              strokeDasharray: pathLength,
              strokeDashoffset: pathLength
            });
          });

          gsap.set(labels, { autoAlpha: 0, y: 12 });
          gsap.set(dots, { autoAlpha: 0, scale: 0.5, transformOrigin: "center" });

          useCasesAnimation = gsap.timeline({
            defaults: { ease: "power2.out" },
            paused: true
          });

          useCasesAnimation
            .to(shuffledLabels, {
              autoAlpha: 1,
              y: 0,
              duration: () => gsap.utils.random(0.42, 0.72),
              stagger: () => gsap.utils.random(0.05, 0.22)
            })
            .to(paths, {
              strokeDashoffset: 0,
              duration: 1.35,
              ease: "power1.inOut"
            })
            .to(dots, {
              autoAlpha: 1,
              scale: 1,
              duration: 0.22,
              stagger: 0.035
            }, "-=0.28");

          useCasesObserver = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              useCasesAnimation.play();
              useCasesObserver.disconnect();
            }
          }, { rootMargin: "0px 0px -28% 0px", threshold: 0.12 });

          useCasesObserver.observe(useCases);
        } else {
          paths.forEach((path) => {
            gsap.set(path, {
              strokeDasharray: path.getTotalLength(),
              strokeDashoffset: 0
            });
          });
          gsap.set(dots, { autoAlpha: 1, scale: 1, transformOrigin: "center" });
          gsap.set(labels, { autoAlpha: 1, y: 0, clearProps: "transform" });
        }
      }

      const scheduleUpdate = () => {
        if (resizeRafRef.current) {
          cancelAnimationFrame(resizeRafRef.current);
        }

        resizeRafRef.current = requestAnimationFrame(() => {
          resizeRafRef.current = 0;
          updatePathAndTween();
          updateDepthPin();
          updateMapCardPins();
          updateMapLine();
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

      cleanupMotion = () => {
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

        if (mapCopyPinRef.current) {
          mapCopyPinRef.current.kill();
          mapCopyPinRef.current = null;
        }

        if (mapLineTweenRef.current) {
          mapLineTweenRef.current.scrollTrigger?.kill();
          mapLineTweenRef.current.kill();
          mapLineTweenRef.current = null;
        }

        if (useCasesAnimation) {
          useCasesAnimation.kill();
        }

        if (useCasesObserver) {
          useCasesObserver.disconnect();
        }

        mapCardPinsRef.current.forEach((trigger) => trigger.kill());
        mapCardPinsRef.current = [];

        if (fitFadeTimeoutRef.current) {
          clearTimeout(fitFadeTimeoutRef.current);
          fitFadeTimeoutRef.current = null;
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
    };

    initMotion().catch((error) => {
      if (isActive) {
        console.error("Unable to initialize Lab motion.", error);
      }
    });

    return () => {
      isActive = false;
      cleanupMotion();
    };
  }, []);

  const selectedFit = LAB_FIT_CONTENT[selectedFitIndex];
  const selectedPaymentPlan = PAYMENT_PLANS[selectedPaymentIndex];

  const handleFitSelect = (index) => {
    if (index === selectedFitIndex) {
      return;
    }

    if (fitFadeTimeoutRef.current) {
      clearTimeout(fitFadeTimeoutRef.current);
    }

    setIsFitCardVisible(false);

    fitFadeTimeoutRef.current = setTimeout(() => {
      setSelectedFitIndex(index);
      setIsFitCardVisible(true);
      fitFadeTimeoutRef.current = null;
    }, 160);
  };

  const scrollToStoryDetails = () => {
    spiralSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="lab-scroll-wrapper" ref={smootherWrapperRef}>
      <div className="lab-scroll-content" ref={smootherContentRef}>
        <main className="lab">
          <header className="site-header">
            <div className="site-header-inner">
              <a href="#/" className="brand" aria-label="Socials by Caro">
                <Logo label="Caro Malis" sublabel="Storytelling Lab" />
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
                El Storytelling Lab te ayuda a encontrar tu forma natural de comunicarte para
                que crear contenido deje de sentirse como jugar a las adivinanzas.
              </p>
              <div className="home-hero-actions">
                <a className="home-hero-cta home-hero-cta--primary cta-button" href="#/storytelling-lab">
                  Únete al Storytelling Lab
                </a>
                <button
                  className="home-hero-cta home-hero-cta--secondary cta-button"
                  type="button"
                  onClick={scrollToStoryDetails}
                >
                  Quiero saber más
                </button>
              </div>
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
                  Seamos sinceras: Crear contenido se siente más difícil de lo que debería...
                </p>
              </article>

              <figure className="lab-sketch lab-sketch--runner" aria-hidden="true">
                <span className="lab-sketch-runner-head" />
                <span className="lab-sketch-runner-body" />
                <span className="lab-sketch-runner-hair" />
              </figure>

              <article className="lab-storyline-copy lab-storyline-copy--second">
                <p>
                  Sobre todo cuando eres tú sola haciéndolo TODO
                </p>
                <small>
                  La CEO, la contadora, la de marketing, la de atención al cliente... y ahora también la creadora de contenido.
                </small>
              </article>

              <figure className="lab-sketch lab-sketch--knitter" aria-hidden="true">
                <span className="lab-sketch-knitter-head" />
                <span className="lab-sketch-knitter-body" />
                <span className="lab-sketch-knitter-thread" />
              </figure>

              <article className="lab-storyline-copy lab-storyline-copy--final">
                <p>
                  Pero la idea no es convertirte en un gurú de las redes sociales. Es aprender a crear desde lo que ya tienes:
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
                  <h2>
                    El Storytelling Lab nació justamente para eso. No como un curso de marketing tradicional ni una colección de fórmulas genéricas para "hacer contenido para el algoritmo".
                  </h2>
                  <p>
                    Es un espacio práctico y humano donde aprendes a ordenar tus ideas y convertirlas en contenido que se sienta TUYO. Vas a encontrar una ruta concreta y herramientas prácticas para que tus ideas dejen de dar vueltas en tu cabeza y empiecen a convertirse en contenido.
                  </p>
                  <a className="lab-method-cta cta-button" href="#/storytelling-lab">
                    Únete al Storytelling Lab
                  </a>
                </div>
              </div>
            </section>

            <section className="lab-includes" ref={includesSectionRef}>
              <div className="lab-includes-inner content-shell">
                <div className="lab-feature-grid">
                  {FEATURES.map((feature) => (
                    <article key={feature.title} className="lab-include-card surface-card">
                      <div className="lab-include-copy">
                        <span>{feature.label}</span>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                      </div>
                      <LabFeatureIllustration type={feature.illustration} />
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <section className="lab-map">
            <div className="lab-map-inner content-shell">
              <div className="lab-map-copy" ref={mapCopyRef}>
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

              <div className="lab-map-stack" ref={mapStackRef} aria-label="Componentes del Mapa Narrativo">
                <svg ref={mapLineSvgRef} className="lab-map-thread" preserveAspectRatio="none" aria-hidden="true">
                  <path ref={mapLinePathRef} />
                </svg>
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

          <section className="lab-fit">
            <div className="lab-fit-inner content-shell">
              <div className="lab-fit-copy">
                <h2>
                  ¿Pero cómo sé si el Storytelling Lab es para mi?
                </h2>
                <div className="lab-fit-pills pill-cluster" aria-label="Tipos de negocios">
                  {LAB_FIT_CONTENT.map((fit, index) => (
                    <button
                      className={selectedFitIndex === index ? "is-highlighted" : ""}
                      key={fit.label}
                      type="button"
                      aria-pressed={selectedFitIndex === index}
                      onClick={() => handleFitSelect(index)}
                    >
                      {fit.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="lab-fit-card-wrap">
                <article className={`lab-fit-card surface-card${isFitCardVisible ? "" : " is-fading"}`}>
                  <div>
                    <h3>{selectedFit.title}</h3>
                    <p>{selectedFit.description}</p>
                  </div>
                  <figure className="lab-fit-illustration" aria-hidden="true">
                    <span />
                  </figure>
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
                <path d="M190 46C250 38 334 38 386 69C431 96 429 132 397 152" />
                <path d="M185 130C122 131 72 138 64 170C58 194 80 206 103 210" />
                <path d="M125 232C161 270 247 287 307 266C363 247 354 193 294 192C229 190 203 236 214 286C221 317 232 336 250 352" />
              </svg>
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
                    <ChevronIcon className="lab-curriculum-chevron" />
                  </button>

                  <div
                    className="lab-curriculum-panel"
                    id={`course-module-${index}`}
                    hidden={openModuleIndex !== index}
                  >
                    <div className="lab-curriculum-panel-inner">
                      <ul>
                        {module.lessons.map((lesson) => (
                          <li key={lesson}>{lesson}</li>
                        ))}
                      </ul>
                    </div>
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
                <h2>Dos formas de entrar al Lab</h2>
              </div>

              <div className="lab-price-tabs" aria-label="Opciones de pago">
                {PAYMENT_PLANS.map((plan, index) => (
                  <button
                    className={selectedPaymentIndex === index ? "is-active" : ""}
                    type="button"
                    aria-pressed={selectedPaymentIndex === index}
                    key={plan.label}
                    onClick={() => setSelectedPaymentIndex(index)}
                  >
                    {plan.label}
                  </button>
                ))}
              </div>

              <article className="lab-price-offer">
                <div className="lab-price-copy">
                  <h3>Todo lo que incluye</h3>
                  <ul>
                    {PAYMENT_INCLUDES.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <div className="lab-price-summary">
                    <p className="lab-price-installments">{selectedPaymentPlan.eyebrow}</p>
                    <p className="lab-price-amount">
                      <span>{selectedPaymentPlan.amount}</span> <small>{selectedPaymentPlan.suffix}</small>
                    </p>
                    <p className="lab-price-badge">{selectedPaymentPlan.badge}</p>
                  </div>

                  <a href="#/storytelling-lab" className="lab-price-cta cta-button">
                    Únete al Storytelling Lab
                  </a>

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

                <figure className="lab-price-illustration" aria-hidden="true">
                  <span />
                </figure>
              </article>
            </div>
          </section>

          <section className="lab-faq">
            <div className="lab-faq-panel">
              <div className="lab-faq-copy">
                <h2>Tengo algunas preguntas...</h2>
                <p>
                  Estas son algunas de las preguntas más comunes que me llegan antes de que alguien entre al Lab.
                </p>
                <p>
                  Y si todavía no estás segura o tienes alguna otra pregunta, escríbeme!
                </p>
                <a href="mailto:hola@socialsbycaro.com" className="lab-faq-cta cta-button">
                  Escríbeme!
                </a>
              </div>

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
                      <span className="lab-faq-symbol" aria-hidden="true">
                        {openFaqIndex === index ? "−" : "+"}
                      </span>
                    </button>
                    <div
                      className="lab-faq-answer"
                      id={`faq-answer-${index}`}
                      hidden={openFaqIndex !== index}
                    >
                      <div className="lab-faq-answer-inner">
                        <p>
                          Placeholder: aquí irá una respuesta clara y breve para esta pregunta.
                          La idea es resolver la duda sin sonar técnica ni prometer de más.
                        </p>
                      </div>
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
