document.addEventListener('DOMContentLoaded', () => {
    const videoModal = document.getElementById('fullscreenModalVideo');
    const imageModal = document.getElementById('fullscreenModalImage');
    const fullscreenVideo = document.getElementById('fullscreenVideo');
    const fullscreenImage = document.getElementById('fullscreenImage');
    const closeBtns = document.querySelectorAll('.fullscreen-icon.close');

    // Attach click events to all fullscreen icons
    const icons = document.querySelectorAll('.fullscreen-icon:not(.close)');
    icons.forEach(icon => {
        icon.addEventListener('click', (event) => {
            const imageContainer = icon.closest('.image-container');
            const image = imageContainer ? imageContainer.querySelector('.project-image') : null;
            const videoContainer = icon.closest('.video-container');
            const video = videoContainer ? videoContainer.querySelector('video') : null;

            if (video && fullscreenVideo && videoModal) {
                fullscreenVideo.src = video.querySelector('source').src;
                videoModal.style.display = 'flex';
            }
            if (image && fullscreenImage && imageModal) {
                fullscreenImage.src = image.src;
                imageModal.style.display = 'flex';
            }
        });
    });

    // Close modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (videoModal) {
                videoModal.style.display = 'none';
                if (fullscreenVideo) fullscreenVideo.pause();
            }
            if (imageModal) imageModal.style.display = 'none';
        });
    });

    // Close on outside click
    window.addEventListener('click', (event) => {
        if (event.target === videoModal) {
            videoModal.style.display = 'none';
            if (fullscreenVideo) fullscreenVideo.pause();
        }
        if (event.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });
});
