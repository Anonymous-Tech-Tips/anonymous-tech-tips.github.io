var pause;
var enemies;
var _berserk;
var _regen;
var attackmod;

//skills
var crit;
var critcounter;
var b1,b2,b3;

var firecdimg;
var frostcdimg;
var shieldcdimg;
var ulticdimg;
var poticdimg;

var StateMain = {
    preload: function() {},
    create: function() {
        //keep this line
        //to tell the game what state we are in!
        //test 
      /*  model.currX  = 5;
        model.currY  = 3;
        model.map = model.maps.necrodungi;
       
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
          name:"The Necromancer"
        });*/

        model.state = "main";
        attackmod = 0;
        game.stage.backgroundColor = "#422835";
        model.pause = false;
    

        this.loadTown();


    
   
       
 
       
        var soundButtons = new SoundButtons();
      

        //set stats
        model.over = false;
        model.casting = false;
        model.ecasting = false;
        model.shieldup = 0;
        model.eshieldup = false;
        model.enemy.frozen = false;
        model.eberserk = false;
        model.stun = false;
        model.freeze = false;
        model.ultipause = false;
       
      //  model.counter = 0;
        model.globalcd = 0;
        model.basiccd = 0;
        model.firecd = 0;
        model.poticd = 0;
        model.frostcd = 0;
        model.shieldcd = 0;
        model.ulticd = 0;
        model.shadowform = false;
        model.cdTime = 60;
        


        //set hotkeys
        this.keyQ = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        this.keyQ.onDown.add(function(){
            if(model.msgup&&this.conv.msgs.length>0)
            {
                eventDispatcher.dispatch(G.PLAY_SOUND,"menumove");
                this.conv.current = this.conv.msgs.length;
                this.conv.showNext();
            }
            else if(model.globalcd==0&&model.basiccd==0) this.cast("basic");
        }, this);
        game.time.events.add(5,function(){
            this.keyD = game.input.keyboard.addKey(Phaser.Keyboard.D);
            this.keyD.onDown.add(function(){
                if(model.poticd == 0) 
                {
                    this.cast("poti");
                }
            }, this);
        },this);
        this.keyW = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.keyW.onDown.add(function(){
            if(model.globalcd==0&&model.firecd==0) this.cast("fireball");
        }, this);
        this.keyE = game.input.keyboard.addKey(Phaser.Keyboard.E);
        this.keyE.onDown.add(function(){
            if(model.msgup)
            {
                eventDispatcher.dispatch(G.PLAY_SOUND,"menumove");
                if(this.c.length > 0) this.conv.showNext();
            }
            else if(model.globalcd==0&&model.frostcd==0) this.cast("frostbolt");
        },this);
        this.keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.keyA.onDown.add(function(){
            if(model.globalcd==0&&model.shieldcd==0) this.cast("shield");
        },this);
        this.keyS = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.keyS.onDown.add(function(){
            if(model.globalcd==0&&model.ulticd==0) this.cast("ulti1");
        },this);
        this.keyR = game.input.keyboard.addKey(Phaser.Keyboard.R);
        this.keyR.onDown.add(function(){
            this.cast("ulti2");
        },this);
        
      
        

        //bars
        model.playerCastbar = new HealthBar(this.game, {x: -1000, y: model.player.y-40, width: 60,height:10});
        model.playerCastbar.barSprite.width = 0;
        model.playerCastbar.setBarColor('#ff1');
        model.enemyCastbar = new HealthBar(this.game, {x: -1000, y: model.player.y-40, width: 60,height:10});
        model.enemyCastbar.barSprite.width = 0;
        model.enemyCastbar.setBarColor('#ff1');

        model.playerHealthbar = new HealthBar(this.game,{x:model.player.x, y:440, width:120, height:18});
        model.playerEnergybar = new HealthBar(this.game,{x:model.player.x, y:465, width:120, height:18});
        model.playerEnergybar.barSprite.width =120*(model.energy/model.maxenergy);
        model.playerEnergybar.setBarColor("#aaf");
        model.playerHealthbarText =  game.add.text(model.playerHealthbar.x, model.playerHealthbar.y+5, model.hp+"/"+model.maxhp, { font: "bold 10px 'Press Start 2P'", fill: "#000",align:'right'});
        model.playerHealthbarText.anchor.set(0.5,0.5);
        model.playerHealthbar.barSprite.width =120*(model.hp/model.maxhp);
        model.playerEnergybarText =  game.add.text(model.playerEnergybar.x, model.playerEnergybar.y+5, model.energy+"/"+model.maxenergy, { font: "bold 10px 'Press Start 2P'", fill: "#000",align:'right'});
        model.playerEnergybarText.anchor.set(0.5,0.5);

        var w = 120;
        if(model.ename == "???") w = 150;
        model.enemyHealthbar = new HealthBar(this.game,{x:model.enemy.x, y:440, width:w, height:18});
        
        model.enemyHealthbarText = game.add.text(model.enemyHealthbar.x, model.enemyHealthbar.y+5, model.ehp+"/"+model.emaxhp, { font: "bold 10px 'Press Start 2P'", fill: "#000",align:'right'});
        model.enemyHealthbarText.anchor.set(0.5,0.5);      

        if(model.ename == "The Necromancer2")
        {
            model.enemyHealthbar.barSprite.width = (model.ehp/2500)*120;
        }


       
    this.loadCdImgs();
    

    },
    update: function() {
        if(!model.pause&&!model.over)
        {
                if(!model.enemy.frozen &&!model.ultipause&&!model.ecasting)
                {
                    model.ecounter+=model.espeed;
                   
                }
                
               

                if(model.globalcd > 0)
                {
                    model.globalcd--;
                    if(model.basiccd==0) basiccdimg.height = 54*(model.globalcd/model.cdTime);
                    if(model.firecd==0) firecdimg.height = 54*(model.globalcd/model.cdTime);
                    if(model.frostcd==0) frostcdimg.height = 54*(model.globalcd/model.cdTime);
                    if(model.shieldcd==0) shieldcdimg.height = 54*(model.globalcd/model.cdTime);
                    if(model.ulticd==0) ulticdimg.height = 54*(model.globalcd/model.cdTime);
                } 
             //   else if(!model.casting) model.counter++;
                if(model.basiccd>0)
                {
                    model.basiccd--;
                    basiccdimg.height = 54*(model.basiccd/(model.cdTime*4));
                }
                if(model.firecd>0)
                {
                    model.firecd--;
                    firecdimg.height = 54*(model.firecd/(model.cdTime*2));
                }
                if(model.frostcd>0)
                {
                    model.frostcd--;
                    frostcdimg.height =  54*(model.frostcd/(model.cdTime*7));
                } 
                if(model.shieldcd>0)
                {
                    model.shieldcd--;
                    shieldcdimg.height =  54*(model.shieldcd/(model.cdTime*5));
                }
                if(model.poticd>0)
                {
                    model.poticd--;
                    poticdimg.height =  54*(model.poticd/30);
                }
                if(model.ulticd>0)
                {
                    model.ulticd--;
                    ulticdimg.height =  54*(model.ulticd/(model.cdTime*20));
                } 



                if(model.ecounter >= 100)
                {
                    this.enemyAttack();
                }
           /*     if(model.counter >= 100)
                {
                    eventDispatcher.dispatch(G.BASIC);
                    model.counter = 0;
                }*/
        }
        if(model.eberserk)
        {
            model.enemy.tint = 0xff0000;
        } 
        if(model.enemy.frozen)
        {
            model.enemy.tint = 0x5555ff;
        } 
        if(model.freeze)
        {
            model.player.tint = 0x5555ff;
            model.staff.tint = 0x5555ff;
        } 
        if(!model.casting)
        {
            model.btnbasic.tint = "0xffffff";
            model.btnfireball.tint = "0xffffff";
            model.btnfrostbolt.tint = "0xffffff";
            model.btnbarrier.tint = "0xffffff";
            model.btnulti1.tint = "0xffffff";
        }
        if(model.stun||model.freeze)
            model.btnbasic.tint = "0x555555";
        if(model.energy<5||model.ulti1==0||model.stun||model.freeze)
            model.btnulti1.tint = "0x555555";
        if(model.energy<4||model.shield==0||model.stun||model.freeze)
            model.btnbarrier.tint = "0x555555";
        if(model.shieldup>0)
        model.btnbarrier.tint = "0xffff00";
        if(model.energy<3||model.frost==0||model.stun||model.freeze)
            model.btnfrostbolt.tint="0x555555";
        if(model.energy<2||model.fire==0||model.stun||model.freeze)
            model.btnfireball.tint = "0x555555";

        if(model.poti<1)
            model.btnpoti.tint = "0x555555";
        else
            model.btnpoti.tint = "0xffffff";

        if(model.shadowform||model.hp<20)
        {
            model.btnulti2.tint ="0x555555";
        }
        else
        {
            model.btnulti2.tint = "0xffffff";
        }

        model.btnpotiText.text = model.poti;
     /* if(game.input.activePointer.isDown)
        {
            console.log(game.input.x);
            console.log(game.input.y);
        }   */
        if(model.town.conversation != ""&&!model.msgup)
        {
            this.c = [];
            this.cname = "";
            model.conversations.conversations.forEach(function(c){
                if(model.town.conversation == c.name){
                    this.c = c.conv;
                    this.cname = c.name;
                }
            },this);
            if(this.c.length > 0)
            {
                this.conv = new Conversation(model.town.conversation,this.c);
                this.conv.showNext();
            }
        }
      
       
    },
    //player stuff
    loadPlayer:function()
    {
        
       
        model.player = game.add.sprite(300 ,388,"player");
        model.player.scale.set(2.7,2.7);
        model.player.anchor.set(0.5,0.5);
        model.player.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

        model.staff = game.add.sprite(314 ,390,"staff1");
        model.staff.scale.set(2.7,2.2);
        model.staff.anchor.set(0.5,0.5);
        model.staff.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

        game.world.bringToTop(model.player);


    },
    //enemystuff
    loadEnemy:function()
    {   
        model.enemy = game.add.sprite(500,model.enemyspriteY,model.enemysprite);
        model.enemy.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        if(model.enemysprite == "trapchest") model.enemy.frame = 2;
        model.ecounter = 0;
        //model.emaxhp = model.ehp;
        model.enemy.scale.set(model.escaleX,model.escaleY);
        model.enemy.anchor.set(0.5,0.5);
        
    },
    enemyAttack:function()
    {
        console.log("enemyattack");
      eventDispatcher.dispatch(G.ENEMYATTACK,model.eattacks[model.emod]);
    },
    //other stuff
    loadStuff:function()
    {
		emitter = game.add.emitter(0, 0, 20);
		emitter.makeParticles('blood');
		emitter.gravity = 800;
    },
    over:function()
    {	
        model.casting = false;
        model.pause = true;
        model.win = model.hp>0&&model.ehp<=0;
        if(model.win)
        {
            model.cash+=model.reward*model.income;
            if(model.level<model.maxlvl)model.xp+=model.xpreward;
            model.checkpointX = model.currX;
            model.checkpointY = model.currY;
            game.state.start("mapState");  
        }
        else
        {
            model.currX = model.checkpointX;
            model.currY = model.checkpointY;
            game.state.start("mapState");  
        }
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
            if(!bonus.used){
                bonuses.push(new Bonus(bonus.sprite,bonus.x,bonus.y,bonus.type,bonus.anim,bonus.scaleX,bonus.scaleY));
                bonuses[bonuses.length-1].hidetip();
            }

        });
        model.town.doors.forEach(function(door){
            doors.push(new Door(door.sprite,door.x,door.y,door.anim,door.type,door.destination));
            doors[doors.length-1].hidetip();
        });
        model.town.npcs.forEach(function(npc){
            npcs.push(new Npc(npc.sprite,npc.x,npc.y,npc.name,npc.msg,npc.msgspr,npc.scaleX,npc.scaleY,npc.face));
            npcs[npcs.length-1].hidetip();
        });

    
      

        if(model.town.name =="ship1")
        {
            this.shipimage = game.add.sprite(400,300,"ship");
         //   this.shipimage.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
            this.shipimage.anchor.set(0.5,0.5);
            this.shipimage.width = 800;
            this.shipimage.height = 600;
            npcs[0].sprite.x = -100;
        }

    

        this.loadPlayer();
        this.loadEnemy();
        this.loadStuff();
        this.loadUi();

        this.c = [];
        model.conversations.conversations.forEach(function(c){
            if(model.town.conversation == c.name){
                this.c = c.conv;
            }
        },this);

        if(model.town.weather == "rain") this.addRain();
        if(model.ename == "???")
        {
            this.bg.tint = 0x000;
        }
      
        if(this.c.length > 0)
        {
            this.conv = new Conversation(this.cname,this.c);
            this.conv.showNext();
           
            // this.conv.msgs[this.conv.current].continueText.text = "-Press E to continue-\n-Press Q to skip-";
            //
        }
        
     
        if(model.rewarding)
        {
            eventDispatcher.dispatch(G.REWARD,{gold:model.reward,xp:model.xpreward});
        }
        if(model.town.name == "arena")
        {
            switch(model.cup)
            {
                case "bronze":
                    model.town.conversation = "bronze1";
                    break;
                case "silver":
                    model.town.conversation = "silver1";
                    break;
                case "gold":
                    model.town.conversation = "gold1";
                    break;
            }   
        }
        else if(model.town.name == "todboss")
        {
            model.town.conversation = "todboss1";
        }
        else if(model.town.name == "todboss2")
        {
            model.town.conversation = "shadowform1";
        }
        else if(model.town.name == "todboss3")
        {
            model.town.conversation = "necrobattle2";
        }
        else if(model.town.name == "todboss4")
        {
            model.town.conversation = "tdoconv1";
        }
        else if(model.town.name == "tof12")
        {
            model.town.conversation = "tutorial2";
        }
        if(model.ename == "swbattle necro2")
        {
            model.ehp = model.esavedhp;
            model.enemyHealthbarText.text = model.ehp+"/"+model.emaxhp;
            model.enemyHealthbar.barSprite.width = (model.ehp/model.emaxhp)*120;
            model.town.conversation = "swbattle11";
            mediaManager.setBackgroundMusic("song2");
            
        }
        if(model.ename == "The Necromancer")
        {
           if(model.necromod == 0){
                model.town.conversation = "necrobattle0";
           } 
            
        }
        if(model.ename == "The Necromancer2")
        {
            model.ehp = model.esavedhp;
            model.enemyHealthbarText.text = model.ehp+"/"+model.emaxhp;
            model.enemyHealthbar.barSprite.width = (model.ehp/2500)*120;
            model.town.conversation = "necrobattle3";
            mediaManager.setBackgroundMusic("song2");
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
    loadUi:function()
    {
      
        model.btnulti2 = game.add.sprite(-100,540,"btnulti2");
        
        model.btnbasic = game.add.sprite(240,510,"btnbasic");
        model.btnbasic.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        model.btnbasic.scale.set(0.9);
        model.btnbasic.anchor.set(0.5,0.5);
        model.btnfireball = game.add.sprite(300,510,"btnfireball");
        model.btnfireball.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        model.btnfireball.scale.set(0.9);
        model.btnfireball.anchor.set(0.5,0.5);
        model.btnfrostbolt = game.add.sprite(360,510,"btnfrostbolt");
        model.btnfrostbolt.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        model.btnfrostbolt.scale.set(0.9);
        model.btnfrostbolt.anchor.set(0.5,0.5);
        model.btnbarrier = game.add.sprite(240,570,"btnbarrier");
        model.btnbarrier.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        model.btnbarrier.scale.set(0.9);
        model.btnbarrier.anchor.set(0.5,0.5);
        model.btnulti1 = game.add.sprite(300,570,"btnulti1");
        model.btnulti1.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        model.btnulti1.scale.set(0.9);
        model.btnulti1.anchor.set(0.5,0.5);
        model.btnpoti = game.add.sprite(360,570,"btnpoti");
        model.btnpoti.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        model.btnpoti.scale.set(0.9);
        model.btnpoti.anchor.set(0.5,0.5);
        model.btnpotiText = game.add.text(362,570, model.poti, { font: "12px 'Press Start 2P'", fill: "#000",align:'right'});
        model.btnpotiText.anchor.set(0.5,0.5);
        if(model.ulti2 == 1)
        {
            model.btnbasic.x-=27;
            model.btnfireball.x-=27;
            model.btnfrostbolt.x-=27;
            model.btnbarrier.x-=27;
            model.btnpoti.x-=27;
            model.btnpotiText.x-=27;
            model.btnulti1.x-=27;
            model.btnulti2.x = 393;
            model.btnulti2.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
            model.btnulti2.scale.set(0.9);
            model.btnulti2.anchor.set(0.5,0.5);
        }
       
    },
    skill3:function()
    {
   
    },
    skill4:function()
    {   
    
    },
    cast:function(skname = "")
    {
    
        if(!model.pause&&!model.over)
        {
            switch(skname)
            {
                case "basic":
                    if(!model.casting)model.btnbasic.tint = "0xffff00";
                    eventDispatcher.dispatch(G.CAST,{skillname:skname,time:0,color:0xff5500});
                    break;
                case "fireball":
                    if(!model.casting)model.btnfireball.tint = "0xffff00";
                    eventDispatcher.dispatch(G.CAST,{skillname:skname,time:0,color:0xff5500});
                    break;
                case "frostbolt":
                    model.btnfrostbolt.tint = "0xffff00";
                    eventDispatcher.dispatch(G.CAST,{skillname:skname,time:0,color:0xddddff});
                    break;
                case "shield":
                    if(!model.casting)model.btnbarrier.tint = "0xffff00";
                    if(model.shieldup == 0)eventDispatcher.dispatch(G.CAST,{skillname:skname,time:0,color:0xddddff});
                    else eventDispatcher.dispatch(G.PLAY_SOUND,"buttonlocked");
                    break;
                case "ulti1":
                    if(!model.casting)model.btnulti1.tint = "0xffff00";
                    var ct = 5500-(2000*model.ulti1);
                    var castTime = ct*(model.cdTime/60);
                    eventDispatcher.dispatch(G.CAST,{skillname:skname,time:castTime,color:0x7777ff});
                    break;
                case "poti":
                    eventDispatcher.dispatch(G.POTI);
                    break;
                case "ulti2":
                    if(!model.shadowform)
                    {
                        eventDispatcher.dispatch(G.CAST,{skillname:skname,time:0,color:0xddddff});
                    }
                    else
                    {
                        eventDispatcher.dispatch(G.PLAY_SOUND,"buttonlocked");
                    }
                    break;
            }
        }
    },
    loadCdImgs:function()
    {
       basiccdimg = game.add.sprite(model.btnbasic.x,model.btnbasic.y,"black");
       basiccdimg.anchor.set(0.5,0.5);
       basiccdimg.width = 54;
       basiccdimg.height = 0;

        firecdimg = game.add.sprite(model.btnfireball.x,model.btnfireball.y,"black");
        firecdimg.anchor.set(0.5,0.5);
        firecdimg.width = 54;
        firecdimg.height = 0;

        frostcdimg = game.add.sprite(model.btnfrostbolt.x,model.btnfrostbolt.y,"black");
        frostcdimg.anchor.set(0.5,0.5);
        frostcdimg.width = 54;
        frostcdimg.height = 0;

        shieldcdimg = game.add.sprite(model.btnbarrier.x,model.btnbarrier.y,"black");
        shieldcdimg.anchor.set(0.5,0.5);
        shieldcdimg.width = 54;
        shieldcdimg.height = 0;

        ulticdimg = game.add.sprite(model.btnulti1.x,model.btnulti1.y,"black");
        ulticdimg.anchor.set(0.5,0.5);
        ulticdimg.width = 54;
        ulticdimg.height = 0;

        poticdimg = game.add.sprite(model.btnpoti.x,model.btnpoti.y,"black");
        poticdimg.anchor.set(0.5,0.5);
        poticdimg.width = 54;
        poticdimg.height = 0;
    }
   
   
}