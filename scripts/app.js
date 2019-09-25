var audioCtx;
var oscillator;
var gainNode;

document.body.onclick = init;

function init()
{
	// Create audio context
	audioCtx = new (window.AudioContext || window.webkitAudioContext)();

	// Create a generator node
	oscillator = audioCtx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = 440;
    oscillator.start();

    // Master volume
    gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.5;

    // Connect nodes
	oscillator.connect(gainNode);
	gainNode.connect(audioCtx.destination);
}
