const interactionAudio = new Audio('/clickedSound.wav');

export function playInteractionSound() {
  interactionAudio.currentTime = 0;
  interactionAudio.play().catch(() => {});
}