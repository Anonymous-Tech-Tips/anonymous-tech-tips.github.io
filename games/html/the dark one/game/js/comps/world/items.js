class Item extends Phaser.Group {
    constructor(sprite,x,y,anim,scaleX=1,scaleY=1) {
        super(game);
        //
        this.sprite = game.add.sprite(x,y,sprite);
        this.sprite.anchor.set(0.5,0.5);
        this.sprite.scale.set(scaleX,scaleY);
        if(anim.length>0)
        {
            this.sprite.animations.add('anim',anim);
            this.sprite.animations.play('anim',5,true);
        }
        this.sprite.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
    }
}
class Door extends Phaser.Group {
    constructor(sprite,x,y,anim,type,destination) {
        super(game);
        //
        this.sprite = game.add.sprite(x,y,sprite);
        this.sprite.anchor.set(0.5,0.5);

        this.sprite.animations.add('anim',anim);

        this.type = type;
        this.destination = destination;

        this.tip =  game.add.text(this.sprite.x,this.sprite.y-this.sprite.height+100, "Enter:E", { font: "bold 20px 'Press Start 2P'", fill: "#000",align:'center'});
        this.tip.anchor.set(0.5,0.5);
     
        if(this.type == 1) this.tip.text = "Go up:E"; 
        else if(this.type == 2) this.tip.text = "Go down:E"; 
        else if(this.type == 3) this.tip.text = "Enter:E"; 
        else if(this.type == 4) this.tip.text = "Enter:E"; 
        else if(this.type == 5) this.tip.text = "Locked"; 
       // this.sprite.animations.play('anim',5,true);
        this.sprite.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        
    }
    showtip()
    {
        this.tip.alpha = 1;
    }
    hidetip()
    {
        this.tip.alpha = 0;
    }
    enter(gatenum)
    {
        if(this.type != 5)
        {
            model.pause = true;
            eventDispatcher.dispatch(G.PLAY_SOUND,"gate");
            if(this.type == 4)
            {
                model.entry = "gate";
                this.sprite.animations.play('anim',20);
                var tw = game.add.tween(model.player).to( { alpha: 0 }, 500, "Linear", true);
                game.time.events.add(550, function(){
                    eventDispatcher.dispatch(G.LOADMAP2,{map:this.destination.map,x:this.destination.x,y:this.destination.y});
                   
                },this);
            }
            if(this.type == 2)
            {
                model.entry = "gate";
                model.gatenum = gatenum;
                this.sprite.animations.play('anim',20);
                var tw = game.add.tween(model.player).to( { alpha: 0 }, 500, "Linear", true);
                game.time.events.add(550, function(){
                    eventDispatcher.dispatch(G.DOWNEXIT);
                   
                },this);
            }
            if(this.type == 1)
            {
                model.entry = "gate";
                model.gatenum = gatenum;
                this.sprite.animations.play('anim',20);
                var tw = game.add.tween(model.player).to( { alpha: 0 }, 500, "Linear", true);
                game.time.events.add(550, function(){
                    eventDispatcher.dispatch(G.UPEXIT);
                },this);
            }
        }
        else
        {
            eventDispatcher.dispatch(G.PLAY_SOUND,"buttonlocked");
        }  
     
    }
}

class Bonus extends Phaser.Group {
    constructor(sprite,x,y,type,anim,scaleX = 1,scaleY,bonuses = []) {
        super(game);
        //
      
        this.sprite = game.add.sprite(x,y,sprite);
        this.sprite.anchor.set(0.5,0.5);
        this.sprite.scale.set(scaleX,scaleY);
        this.type = type;
        this.sprite.animations.add('anim',anim);
        this.bonuses = bonuses;


        this.sprite.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
      
        this.tip = game.add.text(this.sprite.x,this.sprite.y-this.sprite.height, "Press E", { font: "bold 20px 'Press Start 2P'", fill: "#000",align:'center'});
        this.tip.anchor.set(0.5,0.5);
    }
    showtip()
    {
       if(model.state!="main") this.tip.alpha = 1;
    }
    hidetip()
    {
        this.tip.alpha = 0;
    }
    trigger()
    {
       
            this.sprite.animations.play('anim',20);
            var tw = game.add.tween(this.sprite).to( { alpha: 0 }, 500, "Linear", true);
            this.tip.alpha = 0;
            if(this.type == "chest") eventDispatcher.dispatch(G.BONUS,this.bonuses);
            else if(this.type == "heal") eventDispatcher.dispatch(G.BONUS2,this.bonuses);
    }
}


