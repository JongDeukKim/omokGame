function omokGame (type)
{
	var gridNum = 10;
	if(type == "big")
	{
		gridNum = 20;
	}
	this.canvas = document.getElementById("myCanvas");
	this.status = document.getElementById("myStatus");
	this.stage = new omokStage(gridNum, gridNum, this.canvas);
	this.judge = new omokJudge(this.stage);
	this.AI = new omokAI("white", this.stage);
	this.playing = false;
}

omokGame.prototype.start = function()
{
	this.stage.reset();
	this.stage.drawStage();
	this.playing = true;
}

omokGame.prototype.end = function()
{
	this.playing = false;
}

omokGame.prototype.undo = function()
{

}

omokGame.prototype.onMouseMove = function(event)
{
	/*if(this.playing)
	{
		this.stage.onMouseMove(event);
	}*/
}

omokGame.prototype.onMouseClick = function(event)
{
	if(this.playing)
	{

		this.stage.onMouseClick(event);
		if(this.judge.isFinished())
		{
			this.end();
			this.start();

			this.status.innerText = "게임을 다시 시작합니다. "+ this.stage.currColor + " 차례."
		}
		else
		{
			this.status.innerText = this.stage.currColor + " 차례."
			this.AI.myTurn();
			if(this.judge.isFinished())
			{
				this.end();
				this.start();

				this.status.innerText = "게임을 다시 시작합니다. "+ this.stage.currColor + " 차례."
			}
			else
			{
				this.status.innerText = this.stage.currColor + " 차례."
			}
		}
	}
}

omokGame.prototype.onMouseOut = function(obj)
{
	/*if(this.playing)
	{
		this.stage.drawStage();
	    this.stage.drawAllStones();
	}*/
}
