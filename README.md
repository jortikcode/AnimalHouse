# AnimalHouse

Unibo web technologies project 2021/2022

## Task da fare
FRONT-OFFICE:
Bacheca in stile forum (
    lato backend-db: aggiungere un campo per distinguere la categoria di bacheca e data di creazione, 
    lato frontend: visualizzazione in stile lista di tweet, form per postare )
Utenti (
    lato backend-db: aggiungere un campo per l'immagine del profilo
)
Servizi in presenza (veterinario, pensione animali, toelettatura,....) (
    lato backend-db: crud
    nota: [ogni servizio e' offerto da una o piu' sedi. ogni sede offre uno o piu' servizi. getservizi dovrebbe poter cercare per intervalli temporali o per sedi o per entrambi]

    lato frontend: per ogni servizio illustrazione, e possibilita di prenotazione per sede e disponibilita'.
)
Animali(
    lato frontend: permettere di aggiungere animali, qualsiasi tipo, ad un utente
)

BACK-OFFICE:
- barra di ricerca generica
- card inserimento dati generico (con dati riempiti o vuoti)

Anagrafica clienti (
    lato backoffice: 
    - tasto registrare un nuovo utente (deve aprire la card inserimento dati vuota)
    tabella di utenti che permetta di:
    - cambio password
    - reset password
    - cancellazione utente
    - modifica/aggiungi animali preferiti e punteggi dei giochi
)

Gestione Bacheca (
    lato backoffice:
    ricerca messaggi
    tabella che permetta di:
    - cancellare un messaggio fatto su una bacheca
)

Gestione ecommerce (
    lato backoffice:
    fare tabella prodotti che permetta:
    - aggiungere prodotto/prezzo/descrizione
    - rimuovere prodotto/prezzo/descrizione
    nota: ogni prodotto ha una categoria e sottocategoria e immagine obbligatoria
)

Gestione sedi(
    lato backend:
    entita' sede: crud
)

Gestione servizi (
    lato backoffice:
    fare tabella per prenotazioni dei servizi:
    - modifica/cancellazione prenotazioni
    lato backend-db:
    - entita' prenotazioni: crud, aggiungere campo id_sede (una sede ha piu' servizi, un servizio ha una sede), aggiungere campo prezzo
)

## TODO

\+ := opzionale

## game

### Servizi disponibili

- [ ] Curiosità sugli animali come i miei
- [ ] Curiosità sugli animali in generale
- [ ] Informazioni utili sanitarie e legali
- [ ] Video buffi ed interessanti da YouTube

### Giochi possibilibi

- [ ] **QUIZ**: usando la stessa API delle curiosità il sistema genera domande a caso
- [ ] + **Memory**: usando API di immagini il sistema crea coppie di immagini e le dispone nascoste. L'utente deve scoprirle a coppie
- [ ] + **Impiccato**: usando API di dizionari di termini sugli animali il sistema presenta una parola complessa che l'utente deve indovinare lettera per lettera
- [ ] + **Scova le differenze**: due immagini simili ma con piccoli particolari differenti che l'utente deve scovare (e.g. usare layer SVG per aggiungere i particolari cliccabili

## front-office

### Servizi disponibili front-office

- [ ] **Servizi di comunità**: leaderboard con punteggio dei vari gioche del game, bacheca eccolo qua, + bacheca cerco partner, bacheca aiutatemi, ecc.
- [ ] **e-commerce**: catalogo ragionato e diviso per sezioni di prodotti per animali acquistabili online: cibo, prodotti sanitari, accessoristica, + cuccioli
- [ ] **Servizi in presenza**: veterianario, dog sitter, + toelettatura, pensione estiva, psicologo, visita a domicilio per animali soli, ecc. Ogni servizio prevede una parte di illustrazione del servizio e una parte di accesso e prenotazione (secondo sede e disponibilità)
- [ ] + **Servizi online**: videoconf con l'esperto, con il veterinario, con il proprio animale in ospedale o in pensione, ecc.

## back-office

### Servizi disponibili back-office

- [ ] **Anagrafica Clienti**: per gestire le informazioni sui clienti: registrazione, login, cambio password, reset password, cancellazione, preferenze e animali preferiti, punteggi dei gioci
- [ ] **Servizi di comunità**: per controllare o cancellare i messaggi nelle bacheche
- [ ] **Gestione e-commerce**: per aggiungere e togliere prodotti, prezzi, descrizione. Ogni prodotto appartiene ad una categoria (+ e ad una o più sottocategorie) ha sempre un'immagine (con URI online + o uploadata sul file system del server)
- [ ] **Servizi in presenza**: per prenotare servizi in presenza, modificare o cancellare prenotazioni, visualizzare disponibilità. Ogni servizio può avere più calendari separati (ad esempio in una sede possono avere molti veterinari, molte "camere" della pensione, ecc.)
- [ ] + **Servizi online**: per prenotare servizi online, modificare o cancellare prenotazioni, controllare disponibità
