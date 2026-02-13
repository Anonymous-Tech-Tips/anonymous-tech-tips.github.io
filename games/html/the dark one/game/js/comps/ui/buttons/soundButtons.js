class SoundButtons extends Phaser.Group {
    constructor() {
        super(game);
        //
        //
        this.soundIcon = new ImageToggle("soundOn", "soundOff",G.TOGGLE_SOUND);
        // this.soundIcon.scale.set(0.5, 0.5);
        Align.scaleToGameW(this.soundIcon, 0.0509375);
        this.soundIcon.x = 3+this.soundIcon.width / 2;
        this.soundIcon.y = 3+this.soundIcon.height / 2;
        //
        //
        //
        this.musicIcon = new ImageToggle("musicOn", "musicOff", G.TOGGLE_MUSIC);
        Align.scaleToGameW(this.musicIcon, 0.0509375);
        //this.musicIcon.scale.set(0.5, 0.5);
        this.musicIcon.x = 8+this.musicIcon.width*1.5;
        this.musicIcon.y = 3+this.musicIcon.height / 2;
        this.add(this.musicIcon);
        this.add(this.soundIcon);
        this.soundIcon.setTo(model.soundOn);
        this.musicIcon.setTo(model.musicOn);

        if(model.state!="title"&&model.state!="credits"&&model.state!="credits2"&&model.state!="endgame"&&model.state!="over"){
            this.menuicon = new TextButton("", 1, 16, G.HOMEBUTTON);
            this.menuicon.x = 140;
            this.menuicon.y = 23;
            this.menuicon.scale.set(0.4,0.4)

            this.agicon = game.add.sprite(715,23,"armorgameslogo")
            this.agicon.anchor.set(0.5,0.5);
            this.agicon.scale.set(0.35,0.35);
            this.agicon.inputEnabled = true;
            this.agicon.events.onInputDown.add(function(){
                window.open("https://armor.ag/MoreGames", "_blank");
             },this);

        }


       // this.soundIcon.onSprite.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        //this.musicIcon.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        //Align.getScaleToGameW(this.musicIcon);
        //Align.scaleToGameW(this.soundIcon, 0.109375);
    }
}