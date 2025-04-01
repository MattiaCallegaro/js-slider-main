const pics = [
    {
      image: 'img/01.jpg',
      title: 'Svezia',
      text: 'Scandinavia\'s blend of nature and innovation.',
    }, 
    {
      image: 'img/02.jpg',
      title: 'Norvegia',
      text: 'Fjords, mountains, and coastal charm in Nordic splendor.',
    }, 
    {
      image: 'img/03.jpg',
      title: 'Alaska',
      text: 'Untamed wilderness and rugged beauty in the Last Frontier.',
    }, 
    {
      image: 'img/04.jpg',
      title: 'Gran Canyon',
      text: 'Nature\'s masterpiece, a colorful tapestry of cliffs.',
    }, 
    {
      image: 'img/05.jpg',
      title: "Skyrim",
      text: 'Epic Nordic fantasy with dragons and ancient magic.',
    }
  ];

//   DEFINIZIONE DELLE FUNZIONI
// definizione della funzione che crea la singola immagine
  const createImage = (galleryImage) => {
    // destrutturiamo il parametro passato nelle sue proprietà
    const { image, title, text } = galleryImage;

    // credo l'html dell'immagine da inserire
    let img = `<figure>
                    <img src="./${image}" alt="">
                    <figcaption>
                        <h2>${title}</h2>
                        <h3>${text}</h3>
                    </figcaption>
                </figure>`;

    return img;

  }

//   definizione della funzione che va a ciclare l'array ed a creare le immagini a partire da questo nell'html
const renderImages = (array) => {

    // creo la variabile vuota che mi servirà per contenere tutte le immagini
    let images = '';
    // recupero la gallery dal dom
    const gallery = document.querySelector('.gallery');

    // ciclo l'array
    for(let i=0; i<array.length; i++){
        images += createImage(array[i]);
    }

    gallery.innerHTML = images;
}


// funzione che mi manda avanti le immagini da vedere
const nextImage = () => {
  images[activeImage].classList.remove('active');
  thumbnails[activeImage].classList.remove('active-thumb');
  
  activeImage++;
  if(activeImage >= images.length) activeImage = 0;
  
  images[activeImage].classList.add('active');
  thumbnails[activeImage].classList.add('active-thumb');
}

  

// funzione che mi manda indietro le immagini da vedere
const previousImage = () => {
  images[activeImage].classList.remove('active');
  thumbnails[activeImage].classList.remove('active-thumb');
  
  activeImage--;
  if(activeImage < 0) activeImage = images.length - 1;
  
  images[activeImage].classList.add('active');
  thumbnails[activeImage].classList.add('active-thumb');
}
// creo una funzione per cambiare immagine
const showImageThumbnail = (index) => {
  images[activeImage].classList.remove('active');
  activeImage = parseInt (index);

  images[activeImage].classList.add('active');

  clearInterval(intervalId);
  intervalId = setInterval(nextImage, 2000);
}

// CORPO DEL PROGRAMMA

// siamo andati a renderizzare tutte le immagini
renderImages(pics);

// definisco il valore inziale del mio indice
let activeImage = 0;
// // vado a prendere tutte le immagini dal dom
const images = document.querySelectorAll('#carousel figure');
const thumbnails = document.querySelectorAll('#thumbnails img');
// aggiungo all'elemento con indice 0 dell'array images la classe active
images[activeImage].classList.add('active');
thumbnails[activeImage].classList.add('active-thumb');

// recuperiamo i pulsanti
const nextButton = document.querySelector('.fa-arrow-right');
const leftButton = document.querySelector('.fa-arrow-left');

// aggiungiamo gli event listener
nextButton.addEventListener('click', nextImage);
leftButton.addEventListener('click', previousImage);
//aggiungo event listener ad ogni thumbnail
thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', () => {
    const index = thumbnail.getAttribute('data-index');
    showImageThumbnail(index);
  })
})
// autoplay
let intervalId = setInterval(nextImage, 2000);
