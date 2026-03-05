class Msg extends Phaser.Group {
    constructor(name,msg,align="right",spr=null,face=1) {
        super(game);
        //
          //
          this.box = game.add.sprite(400,525,"msgbox");
          this.box.anchor.set(0.5,0.5);
         // this.box.alpha = 0.1;
         //
          if(align == "left")
          {
              this.name = game.add.text(770, 470 , name, { font: "bold 15px 'Press Start 2P'", fill: "#f00",align:'right'});
              this.name.anchor.set(1,0);
              this.msg =  game.add.text(400, 520 , msg, { font: "12px 'Press Start 2P'", fill: "#000",align:'left'});
              this.msg.anchor.set(0.5,0.5);
              if(spr!=null)
              {
                 if(spr == "player") this.spr = game.add.sprite(0,450,model.player.key);
                 else this.spr = game.add.sprite(0,450,spr);
                  this.spr.x = 740-this.spr.width;
                  this.spr.y = 510+this.spr.height;
                  this.spr.anchor.set(0.5,0.5);
                  this.spr.scale.set(3.5*face,3.5);
                  if(spr == "orb") 
                  {
                    this.spr.scale.set(2*face,2);
                    this.spr.x += 30;
                    this.spr.y -= 10;
                  }

              }
          }
          else if(align == "right")
          {
              this.name = game.add.text(30, 470 , name, { font: "bold 15px 'Press Start 2P'", fill: "#f00",align:'right'});
              this.name.anchor.set(0,0);
              this.msg =  game.add.text(400, 520 , msg, { font: "12px 'Press Start 2P'", fill: "#000",align:'left'});
             this.msg.anchor.set(0.5,0.5);
              if(spr!=null)
              {
                if(spr == "player") this.spr = game.add.sprite(0,450,model.player.key);
                else  this.spr = game.add.sprite(0,450,spr);
                  this.spr.x = 60+this.spr.width;
                  this.spr.y = 510+this.spr.height;
                  this.spr.anchor.set(0.5,0.5);
                  this.spr.scale.set(3.5*face,3.5);
              }
          }
          this.continueText = game.add.text(400,575,"-Press E to continue-",{font:"bold 12px 'Press Start 2P'", fill:"#000",align:'center'});
          this.continueText.anchor.set(0.5,0.5);
          model.msgup = true;

        this.spr.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        
       

      /*  this.sprite.anchor.set(0.5,0.5);
        this.name = name;*/
        
       // this.msgsprite = msgsprite;
    }
    slowdestroy()
    {
        var tw = game.add.tween(this.box).to( { alpha: 0 }, 300, "Linear", true);
        var tw2 = game.add.tween(this.msg).to( { alpha: 0 }, 300, "Linear", true);
        var tw3 = game.add.tween(this.name).to( { alpha: 0 }, 300, "Linear", true);
        var tw4 = game.add.tween(this.spr).to( { alpha: 0 }, 300, "Linear", true);
        var tw5 = game.add.tween(this.continueText).to( { alpha: 0 }, 300, "Linear", true);

        game.time.events.add(301, function(){
            this.destroy();
        },this);
    
    }
    destroy()
    {
        if(this.name.text == "Captain Read") model.shiplock = false;
        this.box.destroy();
        this.msg.destroy();
        this.name.destroy();
        this.spr.destroy();
        this.continueText.destroy();
        model.msgup = false;      
    }
}

class Conversation extends Phaser.Group {
    constructor(name,msgs = [],kill=true) {
        super(game);
        //
        this.name = name;
        this.msgs = msgs;
        this.current = 0;
        this.delay = 0;
        this.kill = kill;
    }
    showNext()
    {
        if(this.current > this.msgs.length-1)
        {
            
            this.msg.destroy();
            model.pause=false; 
            this.msgs = []; 
            console.log(this.name);
            if(model.town.conversation == "tofdefeat")
            {
                eventDispatcher.dispatch(G.BONUS,["poti","poti"]);
            } 
            else if(model.town.conversation == "wizardtest1")
            {
                eventDispatcher.dispatch(G.SHOWPOPUP2,{text1:"New Objective!",text2:"Complete the Trial of Fire!",icon:"scrollicon2"});
            } 
            else if(model.town.conversation == "tofend")
            {
                model.pause = true;
                game.camera.fade(0x000000, 1000);
                game.camera.onFadeComplete.add(function(){
                    game.camera.onFadeComplete.removeAll();
                    model.mtlock = false;
                    eventDispatcher.dispatch(G.WIN,{titleText:"Trial of Fire Completed!",xp:3,gold:5,relic:"Hero's Katar",destination:{map:"wa",x:0,y:0},quest:0,objective:0});
                },this);
                game.time.events.add(1000, function(){
                    game.camera.onFadeComplete.removeAll();
                    model.mtlock = false;
                    eventDispatcher.dispatch(G.WIN,{titleText:"Trial of Fire Completed!",xp:3,gold:5,relic:"Hero's Katar",destination:{map:"wa",x:0,y:0},quest:0,objective:0});
                },this);

            }
            else if(model.town.conversation == "letterfromcadary") 
            {
                eventDispatcher.dispatch(G.SHOWPOPUP2,{text1:"Monsoon Town unlocked!",text2:"Quick Travel to Monsoon Town is now available!",icon:"mapicon"});
                saveData();
            }
            else if(model.town.conversation == "ship")
            {
                eventDispatcher.dispatch(G.SHOWPOPUP);
            }   
            else if(model.town.conversation == "resetskillpoint")
            {
                eventDispatcher.dispatch(G.RESETSKILLPOINTPOPUP);
            }   
            else if(model.town.conversation == "goldtoxp")
            {
                eventDispatcher.dispatch(G.GOLDTOXPPOPUP);
            }   
            else if(model.town.conversation == "pirateconv6")
            {
                            game.camera.fade(0x000000, 1000);
                            game.camera.onFadeComplete.add(function(){
                                game.camera.onFadeComplete.removeAll();
                                eventDispatcher.dispatch(G.WIN,{titleText:"Pirates Defeated!",xp:8,gold:10,relic:"Captain's Pistol",destination:{map:"wf",x:0,y:0}});
                            },this);
                            game.time.events.add(1000, function(){
                                game.camera.onFadeComplete.removeAll();
                                eventDispatcher.dispatch(G.WIN,{titleText:"Pirates Defeated!",xp:8,gold:10,relic:"Captain's Pistol",destination:{map:"wf",x:0,y:0}});
                            },this);
            }   
            else if(model.town.conversation == "bronze4")
            {
                game.camera.fade(0x000000, 1000);
                game.camera.onFadeComplete.add(function(){
                    game.camera.onFadeComplete.removeAll();
                    eventDispatcher.dispatch(G.WIN,{titleText:"Bronze Cup Completed!",xp:7,gold:10,relic:"Scourge Dagger",destination:{map:"sw",x:2,y:0},quest:2,objective:1});
                },this);
                game.time.events.add(1000, function(){
                    game.camera.onFadeComplete.removeAll();
                    eventDispatcher.dispatch(G.WIN,{titleText:"Bronze Cup Completed!",xp:7,gold:10,relic:"Scourge Dagger",destination:{map:"sw",x:2,y:0},quest:2,objective:1});
                },this);
            }   
            else if(model.town.conversation == "silver4")
            {
                game.camera.fade(0x000000, 1000);
                game.camera.onFadeComplete.add(function(){
                    game.camera.onFadeComplete.removeAll();
                    eventDispatcher.dispatch(G.WIN,{titleText:"Silver Cup Completed!",xp:14,gold:20,relic:"Mirror of Truth",destination:{map:"sw",x:2,y:0}});
                },this);
                game.time.events.add(1000, function(){
                    game.camera.onFadeComplete.removeAll();
                    eventDispatcher.dispatch(G.WIN,{titleText:"Silver Cup Completed!",xp:14,gold:20,relic:"Mirror of Truth",destination:{map:"sw",x:2,y:0}});
                },this);
            }   
            else if(model.town.conversation == "gold2")
            {
                game.camera.fade(0x000000, 1000);
                game.camera.onFadeComplete.add(function(){          
                    game.camera.onFadeComplete.removeAll();
                    eventDispatcher.dispatch(G.WIN,{titleText:"Gold Cup Completed!",xp:25,gold:40,relic:"Blade of Tenfor",destination:{map:"sw",x:2,y:0}});
                },this);
                game.time.events.add(1000, function(){
                    game.camera.onFadeComplete.removeAll();
                    eventDispatcher.dispatch(G.WIN,{titleText:"Gold Cup Completed!",xp:25,gold:40,relic:"Blade of Tenfor",destination:{map:"sw",x:2,y:0}});
                },this);
            }   
            else if(model.town.conversation == "totod")
            {
                eventDispatcher.dispatch(G.SHOWPOPUP3);
            }   
            else if(model.town.conversation == "todboss0")
            {
                model.pause = true;
                mediaManager.backgroundMusic.stop();
                eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
                game.camera.flash(0x000000, 500);
                game.camera.shake(0.05, 500);
                game.time.events.add(1000, function(){
                    eventDispatcher.dispatch(G.PLAY_SOUND,"encounter");
                    game.camera.fade(0x000000, 1000);
                    game.time.events.add(1000, function(){
                        eventDispatcher.dispatch(G.SETENEMY,{
                            x:580,
                            y:390,
                            sprite:"shadowform",
                            hp:150000,
                            str:3,
                            speed:1,
                            escaleX:-2.7,
                            escaleY:2.7,
                            reward:12,
                            xpreward:10,
                            attacks:[],
                            name:"???"
                        });
                        model.map = model.maps.todboss;
                        model.currX = model.map.startX;
                        model.currY = model.map.startY;
                        mediaManager.setBackgroundMusic(model.map.bgmusic);
                        game.state.start("StateMain");                 
                    },this);
                },this);
            }   
            else if(model.town.conversation == "todboss1")
            {
                eventDispatcher.dispatch(G.TRANSFORM2);
            }
            else if(model.town.conversation == "todboss2")
            {
               model.pause = true;
               game.time.events.add(600, function(){
                eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
                var tw = game.add.tween(model.player).to( { alpha:0 }, 800, "Linear", true);
                new Ripple(model.player.x,model.player.y,50,150,0xffffff);
                },this);
                game.time.events.add(2000, function(){
                    game.camera.fade(0x000000, 1000);
                    game.time.events.add(1000, function(){
                        model.entry = "teleport";
                        eventDispatcher.dispatch(G.LOADMAP2,{map:"swbattle",x:0,y:0});
                    },this);
                },this);
            }
            else if(model.town.conversation == "shipconv")
            {
                model.pause = true;
                eventDispatcher.dispatch(G.PLAY_SOUND,"encounter");
                game.camera.fade(0x000000, 1000);
                game.time.events.add(1000, function(){
                    eventDispatcher.dispatch(G.SETENEMY,{
                        x:580,
                        y:390,
                        sprite:"captain",
                        hp:150,
                        str:3,
                        speed:2.3,
                        escaleX:2.7,
                        escaleY:2.7,
                        reward:12,
                        xpreward:10,
                        attacks:["tribasic","captainshoot","summonpirate1"],
                        name:"John Black"
                    });
                    game.state.start("StateMain");                 
                },this);
            }   
            else if(model.town.conversation == "mt1")
            {
                game.camera.shake(0.05,500);
                eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
                mediaManager.setBackgroundMusic("");
                game.camera.flash()
                model.pause = true;
                game.time.events.add(700, function(){
                    model.town.conversation = "mt2";
                },this);
            }   
            else if(model.town.conversation == "mt2")
            {   
                    model.pause = true;
                    eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
                    game.camera.flash(0xffffff, 200);
                    var tw = game.add.tween(npcs[0].sprite).to( { alpha:0 }, 800, "Linear", true);
                    new Ripple(npcs[0].sprite.x,npcs[0].sprite.y,50,150,0xffffff);
                    game.time.events.add(1500, function(){
                        npcs.pop();
                        npcs.push(new Npc(
                            "necro",
                            550,
                            218,
                            "The Necromancer",
                            "Run tiny wizard, run!",
                            "necro",
                            -3,3
                        ));
                        npcs[0].alpha = 0;
                        game.camera.flash(0x000000, 200);
                        game.camera.shake();
                        eventDispatcher.dispatch(G.PLAY_SOUND,"explode2");
                        var tw = game.add.tween(npcs[0].sprite).to( { alpha:1 }, 800, "Linear", true);
                        new Ripple(npcs[0].sprite.x,npcs[0].sprite.y,50,150,0x000000);
                        game.time.events.add(1000, function(){
                            model.enemy = game.add.sprite(900,397,"cave1");
                            model.enemy.scale.set(2.7,2.7);
                            model.enemy.anchor.set(0.5,0.5);
                            npcs.push(new Npc("undead1",900,398,"","","",-3,2.7)); 
                            npcs.push(new Npc("undead2",900,389,"","","",-3.5,3.5)); 
                            npcs.push(new Npc("cave1",900,395,"","","",3,3)); 
                            npcs.push(new Npc("cave1",900,394,"","","",3.2,3.2)); 
                            var tw2 = game.add.tween(model.enemy).to( { x:600 }, 550, "Linear", true);
                            var tw3 = game.add.tween(npcs[1].sprite).to( { x:630 }, 550, "Linear", true);
                            var tw4 = game.add.tween(npcs[2].sprite).to( { x:660 }, 700, "Linear", true);
                            var tw5 = game.add.tween(npcs[3].sprite).to( { x:700 }, 600, "Linear", true);
                            var tw6 = game.add.tween(npcs[4].sprite).to( { x:730 }, 720, "Linear", true);
                        },this);

                        game.time.events.add(2000, function(){
                            model.town.conversation = "mt3";
                        },this);

                    },this);
            }
            else if(model.town.conversation == "mt3")
            {    
                model.pause = true;
                model.staff = game.add.sprite(model.player.x+14,390,"staff1");
                model.staff.scale.set(2.7,2.2);
                model.staff.anchor.set(0.5,0.5);
                model.staff.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                game.world.bringToTop(model.player);
                eventDispatcher.dispatch(G.CINEMATICFIREBALL);
                game.time.events.add(1000, function(){
                    model.town.conversation = "mt4";
                },this);
            }
            else if(model.town.conversation == "mt4")
            {
                model.pause = true;
                eventDispatcher.dispatch(G.PLAY_SOUND,"encounter");
                game.camera.fade(0x000000, 1000);
                game.time.events.add(1000, function(){
                    eventDispatcher.dispatch(G.SETENEMY,{
                        x:580,
                        y:398,
                        sprite:"cave1",
                        hp:25,
                        str:2,
                        speed:0.7,
                        escaleX:2.7,
                        escaleY:2.7,
                        reward:12,
                        xpreward:10,
                        attacks:["tribasic","estun","necrofire2"],
                        name:"MtUndead"
                    });
                    model.map = model.maps.mtbattle;
                    model.currX = model.map.startX;
                    model.currY = model.map.startY;
                    mediaManager.setBackgroundMusic(model.map.bgmusic);
                    game.state.start("StateMain");                 
                },this);
            }
            else if(model.town.conversation == "mtbattle1")
            {
                model.pause = true;
                eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
                var tw = game.add.tween(npcs[0].sprite).to( { alpha:0 }, 800, "Linear", true);
                new Ripple(npcs[0].sprite.x,npcs[0].sprite.y,50,150,0x000000);

                model.enemy.loadTexture("necro");
                model.enemy.scale.x = -2.7;
                model.enemy.tint = 0xffffff;
               
                game.time.events.add(1500, function(){
                    eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
                    model.ehp = 2500;
                    model.emaxhp = 2500;
                    model.enemyHealthbar.setPercent(model.ehp/model.emaxhp*100);
                    model.enemyHealthbarText.text = model.ehp+"/"+model.emaxhp;
                    var tw = game.add.tween(model.enemy).to( { alpha:1 }, 800, "Linear", true);
                    new Ripple(model.enemy.x,model.enemy.y,50,150,0x000000);
                },this);
                game.time.events.add(2000,function(){
                    model.pause = false;
                    model.over = false;
                    model.espeed = 100;
                    model.emod = 2;
                },this);
            }
            else if(model.town.conversation == "mtbattle2")
            {
                model.pause = true;
                model.trisha = game.add.sprite(200,393,"tori");
                model.trisha.anchor.set(0.5,0.5); 
                model.trisha.scale.set(2.7,2.7);
                model.trisha.alpha = 0; 
                eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
                var tw = game.add.tween(model.trisha).to( { alpha:1 }, 800, "Linear", true);
                new Ripple(model.trisha.x,model.trisha.y,50,150,0xffffff);
                game.time.events.add(1300, function(){
                    model.town.conversation = "mtbattle3";
                },this);
            }
            else if(model.town.conversation == "mtbattle3")
            {
                model.pause = true;
                game.time.events.add(1200, function(){
                    eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
                    var tw = game.add.tween(model.trisha).to( { alpha:0 }, 800, "Linear", true);
                    new Ripple(model.trisha.x,model.trisha.y,50,150,0xffffff);
                },this);
                game.time.events.add(600, function(){
                    eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
                    var tw = game.add.tween(model.player).to( { alpha:0 }, 800, "Linear", true);
                    var tw2 = game.add.tween(model.staff).to( { alpha:0 }, 800, "Linear", true);
                    new Ripple(model.player.x,model.player.y,50,150,0xffffff);
                },this);
                game.time.events.add(2000, function(){
                    game.camera.fade(0x000000, 1000);
                    game.camera.onFadeComplete.add(function(){
                        game.camera.onFadeComplete.removeAll();
                        model.entry = "teleport";
                        eventDispatcher.dispatch(G.WIN,{titleText:"Monsoon Town Completed!",xp:5,gold:5,relic:"Sapphire",destination:{map:"sw",x:1,y:0},quest:1,objective:1});
                    },this);
                    game.time.events.add(1000, function(){
                        game.camera.onFadeComplete.removeAll();
                        model.entry = "teleport";
                        eventDispatcher.dispatch(G.WIN,{titleText:"Monsoon Town Completed!",xp:5,gold:5,relic:"Sapphire",destination:{map:"sw",x:1,y:0},quest:1,objective:1});
                    },this);
                },this);
            }
            else if(model.town.conversation == "threerelics")
            {
                    model.swlock = false;
                    eventDispatcher.dispatch(G.SHOWPOPUP2,{text1:"New Objective!",text2:"Collect these relics: Demon Eye, Scourge's Dagger, Frozen Tentacle!",icon:"scrollicon2"});
            }
            else if(model.town.conversation == "swbattle1")
            {
                eventDispatcher.dispatch(G.PLAY_SOUND,"jump");
                var tw = game.add.tween(npcs[0].sprite).to( { x: '+100',y:'-80' }, 150, Phaser.Easing.Linear.None, true);
                tw.onComplete.add(function(){
                    var twdown = game.add.tween(npcs[0].sprite).to( {x:"+300", y:'+500' }, 600, Phaser.Easing.Linear.None, true);
                });
                model.towns.swbattle2.npcs = [];
                game.time.events.add(400,function(){
                    model.town.conversation = "darkconv2";
                });
            }
            else if(model.town.conversation == "swbattle0")
            {
                model.pause = true;
                eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
                var tw = game.add.tween(npcs[0].sprite).to( { alpha:0 }, 800, "Linear", true);
                new Ripple(npcs[0].sprite.x,npcs[0].sprite.y,50,150,0xffffff);
                   npcs.pop();
                model.towns.swbattle1.npcs = [];
                game.time.events.add(550,function(){
                    model.town.conversation = "darkconv1";
                });
            }
            else if(model.town.conversation == "darkconv1")
            {
                eventDispatcher.dispatch(G.SHOWPOPUP2,{text1:"New Objective!",text2:"Clear Sunwell City from the undeads!",icon:"scrollicon2"});
            }
            else if(model.town.conversation == "swbattle3")
            {
                game.camera.shake(0.05,500);
                eventDispatcher.dispatch(G.PLAY_SOUND,"explode3");
                game.camera.flash()
                model.pause = true;
                game.time.events.add(700, function(){
                    model.town.conversation = "swbattle4";
                },this);
            }
            else if(model.town.conversation == "swbattle4")
            {
                model.pause = true;
                eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
                var tw = game.add.tween(npcs[1].sprite).to( { alpha:0 }, 800, "Linear", true);
                new Ripple(npcs[1].sprite.x,npcs[1].sprite.y,50,150,0xffffff);
                game.time.events.add(600,function(){
                    eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
                    var tw = game.add.tween(npcs[2].sprite).to( { alpha:0 }, 800, "Linear", true);
                    new Ripple(npcs[2].sprite.x,npcs[2].sprite.y,50,150,0xffffff);
                });
                game.time.events.add(1400,function(){
                    eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
                    var tw = game.add.tween(npcs[0].sprite).to( { alpha:0 }, 800, "Linear", true);
                    new Ripple(npcs[0].sprite.x,npcs[0].sprite.y,50,150,0xffffff);
                    npcs = [];
                }); 
                game.time.events.add(2500,function(){
                    
                    game.camera.shake(0.05,500);
                    eventDispatcher.dispatch(G.PLAY_SOUND,"explode2");
                    game.camera.flash(0x000000, 500);
                    npcs.push(new Npc(
                        "necro",
                        680,
                        397,
                        "The Necromancer",
                        "Run tiny wizard, run!",
                        "necro",
                        -3,3
                    ));
                    npcs[0].alpha = 0;
                    var tw = game.add.tween(npcs[0].sprite).to( { alpha:1 }, 800, "Linear", true);
                    new Ripple(npcs[0].sprite.x,npcs[0].sprite.y,50,150,0x000000);
                });
                game.time.events.add(4000,function(){
                    model.town.conversation = "swbattle6";
                });

            }
            else if(model.town.conversation == "swbattle6")
            {
               
                //game.camera.shake(0.05,500);
               /* eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
                //game.camera.flash(0x000000, 500);
                npcs.push(new Npc(
                    "undead2",
                    500,
                    350,
                    "Bloodhead",
                    "BLOOOOOD",
                    "undead2",
                    -8,8
                ));
                npcs[1].alpha = 0;
                var tw = game.add.tween(npcs[1].sprite).to( { alpha:1 }, 800, "Linear", true);
                new Ripple(npcs[1].sprite.x,npcs[1].sprite.y,50,150,0x000000);*/
         
                   /* model.town.npcs = [{
                        sprite:"necro",
                        x:680,
                        y:397,
                        name:"The Necromancer",
                        msg:"Run tiny wizard, run!",
                        msgsprite:"necro",
                        scaleX:-3,
                        scaleY:3
                    }];*/
                    model.pause = true;
                    model.town.npcs = [];
                    eventDispatcher.dispatch(G.SETENEMY,{
                        x:500,
                        y:397,
                        sprite:"necro",
                        hp:2500,
                        str:10,
                        speed:1,
                        escaleX:-3,
                        escaleY:3,
                        reward:10,
                        xpreward:8,
                        attacks:[],
                        flip:true,
                        name:"swbattle necro"
                    });
                    model.necrocounter = 0;
                    eventDispatcher.dispatch(G.PLAY_SOUND,"encounter");
                    game.camera.fade(0x000000, 1000);
                    game.time.events.add(1000, function(){
                        game.state.start("StateMain");
                    },this);
            }
            else if(model.town.conversation == "swbattle9")
            {
                model.eattacks.push("necrofire3");
            }
            else if(model.town.conversation == "swbattle10")
            {
               model.esavedhp = model.ehp;
               model.pause = true;
               mediaManager.backgroundMusic.stop();
               eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
               //game.camera.flash(0x000000, 500);
               game.camera.shake(0.05, 500);
               game.time.events.add(800, function(){
                   game.camera.fade(0x000000, 1000);
                   game.time.events.add(1000, function(){
                       eventDispatcher.dispatch(G.SETENEMY,{
                           x:580,
                           y:390,
                           sprite:"shadowform",
                           hp:150000,
                           str:3,
                           speed:1,
                           escaleX:-2.7,
                           escaleY:2.7,
                           reward:12,
                           xpreward:10,
                           attacks:[],
                           name:"???"
                       });
                       model.map = model.maps.todboss2;
                       model.currX = model.map.startX;
                       model.currY = model.map.startY;
                       mediaManager.setBackgroundMusic(model.map.bgmusic);
                       game.state.start("StateMain");                 
                   },this);
               },this);
            }
            else if(model.town.conversation == "shadowform1")
            {
                eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
                    game.camera.flash(0x000000, 500);
                    game.camera.shake(0.05, 500);
                game.time.events.add(1000, function(){
                    game.camera.fade(0x000000, 1000);
                    game.time.events.add(1000, function(){
                        eventDispatcher.dispatch(G.SETENEMY,{
                            x:500,
                            y:397,
                            sprite:"necro",
                            hp:2500,
                            str:10,
                            speed:1,
                            escaleX:-3,
                            escaleY:3,
                            reward:10,
                            xpreward:8,
                            attacks:[],
                            flip:true,
                            name:"swbattle necro2"
                        });
                        model.map = model.maps.swbattle;
                        model.currX = 4;
                        model.currY = 0;
                        mediaManager.setBackgroundMusic(model.map.bgmusic);
                        game.state.start("StateMain"); 
                    },this);
                });
            }
            else if(model.town.conversation == "swbattle11")
            {
                model.pause = true;
               //ulti2
               emitter = game.add.emitter(model.player.x, model.player.y+model.player.height/2, 400);
               emitter.makeParticles('black');
               emitter.setRotation(0, 0);
               emitter.setScale(0.5, 1);
               emitter.gravity = -200;
               emitter.start(false, 800, 20);
               game.camera.shake(0.05,500);
               game.camera.flash(0x000000, 500);
               //gameplay effects
               model.hp = model.maxhp;
               model.energy = model.maxenergy;
               model.playerEnergybarText.text = model.energy+'/'+model.maxenergy;
               model.playerEnergybar.barSprite.width = 120*(model.energy/model.maxenergy);
               model.playerHealthbarText.text = model.hp+'/'+model.maxhp;
               model.playerHealthbar.barSprite.width = 120*(model.hp/model.maxhp);
               model.shadowform = true;
               model.basiccd = 0;
               model.firecd = 0;
               model.frostcd = 0;
               model.shieldcd = 0;
               model.ulticd = 0;
               basiccdimg.height = 0;
               firecdimg.height = 0;
               frostcdimg.height = 0;
               shieldcdimg.height = 0;
               ulticdimg.height = 0;


               eventDispatcher.dispatch(G.PLAY_SOUND,"frenzy");
               model.player.loadTexture("shadowform");
               model.enemy.tint = 0xffffff;
               model.cdTime /= 3;
               model.casting = false;
               game.time.events.add(500,function(){
                    model.town.conversation = "swbattle12";
               });

            }
            else if(model.town.conversation == "swbattle12")
            {
                model.pause = true;
                model.enemy.alpha = 0;
                npcs.push(new Npc(
                    "necro",
                    500,
                    397,
                    "Necromancer",
                    "Bloodhead I choose you!",
                    "necro",
                    -3,3
                ));
                npcs[0].hidetip();
                eventDispatcher.dispatch(G.SETENEMY,{
                    x:500,
                    y:350,
                    sprite:"undead2",
                    hp:250,
                    str:8,
                    speed:0.5,
                    escaleX:-10,
                    escaleY:10,
                    reward:10,
                    xpreward:8,
                    attacks:["bloodheadbasic"],
                    flip:true,
                    name:"Bloodhead"
                });
                model.enemy.loadTexture("undead2");
                model.enemy.tint = 0xffffff;
                model.enemy.scale.x = -10;
                model.enemy.scale.y = 10;
                model.enemy.y = 331;
                var tw1 =    game.add.tween(npcs[0].sprite).to( { x: "+150" }, 600, "Linear", true);
                var twhp1 =  game.add.tween(model.enemyHealthbar.bgSprite).to( { alpha: 0 }, 600, "Linear", true);
                var twhp2 =  game.add.tween(model.enemyHealthbar.barSprite).to( { alpha: 0 }, 600, "Linear", true);
                var twhp3 =  game.add.tween(model.enemyHealthbar.borderSprite).to( { alpha: 0 }, 600, "Linear", true);
                var twhp4 =  game.add.tween(model.enemyHealthbarText).to( { alpha: 0 }, 600, "Linear", true);
                game.time.events.add(1000,function(){
                    model.enemyHealthbarText.text = "250/250";
                  /* game.camera.shake(0.05,500);
                    eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
                    game.camera.flash(0x000000, 500);*/
                    eventDispatcher.dispatch(G.PLAY_SOUND,"explode3");
                    game.camera.flash(0x000000,100);
                    var tw = game.add.tween(model.enemy).to( { alpha:1 }, 800, "Linear", true);
                    new Ripple(model.enemy.x,model.enemy.y,50,200,0x000000);
                    var retwhp1 =  game.add.tween(model.enemyHealthbar.bgSprite).to( { alpha: 1 }, 600, "Linear", true);
                    var retwhp2 =  game.add.tween(model.enemyHealthbar.barSprite).to( { alpha: 1 }, 600, "Linear", true);
                    var retwhp3 =  game.add.tween(model.enemyHealthbar.borderSprite).to( { alpha: 1 }, 600, "Linear", true);
                    var retwhp4 =  game.add.tween(model.enemyHealthbarText).to( { alpha: 1 }, 600, "Linear", true);
                    model.town.conversation = "swbattle13";
               });
            }
            else if(model.town.conversation == "swbattle13")
            {
                model.pause = true;
                model.trisha = game.add.sprite(750,393,"tori");
                model.trisha.scale.set(-2.7,2.7);
                model.trisha.anchor.set(0.5,0.5);
                model.trisha.alpha = 0;
                model.trisha.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                model.u1 = game.add.sprite(715,398,"undead1");
                model.u1.scale.set(-3,3);
                model.u1.anchor.set(0.5,0.5);
                model.u1.alpha = 0;
                model.u1.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                model.u2 = game.add.sprite(770,395,"cave1");
                model.u2.scale.set(3.1,3.5);
                model.u2.anchor.set(0.5,0.5);
                model.u2.alpha = 0;
                model.u2.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                model.u3 = game.add.sprite(680,398,"cave1");
                model.u3.scale.set(3,3);
                model.u3.anchor.set(0.5,0.5);
                model.u3.alpha = 0;
                model.u3.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                model.u4 = game.add.sprite(730,409,"undead3");
                model.u4.scale.set(-2,2);
                model.u4.anchor.set(0.5,0.5);
                model.u4.alpha = 0;
                model.u4.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

                eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
                var tw0 = game.add.tween(model.trisha).to( { alpha:1 }, 800, "Linear", true);
                var tw1 = game.add.tween(model.u1).to( { alpha:1 }, 800, "Linear", true);
                var tw2 = game.add.tween(model.u2).to( { alpha:1 }, 800, "Linear", true);
                var tw3 = game.add.tween(model.u3).to( { alpha:1 }, 800, "Linear", true);
                var tw4 = game.add.tween(model.u4).to( { alpha:1 }, 800, "Linear", true);
                new Ripple(model.trisha.x,model.trisha.y,50,150,0x000000);
                new Ripple(model.u1.x,model.u1.y,50,150,0x000000);
                new Ripple(model.u2.x,model.u2.y,50,150,0x000000);
                new Ripple(model.u3.x,model.u3.y,50,150,0x000000);
                new Ripple(model.u4.x,model.u4.y,50,150,0x000000);

                game.time.events.add(1000,function(){
                    model.town.conversation = "swbattle14";
                });


            }
            else if(model.town.conversation == "swbattle14")
            {
                model.pause = true;
                eventDispatcher.dispatch(G.PLAY_SOUND,"teleport"); 
                var twnecro = game.add.tween(npcs[0].sprite).to( { alpha:0 }, 800, "Linear", true);
                var tw0 = game.add.tween(model.trisha).to( { alpha:0 }, 800, "Linear", true);
                var tw1 = game.add.tween(model.u1).to( { alpha:0 }, 800, "Linear", true);
                var tw2 = game.add.tween(model.u2).to( { alpha:0 }, 800, "Linear", true);
                var tw3 = game.add.tween(model.u3).to( { alpha:0 }, 800, "Linear", true);
                var tw4 = game.add.tween(model.u4).to( { alpha:0 }, 800, "Linear", true);
                new Ripple(npcs[0].sprite.x,npcs[0].sprite.y,50,150,0x000000);
                new Ripple(model.trisha.x,model.trisha.y,50,150,0x000000);
                new Ripple(model.u1.x,model.u1.y,50,150,0x000000);
                new Ripple(model.u2.x,model.u2.y,50,150,0x000000);
                new Ripple(model.u3.x,model.u3.y,50,150,0x000000);
                new Ripple(model.u4.x,model.u4.y,50,150,0x000000);
                game.time.events.add(1000,function(){
                    model.town.conversation = "swbattle15";
                });
            }
            else if(model.town.conversation == "swbattleafter")
            {
               model.mtlock = false;
               eventDispatcher.dispatch(G.SHOWPOPUP2,{text1:"New Objective!",text2:"Return to Monsoon Town and find The Necromancer!",icon:"scrollicon2"});
            }
            else if(model.town.conversation == "necrobattle2")
            {
                model.pause = true;
                eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
                    game.camera.flash(0x000000, 500);
                    game.camera.shake(0.05, 500);
                game.time.events.add(1000, function(){
                    game.camera.fade(0x000000, 1000);
                    game.time.events.add(1000, function(){
                        eventDispatcher.dispatch(G.SETENEMY,{
                            x:580,
                            y:396,
                            sprite:"necro",
                            hp:2500,
                            str:10,
                            speed:0.7,
                            escaleX:-3,
                            escaleY:3,
                            reward:12,
                            xpreward:10,
                            attacks:["necrofire","necrofire","necrofire","necroulti1","necrofrost","necrosummon"],
                            name:"The Necromancer2"
                          });
                        model.map = model.maps.necrodungi;
                        model.currX = 5;
                        model.currY = 3;
                        mediaManager.setBackgroundMusic("song1");
                        game.state.start("StateMain"); 
                    },this);
                });
            }
            else if(model.town.conversation == "necrobattle3")
            {
                model.pause = true;
                //ulti2
                emitter = game.add.emitter(model.player.x, model.player.y+model.player.height/2, 400);
                emitter.makeParticles('black');
                emitter.setRotation(0, 0);
                emitter.setScale(0.5, 1);
                emitter.gravity = -200;
                emitter.start(false, 800, 20);
                game.camera.shake(0.05,500);
                game.camera.flash(0x000000, 500);
                //gameplay effects
                model.hp = model.maxhp;
                model.energy = model.maxenergy;
                model.playerEnergybarText.text = model.energy+'/'+model.maxenergy;
                model.playerEnergybar.barSprite.width = 120*(model.energy/model.maxenergy);
                model.playerHealthbarText.text = model.hp+'/'+model.maxhp;
                model.playerHealthbar.barSprite.width = 120*(model.hp/model.maxhp);
                model.shadowform = true;
                model.basiccd = 0;
                model.firecd = 0;
                model.frostcd = 0;
                model.shieldcd = 0;
                model.ulticd = 0;
                basiccdimg.height = 0;
                firecdimg.height = 0;
                frostcdimg.height = 0;
                shieldcdimg.height = 0;
                ulticdimg.height = 0;
 
 
                eventDispatcher.dispatch(G.PLAY_SOUND,"frenzy");
                model.player.loadTexture("shadowform");
                model.enemy.tint = 0xffffff;
                model.cdTime /= 3;
                model.casting = false;
                game.time.events.add(500,function(){
                    model.pause = false;
                });
            }
            else if(model.town.conversation == "necrobattle4")
            {
                model.towns.necrodungi35.conversation = "necroafter0";
                eventDispatcher.dispatch(G.ENEMYDIE);
            }
            else if(model.town.conversation == "necrobattle5")
            {
                model.pause = true;
                game.time.events.add(800, function(){
                model.trisha = game.add.sprite(500,393,"tori");
                model.trisha.anchor.set(0.5,0.5); 
                model.trisha.scale.set(-2.7,2.7);
                model.trisha.alpha = 0; 
                model.trisha.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
                var tw = game.add.tween(model.trisha).to( { alpha:1 }, 800, "Linear", true);
                new Ripple(model.trisha.x,model.trisha.y,50,150,0xffffff);
                    game.time.events.add(1300, function(){
                    model.town.conversation = "necrobattle6";
                },this);
                },this);

            }
            else if(model.town.conversation == "necrobattle6")
            {
                model.pause = true;
                game.time.events.add(200, function(){
                    eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
                    var tw = game.add.tween(model.trisha).to( { alpha:0 }, 800, "Linear", true);
                    new Ripple(model.trisha.x,model.trisha.y,50,150,0xffffff);
                },this);
                game.time.events.add(1000, function(){
                    eventDispatcher.dispatch(G.RAGESCENE);
                },this);

            }
            else if(model.town.conversation == "tdoconv1")
            {
                model.pause = true;
                game.camera.fade(0x000000, 1000);
                game.time.events.add(1000, function(){
                    model.map = model.maps.mt;
                    model.currX = 0;
                    model.currY = 0;
                    model.entry = "gate";
                    model.nomusic = true;
                    model.endgame = true;
                    game.state.start("StateTown");                 
                },this);

            }
            else if(model.town.conversation == "tdoconv2")
            {
                model.pause = true;
                    mediaManager.setBackgroundMusic("song2");
                    model.emitter2 = game.add.emitter(model.player.x, model.player.y+model.player.height/2, 400);
                    model.emitter2.makeParticles('black');
                    model.emitter2.setRotation(0, 0);
                    model.emitter2.setScale(0.5, 1);
                    model.emitter2.gravity = -200;
                    model.emitter2.start(false, 800, 20);
                    game.camera.shake(0.05,500);
                    game.camera.flash(0x000000, 500);
                    eventDispatcher.dispatch(G.PLAY_SOUND,"frenzy");
                    model.player.loadTexture("shadowform");
                    model.enemy.tint = 0xffffff;
                    model.cdTime /= 3;
                    model.casting = false;
                    game.time.events.add(500,function(){
                         model.town.conversation = "tdoconv3";
                    });
            }
            else if(model.town.conversation == "tdoconv3")
            {
                model.pause = true;
                game.time.events.add(500,function(){
                    var tw1 = game.add.tween(model.player).to( { alpha: 0 }, 600, "Linear", true);
                    eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
                    new Ripple(model.player.x,model.player.y,50,200,0x000000);     
                    model.emitter2.on = false;             
                });
     
                    game.camera.fade(0x000000, 2500);
                    game.time.events.add(2500,function(){
                    game.state.start("stateEndGame");
                    });
            }
            
            if(this.kill)
            {
                model.town.conversation = "";
            }
    
        }
        else
        {
            if(this.current == 0)
            {
                this.showMsg();
                if(this.msgs.length>1)this.msg.continueText.text = "-Press E to continue-\n-Press Q to skip-";
                this.current++;
            }
            else 
            {
                if(this.delay > 0)
                {

                }
                else
                {
                    this.msg.destroy();
                    this.delay = 1;
                  //  game.time.events.add(301, function(){
                        this.showMsg();
                        this.delay = 0;
                        this.current++;
                 //   },this);
                }
             
            }      
           
        }
    }
    showMsg()
    {
        model.pause = true;
        var _msg = this.msgs[this.current];
        this.msg = new Msg(_msg.name,_msg.msg,_msg.align,_msg.spr,_msg.face);
    }
}
