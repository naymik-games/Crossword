class pauseGame extends Phaser.Scene {
  constructor() {
    super("pauseGame");
  }
  preload() {
    

  }
  create() {
    this.backBack1 = this.add.image(game.config.width / 2, game.config.height / 2, 'blank').setTint(0x000000);
    this.backBack1.displayWidth = 760;
    this.backBack1.displayHeight = 1110;
    
    this.backBack2 = this.add.image(game.config.width / 2, game.config.height / 2, 'blank').setTint(0x3e5e71);
    this.backBack2.displayWidth = 750;
    this.backBack2.displayHeight = 1100;
   
   this.backBack3 = this.add.image(game.config.width / 2, game.config.height / 2, 'blank').setTint(0xadadad);
    this.backBack3.displayWidth = 710;
    this.backBack3.displayHeight = 1060;
   
   var buyRemoveSquare= this.add.image(game.config.width / 2 - 250, game.config.height / 2 - 200,'gems', 12).setScale(1.5).setInteractive();
    //var buyRemoveSquare = this.add.bitmapText(game.config.width / 2, game.config.height / 2 - 200, 'atari', 'Add remove square', 40).setOrigin(.5);
    buyRemoveSquare.setInteractive();
    buyRemoveSquare.on('pointerdown', function() {
      buyRemoveSquare.setText('Added!')
      // localStorage.setItem('ringTotal', JSON.stringify(this.ringTotal));
      canRemoveCount++;
    }, this);
    
    var buyRemoveColor= this.add.image(game.config.width / 2 - 250, game.config.height / 2,'gems', 11).setScale(1.5).setInteractive();

    //var buyRemoveColor = this.add.bitmapText(game.config.width / 2, game.config.height / 2, 'atari', 'Add remove color', 40).setOrigin(.5);
    buyRemoveColor.setInteractive();
    buyRemoveColor.on('pointerdown', function() {
      buyRemoveColor.setText('Added!')
      // localStorage.setItem('ringTotal', JSON.stringify(this.ringTotal));
      canRemoveColorCount++;
    }, this);
if(gameOptions.gameMode == 'time'){
  var buyAdd= this.add.image(game.config.width / 2 - 250, game.config.height / 2 + 200,'gems', 14).setScale(1.5).setInteractive();

} else{
  var buyAdd= this.add.image(game.config.width / 2 - 250, game.config.height / 2 + 200,'gems', 13).setScale(1.5).setInteractive();

}

    //var buyAdd = this.add.bitmapText(game.config.width / 2, game.config.height / 2 + 200, 'atari', 'Add time/move', 40).setOrigin(.5);
    buyAdd.setInteractive();
    buyAdd.on('pointerdown', function() {
      buyRemoveColor.setText('Added!')
      // localStorage.setItem('ringTotal', JSON.stringify(this.ringTotal));
      caAddCount++;
    }, this);


this.home = this.add.image(350, 400,'menu_icons', 3).setScale(1.5).setInteractive().setTint(0xc76210);
this.home.on('pointerdown', function() {
     
      // localStorage.setItem('ringTotal', JSON.stringify(this.ringTotal));
     this.scene.start('startGame');
     this.scene.stop('playGame');
     this.scene.stop('UI');
     this.scene.stop();
      
    }, this);
this.restart = this.add.image(550, 400,'menu_icons', 1).setScale(1.5).setInteractive().setTint(0xc76210);

var exit = this.add.image(game.config.width / 2, game.config.height / 2 + 475,'menu_icons', 2)


    //var exit = this.add.bitmapText(game.config.width / 2, game.config.height / 2 + 475, 'atari', 'EXIT', 40).setOrigin(.5).setTint(0x3e5e71);
    exit.setInteractive();
    exit.on('pointerdown', function() {
      isPaused = false;
      // localStorage.setItem('ringTotal', JSON.stringify(this.ringTotal));
      this.scene.sleep();
      this.scene.resume('UI');
      this.scene.resume('playGame');
    }, this);
  }
  
}
