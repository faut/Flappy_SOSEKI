<!--
var LM = function(Id , objName)
{
	this.MoveSpeed = 1;
	this.MoveTime  = 50;

	this.unorderedListElement = null;
	for ( var i = 0 ; i < document.getElementById(Id).childNodes.length; i++)
	{
		var child = document.getElementById(Id).childNodes.item(i);
		if ( child.tagName == "UL" )
		{
			this.unorderedListElement = child;
			this.unorderedListElement.style.left = "0px";
			break;
		}
	}

	var LastListNumber = 0;
	for ( var i = 0 ; i < this.unorderedListElement.childNodes.length; i++)
	{
		var child = this.unorderedListElement.childNodes.item(i);
		if ( child.tagName == "LI" )
		{
			LastListNumber = i;
		}
	}

	this.maxLeft = 0;
	for ( var i = 0 ; i < this.unorderedListElement.childNodes.length; i++)
	{
		var child = this.unorderedListElement.childNodes.item(i);
		if ( child.tagName == "LI" )
		{
			var listItemElementStyle = child.currentStyle || document.defaultView.getComputedStyle(child, '');
			if (i != LastListNumber )
			{
				this.maxLeft += listItemElementStyle.width.replace("px","") * -1;
			}
		}
	}

	this.type = 1;
	this.Left  = function(){this.type = 1;};
	this.Right = function(){this.type = 2;};

	this.temp = 1;
	this.Stop = function(){this.temp = this.type;this.type = 0;};
	this.Restart = function(){this.type = this.temp;};

	//設定まとめて指定
	this.Moving = function()
	{
		thisLeft = this.unorderedListElement.style.left.replace("px","") - 0;
		if ( this.type == 1 ) 
		{
			if ( thisLeft > this.maxLeft )
			{
				thisLeft -= this.MoveSpeed;
			}else{
				thisLeft = this.maxLeft;
				this.type = 2;
			}
		}
		else if ( this.type == 2 )
		{
			if ( thisLeft <= 0 )
			{
				thisLeft += this.MoveSpeed;
			}else{
				thisLeft = 0;
				this.type = 1;
			}
		}
		this.unorderedListElement.style.left = thisLeft + "px";
		setTimeout(objName + ".Moving()",this.MoveTime);
	};

	if ( this.unorderedListElement != null && this.maxLeft < 0 )
	{
		this.Moving();
	}

	var DragHandler = {
		_oElem : null,
		attach : function(oElem) {
			oElem.onmousedown = DragHandler._dragBegin;
			oElem.dragBegin = new Function();
			oElem.drag = new Function();
			oElem.dragEnd = new Function();
			return oElem;
		},
		_dragBegin : function(e) {
			var oElem = DragHandler._oElem = this;
			if (isNaN(parseInt(oElem.style.left))) { oElem.style.left = '0px'; }
			if (isNaN(parseInt(oElem.style.top))) { oElem.style.top = '0px'; }
			var x = parseInt(oElem.style.left);
			var y = parseInt(oElem.style.top);
			e = e ? e : window.event;
			oElem.mouseX = e.clientX;
			oElem.mouseY = e.clientY;
			oElem.dragBegin(oElem, x, y);
			document.onmousemove = DragHandler._drag;
			document.onmouseup = DragHandler._dragEnd;
			return false;
		},
		_drag : function(e)
		{
			var oElem = DragHandler._oElem;
			var x = parseInt(oElem.style.left);
			var y = parseInt(oElem.style.top);
			e = e ? e : window.event;
			var LeftPoint = x + (e.clientX - oElem.mouseX);
			if ( LeftPoint <= 0 )
			{
				if ( LeftPoint >= -9999 )
				{
					oElem.style.left = LeftPoint + 'px';
				}
			}
			oElem.mouseX = e.clientX;
			oElem.mouseY = e.clientY;
			oElem.drag(oElem, x, y);
			return false;
		},
		_dragEnd : function()
		{
			var oElem = DragHandler._oElem;
			var x = parseInt(oElem.style.left);
			var y = parseInt(oElem.style.top);
			oElem.dragEnd(oElem, x, y);
			document.onmousemove = null;
			document.onmouseup = null;
			DragHandler._oElem = null;
		}
	};

	function beginScript() {
		for ( var i = 0 ; i < document.getElementById(Id).childNodes.length; i++)
		{
			var child = document.getElementById(Id).childNodes.item(i);
			if ( child.tagName == "UL" )
			{
				var dragable1 = DragHandler.attach(child);
				break;
			}
		}
	}
	
	function addLoadEvent(func) {
		var oldonload = window.onload;
		if (typeof window.onload != 'function')
		{
			window.onload = func;
		}
		else
		{
			window.onload = function()
			{
				if (oldonload)
				{
					oldonload();
				}
				func();
			}
		}
	}
	
	addLoadEvent(function() {beginScript();});
}

//-->

