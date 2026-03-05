var CharacterState = {
    preload: function() {},
    create: function() {
        model.state="mapState";
        var bg = new Background("menubg");
        soundButtons = new SoundButtons();

        chartitleText = game.add.text(400,40, "Character", { font: "25px 'Press Start 2P'", fill: "#000",align:'right'});
        chartitleText.anchor.set(0.5,0.5);     
        this.loadCharacter();   
        this.loadStats();
        this.loadBars();
        this.loadRelics();
      
       this.buttonback = new TextButton("Back", 1, 6,G.BACKTOTOWN);
       this.buttonback.x = 400;
       this.buttonback.y = 570;

       this.infoText = game.add.text(400,450, "", { font: "14px 'Press Start 2P'", fill: "#000",align:'right'});  
       this.infoText.anchor.set(0.5,0.5);

       this.relicnameText = game.add.text(400,410, "", { font: "18px 'Press Start 2P'", fill: "#000",align:'right'});  
       this.relicnameText.anchor.set(0.5,0.5);
      
    },
    update: function() {  
        this.relicsHover();
    },
    loadCharacter:function(){
        this.playersprite = game.add.sprite(90 ,130,"player");
        this.playersprite.scale.set(2.7,2.7);
        this.playersprite.anchor.set(0.5,0.5);
        this.playersprite.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

        this.staffsprite = game.add.sprite(104 ,132,"staff1");
        this.staffsprite.scale.set(2.7,2.2);
        this.staffsprite.anchor.set(0.5,0.5);
        this.staffsprite.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

        game.world.bringToTop(this.playersprite);
    },
    loadStats:function()
    {
        this.sptext = game.add.text(30,270, "Spell power: "+model.dmg, { font: "12px 'Press Start 2P'", fill: "#000",align:'right'});
        this.sptext.inputEnabled = true;

      /*  this.hptext = game.add.text(30,180, "Max HP: "+model.maxhp, { font: "12px 'Press Start 2P'", fill: "#000",align:'right'});  
        this.hptext.inputEnabled = true;

        this.mptext = game.add.text(30,200, "Max Mana: "+model.maxhp, { font: "12px 'Press Start 2P'", fill: "#000",align:'right'});  
        this.mptext.inputEnabled = true; */

        this.crit1text = game.add.text(30,290, "Critical Chance: "+model.crit+"%", { font: "12px 'Press Start 2P'", fill: "#000",align:'right'});  
        this.crit1text.inputEnabled = true;

        this.crit2text = game.add.text(30,310, "Critical Damage: "+model.critdmg*100+"%", { font: "12px 'Press Start 2P'", fill: "#000",align:'right'});  
        this.crit2text.inputEnabled = true;

        this.goldXtext = game.add.text(30,330, "Gold multiplier: "+model.goldgain+"X", { font: "12px 'Press Start 2P'", fill: "#000",align:'right'});  
        this.goldXtext.inputEnabled = true;

        this.xpdXtext = game.add.text(30,350, "XP multiplier: "+model.xpgain+"X", { font: "12px 'Press Start 2P'", fill: "#000",align:'right'});  
        this.xpdXtext.inputEnabled = true;
    },
    loadBars:function()
    {
        this.charHealthbar = new HealthBar(this.game,{x:90, y:180, width:120, height:18});
        this.charEnergybar = new HealthBar(this.game,{x:90, y:205, width:120, height:18});
        this.charXpbar = new HealthBar(this.game,{x:90, y:230, width:120, height:18});
        this.charEnergybar.setBarColor("#aaf");
        this.charXpbar.setBarColor("#ffa");
        this.charHealthbarText =  game.add.text(this.charHealthbar.x, this.charHealthbar.y+5, model.hp+"/"+model.maxhp, { font: "bold 10px 'Press Start 2P'", fill: "#000",align:'right'});
        this.charHealthbarText.anchor.set(0.5,0.5);
        this.charEnergybarText =  game.add.text(this.charEnergybar.x, this.charEnergybar.y+5, model.energy+"/"+model.maxenergy, { font: "bold 10px 'Press Start 2P'", fill: "#000",align:'right'});
        this.charEnergybarText.anchor.set(0.5,0.5);
        this.charXpbarText =  game.add.text(this.charXpbar.x, this.charXpbar.y+5, model.xp+"/"+model.xptonextlv[model.level], { font: "bold 10px 'Press Start 2P'", fill: "#000",align:'right'});
        this.charXpbarText.anchor.set(0.5,0.5);
        this.charXpbar.barSprite.width = 120*(model.xp/model.xptonextlv[model.level]);
        this.charHealthbar.barSprite.width = 120*(model.hp/model.maxhp);
        this.charEnergybar.barSprite.width = 120*(model.energy/model.maxenergy);
        
        this.potiicon = game.add.sprite(190,180,"potiicon");
        this.potiicon.anchor.set(0.5,0.5);
        this.potiText = game.add.text(220, 185, ""+model.poti+"/3", { font: "bold 16px 'Press Start 2P'", fill: "#000",align:'right'});
        this.potiText.anchor.set(0,0.5);

        this.charLvText = game.add.text(175, 210, "Level: "+(model.level+1), { font: "bold 16px 'Press Start 2P'", fill: "#000",align:'right'});
        this.charLvText.anchor.set(0,0.5);
        this.charGoldText = game.add.text(175, 235, "Gold: "+model.cash, { font: "bold 16px 'Press Start 2P'", fill: "#ff6600",align:'right'});
        this.charGoldText.anchor.set(0,0.5);

        if(model.level == model.maxlvl)
        {
            this.charXpbarText.text = "Max Level"
            this.charXpbar.barSprite.width = 120;
        }

    },
    loadRelics:function()
    {
        this.relics = [];
        for (let i = 0; i < model.relics.length; i++) {
            this.relics.push(game.add.sprite(330+(1+i%6)*65,145+(Math.floor(i/6)*65),model.relics[i].spritekey));
            if(!model.relics[i].have) this.relics[i].tint = 0x000;
            this.relics[i].scale.set(1.2,1.2);
            this.relics[i].anchor.set(0.5,0.5);
            this.relics[i].inputEnabled = true;
        }
    },
    relicsHover:function()
    {
        var pointerOverAny = false;
        for (let i = 0; i < this.relics.length; i++) {
            if(this.relics[i].input.pointerOver())
            {
                this.relics[i].scale.set(1.8);
                if(this.relics[i].tint == 0x000) 
                {
                    this.infoText.text = "Locked";
                }
                else
                {
                    this.relicnameText.text = ""+model.relics[i].name;
                    switch(model.relics[i].type)
                    {
                        case "hp":
                            this.infoText.text = "Increases your maximum HP by "+model.relics[i].value+".";
                            break;
                        case "mp":
                            this.infoText.text = "Increases your maximum mana by "+model.relics[i].value+".";
                            break;
                        case "crit1":
                            this.infoText.text = "Increases your critical chance by "+model.relics[i].value+"%";
                            break;
                        case "crit2":
                            this.infoText.text = "Increases your critical damage by "+(model.relics[i].value*100)+"%";
                            break;
                        case "gold":
                            this.infoText.text = "Increases the amount of gold you gain by "+(model.relics[i].value*100)+"%";
                            break;
                        case "xp":
                            this.infoText.text = "Increases the amount of XP you gain by "+(model.relics[i].value*100)+"%";
                            break;
                        case "dmg":
                            this.infoText.text = "Increases your Spell Power by "+(model.relics[i].value)+".";
                            break;
                        case "hpmp":
                            this.infoText.text = "Increases your HP and mana by "+(model.relics[i].value)+".";
                            break;
                        case "dark":
                            this.infoText.text = "Releases your hidden evil.";
                            break;
                    }
                }
                pointerOverAny = true;
            }
            else
            {
                this.relics[i].scale.set(1.2);
            }
        }
        if(!pointerOverAny)
        {
            this.infoText.text = "";
            this.relicnameText.text = "";
        }
    }
}
