import './Home.css';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';

const SERVICES = [
  'Creative Content Production',
  'Copy & Creative Writing',
  'Social Media Strategy',
  'Email Marketing'
];

const WHAT_I_DO = [
  'Blog Posts',
  'Editorial Content',
  'Body Copy',
  'Social Strategy',
  'Website Copy',
  'Campaign Brief',
  'Website Copywriting',
  'Social Media Content',
  'Newsletters',
  'Feature Articles',
  'Brand Consulting'
];

const SERVICE_DETAILS = [
  {
    title: 'Creative Content Production',
    description: "My role revolves around crafting captivating narratives and engaging experiences for brands and audiences. My work encompasses a dynamic blend of creativity, strategy, and execution, where fresh and original content aligns seamlessly with the brand's vision and objectives."
  },
  {
    title: 'Copy & Creative Writing',
    description: 'I specialize in crafting persuasive and engaging content that captivates audiences across various channels and platforms. From concise ad copy to in-depth storytelling, I breathe life into brands through words and creativity.'
  },
  {
    title: 'Social Media Strategy',
    description: "An effective strategy is all about orchestrating the digital symphony behind your socials. I analyze audience behavior, platform trends, and content performance to tailor content that resonates with each platform's user base."
  },
  {
    title: 'Email Marketing',
    description: 'Email is a potent marketing channel to drive business growth and enhance sales performance. I develop and execute email marketing campaigns that build brand engagement, lead generation, and stronger customer relationships.'
  }
];

const FEATURED_WORK = [
  'Editorial Direction',
  'Social Campaign',
  'Brand Story',
  'Newsletter Flow',
  'Website Copy',
  'Launch Content'
];

export default function Home() {
  return (
    <main className="portfolio-home">
      <SiteHeader logoSublabel="Content Studio" contentFadeRgb="251, 242, 235" />

      <section className="portfolio-hero">
        <div className="portfolio-hero-copy">
          <h1>Carolina Malis</h1>
          <p>
            I merge creative thinking with strategy to craft compelling content that elevates
            brands, builds engaging narratives, and forges meaningful connections with your
            audience.
          </p>
          <div className="portfolio-actions">
            <a className="portfolio-button portfolio-button--primary" href="#featured-work">
              Projects
            </a>
            <a className="portfolio-button" href="#what-i-do">
              What I do
            </a>
          </div>
        </div>

        <div className="portfolio-hero-visual" aria-hidden="true">
          <svg viewBox="0 0 620 520" role="img">
            <path className="portfolio-line portfolio-line--one" d="M94 92C184 40 319 59 394 105C481 158 515 266 451 331C386 397 250 373 218 294C194 236 252 185 323 199C390 212 419 286 377 334C329 389 207 388 139 334" />
            <path className="portfolio-line portfolio-line--two" d="M103 353C151 430 271 457 385 427C490 400 558 319 529 250" />
            <circle cx="438" cy="126" r="14" />
          </svg>
        </div>
      </section>

      <section className="portfolio-intro content-shell">
        <p className="portfolio-kicker">Hi! I'm Carolina</p>
        <h2>Let's create something remarkable together.</h2>
        <p>
          Specializing in engaging narratives, strategic social media planning, and impactful
          email marketing, I help transform a brand's presence into content that feels clear,
          useful, and human.
        </p>
      </section>

      <section className="portfolio-services" aria-label="Services">
        <div className="portfolio-service-track">
          {[...SERVICES, ...SERVICES].map((service, index) => (
            <span key={`${service}-${index}`}>{service}</span>
          ))}
        </div>
      </section>

      <section className="portfolio-what content-shell" id="what-i-do">
        <div>
          <p className="portfolio-kicker">What I do</p>
          <h2>Content that connects strategy with voice.</h2>
        </div>
        <div className="portfolio-tag-cloud" aria-label="Content formats">
          {WHAT_I_DO.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="portfolio-details content-shell">
        {SERVICE_DETAILS.map((item, index) => (
          <article className="portfolio-detail" key={item.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </section>

      <section className="portfolio-featured" id="featured-work">
        <div className="content-shell">
          <p className="portfolio-kicker">Featured Work</p>
          <h2>Selected stories, campaigns, and content systems.</h2>
          <div className="portfolio-work-grid">
            {FEATURED_WORK.map((item, index) => (
              <article className="portfolio-work" key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter title="Caro Malis" />
    </main>
  );
}
