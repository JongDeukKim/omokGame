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
	var x = -1;
	var y = -1;

	if(this.stage.getStoneNum() <= 0)
	{
		var randPoint = this.calRandomPoint();
		x = randPoint.xPt;
		y = randPoint.yPt;
	}
	else
	{
		var bestPoint = this.calBestPoint_alg2();//this.calBestPoint();
		x = bestPoint.xPt;
		y = bestPoint.yPt;
	}

	this.stage.addStone(x, y, this.color);
	this.stage.drawStone(x, y);
}

omokAI.prototype.calRandomPoint = function()
{
	var x = -1;
	var y = -1;
	while(true)
	{
		x = Math.round(Math.random() * (this.w-1));
		y = Math.round(Math.random() * (this.h-1));

		console.log("==> random point ("+x+", "+y+")");

		var stone = this.stage.getStone(x,y);
		if(stone.color == "empty")
		{
			break;
		}
	}

	return {xPt:x, yPt:y};
}

omokAI.prototype.calBestPoint = function()
{
	var x = -1;
	var y = -1;
	var d;
	var bestX = -1;
	var bestY = -1;
	var maxPoint = -1;

	//  Direction..
	//    6  7  8
	//    5  x  1
	//    4  3  2
	var  attContPoint = 100;
	var  defContPoint = 110;
	var  attRemainPoint = 1;
	var  defRemainPoint = 1;

	for(y=0; y<this.h; y++) for(x=0; x<this.w; x++)
	{
		var attackPoint = 0;
		var defencePoint = 0;
		var currStone = this.stage.getStone(x, y);
		if(currStone.color != "empty")
		{
			continue;
		}

		var contGains = [1, 1, 1, 1, 1, 1, 1, 1];
		var defGains = [1, 1, 1, 1, 1, 1, 1, 1];
		for(d=1; d<=8; d++)
		{
			var cont = 1;
			var space = 0;
			var ocgd = (d+3)%8;
			var contGain = contGains[ocgd];
			var defGain = defGains[ocgd];
			
			while(cont < (this.w*this.h))
			{
				var nextStone = null;
				switch (d)
				{
				case 1 :
					if(x+cont < this.w)
					{
						nextStone = this.stage.getStone(x+cont, y);
					}
					break;
				case 2 :
					if(x+cont < this.w && y+cont < this.h)
					{ 
						nextStone = this.stage.getStone(x+cont, y+cont);
					}
					break;
				case 3 : 
					if(y+cont < this.h)
					{ 
						nextStone = this.stage.getStone(x, y+cont);
					}
					break;
				case 4 :
					if(x-cont >= 0 && y+cont < this.h)
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
					if(x+cont < this.w && y-cont >= 0)
					{ 
						nextStone = this.stage.getStone(x+cont, y-cont);
					}
					break;	
				}

				cont ++;							

				if(nextStone != null)
				{
					if(nextStone.color == this.color)
					{
						if(space == 0 && defGain == 1)
						{
							attackPoint += 	(attContPoint*contGain);
							contGain ++;
						}
						else if(space == 0 && defGain > 1)
						{
							defencePoint -= defContPoint;
							break;
						}

					}
					else if(nextStone.color == "empty")
					{
						attackPoint += attRemainPoint;
						space ++;
					}
					else
					{
						if(space == 0 && contGain == 1)
						{
							defencePoint += (defContPoint*defGain)
							defGain ++;
						}
						else
						{
							break;
						}
					}
				}
				else
				{
					break;
				}
			}

			contGains[d-1] = contGain;
			defGains[d-1] = defGain;
			//console.log(" == direct-"+d+" : attackPoint = "+attackPoint+",  defencePoint = "+defencePoint);
		}

		if(maxPoint < (attackPoint+defencePoint))
		{
			maxPoint = attackPoint+defencePoint;
			bestX = x;
			bestY = y;

			console
		}

		console.log("== Attact Point("+x+", "+y+") = " + attackPoint + "/"+ defencePoint + " : " +(attackPoint+defencePoint));
	}


	return {xPt:bestX, yPt:bestY};
}

omokAI.prototype.calBestPoint_alg2 = function()
{
	var x = -1;
	var y = -1;
	var d,n;
	var bestX = -1;
	var bestY = -1;
	var maxPoint = -1;

	//  Direction..
	//    1(5)  2(6)  3(7)
	//    0(4)  x     0
	//    3     2     1
	var  ar1 = 100;
	var  ar4 = 110;
	var  ar2 = 1;

	var  dr1 = 110;
	var  dr2 = 330;
	
	for(y=0; y<this.h; y++) for(x=0; x<this.w; x++)
	{
		var a1 = [0, 0, 0, 0, 0, 0, 0, 0];		// Same color stone number.
		var a2 = [0, 0, 0, 0, 0, 0, 0, 0];      // Free Space after continue same color stones.
		var a4 = [0, 0, 0, 0, 0, 0, 0, 0];      // Number of other color ston which block my stone.
		var d1 = [0, 0, 0, 0, 0, 0, 0, 0];      // Oposit same color stone number.
		var d2 = [0, 0, 0, 0, 0, 0, 0, 0];      // Number of ston which block opposit stones.
		var at = 0;
		var df = 0;
		var currStone = this.stage.getStone(x, y);
		if(currStone.color != "empty")
		{
			continue;
		}

		for(d=0; d<=3; d++)
		{
				
			var as1 = 0;
			var as2 = 0;
			var as4 = 0;
			var ds1 = 0;
			var ds2 = 0;
			for(n=0; n<2; n++)
			{
				var cont = 1;
				while(cont < (this.w*this.h))
				{
					var nextStone = null;
					var index = d+4*n;
					switch (index)
					{
					case 0 :
						if(x+cont < this.w)
						{
							nextStone = this.stage.getStone(x+cont, y);
						}
						break;
					case 1 :
						if(x+cont < this.w && y+cont < this.h)
						{ 
							nextStone = this.stage.getStone(x+cont, y+cont);
						}
						break;
					case 2 : 
						if(y+cont < this.h)
						{ 
							nextStone = this.stage.getStone(x, y+cont);
						}
						break;
					case 3 :
						if(x-cont >= 0 && y+cont < this.h)
						{  
							nextStone = this.stage.getStone(x-cont, y+cont);
						}
						break;
					case 4 : 
						if(x-cont >=0)
						{ 
							nextStone = this.stage.getStone(x-cont, y);
						}
						break;
					case 5 : 
						if(x-cont >=0 && y-cont >= 0)
						{ 
							nextStone = this.stage.getStone(x-cont, y-cont);
						}
						break;
					case 6 : 
						if(y-cont >= 0)
						{
							nextStone = this.stage.getStone(x, y-cont);
						}
						break;
					case 7 : 
						if(x+cont < this.w && y-cont >= 0)
						{ 
							nextStone = this.stage.getStone(x+cont, y-cont);
						}
						break;	
					}

					cont ++;							

					if(nextStone != null)
					{
						if(nextStone.color == this.color)
						{
							if(a2[index] == 0 && d1[index] == 0)
							{
								a1[index]++;
							}
							else if(a2[index] == 0 && d1[index] > 0)
							{
								d2[index]++;
								break;
							}
						}
						else if(nextStone.color == "empty")
						{
							a2[index] ++;
						}
						else
						{
							if(a2[index] == 0 && a1[index] == 0)
							{
								d1[index] ++;
							}
							else if(a2[index] == 0 && a1[index] > 0)
							{
								a4[index] ++;
								break;
							}
							else
							{
								break;
							}
						}
					}
					else
					{
						break;
					}
				}

				console.log("  ["+index+"]  a1 = "+a1[index]+",  a2 = "+a2[index]+",  a4 = "+a4[index] + ",  d1 = "+d1[index]+",  d2 = "+ d2[index]);
				as1 += a1[index];
				as2 += a2[index];
				as4 += a4[index];
				ds1 += (d1[index] * d1[index] * dr1);
				ds2 += d2[index];
			}
			

			at += (as1 * as1 * ar1 + as2 * ar2 - as4 * ar4);
			df += (ds1 - ds2 * dr2);
			console.log(" == direct-"+d+" : attackPoint = "+at+",  defencePoint = "+df);
			console.log("    a1 = "+as1+",  a2 = "+as2+",  a4 = "+as4+",  d1 = "+ds1+",  d2 = "+ds2);
		}

		if(maxPoint < (at+df))
		{
			maxPoint = at+df;
			bestX = x;
			bestY = y;

			console
		}

		console.log("== Attact Point("+x+", "+y+") = " + at + "/"+ df + " : " +(at+df));
	}


	return {xPt:bestX, yPt:bestY};
}
