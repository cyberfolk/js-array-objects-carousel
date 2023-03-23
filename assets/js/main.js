/* Consegna:
 * Dato un array di oggetti letterali con:
 *  - url dell’immagine
 *  - titolo
 *  - descrizione
 * Creare un carosello come nella foto allegata.
 *
 * Milestone 0:
 * Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.
 *
 * Milestone 1:
 * Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
 * Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.
 *
 * Milestone 2:
 * Aggiungere il ciclo infinito del carosello.
 * Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e
 * viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.
 *
 * BONUS 1:
 * Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.
 *
 * BONUS 2:
 * Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.
 *
 * BONUS 3:
 * Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay
 */

// ===== VARIABLE DECLARATION ============================================================= //
const images = [
  {
    image: 'img/01.webp',
    title: 'Marvel\'s Spiderman Miles Morale',
    text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
  }, {
    image: 'img/02.webp',
    title: 'Ratchet & Clank: Rift Apart',
    text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
  }, {
    image: 'img/03.webp',
    title: 'Fortnite',
    text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
  }, {
    image: 'img/04.webp',
    title: 'Stray',
    text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
  }, {
    image: 'img/05.webp',
    title: "Marvel's Avengers",
    text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
  }
];

const el_images = document.querySelector(".ms_images");
const el_title = document.querySelector(".ms_title");
const el_text = document.querySelector(".ms_text");
const el_thumbnails = document.querySelector(".ms_thumbnails");
const el_btnUp = document.querySelector("#up");
const el_btnDown = document.querySelector("#down");
const CENTRE_THUMBNAILS = 2
let imgActive = 0;

// ===== MAIN ============================================================================= //
popolateImages(images);
createCells_thumbnails();
popolateThumbnails(images, 0);

// ===== EVENT ========================================================================= //
el_btnUp.onclick = upImage;
el_btnDown.onclick = downImage;

// ===== FUNCTION ========================================================================= //
// Create an Array of temporary DOM element images
// It is used as a support by other functions
function create_el_images_tmp(images) {
  let el_images_tmp = [];
  images.forEach(image => {
    const el_image = document.createElement("img");
    el_image.src = `./assets/${image.image}`;
    el_images_tmp.push(el_image);
  })
  return el_images_tmp;
}

// Populate the cells with Thumbnails, 
function popolateThumbnails(images) {
  el_imageRotate = rotateImages(images, 5 - imgActive)
  el_imageRotate.forEach((el_image, i) => {
    el_thumbnails.children[i].innerHTML = "";
    el_thumbnails.children[i].append(el_image);
  });
}

function createCells_thumbnails() {
  for (let i = 0; i < 5; i++) {
    const el_thumbnailsCell = document.createElement("div");
    el_thumbnailsCell.classList.add("ms_thumbnails_cell", "ms_opacity");
    el_thumbnails.append(el_thumbnailsCell);
  }
  el_thumbnails.children[2].classList.remove("ms_opacity");
}

// Popola l'elemento della DOM chiamata ms_images
// Attiva la prima immagine
// Visualizza il primo titolo
// Visualizza il primo testo
function popolateImages(images) {
  let el_images_tmp = create_el_images_tmp(images);
  el_images_tmp.forEach(image => {
    el_images.append(image);
  })
  el_images.children[imgActive].classList.add("active");
  el_title.innerText = images[0].title;
  el_text.innerText = images[0].text;
}

// Returns an image array of support DOM elements rotated the requested number of times
function rotateImages(images, rotationRequest) {
  const TOT_ROTATION = CENTRE_THUMBNAILS + rotationRequest
  let el_images_tmp = create_el_images_tmp(images);
  for (let i = 0; i < TOT_ROTATION; i++) {
    let last = el_images_tmp.pop();
    el_images_tmp.unshift(last);
  }
  return el_images_tmp
}

function change_el_carousel(images, imgActive) {
  el_images.children[imgActive].classList.add("active");
  el_title.innerText = images[imgActive].title;
  el_text.innerText = images[imgActive].text;
  popolateThumbnails(images, 5 - imgActive);
}

function upImage() {
  el_images.children[imgActive].classList.remove("active");
  imgActive--;
  if (imgActive < 0) {
    imgActive = images.length - 1;
  }
  change_el_carousel(images, imgActive);
}

function downImage() {
  el_images.children[imgActive].classList.remove("active");
  imgActive++;
  if (imgActive >= images.length) {
    imgActive = 0;
  }
  change_el_carousel(images, imgActive);
}
