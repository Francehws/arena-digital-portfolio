export type DemoId =
  'tavqi' | 'ai-receptionist' | 'noleggio-auto' | 'fps-staff-manager';
export interface Project {
  id: DemoId;
  name: string;
  category: string;
  sector: string;
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  benefit: string;
  custom: string;
  technologies: string[];
  accent: string;
  demoUrl: string;
  access: string;
  demoScope: string;
}
export function nativeUrl(value: string | undefined): string {
  if (!value) return '';
  try {
    const url = new URL(value);
    const local = ['127.0.0.1', 'localhost'].includes(url.hostname);
    if (
      url.username ||
      url.password ||
      (url.protocol !== 'https:' && !(local && url.protocol === 'http:'))
    )
      return '';
    return url.href;
  } catch {
    return '';
  }
}
export const projects: Project[] = [
  {
    id: 'tavqi',
    name: 'Tavqi',
    category: 'Gestionali',
    sector: 'Bar e ristoranti',
    summary: 'Il progetto originale per menu, tavoli, ordini e bancone.',
    problem:
      'Gli ordini devono passare dal tavolo al bancone mantenendo note, stato e conto.',
    solution:
      'Tavqi collega il menu digitale al flusso operativo del locale. Qui puoi aprire la demo già presente nel suo codice originale.',
    features: [
      'Menu QR, ricerca e allergeni',
      'Comande e preparazione al bancone',
      'Gestione menu e disponibilità',
      'Conto, quote simulate e report',
    ],
    benefit:
      'Seguire un ordine dal cliente alla preparazione nello stesso percorso.',
    custom:
      'Menu, ruoli, flussi del locale e integrazioni da configurare sul progetto.',
    technologies: ['Next.js', 'TypeScript', 'Drizzle', 'PostgreSQL'],
    accent: 'blue',
    demoUrl: nativeUrl(import.meta.env.VITE_TAVQI_DEMO_URL),
    access: 'La demo nativa si apre senza account.',
    demoScope:
      'Interfaccia e componenti della demo originale Tavqi. Ordini e pagamenti usano lo stato dimostrativo nativo in memoria; non sono transazioni o comande di un locale reale.',
  },
  {
    id: 'ai-receptionist',
    name: 'AI Receptionist',
    category: 'Intelligenza artificiale',
    sector: 'Saloni e professionisti',
    summary: 'Il pannello originale per agenda, clienti e assistente.',
    problem:
      'Richieste e appuntamenti arrivano da canali diversi e devono rispettare servizi e disponibilità.',
    solution:
      'La copia del progetto esegue il pannello, l’autenticazione e l’agenda originali su un database separato con dati inventati.',
    features: [
      'Dashboard e agenda originali',
      'Clienti e servizi di prova',
      'Simulatore nativo delle conversazioni',
      'Prenotazioni su ambiente isolato',
    ],
    benefit:
      'Provare l’organizzazione del lavoro e il percorso dell’assistente dentro il software reale.',
    custom:
      'Servizi, operatori, orari e collegamenti voce/WhatsApp da configurare separatamente.',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    accent: 'violet',
    demoUrl: nativeUrl(import.meta.env.VITE_RECEPTIONIST_DEMO_URL),
    access:
      'Nella pagina di accesso premi “Prova il pannello demo”. L’account è fittizio e nessuna password viene mostrata.',
    demoScope:
      'Applicazione originale e database nuovo. Il simulatore è quello incluso nel progetto; chiamate, WhatsApp, notifiche e modelli AI esterni restano disattivati.',
  },
  {
    id: 'noleggio-auto',
    name: 'Gestionale noleggio auto',
    category: 'Gestionali',
    sector: 'Autonoleggio',
    summary: 'Flotta, disponibilità e prenotazioni nel gestionale originale.',
    problem:
      'Un noleggio deve coordinare veicoli, periodi, prezzi e stato delle prenotazioni.',
    solution:
      'La modalità DEMO_MODE del progetto originale esegue servizi e schermate reali con una flotta e clienti fittizi in un database dedicato.',
    features: [
      'Flotta e disponibilità',
      'Preventivi e prenotazioni',
      'Calendario e gestione operativa',
      'Modalità demo nativa del progetto',
    ],
    benefit:
      'Esplorare il processo di noleggio e la gestione operativa nella stessa applicazione.',
    custom:
      'Flotta, tariffe, documenti, ruoli e integrazioni da concordare per l’attività.',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    accent: 'cyan',
    demoUrl: nativeUrl(import.meta.env.VITE_AUTO_DEMO_URL),
    access:
      'Nella pagina di accesso premi “Usa questo accesso” sotto Amministratore. Nessuna credenziale del cliente viene utilizzata.',
    demoScope:
      'Codice e interfaccia originali, dati di prova. DEMO_MODE attiva i gateway simulati; SMTP, WhatsApp e pagamenti reali sono disabilitati.',
  },
  {
    id: 'fps-staff-manager',
    name: 'F.P.S. Staff Manager',
    category: 'Gestionali',
    sector: 'Gestione del personale',
    summary: 'Persone, squadre e turni nel programma originale.',
    problem:
      'Pianificare turni e presenze richiede dati condivisi e permessi distinti per responsabili e dipendenti.',
    solution:
      'L’applicazione originale usa PostgreSQL e Better Auth in una copia isolata, con persone, sedi e turni generati dal suo seed fittizio.',
    features: [
      'Dipendenti, sedi e squadre',
      'Turni e calendario',
      'Presenze, richieste e approvazioni',
      'Report e autorizzazioni per ruolo',
    ],
    benefit:
      'Provare il flusso del personale con ruoli e dati persistenti nel database demo.',
    custom:
      'Sedi, squadre, cicli e regole operative da configurare secondo il contesto aziendale.',
    technologies: [
      'Next.js',
      'TypeScript',
      'Prisma',
      'Better Auth',
      'PostgreSQL',
    ],
    accent: 'green',
    demoUrl: nativeUrl(import.meta.env.VITE_FPS_DEMO_URL),
    access:
      'Nella pagina di accesso scegli “Prova come amministratore” oppure “Prova come dipendente”. Non servono credenziali operative.',
    demoScope:
      'Software originale con autenticazione e database reali, interamente dedicati alla demo. Nessun dato del personale reale; comunicazioni esterne disabilitate e regole contrattuali solo dimostrative.',
  },
];
export const categories = ['Tutti', 'Gestionali', 'Intelligenza artificiale'];
export const nativePreviews = import.meta.env.VITE_NATIVE_PREVIEWS === '1';
export const demoHref = (project: Project) =>
  project.demoUrl || `${import.meta.env.BASE_URL}projects/${project.id}/demo/`;
