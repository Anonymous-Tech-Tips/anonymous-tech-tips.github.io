var QuestState = {
    preload: function() {},
    create: function() {
        model.state="QuestState";
        var bg = new Background("menubg");
        soundButtons = new SoundButtons();

        titleText = game.add.text(400,40, "Quest", { font: "25px 'Press Start 2P'", fill: "#000",align:'right'});
        titleText.anchor.set(0.5,0.5);     
        
        this.objectives = [];
        for (let i = 0; i < model.quests[model.currentQuest].objectives.length; i++) {
           this.objectives.push(game.add.text(400,120+40*i, model.quests[model.currentQuest].objectives[i].text, { font: "13px 'Press Start 2P'", fill: "#000",align:'right'}));
            this.objectives[i].anchor.set(0.5,0.5);
            console.log(model.quests[model.currentQuest].objectives[i].done);
            if(model.quests[model.currentQuest].objectives[i].done == true)
            {
                var graphics = game.add.graphics(0, 0);
                graphics.beginFill(0x000000);
                graphics.lineStyle(4, 0x000000, 1);
                graphics.moveTo(this.objectives[i].x-this.objectives[i].width/2-10, 120+40*i);
                graphics.lineTo(this.objectives[i].x+this.objectives[i].width/2+10,120+40*i); 
                var tick = game.add.text(this.objectives[i].x+this.objectives[i].width/2+40,120+40*i-15, "✔", { font: "40px 'Press Start 2P'", fill: "#000",align:'right'});
                tick.anchor.set(0.5,0.5);
            }
        }

        this.tiptext = game.add.text(400,350, "Tips:", { font: "20px 'Press Start 2P'", fill: "#000",align:'right'});
        this.tiptext.anchor.set(0.5,0.5);
        this.tips = [];
        for (let i = 0; i < model.quests[model.currentQuest].tips.length; i++) {
            this.tips.push(game.add.text(400,400+30*i, model.quests[model.currentQuest].tips[i], { font: "12px 'Press Start 2P'", fill: "#000",align:'right'}));
             this.tips[i].anchor.set(0.5,0.5);
         }
      
       this.buttonback = new TextButton("Back", 1, 6,G.BACKTOTOWN);
       this.buttonback.x = 400;
       this.buttonback.y = 570;  
       //created by tenfor    
    },
    update: function() {  
        
    }
}
