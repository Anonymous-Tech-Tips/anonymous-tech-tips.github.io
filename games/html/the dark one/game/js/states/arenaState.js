
var ArenaState = {
    preload: function() {},
    create: function() {
        model.state="ArenaState";
        var bg = new Background("menubg");
        soundButtons = new SoundButtons();

        this.silverlock = true;
        this.goldlock = true;
        
        this.titleText = game.add.text(400,40, "Sunwell City Arena", { font: "22px 'Press Start 2P'", fill: "#000",align:'right'});
        this.titleText.anchor.set(0.5,0.5);
        
        this.bronzeCup = game.add.sprite(200,250,"bronzecup");
        this.bronzeCup.anchor.set(0.5,0.5);
        this.bronzeCup.scale.set(2.5,2.5);
        this.bronzeCup.inputEnabled = true;
        this.bronzeCup.events.onInputDown.add(function(){this.startCup("bronze")},this);

        this.bronzeCupText = game.add.text(200,170, "Bronze Cup", { font: "15px 'Press Start 2P'", fill: "#000",align:'right'});
        this.bronzeCupText.anchor.set(0.5,0.5);

       /* this.bronzeCupWon =  game.add.text(210,240, "WON!", { font: "bold 25px 'Press Start 2P'", fill: "#f00",align:'center'});
        this.bronzeCupWon.anchor.set(0.5,0.5);*/
      //  this.bronzeCupWon.angle -= 45;

        this.silverCup = game.add.sprite(400,250,"silvercup");
        this.silverCup.anchor.set(0.5,0.5);
        this.silverCup.scale.set(2.5,2.5);
        this.silverCup.inputEnabled = true;
        this.silverCup.events.onInputDown.add(function(){this.startCup("silver")},this);

        this.silverCupText = game.add.text(400,170, "Silver Cup", { font: "15px 'Press Start 2P'", fill: "#000",align:'right'});
        this.silverCupText.anchor.set(0.5,0.5);
       
        this.goldCup = game.add.sprite(600,250,"goldcup");
        this.goldCup.anchor.set(0.5,0.5);
        this.goldCup.scale.set(2.5,2.5);
        this.goldCup.inputEnabled = true;
        this.goldCup.events.onInputDown.add(function(){this.startCup("gold")},this);

        this.goldCupText = game.add.text(600,170, "Gold Cup", { font: "15px 'Press Start 2P'", fill: "#000",align:'right'});
        this.goldCupText.anchor.set(0.5,0.5);

        this.bronzeCup.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        this.silverCup.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        this.goldCup.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

        this.tipText = game.add.text(400,450, "Click on a trophy to begin the fight in the Arena!", { font: "16px 'Press Start 2P'", fill: "#000",align:'center'});
        this.tipText.anchor.set(0.5,0.5);
        this.tipText.wordWrap = true;
        this.tipText.wordWrapWidth = 700;

        this.buttonback = new TextButton("Back", 1, 6,G.BACKTOTOWN);
        this.buttonback.y = 570;


        model.relics.forEach(relic => {
            if(relic.name == "Scourge Dagger"&&relic.have == true)
            {
                this.bronzeCupWon =  game.add.text(210,330, "WON!", { font: "bold 25px 'Press Start 2P'", fill: "#f00",align:'center'});
                this.bronzeCupWon.anchor.set(0.5,0.5);
                this.silverlock = false;
            }
            else if(relic.name == "Scourge Dagger"&&relic.have != true)
            {
                this.silverCup.tint = 0x000;
                this.silverCupLocked = game.add.text(400,330, "Locked!", { font: "16px 'Press Start 2P'", fill: "#000",align:'center'});
                this.silverCupLocked.anchor.set(0.5,0.5);
            }
            if(relic.name == "Mirror of Truth"&&relic.have == true)
            {
                this.silverCupWon =  game.add.text(410,330, "WON!", { font: "bold 25px 'Press Start 2P'", fill: "#f00",align:'center'});
                this.silverCupWon.anchor.set(0.5,0.5);
                this.goldlock = false;
            }
            else if(relic.name == "Mirror of Truth"&&relic.have != true)
            {
                this.goldCup.tint = 0x000;
                this.goldCupLocked = game.add.text(600,330, "Locked!", { font: "16px 'Press Start 2P'", fill: "#000",align:'center'});
                this.goldCupLocked.anchor.set(0.5,0.5);
            }
            if(relic.name == "Blade of Tenfor"&&relic.have == true)
            {
                this.goldCupWon =  game.add.text(610,330, "WON!", { font: "bold 25px 'Press Start 2P'", fill: "#f00",align:'center'});
                this.goldCupWon.anchor.set(0.5,0.5);
            }

        });
      

    },
    update: function() {         
        if(this.bronzeCup.input.pointerOver())
        {
            this.bronzeCup.scale.set(3,3);
        } 
        else
        {
            this.bronzeCup.scale.set(2.5,2.5);
        }
        if(this.silverCup.input.pointerOver())
        {
            this.silverCup.scale.set(3,3);
        } 
        else
        {
            this.silverCup.scale.set(2.5,2.5);
        }
        if(this.goldCup.input.pointerOver())
        {
            this.goldCup.scale.set(3,3);
        } 
        else
        {
            this.goldCup.scale.set(2.5,2.5);
        }
    },
    startCup:function(cup)
    {
        model.map = model.maps.arena;
        model.currX = model.map.startX;
        model.currY = model.map.startY;

        
        //restore
        model.hp = model.maxhp;
        model.energy = model.maxenergy;
        switch(cup)
        {
            case "bronze":
            model.cup = "bronze";
                eventDispatcher.dispatch(G.SETENEMY,{
                    x:580,
                    y:405,
                    sprite:"chicken",
                    hp:30,
                    str:1,
                    speed:1.5,
                    escaleX:-1.2,
                    escaleY:1.2,
                    reward:5,
                    xpreward:5,
                    attacks:["tribasic","lionstrike"],
                    name:"Attila the Hen"
                });
                game.state.start("StateMain");
                break;
            case "silver":
            if(!this.silverlock)
            {
                model.cup = "silver";
                eventDispatcher.dispatch(G.SETENEMY,{
                    x:580,
                    y:380,
                    sprite:"frost7",
                    hp:150,
                    str:4,
                    speed:1.2,
                    escaleX:-3,
                    escaleY:3,
                    reward:5,
                    xpreward:5,
                    attacks:["skip","trifrostball","enemyshieldbig","frostbolt2","eulti2"],
                    name:"Arctic"
                    });
                    game.state.start("StateMain");
            }
            else eventDispatcher.dispatch(G.PLAY_SOUND,"buttonlocked");
                    break;
            case "gold":
            if(!this.goldlock)
            {
                model.cup = "gold";
                model.landormod = 1;
                eventDispatcher.dispatch(G.SETENEMY,{
                    x:580,
                    y:384,
                    sprite:"landorarena",
                    hp:3500,
                    str:7,
                    speed:1.8,
                    escaleX:-3,
                    escaleY:3,
                    reward:5,
                    xpreward:5,
                    attacks:["tribasic","lionstrike2","tribasic","estun3"],
                    name:"Landor"
                    });
                    game.state.start("StateMain");
            }
            else eventDispatcher.dispatch(G.PLAY_SOUND,"buttonlocked");
                break;
        }   
 
    }
   

}
