#[General]
Ces notes peuvent être exportées au format PDF avec pandoc et xelatex (voir export_notes.sh).

#[25-09-19]
Mise en place d'une application ultra-basique qui joue un La 440 en continu.

##Chaîne de traitement
La chaîne repose essentiellement sur deux noeuds : un *oscillateur* configuré pour produire une sinusoïde à 440Hz et un *gain*.
```
	{k}-------------------
	{freq,type}---       |
				 |       |
				[OSC]->[Gain]->[destination]
```

Le listing suivant montre la création et l'initialisation du contexte et des deux noeuds de la chaîne :
```js
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
```

Pour connecter un noeud A à un noeud B, on utilise la syntaxe :
```js
	A.connect(B);
```
Le dernier noeud de la chaîne doit être connecté à la sortie son via le *sink* AudioContext.destination. Le listing suivant montre comment connecter les noeuds les uns aux autres :
```js
    // Connect nodes
	oscillator.connect(gainNode);
	gainNode.connect(audioCtx.destination);
```