import { useState } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  CalendarDays,
  ShoppingCart,
  Layers3,
  Menu,
  X,
  Utensils,
  Bot,
  CarFront,
  Users,
  Check,
  Github,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { config, href } from './config';
import {
  projects,
  categories,
  nativePreviews,
  demoHref,
  type Project,
} from './projects';

const projectIcons = {
  tavqi: Utensils,
  'ai-receptionist': Bot,
  'auto-manhattan': CarFront,
  'fps-staff-manager': Users,
};
function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header wrap">
      <a className="brand" href={href('/')} aria-label="Arena Digital, home">
        <strong>ARENA</strong>
        <span>/</span>DIGITAL
      </a>
      <button
        className="menu-toggle icon-button"
        aria-label={open ? 'Chiudi menu' : 'Apri menu'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav aria-label="Principale" className={open ? 'open' : ''}>
        <a href={href('/#progetti')}>Progetti</a>
        <a href={href('/#servizi')}>Servizi</a>
        <a href={href('/#approccio')}>Approccio</a>
        <a className="button secondary compact" href={href('/#contatti')}>
          Parliamone
          <ArrowUpRight size={16} />
        </a>
      </nav>
    </header>
  );
}
function Contact() {
  return (
    <section id="contatti" className="contact-block">
      <div>
        <h2>Quale attività vorresti semplificare?</h2>
        <p>Raccontami il tuo progetto.</p>
      </div>
      <div className="contact-actions">
        {config.email && (
          <a
            className="button"
            href={`mailto:${encodeURIComponent(config.email)}`}
          >
            <Mail size={18} />
            Scrivimi un’email
          </a>
        )}
        {config.whatsapp && (
          <a
            className="button secondary"
            href={config.whatsapp}
            rel="noopener noreferrer"
            target="_blank"
          >
            <MessageCircle size={18} />
            Parliamone su WhatsApp
          </a>
        )}
        {!config.email && !config.whatsapp && (
          <p className="contact-pending">Recapiti in configurazione</p>
        )}
        <a className="text-link" href={href('/#progetti')}>
          Torna alle demo
          <ArrowRight size={18} />
        </a>
        {(config.linkedin || config.instagram) && (
          <div className="button-row">
            {config.linkedin && (
              <a
                href={config.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            )}
            {config.instagram && (
              <a
                href={config.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="wrap site-footer">
      <a className="brand" href={href('/')}>
        <strong>ARENA</strong>
        <span>/</span>DIGITAL
      </a>
      <p>Software, AI & automazioni.</p>
      <div>
        <a href={href('/privacy/')}>Privacy</a>
        <a href={config.github} target="_blank" rel="noopener noreferrer">
          <Github size={16} />
          GitHub
        </a>
      </div>
    </footer>
  );
}
function ProductVisual({ project }: { project: Project }) {
  const Icon = projectIcons[project.id];
  return (
    <div className={`project-preview ${project.accent}`}>
      <img
        src={
          nativePreviews
            ? href(`/native-previews/${project.id}.png`)
            : href('/favicon.svg')
        }
        alt={
          nativePreviews
            ? `Interfaccia originale ${project.name} nella copia demo`
            : `Progetto ${project.name}`
        }
        width="1000"
        height="650"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <div className="preview-fallback" aria-hidden="true">
        <Icon size={54} />
        <div className="preview-lines">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
function ProjectList() {
  const [filter, setFilter] = useState('Tutti');
  return (
    <section id="progetti" className="projects-section section">
      <div className="section-heading">
        <h2>Il software si capisce provandolo.</h2>
        <p>
          Apri i progetti originali.
          <br />
          Copie isolate, dati fittizi, interfacce reali.
        </p>
      </div>
      <div className="filter-tabs" aria-label="Categorie progetti">
        {categories.map((c) => (
          <button
            key={c}
            aria-pressed={filter === c}
            className={filter === c ? 'active' : ''}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="project-list">
        {projects
          .filter((p) => filter === 'Tutti' || p.category === filter)
          .map((p) => {
            const Icon = projectIcons[p.id];
            return (
              <article className={`project-row ${p.accent}`} key={p.id}>
                <div className="project-copy">
                  <div className="project-type">
                    <Icon size={20} />
                    <span>{p.sector}</span>
                  </div>
                  <h3>{p.name}</h3>
                  <p>{p.summary}</p>
                  <ul>
                    {p.features.slice(0, 3).map((f) => (
                      <li key={f}>
                        <Check size={14} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span className="verified-label">
                    {p.demoUrl
                      ? 'Demo originale collegata'
                      : 'Progetto originale · demo da collegare'}
                  </span>
                  <div className="button-row">
                    <a className="button" href={demoHref(p)}>
                      Prova la demo
                      <ArrowUpRight size={17} />
                    </a>
                    <a className="text-link" href={href(`/projects/${p.id}/`)}>
                      Scopri il progetto
                      <ArrowRight size={17} />
                    </a>
                  </div>
                </div>
                <a
                  className="preview-link"
                  aria-label={`Scopri ${p.name}`}
                  href={href(`/projects/${p.id}/`)}
                >
                  <ProductVisual project={p} />
                </a>
              </article>
            );
          })}
      </div>
    </section>
  );
}
function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>
            Meno lavoro
            <br />
            manuale. Più
            <br />
            spazio alle idee.
          </h1>
          <p>
            Software, assistenti AI e automazioni progettati intorno al tuo
            lavoro.
          </p>
          <div className="button-row">
            <a className="button" href="#progetti">
              Prova le demo
              <ArrowUpRight size={18} />
            </a>
            <a className="button secondary" href="#progetti">
              Esplora i progetti
            </a>
          </div>
        </div>
        <div className="workflow-preview">
          <div className="workflow-title">
            <Layers3 size={26} />
            <span>I progetti originali</span>
            <div className="window-dots">
              <i />
              <i />
              <i />
            </div>
          </div>
          {[
            {
              icon: CalendarDays,
              name: 'Prenotazioni',
              id: 'ai-receptionist',
            },
            { icon: ShoppingCart, name: 'Ordini', id: 'tavqi' },
            { icon: Layers3, name: 'Catalogo', id: 'auto-manhattan' },
          ].map(({ icon: Icon, name, id }) => (
            <a key={id} href={demoHref(projects.find((p) => p.id === id)!)}>
              <span className="workflow-icon">
                <Icon size={25} />
              </span>
              <strong>{name}</strong>
              <span className="workflow-bars" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <ArrowUpRight size={20} />
            </a>
          ))}
          <p className="workflow-caption">
            Interfacce originali, in ambienti demo separati.
          </p>
        </div>
      </section>
      <ProjectList />
      <section id="servizi" className="section services-section">
        <div className="section-heading">
          <h2>
            Strumenti che seguono
            <br />
            il tuo lavoro.
          </h2>
          <p>
            Il punto di partenza è quello che
            <br />
            serve alla tua attività.
          </p>
        </div>
        <div className="services-list">
          {[
            {
              icon: Layers3,
              title: 'Gestionali su misura',
              text: 'Personale, ordini e attività: informazioni organizzate in un unico ambiente.',
            },
            {
              icon: Bot,
              title: 'Assistenti AI',
              text: 'Flussi guidati per richieste e appuntamenti, con integrazioni da verificare sul campo.',
            },
            {
              icon: ShoppingCart,
              title: 'Siti web ed e-commerce',
              text: 'Cataloghi e percorsi chiari per accompagnare i clienti verso una richiesta o un acquisto.',
            },
            {
              icon: ArrowRight,
              title: 'Automazioni e integrazioni',
              text: 'Collegamenti tra strumenti e API per ridurre i passaggi ripetitivi.',
            },
          ].map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon size={26} />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="approccio" className="section approach-section">
        <div>
          <h2>
            Partire dal problema.
            <br />
            Costruire con metodo.
          </h2>
          <p>
            Sono {config.name}. Realizzo strumenti digitali pensati per
            semplificare il lavoro quotidiano.
          </p>
        </div>
        <ol>
          <li>
            <strong>Ascolto</strong>
            <span>Capire il processo e il risultato che serve.</span>
          </li>
          <li>
            <strong>Prototipo</strong>
            <span>Rendere la soluzione concreta e provarla insieme.</span>
          </li>
          <li>
            <strong>Verifica</strong>
            <span>Controllare i flussi e rifinire prima della consegna.</span>
          </li>
        </ol>
      </section>
      <Contact />
    </>
  );
}
function ProjectPage({
  project: p,
  demo,
}: {
  project: Project;
  demo: boolean;
}) {
  const Icon = projectIcons[p.id];
  return (
    <>
      <div className="page-intro">
        <a className="text-link back-link" href={href('/#progetti')}>
          ← Tutti i progetti
        </a>
        <div className="project-type">
          <Icon size={22} />
          {p.sector}
        </div>
        <h1>{p.name}</h1>
        <p>{p.summary}</p>
        <div className="button-row">
          {!demo ? (
            <a className="button" href={demoHref(p)}>
              Entra nella demo
              <ArrowUpRight size={18} />
            </a>
          ) : (
            <a className="text-link" href={href(`/projects/${p.id}/`)}>
              Scopri il progetto
              <ArrowRight size={17} />
            </a>
          )}
          <a className="button secondary" href="#contatti">
            Richiedi una versione personalizzata
          </a>
        </div>
      </div>
      {demo ? (
        <section
          className="scope-block native-launch"
          aria-label={`Demo originale ${p.name}`}
        >
          <h2>Apri il progetto originale</h2>
          <p>{p.demoScope}</p>
          <p className="muted">{p.access}</p>
          {p.demoUrl ? (
            <a
              className="button"
              href={p.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apri {p.name}
              <ArrowUpRight size={18} />
            </a>
          ) : (
            <p className="status">
              La demo originale è temporaneamente non disponibile. Questa
              anteprima non sostituisce l’applicazione.
            </p>
          )}
          <div className="case-preview">
            <ProductVisual project={p} />
          </div>
        </section>
      ) : (
        <>
          <div className="case-preview">
            <ProductVisual project={p} />
          </div>
          <section className="case-grid section">
            <article>
              <span className="label">Il problema</span>
              <h2>Una difficoltà concreta.</h2>
              <p>{p.problem}</p>
            </article>
            <article>
              <span className="label">La soluzione</span>
              <h2>Un percorso più chiaro.</h2>
              <p>{p.solution}</p>
            </article>
            <article>
              <h3>Funzioni da provare</h3>
              <ul className="feature-list">
                {p.features.map((f) => (
                  <li key={f}>
                    <Check size={18} />
                    {f}
                  </li>
                ))}
              </ul>
            </article>
            <article>
              <h3>Il valore per la tua attività</h3>
              <p>{p.benefit}</p>
              <h3>Possibili personalizzazioni</h3>
              <p>{p.custom}</p>
            </article>
          </section>
          <section className="scope-block">
            <h3>Cosa stai provando</h3>
            <p>{p.demoScope}</p>
            <p className="muted">
              Tecnologie del progetto: {p.technologies.join(' · ')}.
            </p>
            <a className="button" href={demoHref(p)}>
              Prova la demo
              <ArrowUpRight size={18} />
            </a>
          </section>
        </>
      )}
      <Contact />
    </>
  );
}
function Privacy() {
  return (
    <article className="legal page-intro">
      <h1>Privacy della demo</h1>
      <p>
        Questa vetrina non utilizza analytics o cookie di profilazione. Le
        applicazioni demo si aprono in ambienti separati: alcune usano
        autenticazione e database dedicati, con dati interamente fittizi.
      </p>
      <h2>Usa soltanto dati inventati</h2>
      <p>
        I campi delle demo servono a provare i flussi. Non inserire dati
        personali reali. Non vengono effettuati pagamenti, telefonate o invii di
        messaggi.
      </p>
      <h2>Collegamenti e hosting</h2>
      <p>
        Aprendo GitHub, email, WhatsApp o social quando configurati, utilizzi un
        servizio esterno con la sua informativa. Il fornitore di hosting può
        trattare i normali dati tecnici di accesso secondo la propria
        informativa.
      </p>
      <h2>Contatti e informazioni definitive</h2>
      <p>
        Il sito è in preparazione. Sono disponibili i recapiti forniti per
        WhatsApp e Instagram. Le informazioni del titolare devono essere
        completate prima della pubblicazione; eventuali futuri moduli o sistemi
        di analisi richiederanno un aggiornamento di questa pagina.
      </p>
      <a className="button" href={href('/')}>
        Torna al portfolio
      </a>
    </article>
  );
}
export default function App({ path = '/' }: { path?: string }) {
  const match = path.match(/^\/projects\/([^/]+)(\/demo)?\/?$/);
  const p = match ? projects.find((p) => p.id === match[1]) : null;
  const valid = path === '/' || path === '/privacy' || Boolean(p);
  return (
    <>
      <a className="skip-link" href="#contenuto">
        Vai al contenuto
      </a>
      <Header />
      <main id="contenuto" className="wrap">
        {path === '/' ? (
          <Home />
        ) : path === '/privacy' ? (
          <Privacy />
        ) : p ? (
          <ProjectPage project={p} demo={Boolean(match?.[2])} />
        ) : (
          <div className="page-intro">
            <h1>Pagina non trovata.</h1>
            <p>Il percorso richiesto non è disponibile.</p>
            <a className="button" href={href('/')}>
              Torna al portfolio
            </a>
          </div>
        )}
      </main>
      <Footer />
      {!valid && <span className="sr-only">Errore 404</span>}
    </>
  );
}
