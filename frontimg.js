function openVideo(videoUrl) {
    const modal = document.getElementById('videoModal');
    const frame = document.getElementById('videoFrame');
    frame.src = videoUrl + "?autoplay=1";
    modal.classList.add('active');

    // Click anywhere to close video
    modal.onclick = function() {
      frame.src = "";  // Stop the video
      modal.classList.remove('active');
    }
  }