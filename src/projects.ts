export type DemoId =
  | 'tavqi'
  | 'ai-receptionist'
  | 'noleggio-auto'
  | 'fps-staff-manager'
  | 'formazione-aula'
  | 'segnali-finanziari'
  | 'marketplace-detailing'
  | 'gestionale-autoscuola'
  | 'crm-commerciale'
  | 'ordini-ristorazione'
  | 'vetrina-gioielli'
  | 'gestionale-concessionaria'
  | 'localizzazione-food-truck'
  | 'gallery-locale'
  | 'gestionale-studio'
  | 'gestionale-veicoli'
  | 'gestionale-impianti'
  | 'onboarding-finanziario'
  | 'gestionale-moto'
  | 'registrazione-guidata'
  | 'analisi-documentale';
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
  previewFile?: string;
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
      'Tavqi collega il menu digitale al flusso operativo del locale. La demo pubblica è temporaneamente sospesa.',
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
    previewFile: 'tavqi.png',
    access: 'La demo nativa si apre senza account.',
    demoScope:
      'Interfaccia e componenti della demo originale Tavqi. Ordini e pagamenti usano lo stato dimostrativo nativo in memoria; non sono transazioni o comande di un locale reale.',
  },
  {
    id: 'ai-receptionist',
    name: 'AI Receptionist',
    category: 'AI e automazioni',
    sector: 'Saloni e professionisti',
    summary: 'Il pannello originale per agenda, clienti e assistente.',
    problem:
      'Richieste e appuntamenti arrivano da canali diversi e devono rispettare servizi e disponibilità.',
    solution:
      'Il pannello riunisce autenticazione, agenda e strumenti per coordinare appuntamenti e servizi.',
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
    previewFile: 'ai-receptionist.png',
    access:
      'Nella pagina di accesso premi “Prova il pannello demo”. L’account è fittizio e nessuna password viene mostrata.',
    demoScope:
      'La demo pubblica è temporaneamente sospesa. I servizi esterni e i dati produttivi restano esclusi.',
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
    previewFile: 'noleggio-auto.png',
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
    previewFile: 'fps-staff-manager.png',
    access:
      'Nella pagina di accesso scegli “Prova come amministratore” oppure “Prova come dipendente”. Non servono credenziali operative.',
    demoScope:
      'Software originale con autenticazione e database reali, interamente dedicati alla demo. Nessun dato del personale reale; comunicazioni esterne disabilitate e regole contrattuali solo dimostrative.',
  },
  {
    id: 'formazione-aula',
    name: 'Gestionale formazione in aula',
    category: 'Gestionali',
    sector: 'Formazione',
    summary: 'Corsi in presenza, iscrizioni, presenze e amministrazione.',
    problem:
      'Corsi, edizioni, iscritti e registri richiedono flussi coordinati.',
    solution:
      'Applicazione web con catalogo corsi, area corsisti, strumenti per docenti e pannello di segreteria.',
    features: [
      'Catalogo ed edizioni',
      'Registro presenze',
      'Gestione iscritti e attestati',
    ],
    benefit:
      'Seguire l’organizzazione dei corsi in presenza in un unico gestionale.',
    custom:
      'Catalogo, calendari, ruoli e informative si configurano per ogni ente.',
    technologies: ['React', 'TypeScript', 'Express', 'SQLite'],
    accent: 'blue',
    demoUrl: '',
    access: '',
    demoScope: 'Scheda descrittiva. La demo interattiva non è pubblicata.',
  },
  {
    id: 'segnali-finanziari',
    name: 'Automazioni per segnali finanziari',
    category: 'AI e automazioni',
    sector: 'Automazioni',
    summary:
      'Strumenti per gestire segnali e controllare attività automatizzate.',
    problem:
      'Messaggi e stati dei sistemi di esecuzione vanno coordinati e monitorati.',
    solution:
      'Progetto Python con componenti di notifica e moduli per piattaforme di trading.',
    features: [
      'Ricezione di segnali',
      'Stato delle esecuzioni',
      'Strumenti di monitoraggio',
    ],
    benefit: 'Raccogliere lo stato dei processi automatici in un solo flusso.',
    custom:
      'Connettori e regole dipendono dall’ambiente e dai requisiti di sicurezza.',
    technologies: ['Python', 'MQL4', 'MQL5'],
    accent: 'violet',
    demoUrl: '',
    access: '',
    demoScope:
      'Scheda descrittiva. La demo non è pubblicata e non esegue ordini; non costituisce consulenza finanziaria.',
  },
  {
    id: 'marketplace-detailing',
    name: 'Marketplace per car wash e detailing',
    category: 'Siti e piattaforme',
    sector: 'Servizi auto e moto',
    summary:
      'Una piattaforma per trovare operatori di lavaggio e cura dei veicoli.',
    problem:
      'Clienti e operatori hanno bisogno di presentare e confrontare i servizi.',
    solution:
      'Marketplace web con profili di servizio e flussi dedicati a clienti e operatori.',
    features: [
      'Ricerca operatori',
      'Profili e servizi',
      'Percorsi per clienti e partner',
    ],
    benefit: 'Rendere più semplice scoprire servizi locali per auto e moto.',
    custom:
      'Categorie, copertura, prenotazioni e condizioni si adattano al marketplace.',
    technologies: ['Node.js', 'Express', 'React'],
    accent: 'cyan',
    demoUrl: '',
    access: '',
    demoScope: 'Scheda descrittiva. La demo interattiva non è pubblicata.',
  },
  {
    id: 'gestionale-autoscuola',
    name: 'Sito e gestionale per autoscuola',
    category: 'Gestionali',
    sector: 'Formazione alla guida',
    summary:
      'Informazioni, prenotazioni e gestione delle attività di autoscuola.',
    problem:
      'Le richieste e le attività didattiche devono restare ordinate tra sito e segreteria.',
    solution: 'Applicazione web con sito informativo e strumenti di gestione.',
    features: ['Informazioni e FAQ', 'Prenotazioni', 'Area di gestione'],
    benefit: 'Collegare la presentazione dei servizi ai flussi di segreteria.',
    custom:
      'Orari, servizi, comunicazioni e flussi si configurano per ogni autoscuola.',
    technologies: ['Next.js', 'TypeScript', 'Prisma'],
    accent: 'green',
    demoUrl: '',
    access: '',
    demoScope: 'Scheda descrittiva. La demo interattiva non è pubblicata.',
  },
  {
    id: 'crm-commerciale',
    name: 'CRM per contatti commerciali',
    category: 'Strumenti locali',
    sector: 'Organizzazione commerciale',
    summary:
      'Una dashboard locale per organizzare contatti e attività di vendita.',
    problem:
      'Contatti e proposte commerciali richiedono promemoria e uno stato condiviso.',
    solution:
      'Strumento locale per organizzare contatti e attività di follow-up.',
    features: [
      'Elenco contatti',
      'Stato delle proposte',
      'Promemoria e attività',
    ],
    benefit: 'Rendere più chiaro il lavoro quotidiano di contatto e follow-up.',
    custom: 'Campi, attività e priorità si modellano sul processo commerciale.',
    technologies: ['React', 'TypeScript', 'Vite'],
    accent: 'blue',
    demoUrl: '',
    access: '',
    demoScope: 'Scheda descrittiva. Dati di contatto reali non sono inclusi.',
  },
  {
    id: 'ordini-ristorazione',
    name: 'Ordini per attività di ristorazione',
    category: 'Siti e piattaforme',
    sector: 'Ristorazione',
    summary: 'Un flusso web essenziale per raccogliere e gestire ordinazioni.',
    problem:
      'Gli ordini devono arrivare al personale con stato e dettagli leggibili.',
    solution: 'Applicazione web con servizi server per coordinare gli ordini.',
    features: [
      'Raccolta ordinazioni',
      'Stato di lavorazione',
      'Interfaccia semplice',
    ],
    benefit:
      'Mantenere il flusso degli ordini più leggibile durante il servizio.',
    custom: 'Menu, canali di ritiro e stati si configurano per il locale.',
    technologies: ['Node.js', 'Express', 'WebSocket'],
    accent: 'cyan',
    demoUrl: '',
    access: '',
    demoScope: 'Scheda descrittiva. Non invia ordini a un locale reale.',
  },
  {
    id: 'vetrina-gioielli',
    name: 'Vetrina per designer di gioielli',
    category: 'Siti e piattaforme',
    sector: 'Moda e design',
    summary:
      'Un sito vetrina editoriale per presentare collezioni e lavorazioni.',
    problem:
      'Collezioni e identità visiva richiedono una presentazione coerente online.',
    solution: 'Sito statico con immagini e pagine curate per il catalogo.',
    features: ['Vetrina collezioni', 'Galleria visiva', 'Layout responsive'],
    benefit: 'Presentare il lavoro creativo con una navigazione semplice.',
    custom:
      'Palette, fotografie, testi e struttura si adattano al brand autorizzato.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    accent: 'violet',
    demoUrl: '',
    access: '',
    demoScope:
      'Scheda descrittiva. Immagini e identità del cliente sono escluse.',
  },
  {
    id: 'gestionale-concessionaria',
    name: 'Gestionale concessionaria auto',
    category: 'Gestionali',
    sector: 'Vendita e assistenza veicoli',
    summary: 'Vetrina e strumenti gestionali per un’attività di vendita auto.',
    problem:
      'Veicoli, richieste, trattative e assistenza richiedono un catalogo coordinato.',
    solution: 'Applicazione web con area gestionale e vetrina collegata.',
    features: [
      'Catalogo veicoli',
      'Area operativa',
      'Flussi di vendita e assistenza',
    ],
    benefit: 'Collegare la gestione interna alla presentazione dei veicoli.',
    custom:
      'Catalogo, ruoli, documenti e flussi si configurano per la concessionaria.',
    technologies: ['Next.js', 'TypeScript', 'Prisma'],
    accent: 'green',
    demoUrl: '',
    access: '',
    demoScope:
      'Scheda descrittiva. Dati, veicoli e contatti reali sono esclusi.',
  },
  {
    id: 'localizzazione-food-truck',
    name: 'Localizzazione per attività itineranti',
    category: 'Siti e piattaforme',
    sector: 'Food truck',
    summary:
      'Sito e API per mostrare la posizione aggiornata di un’attività mobile.',
    problem:
      'I clienti devono poter trovare il punto vendita itinerante senza chiamare.',
    solution:
      'Sito con aggiornamento della posizione da un dispositivo autorizzato.',
    features: [
      'Mappa del punto vendita',
      'Aggiornamento controllato',
      'Sito mobile-first',
    ],
    benefit: 'Comunicare dove trovare il servizio durante gli spostamenti.',
    custom:
      'Visibilità, aggiornamento e privacy della posizione vanno configurati.',
    technologies: ['Vite', 'Express', 'TypeScript'],
    accent: 'cyan',
    demoUrl: '',
    access: '',
    demoScope:
      'Scheda descrittiva. La posizione in tempo reale non è pubblicata.',
  },
  {
    id: 'gallery-locale',
    name: 'Strumento locale per gallerie di immagini',
    category: 'Strumenti locali',
    sector: 'Gestione immagini',
    summary:
      'Selezione, anteprima e download di immagini elaborati nel browser.',
    problem:
      'Preparare una raccolta di immagini non dovrebbe richiedere di caricarle su un server.',
    solution:
      'Strumento didattico che lavora localmente sui file scelti dall’utente.',
    features: [
      'Selezione volontaria',
      'Anteprima e rimozione',
      'Download ZIP locale',
    ],
    benefit:
      'Gestire una raccolta senza inviare le immagini a un servizio remoto.',
    custom:
      'Formati, controlli e modalità di esportazione si possono adattare.',
    technologies: ['JavaScript', 'Browser API'],
    accent: 'blue',
    demoUrl: '',
    access: '',
    demoScope:
      'Scheda descrittiva. Le foto non vengono caricate o mostrate online.',
  },
  {
    id: 'gestionale-studio',
    name: 'Gestionale per studio professionale',
    category: 'Gestionali',
    sector: 'Servizi professionali',
    summary:
      'Organizzazione di clienti, appuntamenti, pratiche e attività amministrative.',
    problem:
      'Documenti, scadenze e appuntamenti devono restare collegati alle pratiche.',
    solution:
      'Applicazione web con autenticazione e aree di gestione dedicate.',
    features: [
      'Clienti e appuntamenti',
      'Pratiche e scadenze',
      'Amministrazione',
    ],
    benefit: 'Raccogliere il lavoro dello studio in un flusso più ordinato.',
    custom:
      'Ruoli, moduli e dati vanno adattati con attenzione alla riservatezza.',
    technologies: ['React', 'Express', 'JavaScript'],
    accent: 'violet',
    demoUrl: '',
    access: '',
    demoScope:
      'Scheda descrittiva. Pratiche e dati personali reali sono esclusi.',
  },
  {
    id: 'gestionale-veicoli',
    name: 'Gestionale per veicoli e officina',
    category: 'Gestionali',
    sector: 'Gestione veicoli',
    summary:
      'Strumenti per coordinare veicoli, attività e documenti operativi.',
    problem:
      'Anagrafiche, manutenzioni e documenti si disperdono tra strumenti separati.',
    solution:
      'Applicazione gestionale con moduli per dati e operazioni quotidiane.',
    features: [
      'Anagrafiche veicoli',
      'Gestione attività',
      'Documenti ed esportazioni',
    ],
    benefit: 'Avere una base unica per consultare il lavoro operativo.',
    custom: 'Moduli, permessi e documenti dipendono dall’organizzazione.',
    technologies: ['Python', 'Flask', 'SQLite'],
    accent: 'green',
    demoUrl: '',
    access: '',
    demoScope:
      'Scheda descrittiva. Non include dati, documenti o accessi aziendali.',
  },
  {
    id: 'gestionale-impianti',
    name: 'Gestionale per cantieri e impianti',
    category: 'Gestionali',
    sector: 'Impianti e cantieri',
    summary:
      'Cantieri, inventario, mezzi, personale e documenti in un gestionale.',
    problem: 'Attività sul campo, scadenze e costi devono restare tracciabili.',
    solution: 'Applicazione web con moduli amministrativi e operativi.',
    features: [
      'Cantieri e inventario',
      'Mezzi e personale',
      'Scadenze e rapportini',
    ],
    benefit:
      'Seguire le attività di commessa e il materiale da un unico posto.',
    custom: 'Ruoli, moduli e documenti si definiscono per l’azienda.',
    technologies: ['Python', 'Flask', 'SQLite'],
    accent: 'blue',
    demoUrl: '',
    access: '',
    demoScope: 'Scheda descrittiva. Dati e documenti aziendali sono esclusi.',
  },
  {
    id: 'onboarding-finanziario',
    name: 'Interfaccia guidata per onboarding finanziario',
    category: 'AI e automazioni',
    sector: 'Onboarding digitale',
    summary:
      'Esperienza guidata con funzioni vocali e video per percorsi online.',
    problem:
      'Un percorso con molti passaggi deve restare chiaro e facile da seguire.',
    solution:
      'Interfaccia web con componenti vocali e sessioni browser controllate.',
    features: ['Percorso guidato', 'Interfaccia vocale', 'Browser isolato'],
    benefit: 'Rendere più leggibile un flusso digitale articolato.',
    custom:
      'Provider, informative, requisiti e limiti vanno verificati per ogni servizio.',
    technologies: ['Node.js', 'Express', 'WebRTC'],
    accent: 'violet',
    demoUrl: '',
    access: '',
    demoScope:
      'Scheda descrittiva. Non apre conti, non tratta credenziali finanziarie e non fornisce consulenza.',
  },
  {
    id: 'gestionale-moto',
    name: 'Gestionale concessionaria moto',
    category: 'Gestionali',
    sector: 'Vendita e assistenza moto',
    summary: 'ERP e vetrina per coordinare veicoli, attività e clienti.',
    problem:
      'Vendita, assistenza e comunicazioni devono condividere dati aggiornati.',
    solution:
      'Applicazione gestionale con vetrina collegata e moduli operativi.',
    features: ['Catalogo veicoli', 'Gestione attività', 'Vetrina pubblica'],
    benefit: 'Collegare il catalogo online con il lavoro interno.',
    custom:
      'Veicoli, ruoli, documenti e integrazioni si configurano per il concessionario.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL'],
    accent: 'cyan',
    demoUrl: '',
    access: '',
    demoScope: 'Scheda descrittiva. Dati e marchi del cliente sono esclusi.',
  },
  {
    id: 'registrazione-guidata',
    name: 'Percorso guidato di registrazione',
    category: 'Siti e piattaforme',
    sector: 'Onboarding digitale',
    summary: 'Landing mobile-first con guide e un percorso web assistito.',
    problem:
      'Moduli esterni e istruzioni diverse rendono difficile seguire la procedura.',
    solution:
      'Interfaccia web con contenuti guidati e browser remoto controllato.',
    features: [
      'Guide passo per passo',
      'Layout mobile-first',
      'Controlli del browser remoto',
    ],
    benefit:
      'Mantenere il contesto mentre si seguono i passaggi di un servizio.',
    custom:
      'Destinazioni, informative e misure di sicurezza richiedono verifica specifica.',
    technologies: ['Node.js', 'Playwright', 'WebSocket'],
    accent: 'blue',
    demoUrl: '',
    access: '',
    demoScope:
      'Scheda descrittiva. Non invia registrazioni né tratta dati o credenziali di terzi.',
  },
  {
    id: 'analisi-documentale',
    name: 'Consultazione di documentazione tecnica',
    category: 'Strumenti locali',
    sector: 'Documentazione',
    summary:
      'Interfaccia web statica per consultare documenti e materiali tecnici.',
    problem:
      'Una raccolta articolata di documenti richiede navigazione e ricerca leggibili.',
    solution: 'Pagine web organizzate per esplorare contenuti e allegati.',
    features: [
      'Pagine tematiche',
      'Consultazione degli allegati',
      'Navigazione tra documenti',
    ],
    benefit: 'Rendere più chiara la consultazione di una raccolta documentale.',
    custom:
      'Struttura, accessi e contenuti vanno configurati in base alla riservatezza.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    accent: 'green',
    demoUrl: '',
    access: '',
    demoScope:
      'Scheda descrittiva. Nessun report o allegato originale è pubblicato.',
  },
];
export const categories = [
  'Tutti',
  'Gestionali',
  'Siti e piattaforme',
  'AI e automazioni',
  'Strumenti locali',
];
export const nativePreviews = import.meta.env.VITE_NATIVE_PREVIEWS === '1';
export const demoHref = (project: Project) =>
  project.demoUrl || `${import.meta.env.BASE_URL}projects/${project.id}/demo/`;
