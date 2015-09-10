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
			alert("Game Finished. " + this.stage.getStone(lastStone.x, lastStone.y).color + " Win!!!!");
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
	
	if(stone.color != "empty")
	{
		console.log("["+x+","+y+"] = " + stone.color);
	}

	var direct = 1;
	var maxW = this.stage.getXNum();
	var maxH = this.stage.getYNum();

	for(direct = 1; direct<=8; direct++)
	{
		var cont = 0;
		while(stone.color != "empty")
		{ 
			cont ++;
			var nextStone = { color:"empty", order:-1};
			switch(direct)
			{
				case 1 :
					if(x+cont < maxW)
					{
						nextStone = this.stage.getStone(x+cont, y);
					}
					break;
				case 2 :
					if(x+cont < maxW && y+cont < maxH)
					{ 
						nextStone = this.stage.getStone(x+cont, y+cont);
					}
					break;
				case 3 : 
					if(y+cont < maxH)
					{ 
						nextStone = this.stage.getStone(x, y+cont);
					}
					break;
				case 4 :
					if(x-cont >= 0 && y+cont < maxH)
					{  
						nextStone = this.stage.getStone(x-cont, y+cont);
					}
					break;
				case 5 : 
					if(x-cont >=0)
					{ 
						nextStone = this.stage.getStone(x-cont, y);
					}
					break;
				case 6 : 
					if(x-cont >=0 && y-cont >= 0)
					{ 
						nextStone = this.stage.getStone(x-cont, y-cont);
					}
					break;
				case 7 : 
					if(y-cont >= 0)
					{
						nextStone = this.stage.getStone(x, y-cont);
					}
					break;
				case 8 : 
					if(x+cont < maxW && y-cont >= 0)
					{ 
						nextStone = this.stage.getStone(x+cont, y-cont);
					}
					break;						
			}

			if(nextStone.color != stone.color)
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
			//console.log("   Direction-"+direct+" : " + cont + ", MaxCont : " + maxCont);
		}
	}

	return maxCont;	
}

