
var shopitems,shopsprites,shopnames,shopprices,shopinfos;
var shoptitleText;
var shopbuttonback;
var shopgoldtext;
var shopinfoText;
var ShopState = {
    preload: function() {},
    create: function() {
        model.state="mapState";
        var bg = new Background("menubg");
        soundButtons = new SoundButtons();

     /*   switch(model.potilvl)
        {
            case 0:
                model.potiprice = 5;
                break;
            case 1:
                model.potiprice = 10;
                break;
            case 2: 
                model.potiprice = 15;
                break;
            case 3:
                model.potiprice = 20;
                break;
        }*/
        model.potiprice = 5;
        shoptitleText = game.add.text(400,40, "Mr. Smith's Shop", { font: "22px 'Press Start 2P'", fill: "#000",align:'right'});
        shoptitleText.anchor.set(0.5,0.5);

        
        this.loadShopStuff();
        this.loadShopKeeper();
        this.loadShopTitle();
        setStats();


        
      

    },
    update: function() {
        if(shopsprites[0].input.pointerOver())
        {
            shopsprites[0].scale.set(2,2);
            this.shopinfoTextSwitch(0);
        }
        else
        {
            shopsprites[0].scale.set(1.5,1.5);
            shopinfoText.text = "";
        }
        
        if(shopsprites[1].input.pointerOver())
        {
            shopsprites[1].scale.set(2,2);
            this.shopinfoTextSwitch(1);
        }
        else
        {
            shopsprites[1].scale.set(1.5,1.5);
        }

        if(shopsprites[2].input.pointerOver())
        {
            shopsprites[2].scale.set(2,2);
            this.shopinfoTextSwitch(2);
        }
        else
        {
            shopsprites[2].scale.set(1.5,1.5);
        }

        if(shopsprites[3].input.pointerOver())
        {
            shopsprites[3].scale.set(2,2);
            shopinfoText.text = "Potions can heal you during a fight.";
        }
        else
        {
            shopsprites[3].scale.set(1.5,1.5);
        }
        
        if(shopitems[0].have) shopsprites[0].x = -1000;
        if(shopitems[1].have) shopsprites[1].x = -1000;
        if(shopitems[2].have) shopsprites[2].x = -1000;
        shopgoldtext.text = "Gold: "+model.cash;

        shopnames[3].text = "Potion "+model.poti+"/3";
          
    },
    loadShopKeeper:function()
    {
        var x = game.add.sprite(400,120,"merchant");
        x.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        x.scale.set(3,3);
        x.anchor.set(0.5,0.5);
        switch(model.shoplocation)
        {
            case "sw1":
                break;
            case "sw2":
                x.loadTexture("townsfolk7");
                break;
            case "gw":
                x.loadTexture("merchant2");
                x.scale.set(-3,3);
                break;
            case "wf":
                x.loadTexture("merchant3");
                break;
        }
    },
    loadShopTitle:function()
    {
        switch(model.shoplocation)
        {
            case "sw1":
                shoptitleText.text = "Mr. Smith's Shop";
                break;
            case "sw2":
                shoptitleText.text = "Mr. Johnson's Shop";
                break;
            case "gw":
                shoptitleText.text = "Mr. Blazorp's Shop";
                break;
            case "wf":
                shoptitleText.text = "Mr. Miller's Shop";
                break;

        }
    },  
    loadShopStuff:function()
    {
        shopitems = []; 
        shopsprites = []; 
        shopnames = []; 
        shopprices = []; 
        var count = 0;
        model.relics.forEach(function(r) {
                if(count<3&&r.location == model.shoplocation)
                {
                  
                    shopitems.push(r);
                    var x = game.add.sprite(100+(count)*200,300,""+r.spritekey);
                    x.anchor.set(0.5,0.5);
                    x.scale.set(1.5,1.5);
                    shopsprites.push(x);
                   

                    var p1 = game.add.text(100+(count)*200,350, shopitems[count].price, { font: "12px 'Press Start 2P'", fill: "#000",align:'right'});
                    p1.anchor.set(0.5,0.5);
                    shopprices.push(p1);

                    var t1 = game.add.text(100+(count)*200,250, shopitems[count].name, { font: "12px 'Press Start 2P'", fill: "#000",align:'right'});
                    t1.anchor.set(0.5,0.5);
                    shopnames.push(t1);

                    count++;
                }
          });

          var x = game.add.sprite(100+(3)*200,300,"potiicon");
          x.anchor.set(0.5,0.5);
          x.scale.set(1.5,1.5);
          shopsprites.push(x);

          var p1 = game.add.text(100+(3)*200,350, model.potiprice, { font: "12px 'Press Start 2P'", fill: "#000",align:'right'});
          p1.anchor.set(0.5,0.5);
          shopprices.push(p1);

          var t1 = game.add.text(100+(count)*200,250, "Potion "+model.poti+"/3", { font: "12px 'Press Start 2P'", fill: "#000",align:'right'});
          t1.anchor.set(0.5,0.5);
          shopnames.push(t1);
             
        shopsprites[0].inputEnabled = true;
        shopsprites[0].events.onInputDown.add(function(){this.buy(0)},this);
        shopsprites[1].inputEnabled = true;
        shopsprites[1].events.onInputDown.add(function(){this.buy(1)},this);
        shopsprites[2].inputEnabled = true;
        shopsprites[2].events.onInputDown.add(function(){this.buy(2)},this);
        shopsprites[3].inputEnabled = true;
        shopsprites[3].events.onInputDown.add(function(){this.buy(3)},this);
      

          shopbuttonback = new TextButton("Back", 1, 6,G.BACKTOTOWN);
          shopbuttonback.x = 400;
          shopbuttonback.y = 570;

          shopgoldtext=game.add.text(400, 500, "Gold: "+model.cash, { font: "bold 25px 'Press Start 2P'", fill: "#000"});
          shopgoldtext.anchor.set(0.5,0.5);

            shopinfoText = game.add.text(game.width/2, 400, "", { font: "bold 15px 'Press Start 2P'", fill: "#000"});
            shopinfoText.anchor.set(0.5,0.5);
    },
    shopinfoTextSwitch:function(num)
    {
        switch(shopitems[num].type)
        {
            case "crit1":
                shopinfoText.text = "Increases your critical chance by "+shopitems[num].value+"%";
                break;
            case "crit2":
                shopinfoText.text = "Increases your critical damage by "+(shopitems[num].value*100)+"%";
                break;
            case "hp":
                shopinfoText.text = "Increases your maximum HP by "+shopitems[num].value+".";
                break;
            case "mp":
                shopinfoText.text = "Increases your maximum mana by "+shopitems[num].value+".";
                break;
            case "hpmp":
                shopinfoText.text = "Increases your maximum HP and mana by "+shopitems[num].value+".";
                break;
            case "gold":
                shopinfoText.text = "Increases the amount of gold you gain by "+(shopitems[num].value*100)+"%";
                break;
            case "xp":
                shopinfoText.text = "Increases the amount of XP you gain by "+(shopitems[num].value*100)+"%";
                break;
            case "dmg":
                shopinfoText.text = "Increases your spellpower by "+(shopitems[num].value)+".";
                break;

        }
    },
    buy:function(num)
    {
        if(num == 3) //poti
        {
            if(model.cash>=model.potiprice&&model.poti<3)
            {
                model.poti++;
                model.cash-=model.potiprice;
                eventDispatcher.dispatch(G.PLAY_SOUND,"coin");
            }
            else
            {
                eventDispatcher.dispatch(G.PLAY_SOUND,"buttonlocked");
            }
        }
        else //egyéb
        {
            if(model.cash >= shopitems[num].price)
            {
                model.relics.forEach(e => {
                    if(e.name == shopitems[num].name)
                    {
                        e.have = true;
                        shopitems[num].have = true;
                        model.cash-=shopitems[num].price;
                        eventDispatcher.dispatch(G.PLAY_SOUND,"coin");

                    }
                });
            }
            else
            {
                eventDispatcher.dispatch(G.PLAY_SOUND,"buttonlocked");
            }
        }
        setStats();
        saveData();
    }

}
