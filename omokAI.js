function omokAI (myColor, myStage)
{
	this.color = myColor;
	this.stage = myStage;
	this.w = myStage.getXNum();
	this.h = myStage.getYNum();
	this.myCont2 = [];
	this.myCont3 = [];
	this.myCont4 = [];
}

omokAI.prototype.myTurn = function()
{
	var x;
	var y;

	if(this.stage.getStoneNum() <= 1)
	{
		while(true)
		{
			x = Math.round(Math.random() * (this.w-1));
			y = Math.round(Math.random() * (this.h-1));

			console.log("==> random point ("+x+", "+y+")");

			var stone = this.stage.getStone(x,y);
			if(stone.color == "empty")
			{
				this.stage.addStone(x, y, this.color);
				this.stage.drawStone(x, y);
				break;
			}
		}
	}
	else
	{
		this.findMyContinueStones();

		for(var p in this.myCount4)
		{
			if(p.direct == 1 && p.x > 0)
			{
				x = p.x-1;
				y = p.y;

				var stone = this.stage.getStone(x, y);
				if(stone.color == "empty")
				{
					this.stage.addStone(x, y, this.color);
					this.stage.drawStone(x, y);
					break;
				}
			}
		}
	}

	/*for(y=0; y<this.h; y++)
	{
		for(x=0; x<this.w; x++)
		{
			var stone = this.stage.getStone(x, y);
			if()
		}
	}*/
}

omokAI.prototype.findMyContinueStones = function()
{
	var x, y;

	this.myCont2.length = 0;
	this.myCont3.length = 0;
	this.myCont4.length = 0;

	for(y=0; y<this.h; y++) for(x=0; x<this.w; x++)
	{
		var stone = this.stage.getStone(x, y);
		if(stone.color == this.color)
		{
			var contStone = this.getMaxContinueNum(x, y, this.color);
			if(contStone.count == 2)
			{
				this.myCont2.push({ x:x, y:y, direct:contStone.direct });
			}
			else if(contStone.count == 3)
			{
				this.myCont3.push({ x:x, y:y, direct:contStone.direct });
			}
			else if(contStone.count == 4)
			{
				this.myCont3.push({ x:x, y:y, direct:contStone.direct });
			}
		}
	}
}

omokAI.prototype.getMaxContinueNum = function(x, y, myColor)
{
	//  Direction..
	//    6  7  8
	//    5  x  1
	//    4  3  2



	var maxCont = 0;
	var maxDirect = 1;
	
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
		while(stone.color != myColor)
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
			maxDirect = direct;
		}

		/*if(cont > 0)
		{
			console.log("   Direction-"+direct+" : " + cont + ", MaxCont : " + maxCont);
		}*/
	}

	if(maxCont > 0)
	{
		console.log("   Direction-"+maxDirect+"  MaxCont : " + maxCont);
	}

	return { count:maxCont, direct:maxDirect };	
}
