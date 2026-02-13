class Controller {
    constructor() {
        eventDispatcher.add(this.gotEvent, this);
    }
    gotEvent(call, params) {
        //console.log("call=" + call);
        switch (call) {
            case G.UP_SCORE:
                model.upScore(params);
                break;
            case G.TOGGLE_SOUND:
                model.soundOn = params;
                break;
            case G.TOGGLE_MUSIC:
                model.musicOn = params;
                break;
            case G.START_GAME:
                if(model.currentQuest == 0)
                    game.state.start("StateStory");
                else
                {
                    if(model.map.name == "mtbattle")
                    {
                        model.map = model.maps.mt;
                        model.towns.mt5.conversation = "mt1";
                        model.currX = model.map.startX;
                        model.currY = model.map.startY;
                    }
                    else if(model.map.name == "ship")
                    {
                        model.map = model.maps.sw;
                        model.towns.ship1.conversation = "shipconv";
                        model.currX = model.map.startX;
                        model.currY = model.map.startY;
                    }
                    else if(model.map.name == "arena")
                    {
                        model.map = model.maps.sw;
                        model.currX = model.map.startX;
                        model.currY = model.map.startY;
                    }
                    else if(model.map.name == "swbattle")
                    {
                        model.towns.swbattle5.npcs =   [{
                            sprite: "tori",
                            x: 400,
                            y:393,
                            name:"Trisha",
                            msg:"",
                            msgspr:"tori",
                            scaleX:2.7,
                            scaleY:2.7,
                            face:-1,
                            shoplocation:""
                        },
                        {
                            sprite: "guard3",
                            x: 550,
                            y:385,
                            name:"Sir Bertrand",
                            msg:"",
                            msgspr:"guard3",
                            scaleX:3.2,
                            scaleY:3.2,
                            face:-1,
                            shoplocation:""
                        },
                        {
                            sprite: "landorarena",
                            x: 480,
                            y:389,
                            name:"Landor",
                            msg:"",
                            msgspr:"landor",
                            scaleX:2.7,
                            scaleY:2.7,
                            face:-1,
                            shoplocation:""
                        }];
                    }
                    game.state.start("StateTown");
                }
                break;
            case G.END_GAME:
                game.state.start("StateOver");
                break;
            case G.WALKTHROUGH:
                var win = window.open("https://www.youtube.com/watch?v=j-KfJd8n-1U", '_blank');
                win.focus();
                break;
            case G.LEVEL_SELECT:
                game.state.start("mapState");
                mediaManager.setBackgroundMusic("backgroundMusic2");
                model.berserknum = model.berserklvl;
                model.frenzynum = model.frenzylvl;
                model.regennum = model.regenlvl;
                model.revivenum = model.revivelvl;
                break;
            case G.UPGRADES:
                game.state.start("upgrades");
                break;
            case G.RESET:
                resetData();
                eventDispatcher.dispatch(G.HIDEPOPUP);
                break;
            case G.RESETCONFIRM:
                resetData();
                game.state.start("StateTitle");
                break;
            case G.RESETCANCEL:
                btnNo.destroy();
                btnYes.destroy();
                img.destroy();
                isConfirm = false;
                break;
            case G.TITLE:
                game.state.start("StateTitle");
                break;
            case G.HOMEBUTTON:
                if(!model.ispopup)
                {
                    //params: text1, text2
                    model.ispopup = true;
                    model.popup = game.add.group();
                    var back = game.add.sprite(400, 300, "uibox");
                    var text = game.add.text(400, 280, "Return to the Title Screen?", { font: "11px 'Press Start 2P'", fill: "#fff",align:'center'});
                    text.anchor.set(0.5,0.5);
                    text.wordWrap = true;
                    text.wordWrapWidth = back.width * .9;
                    back.anchor.set(0.5,0.5);

                    var btnYes = new TextButton("Yes", 1, 14,G.TITLE);
                    btnYes.scale.set(0.8,0.8);
                    btnYes.x = 310;
                    btnYes.y = 350;
                    var btnNo = new TextButton("No", 1, 14,G.HIDEPOPUP);
                    btnNo.scale.set(0.8,0.8);
                    btnNo.x = 490;
                    btnNo.y = 350;

                    model.popup.add(back);
                    model.popup.add(text);
                    model.popup.add(btnYes);
                    model.popup.add(btnNo);
                }
                break;
            case G.CREDITS:
                game.state.start("CreditState");
                break;
            case G.FLEE:
                if(!fleeConfirm) showFleeConfirm();
                break;
            case G.FLEECONFIRM:
                fleeConfirm = false;
                game.state.start("StateOver");
                break;
            case G.FLEECANCEL:
                fleeconfno.destroy();
                fleeconfyes.destroy();
                fleeconfimg.destroy();
                fleeConfirm = false;
                break;
            case G.LOADMAP:        
                var prevmusic = model.map.bgmusic;      
                var m = eval("model.maps."+params);
                console.log(m);
                model.map = m;
                model.currX = model.map.startX;
                model.currY = model.map.startY;
                //restore
                model.hp = model.maxhp;
                model.energy = model.maxenergy;
                saveData();
                if(params == "gw" && model.gwlock) 
                {
                    model.gwlock = false;
                    eventDispatcher.dispatch(G.SHOWPOPUP2,{text1:"Graywoods unlocked!",text2:"Quick Travel to Graywoods is now available!",icon:"mapicon"});
                }
                if(params == "wf" && model.wflock) 
                {
                    model.wflock = false;
                    eventDispatcher.dispatch(G.SHOWPOPUP2,{text1:"Wintry Fields unlocked!",text2:"Quick Travel to Graywoods is now available!",icon:"mapicon"});
                }

                for(var i = 0; i<model.map.map.length; i++)
                     {
                        for(var j = 0; j<model.map.map[i].length; j++)
                        {
                            if(model.map.map[i][j]!="")
                            {
                                var p = eval("model.towns."+model.map.map[i][j]);
                                p.enemies.forEach(function(enemy){
                                enemy.alive = true;
                                });
                            }
                        }
                     }
                if(prevmusic!=model.map.bgmusic) mediaManager.setBackgroundMusic(model.map.bgmusic);
                game.state.start("StateTown");
                break;
            case G.LOADMAP2:              
                var m = eval("model.maps."+params.map);
                model.map = m;
                model.currX = params.x;
                model.currY = params.y;

                for(var i = 0; i<model.map.map.length; i++)
                     {
                        for(var j = 0; j<model.map.map[i].length; j++)
                        {
                            if(model.map.map[i][j]!="")
                            {
                                var p = eval("model.towns."+model.map.map[i][j]);
                                p.enemies.forEach(function(enemy){
                                enemy.alive = true;
                                });
                            }
                        }
                     }
                if(params.map == "sw"&&model.currentQuest<5) 
                {
                    if(!model.mtlock)
                    {
                        // eventDispatcher.dispatch(G.SHOWPOPUP2,{text1:"Sunwell City unlocked!",text2:"Quick Travel to Sunwell City is now available!",icon:"mapicon"});
                        model.towns.sw2.conversation = "threerelics";
                        model.mtlock = true;
                    }
                    else
                    {
                        model.towns.sw2.conversation = "";
                    }
                    
                }
                else
                {
                    model.towns.sw2.conversation = "";
                }
                    
                mediaManager.setBackgroundMusic(model.map.bgmusic);
                game.state.start("StateTown");
                saveData();
                break;
            case G.BACKTOTOWN:
            if(model.state == "die")
            {
                if(model.map.name == "mtbattle")
                {
                    eventDispatcher.dispatch(G.LOADMAP,"mt");
                    model.towns.mt5.conversation = "mt1";
                }
                else if(model.map.name == "arena"){
                    eventDispatcher.dispatch(G.LOADMAP2,{map:"sw",x:2,y:0});
                }
                else if(model.map.name == "ship"){
                    eventDispatcher.dispatch(G.LOADMAP2,{map:"sw",x:0,y:0});
                    model.towns.ship1.conversation = "shipconv";
                }
                else if(model.map.name == "swbattle"){
                    model.towns.swbattle5.npcs =   [{
                        sprite: "tori",
                        x: 400,
                        y:393,
                        name:"Trisha",
                        msg:"",
                        msgspr:"tori",
                        scaleX:2.7,
                        scaleY:2.7,
                        face:-1,
                        shoplocation:""
                    },
                    {
                        sprite: "guard3",
                        x: 550,
                        y:385,
                        name:"Sir Bertrand",
                        msg:"",
                        msgspr:"guard3",
                        scaleX:3.2,
                        scaleY:3.2,
                        face:-1,
                        shoplocation:""
                    },
                    {
                        sprite: "landorarena",
                        x: 480,
                        y:389,
                        name:"Landor",
                        msg:"",
                        msgspr:"landor",
                        scaleX:2.7,
                        scaleY:2.7,
                        face:-1,
                        shoplocation:""
                    }];
                    game.state.start("StateTown");
                }
                else if(model.ename == "The Necromancer" || model.ename == "The Necromancer2")
                {
                    model.towns.necrodungi35.conversation = "";
                    game.state.start("StateTown");
                }
                else
                {
                    game.state.start("StateTown");
                }
            }
            else
            {
                //model.town.conversation = "";
                game.state.start("StateTown");
            }
            break;
            
            case G.LOADTOWN:
                var t = eval("model.towns."+params);
                model.town = t;
                if(params == "sw2"&&model.currentQuest == 3)
                {
                    model.towns.sw2.npcs[1].msg = "totod";
                }
                if(params == "sw1")
                {
                    model.relics.forEach(relics => {
                        if(relics.name == "Captain's Pistol" && relics.have)
                        {
                            model.towns.sw1.npcs[1].msg = "shipdone";
                        }
                    });
                }
                break;
            case G.BONUS:
                eventDispatcher.dispatch(G.PLAY_SOUND,"coin");
                params.forEach(p => {
                    if(parseInt(p) == p)
                    {
                        p*=Math.ceil(model.goldgain);
                        model.cash+=p;
                        model.townGoldText.text = "Gold: "+model.cash;
                        model.town.bonuses[0].used = true;
                        bonuses = [];
                        var gtext = game.add.text(model.player.x, model.player.y-model.player.height/2, "+"+p, { font: "bold 12px 'Press Start 2P'", fill: "#ff0",align:'right'});
                        var tween = game.add.tween(gtext).to( { alpha: 0, y:'-30' }, 2000,Phaser.Easing.Linear.None,true);
                        tween.onComplete.add(function(){
                            gtext.destroy();
                        },this);
                    }
                    else
                    {
                        model.town.bonuses[0].used = true;
                        bonuses = [];
                        if(model.poti<3)
                        { 
                            var gtext = game.add.text(model.player.x, model.player.y-model.player.height/2-16, "+1 Potion", { font: "bold 12px 'Press Start 2P'", fill: "#000",align:'right'});
                            var tween = game.add.tween(gtext).to( { alpha: 0, y:'-30' }, 2000,Phaser.Easing.Linear.None,true);
                            tween.onComplete.add(function(){
                                gtext.destroy();
                            },this);
                            model.poti++;
                            model.townpotiText.text = model.poti+"/3";
                        }
                    }
                });
                break;
            case G.BONUS2:
                eventDispatcher.dispatch(G.PLAY_SOUND,"revive");
                game.camera.flash(0x00ff00, 500);

                params.forEach(p => {
                    if(p == "hp")
                    {
                       model.hp = model.maxhp;
                       model.townHealthbar.barSprite.width = 120;
                       model.townHealthbarText.text = model.hp+"/"+model.maxhp;
                     
                    }
                    else if(p == "mp")
                    {
                       model.energy = model.maxenergy;
                       model.townEnergybar.barSprite.width = 120;
                       model.townEnergybarText.text = model.energy+"/"+model.maxenergy;
                    }
                });
                model.town.bonuses[0].used = true;
                bonuses = [];
                break;
          
            
            case G.SETENEMY:
                model.enemyspriteX = params.x;
                model.enemyspriteY = params.y;
                model.enemysprite = params.sprite;
                model.escaleX = params.escaleX;
                model.escaleY = params.escaleY;
                model.ehp = params.hp;
                model.emaxhp = model.ehp;
                model.espeed = params.speed;
                model.estr = params.str;
                model.reward = params.reward;
                model.xpreward = params.xpreward;
                model.emod = 0;
                model.emodcounter = 0;
                model.eattacks = params.attacks;
                model.ename = params.name;

                model.eshieldup = false;
                model.eberserk = false;
                model.ecasting = false;

                break;
            case G.LEFTEXIT:
                if(model.currX>0 &&  model.map.map[model.currY][model.currX-1]!= "")
                {
                    if(model.town.name == "gw1")
                    {
                            model.pause = true;
                            game.camera.fade(0x000000, 1000);
                            game.time.events.add(1000, function(){
                                model.map = model.maps.sw;
                                model.currX = 4;
                                model.currY = 0;
                                mediaManager.setBackgroundMusic(model.map.bgmusic);
                                model.startpos = 700;
                                model.startface = -1;
                                game.state.start("StateTown");
                            },this);                           
                    }
                    else if(model.town.name == "mt0" && model.currentQuest < 2)
                    {
                        model.pause = true;
                        model.town.conversation = "mtroadblock";
                    }
                    else
                    {
                        model.currX--;
                        var p = model.map.map[model.currY][model.currX];
                        eventDispatcher.dispatch(G.LOADTOWN,p);
                        model.startpos = 700;
                        model.startface = -1;
                        game.state.start("StateTown");  
                    }
                }      
                break;
            case G.RIGHTEXIT:
                if(model.currX<model.map.map[model.currY].length-1 && model.map.map[model.currY][model.currX+1]!= "")
                {
                    if(model.town.name == "sw5")
                    {
                            model.pause = true;
                            game.camera.fade(0x000000, 1000);
                            game.time.events.add(1000, function(){
                                model.startpos = 100;
                                model.startface = 1;
                                eventDispatcher.dispatch(G.LOADMAP,"gw");
                            },this);   
                    }
                    else if(model.town.name == "mt03" && model.currentQuest < 6)
                    {
                           model.town.conversation = "mtroadblock2";
                    }
                    else
                    {
                        model.currX++;
                        var p = model.map.map[model.currY][model.currX];
                        eventDispatcher.dispatch(G.LOADTOWN,p);
                        model.startpos = 100;
                        model.startface = 1;
                        game.state.start("StateTown");
                    }
                }
                break;
            case G.UPEXIT:
                {
                    if(model.currY>0)
                    {
                        model.currY--;
                        var p = model.map.map[model.currY][model.currX];
                        console.log(p);
                        eventDispatcher.dispatch(G.LOADTOWN,p);
                        model.startpos = model.player.x;
                        game.state.start("StateTown");
                    }
                }
                break;
            case G.DOWNEXIT:
                {
                    if(model.currY<model.map.map.length-1)
                    {
                        model.currY++;
                        var p = model.map.map[model.currY][model.currX];
                        console.log(p);
                        eventDispatcher.dispatch(G.LOADTOWN,p);
                        model.startpos = model.player.x;
                        game.state.start("StateTown");
                    }
                }
                break;
            case G.LEVELUP:
            {
                model.pause = true;
                eventDispatcher.dispatch(G.PLAY_SOUND,"menumove");
                var rand = Math.floor(Math.random()*4+1);
                var _msg;
                switch(rand)
                {
                    case 1:
                        _msg = "My power grows!";
                        break;
                    case 2:
                        _msg = "I'm getting better and better!";
                        break;
                    case 3:
                        _msg = "My magic is getting stronger!";
                        break;
                    case 4:
                        _msg = "I can feel im stronger now!";
                        break;
                }
                if(model.level%2==0)
                {
                    _msg+="\nSpell Power: +"+(model.spellpower[Math.floor((model.level+2)/2)] - model.spellpower[Math.floor((model.level+1)/2)]);
                }
               else
               {
                    _msg+="\nMax Health: +"+(model.hpvalue[Math.floor((model.level+1)/2)] - model.hpvalue[Math.floor(model.level/2)]);
                    _msg+="\nMax Energy: +"+(model.energyvalue[Math.floor((model.level+1)/2)] - model.energyvalue[Math.floor(model.level/2)]);
               }
                var lvlupmsg = new Msg("Varthen",_msg, "right", model.player.key);
                var lvlupkeyE = game.input.keyboard.addKey(Phaser.Keyboard.E);
                    //cucc
                    function f() 
                    {
                        lvlupmsg.slowdestroy();
                        model.pause = false;
                        lvlupkeyE.onDown.remove(f);
                    }
                lvlupkeyE.onDown.add(f);
             
                model.xp -=model.xptonextlv[model.level];
                model.level++;
                model.skillpoint++;

                if(model.level == 5)
                {
                    model.popuping = true;
			        model.topopup = {text1:"Wintry Fields Unlocked!",text2:"You can Quick Travel to Wintry Fields from your World Map!",icon:"mapicon"};
                }
                
                setStats();

                model.townHealthbar.barSprite.width = 120;
                model.townEnergybar.barSprite.width = 120;
                model.townHealthbarText.text = model.hp+"/"+model.maxhp;
                model.townEnergybarText.text = model.energy+"/"+model.maxenergy;


                model.townXpbar.barSprite.width = 120*(model.xp/model.xptonextlv[model.level]);
                model.townXpbarText.text = model.xp+"/"+model.xptonextlv[model.level];
                model.townLvText.text = "Level: "+(model.level+1);
   
            }
            break;
            case G.CHANGEDESTINATION:
         
            switch(params)
            {
                case "mt":
                    maptitletext.text = "Monsoon Town";
                    mapimage.loadTexture("mapimage2");
                    if(model.mtlock)
                    {
                        mapimage.tint = 0x111111;
                        txt1.text = "Locked";
                        if(model.currentQuest > 1)
                        txt2.text = "Monsoon Town is swarmed by the undeads!";
                        else
                        txt2.text = "Tip: Complete the Trial of Fire to unlock.";
                    }
                    else
                    {
                        mapimage.tint = 0xffffff;
                        txt1.text = "";
                        txt2.text = "";
                    }
                    mapbutton1.buttonBack.tint = 0xffffff;
                    mapbutton2.buttonBack.tint = 0x00ff00;
                    mapbutton3.buttonBack.tint = 0xffffff;
                    mapbutton4.buttonBack.tint = 0xffffff;
                    break;
                case "sw":
                    maptitletext.text = "Sunwell  City";
                    mapimage.loadTexture("swmapimage");
                    if(model.currentQuest<2)
                    {
                        mapimage.tint = 0x111111;
                        txt1.text = "Locked";
                        txt2.text = "Tip: Complete Monsoon Town to unlock.";
                    }
                    else
                    {
                        mapimage.tint = 0xffffff;
                        txt1.text = "";
                        txt2.text = "";
                    }
                    mapbutton1.buttonBack.tint = 0x00ff00;
                    mapbutton2.buttonBack.tint = 0xffffff;
                    mapbutton3.buttonBack.tint = 0xffffff;
                    mapbutton4.buttonBack.tint = 0xffffff;
                    break;
                case "gw":
                    maptitletext.text = "Graywoods";
                    mapimage.loadTexture("gwmapimage");
                    if(model.currentQuest<2)
                    {
                        mapimage.tint = 0x111111;
                        txt1.text = "Locked";
                        txt2.text = "Tip: Complete Monsoon Town to unlock.";
                    }
                    else
                    {
                        mapimage.tint = 0xffffff;
                        txt1.text = "";
                        txt2.text = "";
                    }
                    mapbutton1.buttonBack.tint = 0xffffff;
                    mapbutton2.buttonBack.tint = 0xffffff;
                    mapbutton3.buttonBack.tint = 0x00ff00;
                    mapbutton4.buttonBack.tint = 0xffffff;
                    break;
                case "wf":
                    mapimage.loadTexture("wfmapimage");
                    maptitletext.text = "Wintry Fields";
                    if(model.wflock)
                    {
                        mapimage.tint = 0x111111;
                        txt1.text = "Locked";
                        txt2.text = "Tip: Reach level 6 to unlock!"
                    }
                    else
                    {
                        mapimage.tint = 0xffffff;
                        txt1.text = "";
                        txt2.text = "";
                    }
                    mapbutton1.buttonBack.tint = 0xffffff;
                    mapbutton2.buttonBack.tint = 0xffffff;
                    mapbutton3.buttonBack.tint = 0xffffff;
                    mapbutton4.buttonBack.tint = 0x00ff00;
                    break
                default: 
                maptitletext.text = "Monsoon Town";
                mapimage.loadTexture("mapimage2");
                if(model.mtlock)
                {
                    mapimage.tint = 0x111111;
                    txt1.text = "Locked";
                    if(model.currentQuest > 1)
                    txt2.text = "Monsoon Town is swarmed by the undeads!";
                    else
                    txt2.text = "Tip: Complete the Trial of Fire to unlock.";
                }
                else
                {
                    mapimage.tint = 0xffffff;
                    txt1.text = "";
                    txt2.text = "";
                }
                mapbutton1.buttonBack.tint = 0xffffff;
                mapbutton2.buttonBack.tint = 0x00ff00;
                mapbutton3.buttonBack.tint = 0xffffff;
                mapbutton4.buttonBack.tint = 0xffffff;
                break;
            }
            mapdest = params;

            var i = model.quests[model.currentQuest].locations.indexOf(params)
                if(i!=-1)
                {
                    console.log(i);
                    console.log(params);
                    if(!model.quests[model.currentQuest].objectives[i].done&&txt2.text=="")
                    {
                        txt3.text = "Objective: "+model.quests[model.currentQuest].mapdisplaytexts[i];
                    }
                    else
                    {
                        txt3.text = "";
                    }
                }
                else
                {
                    txt3.text = "";
                }
            break;
        
            case G.TRAVEL:
                var d = eval("model."+mapdest+"lock");
                if(!d && (mapdest == "mt"||mapdest=="sw"||mapdest=="gw"||mapdest=="wf"))
                {
                    model.entry = "teleport";
                    if(model.quests[model.currentQuest].name == "mt"&&mapdest == "mt")
                    {
                        model.quests[model.currentQuest].objectives[0].done = true;
                    }
                    if(mapdest == "sw" && model.currentQuest == 4) mapdest = "swbattle";
                    eventDispatcher.dispatch(G.LOADMAP,mapdest);
                }
                else
                {
                    eventDispatcher.dispatch(G.PLAY_SOUND,"buttonlocked");
                }
                break;
            case G.SHOP:
                model.shoplocation = params;
                model.startpos = model.player.x;
                model.startface = 2.7/model.player.scale.x;
                game.state.start("ShopState");
                break;
            case G.WIN:
                model.overreward = params; //titletext, xp, gold, relic, destination
                game.state.start("StateOver")
                break;
            case G.SHOWPOPUP:
                if(!model.ispopup)
                {
                    //params: text1, text2
                    model.ispopup = true;
                    model.popup = game.add.group();
                    var back = game.add.sprite(400, 300, "uibox");
                    var text = game.add.text(400, 280, "Do you want to face the Pirates and travel to Wintry Fields?", { font: "11px 'Press Start 2P'", fill: "#fff",align:'center'});
                    text.anchor.set(0.5,0.5);
                    text.wordWrap = true;
                    text.wordWrapWidth = back.width * .9;
                    back.anchor.set(0.5,0.5);

                    var btnYes = new TextButton("Yes", 1, 14,G.TOSHIP);
                    btnYes.scale.set(0.8,0.8);
                    btnYes.x = 310;
                    btnYes.y = 350;
                    var btnNo = new TextButton("No", 1, 14,G.HIDEPOPUP);
                    btnNo.scale.set(0.8,0.8);
                    btnNo.x = 490;
                    btnNo.y = 350;

                    model.popup.add(back);
                    model.popup.add(text);
                    model.popup.add(btnYes);
                    model.popup.add(btnNo);
                }      
                break;
            case G.SHOWPOPUP2:
                if(!model.ispopup)
                {
                    //params: text1, text2, icon
                    model.ispopup = true;
                    model.popup = game.add.group();
                    var back = game.add.sprite(400, 300, "uibox");
                    back.anchor.set(0.5,0.5);
                    back.scale.set(2,1.5);
                    back.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                    var text1 = game.add.text(400, 220, params.text1, { font: "13px 'Press Start 2P'", fill: "#fff",align:'center'});
                    text1.anchor.set(0.5,0.5);
                    text1.wordWrap = true;
                    text1.wordWrapWidth = back.width * .9;

                    var text2 = game.add.text(400, 335, params.text2, { font: "10px 'Press Start 2P'", fill: "#fff",align:'center'});
                    text2.anchor.set(0.5,0.5);
                    text2.wordWrap = true;
                    text2.wordWrapWidth = back.width * .9;

                    var icon = game.add.sprite(400,265,params.icon);
                    icon.anchor.set(0.5,0.5);
                    icon.scale.set(1.8);
                    icon.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                   

                    var btnOk = new TextButton("Ok", 1, 14,G.HIDEPOPUP);
                    btnOk.scale.set(0.8,0.8);
                    btnOk.x = 400;
                    btnOk.y = 380;
                

                    model.popup.add(back);
                    model.popup.add(text1);
                    model.popup.add(text2);
                    model.popup.add(btnOk);
                    model.popup.add(icon);
                }      
                break;
            case G.SHOWPOPUP3:
                if(!model.ispopup)
                {
                    //params: text1, text2
                    model.ispopup = true;
                    model.popup = game.add.group();
                    var back = game.add.sprite(400, 300, "uibox");
                    var text = game.add.text(400, 280, "Are you ready to face the Trial of Darkness?", { font: "11px 'Press Start 2P'", fill: "#fff",align:'center'});
                    text.anchor.set(0.5,0.5);
                    text.wordWrap = true;
                    text.wordWrapWidth = back.width * .9;
                    back.anchor.set(0.5,0.5);

                    var btnYes = new TextButton("Yes", 1, 14,G.TOTOD);
                    btnYes.scale.set(0.8,0.8);
                    btnYes.x = 310;
                    btnYes.y = 350;
                    var btnNo = new TextButton("No", 1, 14,G.HIDEPOPUP);
                    btnNo.scale.set(0.8,0.8);
                    btnNo.x = 490;
                    btnNo.y = 350;

                    model.popup.add(back);
                    model.popup.add(text);
                    model.popup.add(btnYes);
                    model.popup.add(btnNo);
                }      
                break;
            case G.RESETDATAPOPUP:
                    model.ispopup = true;
                    model.popup = game.add.group();
                    var back = game.add.sprite(400, 300, "uibox");
                    var text = game.add.text(400, 280, "Are you sure? All your previous save files will be lost!", { font: "11px 'Press Start 2P'", fill: "#fff",align:'center'});
                    text.anchor.set(0.5,0.5);
                    text.wordWrap = true;
                    text.wordWrapWidth = back.width * .9;
                    back.anchor.set(0.5,0.5);

                    var btnYes = new TextButton("Yes", 1, 14,G.RESET);
                    btnYes.scale.set(0.8,0.8);
                    btnYes.x = 310;
                    btnYes.y = 350;
                    var btnNo = new TextButton("No", 1, 14,G.HIDEPOPUP);
                    btnNo.scale.set(0.8,0.8);
                    btnNo.x = 490;
                    btnNo.y = 350;

                    model.popup.add(back);
                    model.popup.add(text);
                    model.popup.add(btnYes);
                    model.popup.add(btnNo);    
                break;
            case G.RESETSKILLPOINTPOPUP:
                if(!model.ispopup)
                {
                    //params: text1, text2
                    model.ispopup = true;
                    model.popup = game.add.group();
                    var back = game.add.sprite(400, 300, "uibox");
                    var text = game.add.text(400, 280, "Do you want to reset your skillpoints for 50 gold?", { font: "11px 'Press Start 2P'", fill: "#fff",align:'center'});
                    text.anchor.set(0.5,0.5);
                    text.wordWrap = true;
                    text.wordWrapWidth = back.width * .9;
                    back.anchor.set(0.5,0.5);

                    var btnYes = new TextButton("Yes", 1, 14,G.RESETSKILLPOINT);
                    btnYes.scale.set(0.8,0.8);
                    btnYes.x = 310;
                    btnYes.y = 350;
                    var btnNo = new TextButton("No", 1, 14,G.HIDEPOPUP);
                    btnNo.scale.set(0.8,0.8);
                    btnNo.x = 490;
                    btnNo.y = 350;

                    model.popup.add(back);
                    model.popup.add(text);
                    model.popup.add(btnYes);
                    model.popup.add(btnNo);
                }      
                break;
            case G.RESETSKILLPOINT:
                if(model.cash>=50)
                {
                   model.cash-=50;
                   model.townGoldText.text = "Gold: "+model.cash;
                   game.camera.flash(0xffffff,400);
                   eventDispatcher.dispatch(G.PLAY_SOUND,"goodaltar");
                   eventDispatcher.dispatch(G.HIDEPOPUP);
                   model.fire = 1;
                   model.frost = 0;
                   model.potilvl = 0;
                   model.shield = 0;
                   model.ulti1 = 0;
                   model.skillpoint = model.level;
                   skillpointalert = game.add.tween(model.skillicon).to( { alpha: 0 }, 500, "Linear", true, 0, -1);
                   skillpointalert.yoyo(true, 100);
                }
                else 
                {
                    eventDispatcher.dispatch(G.PLAY_SOUND,"buttonlocked");
                }
                break;
            case G.GOLDTOXPPOPUP:
                if(!model.ispopup)
                {
                    //params: text1, text2
                    model.ispopup = true;
                    model.popup = game.add.group();
                    var back = game.add.sprite(400, 300, "uibox");
                    var text = game.add.text(400, 280, "Do you want to turn 500 Gold into 100 XP?", { font: "11px 'Press Start 2P'", fill: "#fff",align:'center'});
                    text.anchor.set(0.5,0.5);
                    text.wordWrap = true;
                    text.wordWrapWidth = back.width * .9;
                    back.anchor.set(0.5,0.5);

                    var btnYes = new TextButton("Yes", 1, 14,G.GOLDTOXP);
                    btnYes.scale.set(0.8,0.8);
                    btnYes.x = 310;
                    btnYes.y = 350;
                    var btnNo = new TextButton("No", 1, 14,G.HIDEPOPUP);
                    btnNo.scale.set(0.8,0.8);
                    btnNo.x = 490;
                    btnNo.y = 350;

                    model.popup.add(back);
                    model.popup.add(text);
                    model.popup.add(btnYes);
                    model.popup.add(btnNo);
                }      
                break;
            case G.GOLDTOXP:
                if(model.cash>=500&&model.level<model.maxlvl)
                {
                   model.cash-=500;
                   model.townGoldText.text = "Gold: "+model.cash;
                   game.camera.flash(0xffffff,400);
                   eventDispatcher.dispatch(G.PLAY_SOUND,"goodaltar");
                   eventDispatcher.dispatch(G.HIDEPOPUP);
                   model.xp+= 100;
                   if(120 *(model.xp/model.xptonextlv[model.level])<=120)
                   model.townXpbar.barSprite.width = 120 *(model.xp/model.xptonextlv[model.level]);
                   else 
                   model.townXpbar.barSprite.width = 120;
                   model.townXpbarText.text = model.xp+"/"+model.xptonextlv[model.level];
                }
                else 
                {
                    eventDispatcher.dispatch(G.PLAY_SOUND,"buttonlocked");
                }
                break;
            case G.HIDEPOPUP:
                if(model.ispopup)
                {
                    model.popup.destroy();
                    model.ispopup = false;
                }
                break;
            case G.TOSHIP:
                eventDispatcher.dispatch(G.PLAY_SOUND,"coin");
                eventDispatcher.dispatch(G.HIDEPOPUP);
                model.pause = true;
                game.camera.fade(0x000000, 1000);
                game.time.events.add(1000, function(){
                    eventDispatcher.dispatch(G.LOADMAP,"ship");
                },this);
                break;
            case G.TOTOD:
                eventDispatcher.dispatch(G.HIDEPOPUP);
                model.pause = true;
                eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
                var tw = game.add.tween(model.player).to( { alpha:0 }, 800, "Linear", true);
                new Ripple(model.player.x,model.player.y,50,150,0xffffff);
                game.camera.fade(0x000000, 1000);
                game.time.events.add(1000, function(){
                    eventDispatcher.dispatch(G.LOADMAP2,{map:"tod",x:2,y:2});
                },this);
                break;
            case G.CREDITS2TOTOWN:
                model.popuping = true;
                model.topopup = {text1:"Story Completed!",text2:"You have completed the story but you can still explore the world of Varthen! Thank you for playing! May the wisdom guide you!",icon:"bookicon2"};
                eventDispatcher.dispatch(G.LOADMAP2,{map:"sw",x:1,y:0});
                
                break;


        }
    }
}

