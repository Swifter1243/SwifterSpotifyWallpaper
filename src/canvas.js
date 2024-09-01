export const canvas = document.getElementById("canvas")
export const context = canvas.getContext("2d")

export function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
}