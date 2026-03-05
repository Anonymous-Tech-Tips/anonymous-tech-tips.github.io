var intro = {
    create: function() {
        model.state="intro";

        this.video = game.add.video('armorgamesintro');
    
       this.sprite = this.video.addToWorld(400, 300, 0.5, 0.5);
        this.video.play();
        game.input.onDown.add(function(){
            window.open("https://armor.ag/MoreGames", "_blank");
        }, this);
        

        game.time.events.add(4000,function(){
            game.state.start("StateTitle");
        },this);
        
    }
}
