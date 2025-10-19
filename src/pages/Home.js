import '../App.css';

export default function Home() {
  return (
    <main className="content" style={{ paddingTop: '2rem' }}>
      <section className="home-hero" data-parallax="0.06">
        <video className="bg-video" autoPlay muted loop playsInline poster="/logo512.png">
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="bubbles" aria-hidden="true">
          <span style={{"--x":"10%","--y":"20%","--s":"16px","--c":"#f6a6a1"}} />
          <span style={{"--x":"20%","--y":"70%","--s":"18px","--c":"#f7d6a1"}} />
          <span style={{"--x":"35%","--y":"40%","--s":"12px","--c":"#efc0a8"}} />
          <span style={{"--x":"55%","--y":"25%","--s":"14px","--c":"#ffd7a8"}} />
          <span style={{"--x":"75%","--y":"60%","--s":"22px","--c":"#b86b4a"}} />
          <span style={{"--x":"85%","--y":"30%","--s":"12px","--c":"#b76e79"}} />
        </div>
        <div className="inner">
          <p className="eyebrow">lalalaaah</p>
          <h1>Socials by Caro</h1>
          <p className="subhead">Warm, witty, and resonant — autumn in Stars Hollow, energy in boardrooms.</p>
          <div className="cta-row">
            <a className="cta primary" href="#/storytelling" data-magnetic>Enter Storytelling</a>
            <a className="cta secondary" href="#/contact" data-magnetic>Work with us</a>
          </div>
          <p className="course-note">Our storytelling experience is the gateway to our course.</p>
        </div>
      </section>

      <section className="editorial" style={{ background: 'linear-gradient(180deg, var(--parchment), var(--rose))' }}>
        <div className="container two-col">
          <div>
            <h2>Editorial social, shot like cinema</h2>
            <p>
              We bring a filmic sensibility to your day-to-day content: warm tones,
              gentle motion, and copy that breathes. It’s not louder; it’s deeper.
            </p>
          </div>
          <aside className="aside">
            <p>
              Built for founders who value resonance over reach. We design for
              the long tail: trust, taste, and timelessness.
            </p>
          </aside>
        </div>
      </section>

      <div className="separator" />

      <section className="editorial full-bleed" style={{ background: 'linear-gradient(90deg, var(--parchment), var(--rose))' }}>
        <div className="band">
          <div className="container">
            <p className="headline-kicker">Signature vibe</p>
            <h2 className="headline-xl" data-parallax="0.02">Small-town cozy. Big-city conviction.</h2>
          </div>
        </div>
      </section>

      <section className="editorial" style={{ background: 'linear-gradient(180deg, var(--rose), #fffaf5)' }}>
        <div className="container split">
          <div className="media" data-tilt>
            <img src="https://placehold.co/1200x800/fffaf5/2b1e24.png?text=Editorial+Preview" alt="Editorial preview" />
          </div>
          <div>
            <h3 className="pullquote">We make social feel like a Sunday read — cozy pacing, undeniable punch.</h3>
            <p>When strategy meets sentiment, your message lands without shouting. That’s the Caro edit.</p>
            <p style={{ marginTop: '.75rem' }}>
              <a className="cta primary" data-magnetic href="#/storytelling">See the approach</a>
            </p>
          </div>
        </div>
      </section>

      <section className="editorial" style={{ background: 'linear-gradient(180deg, #fffaf5, var(--parchment))' }}>
        <div className="container">
          <h2 style={{ marginBottom: '1rem' }}>Recent frames</h2>
          <div className="stagger">
            <div className="tile wide" data-tilt><img src="https://placehold.co/1600x900/f7f1e8/2b1e24.png?text=Wide+A" alt="Wide A" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <div className="tile tall" data-tilt><img src="https://placehold.co/800x1000/fffaf5/2b1e24.png?text=Tall+B" alt="Tall B" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <div className="tile" data-tilt><img src="https://placehold.co/800x800/f3d8d3/2b1e24.png?text=C" alt="C" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <div className="tile" data-tilt><img src="https://placehold.co/800x800/f7f1e8/2b1e24.png?text=D" alt="D" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <div className="tile wide" data-tilt><img src="https://placehold.co/1600x900/fffaf5/2b1e24.png?text=Wide+E" alt="Wide E" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <div className="tile tall" data-tilt><img src="https://placehold.co/800x1000/f3e9de/2b1e24.png?text=Tall+F" alt="Tall F" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
          </div>
        </div>
      </section>
    </main>
  );
}


