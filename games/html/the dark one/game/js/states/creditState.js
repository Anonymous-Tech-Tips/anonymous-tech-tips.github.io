var creditState = {
    create: function() {
        model.state="credits2";
       
        var bg = new Background("menubg");
        var soundButtons = new SoundButtons();
        
        this.titleText = game.add.text(400,40, "Credits", { font: "22px 'Press Start 2P'", fill: "#000",align:'right'});
        this.titleText.anchor.set(0.5,0.5);

        var g = game.add.text(400, 100, "Graphics:", { font: "bold 14px 'Press Start 2P'", fill: "#000"});
        g.anchor.set(0.5,0.5);
       /* var g1 = game.add.text(400, 130, "Karádi Viktória", { font: "bold 10px 'Press Start 2P'", fill: "#000"});
        g1.anchor.set(0.5,0.5);*/
        var g2 = game.add.text(400, 130, "0x72 - 0x72.itch.io", { font: "8px 'Press Start 2P'", fill: "#000"});
        g2.anchor.set(0.5,0.5);
        var g3 = game.add.text(400, 150, "Maytch - maytch.itch.io", { font: "8px 'Press Start 2P'", fill: "#000"});
        g3.anchor.set(0.5,0.5);

        var s = game.add.text(400, 190, "Music & Sounds:", { font: "bold 14px 'Press Start 2P'", fill: "#000"});
        s.anchor.set(0.5,0.5);
        var s1 = game.add.text(400, 220, "Steven Melin - stevenmelin.com", { font: "8px 'Press Start 2P'", fill: "#000"});
        s1.anchor.set(0.5,0.5);
        var s2 = game.add.text(400, 240, "hmmm101 - freesound.org/people/hmmm101", { font: "8px 'Press Start 2P'", fill: "#000"});
        s2.anchor.set(0.5,0.5);      
        var s3 = game.add.text(400, 260, "Wolfgang - opengameart.org/users/wolfgang", { font: "8px 'Press Start 2P'", fill: "#000"});
        s3.anchor.set(0.5,0.5);
        var s4 = game.add.text(400, 280, "opengameart.org/users/youre-perfect-studio", { font: "8px 'Press Start 2P'", fill: "#000"});
        s4.anchor.set(0.5,0.5);

        var t = game.add.text(400, 320, "Play-test:", { font: "bold 14px 'Press Start 2P'", fill: "#000"});
        t.anchor.set(0.5,0.5);

        var t1 = game.add.text(400, 350, "Farkas Gergely", { font: "8px 'Press Start 2P'", fill: "#000"});
        t1.anchor.set(0.5,0.5);
        var t2 = game.add.text(400, 370, "Debreczeni Gergely", { font: "8px 'Press Start 2P'", fill: "#000"});
        t2.anchor.set(0.5,0.5);
        var t3 = game.add.text(400, 390, "Fekete Csaba", { font: "8px 'Press Start 2P'", fill: "#000"});
        t3.anchor.set(0.5,0.5);
        /*var t4 = game.add.text(400, 285, "Farkas Gergely", { font: "7px 'Press Start 2P'", fill: "#000"});
        t4.anchor.set(0.5,0.5);*/

        var viki = game.add.text(400, 450, "Drawings by Karádi Viktória", { font: "bold 18px 'Press Start 2P'", fill: "#000"});
        viki.anchor.set(0.5,0.5);
        var tenfor = game.add.text(400, 500, "Created by Tenfor", { font: "bold 18px 'Press Start 2P'", fill: "#000"});
        tenfor.anchor.set(0.5,0.5);

        var buttonStart = new TextButton("Back", 1, 6, G.TITLE);
        buttonStart.y = 570;
        

        //icons
        var varthen = game.add.sprite(100,100,"player");
        varthen.anchor.set(0.5,0.5);
        varthen.scale.set(2.7,2.7);
        varthen.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
 
        var necro = game.add.sprite(700,250,"necro");
        necro.anchor.set(0.5,0.5);
        necro.scale.set(-2.7,2.7);
        necro.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
     
        var player2 = game.add.sprite(100,250,"player2");
        player2.anchor.set(0.5,0.5);
        player2.scale.set(2.7,2.7);
        player2.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        
        var shadowform = game.add.sprite(700,100,"shadowform");
        shadowform.anchor.set(0.5,0.5);
        shadowform.scale.set(-2.7,2.7);
        shadowform.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
       
        var tori = game.add.sprite(700,400,"tori");
        tori.anchor.set(0.5,0.5);
        tori.scale.set(-2.7,2.7);
        tori.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

        var landor = game.add.sprite(100,400,"landor");
        landor.anchor.set(0.5,0.5);
        landor.scale.set(2.7,2.7);
        landor.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;


    }
}
