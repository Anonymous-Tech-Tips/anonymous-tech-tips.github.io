var pause;
var enemies;
var _berserk;
var _regen;
var attackmod;

//skills
var crit;
var critcounter;
var b1,b2,b3;
var keyleft,keyright;
//
var npctry;
var npctry2;
var npcs = [];
var enemies = [];
var items = [];
var doors = [];
var bonuses = [];
var currentSpot;

var skillpointalert;
var mapalert;


var StateTown = {
    preload: function() {},
    create: function() {
        //keep this line
        game.renderer.renderSession.roundPixels = true;
       
      
        //to tell the game what state we are in!
        model.state = "town";
        model.pause = false;
        model.ispopup = false;
        game.stage.backgroundColor = "#422835";
      
        //model.energy = model.maxenergy;
       
        this.loadTown();
    
        if(mediaManager.backgroundMusic.name != model.map.bgmusic) mediaManager.setBackgroundMusic(model.map.bgmusic);
        if(model.nomusic)
        { 
            mediaManager.setBackgroundMusic("");
            model.nomusic = false;            
        }
        var soundButtons = new SoundButtons();        
       
        //keys
        this.keyE = game.input.keyboard.addKey(Phaser.Keyboard.E);
        this.keyE.onDown.add(function()
        {
            
                npcs.forEach(function(npc){
                    if(Math.abs(model.player.x-npc.sprite.x)<=50&&Math.abs(model.player.y-npc.sprite.y)<=50)
                    {
                        
                        if(npc.shoplocation!="conversation" || !model.msgup)
                        {
                            if(!npc.msgUp&&!model.pause&&!model.ispopup)
                            {
                                npc.showmsg();
                                eventDispatcher.dispatch(G.PLAY_SOUND,"menumove");
                                model.pause=true;
                            }
                            else if(npc.msgUp)
                            {
                                npc.hidemsg();
                                eventDispatcher.dispatch(G.PLAY_SOUND,"menumove");
                                model.pause = false;
                            }
                        }      
                    }
                           
                });
                
                for (let i = 0; i < doors.length; i++) {
                    if(Math.abs(model.player.x-doors[i].sprite.x)<=50&&!model.pause)
                    {
                        if(doors[i].type == 1||3)
                        {
                            doors[i].enter(i);
                        }
                    }         
                }

                bonuses.forEach(function(bonus){
                    if(Math.abs(model.player.x-bonus.sprite.x)<=50&&!model.pause)
                    {
                        if(bonus.type == 1||3)
                        {
                           bonus.trigger();
                        }
                    }      
            });
            
            if(model.msgup && model.town.conversation != "")
            {
                eventDispatcher.dispatch(G.PLAY_SOUND,"menumove");
                if(this.c.length > 0) this.conv.showNext();
            }
        },this);

        this.keyQ = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        this.keyQ.onDown.add(function(){
            if(model.msgup&&this.conv.msgs.length>0)
            {
                eventDispatcher.dispatch(G.PLAY_SOUND,"menumove");
                this.conv.current = this.conv.msgs.length;
                this.conv.showNext();
            }
        },this);

       

        
   
       

    

    },
    update: function() {
       
        if(!model.pause)
        {
            if(model.controls.right.isDown || model.controls.dright.isDown)
                {
                    if(!model.ispopup)this.walkRight();
                }
            else if(model.controls.left.isDown || model.controls.dleft.isDown)
                {
                    if(!model.ispopup)this.walkLeft();
                }
            else
                model.player.animations.play('idle');
       
            enemies.forEach(function(enemy){
                if(Math.abs(model.player.x-enemy.sprite.x)<=50)
                {
                    enemy.battle();
                }
            });   
            this.iconhover();

        }

        npcs.forEach(function(npc){
            if(Math.abs(model.player.x-npc.sprite.x)<=50&&Math.abs(model.player.y-npc.sprite.y)<=50&&!model.ispopup)
            {
                npc.showtip();
            }
            else
            {
                npc.hidetip();      
            }    
        });   
        doors.forEach(function(door){
            if(Math.abs(model.player.x-door.sprite.x)<=50)
            {
                if(!model.pause)door.showtip();
                else door.hidetip();
            }
            else
            {
                door.hidetip();      
            }    
        });  
        bonuses.forEach(function(bonus){
            if(Math.abs(model.player.x-bonus.sprite.x)<=50)
            {
                if(!model.pause)bonus.showtip();
                else bonus.hidetip();
            }
            else
            {
                bonus.hidetip();      
            }    
        });  

        if(model.town.conversation != ""&&!model.msgup&&model.player.alpha==1)
        {
            this.c = [];
            this.cname = "";
            model.conversations.conversations.forEach(function(c){
                if(model.town.conversation == c.name){
                    this.c = c.conv;
                    this.cname = c.name;
                }
            },this);
            if(this.c.length > 0 && model.entry != "teleport")
            {
                this.conv = new Conversation(model.town.conversation,this.c);
                this.conv.showNext();
            }
        }
        if(model.xptonextlv[model.level]<=model.xp && !model.msgup&& !model.ispopup&&model.player.alpha==1&&model.level<model.maxlvl)
        {
            eventDispatcher.dispatch(G.LEVELUP);
        }
      
  
    },
    loadPlayer: function()
    {
        while(model.startpos<model.town.leftBound)
        {
            model.startpos+=15;
        }
        while(model.startpos>model.town.rightBound)
        {
            model.startpos-=15;
        }
        model.player = game.add.sprite(model.startpos,388 ,"player");
        model.player.scale.set(2.7*model.startface,2.7);
        model.player.anchor.set(0.5,0.5);
        var idle = model.player.animations.add('idle',[0]);

        var walk = model.player.animations.add('walk',[14,15,16,0]);
        model.controls = {
           // up: this.input.keyboard.addKey(Phaser.Keyboard.UP),
//            down: this.input.keyboard.addKey(Phaser.Keyboard.DOWN),
            right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            dright: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            dleft: this.input.keyboard.addKey(Phaser.Keyboard.A),
            };
            model.player.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
    },
    walkLeft:function()
    {
        model.player.scale.set(-2.7,2.7);
        model.player.animations.play('walk',10);
        var lb;
        if(model.town.leftBound != undefined) lb = model.town.leftBound;
        else lb = 0;
        if(model.player.x>=lb+Math.abs(model.player.width/2))
        {
            model.player.x-=8;          
        }
        if(model.player.x<=20) this.leftExit();
       
    },
    walkRight:function()
    {
      
        model.player.scale.set(2.7,2.7);
        model.player.animations.play('walk',10);
        var rb;
        if(model.town.rightBound != undefined) rb = model.town.rightBound;
        else rb = 800;
        if(model.player.x<=rb-model.player.width/2)
        {
            model.player.x+=8;
        }
        if(model.player.x>=780) this.rightExit();

    },
    leftExit:function()
    {   
        eventDispatcher.dispatch(G.LEFTEXIT);
    },
    rightExit:function()
    {
        eventDispatcher.dispatch(G.RIGHTEXIT);
    },
    loadTown:function()
    {
        npcs = [];
        enemies = [];
        items = [];
        doors = [];
        bonuses = [];
        eventDispatcher.dispatch(G.LOADTOWN,model.map.map[model.currY][model.currX]);

        this.bg = new Background(model.town.background);   
        this.bg.image.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
      
       model.town.items.forEach(function(item){
        items.push(new Item(item.sprite,item.x,item.y,item.anim,item.scaleX,item.scaleY));
        });
        model.town.bonuses.forEach(function(bonus){
            if(!bonus.used)bonuses.push(new Bonus(bonus.sprite,bonus.x,bonus.y,bonus.type,bonus.anim,bonus.scaleX,bonus.scaleY,bonus.bonuses));

        });
        model.town.doors.forEach(function(door){
            doors.push(new Door(door.sprite,door.x,door.y,door.anim,door.type,door.destination));
        });
        model.town.npcs.forEach(function(npc){
            npcs.push(new Npc(npc.sprite,npc.x,npc.y,npc.name,npc.msg,npc.msgspr,npc.scaleX,npc.scaleY,npc.face,npc.shoplocation));
        });
        model.town.enemies.forEach(function(enemy){
                if(enemy.alive)enemies.push(new Enemy(enemy.sprite,enemy.x,enemy.y,enemy.name,enemy.str,enemy.speed,enemy.hp,
                enemy.reward,enemy.xpreward,enemy.scaleX,enemy.scaleY,enemy.flip,enemy.alive,enemy.attacks));
        });
        this.c = [];
        this.cname = "";
       
       

        if(model.town.name =="ship1")
        {
            this.shipimage = game.add.sprite(400,300,"ship");
         //   this.shipimage.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
            this.shipimage.anchor.set(0.5,0.5);
            this.shipimage.width = 800;
            this.shipimage.height = 600;
            game.world.bringToTop(npcs[0].sprite);
        }

        this.loadUi();
      

        this.loadPlayer();  
        model.conversations.conversations.forEach(function(c){
            if(model.town.conversation == c.name &&model.player.alpha == 1){
                this.c = c.conv;
                this.cname = c.name;
            }
        },this);
        if(model.town.weather == "rain") this.addRain();
      
        if(this.c.length > 0 && model.entry != "teleport")
        {
            this.conv = new Conversation(this.cname,this.c);
            this.conv.showNext();
        }
        
        if(model.entry == "gate")
        {
          this.gateEntry();
        }
        if(model.entry == "teleport")
        {
          this.teleportEntry();
        }
        if(model.rewarding)
        {
            eventDispatcher.dispatch(G.REWARD,{gold:model.reward,xp:model.xpreward});
        }
        if(model.popuping)
        {
            console.log("asd");
            eventDispatcher.dispatch(G.SHOWPOPUP2,{text1:model.topopup.text1,text2:model.topopup.text2,icon:model.topopup.icon});
            model.popuping = false;            
        }

        this.skillpointAlert();
        if(model.town.name == "tod02")
        {
            if(model.currentQuest <4) this.loadOrb();
            else{
                 npcs[0].hidetip();
                 npcs.pop();
                 model.town.conversation = "todboss2"
            }   
        }
        else if(model.town.name == "swbattle2")
        {
            if(npcs.length!=0) eventDispatcher.dispatch(G.LANDORSCENE);
        }
        else if(model.town.name == "swbattle5")
        {
            model.town.conversation = "swbattle3";
        }
      
     
    },
    loadUi:function()
    {
        this.box = game.add.sprite(400,525,"msgbox");
        this.box.anchor.set(0.5,0.5);
        this.box.alpha = .2;
        //this.box.inputEnabled = true;
        model.townHealthbar = new HealthBar(this.game,{x:100, y:500, width:120, height:18});
        model.townEnergybar = new HealthBar(this.game,{x:100, y:525, width:120, height:18});
        model.townXpbar = new HealthBar(this.game,{x:100, y:550, width:120, height:18});
        model.townEnergybar.setBarColor("#aaf");
        model.townXpbar.setBarColor("#ffa");
        model.townHealthbarText =  game.add.text(model.townHealthbar.x, model.townHealthbar.y+5, model.hp+"/"+model.maxhp, { font: "bold 10px 'Press Start 2P'", fill: "#000",align:'right'});
        model.townHealthbarText.anchor.set(0.5,0.5);
        model.townEnergybarText =  game.add.text(model.townEnergybar.x, model.townEnergybar.y+5, model.energy+"/"+model.maxenergy, { font: "bold 10px 'Press Start 2P'", fill: "#000",align:'right'});
        model.townEnergybarText.anchor.set(0.5,0.5);
        model.townXpbarText =  game.add.text(model.townXpbar.x, model.townXpbar.y+5, model.xp+"/"+model.xptonextlv[model.level], { font: "bold 10px 'Press Start 2P'", fill: "#000",align:'right'});
        model.townXpbarText.anchor.set(0.5,0.5);
        if(120*(model.xp/model.xptonextlv[model.level])<120) model.townXpbar.barSprite.width = 120*(model.xp/model.xptonextlv[model.level]);
        else  model.townXpbar.barSprite.width = 120;
        model.townHealthbar.barSprite.width = 120*(model.hp/model.maxhp);
        model.townEnergybar.barSprite.width = 120*(model.energy/model.maxenergy);

        model.townpotiicon = game.add.sprite(200,500,"potiicon");
        model.townpotiicon.anchor.set(0.5,0.5);
        model.townpotiText = game.add.text(230, 505, ""+model.poti+"/3", { font: "bold 16px 'Press Start 2P'", fill: "#000",align:'right'});
        model.townpotiText.anchor.set(0,0.5);
        model.townLvText = game.add.text(185, 530, "Level: "+(model.level+1), { font: "bold 16px 'Press Start 2P'", fill: "#000",align:'right'});
        model.townLvText.anchor.set(0,0.5);
        model.townGoldText = game.add.text(185, 555, "Gold: "+model.cash, { font: "bold 16px 'Press Start 2P'", fill: "#ff0",align:'right'});
        model.townGoldText.anchor.set(0,0.5);
        this.drawIcons();
        this.drawMap();
        if(model.map.name=="wa")
        {
           this.mapAlert();
        }
        if(model.level == model.maxlvl)
        {
            model.townXpbarText.text = "Max Level"
            model.townXpbar.barSprite.width = 120;
        }
    },
    drawIcons:function()
    {
        model.worldmapicon = game.add.sprite(395,505,"mapicon");
        model.worldmapicon.anchor.set(0.5,0.5);
        model.worldmapicon.scale.set(1.3,1.3);
        model.worldmapicon.inputEnabled = true; 
        model.worldmapicon.events.onInputDown.add(function(){
            if(!model.pause)
            {
                model.startpos = model.player.x;
                model.startface = model.player.scale.x/2.7;
                game.state.start('StateMap');
            }          
        },this);
        model.worldmaptext = game.add.text(-405, 470, "World Map", { font: "12px 'Press Start 2P'", fill: "#000",align:'center'});
        model.worldmaptext.anchor.set(0.5,0.5);

        model.skillicon = game.add.sprite(450,505,"bookicon3");
        model.skillicon.anchor.set(0.5,0.5);
        model.skillicon.scale.set(1.3,1.3);
        model.skillicon.inputEnabled = true;
        model.skillicon.events.onInputDown.add(function(){
            if(!model.pause)
            {
                model.startpos = model.player.x;
                model.startface = model.player.scale.x/2.7;
                game.state.start('StateSkills');
            }          
        },this);
        model.skilltext = game.add.text(-455, 470, "Spells ", { font: "14px 'Press Start 2P'", fill: "#000",align:'center'});
        model.skilltext.anchor.set(0.5,0.5);

        model.charactericon = game.add.sprite(505,505,"scrollicon");
        model.charactericon.anchor.set(0.5,0.5);
        model.charactericon.scale.set(1.3,1.3);
        model.charactericon.inputEnabled = true;
        model.charactericon.events.onInputDown.add(function(){
            if(!model.pause)
            {
                model.startpos = model.player.x;
                model.startface = model.player.scale.x/2.7;
                game.state.start('CharacterState');
            }          
        },this);
        model.charactertext = game.add.text(-455, 470, "Character", { font: "12px 'Press Start 2P'", fill: "#000",align:'center'});
        model.charactertext.anchor.set(0.5,0.5);

        model.questicon = game.add.sprite(422,555,"scrollicon2");
        model.questicon.anchor.set(0.5,0.5);
        model.questicon.scale.set(1.3,1.3);
        model.questicon.inputEnabled = true;
        model.questicon.events.onInputDown.add(function(){
            if(!model.pause)
            {
                model.startpos = model.player.x;
                model.startface = model.player.scale.x/2.7;
                game.state.start('QuestState');
            }          
        },this);
        model.questtext = game.add.text(-380, 588, "Quests", { font: "13px 'Press Start 2P'", fill: "#000",align:'center'});
        model.questtext.anchor.set(0.5,0.5);

        model.achievementicon = game.add.sprite(478,555,"bookicon2");
        model.achievementicon.anchor.set(0.5,0.5);
        model.achievementicon.scale.set(1.3,1.3);
        model.achievementicon.inputEnabled = true;
        model.achievementicon.events.onInputDown.add(function(){
            if(!model.pause)
            {
                model.startpos = model.player.x;
                model.startface = model.player.scale.x/2.7;
                game.state.start('StateJournal');
            }          
        },this);
        model.achievementtext = game.add.text(-430, 588, "Journal ", { font: "13px 'Press Start 2P'", fill: "#000",align:'center'});
        model.achievementtext.anchor.set(0.5,0.5);

       
    },
    iconhover:function()
    {
        if (model.worldmapicon.input.pointerOver())
        {
            model.worldmapicon.scale.set(1.8,1.8);
            model.worldmaptext.x = 400;
        }
        else
        {
            model.worldmapicon.scale.set(1.3,1.3);
            model.worldmaptext.x = -405;
        }

        if (model.skillicon.input.pointerOver())
        {
            model.skillicon.scale.set(1.8,1.8);
            model.skilltext.x = 455;
        }
        else
        {
            model.skillicon.scale.set(1.3,1.3);
            model.skilltext.x = -455;
        }

        if (model.charactericon.input.pointerOver())
        {
            model.charactericon.scale.set(1.8,1.8);
            model.charactertext.x = 510;
        }
        else
        {
            model.charactericon.scale.set(1.3,1.3);
            model.charactertext.x = -500;
        }

        
        if (model.questicon.input.pointerOver())
        {
            model.questicon.scale.set(1.8,1.8);
            model.questtext.x = 422;
        }
        else
        {
            model.questicon.scale.set(1.3,1.3);
            model.questtext.x = -500;
        }

        if (model.achievementicon.input.pointerOver())
        {
            model.achievementicon.scale.set(1.8,1.8);
            model.achievementtext.x = 483;
        }
        else
        {
            model.achievementicon.scale.set(1.3,1.3);
            model.achievementtext.x = -500;
        }
    },
    drawMap:function()
    {
        for(let i = 0; i<model.map.map.length; i++)
        {
           for(let j = 0; j< model.map.map[i].length; j++)
           {
             //  if(model.map.map[i][j])
                var bmd = this.game.add.bitmapData(20, 20);
                if(model.currX == j && model.currY == i)bmd.ctx.fillStyle = "#060";
                else bmd.ctx.fillStyle = "#003";
                bmd.ctx.beginPath();
                bmd.ctx.rect(0, 0, 100, 100);
                bmd.ctx.fill();
                bmd.update();
        
                if(model.map.map[i][j]!="") 
                {
                    var x = this.game.add.sprite(650+j*22, 500+i*22, bmd);
                    x.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                    x.anchor.set(0.5,0.5);
                }
           }
        }
       
    },
    addRain:function() {
        this.raining = true;
        this.rainParticle = this.game.add.bitmapData(15, 50);
 
    this.rainParticle.ctx.rect(0, 0, 15, 50);
    this.rainParticle.ctx.fillStyle = '#9cc9de';
    this.rainParticle.ctx.fill();
 
    this.emitter = this.game.add.emitter(this.game.world.centerX, -300, 400);
 
    this.emitter.width = this.game.world.width;
    //this.emitter.angle = 10;
 
    this.emitter.makeParticles(this.rainParticle);
 
    this.emitter.minParticleScale = 0.1;
    this.emitter.maxParticleScale = 0.3;
 
    this.emitter.setYSpeed(600, 1000);
    this.emitter.setXSpeed(-5, 5);
 
    this.emitter.minRotation = 0;
    this.emitter.maxRotation = 0;
 
    this.emitter.start(false, 1600, 5, 0);
    
    },
    gateEntry:function()
    {
        model.pause = true;
        model.player.alpha = 0;
        var gatenum = 0;
        if(model.gatenum != null)
        {
             gatenum = model.gatenum;
             model.gatenum = null;
        }
        var anim = doors[gatenum].sprite.animations.play("anim",20);
        model.player.x = doors[gatenum].sprite.x;
        eventDispatcher.dispatch(G.PLAY_SOUND,"gate");
        game.time.events.add(300, function(){
            var tw = game.add.tween(model.player).to( { alpha: 1 }, 500, "Linear", true);
        },this);    
        game.time.events.add(450, function(){
            anim.reverse();
            anim.play();
        },this);    
        game.time.events.add(500, function(){
                if(!model.msgup)model.pause = false;
                if(model.endgame)
                {
                    model.pause = true;
                    model.endgame = false;
                    eventDispatcher.dispatch(G.ENDGAMESCENE);
                }
        },this);
        game.time.events.add(1000, function(){
            anim.reverse();
        },this);
        model.entry = "";  
         
    },
    teleportEntry:function()
    {
        model.pause = true;
        model.player.alpha = 0;
        model.player.x = 400; 
        game.time.events.add(700, function(){
            eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
            game.camera.flash(0xffffff, 200);
            var tw = game.add.tween(model.player).to( { alpha:1 }, 800, "Linear", true);
            new Ripple(model.player.x,model.player.y,50,150,0xffffff);
            game.time.events.add(800, function(){
                model.entry = "";  
            },this);
            game.time.events.add(1000, function(){
                if(!model.msgup)model.pause = false;
            },this);
          
        },this);  
    },
    skillpointAlert:function()
    {
        if(model.skillpoint>0&&(model.frost <2 || model.fire<3 || model.potilvl<2||model.shield<2))
        {
            skillpointalert = game.add.tween(model.skillicon).to( { alpha: 0 }, 500, "Linear", true, 0, -1);
            skillpointalert.yoyo(true, 100);
        }
        else if(model.skillpoint>1&&(model.frost <3 || model.fire<3 || model.potilvl<3||model.shield<3 || model.ulti1<1))
        {
            skillpointalert = game.add.tween(model.skillicon).to( { alpha: 0 }, 500, "Linear", true, 0, -1);
            skillpointalert.yoyo(true, 100);
        }
        else if(model.skillpoint>2&&(model.frost <3 || model.fire<3 || model.potilvl<3||model.shield<3 || model.ulti1<2))
        {
            skillpointalert = game.add.tween(model.skillicon).to( { alpha: 0 }, 500, "Linear", true, 0, -1);
            skillpointalert.yoyo(true, 100);
        }
       
    },
    mapAlert:function()
    {
            mapalert = game.add.tween(model.worldmapicon).to( { alpha: 0 }, 500, "Linear", true, 0, -1);
            mapalert.yoyo(true, 100);
    },
    loadOrb:function()
    {
        this.orb = game.add.sprite(400,320,"orb");
        this.orb.anchor.set(0.5,0.5);
        this.orb.scale.set(1.2,1.2);
        this.orb.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

        var tw = game.add.tween(this.orb).to( { y: "+10" }, 1000, "Linear", true, 0, -1);
        tw.yoyo(true, 100);

        game.time.events.loop(Phaser.Timer.SECOND, function(){
            new Ripple(this.orb.x,this.orb.y,25,100,0x7a2395);
        }, this);
   

    }
}