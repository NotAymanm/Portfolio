export function countFps() {
    const fpsCounter = document.getElementById("fps-counter");
    let lastFrameTime = performance.now();
    let frameCount = 0;
    let fps = 0;

    function update() {
        const now = performance.now();
        frameCount++;

        // Calculate FPS every second
        if (now - lastFrameTime >= 1000) {
            fps = frameCount;
            frameCount = 0;
            lastFrameTime = now;

            // Update the FPS counter
            fpsCounter.textContent = `FPS: ${fps}`;
        }

        requestAnimationFrame(update);
    }

    update();
}