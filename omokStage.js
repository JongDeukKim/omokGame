function omokStage (xNum, yNum, canvas)
{
	this.maxX = xNum;
	this.maxY = yNum;
	this.stageW = canvas.width;
	this.stageH = canvas.height;
	this.stageBorder = Math.round(this.stageW/xNum);
	this.reset();

	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");
	this.gridWidth = Math.round((this.stageW-this.stageBorder*2)/(xNum-1));
	this.gridHeight = Math.round((this.stageH-this.stageBorder*2)/(yNum-1));

	this.bgImage = new Image(this.stageW, this.stageH);
	this.bgImage.src = "plate.jpg";
	this.bgImage.onload = function() 
		{ 
			console.log("loading bgImage Done...."); 
		};
}

omokStage.prototype.getXNum = function() { return this.maxX; }
omokStage.prototype.getYNum = function() { return this.maxY; }
omokStage.prototype.getStoneNum = function() { return this.count; }

omokStage.prototype.getStone = function (x, y)
{
	return this.points[this.getIndex(x, y)];
}

omokStage.prototype.addStone = function(x, y, myColor)
{
	if(this.getStone(x, y).color == "empty")
	{
		this.count ++;
		this.points[this.getIndex(x,y)] = { color:myColor, order:this.count };

		if(this.currColor == "black")
    	{
    		this.currColor = "white";
    	}
    	else
    	{
    		this.currColor = "black";
    	}
    	this.lastPoint = {x:x, y:y};
	}
}

omokStage.prototype.getIndex = function(x, y)
{
	var index = y*this.maxY + x;
	return index;
}

omokStage.prototype.reset = function()
{
	this.points = [];
	this.count = 0;

	var x, y;
	for(y=0; y<this.maxY; y++) for(x=0; x<this.maxX; x++)
	{
		var index = y*this.maxY + x;
		this.points[index] = { color:"empty", order:-1};
	}

	this.currColor = "black";
}

omokStage.prototype.drawStage = function()
{
	var x,y;
	var w = this.stageW-this.stageBorder;
	var h = this.stageH-this.stageBorder;

	//console.log("draw bgImage...");
	if(this.bgImage.complete == false)
	{
		return;
	}
	this.ctx.drawImage(this.bgImage, 0, 0);

	for(y=0; y<this.maxY; y++)
	{
		var yPos = y*this.gridHeight+this.stageBorder;
		this.ctx.beginPath();
		this.ctx.moveTo(this.stageBorder, yPos);
		this.ctx.lineTo(this.stageBorder+(this.maxX-1)*this.gridWidth, yPos);	
		this.ctx.stroke();
	}

	for(x=0; x<this.maxX; x++)
	{
		var xPos = x*this.gridWidth+this.stageBorder;
		this.ctx.beginPath();
		this.ctx.moveTo(xPos, this.stageBorder);
		this.ctx.lineTo(xPos, this.stageBorder+(this.maxY-1)*this.gridHeight);
		this.ctx.stroke();
	}
	
}

omokStage.prototype.onMouseMove = function(event)
{
	var xPos = Math.round (event.clientX)-this.canvas.offsetLeft;
    var yPos = Math.round (event.clientY)-this.canvas.offsetTop;
    var radian = this.gridWidth*0.3;

    //console.log("onMouseMove:" + xPos + ", " + yPos);
   // console.log("   Client Offset:" + this.canvas.offsetLeft + ", " + this.canvas.offsetTop);

    this.drawStage();
    this.drawAllStones();


    this.ctx.beginPath();
	this.ctx.arc(xPos,yPos,radian,0,2*Math.PI);
	this.ctx.stroke();

	this.ctx.fillStyle=this.currColor;
	this.ctx.fill();
}

omokStage.prototype.onMouseClick = function(event)
{
	var xPos = Math.round (event.clientX)-this.canvas.offsetLeft-this.stageBorder;
    var yPos = Math.round (event.clientY)-this.canvas.offsetTop-this.stageBorder;
    var radian = this.gridWidth*0.3;

    var xIndex = Math.round(xPos/this.gridWidth);
    var yIndex = Math.round(yPos/this.gridHeight);

    if(this.getStone(xIndex, yIndex).color != "empty")
    {
    	alert("Please select another position.");
    }
    else
    {
    	this.addStone(xIndex, yIndex, this.currColor);
    	this.drawStone(xIndex, yIndex);

    	/*if(this.currColor == "black")
    	{
    		this.currColor = "white";
    	}
    	else
    	{
    		this.currColor = "black";
    	}*/
    }

    /*this.lastPoint = {x:xIndex, y:yIndex};*/
}

omokStage.prototype.drawStone = function(x, y)
{
	var xPos = x * this.gridWidth + this.stageBorder;
	var yPos = y * this.gridHeight + this.stageBorder;
	var stone = this.getStone(x, y);
	if(stone.color != "empty")
	{
		this.ctx.beginPath();
		this.ctx.arc(xPos,yPos,(this.gridWidth*0.3),0,2*Math.PI);
		this.ctx.stroke();

		this.ctx.fillStyle=stone.color;
		this.ctx.fill();

		this.ctx.fillStyle="blue";
		this.ctx.font = "16px Arial";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline="middle"; 
		this.ctx.fillText(stone.order,xPos,yPos);
	}
}

omokStage.prototype.drawAllStones = function()
{
	var x, y;
	for(y=0; y<this.maxY; y++) for(x=0; x<this.maxX; x++)
	{
		var stone = this.getStone(x, y);
		if( stone.color != "empty")
		{
			this.drawStone(x, y);
		}
	}
}

omokStage.prototype.getLastStone = function()
{
	return this.lastPoint;
}