class Enemy extends Phaser.Group {
    constructor(sprite,x,y,name,str,speed,hp,reward,xpreward,scaleX = 1,scaleY = 1,flip = false,alive = true, attacks = []) {
        super(game);
        //
        this.sprite = game.add.sprite(x,y,sprite);
        this.x = x;
        this.y = y;
        this.sprite.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        this.sprite.anchor.set(0.5,0.5);
        this.sprite.scale.set(scaleX,scaleY);
        this.scaleX = scaleX,
        this.scaleY = scaleY,
        this.name = name;
        this.str = str;
        this.speed = speed;
        this.hp = hp;
        this.reward = reward;
        this.xpreward = xpreward;
        this.flip = flip;
        this.alive = alive;
        attacks == [] ? this.attacks =["basic"] : this.attacks = attacks;
        
    }
    battle()
    {
        model.pause = true;
        if(this.name == "The Necromancer") model.necromod = 0;
        eventDispatcher.dispatch(G.PLAY_SOUND,"encounter");
        this.flip ? this.scaleX*=-1 : this.scaleX *=1;
        eventDispatcher.dispatch(G.SETENEMY,{
            x:this.x,
            y:this.y,
            sprite:this.sprite.key,
            hp:this.hp,
            str:this.str,
            speed:this.speed,
            escaleX:this.scaleX,
            escaleY:this.scaleY,
            reward:this.reward,
            xpreward:this.xpreward,
            attacks:this.attacks,
            name:this.name
        });
        
        game.camera.fade(0x000000, 700);
        game.camera.onFadeComplete.add(function(){
            game.camera.onFadeComplete.removeAll();
            model.pause = false;
            game.state.start("StateMain");
        }, this);          
       
    }
}



