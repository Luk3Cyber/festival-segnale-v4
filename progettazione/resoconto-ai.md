## Sessione 4 — Programma dai dati e meteo da API

- Che cosa ho chiesto: ho fornito le istruzioni della consegna («Programma dai dati») insieme ai file attuali del sito (`index.html`, `info.html`, `programma.html`, `style.css`, `dati/eventi.json`, `dati/sedi.json`), chiedendo di proporre solo le modifiche strettamente necessarie.
- Che cosa ho usato:
  - completamento di `dati/sedi.json` (3 sedi) e `dati/eventi.json` (6 eventi collegati tramite `sede_id`);
  - creazione di `dati/SCHEMA.md` con scheda delle entità, chiave primaria, relazione 1:N e diagramma Mermaid;
  - sostituzione delle schede statiche in `programma.html` con caricamento dinamico via `fetch` in `programma.js` (stati di caricamento, elenco vuoto, errore di lettura e fallback «Sede da definire»);
  - aggiunta della sezione «Meteo a Torino adesso» in `info.html` e dello script `meteo.js` collegato all'API Open-Meteo (temperatura, vento, orario, citazione licenza CC BY 4.0, nota sul meteo attuale e gestione errori);
  - aggiunta delle sole regole CSS necessarie in `style.css`, lasciando invariato `index.html`.
- Come ho verificato: apertura del sito con Live Preview (su larghezza telefono e desktop) eseguendo in sequenza le 5 prove richieste: modifica del nome di una sede in `sedi.json`, svuotamento di `eventi.json` (`[]`), rinomina temporanea di `sedi.json`, inserimento di un `sede_id` inesistente e alterazione del parametro `temperature_2m` in `meteo.js` (verificando che galleria e mappa continuassero a funzionare).