import '../App.css';

export default function Contact() {
  return (
    <main className="content" style={{ paddingTop: '5rem' }}>
      <section className="editorial" style={{ minHeight: '60vh', background: 'linear-gradient(180deg, var(--parchment), var(--rose))' }}>
        <div className="container two-col">
          <div>
            <h2>Let’s talk</h2>
            <p>
              Bold strategy, soft touch. Share a bit about your project and timing,
              and we'll reply within two business days.
            </p>
            <a className="cta primary" data-magnetic href="mailto:hello@example.com">Email hello@example.com</a>
          </div>
          <aside className="aside">
            <p>Prefer DM? Find us on Instagram — quick questions welcome.</p>
            <p style={{ marginTop: '.5rem' }}><a className="cta secondary" data-magnetic href="#/storytelling">See our work</a></p>
          </aside>
        </div>
      </section>
    </main>
  );
}


