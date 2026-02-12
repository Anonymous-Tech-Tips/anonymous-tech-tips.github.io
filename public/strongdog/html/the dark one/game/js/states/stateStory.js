var isConfirm = false;
var img;
var btnYes;
var btnNo;
//
var player;
var StateStory = {
    create: function() {
        model.state="story";

        var bg = new Background("menubg");
       this.currentPage = 0;
       this.pagespr = game.add.sprite(0,0,"kepkocka1");
       this.pagespr.alpha = 0;
       this.nextpage();

       this.pageText = game.add.text(400,515, "Page: 1/5", { font: "12px 'Press Start 2P'", fill: "#000",align:'left'});
       this.pageText.anchor.set(0.5,0.5);

       this.nextText  = game.add.text(400,550, "Press E to continue", { font: "16px 'Press Start 2P'", fill: "#000",align:'left'});
       this.nextText.anchor.set(0.5,0.5);

       this.skipText  = game.add.text(400,575, "Press Q to skip", { font: "16px 'Press Start 2P'", fill: "#000",align:'left'});
       this.skipText.anchor.set(0.5,0.5);

       this.keyE = game.input.keyboard.addKey(Phaser.Keyboard.E);
       this.keyE.onDown.add(function(){
            this.nextpage();
        },this);
       this.keyQ = game.input.keyboard.addKey(Phaser.Keyboard.Q);
       this.keyQ.onDown.add(function(){
            this.currentPage = 5;
            this.nextpage();
        },this);

    },
    update:function()
    {
        
    },
    nextpage:function()
    {
        switch(this.currentPage)
        {
            case 0:
                var tw = game.add.tween(this.pagespr).to( { alpha: 1 }, 500, "Linear", true);
                eventDispatcher.dispatch(G.PLAY_SOUND,"flip");
                this.currentPage++;
                break;
            case 1:
                var tw = game.add.tween(this.pagespr).to( { alpha: 0 }, 500, "Linear", true);
                tw.onComplete.add(function(){
                    eventDispatcher.dispatch(G.PLAY_SOUND,"flip");
                    this.pagespr.loadTexture("kepkocka2");
                    var tw2 = game.add.tween(this.pagespr).to( { alpha: 1 }, 500, "Linear", true);
                },this);
                this.currentPage++;
                this.pageText.text = "Page: "+this.currentPage+"/5";
                break;
            case 2:
                var tw = game.add.tween(this.pagespr).to( { alpha: 0 }, 500, "Linear", true);
                tw.onComplete.add(function(){
                    eventDispatcher.dispatch(G.PLAY_SOUND,"flip");
                    this.pagespr.loadTexture("kepkocka3");
                    var tw2 = game.add.tween(this.pagespr).to( { alpha: 1 }, 500, "Linear", true);
                },this);
                this.currentPage++;
                this.pageText.text = "Page: "+this.currentPage+"/5";
                break;
            case 3:
                var tw = game.add.tween(this.pagespr).to( { alpha: 0 }, 500, "Linear", true);
                tw.onComplete.add(function(){
                    eventDispatcher.dispatch(G.PLAY_SOUND,"flip");
                    this.pagespr.loadTexture("kepkocka4");
                    var tw2 = game.add.tween(this.pagespr).to( { alpha: 1 }, 500, "Linear", true);
                },this);
                this.currentPage++;
                this.pageText.text = "Page: "+this.currentPage+"/5";
                break;
            case 4:
                var tw = game.add.tween(this.pagespr).to( { alpha: 0 }, 500, "Linear", true);
                tw.onComplete.add(function(){
                    eventDispatcher.dispatch(G.PLAY_SOUND,"flip");
                    this.pagespr.loadTexture("kepkocka5");
                    var tw2 = game.add.tween(this.pagespr).to( { alpha: 1 }, 500, "Linear", true);
                },this);
                this.currentPage++;
                this.pageText.text = "Page: "+this.currentPage+"/5";
                break;
            case 5:
                game.camera.fade(0x000000, 1000);
                game.time.events.add(1000, function(){
                   game.state.start("StateTown");
                },this);
                break;

        }
    },
    skipall:function()
    {

    },
    drawPage:function()
    {

    }
}
