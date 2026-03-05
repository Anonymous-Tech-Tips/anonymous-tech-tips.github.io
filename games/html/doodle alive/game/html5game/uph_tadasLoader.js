function loadingFunction(vGraphics, vWidth, vHeight, vTotal, vCurrent, vLoadingScreen) {
	//Load vars
	var barWidthTot	= vWidth * 0.8;
	var barWidth 	= (vWidth * 0.8 / vTotal) * vCurrent;
	var barHeight 	= 5;
	var barX 		= (vWidth - barWidthTot) / 2;
	var barY		= vHeight / 2 + 90;	
	var textX 		= vWidth / 2;
	var textY 		= vHeight / 2;
	var loadScreen	= vLoadingScreen;
	var icon 		= new Image();

	//Background color
	vGraphics.fillStyle = "#1A1E21";
	vGraphics.fillRect(0, 0, vWidth, vHeight);
	
	//Draw icon
	icon.src = 'html5game/icon.png';	
	vGraphics.drawImage(icon, vWidth/2-16, textY-116);
	
	//Draw text
	vGraphics.font 		= "18px Arial";
	vGraphics.fillStyle = "#F4FEE8";
	vGraphics.textAlign = "center";
	vGraphics.fillText("[ Doodle Alive ]", textX, textY - 60);
	vGraphics.fillText("[ by Tadas Gloom ]", textX, textY - 30);
	vGraphics.fillText("[ Loading... ]", textX, textY);
	vGraphics.fillText("[", barX-10, barY+7);
	vGraphics.fillText("]", barX+barWidthTot+10, barY+7);
	
	//Draw loading bar
	vGraphics.fillStyle = "#F4FEE8";
	vGraphics.barheight = 20;
	vGraphics.fillRect(barX, barY, barWidth, barHeight);
}