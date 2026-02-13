var StateDie = {
    create: function() {
		model.state="die";
		var soundButtons = new SoundButtons();
		mediaManager.setBackgroundMusic("");
		game.stage.backgroundColor = "#000000";


		eventDispatcher.dispatch(G.PLAY_SOUND,"defeat");

		this.titleText = game.add.text(400,100, "Defeat", { font: "36px 'Press Start 2P'", fill: "#fff",align:'right'});
		this.titleText.anchor.set(0.5,0.5);
		
		this.spr = game.add.sprite(400,180,"player");
		this.spr.scale.set(2.7,2.7);
		this.spr.anchor.set(0.5,0.5);
		this.spr.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

		this.tipText = game.add.text(400,320, "Tip: Mah mah mah mah mah :3 ", { font: "16px 'Press Start 2P'", fill: "#fff",align:'left'});
		this.tipText.anchor.set(0.5,0.5);
		this.tipText.wordWrap = true;
		this.tipText.wordWrapWidth = 700;

		shopbuttonback = new TextButton("Continue", 1, 6,G.BACKTOTOWN);
		shopbuttonback.x = 400;
		shopbuttonback.y = 560;

		if(model.map.name=="tof")
		{
			if(model.skillpoint>0)
				this.tipText.text = "Tip: Don't forget to spend your skillpoints after each level up!";
			else
			{
				var rand = Math.floor((Math.random() * 2) + 1);
				switch(rand)
				{
					case 1:
						this.tipText.text = "Tip: Try to save your mana for tougher enemies!";
						break;
					case 2:
						this.tipText.text = "Tip: Try to find healing potions and use them during a difficult fight by pressing D!";
						break;
					default:
						break;
				}
			}
			model.town.conversation = "tofdefeat";
		}
		else if(model.map.name == "gwdungi")
		{
			if(model.ename == "Shaman Morgzor")
			{
				this.tipText.text = "Tip: Freeze Morgzor while he is casting to interrupt his healing spell!";
			}
			else
			{
				if(model.cash >= 45) this.tipText.text = "Tip: Buy some relic from the city to become stronger!";
				else if(model.skillpoint > 0) this.tipText.text = "Tip: Don't forget to spend your skillpoints each time you level up!";
				else
				{ 
					var rand = Math.floor((Math.random() * 2) + 1);
					switch(rand)
					{
						case 1:
							this.tipText.text = "Tip: Try to save your mana for tougher enemies!";
							break;
						case 2:
							this.tipText.text = "Tip: Look for chests and healing potions!";
							break;
						default:
							break;
					}
				}
				
			}
		}
		else if(model.map.name == "wfdungi")
		{
			if(model.ename == "Murgurath")
			{
				this.tipText.text = "Tip: Murgurath is immune to freeze but you can block his strongest attacks with your shield spell!";
			}
			else
			{
				if(model.cash >= 80) this.tipText.text = "Tip: Buy some relic from the city to become stronger!";
				else if(model.skillpoint > 1) this.tipText.text = "Tip: Don't forget to spend your skillpoints each time you level up!";
				else
				{ 
					var rand = Math.floor((Math.random() * 4) + 1);
					switch(rand)
					{
						case 1:
							this.tipText.text = "Tip: Try to save your mana for tougher enemies!";
							break;
						case 2:
							this.tipText.text = "Tip: Look for chests and healing potions!";
							break;
						case 3:
							this.tipText.text = "Tip: If you can't win a fight maybe you should visit some other location and only return when you are stronger!";
							break;
						case 4:
							this.tipText.text = "Tip: Don't waste mana on a shielded enemy, Wait until it's wears off.";
							break;
						default:
							break;
					}
				}
				
			}
		}
		else
		{
			if(model.skillpoint>3)
				this.tipText.text = "Tip: Don't forget to spend your skillpoints after each level up!";
			else
			{
				var rand = Math.floor((Math.random() * 5) + 1);
					switch(rand)
					{
						case 1:
							this.tipText.text = "Tip: If you can't win a fight maybe you should visit some other location and only return when you are stronger!";
							break;
						case 2:
							this.tipText.text = "Tip: Try to save your shield spell and block only the strongest attacks!";
							break;
						case 3:
							this.tipText.text = "Tip: You can freeze your enemies and interrupt their spellcasting!";
							break;
						case 4:
							this.tipText.text = "Tip: Try to save your mana for tougher enemies!";
							break;
						case 5:
							this.tipText.text = "Tip: From Alchemy level 1, potions will restore both HP and mana.";
							break;
						default:
							break;
					}
			}
		}
	
		
		

		

			setStats();
			saveData();
	},
	update: function()
	{
	
	}
}