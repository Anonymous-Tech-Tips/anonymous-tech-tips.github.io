var stateEndGame = {
    create: function() {
		model.state="endgame";
		var soundButtons = new SoundButtons();
		game.stage.backgroundColor = "#000000";

		model.quests[5].objectives[0].done = true;
		model.currentQuest = 6;

		model.ulti2 = 1;
		model.towns.necrodungi35.enemies = [];
		model.towns.necrodungi35.conversation = "";
		model.towns.necrodungi35.npcs.push({
			"sprite": "townsfolk12",
			"x": 600,
			"y":395,
			"name":"Oldster",
			"msg":"goldtoxp",
			"msgspr":"townsfolk12",
			"scaleX":-2.8,
			"scaleY":2.8,
			"face":-1,
			"shoplocation":"conversation"
		});


		saveData();

		this.text1 =  game.add.text(400, 225 , "Varthen and The Dark One\nwill return!", { font: "30px 'Press Start 2P'", fill: "#fff",align:'center'});
		this.text1.anchor.set(0.5,0.5);
		this.text1.alpha = 0;
		
		this.text2 =  game.add.text(400, 500 , "To be continued...", { font: "20px 'Press Start 2P'", fill: "#fff",align:'center'});
		this.text2.anchor.set(0.5,0.5);
		this.text2.alpha = 0;

		game.time.events.add(500,function(){
			var tw1 = game.add.tween(this.text1).to( { alpha:1 }, 2500, "Linear", true);
		},this);

		game.time.events.add(3000,function(){
			var tw2 = game.add.tween(this.text2).to( { alpha:1 }, 2500, "Linear", true);
		},this);

		game.time.events.add(5000,function(){
			game.camera.fade(0x000000,1000);
			game.time.events.add(1000,function(){
				game.state.start("CreditState2");
			});
		},this);
		
	},
	update: function()
	{
	
	}
}