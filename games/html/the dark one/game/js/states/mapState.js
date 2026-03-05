
var maptitletext;
var mapbutton1, mapbutton2, mapbutton3, mapbutton4, mapbuttonback, mapbuttontravel;
var mapimage;
var mapdest;
var txt1;
var txt2;
var txt3;
var mapState = {
    preload: function() {},
    create: function() {
        model.state="mapState";
        var bg = new Background("menubg");
        soundButtons = new SoundButtons();

        model.mtlock = model.currentQuest!=1&&model.currentQuest<5;
        model.swlock = model.currentQuest < 2;
        model.gwlock = model.currentQuest < 2;
        model.wflock = model.level < 5;

        var graphics = game.add.graphics(100, 100);
        graphics.beginFill(0xFF3300);
        graphics.lineStyle(4, 0x000000, 1);
        graphics.moveTo(200,-100);
        graphics.lineTo(200,600);

        if(model.currentQuest == 5)
        {
            model.maps.mt.startX = 0;
        }

        mapbutton1 = new TextButton("Sunwell City", 1, 15,G.CHANGEDESTINATION,"sw");
        mapbutton1.x = 150;
        mapbutton1.y = 230;

        mapbutton2 = new TextButton("Monsoon Town", 1, 15,G.CHANGEDESTINATION,"mt");
        mapbutton2.x = 150;
        mapbutton2.y = 150;     

        mapbutton3 = new TextButton("Graywoods", 1, 15,G.CHANGEDESTINATION,"gw");
        mapbutton3.x = 150;
        mapbutton3.y = 310;

        mapbutton4 = new TextButton("Wintry Fields", 1, 15,G.CHANGEDESTINATION,"wf");
        mapbutton4.x = 150;
        mapbutton4.y = 380;

        mapbuttonback = new TextButton("Back", 1, 6,G.BACKTOTOWN);
        mapbuttonback.x = 150;
        mapbuttonback.y = 530;

        maptitletext = game.add.text(550, 80, "Monsoon Town", { font: "bold 25px 'Press Start 2P'", fill: "#000"});
        maptitletext.anchor.set(0.5,0.5);
        mapbutton2.buttonBack.tint = 0x00ff00;

        mapbuttontravel = new TextButton("Travel", 1, 4,G.TRAVEL);
        mapbuttontravel.x = 550;
        mapbuttontravel.y = 530;

        mapimage = game.add.sprite(550 ,250,"mapimage2");
        mapimage.scale.set(0.4,0.4);
        mapimage.anchor.set(0.5,0.5);

        txt1 =game.add.text(mapimage.x, mapimage.y, "", { font: "bold 14px 'Press Start 2P'", fill: "#fff",align:'right'});
        txt1.anchor.set(0.5,0.5);
        txt2 =game.add.text(mapimage.x, mapimage.y+170, "", { font: "bold 14px 'Press Start 2P'", fill: "#000",align:'center'});
        txt2.anchor.set(0.5,0.5);
        txt2.wordWrap = true;
        txt2.wordWrapWidth = mapimage.width * 1.5;
        txt3 =game.add.text(mapimage.x, mapimage.y+170, "", { font: "bold 14px 'Press Start 2P'", fill: "#900",align:'center'});
        txt3.anchor.set(0.5,0.5);
        txt3.wordWrap = true;
        txt3.wordWrapWidth = mapimage.width * 1.5;

        if(model.map.name == "mt" || model.map.name == "sw" || model.map.name == "gw" || model.map.name == "wf")
        eventDispatcher.dispatch(G.CHANGEDESTINATION,model.map.name);
        else if(model.map.name=="wa")
        eventDispatcher.dispatch(G.CHANGEDESTINATION,"mt");
        else 
        eventDispatcher.dispatch(G.CHANGEDESTINATION,"sw");

    },
    update: function() {   
    }
}
