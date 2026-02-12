function UnityProgress(gameInstance, progress) {
	
	 
	
	
	
	
		
		//gameInstance.progressBar.height = progressFrameImg.height;
		
	//	gameInstance.progress.full.style.width = (100 * progress) + "%";
 // gameInstance.progress.empty.style.width = (100 * (1 - progress)) + "%";
	
  if (!gameInstance.Module)
    return;
  if (!gameInstance.logo) {
    gameInstance.logo = document.createElement("div");
    gameInstance.logo.className = "logo " + gameInstance.Module.splashScreenStyle;
	gameInstance.logo.style.position = "absolute";
    gameInstance.container.appendChild(gameInstance.logo);
	
  }
  if (!gameInstance.progress) {    
    gameInstance.progress = document.createElement("div");
	 gameInstance.progress.style.position = "absolute";
    gameInstance.progress.className = "progress " + gameInstance.Module.splashScreenStyle;
    gameInstance.progress.empty = document.createElement("div");
    gameInstance.progress.empty.className = "empty";
    gameInstance.progress.appendChild(gameInstance.progress.empty);
    gameInstance.progress.full = document.createElement("div");
    gameInstance.progress.full.className = "full";
    gameInstance.progress.appendChild(gameInstance.progress.full);
    gameInstance.container.appendChild(gameInstance.progress);
  }
  
  if (!gameInstance.background) {    
  var background = document.createElement("img");
	background.src = "TemplateData/preloader.png"; 
	background.style.position = "absolute";
	gameInstance.background = background;
	gameInstance.background.style.top = 0 + 'px';
	gameInstance.background.style.left = 0 + 'px';
	gameInstance.background.style.width = gameInstance.offsetWidth + 'px';
	gameInstance.background.style.height = gameInstance.offsetHeight + 'px';
	gameInstance.background.style.display = "inline";
	gameInstance.container.appendChild(background);
  }
	
	
  
  if (!gameInstance.progressframe) {    
  var progressframe = document.createElement("img");
	progressframe.src = "TemplateData/loadingbar.png"; 
	progressframe.style.position = "absolute";
	gameInstance.progressframe = progressframe;
	//gameInstance.progressframe.style.top = 0 + 'px';
	//gameInstance.progressframe.style.left = 0 + 'px';
	gameInstance.progressframe.style.top = 123+ 'px';//0+ (gameInstance.offsetHeight * 0.5) + 'px';
	gameInstance.progressframe.style.left = 316 + 'px';//- (gameInstance.offsetWidth * 0.5) + 'px';
	//gameInstance.progressframe.style.width = gameInstance.offsetWidth + 'px';
	//gameInstance.progressframe.style.height = gameInstance.offsetHeight + 'px';
	gameInstance.progressframe.style.display = "inline";
	gameInstance.container.appendChild(progressframe);
  }
	
		if (!gameInstance.progressbar) {    
	var progressbar = document.createElement("img");
	progressbar.src = "TemplateData/fullbar.png"; 
	progressbar.style.position = "absolute";
	gameInstance.progressbar = progressbar;
	gameInstance.progressbar.style.top = 125+ 'px';
	gameInstance.progressbar.style.left = 318+ 'px';
	//gameInstance.progressbar.style.top = 0 + 'px';
	//gameInstance.progressbar.style.left = 0 + 'px';
	gameInstance.progressbar.style.display = "inline";
	gameInstance.container.appendChild(progressbar);
		}
	
	
	
  gameInstance.progress.full.style.width = (100 * progress) + "%";
  gameInstance.progress.empty.style.width = (100 * (1 - progress)) + "%";
  gameInstance.progressbar.style.width = (20.5 * progress) + "%"
  gameInstance.progressbar.style.height = 24 +'px';
 // gameInstance.progressbar.style.height = (gameInstance.progressframe.style.width * progress) + "%"
  if (progress == 1)
  {
	  //gameInstance.progress.style.display = "none";
	gameInstance.progressbar.style.display  = "none";
	gameInstance.progressframe.style.display = "none";
	gameInstance.background.style.display = "none";
  gameInstance.logo.style.display = gameInstance.progress.style.display = "none";
  }
	//gameInstance.progress.style.display = "none";
	//gameInstance.progressbar.style.display = "none";
	//gameInstance.progressframe.style.display = "none";
	//gameInstance.background.style.display = "none";
	
	/*gameInstance.Update = function() {
		gameInstance.background.style.top = gameInstance.offsetTop + 'px';
		gameInstance.background.style.left = gameInstance.offsetLeft + 'px';
		gameInstance.background.style.width = gameInstance.offsetWidth + 'px';
		gameInstance.background.style.height = gameInstance.offsetHeight + 'px';
	}
	
	gameInstance.Update ();*/
}