//texts
var firetext;
var frosttext;
var potitext;
var shieldtext;
var ulti1text;
var ulti2text;


var infoText;
var cashText;
var xpText;

//icons
var fireicon;
var frostbtn;
var potibtn;
var shieldbtn;
var ulti1btn;
var ulti2btn;

//buttons
var firebtn;
var frostbtn;
var potibtn;
var shieldbtn;
var ulti1btn;
var ulti2btn;
//prices 
var fireprice;
var frostprice;
var potiprice;
var shieldprice;
var ulti1price;
//var ulti2price; ?

//locks
var potilock;
var shieldlock;
var ulti1lock;

var upgrades = {
    preload: function() {},
    create: function() {   
        this.setPrices();

       
       
        model.state="ugrades";
        var bg = new Background("menubg");
        soundButtons = new SoundButtons();
          
      
        this.titleText = game.add.text(game.width/2, 50, "Spells", { font: "bold 45px 'Press Start 2P'", fill: "#000"});
        this.titleText.anchor.set(0.5,0.5);

        infoText = game.add.text(game.width/2, 400, "", { font: "bold 12px 'Press Start 2P'", fill: "#000", align:'center'});
        infoText.anchor.set(0.5,0.5);
       
        
      
        
      firebtn = game.add.sprite(170,170, 'btnLvlUp');
      firebtn.anchor.set(0.5,0.5);
      firebtn.scale.set(0.8,0.8);
      firebtn.inputEnabled = true;
      firebtn.events.onInputDown.add(function(){this.buy("fire")},this);
      fireicon = game.add.image(50,170,"btnfireball");
      fireicon.anchor.set(0.5,0.5);
      fireicon.scale.set(0.8,0.8);
      firetext = game.add.text(200, 172, "Fireball - "+ model.fire+"/3", { font: "bold 15px 'Press Start 2P'", fill: "#000"});
      firetext.anchor.set(0.5,0.5);

     frostbtn = game.add.sprite(170,240, 'btnLvlUp');
     frostbtn.anchor.set(0.5,0.5);
     frostbtn.scale.set(0.8,0.8);
     frostbtn.inputEnabled = true;
     frostbtn.events.onInputDown.add(function(){this.buy("frost")},this);
     frosticon = game.add.image(50,240,"btnfrostbolt");
     frosticon.anchor.set(0.5,0.5);
     frosticon.scale.set(0.8,0.8);
     frosttext = game.add.text(200, 242, "Frostbolt - "+ model.frost+"/3", { font: "bold 15px 'Press Start 2P'", fill: "#000"});
     frosttext.anchor.set(0.5,0.5);
      
      potibtn = game.add.sprite(170,310, 'btnLvlUp');
      potibtn.anchor.set(0.5,0.5);
      potibtn.scale.set(0.8,0.8);
      potibtn.inputEnabled = true;
      potibtn.events.onInputDown.add(function(){this.buy("poti")},this);
      potiicon = game.add.image(50,310,"btnpoti");
      potiicon.anchor.set(0.5,0.5);
      potiicon.scale.set(0.8,0.8);
      potitext = game.add.text(200, 312, "Alchemy - "+ model.poti+"/3", { font: "bold 15px 'Press Start 2P'", fill: "#000"});
      potitext.anchor.set(0.5,0.5);
      






      shieldbtn = game.add.sprite(630,170, 'btnLvlUp');
      shieldbtn.anchor.set(0.5,0.5);
      shieldbtn.scale.set(0.8,0.8);
      shieldbtn.inputEnabled = true;
      shieldbtn.events.onInputDown.add(function(){this.buy("shield")},this);
      shieldicon = game.add.image(510,170,"btnbarrier");
      shieldicon.anchor.set(0.5,0.5);
      shieldicon.scale.set(0.8,0.8);
      shieldtext = game.add.text(660, 172, "Power Shield - "+ model.shield+"/3", { font: "bold 12px 'Press Start 2P'", fill: "#000"});
      shieldtext.anchor.set(0.5,0.5);

      ulti1btn = game.add.sprite(630,240, 'btnLvlUp');
      ulti1btn.anchor.set(0.5,0.5);
      ulti1btn.scale.set(0.8,0.8);
      ulti1btn.inputEnabled = true;
      ulti1btn.events.onInputDown.add(function(){this.buy("ulti1")},this);
      ulti1icon = game.add.image(510,240,"btnulti1");
      ulti1icon.anchor.set(0.5,0.5);
      ulti1icon.scale.set(0.8,0.8);
      ulti1text = game.add.text(660, 242, "Mana Explosion - "+ model.ulti1+"/3", { font: "bold 11px 'Press Start 2P'", fill: "#000"});
      ulti1text.anchor.set(0.5,0.5);
      
      ulti2btn = game.add.sprite(630,310, 'btnLvlUp');
      ulti2btn.anchor.set(0.5,0.5);
      ulti2btn.scale.set(0.8,0.8);
      ulti2btn.inputEnabled = true;
      ulti2btn.events.onInputDown.add(function(){this.buy("ulti2")},this);
      ulti2icon = game.add.image(510,310,"btnulti2");
      ulti2icon.anchor.set(0.5,0.5);
      ulti2icon.scale.set(0.8,0.8);
      ulti2text = game.add.text(660, 312, "Shadow Form - "+ model.ulti2+"/1", { font: "bold 12px 'Press Start 2P'", fill: "#000"});
      ulti2text.anchor.set(0.5,0.5);
      ulti2btn.tint = 0x444444;
      ulti2icon.tint = 0x444444;





            
        skillpointText = game.add.text(0, 0, "Skillpoints: "+model.xp, { font: "bold 25px 'Press Start 2P'", fill: "#000"});
        skillpointText.anchor.set(0.5,0.5);
        Align.center(skillpointText);
        skillpointText.y = 500;



        var buttonLevelSelect = new TextButton("Back", 1, 5,G.BACKTOTOWN);
        Align.center(buttonLevelSelect);
        buttonLevelSelect.y = 550;
 
        



    },
    update: function() {
        //locks
        potilock = model.level<4;
        shieldlock = model.level<7;
        ulti1lock = model.level<12;
        
        this.textsUpdates();
        this.tintUpdates();
    },
    tintUpdates:function()
    {
        if(model.skillpoint>=fireprice && model.fire<3)
        {
            firebtn.tint = 0x00ff00;
            fireicon.tint = 0xffffff;
        }
        else if(model.fire==3)
        {
            firebtn.tint = 0xffffff;
            fireicon.tint = 0xffffff;
        }
        else
        {
            firebtn.tint = 0x999999;
            fireicon.tint = 0x999999;
        }

        if(model.skillpoint>=frostprice&&model.frost<3)
        {
            frostbtn.tint = 0x00ff00;
            frosticon.tint = 0xffffff;
        }
        else if(model.frost == 3)
        {
            frostbtn.tint = 0xffffff;
            frosticon.tint = 0xffffff;
        }
        else
        {
            frostbtn.tint = 0x999999;
            frosticon.tint = 0x999999;
        }

        if(model.skillpoint>=potiprice&&model.potilvl<3)
        {
            potibtn.tint = 0x00ff00;
            potiicon.tint = 0xffffff;
        }
        else if(model.potilvl == 3)
        {
            potibtn.tint = 0xffffff;
            potiicon.tint = 0xffffff;
        }
        else
        {
            potibtn.tint = 0x999999;
            potiicon.tint = 0x999999;
        }
        
        if(model.skillpoint>=shieldprice&&model.shield<3)
        {
            shieldbtn.tint = 0x00ff00;
            shieldicon.tint = 0xffffff;
        }
        else if(model.shield == 3)
        {
            shieldbtn.tint = 0xffffff;
            shieldicon.tint = 0xffffff;
        }
        else
        {
            shieldbtn.tint =0x999999;
            shieldicon.tint =0x999999;
        }

        if(model.skillpoint>=ulti1price&&model.ulti1<2)
        {
            ulti1btn.tint = 0x00ff00;
            ulti1icon.tint = 0xffffff;
        }
        else if(model.ulti1 == 2)
        {
            ulti1btn.tint = 0xffffff;
            ulti1icon.tint = 0xffffff;
        }
        else
        {
            ulti1btn.tint = 0x999999;
            ulti1icon.tint = 0x999999;
        }
        



        if(model.level<4)
        {
            potibtn.tint = 0x333333;
            potiicon.tint = 0x333333;
        }
        if(model.level<7)
        {
            shieldbtn.tint = 0x333333;
            shieldicon.tint = 0x333333;
        }
        if(model.level<11)
        {
            ulti1btn.tint = 0x333333;
            ulti1icon.tint = 0x333333;
        }

        if(model.ulti2 == 1)
        {
            ulti2btn.tint = 0xffffff;
            ulti2icon.tint = 0xffffff;
        }

    },
    setPrices:function()
    {
        //prices
        fireprice = 1;
        //frostprice
        switch(model.frost)
        {
            case 0:
                frostprice = 1;
                break;
            case 1:
                frostprice = 1;
                break;
            case 2:
                frostprice = 2;
                break;
            default:
                frostprice = 99;
                break;
        }
        switch(model.potilvl)
        {
           
            case 0:
                potiprice = 1;
                break;
            case 1:
                potiprice = 1;
                break;
            case 2:
                potiprice = 2;
                break;
        }
        switch(model.shield)
        {
            case 0:
                shieldprice = 1;
                break;
            case 1:
                shieldprice = 1;
                break;
            case 2:
                shieldprice = 2;
                break;
            default:
                shieldprice = 99;
                break;
        }
        //ulti1price
        switch(model.ulti1)
        {
            case 0:
                ulti1price = 2;
                break;
            case 1:
                ulti1price = 3;
                break;
            default:
                ulti1price = 99;
                break;
        }
    },
    textsUpdates:function()
    {
        //btntext 0/3 stuff
        firetext.text = "Fireball - "+model.fire+"/3";
        frosttext.text = "Frostbolt - "+model.frost+"/3";
        potitext.text = "Alchemy - "+model.potilvl+"/3";
        shieldtext.text = "Power Shield - "+model.shield+"/3";
        ulti1text.text = "Mana Explosion - "+model.ulti1+"/2";
 
        skillpointText.text = "Skillpoints: "+model.skillpoint;
               //hover
        if (firebtn.input.pointerOver())
        {
            if(model.fire<3) infoText.text = "Price: "+fireprice;
            else infoText.text = "Max Level";
            infoText.text+="\nThrows a fireball to your opponent for multiple damage!";
            if(model.fire<3){
                infoText.text += "\nCurrent: "+(1+0.5*model.fire)+"X - Next lvl: "+(1+0.5*(model.fire+1))+"X";
            }
            else    infoText.text += "\nCurrent: "+(1+0.5*model.fire)+"X";
        }
        else if (frostbtn.input.pointerOver())
        {
            if(model.frost<3) infoText.text = "Price: "+frostprice;
            else infoText.text = "Max Level";
            infoText.text +="\nFreezes your opponent for a short time!";
            if(model.frost == 0)
            {
                infoText.text += "\nCurrent: 0 sec - Next lvl: "+((model.frost+1))+" sec.";
            }
            else if(model.frost<3)
            {
                infoText.text += "\nCurrent: "+(model.frost)+" sec - Next lvl: "+((model.frost+1))+" sec.";
            }
            else    infoText.text += "\nCurrent: "+(model.frost)+" sec.";
        }
        else if (potibtn.input.pointerOver())
        {
            if(potilock)
            {
                infoText.text = "Locked until level 5!";
            }
            else
            {
                if(model.potilvl<3) infoText.text = "Price: "+potiprice;
                else infoText.text = "Max Level";
                infoText.text += "\nIncreases potions efficiency!";
                switch(model.potilvl)
                {
                    case 0:
                        infoText.text += "\nCurrent: Restores 20% of your HP.\nNext lvl: Restores 33% of your HP and mana.";
                    break;
                    case 1: 
                        infoText.text += "\nCurrent: Restores 33% of your HP and mana.\nNext lvl: Restores 50% of your HP and mana.";
                    break;
                    case 2:
                        infoText.text += "\nCurrent: Restores 50% of your HP and mana.\nNext lvl: Restores 66% of your HP and mana.";
                    break;
                    case 3:
                        infoText.text += "\nCurrent: Restores 66% of your HP and mana.";
                    break;
                }
            }
        }
        else if (shieldbtn.input.pointerOver())
        {
            if(shieldlock)
            {
                infoText.text = "Locked until level 8!";
            }
            else
            {
                if(model.shield<3) infoText.text = "Price: "+shieldprice;
                else infoText.text = "Max Level";
                infoText.text += "\nConjures a magical barrier that protects you from a few hits!";
                if(model.shield<3)
                {
                    infoText.text += "\nCurrent: "+(model.shield)+" hits - Next lvl: "+((model.shield+1))+" hits.";
                }
                else    infoText.text += "\nCurrent: "+(1*model.shield)+" hits.";
            }
        }
        else if (ulti1btn.input.pointerOver())
        {
            if(ulti1lock)
            {
                infoText.text = "Locked until level 12!";
            }   
            else
            {
                if(model.ulti1<2) infoText.text = "Price: "+ulti1price;
                else infoText.text = "Max Level";
                infoText.text += "\nCasts a deadly spell and deals 10X damage!";
                if(model.ulti1==0)
                {
                    infoText.text += "\nNext lvl: Cast Time:"+(5.5-(model.ulti1*2))+" sec.";
                }
                else if(model.ulti1<2)
                {
                    infoText.text += "\nCurrent Cast Time: "+(5.5-((model.ulti1)*2))+" sec - Next lvl: "+(5.5-((model.ulti1+1)*2))+" sec.";
                }
                else  infoText.text += "\nCurrent Cast Time: "+(5.5-((model.ulti1)*2));
            }
        }
        else if(ulti2btn.input.pointerOver())
        {
            if(model.ulti2 == 0)
            infoText.text = "???";
            else
            infoText.text = "For half of your HP releases your hidden evil.\nRestores 100% of your mana and reduces every cooldown by 66%\nCannot be used when your HP lower than 20."
        }
        else
        {
            infoText.text = "";
        } 
    },
    buy:function(sk)
    {
        switch(sk)
        {
            case "fire":
                if(model.skillpoint>=fireprice&&model.fire<3)
                {
                    model.fire++;
                    model.skillpoint-=fireprice;
                    this.setPrices();
                    eventDispatcher.dispatch(G.PLAY_SOUND,"coin");
                }
                else
                {
                    eventDispatcher.dispatch(G.PLAY_SOUND,"buttonlocked");
                }
                break;
            case "frost":
                if(model.skillpoint>=frostprice&&model.frost<3)
                {
                    model.frost++;
                    model.skillpoint-=frostprice;
                    this.setPrices();
                    eventDispatcher.dispatch(G.PLAY_SOUND,"coin");
                }
                else
                {
                  eventDispatcher.dispatch(G.PLAY_SOUND,"buttonlocked");   
                }
                break;
            case "poti":
                if(model.skillpoint>=potiprice&&model.potilvl<3&&model.level>=4)
                {
                    model.potilvl++;
                    model.skillpoint-=potiprice;
                    this.setPrices();
                    eventDispatcher.dispatch(G.PLAY_SOUND,"coin");
                }
                else
                {
                  eventDispatcher.dispatch(G.PLAY_SOUND,"buttonlocked");   
                }
                break;
            case "shield":
                if(model.skillpoint>=shieldprice&&model.shield<3&&model.level>=7)
                {
                    model.shield++;
                    model.skillpoint-=shieldprice;
                    this.setPrices();
                    eventDispatcher.dispatch(G.PLAY_SOUND,"coin");
                }
                else
                {
                  eventDispatcher.dispatch(G.PLAY_SOUND,"buttonlocked");   
                }
                break;
            case "ulti1":
                if(model.skillpoint>=ulti1price&&model.ulti1<3&&model.level>=11)
                {
                    model.ulti1++;
                    model.skillpoint-=ulti1price;
                    this.setPrices();
                    eventDispatcher.dispatch(G.PLAY_SOUND,"coin");
                }
                else
                {
                  eventDispatcher.dispatch(G.PLAY_SOUND,"buttonlocked");   
                }
                break;
            case "ulti2":
                eventDispatcher.dispatch(G.PLAY_SOUND,"buttonlocked");   
                break;
        }
        saveData();
    },
    goToLevelSelect:function()
    {
        game.state.start("mapState");
    }
    //
}
    