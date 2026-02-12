var StateOver = {
    create: function() {
		model.state="over";
		var soundButtons = new SoundButtons();
		mediaManager.setBackgroundMusic("");
		game.stage.backgroundColor = "#977d8a";

		eventDispatcher.dispatch(G.PLAY_SOUND,"win");

		this.titleText = game.add.text(400,100, model.overreward.titleText, { font: "26px 'Press Start 2P'", fill: "#000",align:'center'});
		this.titleText.anchor.set(0.5,0.5);

		if(model.overreward.quest !=null && model.overreward.objective!=null)
		{
			model.quests[model.overreward.quest].objectives[model.overreward.objective].done = true;	
		}

		if(model.overreward.gold!=null&&model.overreward.gold>0)
		{
			this.bonusgoldText = game.add.text(400,440, "+"+model.overreward.gold+" Gold", { font: "18px 'Press Start 2P'", fill: "#000000",align:'center'});
			this.bonusgoldText.anchor.set(0.5,0.5);
			model.cash+= model.overreward.gold;
		}
		if(model.overreward.xp!=null&&model.overreward.xp>0)
		{
			this.bonusxpText = game.add.text(400,480, "+"+model.overreward.xp+" XP", { font: "18px 'Press Start 2P'", fill: "#000000",align:'center'});
			this.bonusxpText.anchor.set(0.5,0.5);
			if(model.level<model.maxlvl)model.xp+= model.overreward.xp;
		}
			
		if(model.overreward.relic!=null)
		{
			this.newrelictext = game.add.text(400,170, "NEW RELIC!", { font: "22px 'Press Start 2P'", fill: "#ff0",align:'center'});
			this.newrelictext.anchor.set(0.5,0.5);	
			
			this.bonusrelictext = game.add.text(400,220, model.overreward.relic, { font: "16px 'Press Start 2P'", fill: "#000",align:'center'});
			this.bonusrelictext.anchor.set(0.5,0.5);	
			
			this.unlockedtext =  game.add.text(400,320, "Unlocked", { font: "14px 'Press Start 2P'", fill: "#000",align:'center'});
			this.unlockedtext.anchor.set(0.5,0.5);	
			
			var sprkey = "";
			var type = "";
			var val = 0;
			var have = false;
			model.relics.forEach(r => {
				if(r.name == model.overreward.relic)
				{
					sprkey = r.spritekey;
					type = r.type;
					val = r.value;
					if(r.have)
					{
						this.newrelictext.text = "ALREADY HAVE";
						this.unlockedtext.text = "Duplicate bonus: "+model.overreward.gold+" gold!";
						model.cash+= model.overreward.gold;
					}
					else
					{
						r.have = true;
						
					}
				}
			});
			this.bonusrelicsprite = game.add.sprite(400,270,sprkey);
			this.bonusrelicsprite.scale.set(1.5,1.5);
			this.bonusrelicsprite.anchor.set(0.5,0.5);
	
		
			
			this.infotext = game.add.text(400,370, "....", { font: "12px 'Press Start 2P'", fill: "#000",align:'center'});
			this.infotext.anchor.set(0.5,0.5);	

			switch(type)
			{
				case "crit1":
					this.infotext.text = "Increases your critical chance by "+val+"%";
					break;
				case "crit2":
					this.infotext.text = "Increases your critical damage by "+(val*100)+"%";
					break;
				case "hp":
					this.infotext.text = "Increases your maximum HP by "+(val)+".";
					break;
				case "mp":
					this.infotext.text = "Increases your maximum mana by "+(val)+".";
					break;
				case "hpmp":
					this.infotext.text = "Increases your maximum HP and mana by "+(val)+".";
					break;
				case "gold":
					this.infotext.text = "Increases the amount of gold you gain by "+(val*100)+"%";
					break;
				case "xp":
					this.infotext.text = "Increases the amount of XP you gain by "+(val*100)+"%";
					break;
				case "dmg":
					this.infotext.text = "Increases spell power by "+(val)+".";
					break;
				case "dark":
					this.infotext.text = "Releases your hidden evil.";
					break;
				default:
					this.infotext.text = "Error while loading information.";
					break;
			}

		}

		model.map = eval("model.maps."+model.overreward.destination.map);

		if(model.currentQuest == 2 && model.quests[2].objectives[0].done && model.quests[2].objectives[1].done && model.quests[2].objectives[2].done)
		{
			model.popuping = true;
			model.topopup = {text1:"New Objective!",text2:"Speak with Trisha and Complete the Trial of Darkness!",icon:"scrollicon2"};
		}
		if(model.currentQuest == 1 && model.quests[1].objectives[0].done && model.quests[1].objectives[1].done)
		{
			model.towns.mt0.conversation = "";
			model.towns.mt0.npcs = [];
			model.towns.mt1.conversation = "";
			model.towns.mt1.npcs[1].x = -1000;
			model.towns.mt5.npcs[0].x = -1000;
			model.towns.mt5.conversation = "";
			model.towns.mt5.weather = "";
		}
	

		this.buttonback = new TextButton("Back", 1, 6,G.LOADMAP2, model.overreward.destination);
		this.buttonback.y = 570;
		
		setStats();
		saveData();
	},
	update: function()
	{
	
	}
}