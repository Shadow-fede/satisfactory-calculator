# ⚙️ Satisfactory Production Calculator (FICSIT Edition)

Un calcolatore e pianificatore di produzione per **Satisfactory 1.0 / 1.2.3.1**, ispirato a [satisfactorycalculator.net](https://satisfactorycalculator.net/) e arricchito con **icone originali del gioco in alta definizione (256px)** e ricette ufficiali aggiornate.

---

## 🎨 Icone Originali del Gioco in HD
Tutti gli oggetti, componenti, risorse grezze e macchinari di Satisfactory sono ora renderizzati con i rendering grafici originali ufficiali (256px) con ombreggiatura e fallback offline integrato. Le icone sono presenti:
- Nel selettore principale dell'oggetto e nei preset rapidi.
- Nella finestra modale di ricerca e selezione.
- Nei nodi del **Production Tree** e nei badge dei macchinari.
- All'interno dei nodi vettoriali del **Production Graph**.
- Nella tabella dei macchinari e nel riepilogo delle risorse grezze.

---

## 🔄 Ricette Aggiornate alla Versione 1.2.3.1 (1.0+)
Sono state revisionate e corrette tutte le ricette standard e alternative in base ai dati ufficiali di Satisfactory:
- **Computer Standard**: rimosse completamente le viti! Nuova ricetta 1.0: *4 Circuit Board + 8 Cable + 16 Plastic* (10 CB, 20 Cable, 40 Plastic / min).
- **Computer Alternativi**: aggiornati *Caterium Computer* (15 CB + 52.5 QW + 22.5 Rubber / min) e *Crystal Computer* (5 CB + 1.67 Crystal Oscillator / min in Assemblatore).
- **Heavy Modular Frame (Standard & Alternativi)**: standard aggiornato a 10 MF, 40 Steel Pipe, 10 EIB, 240 Screw / min; *Heavy Flexible Frame* aggiornato a 18.75 MF, 11.25 EIB, 75 Rubber, 390 Screw.
- **Turbo Motore**: standard aggiornato con *Cooling System* e *Rubber* (senza più Rotori e ECR nella standard!).
- **Generatore di Campo Magnetico (Magnetic Field Generator)**: convertito in **Assemblatore** (1.0), senza più richiesta di batterie!
- **Unità di Controllo Adattiva (Adaptive Control Unit)**: ribilanciata con valori dimezzati e ciclo a 60s (5 Automated Wiring + 5 CB + 1 HMF + 2 Computer).
- **Razzo a Propulsione Termica (Thermal Propulsion Rocket)**: ribilanciato per 1.0 (2.5 Modular Engine + 1 Turbo Motor + 1 Fused Modular Frame + 3 Cooling System).
- **Pasta Nucleare (Nuclear Pasta)**: portata corretta a 100 Copper Powder + 0.5 PCC per 0.5 Nuclear Pasta / min.
- **Piastre di Ferro**: introdotta la nuova alternativa *Steel Cast Plate* in Fonderia e aggiornata *Coated Iron Plate* (37.5 Iron Ingot + 7.5 Plastic -> 75 Plate).
- **Lega di Rame (Copper Alloy Ingot)**: rapporto corretto a 1:1 (50 Copper Ore + 50 Iron Ore -> 100 Ingot).
- **Rigor Motor**: ricetta 1.0 in Produttore con Oscillatore a Cristallo.
- **Dispositivo di Raffreddamento (Cooling Device)**: spostato nel Miscelatore (Blender) con Gas Azoto.
- **Batteria Classica**: ricetta 1.0 con Zolfo grezzo e Lastre Alclad.

---

## 🚀 Caratteristiche Principali

1. **Selezione Libera dell'Oggetto da Craftare & Tasso di Produzione**:
   - Ricerca istantanea e filtri per categoria (Componenti Base, Acciaio, Elettronica, Petrolchimici, Alluminio, Progetti Ascensore Spaziale).
   - Impostazione del rate desiderato (es. 2/min, 10/min, 60/min) con controlli rapidi (`+1`, `+5`, `10`, `30`, `60`).
   - Preset veloci salvati per progetti iconici (Heavy Modular Frame, Computer, Motori, Turbo Motori, Pasta Nucleare, ecc.).

2. **Gestione Completa delle Ricette Alternative (Alternate Recipes)**:
   - Per **ogni singolo oggetto intermedio o finale** della catena produttiva, è possibile selezionare la variante di crafting desiderata (Ricetta Standard o Ricette Alternative sbloccate tramite Hard Drive / Dischi Fissi).
   - Il selettore è disponibile **direttamente su ciascun nodo** dell'Albero di Produzione e nel Grafo di Produzione.
   - Modificando una variante (es. Viti fuse al posto di quelle standard da tondino, o Piastra cucita con filo di rame anziché con le viti), l'intera catena e i relativi ingredienti si ricalcolano **istantaneamente in tempo reale**.
   - Pulsante dedicato per ripristinare tutte le ricette standard in un click.

3. **Elenco dei Macchinari Arrotondati per Eccesso (`Ceiling`)**:
   - Mostra sia il valore decimale esatto (es. `2.40` macchine) sia il **numero intero effettivo di macchinari da costruire arrotondato per eccesso** (`➔ 3 Costruttori`).
   - Dettaglio sul carico / clock speed della linea (es. 2 macchine al 100% + 1 al 40%).
   - Consumo energetico calcolato al carico effettivo (MW esatti) e al picco massimo teorico delle macchine installate.
   - Riepilogo delle Risorse Grezze (minerale di ferro, carbone, bauxite, greggio, acqua, ecc.) e calcolo delle trivelle/estrattori necessari (Mk.1, Mk.2 a nodo normale, Mk.3, Estrattori d'acqua).

4. **Doppia Visualizzazione: Production Tree & Production Graph**:
   - **Production Tree (Albero Gerarchico)**:
     - Vista a schede multilivello che mostra la catena dal prodotto finito alle materie prime.
     - Pulsanti per espandere e contrarre i rami.
     - Badge evidenziati per il numero di macchinari arrotondati.
   - **Production Graph (Diagramma di Flusso Interattivo)**:
      - **Modalità a Schermo Intero (Fullscreen)**: visualizzazione a tutto schermo con pulsante dedicato o scorciatoia da tastiera (F per attivare/disattivare, Esc per uscire).
     - Grafo a nodi SVG con flusso da sinistra a destra (materie prime ➔ semilavorati ➔ prodotto finito).
     - Pan & Zoom fluido (trascinamento dello sfondo e rotellina del mouse, oltre a pulsanti `+`, `-`, `100%`, `Adatta`).
     - Nodi trascinabili liberamente per riordinare il layout della fabbrica a piacimento.
     - Frecce di connessione Bezier con badge che indicano la portata degli oggetti al minuto (`es. 60/m`).
     - Evidenziazione interattiva: al passaggio del mouse su un nodo vengono illuminati tutti i flussi in entrata e in uscita.

5. **Logistica Avanzata delle Trivelle & Nastri Trasportatori (Mk.1 - Mk.6)**:
   - **Livello Trivella**: Configura le trivelle su **Mk.1** (60/m base), **Mk.2** (120/m base) o **Mk.3** (240/m base).
   - **Purezza dei Nodi**: Imposta la purezza globale o **singolarmente per ciascuna risorsa grezza** (Impura ×0.5, Normale ×1.0, Pura ×2.0).
   - **Capacità dei Nastri Trasportatori (Belts Mk.1 - Mk.6)**: Scegli il livello dei nastri (da Mk.1 da 60/m fino al **Nastro Mk.6 da 1200/m** introdotto in Satisfactory 1.0). Se l'estrazione o la linea supera la capacità del nastro selezionato, il calcolatore mostra un badge di avviso e calcola quanti nastri paralleli sono necessari!

6. **Overclock con Frammenti Energetici (Power Shards)**:
   - Regola il clock rate al **100%**, **150% (1 Frammento 💎)**, **200% (2 Frammenti 💎)** o **250% (3 Frammenti 💎)**.
   - Può essere impostato **globalmente** per tutta la fabbrica oppure **singolarmente su ogni ricetta** direttamente nei nodi dell'albero o del grafo.
   - Include il calcolo esatto della formula di potenza di Satisfactory 1.0:
     $$P = P_{\text{base}} \times \left(\frac{\text{Clock}}{100}\right)^{1.321928}$$
   - Mostra il conteggio complessivo dei Frammenti Energetici necessari nel riepilogo in alto e nella lista dei macchinari.

7. **Tecnologia Aliena: Amplificazione Somersloop (x2 Output)**:
   - Supporto nativo per la meccanica aliena di **Satisfactory 1.0**: inserendo le Somersloop negli edifici di produzione, la produzione dell'oggetto viene raddoppiata (**+100% Output**) a parità di consumi di ingredienti per ciclo, dimezzando di fatto sia i macchinari necessari sia la richiesta di semilavorati a monte!
   - Calcolo accurato degli slot Somersloop richiesti in base al tipo di macchinario (Costruttore: 1, Assemblatore/Raffineria/Fonderia: 2, Produttore/Blender/Acceleratore di Particelle: 4).
   - Calcolo del consumo energetico maggiorato a **4.0x** per le macchine amplificate da Somersloop.
   - Azioni rapide nella barra di controllo: attiva Somersloop solo sul target finale, su tutta la catena, o resetta in un click.
   - Effetto visivo con bagliore viola alieno nei nodi attivi.

8. **Modalità a Schermo Intero Persistente nel Grafo**:
   - Il grafo vettoriale interattivo può essere portato a tutto schermo con il pulsante dedicato o premendo `F`.
   - **Completamente persistente**: cambiare ricetta, modificare il clock speed o attivare/disattivare le Somersloop mentre sei a schermo intero **non fa uscire dalla modalità fullscreen**, garantendo un'esperienza fluida e senza interruzioni.

9. **Copia Piano di Fabbrica (Shopping List)**:
   - Un click sul pulsante "Copia Piano di Fabbrica" copia un riepilogo completo e dettagliato negli appunti: macchinari arrotondati, modificatori di clock e Somersloop, frammenti energetici totali, consumi MW, trivelle, purezze e nastri necessari.

---

## 🛠️ Come Avviare l'Applicazione

### Metodo 1: Avvio con Server Locale Node.js (Consigliato)
Apri un terminale nella cartella del progetto ed esegui:
```powershell
node server.js
```
Oppure:
```powershell
npm start
```
Poi apri il browser all'indirizzo:
👉 **`http://localhost:3000`**

### Metodo 2: Apertura Diretta del File HTML
Non sono necessarie dipendenze o build esterne! Puoi fare doppio click su:
```text
C:\Users\feder\.gemini\antigravity\scratch\satisfactory-calculator\index.html
```
oppure aprirlo con qualsiasi browser moderno (Chrome, Edge, Firefox).

---

## 📂 Struttura del Progetto

```text
satisfactory-calculator/
├── index.html           # Interfaccia grafica principale FICSIT
├── server.js            # Server HTTP leggero zero-dependency in Node.js
├── package.json         # Configurazione pacchetto e script
├── README.md            # Questa documentazione
├── assets/
│   └── images/
│       ├── items/       # 75 texture originali in alta risoluzione degli oggetti di Satisfactory 1.0
│       └── buildings/   # 12 texture originali dei macchinari di produzione
├── css/
│   └── styles.css       # Stili a tema industriale FICSIT (Dark mode, glow, responsive)
├── data/
│   └── gameData.js      # Database oggetti, ricette standard/alternative e macchine (1.0)
└── js/
    ├── calculator.js    # Motore di calcolo gerarchico, DAG, aggregazione e arrotondamenti
    ├── treeView.js      # Renderer dell'albero di produzione interattivo
    ├── graphView.js     # Renderer SVG del grafo di produzione (Pan/Zoom/Drag)
    └── app.js           # Controller dell'applicazione, stato, modali e filtri
```

---

## 💡 Note sui Calcoli FICSIT
- **Arrotondamento per Eccesso (`Math.ceil`)**: In Satisfactory, non è possibile piazzare "frazioni" di macchinari. Se servono 2.3 Assemblatori, dovrai costruirne 3 e impostare l'ultimo al 30% di clock, oppure lasciarlo lavorare a intermittenza con i convogliatori. Il calcolatore evidenzia chiaramente questo numero!
- **Consumo Elettrico (MW)**: Mostra sia i MW consumati con la linea bilanciata, sia i MW di picco che la rete elettrica deve supportare se tutti i macchinari dovessero accendersi contemporaneamente a piena potenza.
