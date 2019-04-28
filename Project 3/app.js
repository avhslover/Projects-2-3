
console.log(canvas);

var canvas = document.querySelector('canvas');

var c = canvas.getContext('2d');

var grid = new Array(10);
for(i = 0; i < 10; i++){
	grid[i] = new Array(10);
}

function grid_center(x, y, box_weight, used_bit, index_x, index_y){
	this.x = x;
	this.y = y;
	this.box_weight = box_weight;
	this.used_bit = used_bit;
	//source == 1, sink == 2
	this.SS_bit = 0;
	this.bottleneck_val = 0;
	
	//to keep track of the indices
	this.index_x = index_x;
	this.index_y = index_y;
	this.final_square_location = 0;
}

//this is where i will assign the weights with random numbers
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//this is where i set the indices
for(j = 0; j < 10; j++){
	for(i = 0; i < 10; i++){
		grid[i][j] = new grid_center(0,0,0,0, i, j );
		//grid[j][i].box_weight = getRandomInt(31);
	}
}

for(j = 0; j < 10; j++){
	for(i = 0; i < 10; i++){
		grid[i]    [j].box_weight = getRandomInt(31);
	}	
}

//this is where i make sure that the start and sink node are not 0 
while(grid[1][2].box_weight == 0){  grid[1][2].box_weight = getRandomInt(31); }
while(grid[8][7].box_weight == 0){  grid[8][7].box_weight = getRandomInt(31); }

//here is where i will assign all the square numbers their associated number value
{
	grid[7][6].final_square_location = 1; //upper left
	grid[7][7].final_square_location = 2; //upper middle
	grid[7][8].final_square_location = 3; //upper right
	
	grid[8][6].final_square_location = 4; //middle left
	grid[8][7].final_square_location = 5; // middle square and is sink_node
	grid[8][8].final_square_location = 6; //middle right
	
	grid[9][6].final_square_location = 7; //bot left
	grid[9][7].final_square_location = 8; //bot middle
	grid[9][8].final_square_location = 9; //bot right
}

{
//this is where i will assign midpoints and 
var temp_prev = 100;
var cur_val = 150;
for(j = 0; j < 10; j++){
	for(row = 0; row < 10; row++){
		grid[j][row].x = ((cur_val + temp_prev) / 2);
		
		temp_prev = cur_val;
		cur_val = cur_val + 50;		
	}
	//reinitialize crap
	temp_prev = 100;
	cur_val = 150;
}

temp_prev = 100;
cur_val = 150;
for(j = 0; j < 10; j++){
	for(col = 0; col < 10; col++){
		grid[col][j].y = ((cur_val + temp_prev) / 2);
		
		temp_prev = cur_val;
		cur_val = cur_val + 50;	
	}
	temp_prev = 100;
	cur_val = 150;
}

//source == 1, sink == 2
grid[1][2].SS_bit = 1;
grid[8][7].SS_bit = 2;
}

console.log(grid);
{
c.fillRect(100, 100, 500, 500);
c.fillStyle = 'black';
c.font = "30px Arial";
c.fillText("My Grid", 290, 50);
}
//where i output the numbers to the grid
for(i = 0; i < 10; i++) {
	for(j = 0; j < 10; j++){
		c.fillStyle = 'white';
		c.font = "22px Arial";
		var num = grid[i][j].box_weight;
		num = num + ' ';
		c.fillText(num , grid[i][j].x - 9, grid[i][j].y + 5);
	}
}

{
for(y = 100; y <= 600; y = y + 50) {
		c.beginPath();
		c.moveTo(100, y);
		c.lineTo(600, y);
		c.strokeStyle = "white";
		c.lineWidth = 3;
		c.stroke();
}

//here is where i draw the lines
for(x = 100; x <= 600; x = x + 50) {
		c.beginPath();
		c.moveTo(x, 100);
		c.lineTo(x, 600);
		c.strokeStyle = "white";
		c.lineWidth = 3;
		c.stroke();
		
		if(x >= 150) {
			var prev_val = x - 50;
			var result = ((x - prev_val) / 2);
		}
}
}

console.log('grid[7][7] ' + grid[7][7].box_weight);

//---------------------------- this is where the program STARTS --------------
var move_count = 0;
var weight_bag = 0;


var possible_moves = new Array();
var begin_node = grid[1][2]; console.log('begin node: ' + begin_node.box_weight);
var cur_node = begin_node;
var sink_node = grid[8][7]; console.log('sink node: ' + sink_node.box_weight);
var permanent_node_path = new Array();
permanent_node_path.push(cur_node); // have to pump the first node into the path
var close_prox_dis = 0, cur_prox_dis = 0;

//			-- STEP 1 --
// below collects JUST the possible options
function pulse_routes(grid_piece){
//console.log(grid_piece);

	//---------------------------------- Left section ---------------------------------------------------------
	if(grid_piece.index_y - 2 >= 0 && grid_piece.index_x - 1 >= 0) { //this is the left top section
		//possible_moves.push(	grid[ grid_piece.index_y - 2	]  [ grid_piece.index_x - 1	]  );
		possible_moves.push(	grid[ grid_piece.index_x - 1	]  [ grid_piece.index_y - 2]  );
		//console.log( 'asdfa');
		//console.log(  grid[ grid_piece.index_y - 2	]  [ grid_piece.index_x - 1	]   );
	} 
	
	//console.log(grid_piece);
	
	if(grid_piece.index_y - 2 >= 0 && grid_piece.index_x + 1 >= 0
		&&
		grid_piece.index_x + 1 <= 9
		) { //this is the left bot section
		possible_moves.push(	grid[ grid_piece.index_x + 1	]  [ grid_piece.index_y - 2]  );
	}
	
	//---------------------------------- bottom section ---------------------------------------------------------
	if(grid_piece.index_y - 1 >= 0 && grid_piece.index_x + 2  >= 0
		&&
		grid_piece.index_x + 2  <= 9) { //this is the bot left section
		possible_moves.push(	grid[ grid_piece.index_x + 2	]  [ grid_piece.index_y - 1]  );
	}
	
	if(grid_piece.index_y + 1 >= 0 && grid_piece.index_x + 2  >= 0
		&&
		grid_piece.index_y + 1 <= 9
		&&
		grid_piece.index_x + 2 <= 9) { //this is the bot right section
		possible_moves.push(	grid[ grid_piece.index_x + 2	]  [ grid_piece.index_y + 1]  );
	}
	
	
	//---------------------------------- right  section ---------------------------------------------------------
	if(grid_piece.index_y + 2 >= 0 && grid_piece.index_x + 1  >= 0
		&&	grid_piece.index_y + 2 <= 9    &&  grid_piece.index_x + 1 <= 9 ) { //this is the right bot section
		possible_moves.push(	grid[ grid_piece.index_x + 1	]  [ grid_piece.index_y + 2 ]  );
	}
	
	if(grid_piece.index_y + 2 >= 0 && grid_piece.index_x - 1  >= 0
		&&  grid_piece.index_y + 2 <= 9) { //this is the right top section
		possible_moves.push(	grid[ grid_piece.index_x - 1	]  [ grid_piece.index_y + 2 ]  );
	}
	
	//---------------------------------- top  section ---------------------------------------------------------
	if(grid_piece.index_y + 1 >= 0 && grid_piece.index_x - 2  >= 0
		&&  grid_piece.index_y + 1 <= 9) { //this is the top right section
		possible_moves.push(	grid[ grid_piece.index_x - 2	]  [ grid_piece.index_y + 1 ]  );
	}
	
	if(grid_piece.index_y - 1 >= 0 && grid_piece.index_x - 2  >= 0) { //this is the top left section
		possible_moves.push(	grid[ grid_piece.index_x - 2	]  [ grid_piece.index_y - 1 ]  );
	}
		
	/*console.log('these are the possible moves');
	console.log(possible_moves);
	console.log('\n');
	console.log('\n');*/
}

//pulse_routes(cur_node);

//			-- STEP 2 --
//here is where i will sift through the nodes and compute the distance formula away
// from the sink node
function compute_distance(x_1, x_2, y_1, y_2) {
	var delta_a = x_2 - x_1;
	var delta_b = y_2 - y_1;
	return Math.sqrt( (delta_a * delta_a) + (delta_b * delta_b)  );
}

var clos_prox_bit = 0;
var art_select_node ;

//console.log('this is the close prox value');
// below is the golden number that tells me if i'm super close to the end but have to reorient myself

//console.log(  close_prox_dis);
function calculate_cur_prox_node() {
	cur_prox_dis = compute_distance(  cur_node.x, sink_node.x, cur_node.y, sink_node.y  );
}

function artificial_select(){
	pulse_routes(cur_node);
	
	if(clos_prox_bit == 0){ 
		close_prox_dis = compute_distance( begin_node.x, possible_moves[0].x, begin_node.y, possible_moves[0].y );
		clos_prox_bit = 1;
	}
	
	/* go through all the possible moves and select one that's not too far away */
	// first i need to get all the computed distances from the possibilities
	//console.log(possible_moves.length);
	var collected_dis = new Array();
	var copy_col_dis = new Array();
	var shortest_dis = new Array();
	
	/*
	the only movements that matter are the square that the knight is on and the the final 
		square that it's moving to
		
		you don't collect the square value, you want the max flow using your math implementation
	*/
	
	for(i = 0; i < possible_moves.length; i++){
		collected_dis.push( compute_distance( possible_moves[i].x, sink_node.x, possible_moves[i].y, sink_node.y  ) );
		copy_col_dis.push( possible_moves[i] );
		//console.log(collected_dis[i]);
	}
	
	console.log('moving to the smallest distances');
	
	for(j = 0; j < 3; j++){ // compute this operation 3 times and load the 3 elements into shortest dis[]
		var temp_smallest = collected_dis[0];
		var temp_sm_index = 0;
		
		for(blah = 0; blah < collected_dis.length; blah++){
			if(temp_smallest > collected_dis[blah]) {
				temp_smallest = collected_dis[blah];
				temp_sm_index = blah;
			}
		}
		//console.log(temp_smallest);
		//HERE IS WHERE I WILL PUSH AND POP EVERYTHING FOR THE PROPER ITERATION!!!
		shortest_dis.push(  copy_col_dis[temp_sm_index] );
		
		collected_dis.splice(temp_sm_index, 1);
		copy_col_dis.splice(temp_sm_index, 1);
	}
	
	console.log(shortest_dis);
	
	var highest_weight = shortest_dis[0].box_weight;
	var highest_weight_index = 0;
	
	//now what i want to do is pick the spot with the highest box weight
	for(i = 0; i < shortest_dis.length; i++){
			if(highest_weight < shortest_dis[i].box_weight) {
				highest_weight = shortest_dis[i].box_weight;
				highest_weight_index = i;
			}
	}
	permanent_node_path.push(   shortest_dis[highest_weight_index]	);
	cur_node = shortest_dis[highest_weight_index];
	console.log('this is the path so far');
	console.log(permanent_node_path);
	
	//now i need to reset the possibilities
	possible_moves.length = 0;
	possible_moves = [];
}

function square_6_logic(node_passed){
	/*
		1 - check the 3 nodes in the possible configuration and make sure that 
				they fit properly and have a weight greater than 0
				
		2 - now pump the new nodes into the final path
	*/
	if(  grid[  node_passed.index_x - 2  ]  [ node_passed.index_y  ].box_weight > 0) { // top top
			//top left is valid 
			permanent_node_path.push( grid[  node_passed.index_x - 1  ]  [ node_passed.index_y - 2 ] );
			permanent_node_path.push( grid[  node_passed.index_x - 2  ]  [ node_passed.index_y  ] );
			
			cur_node = grid[  node_passed.index_x - 2  ]  [ node_passed.index_y  ];
			evaluate();
	}
	else /* move to square 4 and perform square 4 logic */{
		if(  grid[  node_passed.index_x - 2  ]  [ node_passed.index_y - 1 ].box_weight > 0) { // top left
			permanent_node_path.push(  grid[  node_passed.index_x - 2  ]  [ node_passed.index_y - 1 ] );
			permanent_node_path.push(  grid[  node_passed.index_x   ]  [ node_passed.index_y - 2 ] );
			
			cur_node = grid[  node_passed.index_x   ]  [ node_passed.index_y - 2 ];
			square_4_logic(cur_node);
		}
	}
}

function square_4_logic(node_passed){
	/*
		1 - check the 3 nodes in the possible configuration and make sure that 
				they fit properly and have a weight greater than 0
				
		2 - now pump the new nodes into the final path
	*/
	if(  grid[  node_passed.index_x - 2  ]  [ node_passed.index_y  ].box_weight > 0) { // top top
		//this means the topmost square is valid so proceed
		if(  grid[  node_passed.index_x - 1  ]  [ node_passed.index_y - 2 ].box_weight > 0) { // top left 
			//top left is valid 
			permanent_node_path.push( grid[  node_passed.index_x - 1  ]  [ node_passed.index_y - 2 ] );
			permanent_node_path.push( grid[  node_passed.index_x - 2  ]  [ node_passed.index_y  ] );
			
			cur_node = grid[  node_passed.index_x - 2  ]  [ node_passed.index_y  ];
			evaluate();
		} 
	 	else if(  grid[  node_passed.index_x - 1  ]  [ node_passed.index_y + 2 ].box_weight > 0) { // top right
			//top right is valid
			permanent_node_path.push( grid[  node_passed.index_x - 1  ]  [ node_passed.index_y + 2 ] );
			permanent_node_path.push( grid[  node_passed.index_x - 2  ]  [ node_passed.index_y  ] );
			
			cur_node = grid[  node_passed.index_x - 2  ]  [ node_passed.index_y  ];
			evaluate();
		}
		
	}
	else /*this is where i convert to a square 6 logic because apparently, i can't perform square logic*/ {
	 	permanent_node_path.push(  grid[  node_passed.index_x - 2  ]  [ node_passed.index_y + 1 ] );
	 	permanent_node_path.push(  grid[  node_passed.index_x  ]  [ node_passed.index_y + 2 ] );
	 	
	 	cur_node = grid[  node_passed.index_x  ]  [ node_passed.index_y + 2 ];
	 	square_6_logic(cur_node);
	}
	
}

function print_lines() {

	//i need to get the minimum flow
	var minimum_flow = 0;
	minimum_flow = permanent_node_path[0].box_weight;
	
	for(i = 0; i < permanent_node_path.length; i++){
		if(minimum_flow > permanent_node_path[i].box_weight ) {
			minimum_flow = permanent_node_path[i].box_weight;
		}
	}

	//this is for printing the current path out to the screen 
	for(i = 1; i < permanent_node_path.length; i++){
		//this is where i will draw all the lines
		c.beginPath();
		
		c.moveTo( permanent_node_path[i - 1].x , permanent_node_path[i - 1].y );
		c.lineTo( permanent_node_path[i ].x ,  permanent_node_path[i ].y );
		
		c.strokeStyle = "yellow";
		c.lineWidth = 3;
		c.stroke();
	}
	
	//this is where i draw the flow
	for(i = 1; i < permanent_node_path.length; i++){
		var middle_x = (( permanent_node_path[i ].x +  permanent_node_path[i - 1].x) / 2);
		var middle_y = (( permanent_node_path[i ].y + permanent_node_path[i - 1].y ) / 2);
		
		c.fillStyle = 'lightblue';
		c.font = "14px Arial";
		//construct string first
		var flow = '';
		flow = minimum_flow + '/' + permanent_node_path[i ].box_weight ;
		
		c.fillText(flow , middle_x - 7, middle_y - 7);
	}	
}

function evaluate(){
	//here is where if i land within close proximity to the ending node, 
	calculate_cur_prox_node();
	//print_lines();
	
	//first i need to clear the the pulse nodes 
	if(cur_prox_dis == close_prox_dis) {
		//here since i'm at a spot that's literally one move away from locating the sink
		//pick that node and terminate the program
		permanent_node_path.push( sink_node );
		console.log(permanent_node_path);
		
	} else if(cur_prox_dis > close_prox_dis ) {
		artificial_select();
		
		//will need to call eval again
		evaluate();
	
	} else if( cur_prox_dis < close_prox_dis ) { 
		//this is where i will have to resort to other means to getting to the sink
		console.log('\n');
		console.log('last add');
		console.log(cur_node);
		
		//-------------------------- 
			 if(cur_node.final_square_location == 1) { // upper right
		/*
			what i'm going to want to do right here is just move to square 6
			then convert this issue to a square 6 problem, which is a square 4 problem
			
			1 - move to square 6 
			2 - perform square 4 logic
		*/
			if(grid[  cur_node.index_x - 1  ]  [ cur_node.index_y + 2 ].box_weight > 0) { 
				permanent_node_path.push(  grid[  cur_node.index_x - 1  ]  [ cur_node.index_y + 2 ] );
				
				cur_node = grid[  cur_node.index_x - 1  ]  [ cur_node.index_y + 2 ] ;
				
				evaluate();
			}
			else /* this means that the conventional add wasn't possible, convert to square 6*/ {
				permanent_node_path.push(  grid[  cur_node.index_x + 1  ]  [ cur_node.index_y + 2 ] );
				
				cur_node = grid[  cur_node.index_x + 1  ]  [ cur_node.index_y + 2 ];
				
				square_6_logic(cur_node);				
			}
		
		} 
		else if (cur_node.final_square_location == 2) { // upper middle
		
			/*
				no square conversion here. 
				perform square 2 logic
			*/
			if( grid[  cur_node.index_x - 1  ]  [ cur_node.index_y - 1 ].box_weight > 0
				&&
				grid[  cur_node.index_x + 1  ]  [ cur_node.index_y - 2 ].box_weight > 0  ) { 
				
				permanent_node_path.push(  grid[  cur_node.index_x + 1  ]  [ cur_node.index_y - 2 ]);
				permanent_node_path.push(  grid[  cur_node.index_x - 1  ]  [ cur_node.index_y - 1 ]);
				
				cur_node = grid[  cur_node.index_x - 1  ]  [ cur_node.index_y - 1 ];
				evaluate();
			}
			else if( 	grid[  cur_node.index_x - 1  ]  [ cur_node.index_y + 1 ].box_weight > 0
						&&
						grid[  cur_node.index_x + 1  ]  [ cur_node.index_y + 2 ].box_weight > 0  ) { 
				
				permanent_node_path.push(  grid[  cur_node.index_x + 1  ]  [ cur_node.index_y + 2 ] );
				permanent_node_path.push(  grid[  cur_node.index_x - 1  ]  [ cur_node.index_y + 1 ] );
				
				cur_node =  grid[  cur_node.index_x - 1  ]  [ cur_node.index_y + 1 ] ;
				evaluate();
			}
		
		} 
		else if (cur_node.final_square_location == 3) { // upper left
			/*
				1 - move to square 4 
				2 - perform square 4 logic
			*/
			if(  grid[  cur_node.index_x - 1  ]  [ cur_node.index_y - 2 ].box_weight > 0) { 
				permanent_node_path.push(  grid[  cur_node.index_x - 1  ]  [ cur_node.index_y - 2 ] );
				
				cur_node = grid[  cur_node.index_x - 1  ]  [ cur_node.index_y - 2 ];	
				evaluate();			
			}
			else /* convert to square 4 logic*/ {
				permanent_node_path.push(  grid[  cur_node.index_x + 1  ]  [ cur_node.index_y - 2 ] );
				
				cur_node =  grid[  cur_node.index_x + 1  ]  [ cur_node.index_y - 2 ];
				square_4_logic(cur_node);
			}
		
		} 
		//-------------------------- 
		else if (cur_node.final_square_location == 4) { // middle left 
			/*			
				1 - perform square 4 logic
			*/
			square_4_logic(cur_node);
		
		} 
		else if (cur_node.final_square_location == 6) { // middle right
			/*			
				1 - perform square 6 logic
			*/
			square_6_logic(cur_node);
		} 
		//-------------------------- 
		else if (cur_node.final_square_location == 7) { // bot left
			/*	
			*/
			if(  grid[  cur_node.index_x - 2  ]  [ cur_node.index_y - 1 ].box_weight > 0) { 
				permanent_node_path.push(  grid[  cur_node.index_x - 2  ]  [ cur_node.index_y - 1 ] );
				
				cur_node = grid[  cur_node.index_x - 2  ]  [ cur_node.index_y - 1 ] ;
				evaluate();
			}
			else /*re-orient to square 6 logic*/{
				permanent_node_path.push(  grid[  cur_node.index_x - 1  ]  [ cur_node.index_y + 2 ] );
				
				cur_node = grid[  cur_node.index_x - 1  ]  [ cur_node.index_y + 2 ];
				
				square_6_logic(cur_node);
			}
		
		} 
		else if (cur_node.final_square_location == 8) { // bot middle
			/*
				no square conversion here. 
				perform square 8 logic
			*/
			if(  grid[  cur_node.index_x - 1  ]  [ cur_node.index_y - 2 ].box_weight > 0
					&&
				  grid[  cur_node.index_x - 3  ]  [ cur_node.index_y - 1 ].box_weight > 0  ) { 
				
				permanent_node_path.push( grid[  cur_node.index_x - 1  ]  [ cur_node.index_y - 2 ] );
				permanent_node_path.push( grid[  cur_node.index_x - 3  ]  [ cur_node.index_y - 1 ] );
				
				cur_node = grid[  cur_node.index_x - 3  ]  [ cur_node.index_y - 1 ] ;
				evaluate();
			}
			else if (  grid[  cur_node.index_x - 1  ]  [ cur_node.index_y + 2 ].box_weight > 0
						&&
				  		grid[  cur_node.index_x - 3  ]  [ cur_node.index_y + 1 ].box_weight > 0  ) {
				
				permanent_node_path.push(  grid[  cur_node.index_x - 1  ]  [ cur_node.index_y + 2 ] );
				permanent_node_path.push(  grid[  cur_node.index_x - 3  ]  [ cur_node.index_y + 1 ]);
				
				cur_node = grid[  cur_node.index_x - 3  ]  [ cur_node.index_y + 1 ];
				evaluate();
			}
		
		} 
		else if (cur_node.final_square_location == 9) { // bot right
			/*	
				1 - move to square 4		
				2 - perform square 4 logic
			*/
			
			if(  grid[  cur_node.index_x - 2  ]  [ cur_node.index_y + 1 ].box_weight > 0) {
				permanent_node_path.push( grid[  cur_node.index_x - 2  ]  [ cur_node.index_y + 1 ] );
				
				cur_node = grid[  cur_node.index_x - 2  ]  [ cur_node.index_y + 1 ];
				evaluate();
			}
			else /*  reduce to square 4 logic*/{
				permanent_node_path.push( grid[  cur_node.index_x - 1  ]  [ cur_node.index_y - 2 ] );
				
				cur_node = grid[  cur_node.index_x - 1  ]  [ cur_node.index_y - 2 ];
				
				square_4_logic(cur_node);
			}
		}
		//-------------------------- 
		
		//evaluate();
		console.log('output');
		console.log(permanent_node_path);
	}	
	
	print_lines();
}

artificial_select(); // this is for debugging

evaluate();


//initiate_program_driver();






//---------------------------- this is where the program ENDS --------------























