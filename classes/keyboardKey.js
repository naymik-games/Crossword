class KeyboardKey extends Phaser.GameObjects.Sprite {

   constructor(scene, x, y, letter) {

      // different image key according if it's a letter character or '<' or '>'
      super(scene, x, y, '<>'.includes(letter) ? 'bigkey' : 'key');

      // assign parent scene
      this.parentScene = scene;

      // assign bound letter
      this.boundLetter = letter;

      // set sprite registration point to top, left
      this.setOrigin(0);

      // add the sprite to the scene
      scene.add.existing(this); 
      
      // set the sprite interactive
      this.setInteractive();

      // listener for pointer down on the sprite, to call handlePointer callback
      this.on('pointerdown', this.handlePointer);

      // add a keyboard letter accoring to 'letter value
      switch(letter) {

          // backspace
          case '<' :
              this.setFrame(0);
              break;
          
          // enter
          case '>' :
              this.setFrame(1);
              break;

          // normal key
          default :
              new KeyboardLetter(scene, x + 10, y + 10, letter, 36);
      }
  }

  // method to be called when the user clicks or taps the letter
  handlePointer() {

      // call 'updateWord' method on parent scene
      this.parentScene.updateWord(this.boundLetter);
  }
}



class KeyboardLetter extends Phaser.GameObjects.BitmapText {
  constructor(scene, x, y, text, size) {
      super(scene, x, y, 'font', text, size);
      
      // add the keyboard letter to the scene
      scene.add.existing(this);
  }
}