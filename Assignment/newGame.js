var GRID = 12;
var SIZE = GRID + 1;
var myArr = new Array(SIZE);
var winArr = new Array(SIZE);
var rowArr = new Array(SIZE);
var colArr = new Array(SIZE);
var defColour = "grey";
var colour1 = "blue";
var colour2 = "red";
var a = 0;
var	b = 0;
var rowCount = 0;
var colCount = 0;

//Calls functions to construct game board
function Welcome()
{	
	alert("Hello! \n Welcome To My Game");
	alert("For A Diffrent Puzzle, Please Hit 'New Puzzle'");
}

function initGame()
{
	if (document.getElementById('resetButton').style.display === "none")
	{
		decide();																	//CHECKS TO RESET PAGE------------------
	}
	
	createPuzzle();																	//CALLS TO CREATE PUZZLE----------------
	
	hints();																		//CALLS TO CREATE HINT------------------	


	tableCreate();																	//CALLS TO CREATE TABLE-----------------
}

//Querys for random value and appends said value to solution array
function createPuzzle()
{
	for(var i = 0; i < SIZE; i++)
    {
		winArr[i] = new Array(SIZE);
		for(var j = 0; j < SIZE; j++)
		{
			winArr[i][j] = null;
			
			if( i != 0 && j != 0)
			{
				var rand = random();
				winArr[i][j] = rand;
			}
		}
	}
}

//Returns 1/0
function random()
{
	console.log("WARNING!");
	rand = Math.round(Math.random());
	return rand;
}

//Builds Main Table
function tableCreate()													//{1}Table Setup------------------------------------
{
	var tableHolder = document.getElementById("tableHolder");
    tableHolder.innerHTML = "";

    var tbl  = document.createElement('table');
	
	var d = 0;
	var c = 0;
	
	for(var i = 0; i < SIZE; i++)
    {
		var tr = tbl.insertRow(); //INSERT ROW------------------------------------------------------------------------------
        
		myArr[i] = new Array(SIZE);

        for(var j = 0; j < SIZE; j++)
        {
			if (i === 0 || j === 0)
				console.log("Proceeding With Initialization");
			else
			{
				console.log("Initiating Hint Locations: " + i + " : " + j);
				myArr[i][j] = null;
			}
			
			var td = tr.insertCell(); //INSERT CELL ------------------------------------------------------------------------
			var id = " ";
			
			if(j === 0)										//ASSIGN ID TO ALL LABEL CELLS----------------------------------
				if( i != 0)
				{
					var name = "Row" + c;
					td.setAttribute('id',name);
					id = colArr[i];
					c++;
				}
				else
				{
					td.setAttribute('id','board');
				}
			else if(i === 0)
				if( j != 0)
				{
					var name = "Col" + d;
					td.setAttribute('id',name);
					id = rowArr[j];
					d++;
				}
				else
				{
					td.setAttribute('id','board');
				}
			else
			{
				console.log("0,0");
			}
			
			td.appendChild(document.createTextNode(id)); 	//EMPTY CELL----------------------------------------------------
			
			if (td.innerHTML === " ")						//ADD CELL TO CLASS---------------------------------------------
				td.classList.add('tdClass');
			else
			{
				if (i === 0 )
					td.classList.add('headerCol');
				else
					
					td.classList.add('headerRow');
			}
			
			if (winArr[i][j] != null)							//ASSIGN COLOUR TO ALL CELLS (DEFAULT)----------------------
				td.style.backgroundColor = colour1;
			else
				td.style.backgroundColor = defColour;
			
			if (i != 0 && j != 0)
				td.addEventListener("click", function(e)		//ADD EVENT LISTENER FOR EACH CELL(COLOUR CHANGE)-----------
				{
					e = e || window.event;
					var target = e.target || e.srcElement;
					toggleColour(target);
				}, false);
			if( i != 0 && j != 0)
				myArr[i][j] = td;
        }
    }
    tableHolder.appendChild(tbl);								//INSERT TABLE----------------------------------------------

	console.log("Building Table");
}

//on-call: Changes colour of element
function toggleColour(element)									//{2}Ability To Toggle Table CELLS--------------------------
{
	if (element.style.backgroundColor === colour1)
		element.style.backgroundColor = colour2;
	else
		element.style.backgroundColor = colour1;
	
	checkVictory();
}

function checkVictory()
{
	var score = 0;
	var total = GRID * GRID;
	for(var i = 1; i < SIZE; i++)
		for(var j = 1; j < SIZE; j++)
		{
			var cellColour = myArr[i][j];
			var elem2 = winArr[i][j];
			console.log( "Entities: " + cellColour.style.backgroundColor + " - " + colour1 + " - " + elem2);
			var id = null;
			if (cellColour.style.backgroundColor === colour1)
				id = 0;
			else
				id = 1;
			console.log("ID: " + id)
			if(id === elem2)
			{
				console.log("row: " + i + "col: " + j + "is correct");
				score++;
				console.log("Score: " + score + " Total: " + total);
			}
			else{
				console.log("row: " + i + "col: " + j + "is incorrect");
				return -1;
			}
		}
	
	if (score === total)
		alert("Hello! \n\n Congratulation! \n You Win!");
	
}

//Displays Hints
function hints()
{
	var num1 = " ";
	var num2 = " ";
	var name1 = " ";
	var name2 = " ";
	for(var i = 1; i < SIZE; i++)
	{
		for(var j = 1; j < SIZE; j++)
		{
			
			num1 = calculate(j, winArr[i][j], num1, "row");
			num2 = calculate(j, winArr[j][i], num2, "col");
			
			if( j === 1)
			{
				name1 = "Row" + i;
				name2 = "Col" + i;
			}
		}
		
		console.log(name1 + " : " + num1);
		console.log(name2 + " : " + num2);
		
		rowArr[i] = num2;
		colArr[i] = num1;
		
		num1 = " ";
		num2 = " ";
		
		//document.getElementById(name1).innerHTML(num1);
		//document.getElementById(name2).innerHTML(num2);
		
		//var location = myArr[i][j];
		//var cell = document.getElementById(location);
		//var text = document.createTextNode("some text");
		//location.appendChild(text);
		//location.innerHTML("Text");
	}
}

//calculates values of filled squares
function calculate(i,a,info,usage)
{
	txt = " ";
	if (a === 1)
	{
		if(usage === "row")
		{
			rowCount++;
		}
		else
		{
			colCount++;
		}
	}
	else
	{
		if(usage === "row")
		{
			if (rowCount != 0)
			{
				info += rowCount + ", ";
				rowCount = 0;
				console.log("info row" + info);
			}
		}
		else
		{
			if (colCount != 0)
			{
				info += colCount + " \n ";
				colCount = 0;
				console.log("info col" + info);
			}
		}
	}
	
	if(i === SIZE-1)
	{
		if (usage === "row")
		{
			if(rowCount!=0)
			info += rowCount + ", ";
			rowCount = 0;
		}
		else
		{
			if(colCount!=0)
			info += colCount + ", ";
			colCount = 0;
		}
	}
	
	txt = info;
	info = " ";
	return txt;
}

function show()												//{5}Show Solution Button Working----------------------------------
{
	console.log("Entering Show");
	var tableHolder = document.getElementById("tableHolder");
	
    tableHolder.innerHTML = "";
    console.log("Creating Table");
    var tbl  = document.createElement('table');
	
	console.log("Reading Values");
    for(var i = 0; i < SIZE; i++)
    {
        var tr = tbl.insertRow();
		
        for(var j = 0; j < SIZE; j++)
		{
			if(i != 0 && j != 0)
			{
				var elem2 = winArr[i][j];
				if (elem2 === 0)
					marker = colour1;
				else
					marker = colour2;
			}
			else
				marker = 'grey';
			
			var td = tr.insertCell();
			var id = " ";
			
			if(j === 0)										//ASSIGN ID TO ALL LABEL CELLS----------------------------------
				if( i != 0)
				{
					//var name = "Row" + c;
					//td.setAttribute('id',name);
					id = colArr[i];
					//c++;
				}
				else
				{
					//td.setAttribute('id','board');
				}
			else if(i === 0)
				if( j != 0)
				{
					//var name = "Col" + d;
					//td.setAttribute('id',name);
					id = rowArr[j];
					//d++;
				}
				else
				{
					//td.setAttribute('id','board');
				}
			else
			{
				console.log("0,0");
			}

            td.appendChild(document.createTextNode(id));
			
			td.style.backgroundColor = marker;
			
			if (td.innerHTML === " ")						//ADD CELL TO CLASS---------------------------------------------
				td.classList.add('tdClass');
			else
			{
				if (i === 0 )
					td.classList.add('headerCol');
				else
					
					td.classList.add('headerRow');
			}
		}
	}
	tableHolder.appendChild(tbl);
	
	
	console.log("Building Solution");
}

function reset()											//{3}Reset Button Working---------------------------------------
{
	var tableHolder = document.getElementById("tableHolder");
    tableHolder.innerHTML = "";
    
    var tbl  = document.createElement('table');
	
	for(var i = 0; i < SIZE; i++)
    {
        var tr = tbl.insertRow();
		
        for(var j = 0; j < SIZE; j++)
        {
			if(i != 0 && j != 0)
				marker = "blue";
			else
				marker = defColour;
            var td = tr.insertCell();
			
			var id = " ";
			if(j === 0)										//ASSIGN ID TO ALL LABEL CELLS----------------------------------
				if( i != 0)
				{
					id = colArr[i];
				}
				else
				{
				}
			else if(i === 0)
				if( j != 0)
				{
					id = rowArr[j];
				}
				else
				{
				}
			else
			{
				console.log("0,0");
			}
			
            td.appendChild(document.createTextNode(id));
			if (td.innerHTML === " ")						//ADD CELL TO CLASS---------------------------------------------
				td.classList.add('tdClass');
			else
			{
				if (i === 0 )
					td.classList.add('headerCol');
				else
					
					td.classList.add('headerRow');
			}
			
            td.style.border = '1px solid black';
			td.style.backgroundColor = marker;
			td.addEventListener("click", function(e)
			{
				e = e || window.event;
				var target = e.target || e.srcElement;
				toggleColour(target);
			}, false);
		}
	}
	tableHolder.appendChild(tbl);
	
	
	console.log("Rebuilding Puzzle");
}

function decide()
{
	console.log(" decide1 ");
	if (document.getElementById('resetButton').style.display === "none")
	{
		console.log(" decide if 1 ");
		b--;
		console.log(" decide if 2 ");
		reset();
		document.getElementById('ansButton').innerText = "Show Answer";
		
		document.getElementById('resetButton').style.display = "inline-block";
		//Show Old Reset Button
		//Change Button Back TO Show Solution
		
	}
	else
	{
		console.log(" decide else 1 ");
		b++;
		console.log(" decide else 2 ");
		show();
		document.getElementById('ansButton').innerText = "Return";
		
		document.getElementById('resetButton').style.display = "none";
		//Hide Old Reset Button
		//Show New Reset Button
		
	}
	
}

function reloadPage()
{
	location.reload();
}

var b0 = document.getElementById('startButton')
b0.onclick = initGame;

var b1 = document.getElementById('ansButton')
b1.onclick = decide;

var b2 = document.getElementById('resetButton')
b2.onclick = reset;

document.getElementById("bodySection").onload = initGame;