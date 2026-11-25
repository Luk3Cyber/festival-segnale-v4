# Schema dati — Segnale

## 1. Entità
- Evento (`dati/eventi.json`): gli appuntamenti del programma del festival.
- Sede (`dati/sedi.json`): i luoghi che ospitano gli appuntamenti.

## 2. Campi delle entità

### Evento
| Campo | Tipo | Esempio |
| --- | --- | --- |
| `id` | numero | `1` |
| `titolo` | stringa | `"Lettere in movimento"` |
| `data` | stringa (ISO `YYYY-MM-DD`) | `"2026-06-12"` |
| `orario` | stringa (`HH:MM`) | `"10:00"` |
| `categoria` | stringa | `"Incontro"` |
| `descrizione` | stringa | `"Come cambia un messaggio quando cambiano le lettere?..."` |
| `immagine` | stringa (percorso relativo) | `"assets/lettere-in-movimento.svg"` |
| `immagine_alt` | stringa | `"Lettere geometriche disposte su una griglia"` |
| `sede_id` | numero | `1` |

### Sede
| Campo | Tipo | Esempio |
| --- | --- | --- |
| `id` | numero | `1` |
| `nome` | stringa | `"Officina Nord — Sede centrale"` |
| `indirizzo` | stringa | `"Corso Duca degli Abruzzi 24, Torino"` |

## 3. Chiave primaria
Per entrambe le entità la chiave primaria è `id`: un valore numerico, univoco all'interno della propria entità e stabile nel tempo (non cambia anche se variano altri campi o vengono eliminati altri record).

## 4. Relazione
Relazione uno-a-molti (1:N) tra `Sede` ed `Evento`: una sede può ospitare più eventi, mentre ogni evento si svolge in una sola sede. Il collegamento avviene tramite `Evento.sede_id`, che fa riferimento a `Sede.id`.

## 5. Quantità
- 6 eventi in `dati/eventi.json`
- 3 sedi in `dati/sedi.json`

## 6. Aggiornamento dei dati
I dati vengono aggiornati dall'autore del sito modificando i file `dati/eventi.json` e `dati/sedi.json` nella repository Git e pubblicando la versione aggiornata.

## 7. Che cosa mostra la pagina
La pagina `programma.html` legge i due file JSON tramite `fetch` e genera dinamicamente le schede degli appuntamenti, mostrando per ciascuno immagine, data formattata, orario, categoria, titolo, descrizione e nome della sede ricavato da `sedi.json` (oppure «Sede da definire» se `sede_id` non corrisponde ad alcuna sede). Gestisce inoltre gli stati di caricamento, elenco vuoto ed errore di lettura.

## Schema Evento–Sede

```mermaid
erDiagram
    SEDE ||--o{ EVENTO : ospita
    SEDE {
        number id PK
        string nome
        string indirizzo
    }
    EVENTO {
        number id PK
        string titolo
        string data
        string orario
        string categoria
        string descrizione
        string immagine
        string immagine_alt
        number sede_id FK
    }