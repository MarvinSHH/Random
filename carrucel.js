fetch('carrucel.html')
  .then(response => response.text())
  .then(html => {
    const container = document.getElementById('carrusel-container');
    container.innerHTML = html;

    // Elementos del carrusel
    const track = document.getElementById('carousel');
    const slides = Array.from(track.children);
    const totalSlides = slides.length;

    // Asegurar que cada slide tenga el mismo ancho que el contenedor
    function sizeSlides() {
      const width = track.parentElement.clientWidth; // ancho del wrapper (max-w-4xl)
      slides.forEach(slide => {
        slide.style.width = `${width}px`;
        slide.style.height = '100%'; // coincide con el alto del track
      });
      // Reposicionar en el slide actual después de redimensionar
      goToSlide(currentIndex, false);
    }

    let currentIndex = 0;
    let autoplayId = null;

    function goToSlide(index, animate = true) {
      currentIndex = ((index % totalSlides) + totalSlides) % totalSlides;
      if (!animate) track.style.transition = 'none';
      const offset = -currentIndex * track.parentElement.clientWidth;
      track.style.transform = `translateX(${offset}px)`;
      if (!animate) {
        // Forzar reflow para reactivar la transición luego
        void track.offsetWidth;
        track.style.transition = '';
      }
      updateDots();
    }

    function nextSlide() { goToSlide(currentIndex + 1); }
    function prevSlide() { goToSlide(currentIndex - 1); }

    // Botones
    document.getElementById('prevBtn').addEventListener('click', () => {
      prevSlide(); restartAutoplay();
    });
    document.getElementById('nextBtn').addEventListener('click', () => {
      nextSlide(); restartAutoplay();
    });

    // Dots (indicadores)
    const dotsContainer = document.getElementById('dots');
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'w-2.5 h-2.5 rounded-full bg-white/60 hover:bg-white border border-white/80';
      dot.addEventListener('click', () => { goToSlide(i); restartAutoplay(); });
      dotsContainer.appendChild(dot);
    });
    function updateDots() {
      Array.from(dotsContainer.children).forEach((dot, i) => {
        dot.style.opacity = i === currentIndex ? '1' : '0.5';
        dot.style.transform = i === currentIndex ? 'scale(1.2)' : 'scale(1)';
      });
    }

    // Autoplay
    function startAutoplay() {
      autoplayId = setInterval(nextSlide, 3000);
    }
    function stopAutoplay() {
      if (autoplayId) clearInterval(autoplayId);
      autoplayId = null;
    }
    function restartAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // Responsivo
    window.addEventListener('resize', sizeSlides);

    // Inicialización
    sizeSlides();
    goToSlide(0, false);
    startAutoplay();
  })
  .catch(err => console.error('Error cargando carrusel:', err));
