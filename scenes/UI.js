class UI extends Phaser.Scene {

  constructor() {

    super("UI");
  }
  preload() {
  
	 
	
  }
  create() {
    
    this.header = this.add.image(game.config.width / 2, 15, 'blank').setOrigin(.5,0).setTint(0x3e5e71);
	this.header.displayWidth = 870;
	this.header.displayHeight = 200;
    
   
  this.score = 0;
      this.scoreText = this.add.bitmapText(85, 100, 'topaz', this.score, 80).setOrigin(.5).setTint(0xcbf7ff).setAlpha(1);
    
   

    
	
	var Main = this.scene.get('playGame');
	Main.events.on('score', function() {
     
      this.score += 1;
      //console.log('dots ' + string)
      this.scoreText.setText(this.score)
    }, this);
    
  

  }
  
  update(){
	
  }
  
  
  
}