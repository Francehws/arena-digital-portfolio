# Arena Digital — portfolio dei progetti originali

Vetrina in italiano che presenta **Tavqi, AI Receptionist, Auto Manhattan e F.P.S. Staff Manager** e apre le loro applicazioni originali in ambienti demo separati, configurabili per la prova locale e per la pubblicazione autorizzata. Le quattro precedenti simulazioni generiche sono state rimosse dal bundle e conservate soltanto in `.local-demos/previous-simulations/`.

Il portfolio usa React, TypeScript strict e Vite e rimane statico. Le applicazioni collegate hanno un ciclo di avvio distinto: Tavqi usa la propria demo nativa in memoria; le altre tre applicazioni Next.js usano tre database dimostrativi nuovi. Le copie di lavoro, i dati e le credenziali locali restano in `.local-demos/`, esclusa dal repository della vetrina. Il codice delle demo è destinato al repository privato approvato. Nessun progetto originale viene modificato.

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
VITE_FPS_DEMO_URL=http://127.0.0.1:4184/login
VITE_NATIVE_PREVIEWS=1
```

Tutte le variabili `VITE_` sono pubbliche. Non inserirvi password, chiavi o URL con credenziali. Senza URL configurato, il portfolio segnala che la demo originale deve essere collegata e non mostra una simulazione sostitutiva.

## Cosa si può provare

| Progetto             | Ingresso locale                                             | Esperienza                                                                                                                                                                                                      |
| -------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tavqi                | [Demo nativa](http://127.0.0.1:4181/demo/prova)             | Senza account: menu, ordine, bancone, pronto, conto diviso e report. Stato nativo in memoria; pagamenti simulati.                                                                                               |
| AI Receptionist      | [Accesso](http://127.0.0.1:4183/login)                      | Pannello, agenda e servizi originali su DB demo; simulatore nativo delle conversazioni. Premi **Prova il pannello demo**: account fittizio dedicato, nessuna password mostrata e nessuna credenziale operativa. |
| Auto Manhattan       | [Accesso amministratore](http://127.0.0.1:4182/admin/login) | Premi **Usa questo accesso** sotto **Amministratore**. Dashboard, flotta e prenotazioni con dati fittizi.                                                                                                       |
| F.P.S. Staff Manager | [Accesso](http://127.0.0.1:4184/login)                      | Scegli **Prova come amministratore** o **Prova come dipendente**. Personale, turni e richieste su DB demo.                                                                                                      |

Il cluster PostgreSQL dimostrativo è separato dagli originali e ascolta su `127.0.0.1:55439`; ogni applicazione ha un database distinto. Nessun database, backup, `.env` o account operativo è stato importato. Le modifiche delle tre applicazioni vengono salvate nei rispettivi DB demo; ricaricare la pagina non equivale a ripristinarli.

**Telefonate, messaggi, prenotazioni e pagamenti sono dimostrativi.** Le modifiche gestionali possono essere realmente salvate nel DB di prova, ma non costituiscono servizi, prenotazioni o transazioni operative. Voce AI, modelli esterni, WhatsApp, SMTP e pagamenti reali restano disattivati. Tavqi conserva il proprio stato soltanto in memoria; il simulatore Receptionist ha una sandbox distinta dall'agenda.

## Struttura e configurazione

- `src/config.ts`: brand e recapiti del portfolio.
- `src/projects.ts`: schede, perimetro delle demo e collegamenti alle applicazioni.
- `scripts/prerender.mjs`: HTML, metadati, sitemap e robots della vetrina.
- `.local-demos/`: copie private, dati fittizi, configurazioni e vecchie simulazioni archiviate; esclusa da Git.
- `public/native-previews/`: quattro PNG già presenti e autorizzati alla pubblicazione: `tavqi.png`, `ai-receptionist.png`, `auto-manhattan.png`, `fps-staff-manager.png`. Gli altri file della cartella restano ignorati e non entrano nella build pubblica.
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

Sono controlli della vetrina e non avviano o certificano le suite complete dei quattro prodotti. Nella vetrina aggiornata sono passati typecheck, build con 11 HTML, 3 test unitari di configurazione più una prova del launcher e 5 nuovi test browser. Gli esiti delle demo originali sono riportati nei report locali. Lighthouse locale della versione attuale: performance 100, accessibilità 100, best practice 100, SEO 66; l’indicizzazione è volutamente disattivata finché manca l’URL pubblico. I precedenti 12 test unitari e 8 E2E appartengono alla versione con simulazioni generiche.

## Pubblicazione e diritti

Il 7 novembre 2026 l’utente ha approvato entrambi i repository e confermato di poter autorizzare codice, interfacce, marchi e materiali dei quattro progetti:

| Repository                          | Visibilità | Contenuti autorizzati                                                                               |
| ----------------------------------- | ---------- | --------------------------------------------------------------------------------------------------- |
| `Francehws/arena-digital-portfolio` | Pubblico   | Vetrina statica, file pubblici selezionati e quattro anteprime native approvate                     |
| `Francehws/arena-digital-demos`     | Privato    | Copie demo autorizzate; nessun `.env`, credenziale, database, sessione, backup o log nel repository |

La pubblicazione gratuita è in preparazione; questo documento non attesta ancora un deploy riuscito o indirizzi funzionanti. Le destinazioni approvate da verificare sono:

| Ambiente             | Destinazione                                                         |
| -------------------- | -------------------------------------------------------------------- |
| Portfolio            | [GitHub Pages](https://francehws.github.io/arena-digital-portfolio/) |
| Tavqi                | [Demo](https://arena-tavqi-demo.netlify.app/demo/prova)              |
| Auto Manhattan       | [Demo](https://arena-auto-demo.netlify.app/admin/login)              |
| AI Receptionist      | [Demo](https://arena-receptionist-demo.netlify.app/login)            |
| F.P.S. Staff Manager | [Demo](https://arena-fps-demo.netlify.app/login)                     |

Il workflow Pages distribuisce solo la vetrina statica e usa `BASE_PATH=/arena-digital-portfolio/`, `SITE_URL` corrispondente e `VITE_NATIVE_PREVIEWS=1`. Le quattro applicazioni Next.js richiedono ambienti separati; tre usano anche PostgreSQL dedicato alla demo. Il codice delle demo resta nel repository privato, con interfacce accessibili ai visitatori dopo il deploy.

La build pubblica richiede URL HTTPS effettivi delle quattro demo e continua a rifiutare indirizzi locali, privati o di prova. Copia soltanto favicon, OG e i quattro PNG nominati esplicitamente; altri contenuti di `public/`, report interni e immagini non approvate restano esclusi. Il repository pubblico nasce da un’esportazione selezionata con nuova storia, senza i documenti interni della storia locale.

Restano da completare e verificare deploy, accessi pubblici e comportamento sull’hosting. Non attivare servizi a pagamento o integrazioni operative dei clienti. Nessuna licenza open source è concessa automaticamente. I materiali marketing delle simulazioni precedenti sono superati; le nuove bozze attendono gli URL pubblici verificati.
