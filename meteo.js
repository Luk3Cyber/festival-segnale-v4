const meteoBox = document.getElementById('meteo-box');
const URL_METEO =
  'https://api.open-meteo.com/v1/forecast?latitude=45.0703&longitude=7.6869&current=temperature_2m,wind_speed_10m&timezone=Europe%2FRome';

function formattaOra(dataOraIso) {
  const data = new Date(dataOraIso);
  if (Number.isNaN(data.getTime())) {
    return dataOraIso;
  }
  return new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  }).format(data);
}

async function caricaMeteo() {
  try {
    const risposta = await fetch(URL_METEO);
    if (!risposta.ok) {
      throw new Error('Risposta non valida dal servizio meteo.');
    }

    const dati = await risposta.json();
    const attuale = dati.current;

    if (
      !attuale ||
      typeof attuale.temperature_2m !== 'number' ||
      typeof attuale.wind_speed_10m !== 'number' ||
      !attuale.time
    ) {
      throw new Error('Dati meteo incompleti.');
    }

    const unitaTemp = dati.current_units?.temperature_2m || '°C';
    const unitaVento = dati.current_units?.wind_speed_10m || 'km/h';

    const lista = document.createElement('dl');
    lista.className = 'weather-data';

    const voci = [
      ['Temperatura', `${attuale.temperature_2m} ${unitaTemp}`],
      ['Vento', `${attuale.wind_speed_10m} ${unitaVento}`],
      ['Aggiornamento', formattaOra(attuale.time)]
    ];

    for (const [etichetta, valore] of voci) {
      const item = document.createElement('div');
      const dt = document.createElement('dt');
      dt.textContent = etichetta;
      const dd = document.createElement('dd');
      dd.textContent = valore;
      item.append(dt, dd);
      lista.append(item);
    }

    meteoBox.replaceChildren(lista);
  } catch (errore) {
    const msg = document.createElement('p');
    msg.className = 'status-message';
    msg.textContent = 'Impossibile caricare il meteo in questo momento.';
    meteoBox.replaceChildren(msg);
  }
}

caricaMeteo();