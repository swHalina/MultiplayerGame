class KeyPressListener {
   constructor(keyCode, callback) {
      let keySafe = true;
      let Cancion = false;
      this.keydownFunction = function (event) {
         if (event.code === keyCode) {
            if (keySafe) {
               keySafe = false;
               callback();
            }
         }
      };
      this.keyupFunction = function (event) {
         if (event.code === keyCode) {
            keySafe = true;
            //Inicia cancion
         }
         if (Cancion == false) {
            Cancion = true;
            const audioArray = [
               "./audio/mario-bros-cancion.mp3",
               "./audio/backgroundSounds/zelda_smash.mp3",
               "./audio/backgroundSounds/dreamLand_Smash.mp3"
            ];
            let audioPointer;
            let audio;
            onStart();
            function playNext() {
               if (audioPointer < audioArray.length) {
                  audio = new Audio(audioArray[audioPointer]);
                  audio.addEventListener("ended", playNext);
                  audio.volume = 0.2;
                  audio.play();
                  console.log(`playing ${audioArray[audioPointer]}`);
                  audioPointer += 1;
               } else {
                  console.log("finished");
                  onStart();
               }
            }

            function onStart() {
               if (audio) {
                  audio.pause();
               }
               console.log("start");
               audioPointer = 0;
               playNext();
            }

            // cancionInicio.loop = true;
         }
      };
      document.addEventListener("keydown", this.keydownFunction);
      document.addEventListener("keyup", this.keyupFunction);
   }

   unbind() {
      document.removeEventListener("keydown", this.keydownFunction);
      document.removeEventListener("keyup", this.keyupFunction);
   }


}