let hoverTimeout;

document.querySelectorAll('.card').forEach(card => {
  const video = card.querySelector('video');

  card.addEventListener('mouseenter', () => {
    hoverTimeout = setTimeout(() => {
      card.classList.add('preview');
      video.currentTime = 0;
      video.play().catch(() => {});
    }, 500);
  });

  card.addEventListener('mouseleave', () => {
    clearTimeout(hoverTimeout);
    card.classList.remove('preview');
    video.pause();
    video.currentTime = 0;
  });
});

function openMovie(card) {
  const modal = document.getElementById('movieModal');
  const iframe = document.getElementById('movieFrame');
  const src = card.getAttribute('data-src');

  modal.style.display = 'flex';

  // Handle YouTube
  if (src.includes('youtube.com') || src.includes('youtu.be')) {
    const match = src.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/);
    if (match && match[1]) {
      const videoId = match[1];
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    } else {
      iframe.src = '';
      console.error('Could not extract YouTube video ID.');
    }
  } else {
    iframe.src = src;
  }
}

function closeMovie() {
  const modal = document.getElementById('movieModal');
  const iframe = document.getElementById('movieFrame');
  modal.style.display = 'none';
  iframe.src = '';
}