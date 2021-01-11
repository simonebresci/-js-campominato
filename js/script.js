// Testo es
/*
Il computer deve generare 16 numeri casuali tra 1 e 100.
I numeri non possono essere duplicati (tadaaa!)
In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
L’utente non può inserire più volte lo stesso numero.
Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
*/

/*
BONUS: (da fare solo se funziona tutto il resto)
all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
con difficoltà 0 => tra 1 e 100
con difficoltà 1 =>  tra 1 e 80
con difficoltà 2 => tra 1 e 50
*/
// [12][3][4][5][6][4][6] ...


// FUNZIONI ********************************************************************
// Genera un singolo numero casuale compreso fra min e max
function generateRandom(minR, maxR){
  return parseInt((Math.random() * (maxR - minR)) + minR) ;
}
// Genera array di numeri casuali in array con lunghezza preimpostata
function generateArrayRandom(arrayR, minR, maxR){
  var numRandom;

  // Genera numeri random
  for (var i = 0; i < arrayR.length; i++) {
    // Genera numero finchè non univoco
    do{
      numRandom = generateRandom(minR, maxR);
    }while(searchElementArray(numRandom, arrayR))

    //Inserisci numero generato nell'array
    arrayR[i] = numRandom;

  }

  return arrayR;

}
// Cerca elemento in un array
function searchElementArray(search, arraySearch){

  //Scorri tutto array
  for (var i = 0; i < arraySearch.length; i++) {
    if (arraySearch[i] === search){
      // Elemento trovato - esci
      return true;
    }
  }

  // Elemento non trovato
  return false;

}
// Verifica che numero sia compreso fra min e max
function checkMinMaxInt(num, min, max){
  // input deve essere numeric
  if (isNaN(num)){
    return false;
  }

  // Trasforma input in intero
  num = parseInt(num);

  // input deve essere compreso fra min e max
  if (num < min || num > max) return false;

  // Numero ok
  return true;
}

// Funzioni debug
// Stampa array su console.log
function DebugPrintArray(lista){
  var stringa = '';
  for (var i = 0; i < lista.length; i++) {
    stringa += lista[i] + ' ';
  }
  console.log(stringa);
}
// /FUNZIONI *******************************************************************


// Inizializza variabili di gioco
var difficolt                               //Difficoltà di gioco 1 = facile, 2 = medio, 3 = difficile
var arrayRandom = [];                       //Array contenente numeri casuali
arrayRandom.length = 16;                    //Numero elementi array Random
var minRand, maxRand;                       //Valori min e max dei numeri random generati
var arrayNumGiocati = [];                   //Array numeri già scelti
var nTentativi = 100 - arrayRandom.length;  //N tentativi prima di perdere
var punteggio = 0                           //Punteggio
var sconfitta = false;                      //Sconfitta dell'utente





// Righe vuote perchè prompt oscura parte alta dello schermo
console.log('');
console.log('');
console.log('');
console.log('');
console.log('');

// Benvenuto in JS Campo Minato
console.log('Benvenuto in JS Campo Minato')

// Selezione difficoltà
do{
  difficolt = parseInt(prompt('Seleziona difficoltà - 1 facile, 2 medio, 3 difficile'));
} while (!checkMinMaxInt(difficolt, 1, 3))

// Imposta difficoltà
minRand = 1;
switch (difficolt) {
  case 1:
    maxRand = 100;
    nTentativi = maxRand - arrayRandom.length;
    break;
  case 2:
    maxRand = 80;
    nTentativi = maxRand - arrayRandom.length;
    break;
  case 3:
    maxRand = 50;
    nTentativi = maxRand - arrayRandom.length;
    break;
}




// Crea numeri Random
arrayRandom = generateArrayRandom(arrayRandom, minRand, maxRand);
DebugPrintArray(arrayRandom);

// Gioca un numero
var numUtente;      //Ultimo numero scelto dal giocatore
var inputNotOk = false;
while(!sconfitta && (nTentativi > 0)){

  // Scelta numero utente attraverso prompt
  do{
    // Inizializza valore inputNotOk
    inputNotOk = false;
    numUtente = parseInt(prompt('Scegli un numero, min ' + minRand + ' max ' + maxRand));


    // Controlla minMax input
    if (!inputNotOk){
      inputNotOk = !checkMinMaxInt(numUtente, minRand, maxRand);
      if (inputNotOk) {alert('Numero non compreso fra min ' + minRand + ' e max ' + maxRand);}
    }

    //Controlla se già giocato
    if (!inputNotOk) {
      inputNotOk = searchElementArray(numUtente, arrayNumGiocati);
      if (inputNotOk) {alert('Numero già giocato');}
    }


  }while(inputNotOk)


  // Inserisci in array numeri giocati
  arrayNumGiocati.push(numUtente);
  DebugPrintArray(arrayNumGiocati);

  // Decrementa numero Tentativi ed incrementa punteggio
  nTentativi--;
  punteggio++;
  console.log('Tentativi rimanenti: ' + nTentativi);

  // Controlla se presente in array Random
  sconfitta = searchElementArray(numUtente, arrayRandom);

}

// Sconfitta dell'utente
if (sconfitta){
  console.log('Hai perso!');
}

// Vincita dell'utente
if (nTentativi <= 0){
  console.log('Hai vinto!!!')
}

// Mostra punteggio utente
console.log('Punteggio:' + punteggio);
