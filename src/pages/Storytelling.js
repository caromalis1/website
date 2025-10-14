import { useEffect, useRef } from 'react';
import ScrollySprite from '../ScrollySprite';
import '../App.css';

export default function Storytelling() {
  const layersRef = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const layer1 = layersRef.current.layer1;
      const layer2 = layersRef.current.layer2;
      const layer3 = layersRef.current.layer3;
      if (layer1) layer1.style.transform = `translateY(${scrollY * 0.15}px)`;
      if (layer2) layer2.style.transform = `translateY(${scrollY * 0.3}px)`;
      if (layer3) layer3.style.transform = `translateY(${scrollY * 0.45}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="App scrolly-root">
      <div className="parallax" aria-hidden="true">
        <div className="layer layer-1" ref={el => (layersRef.current.layer1 = el)} />
        <div className="layer layer-2" ref={el => (layersRef.current.layer2 = el)} />
        <div className="layer layer-3" ref={el => (layersRef.current.layer3 = el)} />
      </div>

      <div className="sprite-overlay" id="sprite-overlay"><ScrollySprite /></div>

      <main className="content">
        {/* Bloque 1 - INTRO */}
        <section className="takeover" data-parallax="0.02">
          <div className="container">
            <h1 className="headline-xl reveal">Storytelling Lab</h1>
            <p className="lead reveal">Un lugar para crear contenido que no dependa de hacks virales, sino de lo que te hace única: tu historia</p>
          </div>
        </section>

        {/* Bloque 2 - VALIDACION */}
        <section className="takeover alt">
          <div className="container">
            <p className="reveal">Seamos sinceras: crear contenido no es fácil. Especialmente cuando, además de tu negocio, eres la contadora, la diseñadora y la que embala pedidos con una mano mientras responde mensajes con la otra.</p>
            <p className="reveal">Y encima están todas esas reglas y hacks virales que supuestamente “tienes que seguir” para que funcione, un manual invisible que solo suma presión y convierte crear contenido en una tarea más en tu lista en vez de un espacio para compartir lo que haces.</p>
          </div>
        </section>

        {/* Bloque 3 - GOOD NEWS */}
        <section className="takeover">
          <div className="container">
            <p className="reveal">Pero tu contenido no nació para encajar en un molde: nació para sonar como tú, con tu voz, tu ritmo, tu energía. Y eso es lo que vas a lograr en el Storytelling Lab! Que tu historia se convierta en la raíz de tu contenido.</p>
          </div>
        </section>

        {/* Bloque 4 - EL MAPA NARRATIVO */}
        <section className="takeover alt">
          <div className="container">
            <p className="reveal">La gran mayoría de la gente empieza a crear contenido a mitad de camino, pensando en qué postear, en el calendario, en los hashtags, pero saltándose un paso fundamental: definir su mapa narrativo.</p>
            <p className="reveal">El mapa narrativo es lo que le da raíz y corazón a lo que compartes, lo que te permite construir una narrativa clara, humana y coherente. Un mapa que traduce tu voz y tu visión en mensajes que conectan, y que reúne los elementos más importantes de tu comunicación: desde quién es realmente tu audiencia hasta el rol que ocupas tú en su historia.</p>
          </div>
        </section>

        {/* Bloque 5 – PLAN CLARO Y SENCILLO */}
        <section className="takeover">
          <div className="container">
            <h2 className="reveal">En el Storytelling Lab vas a aprender a usar el storytelling como tu herramienta más práctica, en 3 simples pasos:</h2>
            <div className="steps">
              <div className="step reveal">
                <h3>1️⃣ Entra al laboratorio</h3>
                <p>Desde el primer día accedes a todos los módulos y recursos, con acceso para siempre. Tu eliges por dónde empezar y avanzas a tu propio ritmo.</p>
              </div>
              <div className="step reveal">
                <h3>2️⃣ Arma tu mapa narrativo</h3>
                <p>Esta es la brújula de todo tu contenido. Es lo que te permite entender con claridad qué quieres decir, cómo contarlo y por qué importa. Con un mapa narrativo, todo se conecta, cada idea tiene sentido y dejas de sentir que estás creando al azar. Este paso es el que te da dirección y hace que tu contenido por fin tenga raíz.</p>
              </div>
              <div className="step reveal">
                <h3>3️⃣ Comienza a crear</h3>
                <p>Cada módulo está pensado para que no te quedes solo con apuntes, sino que termines el Lab con ideas, guiones y contenido real, listo para publicar junto con un kit de recursos con plantillas, ejercicios, ejemplos y estructuras que podrás reutilizar una y otra vez en cualquier post, lanzamiento o nueva idea.</p>
              </div>
            </div>
            <p className="reveal">Porque cuando reconoces tu forma natural de comunicarte, entiendes por qué nunca te funcionaron esas fórmulas. Y cuando descubres cómo siempre estuviste destinada a compartir tu mensaje,dejas de pelear con los captions en blanco, entiendes qué tono y qué estilo resuenan contigo y con tu marca, y empiezas a crear contenido que se siente ligero, natural y magnético.</p>
          </div>
        </section>

        {/* Bloque 6 – QUÉ INCLUYE */}
        <section className="takeover alt">
          <div className="container">
            <h2 className="reveal">Esto es lo que te espera adentro del Lab:</h2>
            <ul className="feature-list">
              <li className="reveal">✨ Acceso on-demand a 6 módulos, con los fundamentos del storytelling y por qué importan en redes sociales, y un paso a paso sobre cómo construir y poner en práctica un mapa narrativo para tu contenido</li>
              <li className="reveal">✨ Guías prácticas descargables en cada módulo, con ejercicios paso a paso para que pases de la idea a la acción.</li>
              <li className="reveal">✨ 70 plantillas de puertas de entrada narrativas listas para usar cuando necesites ayuda para escribir tus guiones o captions</li>
              <li className="reveal">✨ Acceso a un hub creativo en Notion con plantillas narrativas, ejercicios y ejemplos editables, para que no tengas que partir desde cero cada vez que quieras crear algo nuevo.</li>
              <li className="reveal">✨ Un kit de recursos que se queda contigo: ideas de contenido, prompts y estructuras que puedes reutilizar en cualquier post, lanzamiento o nueva idea que aparezca en tu negocio.</li>
              <li className="reveal">✨ Acceso completo para siempre, para que lo hagas a tu ritmo, sin presiones ni carreras contrarreloj.</li>
            </ul>
          </div>
        </section>

        {/* Bloque 4 – POSICIONAMIENTO COMO GUIA */}
        <section className="takeover">
          <div className="container">
            <p className="reveal">¡Hola! Soy Carolina: content producer y especialista en storytelling digital para marcas y emprendedoras.</p>
            <p className="reveal">Siempre he sabido que lo mío es comunicar. Estudié artes escénicas, pasé años escribiendo para revistas y creando contenido tanto para mis propias cuentas como para marcas y emprendedoras. Y con el tiempo entendí que todo giraba en torno a lo mismo: rescatar el lado humano que nos conecta en redes. Por eso volví a lo que siempre me había hecho sentido: las historias. Y desde ahí empecé a acompañar a otras emprendedoras a reconectarse con la suya y a crear contenido más auténtico y genuino.</p>
            <p className="reveal">Así nació el Storytelling Lab. Porque yo también me sentí atrapada en esa olla de presión del marketing: reglas invisibles, fórmulas forzadas, comparaciones constantes. Pero hoy tenemos algo que antes no existía: la posibilidad de mostrarnos sin pedir permiso. Y ese es el corazón de este laboratorio: que no tengas que esperar a “tener todo claro” para empezar, que no te sientas sola bajando tus ideas a tierra y que no te pierdas en el ruido de lo que se supone que deberías estar haciendo.</p>
          </div>
        </section>

        {/* Bloque 9 – ES O NO PARA TI */}
        <section className="takeover alt">
          <div className="container">
            <div className="split">
              <div>
                <h3 className="reveal">👉 Es para ti si…</h3>
                <ul className="checks">
                  <li className="reveal">Te cansa perder energía y tiempo en tener que improvisar y depender de la inspiración del día.</li>
                  <li className="reveal">Tienes ideas pero se te enredan al momento de tener que transformalas en contenido</li>
                  <li className="reveal">Quieres conectar con tu audiencia y construir una comunidad real</li>
                  <li className="reveal">Estás motivada y lista para ponerle intención al crecimiento de tu marca.</li>
                  <li className="reveal">Has creado contenido o quieres empezar desde cero con una base clara.</li>
                  <li className="reveal">Quieres que tu contenido se sienta auténtico, alineado contigo y con los valores de tu negocio.</li>
                  <li className="reveal">Estás dispuesta a aprender, practicar y mejorar con el tiempo</li>
                </ul>
              </div>
              <div>
                <h3 className="reveal">👉 No es para ti si…</h3>
                <ul className="crosses">
                  <li className="reveal">Estás buscando un hack milagroso que te haga viral de la noche a la mañana.</li>
                  <li className="reveal">Tu prioridad hoy no es conectar con tu audiencia, sino solo crecer en números.</li>
                  <li className="reveal">Esperas resultados instantáneos sin darte espacio para probar, equivocarte y ajustar.</li>
                  <li className="reveal">No te sientes cómoda usando herramientas digitales básicas</li>
                  <li className="reveal">Solo ves la creación de contenido como una obligación más en la lista, sin interés en usarlo para conectar.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Bloque 8 – PRUEBA SOCIAL */}
        <section className="takeover">
          <div className="container">
            <h2 className="reveal">Esto es lo que dicen quienes ya pasaron por el Lab</h2>
            {/* Placeholder for testimonials grid or quotes */}
          </div>
        </section>

        {/* Bloque 10 – PREGUNTAS FRECUENTES */}
        <section className="takeover alt">
          <div className="container faq">
            <h2 className="reveal">Preguntas frecuentes</h2>
            <div className="qa reveal">
              <h4>¿Necesito experiencia previa en marketing o storytelling?</h4>
              <p>No. El curso está diseñado para que cualquier emprendedora pueda aplicarlo, incluso si nunca has tomado un curso de marketing.</p>
            </div>
            <div className="qa reveal">
              <h4>¿Cuánto tiempo me tomará hacer el curso?</h4>
              <p>El curso está pensado para que avances en 3 semanas, pero puedes hacerlo a tu ritmo. Cada módulo se puede completar en menos de 2 horas (ejercicios incluidos).</p>
            </div>
            <div className="qa reveal">
              <h4>¿Por cuánto tiempo tengo acceso?</h4>
              <p>Tendrás acceso completo por X tiempo (ej: 1 año, de por vida — aquí aclaras lo que ya tengas definido).</p>
            </div>
            <div className="qa reveal">
              <h4>¿Y si me quedo en blanco y no tengo ideas?</h4>
              <p>Justamente para eso está el laboratorio. No solo aprendes a crear ideas, también te llevas plantillas y puertas de entrada que puedes usar una y otra vez cuando la creatividad se esconda.</p>
            </div>
            <div className="qa reveal">
              <h4>¿Y si no soy constante en redes?</h4>
              <p>No necesitas postear todos los días para que funcione. El objetivo es que dejes de improvisar y empieces a publicar con claridad e intención, incluso si es 1 o 2 veces a la semana.</p>
            </div>
          </div>
        </section>

        {/* Bloque 11 – CIERRE */}
        <section className="final-cta" data-parallax="0.02">
          <h2 className="reveal">Crear contenido no debería sentirse como una olla de presión.</h2>
          <p className="reveal">Debería sentirse como una extensión de ti.</p>
          <p className="reveal">El Storytelling Lab no es un curso para que encajes en un molde, es un espacio para descubrir cómo siempre estuviste destinada a comunicarte.</p>
          <p className="reveal">Para que veas que tu voz, tu historia y tu manera de contar son suficientes para conectar.</p>
          <p className="reveal">Así que hagamos marketing de otra forma, ¿sí? De la forma que más se parece a ti.</p>
          <a className="cta primary big reveal" href="#/contact" data-magnetic>Quiero unirme al Storytelling Lab</a>
        </section>
      </main>
    </div>
  );
}


