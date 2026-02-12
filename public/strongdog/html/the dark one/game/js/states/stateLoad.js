var full, empty;
var StateLoad = {
    preload: function() {
        model.state = "load";
        empty = game.add.image(0, 0, "loadingEmpty");
        full = game.add.image(0, 0, "loadingFull");
        empty.anchor.set(0.5, 0.5);
        empty.x = game.width / 2;
        empty.y = game.height / 2;
        //
        //
        full.anchor.set(0, 0.5);
        full.x = game.world.centerX - empty.width / 2;
        full.y = empty.y;
        game.load.setPreloadSprite(full);
        //PRELOAD EVERYTHING HERE
        //
        //
        //
        var theme = new RedTheme();
        theme.loadTheme();
        //Preload all text buttons
        TextButton.preloadAll();
        //Preload all icons
        //preload images
        game.load.spritesheet("player2", "images/main/player2.png", 16, 25,28);
        game.load.spritesheet("player", "images/main/player.png", 16, 25,28);
        //bgitems
        game.load.spritesheet("water", "images/main/water.png", 88, 88,4);
        game.load.spritesheet("lava", "images/main/lava.png", 88, 88,16);
        game.load.spritesheet("candle", "images/main/candle.png", 88, 88,6); 
        game.load.spritesheet("candle2", "images/main/candle2.png", 88, 88,6); 
        this.loadMain("thumbnail2");
        this.loadMain("home");
        //
        game.load.spritesheet("chest", "images/main/chest.png", 88, 88,3);
        game.load.spritesheet("trapchest", "images/main/trapchest.png", 88, 88,3);

        //doors
        game.load.spritesheet("dungeongate", "images/main/dungeongate.png", 176, 176,6);

        this.loadMain("armorgameslogo");
        this.loadMain("armorgameslogo2");
        this.loadMain("player3");
        this.loadMain("player4");
        this.loadMain("sword1");
        this.loadMain("sword2");
        this.loadMain("sword3");
        this.loadMain("sword4");
        this.loadMain("staff1");
        this.loadMain("shadowform");
        //load forest enemies
        this.loadMain("bat");
        this.loadMain("frost2");
        this.loadMain("frost3");
        this.loadMain("frost4");
        this.loadMain("frost5");
        this.loadMain("frost6");
        this.loadMain("frost7");
        this.loadMain("frostzombi");
        this.loadMain("forest2");
        this.loadMain("forest3");
        this.loadMain("forest4");
        this.loadMain("forest5");
        //load cave enemies
        this.loadMain("cave1");
        this.loadMain("undead1");
        this.loadMain("undead2");
        this.loadMain("undead3");
        this.loadMain("undead4");
        this.loadMain("undead5");
        this.loadMain("undead6");
        this.loadMain("cave2");
        this.loadMain("cave3");
        this.loadMain("cave4");
        this.loadMain("cave5");
        //load castle enemies
        this.loadMain("castle2");   
        this.loadMain("castle4");
        //load dark enemies
        this.loadMain("dark1");
        this.loadMain("dark2");
        this.loadMain("dark3");
        this.loadMain("dark4");
        //
        this.loadMain("necro");
        //npcs
        this.loadMain("wizard1");
        this.loadMain("wizard2");
        this.loadMain("wizard3");
        this.loadMain("wizard4");
        this.loadMain("merchant");
        this.loadMain("merchant2");
        this.loadMain("merchant3");
        this.loadMain("admiral");
        this.loadMain("townsfolk1");
        this.loadMain("townsfolk2");
        this.loadMain("townsfolk3");
        this.loadMain("townsfolk4");
        this.loadMain("townsfolk5");
        this.loadMain("townsfolk6");
        this.loadMain("townsfolk7");
        this.loadMain("townsfolk8");
        this.loadMain("townsfolk9");
        this.loadMain("townsfolk10");
        this.loadMain("townsfolk11");
        this.loadMain("townsfolk12");
        this.loadMain("guard1");
        this.loadMain("guard2");
        this.loadMain("guard3");
        this.loadMain("landor");
        this.loadMain("landorarena");
        this.loadMain("lucas");
        this.loadMain("lucas2");
        this.loadMain("lucasarena");
        this.loadMain("elf");
        this.loadMain("tori");
        this.loadMain("chicken");
        this.loadMain("monk");
        //town bgs
        this.loadMain("wizardbg1");
        this.loadMain("trymap");
        this.loadMain("trymap2");
        this.loadMain("mt04");
        this.loadMain("mt03");
        this.loadMain("mt02");
        this.loadMain("mt-1");
        this.loadMain("mt0");
        this.loadMain("mt1");
        this.loadMain("mt2");
        this.loadMain("tof21");
        this.loadMain("tof22");
        this.loadMain("tof23");
        this.loadMain("tof11");
        this.loadMain("tof12");
        this.loadMain("tof13");
        this.loadMain("tof32");
        this.loadMain("tof33");
        this.loadMain("sw1");
        this.loadMain("sw2");
        this.loadMain("sw3");
        this.loadMain("sw4");
        this.loadMain("sw5");
        this.loadMain("swbattle1");
        this.loadMain("swbattle2");
        this.loadMain("swbattle3");
        this.loadMain("swbattle4");
        this.loadMain("swbattle5");
        this.loadMain("gw1");
        this.loadMain("gw2");
        this.loadMain("gw3");
        this.loadMain("gw4");
        this.loadMain("gw5");
        this.loadMain("gwdungi0");
        this.loadMain("gwdungi1");
        this.loadMain("gwdungi2");
        this.loadMain("gwdungi3");
        this.loadMain("gwdungi4");
        this.loadMain("gwdungi5");
        this.loadMain("gwdungi6");
        this.loadMain("wf1");
        this.loadMain("wf2");
        this.loadMain("wf3");
        this.loadMain("wf4");
        this.loadMain("wf5");
        this.loadMain("wfdungi0");
        this.loadMain("wfdungi1");
        this.loadMain("wfdungi2");
        this.loadMain("wfdungi00");
        this.loadMain("wfdungi01");
        this.loadMain("wfdungi02");
        this.loadMain("wfdungi03");
        this.loadMain("wfdungi11");
        this.loadMain("wfdungi12");
        this.loadMain("wfdungi23");
        this.loadMain("tod1");
        this.loadMain("tod2");
        this.loadMain("tod3");
        this.loadMain("tod4");
        this.loadMain("tod5");
        this.loadMain("tod6");
        this.loadMain("tod7");
        this.loadMain("tod8");
        this.loadMain("ship");
        this.loadMain("shipbg");
        this.loadMain("arena");
        this.loadMain("necrodungi0");
        this.loadMain("necrodungi1");
        this.loadMain("necrodungi2");
        this.loadMain("necrodungi3");
        this.loadMain("necrodungi4");
        this.loadMain("necrodungi5");
        this.loadMain("necrodungi6");
        this.loadMain("necrodungi7");
        this.loadMain("necrodungi8");
        this.loadMain("necrodungi9");
        this.loadMain("necrodungi10");
        this.loadMain("necrodungi11");
        this.loadMain("necrodungi12");

        //mapimage
        this.loadMain("mapimage2");
        this.loadMain("wfmapimage");
        this.loadMain("swmapimage");
        this.loadMain("gwmapimage");

        //load utils
        this.loadMain("black");
        this.loadMain("blood");
        this.loadMain("green");
        this.loadMain("blue");
        this.loadMain("yellow");
        this.loadMain("purple");
        this.loadMain("purple2");
        this.loadMain("pink");
        this.loadMain("orange");
        this.loadMain("rain");
        this.loadMain("btnLvlUp");
        this.loadMain("scrollicon");
        this.loadMain("scrollicon2");
        this.loadMain("mapicon");
        this.loadMain("bookicon1");
        this.loadMain("bookicon2");
        this.loadMain("bookicon3");
        this.loadMain("manicon");
        this.loadMain("staricon");
        this.loadMain("stun");
        this.loadMain("shopsign1");
        this.loadMain("altar1");

        this.loadMain("coin");
        this.loadMain("msgbox");
        this.loadMain("uibox");
        //skillbtns
        this.loadMain("btnbasic");
        this.loadMain("btnfireball");
        this.loadMain("btnfrostbolt");
        this.loadMain("btnbarrier");
        this.loadMain("btnulti1");
        this.loadMain("btnulti2");
        this.loadMain("btnpoti");
        //relics
        this.loadMain("crit1relic1");
        this.loadMain("crit1relic2");
        this.loadMain("crit1relic3");
        this.loadMain("crit2relic1");
        this.loadMain("crit2relic2");
        this.loadMain("crit2relic3");
        this.loadMain("hprelic1");
        this.loadMain("hprelic2");
        this.loadMain("hprelic3");
        this.loadMain("manarelic1");
        this.loadMain("manarelic2");
        this.loadMain("manarelic3");
        this.loadMain("goldrelic1");
        this.loadMain("goldrelic2");
        this.loadMain("goldrelic3");
        this.loadMain("xprelic1");
        this.loadMain("xprelic2");
        this.loadMain("xprelic3");
        this.loadMain("dmgrelic1");
        this.loadMain("dmgrelic2");
        this.loadMain("dmgrelic3");
        this.loadMain("orb");
        
        
        
        this.loadMain("potiicon");
        this.loadMain("bronzecup");
        this.loadMain("silvercup");
        this.loadMain("goldcup");

        //load map stuff and cards
        //monsters
        game.load.spritesheet("fire1", "images/main/fire1.png", 48, 48,8);
        game.load.spritesheet("golvon", "images/main/golvon.png", 176, 264,8);
        game.load.spritesheet("captain", "images/main/captain.png", 21, 26,2);
        this.loadMain("fire2");
        this.loadMain("fire3");

        this.loadMain("cook");
        this.loadMain("pirate1");
        this.loadMain("pirate2");
        this.loadMain("bullet");
        //this.loadMain("knightplan");
        game.load.spritesheet("boss", "images/main/boss.png", 70, 105);
        //spells
        game.load.spritesheet("fireball", "images/main/fireball.png", 64, 64,60);
        game.load.spritesheet("fireball2", "images/main/fireball2.png", 100, 100,64);
        game.load.spritesheet("frost1", "images/main/frost1.png", 100, 100,100);
        game.load.spritesheet("shield", "images/main/shield.png", 100, 100,64);
        game.load.spritesheet("shield2", "images/main/shield2.png", 100, 100,36);
        game.load.spritesheet("ulti1", "images/main/ulti1.png", 100, 100,49);
        game.load.spritesheet("ulti1explosion", "images/main/ulti1explosion.png", 100, 100,70);
        game.load.spritesheet("basic", "images/main/basic.png", 100, 100,64);

        //backgrounds
        game.load.image("menubg", "images/main/menubg.jpg");
        game.load.image("mainmenubg", "images/main/mainmenubg.jpg");

        //kepkockák&achik
        game.load.image("kepkocka1", "images/main/kepkocka1.jpg");
        game.load.image("kepkocka2", "images/main/kepkocka2.jpg");
        game.load.image("kepkocka3", "images/main/kepkocka3.jpg");
        game.load.image("kepkocka4", "images/main/kepkocka4.jpg");
        game.load.image("kepkocka5", "images/main/kepkocka5.jpg");
        game.load.image("achi1", "images/main/achi1.jpg");
        game.load.image("achi2", "images/main/achi2.jpg");
        game.load.image("achi3", "images/main/achi3.jpg");
        game.load.image("achi4", "images/main/achi4.jpg");
        game.load.image("achi5", "images/main/achi5.jpg");
        game.load.image("achi6", "images/main/achi6.jpg");
        game.load.image("achi7", "images/main/achi7.jpg");
        game.load.image("achi8", "images/main/achi8.jpg");

        this.loadMain("key");

        //jsons
        game.load.json('towns', 'json/towns.json');
        game.load.json('conversations', 'json/conversations.json');
        game.load.json('maps', 'json/maps.json');
        game.load.json('relics', 'json/relics.json');
        game.load.json('quests', 'json/quests.json');
  
    
        //ag intro video
        game.load.video('armorgamesintro', ['video/648x432_v1.m4v','video/648x432_v1.ogv','video/648x432_v1.webm','video/648x432_v1.mp4']);

        
        //musics
        game.load.audio("swsong", "audio/background/swsong.mp3");
        game.load.audio("mtsong", "audio/background/mtsong.mp3");
        game.load.audio("wfsong", "audio/background/wfsong.mp3");
        game.load.audio("song1", "audio/background/song1.mp3");
        game.load.audio("song2", "audio/background/song2.mp3");
        game.load.audio("menusong", "audio/background/menusong.mp3");
        game.load.audio("horror", "audio/background/horror.mp3");
      
        //game.load.audio("elephant","audio/sfx/elephant.mp3");
        this.loadSFX("hit");
        this.loadSFX("hit2");
        this.loadSFX("hit3");
        this.loadSFX("gunshot");
        this.loadSFX("buy");
        this.loadSFX("enemydie");
        this.loadSFX("playerdie");
        //this.loadSFX("regen");
        this.loadSFX("revive");
        this.loadSFX("berserk");
     
        this.loadSFX("frenzy");
        this.loadSFX("critsound");
        this.loadSFX("flip");
        this.loadSFX("coin");
        this.loadSFX("encounter");
        this.loadSFX("explode");
        this.loadSFX("goodaltar");
        this.loadSFX("badaltar");
        this.loadSFX("transform");
        this.loadSFX("win");
        this.loadSFX("defeat");
        this.loadSFX("jump");
        this.loadSFX("casting");
        this.loadSFX("ecasting");
        this.loadSFX2("step");
        this.loadSFX2("shot");
        this.loadSFX2("freeze1");
        this.loadSFX2("freeze2");
        this.loadSFX2("shieldup");
        this.loadSFX2("ulti1");
       // this.loadSFX2("scorecount");
        this.loadSFX2("buttonlocked");
        this.loadSFX2("explode2");
        this.loadSFX2("explode3");
        this.loadSFX2("gate");
        this.loadSFX2("teleport");
        this.loadSFX2("menumove");
    },
    loadMain(name) {
        game.load.image(name, "images/main/" + name + ".png");
    },
    loadSFX(name) {
        game.load.audio(name, "audio/sfx/" + name + ".mp3");
        model.regSound(name);
    },
    loadSFX2(name) {
        game.load.audio(name, "audio/sfx/" + name + ".wav");
        model.regSound(name);
    },
    create: function() {

        //disable scrolling stuff 
        var keys = {};
        window.addEventListener("keydown",
            function(e){
                keys[e.keyCode] = true;
                switch(e.keyCode){
                    case 37: case 39: case 38:  case 40: // Arrow keys
                    case 32: e.preventDefault(); break; // Space
                    default: break; // do not block other keys
                }
            },
        false);
        window.addEventListener('keyup',
            function(e){
                keys[e.keyCode] = false;
            },
        false);
       
        //setting up model
       
        model.towns = game.cache.getJSON('towns');
        model.conversations = game.cache.getJSON('conversations');
        model.maps = game.cache.getJSON('maps');
       
       
    

        model.spellpower = [1,2,3,4,6,8,10,13,16,19,25];
        model.hpvalue = [15,16,18,20,23,26,30,35,42,50];
        model.energyvalue = [8,9,10,12,15,18,22,26,30,35];
        model.xptonextlv = [2,5,9,14,18,22,28,35,45,58,70,85,100,118,140,165,195,225,260,99999999];
        model.maxlvl = 19;
        model.necromod = 0;

       
        loadData();
      
     

        
        model.currX = model.map.startX;
        model.currY = model.map.startY;
        model.checkpointX = model.map.startX;
        model.checkpointY = model.map.startY;
        model.startpos = 400;
        model.startface = 1;
        model.msgup = false;
        model.ispopup = false;



        var l = true;
        model.relics.forEach(r => {
            if(r.have != true) l = false;
        });
        model.achis = [
            model.currentQuest>0,
            model.currentQuest>1,
            model.currentQuest>3,
            model.relics[10].have == true,
            model.currentQuest>5,
            model.relics[20].have == true,
            l,
            model.level == 19        
        ];
    




        //pass the key for background music to the media manager
        mediaManager.setBackgroundMusic("");
   
        //pass sound keys to the media manager
        //a sound object will be created
        model.sfx.forEach(function(sound) {
            mediaManager.addSound(sound);
        }.bind(this));

        mediaManager.soundArray["casting"].volume = 0.9;
        mediaManager.soundArray["shieldup"].volume = .5;
        mediaManager.soundArray["gate"].volume = .5;
        mediaManager.soundArray["teleport"].volume = .3;
        mediaManager.soundArray["coin"].volume = .7;
        mediaManager.soundArray["menumove"].volume = .8;


        if (model.devMode == true) {
            model.musicOn = true;
            
            this.focustext = game.add.text(400,350, "Click to regain focus!", { font: "15px 'Press Start 2P'", fill: "#fff",align:'center'});
            this.focustext.anchor.set(0.5,0.5);
          //  model.soundOn = false;
            
            game.state.start("intro");
        } else {
            game.state.start("intro");
        }
         
       
    },
    update: function() {}
}
function setStats()
{

    if(model.level>model.maxlvl) model.level = model.maxlvl;
    model.hp = model.hpvalue[Math.floor(model.level/2)];
    model.energy = model.energyvalue[Math.floor(model.level/2)];
    model.dmg = model.spellpower[Math.floor((model.level+1)/2)];
    model.crit = 0;
    model.critdmg = 1.5;
    model.goldgain = 1;
    model.xpgain = 1;
    model.cdTime = 60;

    model.relics.forEach(e => {
        if(e.have)
        {
            switch(e.type)
            {
                case "hp":
                    model.hp+=e.value;
                    break;
                case "mp":
                    model.energy+=e.value;
                    break;
                case "hpmp":
                    model.energy+=e.value;
                    model.hp+=e.value;
                    break;
                case "dmg":
                    model.dmg+=e.value;
                    break;
                case "crit1":
                    model.crit+=e.value;
                    break;
                case "crit2":
                    model.critdmg+=e.value;
                    break;
                case "gold":
                    model.goldgain+=e.value;
                    break;
                case "xp":
                    model.xpgain+=e.value;
                    break;
            }
        }
    });
    model.maxhp = model.hp;
    model.maxenergy = model.energy;

    for (let i = 0; i < model.quests.length; i++) {
        var l = true;
        for (let j = 0; j < model.quests[i].objectives.length; j++) {
            if(!model.quests[i].objectives[j].done) l = false;
        }
        if(l) model.currentQuest = i+1;
    }
}

function loadData()
{
    var asd = localStorage.getItem('tdo-cash');
	if(asd!=null)
	{
      
        model.cash = parseInt(localStorage.getItem('tdo-cash'));
		model.xp = parseInt(localStorage.getItem('tdo-xp'));
        model.level = parseInt(localStorage.getItem('tdo-level'));
        model.poti = parseInt(localStorage.getItem('tdo-poti'));
        model.potilvl = parseInt(localStorage.getItem('tdo-potilvl'));
        model.fire =  parseInt(localStorage.getItem('tdo-fire'));
        model.frost =  parseInt(localStorage.getItem('tdo-frost'));
        model.shield =  parseInt(localStorage.getItem('tdo-shield'));
        model.ulti1 =  parseInt(localStorage.getItem('tdo-ulti1'));
        model.ulti2 =  parseInt(localStorage.getItem('tdo-ulti2'));
        model.skillpoint = parseInt(localStorage.getItem('tdo-skillpoint'));
        
        model.relics = JSON.parse(localStorage.getItem("tdo-relics"));
        model.quests = JSON.parse(localStorage.getItem("tdo-quests"));
        reloadJsons();

        model.currentQuest = parseInt(localStorage.getItem('tdo-currentQuest'));
       
        var m = eval("model.maps."+localStorage.getItem('tdo-map'));
        if(m.name == "mtbattle")
        {
            m = model.maps.mt;
        }
        else if(m.name == "ship")
        {
            m = model.maps.sw;
        }
        else if(m.name == "arena")
        {
            m = model.maps.sw;
        }
        if(model.currentQuest != 1&&model.currentQuest<5) model.mtlock = true;
        if(model.currentQuest > 4)
        {
            model.towns.sw2.npcs[1].x = -1000;
            model.towns.sw5.npcs[0].msg = "You saved the city!\nI guess we owe you one.";
            model.towns.sw5.npcs[1].sprite = "lucas2";
            model.towns.sw5.npcs[1].msgspr = "lucas2";
            model.towns.sw5.npcs[1].msg = "I lost my eye during the battle.";
            model.towns.sw5.npcs[2].msg = "From now, we will train harder!";

            model.maps.mt.startX = 0;

            model.towns.mt0.conversation = "";
            model.towns.mt0.npcs = [];
            model.towns.mt1.conversation = "";
            model.towns.mt1.npcs[1].x = -1000;
            model.towns.mt5.npcs[0].x = -1000;
            model.towns.mt5.conversation = "";
            model.towns.mt5.weather = "";
        }
        if(model.currentQuest>5)
        {
            model.ulti2 = 1;
            model.towns.mt03.conversation = "";
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
        }
     
        
        model.map = m;
      

	}
	else
	{
        model.cash = 0;
		model.xp = 0;
        model.level = 0;
        model.poti = 0;
        model.potilvl = 0;
        model.fire = 1;
        model.frost = 0;
        model.shield = 0;
        model.ulti1 = 0;
        model.ulti2 = 0;
        model.skillpoint = 0;
        model.relics = game.cache.getJSON('relics').relics;
        //loadquests 
        model.quests = game.cache.getJSON('quests');

        model.currentQuest = 0;
        model.map = model.maps.beginning;
    }
    //set attributes
    setStats();
    model.shiplock = true;
    model.conv = "";
}
function saveData()
{
    //cash&xp
    localStorage.setItem('tdo-cash', model.cash);
    localStorage.setItem('tdo-xp', model.xp);
    //lvl
    localStorage.setItem('tdo-level', model.level);
    //poti
    localStorage.setItem('tdo-poti', model.poti);
    //skills
    localStorage.setItem('tdo-potilvl', model.potilvl);
    localStorage.setItem('tdo-fire', model.fire);
    localStorage.setItem('tdo-frost', model.frost);
    localStorage.setItem('tdo-shield', model.shield);
    localStorage.setItem('tdo-ulti1', model.ulti1);
    localStorage.setItem('tdo-ulti2', model.ulti2);
    //skillpoint
	localStorage.setItem('tdo-skillpoint', model.skillpoint);   
    //relics
    localStorage.setItem('tdo-relics',  JSON.stringify(model.relics));
    //quests
    localStorage.setItem('tdo-quests',  JSON.stringify(model.quests));
    localStorage.setItem('tdo-currentQuest',model.currentQuest);
    //map
    localStorage.setItem('tdo-map', model.map.name);
   
    console.log("Game Saved");
}
function resetData()
{
    model.cash = 0;
    model.xp = 0;
    model.level = 0;
    model.poti = 0;
    model.potilvl = 0;
    model.fire = 1;
    model.frost = 0;
    model.shield = 0;
    model.ulti1 = 0;
    model.ulti2 = 0;
    model.skillpoint = 0;

    model.relics = game.cache.getJSON('relics').relics;
    model.quests = game.cache.getJSON('quests');
    model.relics.forEach(r => {
        r.have = false;
    });
    model.quests.forEach(q => {
        q.objectives.forEach(o => {
            o.done = false;
        });
    });


    game.load.json('towns', 'json/towns.json');
    game.load.json('conversations', 'json/conversations.json');
    game.load.json('maps', 'json/maps.json');
    game.load.json('relics', 'json/relics.json');
    game.load.json('quests', 'json/quests.json');

    model.towns = game.cache.getJSON('towns');
    model.conversations = game.cache.getJSON('conversations');
    model.maps = game.cache.getJSON('maps');

    model.maps.mt.startX = 2;


    model.currentQuest = 0;
    model.map = model.maps.beginning;
    model.currX = 0;
    model.currY = 0;

    model.mtlock = true;
    model.swlock = true;
    model.gwlock = true;
    model.wflock =  true;

    setStats();
    saveData();

    game.state.start("StateInit");
}
function reloadJsons()
{
    model.relicsreload = game.cache.getJSON('relics').relics;
    model.questsreload = game.cache.getJSON('quests');
    //quests
    for (let i = 0; i < model.quests.length; i++) {
        for (let j = 0; j < model.quests[i].objectives.length; j++) {
            if(model.quests[i].objectives[j].done)
            {
                model.questsreload[i].objectives[j].done = true;
            }
        }
    }
    model.quests = model.questsreload;
    //relics
    for (let i = 0; i < model.relics.length; i++) {
         if(model.relics[i].have)
         {
             model.relicsreload[i].have = true;
         }
    }
    model.relics = model.relicsreload;
}
function setAchis()
{
    var l = true;
    model.relics.forEach(r => {
        if(r.have != true) l = false;
    });
    model.achis = [
        model.currentQuest>0,
        model.currentQuest>1,
        model.currentQuest>3,
        model.relics[10].have == true,
        model.currentQuest>5,
        model.relics[20].have == true,
        l,
        model.level == 19        
    ];
}
function checkAchis()
{
    var l = true;
    model.achis.forEach(achi => {
        if(!achi) l = false;
    });
    return l;
}