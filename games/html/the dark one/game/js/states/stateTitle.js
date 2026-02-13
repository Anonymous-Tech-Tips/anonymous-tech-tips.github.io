var isConfirm = false;
var img;
var btnYes;
var btnNo;
//
var player;
var StateTitle = {
    create: function() {
        model.state="title";
       
        var bg = new Background("mainmenubg");
        var soundButtons = new SoundButtons();
        if(mediaManager.backgroundMusic.name != "menusong") mediaManager.setBackgroundMusic("menusong");



        this.titleText = game.add.text(400, 30, "The Dark One", { font: "bold 33px 'Segoe Script'", fill: "#000"});
        this.titleText.anchor.set(0.5,0.5);
        this.tenfortext = game.add.text(400, 55, "Created by Tenfor", { font: "8px 'Press Start 2P'", fill: "#000"});
        this.tenfortext.anchor.set(0.5,0.5);

        var buttonStart = new TextButton("Start Game", 1, 4,G.START_GAME);
        buttonStart.x = 650 ;
        buttonStart.y = 110;
        buttonStart.setButtonSize(0.9,0.8);
        buttonStart.setTextSize(13);

   
        var buttonWalkthrough = new TextButton("Walkthrough", 1, 4, G.WALKTHROUGH);
        buttonWalkthrough.x = 650;
        buttonWalkthrough.y = 160;
        buttonWalkthrough.setButtonSize(0.9,0.8);
        buttonWalkthrough.setTextSize(13);

        var buttonCredits = new TextButton("Credits", 1, 4, G.CREDITS);
        buttonCredits.x = 650;
        buttonCredits.y = 210;
        buttonCredits.setButtonSize(0.9,0.8);
        buttonCredits.setTextSize(13);

        var buttonReset = new TextButton("Reset Data", 1, 15,G.RESETDATAPOPUP,null);
        buttonReset.x = 650;
        buttonReset.y = 260;
        buttonReset.setButtonSize(0.9,0.8);
        buttonReset.setTextSize(13);

        game.stage.backgroundColor = "#4488AA";
        

     /*
        var text = game.add.text(600, 580, "Created by Tenfor", { font: "bold 10px 'Press Start 2P'", fill: "#000"});
        text.anchor.set(0.5,0.5);*/

       /* this.thumbnail2Text = game.add.text(650, 380, "Play", { font: "10px 'Press Start 2P'", fill: "#000"});
        this.thumbnail2Text.anchor.set(0.5,0.5);
        this.thumbnail2Text.inputEnabled = true;
        this.thumbnail2Text.events.onInputDown.add(function(){
            var win = window.open("https://armorgames.com/play/18490/landor-quest-2", '_blank');
            win.focus();
        },this);

        this.thumbnail2Text2 = game.add.text(650, 540, "Landor Quest 2", { font: "10px 'Press Start 2P'", fill: "#000"});
        this.thumbnail2Text2.anchor.set(0.5,0.5);
        this.thumbnail2Text2.inputEnabled = true;
        this.thumbnail2Text2.events.onInputDown.add(function(){
            var win = window.open("https://armorgames.com/play/18490/landor-quest-2", '_blank');
            win.focus();
        },this);
*/
        this.thumbnail2 = game.add.sprite(650,450,"thumbnail2");
        this.thumbnail2.anchor.set(0.5,0.5);
        this.thumbnail2.scale.set(0.8,0.8);
        this.thumbnail2.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        this.thumbnail2.inputEnabled = true;
        this.thumbnail2.events.onInputDown.add(function(){
            var win = window.open("https://armorgames.com/play/18490/landor-quest-2", '_blank');
            win.focus();
        },this);


        this.agicon = game.add.sprite(640,560,"armorgameslogo")
        this.agicon.anchor.set(0.5,0.5);
        this.agicon.scale.set(0.5,0.5);
        this.agicon.inputEnabled = true;
        this.agicon.events.onInputDown.add(function(){
            window.open("https://armor.ag/MoreGames", "_blank");
         },this);



        this.liketext = game.add.text(650, 330, "Like us on Facebook", { font: "bold 12px 'Press Start 2P'", fill: "#00a"});
        this.liketext.anchor.set(0.5,0.5);
        this.liketext.inputEnabled = true;
        this.liketext.events.onInputDown.add(function(){
            window.open("https://www.facebook.com/ArmorGames", "_blank");
        },this);
        this.playmoretext = game.add.text(650, 360, "Play more games", { font: "bold 12px 'Press Start 2P'", fill: "#00a"});
        this.playmoretext.anchor.set(0.5,0.5);
        this.playmoretext.inputEnabled = true;
        this.playmoretext.events.onInputDown.add(function(){
           window.open("https://armor.ag/MoreGames", "_blank");
        },this);


    },
    update:function()
    {
        if(this.thumbnail2.input.pointerOver())
        {
            this.thumbnail2.scale.set(2.1,2.1);
        }
        else
        {
            this.thumbnail2.scale.set(2,2);
        }

        if(this.liketext.input.pointerOver())
        {
            this.liketext.fontSize = 14;
            this.liketext.addColor("#004", 0);
        }
        else
        {
            this.liketext.fontSize = 12;
            this.liketext.addColor("#00a", 0);
        }

        if(this.playmoretext.input.pointerOver())
        {
            this.playmoretext.fontSize = 14;
            this.playmoretext.addColor("#004", 0);
        }
        else
        {
            this.playmoretext.fontSize = 12;
            this.playmoretext.addColor("#00a", 0);
        }
      
        if(this.agicon.input.pointerOver())
        {
            this.agicon.scale.set(0.6,0.6);
        }
        else
        {
            this.agicon.scale.set(0.5,0.5);
        }
    }
}
function showConfirm()
{
    isConfirm = true;
    img = game.add.image(400,300,"confirm");
    img.anchor.set(0.5,0.5);
    btnYes = new TextButton("Yes", 1, 14,G.RESETCONFIRM,null,11);
    btnYes.x = 270;
    btnYes.y = 420;
    btnNo = new TextButton("No", 1, 14,G.RESETCANCEL,null,11);
    btnNo.x = 530;
    btnNo.y = 420;

}