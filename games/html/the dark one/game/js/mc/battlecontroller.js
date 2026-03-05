class BattleController {
    constructor() {
        eventDispatcher.add(this.gotEvent, this);
    }
    gotEvent(call, params) {
        //console.log("call=" + call);
        switch (call) {
            case G.BASIC:
            eventDispatcher.dispatch(G.PLAY_SOUND,"berserk");
                model.player.tint = 0xff00ff;
                model.staff.tint = 0xff00ff;
                game.time.events.add(70, function(){
                    model.player.tint = 0xffffff;
                    model.staff.tint = 0xffffff;
                    var basic = game.add.sprite(model.player.x,model.player.y,"basic");
                    basic.anchor.set(0.5,0.5);
                    basic.scale.set(2,2);
                    basic.angle = -90;
                    basic.animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72,75,78]);
                    basic.animations.play('burn',40,true);
                    basic.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                    var twbasic = game.add.tween(basic).to({x:model.enemy.x},500,Phaser.Easing.Linear.None,true);
                 
                    twbasic.onComplete.add(function(){
                        new Ripple(model.enemy.x,model.enemy.y,50,150,0xffffff);
                        if(!model.eshieldup)
                        {
                            model.enemy.tint = 0xffaa00;
                            eventDispatcher.dispatch(G.ENEMYHURT,model.dmg);
                            game.time.events.add(100, function(){model.enemy.tint = 0xffffff;},this);
                        }
                        else
                        {
                            eventDispatcher.dispatch(G.PLAY_SOUND,"hit3");
                        }
                            basic.destroy();
                            model.casting = false;
                            eventDispatcher.dispatch(G.PLAY_SOUND,"hit2");
                    },this);

                });
                break;
            case G.FIREBALL:
                var tw = game.add.tween(model.player).to({x:'-20'},80,Phaser.Easing.Linear.None,true);
                tw.yoyo(true,10);
                var tw2 = game.add.tween(model.staff).to({x:'-20'},80,Phaser.Easing.Linear.None,true);
                tw2.yoyo(true,10);
                model.player.tint = 0xff0000;
                model.staff.tint = 0xff0000;
                game.time.events.add(70, function(){
                    model.player.tint = 0xffffff;
                    model.staff.tint = 0xffffff;
                    var fireball = game.add.sprite(model.player.x,model.player.y,"fireball2");
                    fireball.anchor.set(0.5,0.5);
                    fireball.scale.set(2,2);
                    fireball.angle = -90;
                    fireball.animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60]);
                    fireball.animations.play('burn',40,true);
                    fireball.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                    var twfireball = game.add.tween(fireball).to({x:model.enemy.x},500,Phaser.Easing.Linear.None,true);
                 
                    twfireball.onComplete.add(function(){
                        if(!model.eshieldup)
                        {
                            new Ripple(model.enemy.x,model.enemy.y,50,150,0xffaa00);
                            model.enemy.tint = 0xffaa00;
                            var mul = 0.5*model.fire;
                            eventDispatcher.dispatch(G.ENEMYHURT,Math.ceil(model.dmg*(1+mul)));
                            game.time.events.add(100, function(){model.enemy.tint = 0xffffff;},this);
                            eventDispatcher.dispatch(G.PLAY_SOUND,"critsound");
                        }
                        else
                        {
                            eventDispatcher.dispatch(G.PLAY_SOUND,"hit3");
                        }
                        fireball.destroy();
                        model.casting = false;
                    },this);

                });
                break;
            case G.CINEMATICFIREBALL:
                eventDispatcher.dispatch(G.PLAY_SOUND,"berserk");
                var tw = game.add.tween(model.player).to({x:'-20'},80,Phaser.Easing.Linear.None,true);
                tw.yoyo(true,10);
                var tw2 = game.add.tween(model.staff).to({x:'-20'},80,Phaser.Easing.Linear.None,true);
                tw2.yoyo(true,10);
                model.player.tint = 0xff0000;
                model.staff.tint = 0xff0000;
                game.time.events.add(70, function(){
                    model.player.tint = 0xffffff;
                    model.staff.tint = 0xffffff;
                    var fireball = game.add.sprite(model.player.x,model.player.y,"fireball2");
                    fireball.anchor.set(0.5,0.5);
                    fireball.scale.set(2,2);
                    fireball.angle = -90;
                    fireball.animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60]);
                    fireball.animations.play('burn',40,true);
                    fireball.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                    var twfireball = game.add.tween(fireball).to({x:model.enemy.x},650 ,Phaser.Easing.Linear.None,true);
                 
                    twfireball.onComplete.add(function(){
                        new Ripple(model.enemy.x,model.enemy.y,50,150,0xffaa00);
                        model.enemy.tint = 0xffaa00;
                        game.time.events.add(100, function(){model.enemy.tint = 0xffffff;},this);
                        fireball.destroy();
                        eventDispatcher.dispatch(G.PLAY_SOUND,"critsound");
                    },this);

                });
                break;
            case G.RAGESCENE:
                eventDispatcher.dispatch(G.PLAY_SOUND,"berserk");
                var tw = game.add.tween(model.player).to({x:'-20'},80,Phaser.Easing.Linear.None,true);
                tw.yoyo(true,10);
                var tw2 = game.add.tween(model.staff).to({x:'-20'},80,Phaser.Easing.Linear.None,true);
                tw2.yoyo(true,10);
                model.player.tint = 0xff0000;
                model.staff.tint = 0xff0000;
                //
                game.time.events.add(70, function(){
                    model.player.tint = 0xffffff;
                    model.staff.tint = 0xffffff;
                    var fireball = game.add.sprite(model.player.x,model.player.y,"fireball2");
                    fireball.anchor.set(0.5,0.5);
                    fireball.scale.set(2,2);
                    fireball.angle = -90;
                    fireball.animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60]);
                    fireball.animations.play('burn',40,true);
                    fireball.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                    var twfireball = game.add.tween(fireball).to({x:650},500 ,Phaser.Easing.Linear.None,true);
                    twfireball.onComplete.add(function(){
                        new Ripple(650,393,50,150,0xffaa00);
                        fireball.destroy();
                        eventDispatcher.dispatch(G.PLAY_SOUND,"critsound");
                        game.camera.shake();
                        eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
                    },this);
                });
                //
                game.time.events.add(500,function(){
                    eventDispatcher.dispatch(G.PLAY_SOUND,"berserk");
                    var tw = game.add.tween(model.player).to({x:'-20'},80,Phaser.Easing.Linear.None,true);
                    tw.yoyo(true,10);
                    var tw2 = game.add.tween(model.staff).to({x:'-20'},80,Phaser.Easing.Linear.None,true);
                    tw2.yoyo(true,10);
                    model.player.tint = 0xff0000;
                    model.staff.tint = 0xff0000;
                    game.time.events.add(70, function(){
                        model.player.tint = 0xffffff;
                        model.staff.tint = 0xffffff;
                        var fireball = game.add.sprite(model.player.x,model.player.y,"fireball2");
                        fireball.anchor.set(0.5,0.5);
                        fireball.scale.set(2,2);
                        fireball.angle = +215;
                        fireball.animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60]);
                        fireball.animations.play('burn',40,true);
                        fireball.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                        var twfireball = game.add.tween(fireball).to({x:500,y:200},500 ,Phaser.Easing.Linear.None,true);
                        twfireball.onComplete.add(function(){
                            new Ripple(500,200,50,150,0xffaa00);
                            fireball.destroy();
                            eventDispatcher.dispatch(G.PLAY_SOUND,"critsound");
                            game.camera.shake();
                            eventDispatcher.dispatch(G.PLAY_SOUND,"explode2");
                        },this);
                    });
                });
                //
                game.time.events.add(1000,function(){
                    var ulti1 = game.add.sprite(600,200-90,"ulti1");
                    ulti1.anchor.set(0.5,0.5);
                    ulti1.scale.set(4,4);
                    ulti1.animations.add('burn',[36,34,32,30,28,27,25,23,22,20,18,16,14,12,10,8,6,4,2,0]);
                    ulti1.animations.play('burn',15);
                    ulti1.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
            
                    var ulti2 = game.add.sprite(600-95,200,"ulti1");
                    ulti2.anchor.set(0.5,0.5);
                    ulti2.scale.set(4,4);
                    ulti2.angle-=90;
                    ulti2.animations.add('burn',[36,34,32,30,28,27,25,23,22,20,18,16,14,12,10,8,6,4,2,0]);
                    ulti2.animations.play('burn',15);
                    ulti2.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
            
                    
                    var ulti3 = game.add.sprite(600,200+90,"ulti1");
                    ulti3.anchor.set(0.5,0.5);
                    ulti3.scale.set(4,4);
                    ulti3.angle-=180;
                    ulti3.animations.add('burn',[36,34,32,30,28,27,25,23,22,20,18,16,14,12,10,8,6,4,2,0]);
                    ulti3.animations.play('burn',15);
                    ulti3.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
            
                    var ulti4 = game.add.sprite(600+95,200,"ulti1");
                    ulti4.anchor.set(0.5,0.5);
                    ulti4.scale.set(4,4);
                    ulti4.angle+=90;
                    ulti4.animations.add('burn',[36,34,32,30,28,27,25,23,22,20,18,16,14,12,10,8,6,4,2,0]);
                    ulti4.animations.play('burn',15);
                    ulti4.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
            
                    game.time.events.add(1000, function(){
                        game.camera.flash(0xffffff, 500);
                        game.camera.shake(0.05, 500);
            
                        var exp = game.add.sprite(500,200,"ulti1explosion");
                        exp.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                        exp.anchor.set(0.5,0.5);
                        exp.scale.set(4,4);
                        exp.angle-=45;
                        exp.animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66]);
                        exp.animations.play('burn',20);
                        eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
                        game.camera.shake
                    });
                });
                //
                game.time.events.add(2000,function(){
                    var ulti1 = game.add.sprite(150,300-90,"ulti1");
                    ulti1.anchor.set(0.5,0.5);
                    ulti1.scale.set(4,4);
                    ulti1.animations.add('burn',[36,34,32,30,28,27,25,23,22,20,18,16,14,12,10,8,6,4,2,0]);
                    ulti1.animations.play('burn',15);
                    ulti1.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
            
                    var ulti2 = game.add.sprite(150-95,300,"ulti1");
                    ulti2.anchor.set(0.5,0.5);
                    ulti2.scale.set(4,4);
                    ulti2.angle-=90;
                    ulti2.animations.add('burn',[36,34,32,30,28,27,25,23,22,20,18,16,14,12,10,8,6,4,2,0]);
                    ulti2.animations.play('burn',15);
                    ulti2.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
            
                    
                    var ulti3 = game.add.sprite(150,300+90,"ulti1");
                    ulti3.anchor.set(0.5,0.5);
                    ulti3.scale.set(4,4);
                    ulti3.angle-=180;
                    ulti3.animations.add('burn',[36,34,32,30,28,27,25,23,22,20,18,16,14,12,10,8,6,4,2,0]);
                    ulti3.animations.play('burn',15);
                    ulti3.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
            
                    var ulti4 = game.add.sprite(150+95,300,"ulti1");
                    ulti4.anchor.set(0.5,0.5);
                    ulti4.scale.set(4,4);
                    ulti4.angle+=90;
                    ulti4.animations.add('burn',[36,34,32,30,28,27,25,23,22,20,18,16,14,12,10,8,6,4,2,0]);
                    ulti4.animations.play('burn',15);
                    ulti4.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
            
                    game.time.events.add(1000, function(){
                        game.camera.flash(0xffffff, 500);
                        game.camera.shake(0.05, 500);
            
                        var exp = game.add.sprite(500,200,"ulti1explosion");
                        exp.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                        exp.anchor.set(0.5,0.5);
                        exp.scale.set(4,4);
                        exp.angle-=45;
                        exp.animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66]);
                        exp.animations.play('burn',20);
                        eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
                        game.camera.shake
                    });
                });
                //
                //elsötétülés
                game.time.events.add(1500,function(){
                    game.camera.fade(0x000000, 2500);
               
                    
                    game.time.events.add(2500,function(){
                        mediaManager.backgroundMusic.stop();
             
                                eventDispatcher.dispatch(G.SETENEMY,{
                                    x:580,
                                    y:390,
                                    sprite:"shadowform",
                                    hp:150000,
                                    str:3,
                                    speed:1,
                                    escaleX:-2.7,
                                    escaleY:2.7,
                                    reward:12,
                                    xpreward:10,
                                    attacks:[],
                                    name:"???"
                                });
                                model.map = model.maps.todboss4;
                                model.currX = model.map.startX;
                                model.currY = model.map.startY;
                                mediaManager.setBackgroundMusic(model.map.bgmusic);
                                game.state.start("StateMain");                 
                    },this);
                    eventDispatcher.dispatch(G.PLAY_SOUND,"berserk");
                    var tw = game.add.tween(model.player).to({x:'-20'},80,Phaser.Easing.Linear.None,true);
                    tw.yoyo(true,10);
                    var tw2 = game.add.tween(model.staff).to({x:'-20'},80,Phaser.Easing.Linear.None,true);
                    tw2.yoyo(true,10);
                    model.player.tint = 0xff0000;
                    model.staff.tint = 0xff0000;
                    game.time.events.add(70, function(){
                        model.player.tint = 0xffffff;
                        model.staff.tint = 0xffffff;
                        var fireball = game.add.sprite(model.player.x,model.player.y,"fireball2");
                        fireball.anchor.set(0.5,0.5);
                        fireball.scale.set(2,2);
                        fireball.angle = +260;
                        fireball.animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60]);
                        fireball.animations.play('burn',40,true);
                        fireball.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                        var twfireball = game.add.tween(fireball).to({x:600,y:350},400 ,Phaser.Easing.Linear.None,true);
                        twfireball.onComplete.add(function(){
                            new Ripple(600,350,50,150,0xffaa00);
                            fireball.destroy();
                            eventDispatcher.dispatch(G.PLAY_SOUND,"critsound");
                            game.camera.shake();
                            eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
                        },this);
                    });
                },this);
                game.time.events.add(2000,function(){
                    eventDispatcher.dispatch(G.PLAY_SOUND,"berserk");
                    var tw = game.add.tween(model.player).to({x:'-20'},80,Phaser.Easing.Linear.None,true);
                    tw.yoyo(true,10);
                    var tw2 = game.add.tween(model.staff).to({x:'-20'},80,Phaser.Easing.Linear.None,true);
                    tw2.yoyo(true,10);
                    model.player.tint = 0xff0000;
                    model.staff.tint = 0xff0000;
                    game.time.events.add(70, function(){
                        model.player.tint = 0xffffff;
                        model.staff.tint = 0xffffff;
                        var fireball = game.add.sprite(model.player.x,model.player.y,"fireball2");
                        fireball.anchor.set(0.5,0.5);
                        fireball.scale.set(2,2);
                        fireball.angle = +215;
                        fireball.animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60]);
                        fireball.animations.play('burn',40,true);
                        fireball.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                        var twfireball = game.add.tween(fireball).to({x:500,y:200},500 ,Phaser.Easing.Linear.None,true);
                        twfireball.onComplete.add(function(){
                            new Ripple(500,200,50,150,0xffaa00);
                            fireball.destroy();
                            eventDispatcher.dispatch(G.PLAY_SOUND,"critsound");
                            game.camera.shake();
                            eventDispatcher.dispatch(G.PLAY_SOUND,"explode2");
                        },this);
                    });
                });
                game.time.events.add(2500,function(){
                    eventDispatcher.dispatch(G.PLAY_SOUND,"berserk");
                    var tw = game.add.tween(model.player).to({x:'-20'},80,Phaser.Easing.Linear.None,true);
                    tw.yoyo(true,10);
                    var tw2 = game.add.tween(model.staff).to({x:'-20'},80,Phaser.Easing.Linear.None,true);
                    tw2.yoyo(true,10);
                    model.player.tint = 0xff0000;
                    model.staff.tint = 0xff0000;
                    game.time.events.add(70, function(){
                        model.player.tint = 0xffffff;
                        model.staff.tint = 0xffffff;
                        var fireball = game.add.sprite(model.player.x,model.player.y,"fireball2");
                        fireball.anchor.set(0.5,0.5);
                        fireball.scale.set(2,2);
                        fireball.angle = +180;
                        fireball.animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60]);
                        fireball.animations.play('burn',40,true);
                        fireball.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                        var twfireball = game.add.tween(fireball).to({x:model.player.x,y:100},450 ,Phaser.Easing.Linear.None,true);
                        twfireball.onComplete.add(function(){
                            new Ripple(model.player.x,100,50,150,0xffaa00);
                            fireball.destroy();
                            eventDispatcher.dispatch(G.PLAY_SOUND,"critsound");
                            game.camera.shake();
                            eventDispatcher.dispatch(G.PLAY_SOUND,"explode2");
                        },this);
                    });
                });
                break;
            case G.LANDORSCENE:
                model.pause = true;
                //hit1
                var tw = game.add.tween(npcs[0].sprite).to({x:'+60'},150,Phaser.Easing.Linear.None,true);
                tw.yoyo(true,10);
                game.time.events.add(150, function(){
                    eventDispatcher.dispatch(G.PLAY_SOUND,"hit2");
                });

                //hit2
                game.time.events.add(500, function(){
                    var tw = game.add.tween(npcs[0].sprite).to({x:'+60'},150,Phaser.Easing.Linear.None,true);
                    tw.yoyo(true,10);
                    game.time.events.add(150, function(){
                        eventDispatcher.dispatch(G.PLAY_SOUND,"hit2");
                    });
                });

                //hit3
                game.time.events.add(900, function(){
                    var tw = game.add.tween(npcs[0].sprite).to({x:'+60'},150,Phaser.Easing.Linear.None,true);
                    tw.yoyo(true,10);
                    game.time.events.add(150, function(){
                        eventDispatcher.dispatch(G.PLAY_SOUND,"critsound");
                        var effect = new Ripple(npcs[1].sprite.x,npcs[1].sprite.y,50,100,0xf4eb42);
                        game.camera.flash(0xffffff, 150);
                        game.time.events.add(150, function(){
                        eventDispatcher.dispatch(G.PLAY_SOUND,"enemydie");               
                        var tween = game.add.tween(npcs[1].sprite).to( { alpha: 0 }, 750, Phaser.Easing.Bounce.Out, true);
                        });
                    });
                });

                //jump
                game.time.events.add(1500, function(){
                    eventDispatcher.dispatch(G.PLAY_SOUND,"jump");
                    var tw = game.add.tween(npcs[0].sprite).to( { x: '+250',y:'-200' }, 150, Phaser.Easing.Linear.None, true);
                    tw.onComplete.add(function(){
                        var twdown = game.add.tween(npcs[0].sprite).to( { y:'+80' }, 150/2, Phaser.Easing.Linear.None, true);
                        twdown.onComplete.add(function(){
                            var twre = game.add.tween(npcs[0].sprite).to( { x:'-100' }, 150, Phaser.Easing.Linear.None, true);
                            game.camera.shake(0.02,300);
                            eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
                        });
                    });
                });

                //hit4
                game.time.events.add(1900, function(){
                    var tw = game.add.tween(npcs[0].sprite).to({x:'+60'},150,Phaser.Easing.Linear.None,true);
                    tw.yoyo(true,10);
                    game.time.events.add(150, function(){
                        eventDispatcher.dispatch(G.PLAY_SOUND,"critsound");
                        var effect = new Ripple(npcs[2].sprite.x,npcs[2].sprite.y,50,100,0xf4eb42);
                        game.camera.flash(0xffffff, 150);
                        game.time.events.add(150, function(){
                        eventDispatcher.dispatch(G.PLAY_SOUND,"enemydie");               
                        var tweendie = game.add.tween(npcs[2].sprite).to( { alpha: 0 }, 750, Phaser.Easing.Bounce.Out, true);
                            tweendie.onComplete.add(function(){
                                model.town.conversation = "swbattle1";
                            });
                        });
                    });
                });

                //

                break;
            case G.ENDGAMESCENE:
                model.pause = true;
                model.w1 = game.add.sprite(315,393,"wizard3");
                model.w1.anchor.set(0.5,0.5);
                model.w1.scale.set(2.7,2.7);
                model.w1.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                model.w1.alpha = 0;
                
                model.w2 = game.add.sprite(400,389,"player2");
                model.w2.anchor.set(0.5,0.5);
                model.w2.scale.set(2.7,2.7);
                model.w2.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                model.w2.alpha = 0;

                model.w3 = game.add.sprite(750,393,"wizard4");
                model.w3.anchor.set(0.5,0.5);
                model.w3.scale.set(-2.7,2.7);
                model.w3.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                model.w3.alpha = 0;

                model.w4 = game.add.sprite(690,393,"wizard1");
                model.w4.anchor.set(0.5,0.5);
                model.w4.scale.set(-2.7,2.7);
                model.w4.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                model.w4.alpha = 0;
                game.time.events.add(500,function(){
                    var tw1 = game.add.tween(model.w2).to( { alpha: 1 }, 600, "Linear", true);
                    new Ripple(model.w2.x,model.w2.y,50,200,0xffffff);
                    eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
                });
                game.time.events.add(750,function(){
                    var tw1 = game.add.tween(model.w3).to( { alpha: 1 }, 600, "Linear", true);
                    new Ripple(model.w3.x,model.w3.y,50,200,0xffffff);
                    eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
                });
                game.time.events.add(1250,function(){
                    var tw1 = game.add.tween(model.w4).to( { alpha: 1 }, 600, "Linear", true);
                    new Ripple(model.w4.x,model.w4.y,50,200,0xffffff);
                    eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
                });
                game.time.events.add(1750,function(){
                    var tw1 = game.add.tween(model.w1).to( { alpha: 1 }, 600, "Linear", true);
                    new Ripple(model.w1.x,model.w1.y,50,200,0xffffff);
                    eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
                });
                game.time.events.add(2500,function(){
                    model.town.conversation = "tdoconv2";
                });



                break;
            case G.FROSTBOLT:
                   
                    var tw = game.add.tween(model.player).to({x:'-20'},80,Phaser.Easing.Linear.None,true);
                    tw.yoyo(true,10);
                    var tw2 = game.add.tween(model.staff).to({x:'-20'},80,Phaser.Easing.Linear.None,true);
                    tw2.yoyo(true,10);
                    model.player.tint = 0x5555aa;
                    model.staff.tint = 0x5555aa;
                    game.time.events.add(70, function(){
                        model.player.tint = 0xffffff;
                        model.staff.tint = 0xffffff;
                        var frostbolt = game.add.sprite(model.enemy.x,model.enemy.y,"frost1");
                        frostbolt.anchor.set(0.5,0.5);
                        frostbolt.scale.set(0.2,0.2);
                        frostbolt.angle = -90;
                        frostbolt.animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72,75,78,81,84]);
                        frostbolt.animations.play('burn',40,true);
                        frostbolt.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                        var twfrostbolt = game.add.tween(frostbolt.scale).to({x:2,y:2},500,Phaser.Easing.Linear.None,true);
                     
                        twfrostbolt.onComplete.add(function(){
                            if(!model.eshieldup&&model.ename!="Murgurath"&&model.enemy.key !="frostzombi"&&model.ename!="Arctic")
                            {
                                new Ripple(model.enemy.x,model.enemy.y,50,150,0x5555ff);
                                model.enemy.tint = 0x5555ff;
                                eventDispatcher.dispatch(G.ENEMYHURT,model.dmg);
                                model.enemy.frozen = true;
                                game.time.events.add(100, function(){model.enemy.tint = 0xffffff;},this);
                                    game.time.events.add(model.frost*1000, function(){
                                    model.enemy.frozen = false;
                                    model.enemy.tint = 0xffffff;
                                },this);
                                eventDispatcher.dispatch(G.PLAY_SOUND,"freeze1");
                                eventDispatcher.dispatch(G.ENEMYCASTBREAK);
                            }
                            else
                            {
                                eventDispatcher.dispatch(G.PLAY_SOUND,"hit3");
                            }
                            frostbolt.destroy();
                            model.casting = false;
                           
                        },this);
    
                    });
                    break;
            case G.EFROSTBOLT:
                   model.ecounter = 0;
                   model.emod=0;
                   eventDispatcher.dispatch(G.PLAY_SOUND,"freeze2");
                    var tw = game.add.tween(model.enemy).to({x:'+20'},80,Phaser.Easing.Linear.None,true);
                    tw.yoyo(true,10);
                    model.enemy.tint = 0x5555aa;
                    game.time.events.add(70, function(){
                        model.enemy.tint = 0xffffff;
                        var frostbolt = game.add.sprite(model.player.x,model.player.y,"frost1");
                        frostbolt.anchor.set(0.5,0.5);
                        frostbolt.scale.set(0.2,0.2);
                        frostbolt.angle = -90;
                        frostbolt.animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72,75,78,81,84]);
                        frostbolt.animations.play('burn',40,true);
                        frostbolt.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                        var twfrostbolt = game.add.tween(frostbolt.scale).to({x:2,y:2},500,Phaser.Easing.Linear.None,true);
                     
                        twfrostbolt.onComplete.add(function(){
                            if(model.shieldup == 0)
                            {
                                new Ripple(model.player.x,model.player.y,50,150,0x5555ff);
                                model.player.tint = 0x5555ff;
                               model.freeze = true;
                               eventDispatcher.dispatch(G.PLAYERCASTBREAK);
                                game.time.events.add(100, function(){model.player.tint = 0xffffff;},this);
                                    game.time.events.add(2500, function(){
                                   model.freeze = false;
                                    model.player.tint = 0xffffff;
                                },this);
                                eventDispatcher.dispatch(G.PLAY_SOUND,"freeze1");
                            }
                            else
                            {
                                eventDispatcher.dispatch(G.PLAY_SOUND,"hit3");
                            }
                            eventDispatcher.dispatch(G.PLAYERHURT,model.estr*2);
                            frostbolt.destroy();                           
                        },this);
    
                    });
                    break;
            case G.EFROSTBOLT2:
                   model.ecounter = 0;
                   model.emod++;
                   eventDispatcher.dispatch(G.PLAY_SOUND,"freeze2");
                    var tw = game.add.tween(model.enemy).to({x:'+20'},80,Phaser.Easing.Linear.None,true);
                    tw.yoyo(true,10);
                    model.enemy.tint = 0x5555aa;
                    game.time.events.add(70, function(){
                        model.enemy.tint = 0xffffff;
                        var frostbolt = game.add.sprite(model.player.x,model.player.y,"frost1");
                        frostbolt.anchor.set(0.5,0.5);
                        frostbolt.scale.set(0.2,0.2);
                        frostbolt.angle = -90;
                        frostbolt.animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72,75,78,81,84]);
                        frostbolt.animations.play('burn',40,true);
                        frostbolt.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                        var twfrostbolt = game.add.tween(frostbolt.scale).to({x:2,y:2},500,Phaser.Easing.Linear.None,true);
                     
                        twfrostbolt.onComplete.add(function(){
                            if(model.shieldup == 0)
                            {
                                new Ripple(model.player.x,model.player.y,50,150,0x5555ff);
                                model.player.tint = 0x5555ff;
                               model.freeze = true;
                               eventDispatcher.dispatch(G.PLAYERCASTBREAK);
                                game.time.events.add(100, function(){model.player.tint = 0xffffff;},this);
                                    game.time.events.add(2500, function(){
                                   model.freeze = false;
                                    model.player.tint = 0xffffff;
                                },this);
                                eventDispatcher.dispatch(G.PLAY_SOUND,"freeze1");
                            }
                            else
                            {
                                eventDispatcher.dispatch(G.PLAY_SOUND,"hit3");
                            }
                            eventDispatcher.dispatch(G.PLAYERHURT,model.estr*2);
                            frostbolt.destroy();                           
                        },this);
    
                    });
                    break;
            case G.NECROFROST:
                   model.ecounter = 0;
                   model.emod++;
                   eventDispatcher.dispatch(G.PLAY_SOUND,"freeze2");
                    var tw = game.add.tween(model.enemy).to({x:'+20'},80,Phaser.Easing.Linear.None,true);
                    tw.yoyo(true,10);
                    model.enemy.tint = 0x5555aa;
                    game.time.events.add(70, function(){
                        model.enemy.tint = 0xffffff;
                        var frostbolt = game.add.sprite(model.player.x,model.player.y,"frost1");
                        frostbolt.anchor.set(0.5,0.5);
                        frostbolt.scale.set(0.2,0.2);
                        frostbolt.angle = -90;
                        frostbolt.tint = 0x660066;
                        frostbolt.animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72,75,78,81,84]);
                        frostbolt.animations.play('burn',40,true);
                        frostbolt.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                        var twfrostbolt = game.add.tween(frostbolt.scale).to({x:2,y:2},500,Phaser.Easing.Linear.None,true);
                     
                        twfrostbolt.onComplete.add(function(){

                                new Ripple(model.player.x,model.player.y,50,150,0x5555ff);
                                model.player.tint = 0x5555ff;
                               model.freeze = true;
                               eventDispatcher.dispatch(G.PLAYERCASTBREAK);
                               model.enemy.frozen = false;
                                game.time.events.add(100, function(){model.player.tint = 0xffffff;},this);
                                    game.time.events.add(3000, function(){
                                   model.freeze = false;
                                    model.player.tint = 0xffffff;
                                },this);
                                eventDispatcher.dispatch(G.PLAY_SOUND,"freeze1");
                                
                            frostbolt.destroy();                           
                            model.ecounter = 98;
                        },this);
    
                    });
                    break;
                case G.SHIELD:                   
                    model.shieldspr = game.add.sprite(model.player.x,model.player.y,"shield2");
                    model.shieldspr.anchor.set(0.5,0.5);
                    model.shieldspr.scale.set(3,3);
                    model.shieldspr.animations.add('up',[0,2,4,6,8,10,12,14,16,18,20,22,24,26,28]);
                    model.shieldspr.animations.play('up',40);
                    model.shieldspr.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                    game.time.events.add(400, function(){
                        model.casting = false;
                        model.shieldup = model.shield;
                        model.shieldspr.animations.add('burn',[24,25,26,27]);
                        model.shieldspr.animations.play('burn',20,true);
                    },this);
                    break;
                case G.ULTI1:
                    model.ultipause = true;
                    var ulti1 = game.add.sprite(500,model.enemy.y-90,"ulti1");
                    ulti1.anchor.set(0.5,0.5);
                    ulti1.scale.set(4,4);
                    ulti1.animations.add('burn',[36,34,32,30,28,27,25,23,22,20,18,16,14,12,10,8,6,4,2,0]);
                    ulti1.animations.play('burn',15);
                    ulti1.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
            
                    var ulti2 = game.add.sprite(500-95,model.enemy.y,"ulti1");
                    ulti2.anchor.set(0.5,0.5);
                    ulti2.scale.set(4,4);
                    ulti2.angle-=90;
                    ulti2.animations.add('burn',[36,34,32,30,28,27,25,23,22,20,18,16,14,12,10,8,6,4,2,0]);
                    ulti2.animations.play('burn',15);
                    ulti2.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
            
                    
                    var ulti3 = game.add.sprite(500,model.enemy.y+90,"ulti1");
                    ulti3.anchor.set(0.5,0.5);
                    ulti3.scale.set(4,4);
                    ulti3.angle-=180;
                    ulti3.animations.add('burn',[36,34,32,30,28,27,25,23,22,20,18,16,14,12,10,8,6,4,2,0]);
                    ulti3.animations.play('burn',15);
                    ulti3.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
            
                    var ulti4 = game.add.sprite(500+95,model.enemy.y,"ulti1");
                    ulti4.anchor.set(0.5,0.5);
                    ulti4.scale.set(4,4);
                    ulti4.angle+=90;
                    ulti4.animations.add('burn',[36,34,32,30,28,27,25,23,22,20,18,16,14,12,10,8,6,4,2,0]);
                    ulti4.animations.play('burn',15);
                    ulti4.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
            
                    game.time.events.add(1000, function(){
                        game.camera.flash(0xffffff, 500);
                        game.camera.shake(0.05, 500);
            
                        var exp = game.add.sprite(500,model.enemy.y,"ulti1explosion");
                        exp.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                        exp.anchor.set(0.5,0.5);
                        exp.scale.set(4,4);
                        exp.angle-=45;
                        exp.animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66]);
                        exp.animations.play('burn',20);
                        eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
                        if(!model.eshieldup)
                        {
                            eventDispatcher.dispatch(G.ENEMYHURT,model.dmg*10);
                        }
                        else
                        {
                            eventDispatcher.dispatch(G.PLAY_SOUND,"hit3");
                        }   
                        model.ultipause = false;
                        model.casting = false;
                        
                    },this);
                    break;
                case G.ULTI2:
                        //visual effects
                        emitter = game.add.emitter(model.player.x, model.player.y+model.player.height/2, 400);
                        emitter.makeParticles('black');
                        emitter.setRotation(0, 0);
                        emitter.setScale(0.5, 1);
                        emitter.gravity = -200;
                        emitter.start(false, 800, 20);
                        game.camera.shake(0.05,500);
                        game.camera.flash(0x000000, 500);
                        //gameplay effects
                        model.hp = Math.floor(model.hp/2);
                        model.energy = model.maxenergy;
                        model.playerEnergybarText.text = model.energy+'/'+model.maxenergy;
                        model.playerEnergybar.barSprite.width = 120*(model.energy/model.maxenergy);
                        model.playerHealthbarText.text = model.hp+'/'+model.maxhp;
                        model.playerHealthbar.barSprite.width = 120*(model.hp/model.maxhp);
                        model.shadowform = true;
                        model.basiccd = 0;
                        model.firecd = 0;
                        model.frostcd = 0;
                        model.shieldcd = 0;
                        model.ulticd = 0;
                        basiccdimg.height = 0;
                        firecdimg.height = 0;
                        frostcdimg.height = 0;
                        shieldcdimg.height = 0;
                        ulticdimg.height = 0;


                        eventDispatcher.dispatch(G.PLAY_SOUND,"frenzy");
                        model.player.loadTexture("shadowform");
                        model.cdTime /= 3;
                        model.casting = false;
                    break;
            case G.POTI:
                if(model.poti>0)
                {
                    eventDispatcher.dispatch(G.PLAY_SOUND,"revive");
                    model.poti--;
                    model.poticd = 30;
                    switch(model.potilvl)
                    {
                        case 0:
                            var healing = Math.ceil(model.maxhp*0.2);
                            if(model.hp+healing < model.maxhp) model.hp+=healing;
                            else model.hp = model.maxhp;
                        break;
                        case 1:
                            var healing = Math.ceil(model.maxhp*0.33);
                            var manahealing = Math.ceil(model.maxenergy*0.33);
                            if(model.hp+healing < model.maxhp) model.hp+=healing;
                            else model.hp = model.maxhp;
                            if(model.energy+manahealing < model.maxenergy) model.energy+=manahealing;
                            else model.energy = model.maxenergy;
                        break;
                        case 2:
                            var healing = Math.ceil(model.maxhp/2);
                            var manahealing = Math.ceil(model.maxenergy/2);
                            if(model.hp+healing < model.maxhp) model.hp+=healing;
                            else model.hp = model.maxhp;
                            if(model.energy+manahealing < model.maxenergy) model.energy+=manahealing;
                            else model.energy = model.maxenergy;
                        break;
                        case 3:
                            var healing = Math.ceil(model.maxhp*0.66);
                            var manahealing = Math.ceil(model.maxenergy*0.66);
                            if(model.hp+healing < model.maxhp) model.hp+=healing;
                            else model.hp = model.maxhp;
                            if(model.energy+manahealing < model.maxenergy) model.energy+=manahealing;
                            else model.energy = model.maxenergy;
                        break;
                    }
                    game.tweens.removeFrom(model.playerHealthbar.barSprite);
                    model.playerHealthbarText.text = model.hp+'/'+model.maxhp;
                    model.playerHealthbar.barSprite.width = 120*(model.hp/model.maxhp);
                    model.playerEnergybarText.text = model.energy+'/'+model.maxenergy;
                    model.playerEnergybar.barSprite.width = 120*(model.energy/model.maxenergy);
                    model.btnpotiText.text = model.poti;
                }
                else 
                {
                    eventDispatcher.dispatch(G.PLAY_SOUND,"buttonlocked");
                }
         
                break;
            case G.CAST:
                var enoughmana;
                var enoughlvl=false; 
                if(params.skillname == "fireball"){
                    enoughmana = model.energy >= 2;
                    enoughlvl = model.fire > 0;
                } 
                if(params.skillname == "basic"){
                    enoughmana = true;
                    enoughlvl = true;
                } 
                else if(params.skillname == "frostbolt"){
                    enoughmana = model.energy >= 3;
                    enoughlvl = model.frost>0;
                } 
                else if(params.skillname == "shield"){
                    enoughmana = model.energy >= 4;
                    enoughlvl = model.shield >0;
                } 
                else if(params.skillname == "ulti1"){
                    enoughmana = model.energy >= 5;
                    enoughlvl = model.ulti1>0;
                } 
                else if(params.skillname == "ulti2"){
                    enoughmana = model.hp >= 20;
                    enoughlvl = model.ulti2>0;
                }
                if(!model.casting && enoughmana&&enoughlvl&&!model.stun&&!model.freeze)
                {
                    model.casting = true;
                    if(params.time>=300)
                    {
                        model.playerCastbar.setPosition(model.player.x,model.player.y-60);
                        eventDispatcher.dispatch(G.PLAY_SOUND,"casting");
                        model.playercastingsound = game.time.events.loop(200, function(){
                            var rand = Math.floor(Math.random() * 10) + 5;
                            var ripple = new Ripple(model.staff.x,model.staff.y-model.staff.height/2+5,rand,50,params.color);
                        }, this);
                        var tw = game.add.tween(model.playerCastbar.barSprite).to({width:model.playerCastbar.bgSprite.width},params.time,Phaser.Easing.Linear.None,true);
                    }

                  
                    model.playercasting = game.time.events.add(params.time+50,function(){
                        model.playerCastbar.setPosition(-1000,model.player.y-60);
                        model.playerCastbar.barSprite.width = 0;
                       // casting.animations.stop(null, true);
                       game.time.events.remove(model.playercastingsound);
                        mediaManager.soundArray["casting"].stop();
                       
                        
                        switch(params.skillname)
                        {
                           
                            case "basic":
                                model.globalcd = model.cdTime;
                                model.basiccd = model.cdTime*4;
                                eventDispatcher.dispatch(G.PLAY_SOUND,"berserk");
                                eventDispatcher.dispatch(G.BASIC);
                                break;
                            case "fireball":
                                model.globalcd = model.cdTime;
                                model.firecd = model.cdTime*2;
                                model.energy-=2;
                                model.playerEnergybar.barSprite.width = 120* (model.energy/model.maxenergy);
                                model.playerEnergybarText.text = model.energy+"/"+model.maxenergy;
                                eventDispatcher.dispatch(G.PLAY_SOUND,"berserk");
                                eventDispatcher.dispatch(G.FIREBALL);
                                break;
                            case "frostbolt":
                                model.globalcd = model.cdTime;
                                model.frostcd = model.cdTime*7;
                                model.energy-=3;
                                model.playerEnergybar.barSprite.width = 120* (model.energy/model.maxenergy);
                                model.playerEnergybarText.text = model.energy+"/"+model.maxenergy;
                                eventDispatcher.dispatch(G.PLAY_SOUND,"freeze2");
                                model.playerEnergybarText.text = model.energy+"/"+model.maxenergy;
                                eventDispatcher.dispatch(G.FROSTBOLT);
                                break;
                            case "shield":
                                if(model.shieldup==0)
                                {
                                    model.globalcd = model.cdTime;
                                    model.energy-=4;
                                    model.playerEnergybar.barSprite.width = 120* (model.energy/model.maxenergy);
                                    model.playerEnergybarText.text = model.energy+"/"+model.maxenergy;
                                    eventDispatcher.dispatch(G.PLAY_SOUND,"shieldup");
                                    model.playerEnergybarText.text = model.energy+"/"+model.maxenergy;
                                    eventDispatcher.dispatch(G.SHIELD);
                                }
                                else{
                                    eventDispatcher.dispatch(G.PLAY_SOUND,"buttonlocked");
                                }
                                break;
                            case "ulti1":
                                model.globalcd = model.cdTime;
                                model.ulticd = model.cdTime*20;
                                model.energy-=5;
                                model.playerEnergybar.barSprite.width = 120* (model.energy/model.maxenergy);
                                model.playerEnergybarText.text = model.energy+"/"+model.maxenergy;
                                eventDispatcher.dispatch(G.PLAY_SOUND,"ulti1");
                                model.playerEnergybarText.text = model.energy+"/"+model.maxenergy;
                                eventDispatcher.dispatch(G.ULTI1);
                                break;
                            case "ulti2":
                                if(!model.shadowform)
                                {
                                    model.ulti2cd = model.cdTime*30;
                                    eventDispatcher.dispatch(G.ULTI2);
                                }
                                break;
                        }
                        });
                    
                }
                else
                {
                    eventDispatcher.dispatch(G.PLAY_SOUND,"buttonlocked");
                }
                break;
                //enemybattle stuff
            case G.ENEMYATTACK:
                if(model.ename == "Attila the Hen" && model.ehp<=model.emaxhp/2 &&!model.eberserk)
                {
                    eventDispatcher.dispatch(G.EBERSERK);
                }
                else
                {
                    switch(params){
                        case "basic":
                            eventDispatcher.dispatch(G.ENEMYBASIC);
                            break;
                        case "bloodheadbasic":
                            eventDispatcher.dispatch(G.BLOODHEADBASIC);
                            break;
                        case "twobasic":
                            eventDispatcher.dispatch(G.TWOBASIC);
                            break;
                        case "tribasic":
                            eventDispatcher.dispatch(G.TRIBASIC);
                            break;
                        case "fourbasic":
                            eventDispatcher.dispatch(G.FOURBASIC);
                            break;
                        case "berserk":
                            eventDispatcher.dispatch(G.EBERSERK);
                            break;
                        case "estun":
                            eventDispatcher.dispatch(G.ESTUN);
                            break;
                        case "estun2":
                            eventDispatcher.dispatch(G.ESTUN2);
                            break;
                        case "estun4":
                            eventDispatcher.dispatch(G.ESTUN4);
                            break;
                        case "estun3":
                            eventDispatcher.dispatch(G.ESTUN3);
                            break;
                        case "fireball":
                            eventDispatcher.dispatch(G.ENEMYFIREBALL);
                            break;
                        case "fireball2":
                            eventDispatcher.dispatch(G.ENEMYFIREBALL2);
                            break;
                        case "frostbolt":
                            eventDispatcher.dispatch(G.EFROSTBOLT);
                            break;
                        case "frostbolt2":
                            eventDispatcher.dispatch(G.EFROSTBOLT2);
                            break;
                        case "frostball":
                            eventDispatcher.dispatch(G.ENEMYFROSTBALL);
                            break;
                        case "trifrostball":
                            eventDispatcher.dispatch(G.ENEMYFROSTBALL2);
                            break;
                        case "necrofire":
                            eventDispatcher.dispatch(G.NECROFIRE);
                            break;
                        case "necrofire2":
                            eventDispatcher.dispatch(G.NECROFIRE2);
                            break;
                        case "necrofire3":
                            eventDispatcher.dispatch(G.NECROFIRE3);
                            break;
                        case "necroulti1":
                            eventDispatcher.dispatch(G.ENEMYCAST,{skillname:"necroulti1",time:2500,color:0xddffdd});
                            break;
                        case "necrosummon":
                            model.enemy.frozen = false;
                            model.enemy.tint = 0xffffff;
                            if(model.necromod == 1)  eventDispatcher.dispatch(G.SUMMONSKELETONS);
                            else if(model.necromod == 2)  eventDispatcher.dispatch(G.SUMMONBLOODHEAD);
                            else if(model.necromod == 3)  eventDispatcher.dispatch(G.SUMMONCSAPI);
                            break;
                        case "necrofrost":
                            eventDispatcher.dispatch(G.NECROFROST);
                            break;
                        case "captainshoot":
                            eventDispatcher.dispatch(G.CAPTAINSHOOT);
                            break;
                        case "summonpirate1":
                            eventDispatcher.dispatch(G.SUMMONPIRATE1);
                            break;
                        case "summonpirate2":
                            eventDispatcher.dispatch(G.SUMMONPIRATE2);
                            break;
                        case "pirateshoot":
                            eventDispatcher.dispatch(G.PIRATESHOOT);
                            break;
                        case "enemyheal":
                            eventDispatcher.dispatch(G.ENEMYCAST,{skillname:"enemyheal",time:2600,color:0xddffdd});
                            break;
                        case "enemyheal2":
                            eventDispatcher.dispatch(G.ENEMYCAST,{skillname:"enemyheal2",time:2600,color:0xddffdd});
                            break;
                        case "enemyheal3":
                            eventDispatcher.dispatch(G.ENEMYCAST,{skillname:"enemyheal3",time:2600,color:0xddffdd});
                            break;
                        case "landorheal":
                            eventDispatcher.dispatch(G.ENEMYCAST,{skillname:"landorheal",time:2600,color:0xddffdd});
                            break;
                        case "enemyshield":
                            eventDispatcher.dispatch(G.ENEMYCAST,{skillname:"enemyshield",time:700,color:0xddffdd});
                            break;
                        case "enemyshieldbig":
                            eventDispatcher.dispatch(G.ENEMYSHIELDBIG);
                            break;
                        case "eulti1":
                            eventDispatcher.dispatch(G.ENEMYCAST,{skillname:"eulti1",time:2000,color:0xddddff});
                            break;
                        case "eulti2":
                            eventDispatcher.dispatch(G.ENEMYCAST,{skillname:"eulti2",time:2000,color:0xddddff});
                            break;
                        case "skip":
                            eventDispatcher.dispatch(G.SKIP);
                            break;
                        case "lionstrike":
                            eventDispatcher.dispatch(G.LIONSTRIKE);
                            break;
                        case "lionstrike2":
                            eventDispatcher.dispatch(G.LIONSTRIKE2);
                            break;
                        case "transform":
                            eventDispatcher.dispatch(G.ENEMYCAST,{skillname:"transform",time:2500,color:0xddddff});
                            break;
                        case "selfexplode":
                            eventDispatcher.dispatch(G.ENEMYCAST,{skillname:"selfexplode",time:2000,color:0x000000});
                            break;
                        case "darkbolt":
                            eventDispatcher.dispatch(G.ENEMYCAST,{skillname:"darkbolt",time:1000,color:0x000000});
                            break;
                        }
                    }
                break;
            case G.ENEMYBASIC:
                var spd = 150;
                if(model.espeed>3.5) spd = spd/2;
                var tw = game.add.tween(model.enemy).to({x:'-60'},spd,Phaser.Easing.Linear.None,true);
                tw.yoyo(true,10);
                game.time.events.add(spd, function(){
                    eventDispatcher.dispatch(G.PLAYERHURT,model.estr);
                },this);
                model.ecounter = 0;
                break;
            case G.BLOODHEADBASIC:
                var tw = game.add.tween(model.enemy).to({x:'-60'},150,Phaser.Easing.Linear.None,true);
                tw.yoyo(true,10);
                game.time.events.add(150, function(){
                    game.camera.shake();
                    eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
                    eventDispatcher.dispatch(G.PLAYERHURT,model.estr);
                },this);
                model.ecounter = 0;
                break;
            case G.SKIP:
                model.ecounter = 0;
                model.emod++;
                break;
            case G.TWOBASIC:
                var tw = game.add.tween(model.enemy).to({x:'-60'},150,Phaser.Easing.Linear.None,true);
                tw.yoyo(true,10);
                game.time.events.add(150, function(){
                    eventDispatcher.dispatch(G.PLAYERHURT,model.estr);
                },this);
                model.ecounter = 0;
                model.emodcounter++;
                if(model.emodcounter==2)
                {
                    model.emodcounter = 0;
                    model.emod++;
                }
                break;
            case G.TRIBASIC:
                var spd = 150;
                if(model.espeed > 3) spd/=2;
                var tw = game.add.tween(model.enemy).to({x:'-60'},spd,Phaser.Easing.Linear.None,true);
                tw.yoyo(true,10);
                game.time.events.add(spd, function(){
                    eventDispatcher.dispatch(G.PLAYERHURT,model.estr);
                },this);
                model.ecounter = 0;
                model.emodcounter++;
                if(model.emodcounter==3)
                {
                    model.emodcounter = 0;
                    model.emod++;
                }
                break;
            case G.LIONSTRIKE:
                var spd = 150;
                if(model.espeed > 3) spd/=2;
                var tw = game.add.tween(model.enemy).to({x:'-60'},spd,Phaser.Easing.Linear.None,true);
                tw.yoyo(true,10);
                game.time.events.add(spd, function(){
                    eventDispatcher.dispatch(G.PLAYERHURT,model.estr*2);
                    model.player.tint = 0xffff00;                
                    new Ripple(model.player.x,model.player.y,50,150,0xffff00);
                    model.player.tint = 0xffff00;
                    eventDispatcher.dispatch(G.PLAY_SOUND,"critsound");
                    game.time.events.add(70, function(){
                        model.player.tint = 0xffffff;
                    },this);
                },this);
                model.ecounter = 0;
                model.emod--;
                break;
            case G.LIONSTRIKE2:
                var spd = 150;
                if(model.espeed > 3) spd/=2;
                var tw = game.add.tween(model.enemy).to({x:'-60'},spd,Phaser.Easing.Linear.None,true);
                tw.yoyo(true,10);
                game.time.events.add(spd, function(){
                    eventDispatcher.dispatch(G.PLAYERHURT,model.estr*2);
                    model.player.tint = 0xffff00;                
                    new Ripple(model.player.x,model.player.y,50,150,0xffff00);
                    model.player.tint = 0xffff00;
                    eventDispatcher.dispatch(G.PLAY_SOUND,"critsound");
                    game.time.events.add(70, function(){
                        model.player.tint = 0xffffff;
                    },this);
                },this);
                model.ecounter = 0;
                model.emod++;
                break;
            case G.FOURBASIC:
                var spd = 150;
                if(model.espeed > 3) spd/=2;
                var tw = game.add.tween(model.enemy).to({x:'-60'},spd,Phaser.Easing.Linear.None,true);
                tw.yoyo(true,10);
                game.time.events.add(spd, function(){
                    eventDispatcher.dispatch(G.PLAYERHURT,model.estr);
                },this);
                model.ecounter = 0;
                model.emodcounter++;
                if(model.emodcounter==4)
                {
                    model.emodcounter = 0;
                    model.emod++;
                }
                break;
            case G.ENEMYFIREBALL:
            eventDispatcher.dispatch(G.PLAY_SOUND,"berserk");
            var tw = game.add.tween(model.enemy).to({x:'+20'},80,Phaser.Easing.Linear.None,true);
            tw.yoyo(true,10);
            model.enemy.tint = 0xff0000;
            game.time.events.add(70, function(){
                model.enemy.tint = 0xffffff;
                var fireball = game.add.sprite(model.enemy.x,model.enemy.y+model.enemy.height/4,"fireball2");
                fireball.anchor.set(0.5,0.5);
                fireball.scale.set(2,2);
                fireball.angle = 90;
                fireball.animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60]);
                fireball.animations.play('burn',40,true);
                fireball.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                var twfireball = game.add.tween(fireball).to({x:model.player.x},500,Phaser.Easing.Linear.None,true);
             
                twfireball.onComplete.add(function(){
                    new Ripple(model.player.x,model.player.y,50,150,0xffaa00);
                    model.player.tint = 0xffaa00;
                    eventDispatcher.dispatch(G.PLAYERHURT,model.estr*2);
                    game.time.events.add(100, function(){model.player.tint = 0xffffff;},this);
                    fireball.destroy();
                    eventDispatcher.dispatch(G.PLAY_SOUND,"critsound");
                },this);
            });
                model.ecounter = 0;
                model.emod = 0;
            break;
            case G.ENEMYFIREBALL2:
            eventDispatcher.dispatch(G.PLAY_SOUND,"berserk");
            var tw = game.add.tween(model.enemy).to({x:'+20'},80,Phaser.Easing.Linear.None,true);
            tw.yoyo(true,10);
            model.enemy.tint = 0xff0000;
            game.time.events.add(70, function(){
                model.enemy.tint = 0xffffff;
                var fireball = game.add.sprite(model.enemy.x,model.enemy.y+model.enemy.height/4,"fireball2");
                fireball.anchor.set(0.5,0.5);
                fireball.scale.set(2,2);
                fireball.angle = 90;
                fireball.animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60]);
                fireball.animations.play('burn',40,true);
                fireball.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                var twfireball = game.add.tween(fireball).to({x:model.player.x},500,Phaser.Easing.Linear.None,true);
             
                twfireball.onComplete.add(function(){
                    new Ripple(model.player.x,model.player.y,50,150,0xffaa00);
                    model.player.tint = 0xffaa00;
                    eventDispatcher.dispatch(G.PLAYERHURT,model.estr*2);
                    game.time.events.add(100, function(){model.player.tint = 0xffffff;},this);
                    fireball.destroy();
                    eventDispatcher.dispatch(G.PLAY_SOUND,"critsound");
                },this);
            });
                model.ecounter = 0;
                model.emod++;
            break;
            case G.ENEMYFROSTBALL:
                eventDispatcher.dispatch(G.PLAY_SOUND,"berserk");
                var tw = game.add.tween(model.enemy).to({x:'+20'},80,Phaser.Easing.Linear.None,true);
                tw.yoyo(true,10);
                model.enemy.tint = 0x0000ff;
                game.time.events.add(70, function(){
                    model.enemy.tint = 0xffffff;
                    var fireball = game.add.sprite(model.enemy.x,model.enemy.y+model.enemy.height/4,"basic");
                    fireball.anchor.set(0.5,0.5);
                    fireball.scale.set(2,2);
                    fireball.angle = 90;
                    fireball.animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60]);
                    fireball.animations.play('burn',40,true);
                    fireball.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                    var twfireball = game.add.tween(fireball).to({x:model.player.x},500,Phaser.Easing.Linear.None,true);
                
                    twfireball.onComplete.add(function(){
                        new Ripple(model.player.x,model.player.y,50,150,0x0000ff);
                        model.player.tint = 0xffaa00;
                        eventDispatcher.dispatch(G.PLAYERHURT,model.estr*2);
                        game.time.events.add(100, function(){model.player.tint = 0xffffff;},this);
                        fireball.destroy();
                        eventDispatcher.dispatch(G.PLAY_SOUND,"critsound");
                    },this);
                });
                    model.ecounter = 0;
            break;
            case G.ENEMYFROSTBALL2:
                eventDispatcher.dispatch(G.PLAY_SOUND,"berserk");
                var tw = game.add.tween(model.enemy).to({x:'+20'},80,Phaser.Easing.Linear.None,true);
                tw.yoyo(true,10);
                model.enemy.tint = 0x0000ff;
                game.time.events.add(70, function(){
                    model.enemy.tint = 0xffffff;
                    var fireball = game.add.sprite(model.enemy.x,model.enemy.y+model.enemy.height/4,"basic");
                    fireball.anchor.set(0.5,0.5);
                    fireball.scale.set(2,2);
                    fireball.angle = 90;
                    fireball.animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60]);
                    fireball.animations.play('burn',40,true);
                    fireball.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                    var twfireball = game.add.tween(fireball).to({x:model.player.x},500,Phaser.Easing.Linear.None,true);
                
                    twfireball.onComplete.add(function(){
                        new Ripple(model.player.x,model.player.y,50,150,0x0000ff);
                        model.player.tint = 0xffaa00;
                        eventDispatcher.dispatch(G.PLAYERHURT,model.estr*2);
                        game.time.events.add(100, function(){model.player.tint = 0xffffff;},this);
                        fireball.destroy();
                        eventDispatcher.dispatch(G.PLAY_SOUND,"critsound");
                    },this);
                });
                    model.emodcounter++;
                    if(model.emodcounter == 3)
                    {
                        model.emod++;
                        model.emodcounter = 0;
                    }
                    model.ecounter = 0;
            break;
            case G.NECROFIRE2:
                model.pause = true;
                eventDispatcher.dispatch(G.PLAY_SOUND,"berserk");
                var tw = game.add.tween(model.enemy).to({x:'+20'},80,Phaser.Easing.Linear.None,true);
                tw.yoyo(true,10);
                model.enemy.tint = 0xff0000;
                game.time.events.add(70, function(){
                    model.enemy.tint = 0xffffff;
                    var fireball = game.add.sprite(model.enemy.x,model.enemy.y,"fireball2");
                    fireball.anchor.set(0.5,0.5);
                    fireball.tint = 0x660066;
                    fireball.scale.set(2,2);
                    fireball.angle = 90;
                    fireball.animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60]);
                    fireball.animations.play('burn',40,true);
                    fireball.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                    var twfireball = game.add.tween(fireball).to({x:model.player.x},500,Phaser.Easing.Linear.None,true);
                
                    twfireball.onComplete.add(function(){
                        game.camera.shake();
                        new Ripple(model.player.x,model.player.y,50,150,0xffaa00);
                        model.player.tint = 0xffaa00;
                        eventDispatcher.dispatch(G.PLAYERHURT,(model.hp-1));
                        game.time.events.add(100, function(){model.player.tint = 0xffffff;},this);
                        fireball.destroy();
                        eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
                    },this);
                });
                    game.time.events.add(1500, function(){
                        model.town.conversation = "mtbattle2";
                    },this);
                    model.emod = 4;
                    model.ecounter = 0;
            break;
            case G.NECROFIRE:
                eventDispatcher.dispatch(G.PLAY_SOUND,"berserk");
                var tw = game.add.tween(model.enemy).to({x:'+20'},80,Phaser.Easing.Linear.None,true);
                tw.yoyo(true,10);
                model.enemy.tint = 0xff0000;
                game.time.events.add(70, function(){
                    model.enemy.tint = 0xffffff;
                    var fireball = game.add.sprite(model.enemy.x,model.enemy.y,"fireball");
                    fireball.anchor.set(0.5,0.5);
                    fireball.tint = 0x660066;
                    fireball.scale.set(1.5,1.5);
                    fireball.angle = 90;
                    fireball.animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60]);
                    fireball.animations.play('burn',40,true);
                    fireball.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                    var twfireball = game.add.tween(fireball).to({x:model.player.x},500,Phaser.Easing.Linear.None,true);
                
                    twfireball.onComplete.add(function(){
                       // game.camera.flash(0x977d8a,500);
                        new Ripple(model.player.x,model.player.y,50,150,0xffaa00);
                        model.player.tint = 0xffaa00;
                        eventDispatcher.dispatch(G.PLAYERHURT,(model.estr));
                        game.time.events.add(100, function(){model.player.tint = 0xffffff;},this);
                        fireball.destroy();
                    },this);
                });
                    model.emod++;
                    model.ecounter = 0;
            break;
            case G.NECROULTI1:
                eventDispatcher.dispatch(G.PLAY_SOUND,"explode2");
                var tw = game.add.tween(model.enemy).to({x:'+20'},80,Phaser.Easing.Linear.None,true);
                tw.yoyo(true,10);
                model.enemy.tint = 0xff0000;
                game.time.events.add(70, function(){
                    model.enemy.tint = 0xffffff;
                    model.fireballs = [
                        game.add.sprite(model.player.x-85,model.player.y-80,"fireball2"),
                        game.add.sprite(model.player.x-30,model.player.y-100,"fireball2"),
                        game.add.sprite(model.player.x+25,model.player.y-100,"fireball2"),
                        game.add.sprite(model.player.x+75,model.player.y-85,"fireball2")
                    ];
                    for (let i = 0; i < model.fireballs.length; i++) {
                        model.fireballs[i].anchor.set(0.5,0.5);
                        model.fireballs[i].tint = 0x660066;
                        model.fireballs[i].scale.set(2,2);
                        model.fireballs[i].animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60]);
                        model.fireballs[i].animations.play('burn',40,true);
                        model.fireballs[i].texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                        model.fireballs[i].alpha = 0;
                    }
                    model.fireballs[0].angle -= 40;
                    model.fireballs[1].angle -= 15;
                    model.fireballs[2].angle += 15;
                    model.fireballs[3].angle += 40;
                    var twappear = [];
                  
                    for (let i = 0; i < 4; i++) {
                        twappear.push(game.add.tween(model.fireballs[i]).to( { alpha:1 }, 800, "Linear", true));
                        new Ripple(model.fireballs[i].x,model.fireballs[i].y,50,150,0x000000);
                        
                    }
    model.necroultite1 = game.time.events.add(1000, function(){
                        var twfireball = game.add.tween(model.fireballs[0]).to({x:model.player.x, y:model.player.y},175,Phaser.Easing.Linear.None,true);
                        eventDispatcher.dispatch(G.PLAY_SOUND,"berserk");
                        twfireball.onComplete.add(function(){
                                new Ripple(model.player.x,model.player.y,50,150,0xffaa00);
                                model.player.tint = 0xffaa00;
                                eventDispatcher.dispatch(G.PLAYERHURT,model.estr);
                                game.time.events.add(100, function(){model.player.tint = 0xffffff;},this);
                                model.fireballs[0].destroy();
                                eventDispatcher.dispatch(G.PLAY_SOUND,"critsound");
                            },this);
                        },this);
                  
    model.necroultite2 = game.time.events.add(1500, function(){
                        var twfireball = game.add.tween(model.fireballs[2]).to({x:model.player.x, y:model.player.y},175,Phaser.Easing.Linear.None,true);
                        eventDispatcher.dispatch(G.PLAY_SOUND,"berserk");
                        twfireball.onComplete.add(function(){
                            new Ripple(model.player.x,model.player.y,50,150,0xffaa00);
                            model.player.tint = 0xffaa00;
                            eventDispatcher.dispatch(G.PLAYERHURT,model.estr);
                            game.time.events.add(100, function(){model.player.tint = 0xffffff;},this);
                            model.fireballs[2].destroy();
                            eventDispatcher.dispatch(G.PLAY_SOUND,"critsound");
                        },this);
                    },this);
                  
    model.necroultite3 = game.time.events.add(2000, function(){
                        var twfireball = game.add.tween(model.fireballs[1]).to({x:model.player.x, y:model.player.y},175,Phaser.Easing.Linear.None,true);
                        eventDispatcher.dispatch(G.PLAY_SOUND,"berserk");
                        twfireball.onComplete.add(function(){
                            new Ripple(model.player.x,model.player.y,50,150,0xffaa00);
                            model.player.tint = 0xffaa00;
                            eventDispatcher.dispatch(G.PLAYERHURT,model.estr);
                            game.time.events.add(100, function(){model.player.tint = 0xffffff;},this);
                            model.fireballs[1].destroy();
                            eventDispatcher.dispatch(G.PLAY_SOUND,"critsound");
                        },this);
                    },this);
                  
    model.necroultite4 = game.time.events.add(2500, function(){
                        var twfireball = game.add.tween(model.fireballs[3]).to({x:model.player.x, y:model.player.y},175,Phaser.Easing.Linear.None,true);
                        eventDispatcher.dispatch(G.PLAY_SOUND,"berserk");
                        twfireball.onComplete.add(function(){
                            new Ripple(model.player.x,model.player.y,50,150,0xffaa00);
                            model.player.tint = 0xffaa00;
                            eventDispatcher.dispatch(G.PLAYERHURT,model.estr);
                            game.time.events.add(100, function(){model.player.tint = 0xffffff;},this);
                            model.fireballs[3].destroy();
                            eventDispatcher.dispatch(G.PLAY_SOUND,"critsound");
                        },this);
                    },this);
                    });
                    model.emod = 0;
                    model.ecounter = 0;
               
            break;
            case G.SUMMONSKELETONS:
            model.pause = true;
            model.enemy.alpha = 0;
            model.ecounter = 0;
            model.skeletons = [
                {
                    "sprite": "undead4",
                    "x": 500,
                    "y":389,
                    "str":3,
                    "speed":3,
                    "hp":150,
                    "reward":0,
                    "xpreward":0,
                    "scaleX":-4,
                    "scaleY":4,
                    "alive":true,
                    "attacks":["tribasic","lionstrike2","tribasic","estun3"]
                },
                {
                    "sprite": "cave1",
                    "x": 500,
                    "y":389,
                    "str":3,
                    "speed":3,
                    "hp":175,
                    "reward":0,
                    "xpreward":0,
                    "scaleX":4,
                    "scaleY":4,
                    "alive":true,
                    "attacks":["tribasic","lionstrike2","tribasic","estun3"]
                },
                {
                    "sprite": "undead6",
                    "x": 400,
                    "y":381,
                    "str":4,
                    "speed":1.8,
                    "hp":180,
                    "reward":5,
                    "xpreward":6,
                    "scaleX":5,
                    "scaleY":5,
                    "alive":true,
                    "attacks":["twobasic","estun2","fireball2","twobasic","enemyheal3"]
                },
                {
                    "sprite": "undead3",
                    "x": 550,
                    "y":400,
                    "str":2,
                    "speed":2.8,
                    "hp":180,
                    "reward":5,
                    "xpreward":6,
                    "scaleX":-3,
                    "scaleY":3,
                    "alive":true,
                    "attacks":["berserk","basic"]
                }
            ];
            

            

            //necrosprite és progressbarok beállítása
            model.necrosprite = game.add.sprite(740,155,"necro");
            model.necrosprite.anchor.set(0.5,0.5);
            model.necrosprite.scale.set(-3,3);
            model.necrosprite.alpha = 0;
            model.necroHealthbar =  new HealthBar(game,{x:model.necrosprite.x, y:200, width:120, height:18});
            model.necroHealthbarText = game.add.text(model.necroHealthbar.x, model.necroHealthbar.y+5, model.esavedhp+"/2500", { font: "bold 10px 'Press Start 2P'", fill: "#000",align:'right'});
            model.necroHealthbarText.anchor.set(0.5,0.5);   
            model.necroHealthbar.bgSprite.alpha = 0;
            model.necroHealthbar.barSprite.alpha = 0;
            model.necroHealthbar.borderSprite.alpha = 0;
            model.necroHealthbarText.alpha = 0;

            //necro eltünik
            var tw1 = game.add.tween(model.enemy).to( { alpha: 0 }, 600, "Linear", true);
            new Ripple(model.enemy.x,model.enemy.y,50,200,0x000000);
            eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
            var twhp1 =  game.add.tween(model.enemyHealthbar.bgSprite).to( { alpha: 0 }, 600, "Linear", true);
            var twhp2 =  game.add.tween(model.enemyHealthbar.barSprite).to( { alpha: 0 }, 600, "Linear", true);
            var twhp3 =  game.add.tween(model.enemyHealthbar.borderSprite).to( { alpha: 0 }, 600, "Linear", true);
            var twhp4 =  game.add.tween(model.enemyHealthbarText).to( { alpha: 0 }, 600, "Linear", true);

            //necro előtünik hátul
            game.time.events.add(600,function(){
                model.esavedhp = model.ehp;
                model.necroHealthbar.barSprite.width = model.esavedhp/2500*120;
                model.necroHealthbarText.text = model.esavedhp+"/2500";
                var tw1 = game.add.tween(model.necrosprite).to( { alpha: 1 }, 600, "Linear", true);
                new Ripple(model.necrosprite.x,model.necrosprite.y,50,200,0x000000);
                eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
                var twhp1 =  game.add.tween(model.necroHealthbar.bgSprite).to( { alpha: 1 }, 600, "Linear", true);
                var twhp2 =  game.add.tween(model.necroHealthbar.barSprite).to( { alpha: 1 }, 600, "Linear", true);
                var twhp3 =  game.add.tween(model.necroHealthbar.borderSprite).to( { alpha: 1 }, 600, "Linear", true);
                var twhp4 =  game.add.tween(model.necroHealthbarText).to( { alpha: 1 }, 600, "Linear", true);
                model.freeze = false;
                model.player.tint = 0xffffff;
                model.staff.tint = 0xffffff;
            });


            game.time.events.add(1500,function(){
                var rand = Math.floor((Math.random() * 4));
                eventDispatcher.dispatch(G.SETENEMY,{
                    x:model.skeletons[rand].x,
                    y:model.skeletons[rand].y,
                    sprite:model.skeletons[rand].sprite,
                    hp:model.skeletons[rand].hp,
                    str:model.skeletons[rand].str,
                    speed:model.skeletons[rand].speed,
                    escaleX:model.skeletons[rand].scaleX,
                    escaleY:model.skeletons[rand].scaleY,
                    reward:0,
                    xpreward:0,
                    attacks:model.skeletons[rand].attacks,
                    name:"skeleton"
                });          
                model.enemy.loadTexture(model.skeletons[rand].sprite);
                model.enemy.tint = 0xffffff;
                model.enemy.frozen = false;
                model.enemy.scale.x = model.skeletons[rand].scaleX;
                model.enemy.scale.y = model.skeletons[rand].scaleY;
                model.enemy.y = model.skeletons[rand].y;
                model.enemyHealthbarText.text = model.ehp+"/"+model.emaxhp; 
                model.enemyHealthbar.barSprite.width = 120;
                eventDispatcher.dispatch(G.PLAY_SOUND,"explode3");
                game.camera.flash(0x000000,100);
                var tw = game.add.tween(model.enemy).to( { alpha:1 }, 800, "Linear", true);
                new Ripple(model.enemy.x,model.enemy.y,50,200,0x000000);
                var retwhp1 =  game.add.tween(model.enemyHealthbar.bgSprite).to( { alpha: 1 }, 600, "Linear", true);
                var retwhp2 =  game.add.tween(model.enemyHealthbar.barSprite).to( { alpha: 1 }, 600, "Linear", true);
                var retwhp3 =  game.add.tween(model.enemyHealthbar.borderSprite).to( { alpha: 1 }, 600, "Linear", true);
                var retwhp4 =  game.add.tween(model.enemyHealthbarText).to( { alpha: 1 }, 600, "Linear", true);
                model.pause = false;
           });          
            break;
            case G.SUMMONBLOODHEAD:
                model.pause = true;
                model.esavedhp = model.ehp;
                model.enemy.alpha = 0;
                model.ecounter = 0;            

            //necrosprite és progressbarok beállítása
            model.necrosprite = game.add.sprite(740,155,"necro");
            model.necrosprite.anchor.set(0.5,0.5);
            model.necrosprite.scale.set(-3,3);
            model.necrosprite.alpha = 0;
            model.necroHealthbar =  new HealthBar(game,{x:model.necrosprite.x, y:200, width:120, height:18});
            model.necroHealthbar.barSprite.width = model.esavedhp/2500*120;
            model.necroHealthbarText = game.add.text(model.necroHealthbar.x, model.necroHealthbar.y+5, model.esavedhp+"/2500", { font: "bold 10px 'Press Start 2P'", fill: "#000",align:'right'});
            model.necroHealthbarText.anchor.set(0.5,0.5);   
            model.necroHealthbar.bgSprite.alpha = 0;
            model.necroHealthbar.barSprite.alpha = 0;
            model.necroHealthbar.borderSprite.alpha = 0;
            model.necroHealthbarText.alpha = 0;

            //necro eltünik
            var tw1 = game.add.tween(model.enemy).to( { alpha: 0 }, 600, "Linear", true);
            new Ripple(model.enemy.x,model.enemy.y,50,200,0x000000);
            eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
            var twhp1 =  game.add.tween(model.enemyHealthbar.bgSprite).to( { alpha: 0 }, 600, "Linear", true);
            var twhp2 =  game.add.tween(model.enemyHealthbar.barSprite).to( { alpha: 0 }, 600, "Linear", true);
            var twhp3 =  game.add.tween(model.enemyHealthbar.borderSprite).to( { alpha: 0 }, 600, "Linear", true);
            var twhp4 =  game.add.tween(model.enemyHealthbarText).to( { alpha: 0 }, 600, "Linear", true);

            //necro előtünik hátul
            game.time.events.add(600,function(){

                var tw1 = game.add.tween(model.necrosprite).to( { alpha: 1 }, 600, "Linear", true);
                new Ripple(model.necrosprite.x,model.necrosprite.y,50,200,0x000000);
                eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
                var twhp1 =  game.add.tween(model.necroHealthbar.bgSprite).to( { alpha: 1 }, 600, "Linear", true);
                var twhp2 =  game.add.tween(model.necroHealthbar.barSprite).to( { alpha: 1 }, 600, "Linear", true);
                var twhp3 =  game.add.tween(model.necroHealthbar.borderSprite).to( { alpha: 1 }, 600, "Linear", true);
                var twhp4 =  game.add.tween(model.necroHealthbarText).to( { alpha: 1 }, 600, "Linear", true);
                model.freeze = false;
                model.player.tint = 0xffffff;
                model.staff.tint = 0xffffff;
            });

            //csontváz
            game.time.events.add(1500,function(){
                var rand = Math.floor((Math.random() * 4));
                eventDispatcher.dispatch(G.SETENEMY,{
                    x:500,
                    y:350,
                    sprite:"undead2",
                    hp:550,
                    str:20,
                    speed:0.5,
                    escaleX:-10,
                    escaleY:10,
                    reward:10,
                    xpreward:8,
                    attacks:["bloodheadbasic"],
                    flip:true,
                    name:"skeleton"
                });
                model.enemy.loadTexture("undead2");
                model.enemy.tint = 0xffffff;
                model.enemy.frozen = false;
                model.enemy.scale.x = -10;
                model.enemy.scale.y = 10;
                model.enemy.y = 331;

                model.enemyHealthbarText.text = model.ehp+"/"+model.emaxhp; 
                model.enemyHealthbar.barSprite.width = 120;
                eventDispatcher.dispatch(G.PLAY_SOUND,"explode3");
                game.camera.flash(0x000000,100);
                var tw = game.add.tween(model.enemy).to( { alpha:1 }, 800, "Linear", true);
                new Ripple(model.enemy.x,model.enemy.y,50,200,0x000000);
                var retwhp1 =  game.add.tween(model.enemyHealthbar.bgSprite).to( { alpha: 1 }, 600, "Linear", true);
                var retwhp2 =  game.add.tween(model.enemyHealthbar.barSprite).to( { alpha: 1 }, 600, "Linear", true);
                var retwhp3 =  game.add.tween(model.enemyHealthbar.borderSprite).to( { alpha: 1 }, 600, "Linear", true);
                var retwhp4 =  game.add.tween(model.enemyHealthbarText).to( { alpha: 1 }, 600, "Linear", true);
                model.pause = false;
           });          
            break;
            case G.SUMMONCSAPI:
                model.pause = true;
                model.esavedhp = model.ehp;
                model.enemy.alpha = 0;
                model.ecounter = 0;     
                model.necromod = 4;       

            //necrosprite és progressbarok beállítása
            model.necrosprite = game.add.sprite(740,155,"necro");
            model.necrosprite.anchor.set(0.5,0.5);
            model.necrosprite.scale.set(-3,3);
            model.necrosprite.alpha = 0;
            model.necroHealthbar =  new HealthBar(game,{x:model.necrosprite.x, y:200, width:120, height:18});
            model.necroHealthbar.barSprite.width = model.esavedhp/2500*120;
            model.necroHealthbarText = game.add.text(model.necroHealthbar.x, model.necroHealthbar.y+5, model.esavedhp+"/2500", { font: "bold 10px 'Press Start 2P'", fill: "#000",align:'right'});
            model.necroHealthbarText.anchor.set(0.5,0.5);   
            model.necroHealthbar.bgSprite.alpha = 0;
            model.necroHealthbar.barSprite.alpha = 0;
            model.necroHealthbar.borderSprite.alpha = 0;
            model.necroHealthbarText.alpha = 0;

            //necro eltünik
            var tw1 = game.add.tween(model.enemy).to( { alpha: 0 }, 600, "Linear", true);
            new Ripple(model.enemy.x,model.enemy.y,50,200,0x000000);
            eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
            var twhp1 =  game.add.tween(model.enemyHealthbar.bgSprite).to( { alpha: 0 }, 600, "Linear", true);
            var twhp2 =  game.add.tween(model.enemyHealthbar.barSprite).to( { alpha: 0 }, 600, "Linear", true);
            var twhp3 =  game.add.tween(model.enemyHealthbar.borderSprite).to( { alpha: 0 }, 600, "Linear", true);
            var twhp4 =  game.add.tween(model.enemyHealthbarText).to( { alpha: 0 }, 600, "Linear", true);

            //necro előtünik hátul
            game.time.events.add(600,function(){

                var tw1 = game.add.tween(model.necrosprite).to( { alpha: 1 }, 600, "Linear", true);
                new Ripple(model.necrosprite.x,model.necrosprite.y,50,200,0x000000);
                eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
                var twhp1 =  game.add.tween(model.necroHealthbar.bgSprite).to( { alpha: 1 }, 600, "Linear", true);
                var twhp2 =  game.add.tween(model.necroHealthbar.barSprite).to( { alpha: 1 }, 600, "Linear", true);
                var twhp3 =  game.add.tween(model.necroHealthbar.borderSprite).to( { alpha: 1 }, 600, "Linear", true);
                var twhp4 =  game.add.tween(model.necroHealthbarText).to( { alpha: 1 }, 600, "Linear", true);
                model.freeze = false;
                model.player.tint = 0xffffff;
                model.staff.tint = 0xffffff;
            });

            //csontváz
            game.time.events.add(1500,function(){
                var rand = Math.floor((Math.random() * 4));
                eventDispatcher.dispatch(G.SETENEMY,{
                    x:500,
                    y:350,
                    sprite:"frostzombi",
                    hp:400,
                    str:8,
                    speed:1.2,
                    escaleX:4,
                    escaleY:4,
                    reward:4,
                    xpreward:8,
                    attacks:["twobasic","eulti1","skip","twobasic","frostbolt"],
                    flip:true,
                    name:"skeleton"
                });
                model.enemy.loadTexture("frostzombi");
                model.enemy.tint = 0xffffff;
                model.enemy.frozen = false;
                model.enemy.scale.x = 4;
                model.enemy.scale.y = 4;
                model.enemy.y = 360;
                model.enemy.frozen = false;
                model.enemy.tint = 0xffffff;

                model.enemyHealthbarText.text = model.ehp+"/"+model.emaxhp; 
                model.enemyHealthbar.barSprite.width = 120;
                eventDispatcher.dispatch(G.PLAY_SOUND,"explode3");
                game.camera.flash(0x000000,100);
                var tw = game.add.tween(model.enemy).to( { alpha:1 }, 800, "Linear", true);
                new Ripple(model.enemy.x,model.enemy.y,50,200,0x000000);
                var retwhp1 =  game.add.tween(model.enemyHealthbar.bgSprite).to( { alpha: 1 }, 600, "Linear", true);
                var retwhp2 =  game.add.tween(model.enemyHealthbar.barSprite).to( { alpha: 1 }, 600, "Linear", true);
                var retwhp3 =  game.add.tween(model.enemyHealthbar.borderSprite).to( { alpha: 1 }, 600, "Linear", true);
                var retwhp4 =  game.add.tween(model.enemyHealthbarText).to( { alpha: 1 }, 600, "Linear", true);
                model.pause = false;
           });          
            break;
            case G.NECROFIRE3:
                model.pause = true;
                eventDispatcher.dispatch(G.PLAY_SOUND,"berserk");
                var tw = game.add.tween(model.enemy).to({x:'+20'},80,Phaser.Easing.Linear.None,true);
                tw.yoyo(true,10);
                model.enemy.tint = 0xff0000;
                game.time.events.add(70, function(){
                    model.enemy.tint = 0xffffff;
                    var fireball = game.add.sprite(model.enemy.x,model.enemy.y,"fireball2");
                    fireball.anchor.set(0.5,0.5);
                    fireball.tint = 0x660066;
                    fireball.scale.set(2,2);
                    fireball.angle = 90;
                    fireball.animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60]);
                    fireball.animations.play('burn',40,true);
                    fireball.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                    var twfireball = game.add.tween(fireball).to({x:model.player.x},500,Phaser.Easing.Linear.None,true);
                
                    twfireball.onComplete.add(function(){
                        game.camera.shake();
                        new Ripple(model.player.x,model.player.y,50,150,0xffaa00);
                        model.player.tint = 0xffaa00;
                        eventDispatcher.dispatch(G.PLAYERHURT,(model.hp-1));
                        game.time.events.add(100, function(){model.player.tint = 0xffffff;},this);
                        fireball.destroy();
                        eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
                    },this);
                });
                    game.time.events.add(1500, function(){
                        model.town.conversation = "swbattle10";
                    },this);
                    model.emod = 4;
                    model.ecounter = 0;
            break;
            case G.CAPTAINSHOOT:
               
                var tw = game.add.tween(model.enemy).to({x:'+20'},80,Phaser.Easing.Linear.None,true);
                tw.yoyo(true,10);
                model.enemy.frame = 1;
                model.enemy.tint = 0xffffff;
                game.time.events.add(70, function(){
                    model.enemy.tint = 0xffffff;
                    
                    new Ripple(model.enemy.x-38,model.enemy.y+10,5,10,0xffffff); //gun smoke 
                    var bullet = game.add.sprite(model.enemy.x,10+model.enemy.y,"bullet");
                    bullet.anchor.set(0.5,0.5);
                    bullet.scale.set(-2,2);
                    bullet.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                    var twbullet = game.add.tween(bullet).to({x:model.player.x},500,Phaser.Easing.Linear.None,true);
                    eventDispatcher.dispatch(G.PLAY_SOUND,"gunshot");
                   
                
                    twbullet.onComplete.add(function(){
                        eventDispatcher.dispatch(G.PLAYERHURT,model.estr*2);
                        bullet.destroy();
                        eventDispatcher.dispatch(G.PLAY_SOUND,"critsound");
                        model.enemy.frame = 0;
                    },this);
                });
                    model.ecounter = 0;
                    model.emod--;
            break;
            case G.SUMMONPIRATE1:
                model.pause = true;
                var tw = game.add.tween(model.enemy).to({x:'+100',alpha:0},600,Phaser.Easing.Linear.None,true);
                tw.onComplete.add(function(){
                    eventDispatcher.dispatch(G.SETENEMY,{
                        x:580,
                        y:390,
                        sprite:"pirate1",
                        hp:80,
                        str:2,
                        speed:1.2,
                        escaleX:2.7,
                        escaleY:2.7,
                        reward:0,
                        xpreward:0,
                        attacks:["pirateshoot"],
                        name:"Mr. Miller"
                    });
                    model.enemyHealthbar.setPercent(model.ehp/model.emaxhp*100);
                    model.enemyHealthbarText.text = model.ehp+"/"+model.emaxhp;
                    model.enemy.y-=200;
                    model.enemy.loadTexture("pirate1");
                    model.enemy.tint = 0xffffff;
                    model.enemy.frozen = false;
                    eventDispatcher.dispatch(G.PLAY_SOUND,"jump");
                    var tw2 = game.add.tween(model.enemy).to({y:'+205',x:'-100',alpha:1},300,Phaser.Easing.Linear.None,true);
                    tw2.onComplete.add(function(){model.town.conversation = "pirateconv2";},this);
                  
                },this)
            break;
            case G.SUMMONPIRATE2:
                model.pause = true;
                model.over = false;
                    eventDispatcher.dispatch(G.SETENEMY,{
                        x:580,
                        y:390,
                        sprite:"pirate2",
                        hp:80,
                        str:3,
                        speed:2,
                        escaleX:2.7,
                        escaleY:2.7,
                        reward:0,
                        xpreward:0,
                        attacks:["tribasic","lionstrike"],
                        name:"Mr. Wilson"
                    });
                    model.enemyHealthbar.setPercent(model.ehp/model.emaxhp*100);
                    model.enemyHealthbarText.text = model.ehp+"/"+model.emaxhp;
                    model.enemy.y-=200;
                    model.enemy.x+=100;
                    model.enemy.loadTexture("pirate2");
                    model.enemy.tint = 0xffffff;
                    model.enemy.frozen = false;
                    eventDispatcher.dispatch(G.PLAY_SOUND,"jump");
                    var tw2 = game.add.tween(model.enemy).to({y:'+200',x:'-100',alpha:1},300,Phaser.Easing.Linear.None,true);
                    tw2.onComplete.add(function(){model.town.conversation = "pirateconv4";},this);
            break;
            case G.BRONZE2:
                model.pause = true;
                model.over = false;
                    eventDispatcher.dispatch(G.SETENEMY,{
                        x:580,
                        y:390,
                        sprite:"elf",
                        hp:35,
                        str:1,
                        speed:0.9,
                        escaleX:2.7,
                        escaleY:2.7,
                        reward:0,
                        xpreward:0,
                        attacks:["estun2","tribasic","enemyheal"],
                        name:"Thilagorn"
                    });
                    model.enemyHealthbar.setPercent(model.ehp/model.emaxhp*100);
                    model.enemyHealthbarText.text = model.ehp+"/"+model.emaxhp;
                    model.enemy.y-=200;
                    model.enemy.x+=100;
                    model.enemy.loadTexture("elf");
                    model.enemy.tint = 0xffffff;
                    model.enemy.frozen = false;
                    model.enemy.scale.set(-2.7,2.7);
                    eventDispatcher.dispatch(G.PLAY_SOUND,"jump");
                    var tw2 = game.add.tween(model.enemy).to({y:'+190',x:'-100',alpha:1},300,Phaser.Easing.Linear.None,true);
                    tw2.onComplete.add(function(){model.town.conversation = "bronze2";},this);
            break;
            case G.BRONZE3:
                model.pause = true;
                model.over = false;
                    eventDispatcher.dispatch(G.BONUS,["poti"]);
                    eventDispatcher.dispatch(G.SETENEMY,{
                        x:580,
                        y:390,
                        sprite:"lucasarena",
                        hp:50,
                        str:1,
                        speed:1.2,
                        escaleX:2.7,
                        escaleY:2.7,
                        reward:0,
                        xpreward:0,
                        attacks:["twobasic","estun2","berserk","tribasic","estun"],
                        name:"Lucas"
                    });
                    model.enemyHealthbar.setPercent(model.ehp/model.emaxhp*100);
                    model.enemyHealthbarText.text = model.ehp+"/"+model.emaxhp;
                    model.enemy.y-=200;
                    model.enemy.x+=100;
                    model.enemy.loadTexture("lucasarena");
                    model.enemy.tint = 0xffffff;
                    model.enemy.frozen = false;
                    model.enemy.scale.set(-2.7,2.7);
                    eventDispatcher.dispatch(G.PLAY_SOUND,"jump");
                    var tw2 = game.add.tween(model.enemy).to({y:'+197',x:'-100',alpha:1},300,Phaser.Easing.Linear.None,true);
                    tw2.onComplete.add(function(){model.town.conversation = "bronze3";},this);
            break;
            case G.SILVER2:
                model.pause = true;
                model.over = false;
                    eventDispatcher.dispatch(G.SETENEMY,{
                        x:580,
                        y:388,
                        sprite:"guard2",
                        hp:150,
                        str:4,
                        speed:1.5,
                        escaleX:-3,
                        escaleY:3,
                        reward:0,
                        xpreward:0,
                        attacks:["fourbasic","berserk","tribasic","estun2","tribasic","lionstrike"],
                        name:"Sir Harold"
                    });
                    model.enemyHealthbar.setPercent(model.ehp/model.emaxhp*100);
                    model.enemyHealthbarText.text = model.ehp+"/"+model.emaxhp;
                    model.enemy.y-=200;
                    model.enemy.x+=100;
                    model.enemy.loadTexture("guard2");
                    model.enemy.tint = 0xffffff;
                    model.enemy.frozen = false;
                    model.enemy.scale.set(-3,3);
                    eventDispatcher.dispatch(G.PLAY_SOUND,"jump");
                    var tw2 = game.add.tween(model.enemy).to({y:388,x:'-100',alpha:1},300,Phaser.Easing.Linear.None,true);
                    tw2.onComplete.add(function(){model.town.conversation = "silver2";},this);
            break;
            case G.SILVER3:
            model.pause = true;
            model.over = false;
                eventDispatcher.dispatch(G.BONUS,["poti"]);
                eventDispatcher.dispatch(G.SETENEMY,{
                    x:580,
                    y:390,
                    sprite:"forest5",
                    hp:600,
                    str:30,
                    speed:0.4,
                    escaleX:5,
                    escaleY:5,
                    reward:0,
                    xpreward:0,
                    attacks:["bloodheadbasic"],
                    name:"Mr. Ork"
                });
                model.enemyHealthbar.setPercent(model.ehp/model.emaxhp*100);
                model.enemyHealthbarText.text = model.ehp+"/"+model.emaxhp;
                model.enemy.y-=300;
                model.enemy.x+=100;
                model.enemy.loadTexture("forest5");
                model.enemy.tint = 0xffffff;
                model.enemy.frozen = false;
                model.enemy.scale.set(5,5);
                eventDispatcher.dispatch(G.PLAY_SOUND,"jump");
                var tw2 = game.add.tween(model.enemy).to({y:350,x:'-100',alpha:1},300,Phaser.Easing.Linear.None,true);
                tw2.onComplete.add(function(){model.town.conversation = "silver3";},this);
            break;
            case G.CAPTAINBACK:
                model.pause = true;
                model.over = false;
                    eventDispatcher.dispatch(G.SETENEMY,{
                        x:580,
                        y:390,
                        sprite:"captain",
                        hp:150,
                        str:3,
                        speed:3,
                        escaleX:2.7,
                        escaleY:2.7,
                        reward:12,
                        xpreward:10,
                        attacks:["tribasic","captainshoot"],
                        name:"John Black2"
                    });
                    model.ehp = model.esavedhp;
                    model.enemyHealthbar.setPercent(model.ehp/model.emaxhp*100);
                    model.enemyHealthbarText.text = model.ehp+"/"+model.emaxhp;
                    model.enemy.y = 390;
                    model.enemy.x+=100;
                    model.enemy.loadTexture("captain");
                    model.enemy.tint = 0xffffff;
                    var tw2 = game.add.tween(model.enemy).to({x:'-100',alpha:1},600,Phaser.Easing.Linear.None,true);
                    tw2.onComplete.add(function(){model.town.conversation = "pirateconv5";},this);
            break;
            case G.SUMMONCOOK:
                model.pause = true;
                    eventDispatcher.dispatch(G.SETENEMY,{
                        x:580,
                        y:390,
                        sprite:"cook",
                        hp:80,
                        str:1,
                        speed:1.5,
                        escaleX:2.7,
                        escaleY:2.7,
                        reward:0,
                        xpreward:0,
                        attacks:["berserk","fourbasic","estun"],
                        name:"Daniel Taylor"
                    });
                    model.over = false;
                    model.enemyHealthbar.setPercent(model.ehp/model.emaxhp*100);
                    model.enemyHealthbarText.text = model.ehp+"/"+model.emaxhp;
                    model.enemy.y-=200;
                    model.enemy.x+=100;
                    model.enemy.loadTexture("cook");
                    model.enemy.tint = 0xffffff;
                    model.enemy.frozen = false;
                    eventDispatcher.dispatch(G.PLAY_SOUND,"jump");
                    var tw = game.add.tween(model.enemy).to({y:'+205',x:'-100',alpha:1},300,Phaser.Easing.Linear.None,true);
                    tw.onComplete.add(function(){model.town.conversation = "pirateconv3";},this);
            break;
            case G.ENEMYHEAL:
                model.enemy.tint = 0x00ff00;
                eventDispatcher.dispatch(G.PLAY_SOUND,"revive");
                model.ehp = model.emaxhp;
                model.enemyHealthbar.setPercent(model.ehp/model.emaxhp*100);
                model.enemyHealthbarText.text = model.ehp+"/"+model.emaxhp;
                model.ecounter = 0;
                model.emod--;
                game.time.events.add(500, function(){
                    model.enemy.tint = 0xffffff;
                },this);
            break;
            case G.ENEMYHEAL2:
                model.enemy.tint = 0x00ff00;
                eventDispatcher.dispatch(G.PLAY_SOUND,"revive");
                model.ehp = model.emaxhp;
                model.enemyHealthbar.setPercent(model.ehp/model.emaxhp*100);
                model.enemyHealthbarText.text = model.ehp+"/"+model.emaxhp;
                model.ecounter = 0;
                model.emod++;
                game.time.events.add(500, function(){
                    model.enemy.tint = 0xffffff;
                },this);
            break;
            case G.ENEMYHEAL3:
                model.enemy.tint = 0x00ff00;
                eventDispatcher.dispatch(G.PLAY_SOUND,"revive");
                model.ehp = model.emaxhp;
                model.enemyHealthbar.setPercent(model.ehp/model.emaxhp*100);
                model.enemyHealthbarText.text = model.ehp+"/"+model.emaxhp;
                model.ecounter = 0;
                model.emod = 0;
                game.time.events.add(500, function(){
                    model.enemy.tint = 0xffffff;
                },this);
            break;
            case G.LANDORHEAL:
                model.enemy.tint = 0x00ff00;
                eventDispatcher.dispatch(G.PLAY_SOUND,"revive");
                if(model.ehp+500>model.emaxhp)
                model.ehp = model.emaxhp;
                else model.ehp+=500;
                model.enemyHealthbar.setPercent(model.ehp/model.emaxhp*100);
                model.enemyHealthbarText.text = model.ehp+"/"+model.emaxhp;
                model.ecounter = 0;
                model.emod = 0;
                game.time.events.add(500, function(){
                    model.enemy.tint = 0xffffff;
                },this);
            break;
            case G.ENEMYSHIELD:
                eventDispatcher.dispatch(G.PLAY_SOUND,"shieldup");
                model.eshieldup = true;
                var shield = game.add.sprite(model.enemy.x,model.enemy.y,"shield2");
                shield.anchor.set(0.5,0.5);
                shield.scale.set(3.5,3.5);
                shield.animations.add('up',[0,2,4,6,8,10,12,14,16,18,20,22,24,26,28]);
                shield.animations.play('up',40);
                shield.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                model.ecounter = 0;
                model.emod++;
                game.time.events.add(401, function(){
                    model.ecasting = false;
                    shield.animations.add('burn',[24,25,26,27]);
                    shield.animations.play('burn',20,true);
                },this);
                game.time.events.add(3000, function(){
                    shield.animations.stop(null, true);
                    shield.destroy();
                    model.eshieldup = false;
                },this);
            break;
            case G.ENEMYSHIELDBIG:
                eventDispatcher.dispatch(G.PLAY_SOUND,"shieldup");
                model.eshieldup = true;
                var shield = game.add.sprite(model.enemy.x,model.enemy.y,"shield2");
                shield.tint = 0xaaaaff;
                shield.anchor.set(0.5,0.5);
                shield.scale.set(3.5,3.5);
                shield.animations.add('up',[0,2,4,6,8,10,12,14,16,18,20,22,24,26,28]);
                shield.animations.play('up',40);
                shield.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                model.ecounter = 0;
                model.emod++;
                game.time.events.add(401, function(){
                    model.ecasting = false;
                    shield.animations.add('burn',[24,25,26,27]);
                    shield.animations.play('burn',20,true);
                },this);
                game.time.events.add(5000, function(){
                    shield.animations.stop(null, true);
                    shield.destroy();
                    model.eshieldup = false;
                },this);
            break;
            case G.ESTUN:
                model.ecounter = 0;
                eventDispatcher.dispatch(G.PLAY_SOUND,"jump");
                var tw = game.add.tween(model.enemy).to( { x: '-120',y:'-100' }, 150, Phaser.Easing.Linear.None, true);
                tw.onComplete.add(function(){
                    var twdown = game.add.tween(model.enemy).to( { y:'+100' }, 150/2, Phaser.Easing.Linear.None, true);
                    twdown.onComplete.add(function(){
                        var twre = game.add.tween(model.enemy).to( { x:'+120' }, 150, Phaser.Easing.Linear.None, true);
                        game.camera.shake(0.02,300);
                        eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
                        model.emod--;
                        if(model.shieldup == 0)
                        {
                            model.stun = true;
                            eventDispatcher.dispatch(G.PLAYERCASTBREAK);
                            var stunimg = game.add.image(model.player.x,model.player.y-30,"stun");
                            var twstun = game.add.tween(stunimg).to( { angle: '+360'}, 1200, Phaser.Easing.Linear.None, true).loop(true);
                            stunimg.anchor.set(0.5,0.5);
                            game.time.events.add(2000, function(){
                                stunimg.destroy();
                                model.stun = false;
                            },this);
                        }
                        eventDispatcher.dispatch(G.PLAYERHURT,model.estr*2);
                    });
                });
            break;
            case G.ESTUN2:
                model.ecounter = 0;
                eventDispatcher.dispatch(G.PLAY_SOUND,"jump");
                var tw = game.add.tween(model.enemy).to( { x: '-120',y:'-100' }, 150, Phaser.Easing.Linear.None, true);
                tw.onComplete.add(function(){
                    var twdown = game.add.tween(model.enemy).to( { y:'+100' }, 150/2, Phaser.Easing.Linear.None, true);
                    twdown.onComplete.add(function(){
                        var twre = game.add.tween(model.enemy).to( { x:'+120' }, 150, Phaser.Easing.Linear.None, true);
                        game.camera.shake(0.02,300);
                        eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
                        model.emod++;
                        if(model.shieldup == 0)
                        {
                            model.stun = true;
                            eventDispatcher.dispatch(G.PLAYERCASTBREAK);
                            var stunimg = game.add.image(model.player.x,model.player.y-30,"stun");
                            var twstun = game.add.tween(stunimg).to( { angle: '+360'}, 1200, Phaser.Easing.Linear.None, true).loop(true);
                            stunimg.anchor.set(0.5,0.5);
                            game.time.events.add(2000, function(){
                                stunimg.destroy();
                                model.stun = false;
                            },this);
                        }
                        eventDispatcher.dispatch(G.PLAYERHURT,model.estr*2);
                        
                    });
                });
            break;
            case G.ESTUN4:
                model.ecounter = 0;
                eventDispatcher.dispatch(G.PLAY_SOUND,"jump");
                var tw = game.add.tween(model.enemy).to( { x: '-120',y:'-100' }, 150, Phaser.Easing.Linear.None, true);
                tw.onComplete.add(function(){
                    var twdown = game.add.tween(model.enemy).to( { y:'+100' }, 150/2, Phaser.Easing.Linear.None, true);
                    twdown.onComplete.add(function(){
                        var twre = game.add.tween(model.enemy).to( { x:'+120' }, 150, Phaser.Easing.Linear.None, true);
                        game.camera.shake(0.02,300);
                        eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
                        model.emod++;
                        if(model.shieldup == 0)
                        {
                            model.stun = true;
                            eventDispatcher.dispatch(G.PLAYERCASTBREAK);
                            var stunimg = game.add.image(model.player.x,model.player.y-30,"stun");
                            var twstun = game.add.tween(stunimg).to( { angle: '+360'}, 1200, Phaser.Easing.Linear.None, true).loop(true);
                            stunimg.anchor.set(0.5,0.5);
                            game.time.events.add(3000, function(){
                                stunimg.destroy();
                                model.stun = false;
                            },this);
                        }
                        eventDispatcher.dispatch(G.PLAYERHURT,model.estr*2);
                        
                    });
                });
            break;
            case G.ESTUN3:
                model.ecounter = 0;
                eventDispatcher.dispatch(G.PLAY_SOUND,"jump");
                var tw = game.add.tween(model.enemy).to( { x: '-120',y:'-100' }, 150, Phaser.Easing.Linear.None, true);
                tw.onComplete.add(function(){
                    var twdown = game.add.tween(model.enemy).to( { y:'+100' }, 150/2, Phaser.Easing.Linear.None, true);
                    twdown.onComplete.add(function(){
                        var twre = game.add.tween(model.enemy).to( { x:'+120' }, 150, Phaser.Easing.Linear.None, true);
                        game.camera.shake(0.02,300);
                        eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
                        model.emod = 0;
                        if(model.shieldup == 0)
                        {
                            model.stun = true;
                            eventDispatcher.dispatch(G.PLAYERCASTBREAK);
                            var stunimg = game.add.image(model.player.x,model.player.y-30,"stun");
                            var twstun = game.add.tween(stunimg).to( { angle: '+360'}, 1200, Phaser.Easing.Linear.None, true).loop(true);
                            stunimg.anchor.set(0.5,0.5);
                            game.time.events.add(2000, function(){
                                stunimg.destroy();
                                model.stun = false;
                            },this);
                        }
                        eventDispatcher.dispatch(G.PLAYERHURT,model.estr*2);
                        
                    });
                });
            break;
            case G.PIRATESHOOT:
                var tw = game.add.tween(model.enemy).to({x:'+20'},80,Phaser.Easing.Linear.None,true);
                tw.yoyo(true,10);
                model.enemy.tint = 0xffffff;
                game.time.events.add(70, function(){
                    model.enemy.tint = 0xffffff;
                    
                    new Ripple(model.enemy.x-50,model.enemy.y+10,5,10,0xffffff); //gun smoke 
                    var bullet = game.add.sprite(model.enemy.x,10+model.enemy.y,"bullet");
                    bullet.anchor.set(0.5,0.5);
                    bullet.scale.set(-2,2);
                    bullet.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                    var twbullet = game.add.tween(bullet).to({x:model.player.x},500,Phaser.Easing.Linear.None,true);
                    eventDispatcher.dispatch(G.PLAY_SOUND,"gunshot");
                
                
                    twbullet.onComplete.add(function(){
                        eventDispatcher.dispatch(G.PLAYERHURT,model.estr*2);
                        bullet.destroy();
                        eventDispatcher.dispatch(G.PLAY_SOUND,"critsound");
                    },this);
                });
                    model.ecounter = 0;
            break;
            case G.ENEMYHURT:
                var rand = Math.floor(Math.random() * 100) + 1;
                var dmg = params;
                if(rand <= model.crit)
                {
                    eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
                    var crittext = game.add.text(400,300,"CRITICAL!", { font: "bold 30px 'Press Start 2P'", fill: "#f00",align:'right'});
                    crittext.anchor.set(0.5,0.5);
                    var tween = game.add.tween(crittext).to( { alpha: 0, y:'-60' }, 1000,Phaser.Easing.Linear.None,true);
                    var tween2 = game.add.tween(crittext.scale).to( { x:'+0.3', y:'+0.3' }, 1000,Phaser.Easing.Linear.None,true);
                    tween.onComplete.add(function(){
                        crittext.destroy();
                    },this);
                    var xptext 
                    dmg*=model.critdmg;
                    game.camera.flash(0xffffff, 50);
                    game.camera.shake(0.05, 200);
                }
                model.ehp -=Math.ceil(dmg);
                model.enemyHealthbar.setPercent(model.ehp/model.emaxhp*100);
                model.enemyHealthbarText.text = model.ehp+"/"+model.emaxhp;
                eventDispatcher.dispatch(G.PLAY_SOUND,"hit");
                if(model.ename == "John Black" && model.ehp<=(model.emaxhp/2))
                {
                    model.town.conversation = "pirateconv1";
                    model.pause = true;
                    model.emod=2;
                    model.esavedhp = model.ehp;
                    model.espeed=100;
                }
                if(model.ename == "swbattle necro")
                {
                    switch (model.necrocounter) {
                        case 0:
                            model.town.conversation = "swbattle7";
                            model.necrocounter++;
                            break;
                        case 1: 
                            model.town.conversation = "swbattle8";
                            model.necrocounter++;
                            break;
                        case 2:
                            model.town.conversation = "swbattle9";
                            break;
                        default:
                            break;
                    }
                }
                else if(model.ename == "The Necromancer"||model.ename == "The Necromancer2")
                {
                    //necromod 0ról->1re csonti, 1ről->2re bloodhead, 2ről->3ra csápi 
                    if(model.ehp<=2000) 
                    {
                        if(model.necromod < 1)
                        {
                            model.ecounter = 98;
                            if(model.ecasting) eventDispatcher.dispatch(G.ENEMYCASTBREAK);
                            model.emod = 4;
                            model.necromod = 1;
                        }
                        if(model.ehp<=1500) 
                        {
                            if(model.necromod < 2)
                            {
                                model.ecounter = 98;
                                if(model.ecasting) eventDispatcher.dispatch(G.ENEMYCASTBREAK);
                                model.emod = 4;
                                model.necromod = 2;
                            }
                            if(model.ehp<=1000)
                            {
                                if(model.necromod < 3)
                                {
                                    model.ecounter = 98;
                                    if(model.ecasting) eventDispatcher.dispatch(G.ENEMYCASTBREAK);
                                    model.emod = 4;
                                    model.necromod = 3;
                                }
                            }
                        }
                    }
                }
                else if(model.ename == "Landor")
                {
                    if(model.ehp<model.emaxhp/2 && model.landormod == 1)
                    {
                        model.landormod = 2;
                        eventDispatcher.dispatch(G.EBERSERK);
                        model.emod = 0;
                        model.eattacks = ["tribasic","lionstrike2","tribasic","estun2","landorheal"];
                    }
                }
                if(model.ehp <= 0)
                {
                    if(model.hp>0)
                    {
                        if(model.ename == "The Necromancer"||model.ename == "The Necromancer2")
                        {
                            eventDispatcher.dispatch(G.ENEMYCASTBREAK);
                            if(model.fireballs!=null)
                            {
                                model.fireballs.forEach(fb => {
                                    fb.destroy();
                                });
                            }
                            if(model.necroultite1!=null) game.time.events.remove(model.necroultite1);
                            if(model.necroultite2!=null) game.time.events.remove(model.necroultite2);
                            if(model.necroultite3!=null) game.time.events.remove(model.necroultite3);
                            if(model.necroultite4!=null) game.time.events.remove(model.necroultite4);
                            model.town.conversation = "necrobattle4";
                        }
                        else if(model.ename == "swbattle necro")
                        {
                            model.ehp = 1;
                        }
                        else{
                            eventDispatcher.dispatch(G.ENEMYCASTBREAK);
                            eventDispatcher.dispatch(G.ENEMYDIE);      
                        }
                    }
                }
                
                break;
            case G.ENEMYDIE:
               
                model.pause = true;
                model.over = true;
                model.ecasting = false;
                model.enemy.frozen = false;
                model.eberserk = false;
                eventDispatcher.dispatch(G.PLAY_SOUND,"enemydie");               
                var tween = game.add.tween(model.enemy).to( { alpha: 0 }, 850, Phaser.Easing.Bounce.Out, true);
                tween.onComplete.add(function(){
                    if(model.hp>0)
                    {
                        if(model.ename == "Mr. Miller")
                        {
                            eventDispatcher.dispatch(G.SUMMONCOOK);
                        }
                        else if(model.ename == "Daniel Taylor")
                        {
                            eventDispatcher.dispatch(G.SUMMONPIRATE2);
                        }
                        else if(model.ename == "Mr. Wilson")
                        {
                            eventDispatcher.dispatch(G.CAPTAINBACK);
                        }
                        else if(model.ename == "Attila the Hen")
                        {
                            eventDispatcher.dispatch(G.BRONZE2);
                        }
                        else if(model.ename == "Thilagorn")
                        {
                            eventDispatcher.dispatch(G.BRONZE3);
                        }
                        else if(model.ename == "Arctic")
                        {
                            eventDispatcher.dispatch(G.SILVER2);
                        }
                        else if(model.ename == "Sir Harold")
                        {
                            eventDispatcher.dispatch(G.SILVER3);
                        }
                        else if(model.ename == "Mr. Ork")
                        {
                           model.pause = true;
                           model.town.conversation = "silver4";
                        }
                        else if(model.ename == "John Black"||model.ename=="John Black2")
                        {
                            model.pause = true;
                            model.town.conversation = "pirateconv6";
                        }
                        else if(model.ename == "MtUndead")
                        {
                            model.pause = true;
                            model.town.conversation = "mtbattle1";
                        }
                        else if(model.ename == "Shaman Morgzor")
                        {
                            model.pause = true;
                            game.camera.fade(0x000000, 1000);
                            game.camera.onFadeComplete.add(function(){
                                game.camera.onFadeComplete.removeAll();
                                eventDispatcher.dispatch(G.WIN,{titleText:"Morgzor Defeated!",xp:8,gold:8,relic:"Demon Eye",destination:{map:"gw",x:5,y:0},quest:2,objective:0});
                            },this);
                            game.time.events.add(1000, function(){
                                game.camera.onFadeComplete.removeAll();
                                eventDispatcher.dispatch(G.WIN,{titleText:"Morgzor Defeated!",xp:8,gold:8,relic:"Demon Eye",destination:{map:"gw",x:5,y:0},quest:2,objective:0});
                            },this);
                        }
                        else if(model.ename == "Lucas")
                        {
                            model.pause = true;
                            model.town.conversation = "bronze4"
                        }
                        else if(model.ename == "Landor")
                        {
                            model.pause = true;
                            model.town.conversation = "gold2"
                        }
                        else if(model.ename == "Murgurath")
                        {
                            model.pause = true;
                            game.camera.fade(0x000000, 1000);
                            game.camera.onFadeComplete.add(function(){
                                game.camera.onFadeComplete.removeAll();
                                eventDispatcher.dispatch(G.WIN,{titleText:"Murgurath Defeated!",xp:10,gold:10,relic:"Demon Tentacle",destination:{map:"wf",x:3,y:0},quest:2,objective:2});
                            },this);
                            game.time.events.add(1000, function(){
                                game.camera.onFadeComplete.removeAll();
                                eventDispatcher.dispatch(G.WIN,{titleText:"Murgurath Defeated!",xp:10,gold:10,relic:"Demon Tentacle",destination:{map:"wf",x:3,y:0},quest:2,objective:2});
                            },this);
                        }
                        else if(model.ename == "Bloodhead")
                        {
                            model.towns.sw2.npcs[1].x = -1000;
                            model.towns.sw5.npcs[0].msg = "You saved the city!\nI guess we owe you one.";
                            model.towns.sw5.npcs[1].sprite = "lucas2";
                            model.towns.sw5.npcs[1].msgspr = "lucas2";
                            model.towns.sw5.npcs[1].msg = "I lost my eye during the battle.";
                            model.towns.sw5.npcs[2].msg = "We must train harder than ever!";
                         /*   model.ulti2 = 1;
                            model.popuping = true;
                            model.topopup = {text1:"New Skill unlocked!",text2:"Now you can use Shadow Form during battle!",icon:"bookicon3"};*/

                            
                            model.pause = true;
                            game.camera.fade(0x000000, 1000);
                            game.camera.onFadeComplete.add(function(){
                                game.camera.onFadeComplete.removeAll();
                                model.towns.sw5.conversation = "swbattleafter";
                                eventDispatcher.dispatch(G.WIN,{titleText:"Sunwell City has been saved!",xp:8,gold:8,relic:"Head Smasher",destination:{map:"sw",x:4,y:0},quest:4,objective:0});
                            },this);
                            game.time.events.add(1000, function(){
                                game.camera.onFadeComplete.removeAll();
                                model.towns.sw5.conversation = "swbattleafter";
                                eventDispatcher.dispatch(G.WIN,{titleText:"Sunwell City has been saved!",xp:8,gold:8,relic:"Head Smasher",destination:{map:"sw",x:4,y:0},quest:4,objective:0});
                            },this);
                        }
                        else if(model.ename == "skeleton")
                        {
                            model.pause = true;
                            model.over = false;
                            var twhp1 =  game.add.tween(model.enemyHealthbar.bgSprite).to( { alpha: 0 }, 600, "Linear", true);
                            var twhp2 =  game.add.tween(model.enemyHealthbar.barSprite).to( { alpha: 0 }, 600, "Linear", true);
                            var twhp3 =  game.add.tween(model.enemyHealthbar.borderSprite).to( { alpha: 0 }, 600, "Linear", true);
                            var twhp4 =  game.add.tween(model.enemyHealthbarText).to( { alpha: 0 }, 600, "Linear", true);
                            game.time.events.add(600,function(){
                                eventDispatcher.dispatch(G.SETENEMY,{
                                    x:580,
                                    y:396,
                                    sprite:"necro",
                                    hp:2500,
                                    str:10,
                                    speed:0.7,
                                    escaleX:-3,
                                    escaleY:3,
                                    reward:12,
                                    xpreward:10,
                                    attacks:["necrofire","necrofire","necrofire","necroulti1","necrofrost","necrosummon"],
                                    name:"The Necromancer"
                                  });
                                
                                model.ehp = model.esavedhp;
                                model.enemyHealthbarText.text = model.esavedhp+"/"+model.emaxhp;
                                model.enemy.loadTexture("necro");
                                model.enemy.tint = 0xffffff;
                                model.enemy.scale.x = -3;
                                model.enemy.scale.y = 3;
                                model.enemy.y = 396;
                                var tw1 = game.add.tween(model.necrosprite).to( { alpha: 0 }, 600, "Linear", true);
                                new Ripple(model.necrosprite.x,model.necrosprite.y,50,200,0x000000);
                                eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
                                var twhp1 =  game.add.tween(model.necroHealthbar.bgSprite).to( { alpha: 0 }, 600, "Linear", true);
                                var twhp2 =  game.add.tween(model.necroHealthbar.barSprite).to( { alpha: 0 }, 600, "Linear", true);
                                var twhp3 =  game.add.tween(model.necroHealthbar.borderSprite).to( { alpha: 0 }, 600, "Linear", true);
                                var twhp4 =  game.add.tween(model.necroHealthbarText).to( { alpha: 0 }, 600, "Linear", true);
                                tw1.onComplete.add(function(){
                                    var retwhp1 =  game.add.tween(model.enemyHealthbar.bgSprite).to( { alpha: 1 }, 600, "Linear", true);
                                    var retwhp2 =  game.add.tween(model.enemyHealthbar.barSprite).to( { alpha: 1 }, 600, "Linear", true);
                                    var retwhp3 =  game.add.tween(model.enemyHealthbar.borderSprite).to( { alpha: 1 }, 600, "Linear", true);
                                    var retwhp4 =  game.add.tween(model.enemyHealthbarText).to( { alpha: 1 }, 600, "Linear", true);
                                    model.enemyHealthbar.barSprite.width = model.ehp/model.emaxhp*120;
                                    var tw2 = game.add.tween(model.enemy).to( { alpha: 1 }, 600, "Linear", true);
                                    new Ripple(model.enemy.x,model.enemy.y,50,200,0x000000);
                                    eventDispatcher.dispatch(G.PLAY_SOUND,"teleport");
                                    tw2.onComplete.add(function(){
                                        if(model.necromod == 1) model.town.conversation = "necrobattle1";
                                        else if(model.necromod < 5&&!model.shadowform){
                                            model.pause = true;
                                            model.esavedhp = model.ehp;
                                            mediaManager.backgroundMusic.stop();
                                            eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
                                            game.camera.flash(0x000000, 500);
                                            game.camera.shake(0.05, 500);
                                            game.time.events.add(1000, function(){
                                                eventDispatcher.dispatch(G.PLAY_SOUND,"encounter");
                                                game.camera.fade(0x000000, 1000);
                                                game.time.events.add(1000, function(){
                                                    eventDispatcher.dispatch(G.SETENEMY,{
                                                        x:580,
                                                        y:390,
                                                        sprite:"shadowform",
                                                        hp:150000,
                                                        str:3,
                                                        speed:1,
                                                        escaleX:-2.7,
                                                        escaleY:2.7,
                                                        reward:12,
                                                        xpreward:10,
                                                        attacks:[],
                                                        name:"???"
                                                    });
                                                    model.map = model.maps.todboss3;
                                                    model.currX = model.map.startX;
                                                    model.currY = model.map.startY;
                                                    mediaManager.setBackgroundMusic(model.map.bgmusic);
                                                    game.state.start("StateMain");                 
                                                },this);
                                            },this);
                                        }
                                        else
                                        {
                                            model.pause = false;
                                        }
                                    });
                                    
                                });
                               
                           });

                        }
                        else if(model.ename == "The Necromancer"||model.ename == "The Necromancer2")
                        {
                            eventDispatcher.dispatch(G.ENEMYCASTBREAK);
                            mediaManager.setBackgroundMusic("");
                            model.pause = true;
                            model.over = false;
                            var twhp1 =  game.add.tween(model.enemyHealthbar.bgSprite).to( { alpha: 0 }, 600, "Linear", true);
                            var twhp2 =  game.add.tween(model.enemyHealthbar.barSprite).to( { alpha: 0 }, 600, "Linear", true);
                            var twhp3 =  game.add.tween(model.enemyHealthbar.borderSprite).to( { alpha: 0 }, 600, "Linear", true);
                            var twhp4 =  game.add.tween(model.enemyHealthbarText).to( { alpha: 0 }, 600, "Linear", true);
                            model.town.conversation = "necrobattle5";
                            model.towns.mt03.conversation = "";                            
                        }
                        else
                        {   
                            model.startpos = model.player.x;
                            model.enemy.destroy();
                            if(model.enemy.key=="golvon")
                            {
                                model.town.conversation = "tofend"
                            }
                            var p = model.map.map[model.currY][model.currX];
                            eventDispatcher.dispatch(G.LOADTOWN,p);
                            model.town.enemies[0].alive = false;
                            mediaManager.soundArray["casting"].stop();
                            model.rewarding = true;
                            game.state.start("StateTown");
                        }
                    }
                }, this);  
                break;
            case G.REWARD:
                var gtext = game.add.text(model.player.x, model.player.y-model.player.height/2, "+"+Math.ceil(params.gold*model.goldgain), { font: "bold 12px 'Press Start 2P'", fill: "#ff0",align:'right'});
                gtext.anchor.set(0.5,0.5);
                var tween = game.add.tween(gtext).to( { alpha: 0, y:'-30' }, 2000,Phaser.Easing.Linear.None,true);
                tween.onComplete.add(function(){
                    gtext.destroy();
                },this);
                var xptext = game.add.text(model.player.x, model.player.y-model.player.height/2-16, "+"+Math.ceil(params.xp*model.xpgain), { font: "bold 12px 'Press Start 2P'", fill: "#000",align:'right'});
                xptext.anchor.set(0.5,0.5);
                var tween = game.add.tween(xptext).to( { alpha: 0, y:'-30' }, 2000,Phaser.Easing.Linear.None,true);
                tween.onComplete.add(function(){
                    xptext.destroy();
                },this);
                model.cash+=Math.ceil(params.gold*model.goldgain);
                model.townGoldText.text = "Gold: "+model.cash;
                if(model.level<model.maxlvl)
                {
                    model.xp+=Math.ceil(params.xp*model.xpgain);
                    if(120 *(model.xp/model.xptonextlv[model.level])<=120)
                    model.townXpbar.barSprite.width = 120 *(model.xp/model.xptonextlv[model.level]);
                    else 
                    model.townXpbar.barSprite.width = 120;
                    model.townXpbarText.text = model.xp+"/"+model.xptonextlv[model.level];
                    if(model.xptonextlv[model.level]<=model.xp&&!model.msgup&&model.level<model.maxlvl)
                    {
                        eventDispatcher.dispatch(G.LEVELUP);
                    }
                }
                saveData();
                model.rewarding = false;
                break;
            case G.PLAYERHURT:
            if(model.shieldup == 0)
            {
                var rand = Math.floor(Math.random()*7)+3;
                var ripple = new Sparks(model.player.x,model.player.y,rand,0xff0000);
                model.hp -=params;
                model.playerHealthbar.setPercent(model.hp/model.maxhp*100);
                model.playerHealthbarText.text = model.hp+"/"+model.maxhp;
                eventDispatcher.dispatch(G.PLAY_SOUND,"hit2");
            }
            else
            {
                model.shieldup--;
                if(model.shieldup==0&&model.shieldspr!=null)
                {
                     model.shieldcd = model.cdTime*5;
                     model.shieldspr.animations.stop(null, true);
                     model.shieldspr.destroy();
                }
                eventDispatcher.dispatch(G.PLAY_SOUND,"hit3");
            }
                if(model.hp <=0)
                {
                    model.pause = true;
                    eventDispatcher.dispatch(G.PLAY_SOUND,"playerdie");
                    eventDispatcher.dispatch(G.PLAYERCASTBREAK);
                    var tween = game.add.tween(model.player).to( { alpha: 0 }, 750, Phaser.Easing.Bounce.Out, true);
                    var tween2 = game.add.tween(model.staff).to( { alpha: 0 }, 750, Phaser.Easing.Bounce.Out, true);
                    tween.onComplete.add(function(){
                        
                        model.currX = model.map.startX;
                        model.currY = model.map.startY;
                        eventDispatcher.dispatch(G.LOADTOWN,model.town = model.map.map[model.currY][model.currX]);
                     for(var i = 0; i<model.map.map.length; i++)
                     {
                        for(var j = 0; j<model.map.map[i].length; j++)
                        {
                            if(model.map.map[i][j]!="")
                            {
                                var p = eval("model.towns."+model.map.map[i][j]);
                                p.enemies.forEach(function(enemy){
                                enemy.alive = true;
                                });
                                p.bonuses.forEach(function(bonus){
                                    bonus.used = false;
                                    });
                            }
                        }
                     }
                        model.hp = model.maxhp;
                        model.energy = model.maxenergy;
                        mediaManager.soundArray["casting"].stop();
                        game.state.start("StateDie");
                    }, this);                            
                }
                break;
                case G.ENEMYCAST:
                    if(!model.ecasting)
                    {
                        model.ecasting = true;
                        if(params.time>=300)
                        {
                            model.enemyCastbar.setPosition(model.enemy.x,model.enemy.y-60);
                            eventDispatcher.dispatch(G.PLAY_SOUND,"ecasting");
                            model.ecastingloop = game.time.events.loop(200, function(){
                                var rand = Math.floor(Math.random() * 10) + 5;
                                var ripple = new Ripple(model.enemy.x,model.enemy.y-model.enemy.height/2+5,rand,50,params.color);
                            }, this);
                            var tw = game.add.tween(model.enemyCastbar.barSprite).to({width:model.enemyCastbar.bgSprite.width},params.time,Phaser.Easing.Linear.None,true);
                        }                  
                                model.ecastingtimeevent = game.time.events.add(params.time+50,function(){
                                    model.enemyCastbar.setPosition(-1000,model.enemy.y-60);
                                    model.enemyCastbar.barSprite.width = 0;
                                    // ecasting.animations.stop(null, true);
                                    game.time.events.remove(model.ecastingloop);
                                    mediaManager.soundArray["ecasting"].stop();
                                    switch(params.skillname)
                                    {
                                    
                                        case "enemyheal":
                                            eventDispatcher.dispatch(G.ENEMYHEAL);
                                            break;
                                        case "enemyheal2":
                                            eventDispatcher.dispatch(G.ENEMYHEAL2);
                                            break;
                                        case "enemyheal3":
                                            eventDispatcher.dispatch(G.ENEMYHEAL3);
                                        case "landorheal":
                                            eventDispatcher.dispatch(G.LANDORHEAL);
                                            break;
                                        case "enemyshield":
                                            eventDispatcher.dispatch(G.ENEMYSHIELD);
                                            break;
                                        case "eulti1":
                                            eventDispatcher.dispatch(G.EULTI1);
                                            break;
                                        case "eulti2":
                                            eventDispatcher.dispatch(G.EULTI2);
                                            break;
                                        case "transform":
                                            eventDispatcher.dispatch(G.TRANSFORM);
                                            break;
                                        case "selfexplode":
                                            eventDispatcher.dispatch(G.SELFEXPLODE);
                                            break;
                                        case "darkbolt":
                                            eventDispatcher.dispatch(G.DARKBOLT);
                                            break;
                                        case "necroulti1":
                                            eventDispatcher.dispatch(G.NECROULTI1);
                                            break;
                                    }
                                    model.ecasting = false;
                                });
                    }
                break;
                case G.ENEMYCASTBREAK:
                    if(model.ecasting)
                    {
                        model.ecounter = 0;
                        model.ecasting = false;
                        model.emod=0;
                        game.time.events.remove(model.ecastingtimeevent);
                        game.time.events.remove(model.ecastingloop);
                        model.enemyCastbar.setPosition(-1000,model.enemy.y-60);
                        game.tweens.removeFrom(model.enemyCastbar.barSprite);
                        model.enemyCastbar.barSprite.width = 0;
                        mediaManager.soundArray["ecasting"].stop();
                    }
                break;
                case G.PLAYERCASTBREAK:
                    if(model.casting)
                    {
                        model.casting = false;
                        game.time.events.remove(model.playercastingsound);
                        game.time.events.remove(model.playercasting);
                        model.playerCastbar.setPosition(-1000,model.player.y-60);
                        game.tweens.removeFrom(model.playerCastbar.barSprite);
                        model.playerCastbar.barSprite.width = 0;
                        mediaManager.soundArray["casting"].stop();
                    }
                break;
                case G.EULTI1:
                model.ultipause = true;
                eventDispatcher.dispatch(G.PLAY_SOUND,"ulti1");
              /*  var ulti1 = game.add.sprite(300,model.player.y-90,"ulti1");
                ulti1.anchor.set(0.5,0.5);
                ulti1.scale.set(4,4);
                ulti1.animations.add('burn',[36,34,32,30,28,27,25,23,22,20,18,16,14,12,10,8,6,4,2,0]);
                ulti1.animations.play('burn',15);
                ulti1.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        
                var ulti2 = game.add.sprite(300-95,model.player.y,"ulti1");
                ulti2.anchor.set(0.5,0.5);
                ulti2.scale.set(4,4);
                ulti2.angle-=90;
                ulti2.animations.add('burn',[36,34,32,30,28,27,25,23,22,20,18,16,14,12,10,8,6,4,2,0]);
                ulti2.animations.play('burn',15);
                ulti2.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        
                
                var ulti3 = game.add.sprite(300,model.player.y+90,"ulti1");
                ulti3.anchor.set(0.5,0.5);
                ulti3.scale.set(4,4);
                ulti3.angle-=180;
                ulti3.animations.add('burn',[36,34,32,30,28,27,25,23,22,20,18,16,14,12,10,8,6,4,2,0]);
                ulti3.animations.play('burn',15);
                ulti3.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;*/
        
                model.ecasting = false;
                model.emod++;

                var ulti4 = game.add.sprite(300+95,model.player.y,"ulti1");
                ulti4.anchor.set(0.5,0.5);
                ulti4.scale.set(4,4);
                ulti4.angle+=90;
                ulti4.animations.add('burn',[36,34,32,30,28,27,25,23,22,20,18,16,14,12,10,8,6,4,2,0]);
                ulti4.animations.play('burn',15);
                ulti4.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        
                game.time.events.add(1000, function(){
                    game.camera.flash(0xffffff, 500);
                    game.camera.shake(0.05, 500);
        
                    var exp = game.add.sprite(300,model.player.y,"ulti1explosion");
                    exp.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                    exp.anchor.set(0.5,0.5);
                    exp.scale.set(4,4);
                    exp.angle-=45;
                    exp.animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66]);
                    exp.animations.play('burn',20);
                    eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
                    eventDispatcher.dispatch(G.PLAYERHURT,model.estr*5);
                    
                    model.ultipause = false;
                    
                },this);
                break;
                case G.EULTI2:
                model.ultipause = true;
                eventDispatcher.dispatch(G.PLAY_SOUND,"ulti1");
                var ulti1 = game.add.sprite(300,model.player.y-90,"ulti1");
                ulti1.anchor.set(0.5,0.5);
                ulti1.scale.set(4,4);
                ulti1.animations.add('burn',[36,34,32,30,28,27,25,23,22,20,18,16,14,12,10,8,6,4,2,0]);
                ulti1.animations.play('burn',15);
                ulti1.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        
                var ulti2 = game.add.sprite(300-95,model.player.y,"ulti1");
                ulti2.anchor.set(0.5,0.5);
                ulti2.scale.set(4,4);
                ulti2.angle-=90;
                ulti2.animations.add('burn',[36,34,32,30,28,27,25,23,22,20,18,16,14,12,10,8,6,4,2,0]);
                ulti2.animations.play('burn',15);
                ulti2.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        
                
                var ulti3 = game.add.sprite(300,model.player.y+90,"ulti1");
                ulti3.anchor.set(0.5,0.5);
                ulti3.scale.set(4,4);
                ulti3.angle-=180;
                ulti3.animations.add('burn',[36,34,32,30,28,27,25,23,22,20,18,16,14,12,10,8,6,4,2,0]);
                ulti3.animations.play('burn',15);
                ulti3.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        
                model.ecasting = false;
                model.emod = 0;

                var ulti4 = game.add.sprite(300+95,model.player.y,"ulti1");
                ulti4.anchor.set(0.5,0.5);
                ulti4.scale.set(4,4);
                ulti4.angle+=90;
                ulti4.animations.add('burn',[36,34,32,30,28,27,25,23,22,20,18,16,14,12,10,8,6,4,2,0]);
                ulti4.animations.play('burn',15);
                ulti4.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        
                game.time.events.add(1000, function(){
                    game.camera.flash(0xffffff, 500);
                    game.camera.shake(0.05, 500);
        
                    var exp = game.add.sprite(300,model.player.y,"ulti1explosion");
                    exp.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                    exp.anchor.set(0.5,0.5);
                    exp.scale.set(4,4);
                    exp.angle-=45;
                    exp.animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66]);
                    exp.animations.play('burn',20);
                    eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
                    eventDispatcher.dispatch(G.PLAYERHURT,model.estr*10);
                    
                    model.ultipause = false;
                    
                },this);
                break;
            case G.EBERSERK:
                model.espeed *= 2;
                eventDispatcher.dispatch(G.PLAY_SOUND,"frenzy");
                model.eberserk = true;
                model.ecounter = 0;
                model.emod++;
                break;
            case G.TRANSFORM:
                model.pause = true;
               
                game.camera.flash(0x000000, 500);   
                eventDispatcher.dispatch(G.PLAY_SOUND,"transform");
                model.enemy.tint = 0x000000;
                game.time.events.add(800, function(){
                    if(model.ehp>0){
                    eventDispatcher.dispatch(G.SETENEMY,{
                        x:580,
                        y:390,
                        sprite:"dark4",
                        hp:model.emaxhp,
                        str:model.estr+1,
                        speed:model.espeed,
                        escaleX:3.8,
                        escaleY:3.8,
                        reward:5,
                        xpreward:5,
                        attacks:["twobasic","estun2","berserk","tribasic","lionstrike"]
                    });
                    model.over = false;
                    model.enemyHealthbar.setPercent(model.ehp/model.emaxhp*100);
                    model.enemyHealthbarText.text = model.ehp+"/"+model.emaxhp;
                    model.enemy.loadTexture("dark4");
                    model.enemy.y-=5;
                    }
                },this);
                game.time.events.add(900, function(){
                    model.enemy.tint = 0xffffff;
                    model.pause = false;
                },this);
                break;
            case G.TRANSFORM2:
                model.pause = true;
               
                game.camera.flash(0x000000, 500);   
                eventDispatcher.dispatch(G.PLAY_SOUND,"transform");
                model.enemy.tint = 0x000000;
                game.time.events.add(700, function(){
                    model.over = false;
                    model.enemyHealthbar.setPercent(model.ehp/model.emaxhp*100);
                    model.enemyHealthbarText.text = model.ehp+"/"+model.emaxhp;
                    model.enemy.loadTexture("orb");
                    model.enemy.scale.set(1.2,1.2);
                    var tw = game.add.tween(model.enemy).to( { y: "+10" }, 1000, "Linear", true, 0, -1);
                    tw.yoyo(true, 100);

                    var timeevent = game.time.events.loop(Phaser.Timer.SECOND, function(){
                        new Ripple(model.enemy.x,model.enemy.y,25,100,0x7a2395);
                    }, this);
                },this);
                game.time.events.add(800, function(){
                    model.enemy.tint = 0xffffff;
                },this);
                game.time.events.add(2000, function(){
                    eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
                    game.camera.flash(0x000000, 500);
                    game.camera.shake(0.05, 500);
                },this);
                game.time.events.add(2500, function(){
                    game.camera.fade(0x000000, 1500);
                    game.camera.onFadeComplete.add(function(){
                        game.camera.onFadeComplete.removeAll();
                        eventDispatcher.dispatch(G.WIN,{titleText:"Trial of Darkness Completed!",xp:15,gold:15,relic:"Orb of Darkness",destination:{map:"tod",x:2,y:0},quest:3,objective:0});
                    },this);
                    game.time.events.add(1500, function(){
                        game.camera.onFadeComplete.removeAll();
                        eventDispatcher.dispatch(G.WIN,{titleText:"Trial of Darkness Completed!",xp:15,gold:15,relic:"Orb of Darkness",destination:{map:"tod",x:2,y:0},quest:3,objective:0});
                    },this);
                });
                  
                break;
            case G.SELFEXPLODE:
                eventDispatcher.dispatch(G.PLAY_SOUND,"explode");
                game.camera.flash(0x000000, 500);
                game.camera.shake(0.05, 500);
                eventDispatcher.dispatch(G.PLAYERHURT,model.estr*10);
                model.ecounter = 0;
                model.emod++;
                break;
            case G.DARKBOLT:
                eventDispatcher.dispatch(G.PLAY_SOUND,"berserk");
                var tw = game.add.tween(model.enemy).to({x:'+20'},80,Phaser.Easing.Linear.None,true);
                tw.yoyo(true,10);
                model.enemy.tint = 0xff0000;
                game.time.events.add(70, function(){
                    model.enemy.tint = 0xffffff;
                    var fireball = game.add.sprite(model.enemy.x,model.enemy.y,"fireball2");
                    fireball.anchor.set(0.5,0.5);
                    fireball.scale.set(2,2);
                    fireball.tint = 0x660066;
                    fireball.angle = 90;
                    fireball.animations.add('burn',[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60]);
                    fireball.animations.play('burn',40,true);
                    fireball.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
                    var twfireball = game.add.tween(fireball).to({x:model.player.x},500,Phaser.Easing.Linear.None,true);
                
                    twfireball.onComplete.add(function(){
                        new Ripple(model.player.x,model.player.y,50,150,0xffaa00);
                        model.player.tint = 0xffaa00;
                        eventDispatcher.dispatch(G.PLAYERHURT,model.estr*8);
                        game.time.events.add(100, function(){model.player.tint = 0xffffff;},this);
                        fireball.destroy();
                        eventDispatcher.dispatch(G.PLAY_SOUND,"critsound");
                    },this);
                });
                model.ecounter = 0;
                model.emod ++;
                break;
   
            }
        }
    }
