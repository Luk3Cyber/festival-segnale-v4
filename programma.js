const statoProgramma = document.getElementById('stato-programma');
const listaEventi = document.getElementById('lista-eventi');

function formattaData(dataIso) {
  const data = new Date(`${dataIso}T00:00:00`);
  if (Number.isNaN(data.getTime())) {
    return dataIso;
  }
  const testo = new Intl.DateTimeFormat('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(data);
  return testo.charAt(0).toUpperCase() + testo.slice(1);
}

function creaSchedaEvento(evento, nomeSede) {
  const card = document.createElement('article');
  card.className = 'event-card';

  const img = document.createElement('img');
  img.src = evento.immagine;
  img.alt = evento.immagine_alt;
  img.width = 900;
  img.height = 600;

  const body = document.createElement('div');
  body.className = 'event-body';

  const meta = document.createElement('p');
  meta.className = 'event-meta';
  meta.textContent = `${formattaData(evento.data)} · ${evento.orario} · ${evento.categoria}`;

  const titolo = document.createElement('h3');
  titolo.textContent = evento.titolo;

  const descrizione = document.createElement('p');
  descrizione.textContent = evento.descrizione;

  const luogo = document.createElement('p');
  luogo.className = 'event-place';
  const etichettaSede = document.createElement('strong');
  etichettaSede.textContent = 'Sede: ';
  luogo.append(etichettaSede, document.createTextNode(nomeSede));

  body.append(meta, titolo, descrizione, luogo);
  card.append(img, body);
  return card;
}

async function caricaProgramma() {
  statoProgramma.textContent = 'Caricamento del programma in corso…';
  statoProgramma.hidden = false;

  try {
    const [rispostaEventi, rispostaSedi] = await Promise.all([
      fetch('dati/eventi.json'),
      fetch('dati/sedi.json')
    ]);

    if (!rispostaEventi.ok || !rispostaSedi.ok) {
      throw new Error('Impossibile leggere i file dei dati.');
    }

    const [eventi, sedi] = await Promise.all([
      rispostaEventi.json(),
      rispostaSedi.json()
    ]);

    if (!Array.isArray(eventi) || eventi.length === 0) {
      statoProgramma.textContent = 'Al momento non ci sono eventi in programma.';
      return;
    }

    const sediPerId = new Map(sedi.map((sede) => [sede.id, sede]));
    const frammento = document.createDocumentFragment();

    for (const evento of eventi) {
      const sede = sediPerId.get(evento.sede_id);
      const nomeSede = sede ? sede.nome : 'Sede da definire';
      frammento.append(creaSchedaEvento(evento, nomeSede));
    }

    listaEventi.append(frammento);
    statoProgramma.hidden = true;
  } catch (errore) {
    statoProgramma.textContent = 'Impossibile caricare il programma. Riprova più tardi.';
  }
}

caricaProgramma();