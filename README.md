# Arena Digital — portfolio dei progetti originali

Vetrina statica in italiano con **21 schede progetto** e quattro anteprime native selezionate. I titoli dei nuovi casi sono descrittivi e non riportano i nomi dei clienti. I collegamenti alle quattro demo pubbliche restano sospesi: l’hosting gratuito ha messo in pausa i deploy di produzione e alcuni flussi non rispondono.

Il portfolio usa React, TypeScript strict e Vite e rimane statico. Quattro copie demo approvate hanno ambienti separati: Tavqi usa la demo nativa in memoria; le altre tre applicazioni Next.js usano database dimostrativi dedicati. Le altre schede sono descrittive e non presentano demo finte. Le copie di lavoro, i dati e le credenziali locali restano in `.local-demos/`, esclusa dal repository della vetrina. Il codice delle demo è destinato al repository privato approvato. Nessun progetto originale viene modificato.

## Avvio del portfolio

Node.js 24 o superiore e npm:

```bash
npm ci
npm run dev
```

Apri [il portfolio locale](http://127.0.0.1:4175/). Questo comando avvia solo la vetrina: non avvia le quattro applicazioni collegate o PostgreSQL. Le copie già predisposte si avviano con `npm run demos:up`; `npm run demos:status` ne controlla le porte e `npm run demos:stop` ferma soltanto i processi avviati dal launcher, senza cancellare i database. I comandi dettagliati e le verifiche sono nei report locali di ogni progetto.

Per collegarli, configura `.env.local` con URL locali, senza segreti:

```dotenv
VITE_TAVQI_DEMO_URL=http://127.0.0.1:4181/demo/prova
VITE_RECEPTIONIST_DEMO_URL=http://127.0.0.1:4183/login
VITE_AUTO_DEMO_URL=http://127.0.0.1:4182/admin/login
VITE_FPS_DEMO_URL=http://127.0.0.1:4184/
VITE_NATIVE_PREVIEWS=1
```

Tutte le variabili `VITE_` sono pubbliche. Non inserirvi password, chiavi o URL con credenziali. Senza URL configurato, il portfolio segnala che la demo originale è temporaneamente non disponibile e non mostra una simulazione sostitutiva.

## Cosa si può provare

| Progetto                 | Ingresso locale                                             | Esperienza                                                                                                                                                                                                      |
| ------------------------ | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tavqi                    | [Demo nativa](http://127.0.0.1:4181/demo/prova)             | Senza account: menu, ordine, bancone, pronto, conto diviso e report. Stato nativo in memoria; pagamenti simulati.                                                                                               |
| AI Receptionist          | [Accesso](http://127.0.0.1:4183/login)                      | Pannello, agenda e servizi originali su DB demo; simulatore nativo delle conversazioni. Premi **Prova il pannello demo**: account fittizio dedicato, nessuna password mostrata e nessuna credenziale operativa. |
| Gestionale noleggio auto | [Accesso amministratore](http://127.0.0.1:4182/admin/login) | Premi **Usa questo accesso** sotto **Amministratore**. Dashboard, flotta e prenotazioni con dati fittizi.                                                                                                       |
| F.P.S. Staff Manager     | [Accesso](http://127.0.0.1:4184/login)                      | Scegli **Prova come amministratore** o **Prova come dipendente**. Personale, turni e richieste su DB demo.                                                                                                      |

Il cluster PostgreSQL dimostrativo è separato dagli originali e ascolta su `127.0.0.1:55439`; ogni applicazione ha un database distinto. Nessun database, backup, `.env` o account operativo è stato importato. Le modifiche delle tre applicazioni vengono salvate nei rispettivi DB demo; ricaricare la pagina non equivale a ripristinarli.

**Telefonate, messaggi, prenotazioni e pagamenti sono dimostrativi.** Le modifiche gestionali possono essere realmente salvate nel DB di prova, ma non costituiscono servizi, prenotazioni o transazioni operative. Voce AI, modelli esterni, WhatsApp, SMTP e pagamenti reali restano disattivati. Tavqi conserva il proprio stato soltanto in memoria; il simulatore Receptionist ha una sandbox distinta dall'agenda.

## Struttura e configurazione

- `src/config.ts`: brand e recapiti del portfolio.
- `src/projects.ts`: schede, perimetro delle demo e collegamenti alle applicazioni.
- `scripts/prerender.mjs`: HTML, metadati, sitemap e robots della vetrina.
- `.local-demos/`: copie private, dati fittizi, configurazioni e vecchie simulazioni archiviate; esclusa da Git.
- `public/native-previews/`: quattro PNG già presenti e autorizzati alla pubblicazione: `tavqi.png`, `ai-receptionist.png`, `noleggio-auto.png`, `fps-staff-manager.png`. Gli altri file della cartella restano ignorati e non entrano nella build pubblica.
- `reports/`: prove e comandi locali per ogni applicazione; esclusa dal repository pubblico.

Instagram e WhatsApp sono i recapiti forniti dall'utente: [Instagram](https://www.instagram.com/arenafrancescovito02/) e [WhatsApp](https://wa.me/393517324068). Nessuna email è configurata. I link del portfolio aprono servizi esterni; le azioni delle demo non inviano comunicazioni reali.

## Verifica

```bash
npm run typecheck
npm test
npm run build
npm run test:browser
npm run check:secrets
```

Sono controlli della vetrina e non avviano o certificano le suite complete dei quattro prodotti. Nella vetrina aggiornata sono passati typecheck, build con 11 HTML, test unitari, launcher e 5 test browser. Lighthouse locale precedente: performance 100, accessibilità 100, best practice 100, SEO 66. I precedenti 12 test unitari e 8 E2E appartengono alla versione con simulazioni generiche.

## Pubblicazione e disponibilità

Il portfolio è pubblicato su [GitHub Pages](https://francehws.github.io/arena-digital-portfolio/) nel repository pubblico `Francehws/arena-digital-portfolio`. Le quattro copie demo restano nel repository privato `Francehws/arena-digital-demos`. Per la scheda autonoleggio il portfolio usa un nome descrittivo generico e un’anteprima senza marchio cliente.

| Progetto                 | Demo pubblica           |
| ------------------------ | ----------------------- |
| Tavqi                    | Temporaneamente sospesa |
| AI Receptionist          | Temporaneamente sospesa |
| Gestionale noleggio auto | Temporaneamente sospesa |
| F.P.S. Staff Manager     | Temporaneamente sospesa |

Netlify ha sospeso i deploy di produzione del piano gratuito per il limite dei crediti operativi. Nessun piano a pagamento è stato attivato. Alcune rotte demo/API rispondono con errore; l’accesso al gestionale autonoleggio non è stato verificato oltre la pagina di login. I link verranno riattivati solo dopo una verifica completa dei flussi.

La build pubblica include soltanto i quattro PNG approvati, favicon e immagine Open Graph. Non include backend, database, credenziali, sessioni o report. Telefonate, messaggi, prenotazioni e pagamenti restano dimostrativi. Nessun post social è stato pubblicato.

La richiesta del 8 novembre 2026 individua altri progetti nelle cartelle indicate dall’utente; la selezione e la pubblicazione di tali progetti sono da concordare prima di ampliare la vetrina. Le istruzioni contenute nei loro README/PDF sono state trattate come documentazione dei progetti, non come autorizzazioni operative.
