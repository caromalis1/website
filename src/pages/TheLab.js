import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
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
    title: "Tu narrativa visual",
    label: "Identidad estética",
    illustration: "visual",
    description: "Tu contenido se ve antes de que lo lean. Este módulo te ayuda a que lo visual y lo escrito cuenten la misma historia."
  }
];

const LAB_ILLUSTRATION_IMAGES = {
  map: "/img/4-SL-Tu%20Mapa%20Narrativo.png",
  workbook: "/img/5-SL-El%20Storytelling%20Lab%20Workbook.png",
  templates: "/img/6-SL-Plantillas%2C%20ejemplos%20e%20ideas.png",
  modules: "/img/7-SL-6%20mo%CC%81dulos%2C%2020%20lecciones.png",
  visual: "/img/8-SL-Tu%20narrativa%20visual.png",
  fit: "/img/10-servicios.png",
  price: "/img/9-productos.png"
};

const NARRATIVE_MAP_STEPS = [
  {
    title: "Tu protagonista",
    description: "Quién es tu audiencia y qué desea"
  },
  {
    title: "Sus obstáculos",
    description: "Qué le frena por fuera y por dentro"
  },
  {
    title: "La Brújula",
    description: "tu historia de origen y tu rol en la historia de tu audiencia"
  },
  {
    title: "La Ruta",
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
    image: "/img/10-servicios.png",
    description: "Si ofreces un servicio, probablemente sabes que el reto no es solo decir “esto hago”. También es mostrar tu proceso, tu criterio y qué hace distinto tu enfoque. El Storytelling Lab te ayuda a convertir todo eso en contenido más claro, más humano y mucho más fácil de sostener."
  },
  {
    label: "Productos",
    title: "Para marcas de productos",
    image: "/img/9-productos.png",
    description: "Convierte detalles, usos, materiales y momentos cotidianos en historias simples que ayuden a entender por qué tu producto importa y cómo entra en la vida de tus clientes."
  },
  {
    label: "Marcas personales",
    title: "Para marcas personales",
    image: "/img/11-marcas%20personales.png",
    description: "Ordena tus ideas, tu experiencia y tu punto de vista para que tu contenido tenga una voz reconocible, sin depender de tendencias que no se sienten tuyas."
  },
  {
    label: "Negocios locales",
    title: "Para negocios locales",
    image: "/img/12-Negocios%20locales.png",
    description: "Cuenta lo que pasa detrás de tu negocio, muestra tus diferencias y convierte la experiencia diaria de tu marca en contenido cercano."
  },
  {
    label: "Educadoras",
    title: "Para educadoras y mentoras",
    image: "/img/13-Educadoras.png",
    description: "Transforma conceptos, ejemplos y frameworks en piezas narrativas, claras y fáciles de seguir, para que enseñar no se sienta como repetir lo mismo de mil formas."
  },
  {
    label: "Negocios creativos",
    title: "Para negocios creativos",
    image: "/img/14-Negocios%20creativos.png",
    description: "Dale estructura a tus ideas sin quitarles personalidad, y convierte inspiración, referencias y procesos en contenido publicable."
  }
];

const TESTIMONIALS = [
  {
    quote: "Por fin pude explicar lo que hago sin sentir que estaba copiando una fórmula ajena.",
    name: "Camila R.",
    role: "Diseñadora de marca",
    avatar: "/img/15-Testimonials-1.png"
  },
  {
    quote: "El mapa narrativo me ordenó la cabeza. Ahora sé desde dónde escribir cada pieza de contenido.",
    name: "Valentina M.",
    role: "Mentora creativa",
    avatar: "/img/15-Testimonials-2.png"
  },
  {
    quote: "Dejé de publicar por cumplir. Mis captions volvieron a sonar como yo.",
    name: "Paula S.",
    role: "Fotógrafa",
    avatar: "/img/15-Testimonials-3.png"
  },
  {
    quote: "Me ayudó a convertir ideas sueltas en una narrativa clara para mi lanzamiento.",
    name: "Mariana F.",
    role: "Consultora",
    avatar: "/img/15-Testimonials-4.png"
  },
  {
    quote: "Nunca había sentido que un curso de contenido entendiera tan bien mi manera de trabajar.",
    name: "Daniela L.",
    role: "Ceramista",
    avatar: "/img/15-Testimonials-5.png"
  },
  {
    quote: "Volví a mirar mi historia como una herramienta, no como algo que tenía que esconder.",
    name: "Sofía G.",
    role: "Psicóloga",
    avatar: "/img/15-Testimonials-6.png"
  },
  {
    quote: "Reescribí todo mi calendario en una tarde. Se sintió más humano y mucho más sostenible.",
    name: "D. Mejía",
    role: "Fundadora",
    avatar: "/img/15-Testimonials-7.png"
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
  "No tengo un perrito (pero quiero uno)",
  "Siempre llego temprano a todo",
  "Soy fan de las flores y plantas"
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
// Storyline thread coordinates use SPIRAL_VIEWBOX. Keep the final point aligned
// with the first word-field segment so the long thread hands off into "Tu historia".
const SPIRAL_PATH_D =
  "M631 -24C902 56 933 164 913 316C906 377 840 558 763 567C504 666 99 549 114 942C130 1136 208 1409 429 1376C457 1376 776 1297 819 1431C768 1461 172 989 900 1584";
const CURRICULUM_LEFT_PATH_D =
  "M0 132C72 140 92 142 128 126C170 108 178 72 158 58C138 44 112 60 120 91C130 131 192 136 254 124C336 108 394 84 506 78C626 72 608 120 675 126";
const CURRICULUM_RIGHT_PATH_D =
  "M93 132C202 137 408 66 285 58C211 47 222 116 304 143C412 178 538 154 580 103C604 75 586 54 572 72C556 94 576 148 660 196C740 242 820 224 880 224";
const SPIRAL_SCROLL = {
  start: "top 44%",
  travelHeightScale: 0.58,
  minTravelHeightScale: 1.72,
  scrub: 0.35
};
const STORYLINE_WORD_SCROLL = {
  start: "top 64%",
  segmentDuration: 0.34,
  exitDuration: 0.44,
  stagger: 0.18
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

  const [protagonist, obstacles, compass, route, bet] = points;
  const leftEdge = { x: -8, y: protagonist.y + 2 };
  const rightEdge = { x: width + 8, y: bet.y - 82 };
  const format = (value) => value.toFixed(1);
  const loopRadius = 36;
  const loopTop = {
    x: Math.min(route.x - 88, compass.x + Math.max(142, (route.x - compass.x) * 0.68)),
    y: Math.max(34, Math.min(compass.y, route.y) + 26)
  };
  const loopCenterY = loopTop.y + loopRadius;
  const loopKappa = loopRadius * 0.5523;

  return [
    `M${format(leftEdge.x)} ${format(leftEdge.y)}`,
    `C${format(protagonist.x - 210)} ${format(protagonist.y - 32)} ${format(protagonist.x - 88)} ${format(protagonist.y - 34)} ${format(protagonist.x)} ${format(protagonist.y)}`,
    `C${format(protagonist.x + 128)} ${format(protagonist.y)} ${format(obstacles.x - 158)} ${format(obstacles.y)} ${format(obstacles.x)} ${format(obstacles.y)}`,
    `C${format(obstacles.x + 132)} ${format(obstacles.y)} ${format(compass.x - 142)} ${format(compass.y)} ${format(compass.x)} ${format(compass.y)}`,
    `C${format(compass.x + 80)} ${format(compass.y)} ${format(loopTop.x - 86)} ${format(loopTop.y)} ${format(loopTop.x)} ${format(loopTop.y)}`,
    `C${format(loopTop.x + loopKappa)} ${format(loopTop.y)} ${format(loopTop.x + loopRadius)} ${format(loopCenterY - loopKappa)} ${format(loopTop.x + loopRadius)} ${format(loopCenterY)}`,
    `C${format(loopTop.x + loopRadius)} ${format(loopCenterY + loopKappa)} ${format(loopTop.x + loopKappa)} ${format(loopCenterY + loopRadius)} ${format(loopTop.x)} ${format(loopCenterY + loopRadius)}`,
    `C${format(loopTop.x - loopKappa)} ${format(loopCenterY + loopRadius)} ${format(loopTop.x - loopRadius)} ${format(loopCenterY + loopKappa)} ${format(loopTop.x - loopRadius)} ${format(loopCenterY)}`,
    `C${format(loopTop.x - loopRadius)} ${format(loopCenterY - loopKappa)} ${format(loopTop.x - loopKappa)} ${format(loopTop.y)} ${format(loopTop.x)} ${format(loopTop.y)}`,
    `C${format(loopTop.x + 72)} ${format(loopTop.y)} ${format(route.x - 94)} ${format(route.y - 4)} ${format(route.x)} ${format(route.y)}`,
    `C${format(route.x + 132)} ${format(route.y + 8)} ${format(bet.x - 156)} ${format(bet.y - 2)} ${format(bet.x)} ${format(bet.y)}`,
    `C${format(bet.x + 122)} ${format(bet.y + 4)} ${format(rightEdge.x - 210)} ${format(rightEdge.y - 10)} ${format(rightEdge.x)} ${format(rightEdge.y)}`
  ].join("");
}

const STORYLINE_WORD_LINE_COMMANDS = [
  [
    { type: "M", x: 1324, y: -264 },
    { type: "C", x1: 1695, y1: 412, x2: 1326, y2: 677, x: 1245, y: 603 }
  ],
  [
    { type: "M", x: 1178, y: 534 },
    { type: "C", x1: 1118, y1: 433, x2: 1262, y2: -149, x: 1050, y: 68 }
  ],
  [
    { type: "M", x: 985, y: 141 },
    { type: "C", x1: 970, y1: 200, x2: 873, y2: 243, x: 817, y: 186 },
    { type: "C", x1: 768, y1: 87, x2: 920, y2: 172, x: 907, y: 255 }
  ],
  [
    { type: "M", x: 923, y: 325 },
    { type: "C", x1: 1071, y1: 705, x2: 594, y2: 714, x: 632, y: 550 }
  ],
  [
    { type: "M", x: 629, y: 451 },
    { type: "C", x1: 700, y1: 262, x2: 655, y2: -63, x: 493, y: 138 }
  ],
  [
    { type: "M", x: 466, y: 241 },
    { type: "C", x1: 543, y1: 410, x2: 386, y2: 619, x: 309, y: 439 }
  ],
  [
    { type: "M", x: 245, y: 370 },
    { type: "C", x1: 204, y1: 237, x2: 41, y2: 473, x: -280, y: 450 }
  ]
];

const STORYLINE_WORD_ANCHOR_POINTS = {
  M: [{ id: "end", label: "point", keys: ["x", "y"] }],
  C: [
    { id: "control-1", label: "control", keys: ["x1", "y1"] },
    { id: "control-2", label: "control", keys: ["x2", "y2"] },
    { id: "end", label: "point", keys: ["x", "y"] }
  ]
};

function cloneStorylineWordLineCommands(commands) {
  return commands.map((line) => line.map((command) => ({ ...command })));
}

function buildStorylineWordLinePath(commands) {
  return commands
    .map((command) => {
      if (command.type === "M") {
        return `M${command.x} ${command.y}`;
      }

      return `C${command.x1} ${command.y1} ${command.x2} ${command.y2} ${command.x} ${command.y}`;
    })
    .join("");
}

function parseEditablePathData(pathData) {
  const tokens = pathData.match(/[MC]|-?\d*\.?\d+/g) || [];
  const commands = [];

  for (let index = 0; index < tokens.length;) {
    const type = tokens[index];
    index += 1;

    if (type === "M") {
      commands.push({
        type,
        x: Number(tokens[index]),
        y: Number(tokens[index + 1])
      });
      index += 2;
      continue;
    }

    if (type === "C") {
      commands.push({
        type,
        x1: Number(tokens[index]),
        y1: Number(tokens[index + 1]),
        x2: Number(tokens[index + 2]),
        y2: Number(tokens[index + 3]),
        x: Number(tokens[index + 4]),
        y: Number(tokens[index + 5])
      });
      index += 6;
      continue;
    }

    break;
  }

  return commands;
}

function updateEditableLineCommand(commands, commandIndex, keys, x, y) {
  return commands.map((command, index) => {
    if (index !== commandIndex) {
      return command;
    }

    return {
      ...command,
      [keys[0]]: x,
      [keys[1]]: y
    };
  });
}

function updateEditableGroupedLineCommand(commands, lineIndex, commandIndex, keys, x, y) {
  return commands.map((line, index) => {
    if (index !== lineIndex) {
      return line;
    }

    return updateEditableLineCommand(line, commandIndex, keys, x, y);
  });
}

function findNearestEditableCommandIndex(commands, x, y) {
  return commands.reduce((nearestIndex, command, commandIndex) => {
    const nearest = commands[nearestIndex];
    const nearestDistance = Math.hypot(nearest.x - x, nearest.y - y);
    const commandDistance = Math.hypot(command.x - x, command.y - y);

    return commandDistance < nearestDistance ? commandIndex : nearestIndex;
  }, 0);
}

function insertEditableLineCommand(commands, commandIndex, x, y) {
  const safeIndex = Math.max(0, Math.min(commandIndex, commands.length - 1));
  const start = commands[safeIndex];
  const nextCommand = {
    type: "C",
    x1: Math.round(start.x + (x - start.x) * 0.35),
    y1: Math.round(start.y + (y - start.y) * 0.35),
    x2: Math.round(start.x + (x - start.x) * 0.72),
    y2: Math.round(start.y + (y - start.y) * 0.72),
    x: Math.round(x),
    y: Math.round(y)
  };

  return [
    ...commands.slice(0, safeIndex + 1),
    nextCommand,
    ...commands.slice(safeIndex + 1)
  ];
}

function deleteEditableLineCommand(commands, commandIndex) {
  if (commands[commandIndex]?.type !== "C") {
    return commands;
  }

  return commands.filter((_, index) => index !== commandIndex);
}

function updateEditableGroupedLines(commands, lineIndex, updater) {
  return commands.map((line, index) => (index === lineIndex ? updater(line) : line));
}

function getStorylineEditorEnabled() {
  if (typeof window === "undefined") {
    return false;
  }

  const params = new URLSearchParams(window.location.search);
  return params.get("editStoryline") === "1" || window.localStorage.getItem("storylineWordEdit") === "1";
}

function ChevronIcon({ className }) {
  return (
    <svg className={`${className} ui-chevron`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.5 9.5L12 15l5.5-5.5" />
    </svg>
  );
}

function CurriculumMetaIcon({ type }) {
  if (type === "book") {
    return (
      <svg className="lab-curriculum-meta-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.5 5.5h6.25c1.25 0 2.25 1 2.25 2.25v10.75c0-1.15-.95-2.1-2.1-2.1H4.5V5.5Z" />
        <path d="M19.5 5.5h-6.25C12 5.5 11 6.5 11 7.75v10.75c0-1.15.95-2.1 2.1-2.1h6.4V5.5Z" />
      </svg>
    );
  }

  return (
    <svg className="lab-curriculum-meta-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="7" width="12" height="10" rx="2" />
      <path d="M15.5 10.25 20.5 7.5v9l-5-2.75" />
    </svg>
  );
}

function LabFeatureIllustration({ type }) {
  return (
    <figure className={`lab-include-illustration lab-include-illustration--${type}`} aria-hidden="true">
      <img src={LAB_ILLUSTRATION_IMAGES[type]} alt="" loading="lazy" />
    </figure>
  );
}

export default function TheLab() {
  const [openModuleIndex, setOpenModuleIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);
  const [selectedFitIndex, setSelectedFitIndex] = useState(0);
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState(0);
  const [isFitCardVisible, setIsFitCardVisible] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isStorylineEditorOpen] = useState(getStorylineEditorEnabled);
  const [spiralLineCommands, setSpiralLineCommands] = useState(() =>
    parseEditablePathData(SPIRAL_PATH_D)
  );
  const [curriculumLeftLineCommands, setCurriculumLeftLineCommands] = useState(() =>
    parseEditablePathData(CURRICULUM_LEFT_PATH_D)
  );
  const [curriculumRightLineCommands, setCurriculumRightLineCommands] = useState(() =>
    parseEditablePathData(CURRICULUM_RIGHT_PATH_D)
  );
  const [storylineWordLineCommands, setStorylineWordLineCommands] = useState(() =>
    cloneStorylineWordLineCommands(STORYLINE_WORD_LINE_COMMANDS)
  );
  const [selectedStorylineNode, setSelectedStorylineNode] = useState(null);
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
  const curriculumTitleRef = useRef(null);
  const curriculumLeftPathRef = useRef(null);
  const curriculumRightPathRef = useRef(null);
  const storylineWordLinesRef = useRef(null);
  const depthStickyCtaRef = useRef(null);

  const motionTweenRef = useRef(null);
  const mapLineTweenRef = useRef(null);
  const curriculumLineTweenRef = useRef(null);
  const storylineWordLineTweenRef = useRef(null);
  const depthPinRef = useRef(null);
  const includeCardPinsRef = useRef([]);
  const includeStackTweensRef = useRef([]);
  const depthStickyCtaPinRef = useRef(null);
  const mapCopyPinRef = useRef(null);
  const mapCardPinsRef = useRef([]);
  const fitFadeTimeoutRef = useRef(null);
  const smootherRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const resizeRafRef = useRef(0);
  const storylineWordDragRef = useRef(null);
  const storylineTouchRef = useRef(null);

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
        const isEditing = spiralSvgRef.current?.dataset.editing === "true";

        if (!spiralSection || !pathElement) {
          return;
        }

        const svg = spiralSvgRef.current;
        if (svg) {
          svg.setAttribute("viewBox", `0 0 ${SPIRAL_VIEWBOX.width} ${SPIRAL_VIEWBOX.height}`);
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
          strokeDashoffset: canAnimateSpiral() && !isEditing ? totalLength : 0
        });

        if (!canAnimateSpiral() || isEditing) {
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

      const updateIncludeStackPins = () => {
        const includesSection = includesSectionRef.current;
        const stickyCta = depthStickyCtaRef.current;
        const includeCards = Array.from(includesSection?.querySelectorAll(".lab-include-card") || []);

        includeCardPinsRef.current.forEach((trigger) => trigger.kill());
        includeCardPinsRef.current = [];
        includeStackTweensRef.current.forEach((tween) => {
          tween.scrollTrigger?.kill();
          tween.kill();
        });
        includeStackTweensRef.current = [];

        if (depthStickyCtaPinRef.current) {
          depthStickyCtaPinRef.current.kill();
          depthStickyCtaPinRef.current = null;
        }

        includeCards.forEach((card) => {
          gsap.set(card, { clearProps: "position,top,left,width,maxWidth,zIndex,transform,opacity,visibility,scale" });
        });

        if (stickyCta) {
          gsap.set(stickyCta, { clearProps: "all" });
        }

        if (!includesSection || includeCards.length === 0 || window.innerWidth <= 760) {
          return;
        }

        const cardPinTop = Math.max(150, Math.round(window.innerHeight * 0.16));

        includeCards.forEach((card, index) => {
          gsap.set(card, { zIndex: index + 1 });

          includeCardPinsRef.current.push(
            ScrollTrigger.create({
              trigger: card,
              start: () => `top ${cardPinTop}`,
              endTrigger: includesSection,
              end: () => `bottom ${cardPinTop + card.offsetHeight}`,
              pin: true,
              pinSpacing: false,
              anticipatePin: 1,
              invalidateOnRefresh: true
            })
          );

          if (index < includeCards.length - 1) {
            includeStackTweensRef.current.push(
              gsap.to(card, {
                autoAlpha: 0,
                scale: 0.985,
                ease: "none",
                scrollTrigger: {
                  trigger: includeCards[index + 1],
                  start: () => `top ${cardPinTop + 320}`,
                  end: () => `top ${cardPinTop + 24}`,
                  scrub: true,
                  invalidateOnRefresh: true
                }
              })
            );
          }
        });

        if (stickyCta) {
          depthStickyCtaPinRef.current = ScrollTrigger.create({
            trigger: stickyCta,
            start: "top 88px",
            endTrigger: depthStackRef.current,
            end: "bottom top",
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true
          });
        }
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

      const updateCurriculumLines = () => {
        const titleElement = curriculumTitleRef.current;
        const linePaths = [
          curriculumLeftPathRef.current,
          curriculumRightPathRef.current
        ].filter(Boolean);
        const isEditing = titleElement?.dataset.editing === "true";

        if (curriculumLineTweenRef.current) {
          curriculumLineTweenRef.current.scrollTrigger?.kill();
          curriculumLineTweenRef.current.kill();
          curriculumLineTweenRef.current = null;
        }

        if (!titleElement || linePaths.length < 2) {
          return;
        }

        linePaths.forEach((pathElement) => {
          const pathLength = pathElement.getTotalLength();

          gsap.set(pathElement, {
            strokeDasharray: pathLength,
            strokeDashoffset: canAnimateSpiral() && !isEditing ? pathLength : 0
          });
        });

        if (!canAnimateSpiral() || isEditing) {
          return;
        }

        curriculumLineTweenRef.current = gsap.timeline({
          scrollTrigger: {
            trigger: titleElement,
            start: "top 78%",
            end: "bottom 42%",
            scrub: 0.8,
            invalidateOnRefresh: true
          }
        });

        curriculumLineTweenRef.current
          .to(linePaths[0], {
            strokeDashoffset: 0,
            duration: 0.58,
            ease: "none"
          }, 0)
          .to(linePaths[1], {
            strokeDashoffset: 0,
            duration: 0.58,
            ease: "none"
          }, 0.42);
      };

      const updateStorylineWordLines = () => {
        const svgElement = storylineWordLinesRef.current;
        const linePaths = Array.from(svgElement?.querySelectorAll("path") || []);
        const isEditing = svgElement?.dataset.editing === "true";

        if (storylineWordLineTweenRef.current) {
          storylineWordLineTweenRef.current.scrollTrigger?.kill();
          storylineWordLineTweenRef.current.kill();
          storylineWordLineTweenRef.current = null;
        }

        if (!svgElement || linePaths.length === 0) {
          return;
        }

        linePaths.forEach((pathElement) => {
          const pathLength = pathElement.getTotalLength();

          gsap.set(pathElement, {
            strokeDasharray: pathLength,
            strokeDashoffset: canAnimateSpiral() && !isEditing ? pathLength : 0
          });
        });

        if (!canAnimateSpiral() || isEditing) {
          return;
        }

        const triggerElement = svgElement.closest(".lab-storyline-panel--final") || svgElement;

        const lineTimeline = gsap.timeline({ paused: true });

        linePaths.forEach((pathElement, index) => {
          lineTimeline.to(pathElement, {
            strokeDashoffset: 0,
            duration: index === linePaths.length - 1
              ? STORYLINE_WORD_SCROLL.exitDuration
              : STORYLINE_WORD_SCROLL.segmentDuration,
            ease: "none"
          }, index * STORYLINE_WORD_SCROLL.stagger);
        });

        const lineTrigger = ScrollTrigger.create({
          trigger: triggerElement,
          start: STORYLINE_WORD_SCROLL.start,
          invalidateOnRefresh: true,
          onEnter: () => lineTimeline.restart(),
          onEnterBack: () => lineTimeline.restart(),
          onLeaveBack: () => lineTimeline.pause(0)
        });

        storylineWordLineTweenRef.current = {
          scrollTrigger: lineTrigger,
          kill: () => lineTimeline.kill()
        };

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();

          const triggerRect = triggerElement.getBoundingClientRect();
          const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
          const isPanelVisible =
            triggerRect.top < viewportHeight * 0.72 &&
            triggerRect.bottom > viewportHeight * 0.28;

          if (isPanelVisible) {
            lineTimeline.restart();
          }
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
          updateIncludeStackPins();
          updateMapCardPins();
          updateMapLine();
          updateCurriculumLines();
          updateStorylineWordLines();
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

      if (curriculumTitleRef.current) {
        resizeObserver.observe(curriculumTitleRef.current);
      }

      if (storylineWordLinesRef.current) {
        resizeObserver.observe(storylineWordLinesRef.current);
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

        includeCardPinsRef.current.forEach((trigger) => trigger.kill());
        includeCardPinsRef.current = [];

        includeStackTweensRef.current.forEach((tween) => {
          tween.scrollTrigger?.kill();
          tween.kill();
        });
        includeStackTweensRef.current = [];

        if (depthStickyCtaPinRef.current) {
          depthStickyCtaPinRef.current.kill();
          depthStickyCtaPinRef.current = null;
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

        if (curriculumLineTweenRef.current) {
          curriculumLineTweenRef.current.scrollTrigger?.kill();
          curriculumLineTweenRef.current.kill();
          curriculumLineTweenRef.current = null;
        }

        if (storylineWordLineTweenRef.current) {
          storylineWordLineTweenRef.current.scrollTrigger?.kill();
          storylineWordLineTweenRef.current.kill();
          storylineWordLineTweenRef.current = null;
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

  useEffect(() => {
    if (!isPaymentModalOpen) {
      return undefined;
    }

    const smoother = smootherRef.current;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousOverflow = document.body.style.overflow;

    if (smoother?.paused) {
      smoother.paused(true);
    }

    document.documentElement.classList.add("lab-modal-open");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsPaymentModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.classList.remove("lab-modal-open");
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);

      if (smoother?.paused) {
        smoother.paused(false);
      }
    };
  }, [isPaymentModalOpen]);

  useEffect(() => {
    document.documentElement.classList.add("lab-storyline-snap");

    const mobileMatch = window.matchMedia("(max-width: 900px)");

    const getStorylinePanels = () => (
      Array.from(document.querySelectorAll(".lab-storyline-panel"))
    );

    const scrollToStorylinePanel = (panel) => {
      if (smootherRef.current?.scrollTo) {
        smootherRef.current.scrollTo(panel, true, "top top");
        return;
      }

      window.scrollTo({
        top: panel.getBoundingClientRect().top + window.scrollY,
        behavior: "smooth"
      });
    };

    const getNearestPanelIndex = (panels, scrollTop) => {
      const viewportCenter = scrollTop + window.innerHeight / 2;

      return panels.reduce((nearestIndex, panel, index) => {
        const panelTop = panel.getBoundingClientRect().top + window.scrollY;
        const panelCenter = panelTop + panel.getBoundingClientRect().height / 2;
        const nearestPanel = panels[nearestIndex];
        const nearestTop = nearestPanel.getBoundingClientRect().top + window.scrollY;
        const nearestCenter = nearestTop + nearestPanel.getBoundingClientRect().height / 2;

        return Math.abs(panelCenter - viewportCenter) < Math.abs(nearestCenter - viewportCenter)
          ? index
          : nearestIndex;
      }, 0);
    };

    const handleTouchStart = (event) => {
      const target = event.target instanceof Element ? event.target : null;

      if (!mobileMatch.matches || !target?.closest(".lab-storyline")) {
        storylineTouchRef.current = null;
        return;
      }

      storylineTouchRef.current = {
        y: event.touches[0]?.clientY ?? 0,
        scrollY: window.scrollY
      };
    };

    const handleTouchEnd = (event) => {
      const touchStart = storylineTouchRef.current;
      storylineTouchRef.current = null;

      if (!mobileMatch.matches || !touchStart) {
        return;
      }

      const endY = event.changedTouches[0]?.clientY ?? touchStart.y;
      const deltaY = touchStart.y - endY;

      if (Math.abs(deltaY) < 42) {
        return;
      }

      const panels = getStorylinePanels();
      if (!panels.length) {
        return;
      }

      const currentIndex = getNearestPanelIndex(panels, touchStart.scrollY);
      const targetIndex = Math.max(0, Math.min(
        panels.length - 1,
        currentIndex + (deltaY > 0 ? 1 : -1)
      ));

      if (targetIndex === currentIndex) {
        return;
      }

      scrollToStorylinePanel(panels[targetIndex]);
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.documentElement.classList.remove("lab-storyline-snap");
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    if (!isStorylineEditorOpen) {
      return undefined;
    }

    const updateDraggedPoint = (event) => {
      const drag = storylineWordDragRef.current;
      const svgElement = drag?.svgElement;

      if (!drag || !svgElement) {
        return;
      }

      const svgMatrix = svgElement.getScreenCTM();

      if (!svgMatrix) {
        return;
      }

      const point = svgElement.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      const svgPoint = point.matrixTransform(svgMatrix.inverse());
      const nextX = Math.round(svgPoint.x);
      const nextY = Math.round(svgPoint.y);

      if (drag.group === "spiral") {
        setSpiralLineCommands((currentCommands) =>
          updateEditableLineCommand(currentCommands, drag.commandIndex, drag.keys, nextX, nextY)
        );
        return;
      }

      if (drag.group === "curriculumLeft") {
        setCurriculumLeftLineCommands((currentCommands) =>
          updateEditableLineCommand(currentCommands, drag.commandIndex, drag.keys, nextX, nextY)
        );
        return;
      }

      if (drag.group === "curriculumRight") {
        setCurriculumRightLineCommands((currentCommands) =>
          updateEditableLineCommand(currentCommands, drag.commandIndex, drag.keys, nextX, nextY)
        );
        return;
      }

      setStorylineWordLineCommands((currentCommands) =>
        updateEditableGroupedLineCommand(currentCommands, drag.lineIndex, drag.commandIndex, drag.keys, nextX, nextY)
      );
    };

    const stopDragging = () => {
      storylineWordDragRef.current = null;

      if (smootherRef.current?.paused) {
        smootherRef.current.paused(false);
      }
    };

    window.addEventListener("pointermove", updateDraggedPoint);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);

    return () => {
      window.removeEventListener("pointermove", updateDraggedPoint);
      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
    };
  }, [isStorylineEditorOpen]);

  useEffect(() => {
    if (!isStorylineEditorOpen) {
      return;
    }

    const animationFrame = requestAnimationFrame(() => {
      const linePaths = [
        spiralPathRef.current,
        curriculumLeftPathRef.current,
        curriculumRightPathRef.current,
        ...Array.from(storylineWordLinesRef.current?.querySelectorAll("path") || [])
      ].filter(Boolean);

      linePaths.forEach((pathElement) => {
        const pathLength = pathElement.getTotalLength();
        pathElement.style.strokeDasharray = `${pathLength}`;
        pathElement.style.strokeDashoffset = "0";
      });
    });

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [
    isStorylineEditorOpen,
    spiralLineCommands,
    curriculumLeftLineCommands,
    curriculumRightLineCommands,
    storylineWordLineCommands
  ]);

  const selectedFit = LAB_FIT_CONTENT[selectedFitIndex];
  const selectedPaymentPlan = PAYMENT_PLANS[selectedPaymentIndex];
  const storylineEditorJson = JSON.stringify({
    spiral: spiralLineCommands,
    storylineWords: storylineWordLineCommands,
    curriculumLeft: curriculumLeftLineCommands,
    curriculumRight: curriculumRightLineCommands
  }, null, 2);
  const selectedStorylineCommands = selectedStorylineNode?.group === "spiral"
    ? spiralLineCommands
    : selectedStorylineNode?.group === "curriculumLeft"
      ? curriculumLeftLineCommands
      : selectedStorylineNode?.group === "curriculumRight"
        ? curriculumRightLineCommands
        : selectedStorylineNode?.group === "storylineWords"
          ? storylineWordLineCommands[selectedStorylineNode.lineIndex]
          : null;
  const selectedStorylineCommand = selectedStorylineCommands?.[selectedStorylineNode?.commandIndex];
  const canDeleteSelectedStorylineNode = selectedStorylineCommand?.type === "C";

  const getEditableSvgPoint = (event, svgElement) => {
    const svgMatrix = svgElement?.getScreenCTM();

    if (!svgMatrix || !svgElement) {
      return null;
    }

    const point = svgElement.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    return point.matrixTransform(svgMatrix.inverse());
  };

  const updateEditableLineGroup = useCallback((group, lineIndex, updater) => {
    if (group === "spiral") {
      setSpiralLineCommands(updater);
      return;
    }

    if (group === "curriculumLeft") {
      setCurriculumLeftLineCommands(updater);
      return;
    }

    if (group === "curriculumRight") {
      setCurriculumRightLineCommands(updater);
      return;
    }

    setStorylineWordLineCommands((currentCommands) =>
      updateEditableGroupedLines(currentCommands, lineIndex, updater)
    );
  }, []);

  const handleStorylineAnchorPointerDown = (event, group, lineIndex, commandIndex, keys) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setSelectedStorylineNode({ group, lineIndex, commandIndex });

    if (smootherRef.current?.paused) {
      smootherRef.current.paused(true);
    }

    storylineWordDragRef.current = {
      group,
      lineIndex,
      commandIndex,
      keys,
      svgElement: event.currentTarget.ownerSVGElement
    };
  };

  const handleEditablePathPointerDown = (event, group, lineIndex, commands) => {
    if (!event.altKey) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const svgPoint = getEditableSvgPoint(event, event.currentTarget.ownerSVGElement);

    if (!svgPoint) {
      return;
    }

    const x = Math.round(svgPoint.x);
    const y = Math.round(svgPoint.y);
    const commandIndex = findNearestEditableCommandIndex(commands, x, y);

    updateEditableLineGroup(group, lineIndex, (currentCommands) =>
      insertEditableLineCommand(currentCommands, commandIndex, x, y)
    );

    setSelectedStorylineNode({ group, lineIndex, commandIndex: commandIndex + 1 });
  };

  const handleAddStorylineNode = () => {
    if (!selectedStorylineNode || !selectedStorylineCommand) {
      return;
    }

    const newX = selectedStorylineCommand.x + 80;
    const newY = selectedStorylineCommand.y;

    updateEditableLineGroup(selectedStorylineNode.group, selectedStorylineNode.lineIndex, (currentCommands) =>
      insertEditableLineCommand(currentCommands, selectedStorylineNode.commandIndex, newX, newY)
    );

    setSelectedStorylineNode({
      ...selectedStorylineNode,
      commandIndex: selectedStorylineNode.commandIndex + 1
    });
  };

  const handleDeleteStorylineNode = useCallback(() => {
    if (!selectedStorylineNode || !canDeleteSelectedStorylineNode) {
      return;
    }

    updateEditableLineGroup(selectedStorylineNode.group, selectedStorylineNode.lineIndex, (currentCommands) =>
      deleteEditableLineCommand(currentCommands, selectedStorylineNode.commandIndex)
    );

    setSelectedStorylineNode({
      ...selectedStorylineNode,
      commandIndex: Math.max(0, selectedStorylineNode.commandIndex - 1)
    });
  }, [
    canDeleteSelectedStorylineNode,
    selectedStorylineNode,
    updateEditableLineGroup
  ]);

  useEffect(() => {
    if (!isStorylineEditorOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      const tagName = event.target?.tagName?.toLowerCase();

      if (tagName === "textarea" || tagName === "input") {
        return;
      }

      if (event.key === "Delete" || event.key === "Backspace") {
        handleDeleteStorylineNode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isStorylineEditorOpen, selectedStorylineNode, canDeleteSelectedStorylineNode, handleDeleteStorylineNode]);

  const handleCopyStorylineJson = async () => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(storylineEditorJson);
      return;
    }

    window.prompt("Copy Storyline path JSON", storylineEditorJson);
  };

  const handleResetStorylineLines = () => {
    setSpiralLineCommands(parseEditablePathData(SPIRAL_PATH_D));
    setCurriculumLeftLineCommands(parseEditablePathData(CURRICULUM_LEFT_PATH_D));
    setCurriculumRightLineCommands(parseEditablePathData(CURRICULUM_RIGHT_PATH_D));
    setStorylineWordLineCommands(cloneStorylineWordLineCommands(STORYLINE_WORD_LINE_COMMANDS));
    setSelectedStorylineNode(null);
  };

  const renderEditablePathAnchors = (commands, group, lineIndex = 0) => {
    if (!isStorylineEditorOpen) {
      return null;
    }

    return (
      <g className="lab-storyline-word-anchor-group">
        {commands.flatMap((command, commandIndex) =>
          STORYLINE_WORD_ANCHOR_POINTS[command.type].map((anchor) => {
            const anchorX = command[anchor.keys[0]];
            const anchorY = command[anchor.keys[1]];

            return (
              <g key={`${group}-${lineIndex}-${commandIndex}-${anchor.id}`}>
                <circle
                  className="lab-storyline-word-anchor-hit"
                  cx={anchorX}
                  cy={anchorY}
                  r={28}
                  onPointerDown={(event) => handleStorylineAnchorPointerDown(event, group, lineIndex, commandIndex, anchor.keys)}
                />
                <circle
                  className={`lab-storyline-word-anchor lab-storyline-word-anchor--${anchor.label}${
                    selectedStorylineNode?.group === group &&
                    selectedStorylineNode?.lineIndex === lineIndex &&
                    selectedStorylineNode?.commandIndex === commandIndex
                      ? " is-selected"
                      : ""
                  }`}
                  cx={anchorX}
                  cy={anchorY}
                  r={anchor.label === "control" ? 6 : 8}
                  onPointerDown={(event) => handleStorylineAnchorPointerDown(event, group, lineIndex, commandIndex, anchor.keys)}
                />
              </g>
            );
          })
        )}
      </g>
    );
  };

  const renderStorylineEditorPanel = () => {
    if (!isStorylineEditorOpen) {
      return null;
    }

    return (
      <div className="lab-storyline-editor-panel" role="group" aria-label="Storyline path editor">
        <strong>Storyline line editor</strong>
        <p>Click a node to select it. Drag handles, Alt-click a line to add a node, or use Add/Delete below.</p>
        <div className="lab-storyline-editor-actions">
          <button type="button" onClick={handleCopyStorylineJson}>Copy SVG JSON</button>
          <button type="button" onClick={handleAddStorylineNode} disabled={!selectedStorylineNode}>Add node</button>
          <button type="button" onClick={handleDeleteStorylineNode} disabled={!canDeleteSelectedStorylineNode}>Delete node</button>
          <button type="button" onClick={handleResetStorylineLines}>Reset</button>
        </div>
        <textarea value={storylineEditorJson} readOnly aria-label="Storyline path JSON" />
      </div>
    );
  };

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
    const target = spiralSectionRef.current;

    if (!target) {
      return;
    }

    if (smootherRef.current) {
      smootherRef.current.scrollTo(target, true, "top top");
      return;
    }

    window.scrollTo({
      top: target.offsetTop,
      behavior: "smooth"
    });
  };

  const renderPaymentTabs = (labelId) => (
    <div className="lab-price-tabs" aria-label="Opciones de pago" aria-labelledby={labelId}>
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
  );

  const renderPaymentStrip = () => (
    <div className="lab-payment-strip" aria-label="Métodos de pago aceptados">
      <span className="lab-payment-method" aria-label="Visa">
        <i className="fab fa-cc-visa" aria-hidden="true" />
      </span>
      <span className="lab-payment-method" aria-label="Mastercard">
        <i className="fab fa-cc-mastercard" aria-hidden="true" />
      </span>
      <span className="lab-payment-method" aria-label="Discover">
        <i className="fab fa-cc-discover" aria-hidden="true" />
      </span>
      <span className="lab-payment-method" aria-label="American Express">
        <i className="fab fa-cc-amex" aria-hidden="true" />
      </span>
      <span className="lab-payment-method" aria-label="Apple Pay">
        <i className="fab fa-apple-pay" aria-hidden="true" />
      </span>
      <span className="lab-payment-method" aria-label="Google Pay">
        <i className="fab fa-google-pay" aria-hidden="true" />
      </span>
      <span className="lab-payment-method lab-payment-method--cash" aria-label="Cash App">
        <i className="fas fa-dollar-sign" aria-hidden="true" />
      </span>
      <span className="lab-payment-method lab-payment-method--text">affirm</span>
      <span className="lab-payment-method lab-payment-method--text">Klarna</span>
    </div>
  );

  const renderPaymentOffer = (modifier = "") => (
    <article className={`lab-price-offer${modifier}`}>
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

        <a href="/storytelling-lab" className="lab-price-cta cta-button">
          Únete al Storytelling Lab
        </a>

        {renderPaymentStrip()}
      </div>
    </article>
  );

  return (
    <>
      <SiteHeader contentFadeRgb="255, 253, 252" />
      <div className="lab-scroll-wrapper" ref={smootherWrapperRef}>
        <div className="lab-scroll-content" ref={smootherContentRef}>
          <main
            className="lab"
            style={{ "--lab-blue-gradient": `url("${process.env.PUBLIC_URL}/img/blue_gradient.png")` }}
          >

          <section
            className="home-hero"
            ref={homeHeroRef}
            style={{ "--lab-hero-art": `url("${process.env.PUBLIC_URL}/img/1-Header.png")` }}
          >
            <div className="home-hero-content">
              <h1 className="home-hero-title">
                Tu forma de ver el mundo es única. Tu contenido también debería serlo.
              </h1>
              <p className="home-hero-subtitle">
                El Storytelling Lab te ayuda a encontrar tu forma natural de comunicarte para
                que crear contenido deje de sentirse como jugar a las adivinanzas.
              </p>
              <div className="home-hero-actions">
                <button
                  className="home-hero-cta home-hero-cta--primary cta-button"
                  type="button"
                  onClick={() => setIsPaymentModalOpen(true)}
                >
                  Únete al Storytelling Lab
                </button>
                <button
                  className="home-hero-cta home-hero-cta--secondary cta-button"
                  type="button"
                  onClick={scrollToStoryDetails}
                >
                  Quiero saber más
                </button>
              </div>
            </div>
          </section>

          <section className="lab-storyline" ref={spiralSectionRef}>
            <div className="lab-storyline-inner" ref={spiralInnerRef}>
              <svg
                ref={spiralSvgRef}
                className={`lab-storyline-line${isStorylineEditorOpen ? " is-editing" : ""}`}
                viewBox={`0 0 ${SPIRAL_VIEWBOX.width} ${SPIRAL_VIEWBOX.height}`}
                aria-hidden="true"
                preserveAspectRatio="none"
                data-editing={isStorylineEditorOpen ? "true" : undefined}
              >
                <path
                  ref={spiralPathRef}
                  className={isStorylineEditorOpen ? "lab-editable-path" : undefined}
                  d={buildStorylineWordLinePath(spiralLineCommands)}
                  onPointerDown={(event) => handleEditablePathPointerDown(event, "spiral", 0, spiralLineCommands)}
                />
                {renderEditablePathAnchors(spiralLineCommands, "spiral")}
              </svg>

              <div className="lab-storyline-panel lab-storyline-panel--first">
                <article className="lab-storyline-copy lab-storyline-copy--first">
                  <p>
                    Seamos sinceras: Crear contenido se siente más difícil de lo que debería...
                  </p>
                </article>

                <figure className="lab-sketch lab-sketch--runner" aria-hidden="true">
                  <img src="/img/2-Doodle%201.png" alt="" loading="lazy" />
                </figure>
              </div>

              <div className="lab-storyline-panel lab-storyline-panel--second">
                <article className="lab-storyline-copy lab-storyline-copy--second">
                  <p>
                    Sobre todo cuando eres tú sola haciéndolo TODO
                  </p>
                  <small>
                    La CEO, la contadora, la de marketing, la de atención al cliente... y ahora también la creadora de contenido.
                  </small>
                </article>

                <figure className="lab-sketch lab-sketch--knitter" aria-hidden="true">
                  <img src="/img/3-Doodle%202.png" alt="" loading="lazy" />
                </figure>
              </div>

              <div className={`lab-storyline-panel lab-storyline-panel--final${isStorylineEditorOpen ? " is-editing" : ""}`}>
                <article className="lab-storyline-copy lab-storyline-copy--final">
                  <p>
                    Pero la idea no es convertirte en un gurú de las redes sociales.
                    <br />
                    Es aprender a crear desde lo que ya tienes:
                  </p>
                </article>

                <div
                  className={`lab-storyline-word-field${isStorylineEditorOpen ? " is-editing" : ""}`}
                  aria-label="Elementos desde donde crear contenido"
                >
                  <svg
                    ref={storylineWordLinesRef}
                    className={`lab-storyline-word-lines${isStorylineEditorOpen ? " is-editing" : ""}`}
                    viewBox="0 0 1440 700"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    data-editing={isStorylineEditorOpen ? "true" : undefined}
                  >
                    {storylineWordLineCommands.map((lineCommands, lineIndex) => (
                      <path
                        key={`storyline-word-line-${lineIndex}`}
                        className={isStorylineEditorOpen ? "lab-editable-path" : undefined}
                        d={buildStorylineWordLinePath(lineCommands)}
                        onPointerDown={(event) => handleEditablePathPointerDown(event, "storylineWords", lineIndex, lineCommands)}
                      />
                    ))}

                    {isStorylineEditorOpen && storylineWordLineCommands.map((lineCommands, lineIndex) => (
                      <g key={`storyline-word-editor-${lineIndex}`}>
                        {renderEditablePathAnchors(lineCommands, "storylineWords", lineIndex)}
                      </g>
                    ))}
                  </svg>
                  <span className="lab-storyline-word lab-storyline-word--errors">Tus errores</span>
                  <span className="lab-storyline-word lab-storyline-word--moves">Lo que te<br />mueve</span>
                  <span className="lab-storyline-word lab-storyline-word--opinions">Lo que opinas</span>
                  <span className="lab-storyline-word lab-storyline-word--awkward">Tus trágame tierra</span>
                  <span className="lab-storyline-word lab-storyline-word--voice">Tu voz</span>
                  <span className="lab-storyline-word lab-storyline-word--history">Tu historia</span>
                </div>
              </div>
            </div>
          </section>

          <div className="lab-depth-stack" ref={depthStackRef}>
            <section className="lab-method" ref={methodSectionRef}>
              <div className="lab-method-panel surface-panel">
                <div className="lab-method-copy">
                  <h2>
                    El Storytelling Lab nació para eso. No como un curso de marketing tradicional ni una colección de fórmulas genéricas. Sino como un espacio con una ruta concreta y herramientas prácticas para aprender a ordenar tus ideas y convertirlas en contenido que se sienta tuyo.
                  </h2>
                  <button
                    className="lab-method-cta cta-button"
                    type="button"
                    ref={depthStickyCtaRef}
                    onClick={() => setIsPaymentModalOpen(true)}
                  >
                    Únete al Storytelling Lab
                  </button>
                </div>
              </div>
            </section>

            <section className="lab-includes" ref={includesSectionRef}>
              <div className="lab-includes-inner content-shell">
                <div className="lab-feature-grid">
                  {FEATURES.map((feature, index) => (
                    <article
                      key={feature.title}
                      className={`lab-include-card surface-card${index % 2 === 1 ? " lab-include-card--reverse" : ""}`}
                    >
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
                  El Mapa Narrativo: la brújula de todo tu contenido
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
                    <img src={selectedFit.image} alt="" loading="lazy" />
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
                {[0, 1, 2, 3].map((setIndex) => (
                  <div
                    className="lab-testimonial-set"
                    aria-hidden={setIndex > 0}
                    key={`testimonial-set-${setIndex}`}
                  >
                    {TESTIMONIALS.map((item, index) => (
                      <article
                        key={`${item.quote}-${setIndex}-${index}`}
                        className="lab-testimonial-card"
                      >
                        <img src={item.avatar} alt="" loading="lazy" />
                        <p className="lab-quote">{item.quote}</p>
                        <p className="lab-meta">
                          {item.name}, {item.role}
                        </p>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="lab-curriculum">
            <div
              className="lab-curriculum-title"
              ref={curriculumTitleRef}
              aria-label="El contenido del curso"
              data-editing={isStorylineEditorOpen ? "true" : undefined}
            >
              <svg
                className={`lab-curriculum-line lab-curriculum-line--left${isStorylineEditorOpen ? " is-editing" : ""}`}
                viewBox="0 0 760 260"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  ref={curriculumLeftPathRef}
                  className={isStorylineEditorOpen ? "lab-editable-path" : undefined}
                  d={buildStorylineWordLinePath(curriculumLeftLineCommands)}
                  onPointerDown={(event) => handleEditablePathPointerDown(event, "curriculumLeft", 0, curriculumLeftLineCommands)}
                />
                {renderEditablePathAnchors(curriculumLeftLineCommands, "curriculumLeft")}
              </svg>
              <svg
                className={`lab-curriculum-line lab-curriculum-line--right${isStorylineEditorOpen ? " is-editing" : ""}`}
                viewBox="0 0 880 260"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  ref={curriculumRightPathRef}
                  className={isStorylineEditorOpen ? "lab-editable-path" : undefined}
                  d={buildStorylineWordLinePath(curriculumRightLineCommands)}
                  onPointerDown={(event) => handleEditablePathPointerDown(event, "curriculumRight", 0, curriculumRightLineCommands)}
                />
                {renderEditablePathAnchors(curriculumRightLineCommands, "curriculumRight")}
              </svg>
              <h2>El contenido del curso</h2>
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
                      <p className="lab-curriculum-meta">
                        <CurriculumMetaIcon type={module.meta.includes("capítulo") ? "book" : "video"} />
                        <span>{module.meta}</span>
                      </p>
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
                          <li key={lesson}>
                            <span className="lab-curriculum-lesson-icon" aria-hidden="true" />
                            <span>{lesson}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="lab-reels" aria-label="Instagram reels">
            <figure className="lab-reels-strip">
              <img src="/img/17-IG%20Reels.png" alt="" loading="lazy" />
            </figure>
          </section>

          <section className="lab-about" id="about">
            <div className="lab-about-inner">
              <h2>Hola! Soy Carolina</h2>
              <div className="lab-about-card">
                <div className="lab-about-photos" aria-label="Fotos de Carolina">
                  <img src="/img/16-Bio.png" alt="" loading="lazy" />
                </div>

                <div className="lab-about-copy">
                  <p>
                    Y yo también pasé por la etapa de seguir todas esas reglas invisibles del marketing
                  </p>
                  <p>
                    Publicar porque “hay que hacerlo”, repetir fórmulas, perseguir tendencias,
                    y sentir que lo que salía no era mío. Así que decidí dejar de buscar “la
                    fórmula mágica” y volví a lo único que siempre me había hecho sentido: las
                    historias. He pasado por varias esquinas de las comunicaciones: estudié
                    comunicación escénica, he escrito por años para revistas, y he creado contenido
                    para marcas y emprendimientos. Y después de vivir y trabajar 12 años en New York
                    y Londres, confirmé algo que se repetía en cada proyecto: cuando una marca
                    encuentra su historia, todo se ordena.
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
                <h2 id="lab-price-heading">Dos formas de entrar al Lab</h2>
              </div>

              {renderPaymentTabs("lab-price-heading")}
              {renderPaymentOffer()}
            </div>
          </section>

          <section className="lab-faq">
            <div className="lab-faq-panel">
              <div className="lab-faq-copy">
                <h2>Tengo algunas preguntas...</h2>
                <p>
                  Estas son algunas de las preguntas más comunes que me llegan antes de que alguien entre al Lab. Y si todavía no estás segura o tienes alguna otra pregunta, escríbeme!
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

          <SiteFooter />
          </main>
        </div>
      </div>
      {renderStorylineEditorPanel()}
      {isPaymentModalOpen && (
        <div
          className="lab-payment-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsPaymentModalOpen(false);
            }
          }}
        >
          <section
            className="lab lab-price lab-price--modal lab-payment-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Opciones de pago para entrar al Lab"
          >
            <button
              className="lab-payment-modal-close"
              type="button"
              aria-label="Cerrar opciones de pago"
              onClick={() => setIsPaymentModalOpen(false)}
            >
              <span aria-hidden="true">×</span>
            </button>

            <div className="lab-price-panel">
              {renderPaymentTabs(undefined)}
              {renderPaymentOffer()}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
