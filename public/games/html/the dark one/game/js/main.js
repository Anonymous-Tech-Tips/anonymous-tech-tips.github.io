var game;
var model;
var controller;
var eventDispatcher;
var mediaManager;
var levelManager;
//
//
var useLandscape = false;
window.onload = function() {
 

    isMobile = navigator.userAgent.indexOf("Mobile");
    isMobile = (isMobile != -1) ? true : false;
    if (isMobile == false) {
        if (useLandscape == true) {
            game = new Phaser.Game(600, 800, Phaser.CANVAS, "ph_game");
        } else {
            game = new Phaser.Game(800, 600, Phaser.CANVAS, "ph_game");
        }
    } else {
        game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, "ph_game");
        if (useLandscape == true) {
            wrongTag = "wrongWayLandscape";
        } else {
            wrongTag = "wrongWayPortrait";
        }
    }
    G = new GameConstants();
    eventDispatcher = new Phaser.Signal();
    model = new Model();
    controller = new Controller();
    battlecontroller = new BattleController();
    mediaManager = new MediaManager();
    model.devMode = true;
   
    //
    //
    //
    game.state.add("StateInit", StateInit);
    game.state.add("StateLoad", StateLoad);
    game.state.add("StateMain", StateMain);
    game.state.add("StateTown", StateTown);
    game.state.add("StateOver", StateOver);
    game.state.add("StateDie", StateDie);
    game.state.add("StateSkills", upgrades);
    game.state.add("StateMap", mapState);
    game.state.add("ShopState", ShopState);
    game.state.add("CharacterState", CharacterState);
    game.state.add("QuestState", QuestState);
    game.state.add("ArenaState", ArenaState);
    game.state.add("stateEndGame", stateEndGame);
    game.state.add("StateTitle",StateTitle);
    game.state.add("StateStory",StateStory);
    game.state.add("StateJournal",StateJournal);
    game.state.add("CreditState",creditState);
    game.state.add("CreditState2",creditState2);
    game.state.add("intro",intro);

    game.state.start("StateInit");
  
}