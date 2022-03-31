class selectGame extends Phaser.Scene {
  constructor() {
    super("selectGame");
  }
  preload() {


  }
  create() {
	  this.cameras.main.setBackgroundColor(0xf7eac6);
    this.startGroup = onGroup;
    this.playText = this.add.bitmapText(game.config.width / 2, 75, 'atari', 'NEXT >', 60).setOrigin(.5, .5).setTint(0xc76210).setInteractive();
    this.playText.level = -1;
    /*  this.playText.on('pointerdown', function(){
        this.scene.start("PlayGame");
      }, this);*/
this.swipe = false;

    this.showGroup(this.startGroup);
    this.return = this.add.image(game.config.width / 2, 1550,'menu_icons', 5).setScale(1.5).setInteractive().setTint(0xc76210);

    //this.backText = this.add.bitmapText(game.config.width / 2, 1500, 'atari', '< back', 60).setOrigin(.5, .5).setTint(0xd8a603).setInteractive();
    this.return.level = -2;

    this.input.on('gameobjectup', this.clickHandler, this);
   // this.input.on('poimterdown', this.down,this);
   // this.input.on('pointermove', this.move,this);
    //this.input.on('pointerup', this.up,this);

  }

down(e){
  
}
move(e){
 // console.log(e.downX - e.x)
  if((e.downX - e.x) > 55 || (e.downX - e.x) > -55){
    this.swipe = true;
    
  }
} 
up(e){
  if(e.downX < e.x){
      console.log('right')
    } else {
      console.log('left')
    }
}

  showGroup(groupNum) {
    if (this.groupBox) {
      //  this.groupBox.destroy(true);
      //this.hideGroup();
    }
    var groupBox = this.add.container().setDepth(2);
    var tempGroup = groupNum + 1;
    var groupTitle = this.add.bitmapText(game.config.width / 2, 200, 'atari', groups[groupNum].title, 60).setTint(0xbf5846).setOrigin(.5).setMaxWidth(500);
    groupBox.add(groupTitle);
    var groupText = this.add.bitmapText(game.config.width / 2, 1400, 'atari', tempGroup + '/' + groups.length, 60).setTint(0xbf5846).setOrigin(.5).setMaxWidth(500);
    groupBox.add(groupText);
    //	var levelNum = groupNum + (groups[groupNum].puzzleCount -1);

    var levelNum = groups[groupNum].startNum;


    for (var i = 0; i < groups[groupNum].numLevels; i++) {
      if(i < 3){
		 var xpos = 50 + i * 275;
		 var ypos = 400; 
	  } else if(i < 6){
		 var xpos = 50 + (i - 3) * 275;
		 var ypos = 400 + 275; 
	  } else if(i < 9){
		 var xpos = 50 + (i - 6) * 275;
		 var ypos = 400 + 550; 
	  } else {
		 var xpos = 50 + (i - 9) * 275;
		 var ypos = 400 + 825; 
	  }
	     
      var tempLevel = levelNum + 1;
      var statusText = this.add.bitmapText(xpos + 112.5, ypos - 60, 'atari', tempLevel, 70).setOrigin(.5).setTint(0x298191);
	  var levelTitle = this.add.image(xpos,ypos, 'select_icons', 0).setOrigin(0,.5).setScale(.75);
	  levelTitle.level = levelNum;



      if (gameSettings.levelStatus[levelNum] < 0) {
        //levelTitle.setAlpha(.5)
			levelTitle.setFrame(4);
        
      } else {
        levelTitle.setInteractive();
        if (gameSettings.levelStatus[levelNum] == 0) {
          
        } else if (gameSettings.levelStatus[levelNum] == '*') {
          levelTitle.setFrame(1);
        } else if (gameSettings.levelStatus[levelNum] == '**') {
          levelTitle.setFrame(2);

        } else if (gameSettings.levelStatus[levelNum] == '***') {
          levelTitle.setFrame(3);

        }

      }



      levelNum++;
      groupBox.add(levelTitle);
      groupBox.add(statusText);
    }




    groupBox.add(groupText);

    groupBox.setPosition(game.config.width, 0);
    this.groupBox = groupBox;
    this.tweens.add({
      targets: this.groupBox,
      //alpha: .5,
      x: 0,
      duration: 500,

      //delay: 500,
      //  yoyo: true,
      callbackScope: this,
      onComplete: function() {

      }
    });
  }

  hideGroup(num) {
    this.tweens.add({
      targets: this.groupBox,
      //alpha: .5,
      //  x: game.config.width,
      x: -850,
      duration: 500,
      //  yoyo: true,
      callbackScope: this,
      onComplete: function() {
        this.groupBox.destroy(true);
        this.showGroup(num);
      }
    });

  }


  clickHandler(e, block) {
    if(this.swipe){
      if(e.downX < e.x){
      console.log('right')
    } else {
      console.log('left')
    }
      
      this.swipe = false;
      return
      
    }
    if (block.level == -1) {

      if (this.startGroup < groups.length - 1) {
        this.startGroup++;
      } else {
        this.startGroup = 0
      }
      this.hideGroup(this.startGroup);
      //   this.showGroup(this.startGroup);
    } else if (block.level == -2) {
      this.scene.start('startGame');
    } else {
      onLevel = block.level;
      onGroup = this.startGroup;
      //gameMode = 'challenge'
      this.scene.pause();
	  this.scene.launch('preview',{level: block.level, group: this.startGroup})
      //this.scene.start('playGame');
      //this.scene.launch('UI');
    }

  }




}