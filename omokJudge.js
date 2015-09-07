function omokJudge (s)
{
	this.stage = s;
}

omokJudge.prototype.isFinished = function()
{
	var lastStone = this.stage.getLastStone();
	if(lastStone != undefined)
	{
		var continueNum = this.getMaxContinueNum(lastStone.x, lastStone.y);
		if(continueNum >= 5)
		{
			alert("Game Finished. " + this.stage.getStone(lastStone.x, lastStone.y) + " Win!!!!");
			return true;
		}
	}

	return false;
	/*
	var x,y;
	var xMax = this.stage.getXNum();
	var yMax = this.stage.getYNum();
	for(y=0; y<yMax; y++)
	{
		for(x=0; x<xMax; x++)
		{
			var continueNum = this.getMaxContinueNum(x, y);
			if(continueNum >= 5)
			{
				alert("Game Finished. " + this.stage.getStone(x, y) + " Win!!!!");
				return true;
			}
		}
	}

	return false;
	*/
}

omokJudge.prototype.getMaxContinueNum = function(x, y)
{
	//  Direction..
	//    6  7  8
	//    5  x  1
	//    4  3  2



	var maxCont = 0;
	
	var stone = this.stage.getStone(x,y);
	
	if(stone != "empty")
	{
		console.log("["+x+","+y+"] = " + stone);
	}

	var direct = 1;

	for(direct = 1; direct<=8; direct++)
	{
		var cont = 0;
		while(stone != "empty")
		{ 
			cont ++;
			var nextStone = "empty";
			switch(direct)
			{
				case 1 :
					nextStone = this.stage.getStone(x+cont, y);
					break;
				case 2 : 
					nextStone = this.stage.getStone(x+cont, y+cont);
					break;
				case 3 : 
					nextStone = this.stage.getStone(x, y+cont);
					break;
				case 4 : 
					nextStone = this.stage.getStone(x-cont, y+cont);
					break;
				case 5 : 
					nextStone = this.stage.getStone(x-cont, y);
					break;
				case 6 : 
					nextStone = this.stage.getStone(x-cont, y-cont);
					break;
				case 7 : 
					nextStone = this.stage.getStone(x, y-cont);
					break;
				case 8 : 
					nextStone = this.stage.getStone(x+cont, y-cont);
					break;						
			}

			if(nextStone != stone)
			{
				break;
			}
		}

		if(maxCont < cont)
		{
			maxCont = cont;
		}

		if(cont > 0)
		{
			console.log("   Direction-"+direct+" : " + cont + ", MaxCont : " + maxCont);
		}
	}

	return maxCont;	
}

