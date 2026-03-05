
class Npc extends Phaser.Group {
    constructor(sprite,x,y,name,msg,msgsprite,scaleX =2.5,scaleY =2.5,face=1,shoplocation = "") {
        super(game);
        //
        //
        this.sprite = game.add.sprite(x,y,sprite);
        this.sprite.anchor.set(0.5,0.5);
        this.sprite.scale.set(scaleX,scaleY);
        this.name = name;
        this.msgsprite = msgsprite;
        this._msg = msg;
        this.msgindex = 0;
        this.tip =  game.add.text(this.sprite.x,this.sprite.y-this.sprite.height+20, "Press E", { font: "20px 'Press Start 2P'", fill: "#000",align:'left'});
        this.tip.anchor.set(0.5,0.5);
        this.msgUp = false;
        this.sprite.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        this.face = face;
        this.shoplocation = shoplocation;
       

    }
    showtip()
    {
        this.tip.alpha = 1;
        game.world.bringToTop(this.tip);
    }
    hidetip()
    {
        this.tip.alpha = 0;
    }
    showmsg(){
        if(this.shoplocation == "conversation")
        {
            model.town.conversation = this._msg;
        }
        else if(this.shoplocation == "arena") 
        {
            if(model.level>=4)
                game.state.start("ArenaState");
            else
            {
                this.msg = new Msg(this.name,this._msg,"left",this.msgsprite,this.face);
                this.msgUp = true;
            }
        }
        else if(this.shoplocation!="")
        {
            eventDispatcher.dispatch(G.SHOP,this.shoplocation);
        }
        else
        {
            this.msg = new Msg(this.name,this._msg,"left",this.msgsprite,this.face);
            this.msgUp = true;
        }
    }
    hidemsg()
    {
        if(this.msgUp != null)
        { 
            this.msg.slowdestroy();
            this.msgUp = false;
        }
    }
}


