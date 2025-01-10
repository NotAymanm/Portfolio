export function dynamicText(){
    //dynamic text
    const words = ["mobile apps.", "websites.", "3D models.", "apps.", "logos.", "everything."];
    let index = 0;
    const textElement = document.getElementById("dynamic-text");

    function animateWords() {
        textElement.classList.remove("brush-stroke");
        setTimeout(() => {
            textElement.textContent = words[index];
            textElement.classList.add("brush-stroke");
            index = (index + 1) % words.length;
        }, 200);
    }

    setInterval(animateWords, 3000); // Change every 3 seconds
}
