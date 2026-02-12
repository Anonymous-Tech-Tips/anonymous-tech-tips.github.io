var StateJournal = {
    create: function() {
        model.state="journal";

        this.pages = ["kepkocka1","kepkocka2","kepkocka3","kepkocka4","kepkocka5","achi1","achi2","achi3","achi4","achi5","achi6","achi7","achi8","achi9"];
        this.isLocked = true; //lockolt oldalon vagyunk e

        setAchis();
        

        var bg = new Background("menubg");

       this.currentPage = 1;
       this.pagespr = game.add.sprite(0,0,"kepkocka1");
       this.lockedText = game.add.text(400,300, "Locked", { font: "18px 'Press Start 2P'", fill: "#000",align:'left'});
       this.lockedText.anchor.set(0.5,0.5);
       this.lockedText.alpha = 0;


       this.pageText = game.add.text(400,520, "Page: 1/13", { font: "12px 'Press Start 2P'", fill: "#000",align:'left'});
       this.pageText.anchor.set(0.5,0.5);

       /*this.pageNext = game.add.text(500,495, "▶", { font: "18px 'Press Start 2P'", fill: "#000",align:'left'});
       this.pageNext.anchor.set(0.5,0.5);

       this.pagePrev = game.add.text(300,495, "◀", { font: "18px 'Press Start 2P'", fill: "#000",align:'left'});
       this.pagePrev.anchor.set(0.5,0.5);*/

       this.nextText  = game.add.text(400,535, "Use A and D keys to turn pages!", { font: "12px 'Press Start 2P'", fill: "#000",align:'left'});
       this.nextText.anchor.set(0.5,0.5);

      
       
       this.buttonback = new TextButton("Back", 1, 6,G.BACKTOTOWN);
       this.buttonback.y = 570;

       this.keyE = game.input.keyboard.addKey(Phaser.Keyboard.E);
       this.keyE.onDown.add(function(){
            this.setpage(this.currentPage+1);
        },this);
       this.keyD = game.input.keyboard.addKey(Phaser.Keyboard.D);
       this.keyD.onDown.add(function(){
            this.setpage(this.currentPage+1);
        },this);

       this.keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
       this.keyA.onDown.add(function(){
            this.setpage(this.currentPage-1);
        },this);
   

    },
    update:function()
    {
        
    },
    setpage:function(num)
    {
        if(num<14&&num>0)
        {
            console.log(num);
            this.currentPage = num;
            this.pageText.text = "Page: "+this.currentPage+"/13";
            eventDispatcher.dispatch(G.PLAY_SOUND,"flip");          
            switch(num)
            {
                case 1:
                    this.pagespr.loadTexture(this.pages[this.currentPage-1]);
                    this.pagespr.alpha = 1;
                    this.lockedText.alpha = 0;
                    break;
                case 2:
                    this.pagespr.loadTexture(this.pages[this.currentPage-1]);
                    this.pagespr.alpha = 1;
                    this.lockedText.alpha = 0;
                    break;
                case 3:
                    this.pagespr.loadTexture(this.pages[this.currentPage-1]);
                    this.pagespr.alpha = 1;
                    this.lockedText.alpha = 0;
                    break;
                case 4:
                    this.pagespr.loadTexture(this.pages[this.currentPage-1]);
                    this.pagespr.alpha = 1;
                    this.lockedText.alpha = 0;
                    break;
                case 5:
                    this.pagespr.loadTexture(this.pages[this.currentPage-1]);
                    this.pagespr.alpha = 1;
                    this.lockedText.alpha = 0;
                    break;
                case 6:
                    if(model.achis[0])
                    {
                        this.pagespr.loadTexture(this.pages[this.currentPage-1]);
                        this.pagespr.alpha = 1;
                        this.lockedText.alpha = 0;
                    }
                    else
                    {
                        this.pagespr.alpha = 0;
                        this.lockedText.alpha = 1;
                        this.lockedText.text = "Complete The Trial of Fire to unlock!";
                    }
                    break;
                case 7: 
                    if(model.achis[1])
                    {
                        this.pagespr.loadTexture(this.pages[this.currentPage-1]);
                        this.pagespr.alpha = 1;
                        this.lockedText.alpha = 0;
                    }
                    else
                    {
                        this.pagespr.alpha = 0;
                        this.lockedText.alpha = 1;
                        this.lockedText.text = "Complete Monsoon Town to unlock!";
                    }
                    break;
                case 8:
                    if(model.achis[2])
                    {
                        this.pagespr.loadTexture(this.pages[this.currentPage-1]);
                        this.pagespr.alpha = 1;
                        this.lockedText.alpha = 0;
                    }
                    else
                    {
                        this.pagespr.alpha = 0;
                        this.lockedText.alpha = 1;
                        this.lockedText.text = "Complete the Trial of Darkness to unlock!";
                    }
                    break;
                case 9: 
                    if(model.achis[3])
                    {
                        this.pagespr.loadTexture(this.pages[this.currentPage-1]);
                        this.pagespr.alpha = 1;
                        this.lockedText.alpha = 0;
                    }
                    else
                    {
                        this.pagespr.alpha = 0;
                        this.lockedText.alpha = 1;
                        this.lockedText.text = "Find and defeat the pirates to unlock!";
                    }
                    break;
                case 10:
                    if(model.achis[4])
                    {
                        this.pagespr.loadTexture(this.pages[this.currentPage-1]);
                        this.pagespr.alpha = 1;
                        this.lockedText.alpha = 0;
                    }
                    else
                    {
                        this.pagespr.alpha = 0;
                        this.lockedText.alpha = 1;
                        this.lockedText.text = "Complete the story to unlock!";
                    }
                    break;
                case 11:
                    if(model.achis[5])
                    {
                        this.pagespr.loadTexture(this.pages[this.currentPage-1]);
                        this.pagespr.alpha = 1;
                        this.lockedText.alpha = 0;
                    }
                    else
                    {
                        this.pagespr.alpha = 0;
                        this.lockedText.alpha = 1;
                        this.lockedText.text = "Complete the gold cup to unlock!";
                    }
                    break;
                case 12:
                    if(model.achis[6])
                    {
                        this.pagespr.loadTexture(this.pages[this.currentPage-1]);
                        this.pagespr.alpha = 1;
                        this.lockedText.alpha = 0;
                    }
                    else
                    {
                        this.pagespr.alpha = 0;
                        this.lockedText.alpha = 1;
                        this.lockedText.text = "Collect every relic to unlock!";
                    }
                    break;
                case 13:
                    if(model.achis[7])
                    {
                        this.pagespr.loadTexture(this.pages[this.currentPage-1]);
                        this.pagespr.alpha = 1;
                        this.lockedText.alpha = 0;
                    }
                    else
                    {
                        this.pagespr.alpha = 0;
                        this.lockedText.alpha = 1;
                        this.lockedText.text = "Reach level 20 to unlock!";
                    }
                    break;           


            }
                
        }
        else 
        {
            eventDispatcher.dispatch(G.PLAY_SOUND,"buttonlocked");
        }
    }
}
