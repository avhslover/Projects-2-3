
/*
	ALL CODE DEVELOPED BY AEDAN VALLE
	this is for the readMe doc:
	0 = 0
	.
	.
	9 = 9
	10 = A
	11 = B
	
	main string: 0, 11, 10, 3, 2, 8, 9, 7, 6, 5, 1, 4
*/
var init_bit = 0;

var final_o_table_strings = new Array(3);
for( i = 0; i < 3; i++) {
	final_o_table_strings[i] = new String();
}

//here is where i need to initialize all the arrays...
final_o_table_strings[0] = document.querySelector('#insertion').textContent;
final_o_table_strings[1] = document.querySelector('#Msort').textContent;
final_o_table_strings[2] = document.querySelector('#Qsort').textContent;

var insert_num_ar = new Array(12);
var msort_num_ar = new Array(12);

/*here is where i need to make more arrays to catch the instances of the */
var asdf = 15;
var mS_caught_instances = new Array(asdf);
var mS_i = 0;
for(i = 0; i < asdf; i++){
	mS_caught_instances[i] = new Array(12);
	for(j = 0; j < 12; j++){
		mS_caught_instances[i][j] = -1;
	}
}

var qS_caught_instances = new Array(asdf);
var qS_i = 0;
for(i = 0; i < asdf; i++){
	qS_caught_instances[i] = new Array(12);
	for(j = 0; j < 12; j++){
		qS_caught_instances[i][j] = -1;
	}
}
var qsort_num_ar = new Array(12);

function initialize_all_arrays() {
{
	insert_num_ar[0] = 0;
	insert_num_ar[1] = 11;
	insert_num_ar[2] = 10;
	insert_num_ar[3] = 3;
	insert_num_ar[4] = 2;
	insert_num_ar[5] = 8;
	insert_num_ar[6] = 9;
	insert_num_ar[7] = 7;
	insert_num_ar[8] = 6;
	insert_num_ar[9] = 5;
	insert_num_ar[10] = 1;
	insert_num_ar[11] = 4;
	msort_num_ar[0] = 0;
	msort_num_ar[1] = 11;
	msort_num_ar[2] = 10;
	msort_num_ar[3] = 3;
	msort_num_ar[4] = 2;
	msort_num_ar[5] = 8;
	msort_num_ar[6] = 9;
	msort_num_ar[7] = 7;
	msort_num_ar[8] = 6;
	msort_num_ar[9] = 5;
	msort_num_ar[10] = 1;
	msort_num_ar[11] = 4;
	qsort_num_ar[0] = 0;
	qsort_num_ar[1] = 11;
	qsort_num_ar[2] = 10;
	qsort_num_ar[3] = 3;
	qsort_num_ar[4] = 2;
	qsort_num_ar[5] = 8;
	qsort_num_ar[6] = 9;
	qsort_num_ar[7] = 7;
	qsort_num_ar[8] = 6;
	qsort_num_ar[9] = 5;
	qsort_num_ar[10] = 1;
	qsort_num_ar[11] = 4;
	}
}

function mergeSort(arr){
   var len = arr.length;
   if(len < 2){
   		//mS_caught_instances[mS_i][0] = arr[0];
   		//mS_i++;
   		
      	return arr;      
    }
   var mid = Math.floor(len/2),
       left = arr.slice(0,mid),
       right =arr.slice(mid);
   		//send left and right to the mergeSort to broke it down into pieces
   		//here is where i catch all the instances of the broken up array
   
   		/*for(i = 0; i < arr.length; i++){
   			mS_caught_instances[mS_i][i] = arr[i];
   		}
  	 mS_i++;*/
  	 
  	 var temp_crap = merge(mergeSort(left),mergeSort(right));
  	 
  	 for(i = 0; i < arr.length; i++){
   			mS_caught_instances[mS_i][i] = temp_crap[i];
   		}
  	 mS_i++;
   
   	return temp_crap;
}

function merge(left, right){
	var result = [],
      	lLen = left.length,
      	rLen = right.length,
      	l = 0,
      	r = 0;
	while(l < lLen && r < rLen){
     	if(left[l] < right[r]){
       		result.push(left[l++]);
     	}
     	else{
       		result.push(right[r++]);
    	}
	}  
	
	
	
	return result.concat(left.slice(l)).concat(right.slice(r));
}

//console.log(final_o_table_strings);

document.querySelector('#box-g').textContent = 
'all algorithms will be performed for insertion(1st yellow box), Merge Sort(second white), and Quicksort(third yellow)';

var inS_iter = 0;
var blah_bit = 0;

function write_to_S_at_I(blah, arr){ 
	final_o_table_strings[blah] += '\n.....(';

	for(i = 0; i < 12; i++) {
		if(i == 11) {
			//
			if(arr[i]  == 10) {
				final_o_table_strings[blah] += 'A';
			} else if(arr[i]  == 11) {
				final_o_table_strings[blah] += 'B';
			} else {
				final_o_table_strings[blah] += arr[i];
			}
		} else {
			//all other cases			
			if(arr[i]  == 10) {
				final_o_table_strings[blah] += 'A';
				final_o_table_strings[blah] += ', ';
			} else if(arr[i]  == 11) {
				final_o_table_strings[blah] += 'B';
				final_o_table_strings[blah] += ', ';
			} else {
				final_o_table_strings[blah] += arr[i];
				final_o_table_strings[blah] += ', ';
			}
		}
	}
	
	//final closing string...
	final_o_table_strings[blah] += ').....';
}

function insertion_stuff() { 	
	//here is where i'm going to have to build the string... 
	//everything here will be manipulating final_o_table_strings[0]
	
	var temp = insert_num_ar[inS_iter];
	var j	= inS_iter - 1;
	
	//algorithm for insertion
	 while (j >= 0 && insert_num_ar[j] > temp) {
	 	insert_num_ar[j + 1] = insert_num_ar[j];
      	j--;
    }
    insert_num_ar[j + 1] = temp;
	
	if(init_bit == 1) {
		write_to_S_at_I(0, insert_num_ar);
	}
	
	//here is where i place it into the proper box thing
	document.querySelector('#insertion').textContent = 
    final_o_table_strings[0];
    inS_iter++;
}

var cust_o = 1;

function custom_output(msort_num_ar) {
	//here is where i'm going to 
	
	if(cust_o == 1) {
	
		var trans_1 = new Array();
		//first i need to treat the array first.  
		
		for(i = 0; i < 12; i++){
			if(mS_caught_instances[4][i] != -1) 
			{ trans_1.push(mS_caught_instances[4][i]); }
		}
		
		for(i = 0; i <  12; i++){
			if(mS_caught_instances[9][i] != -1) 
			{ trans_1.push(mS_caught_instances[9][i]); }
		}
		
		write_to_S_at_I(1, trans_1);
		cust_o++;	
	} else if(cust_o == 2) {
		var trans_2 = new Array();	
		
		for(i = 0; i <  12; i++){
			if(mS_caught_instances[1][i] != -1) 
			{ trans_2.push(mS_caught_instances[1][i]); }
		}
		
		for(i = 0; i < 12; i++){
			if(mS_caught_instances[3][i] != -1) 
			{ trans_2.push(mS_caught_instances[3][i]); }
		}
		//-------------------------------------------------		
		for(i = 0; i < 12; i++){
			if(mS_caught_instances[6][i] != -1) 
			{ trans_2.push(mS_caught_instances[6][i]); }
		}
		
		for(i = 0; i <  12; i++){
			if(mS_caught_instances[8][i] != -1) 
			{ trans_2.push(mS_caught_instances[8][i]); }
		}
		
		write_to_S_at_I(1, trans_2);
		
		cust_o++;
	} else if (cust_o == 3) {
		//console.log('this was entered');
		var trans_1 = new Array();
		
		trans_1.push(0)		;
		for(i = 0; i < 12; i++){
			if(mS_caught_instances[0][i] != -1) 
			{ trans_1.push(mS_caught_instances[0][i]);  }
		}
		
		//console.log(trans_1);
		
		trans_1.push(3);
		for(i = 0; i < 12; i++){
			if(mS_caught_instances[2][i] != -1) 
			{ trans_1.push(mS_caught_instances[2][i]); }
		}
		
		//-------------------------------------------------
		trans_1.push(4);
		for(i = 0; i < 12; i++){
			if(mS_caught_instances[5][i] != -1) 
			{ trans_1.push(mS_caught_instances[5][i]); }
		}
		
		trans_1.push(5);
		for(i = 0; i < 12; i++){
			if(mS_caught_instances[7][i] != -1) 
			{ trans_1.push(mS_caught_instances[7][i]); }
		}
		
		
		//console.log(trans_1);
		write_to_S_at_I(1, trans_1);
		cust_o++;
	} else {
		//all other output
		write_to_S_at_I(1, msort_num_ar);
		//cust_o++;
	}
	
}

function Msort_stuff(){
	//here is where i'm going to have to build the string... 
	//everything here will be manipulating final_o_table_strings[1]
	
	//algorithm goes here
	
	if(cust_o == 1) {
	 msort_num_ar = mergeSort(msort_num_ar);
	 //console.log(mS_caught_instances);
	
	 for(i = 0; i < msort_num_ar.length; i++){
   			mS_caught_instances[mS_i][i] = msort_num_ar[i];
   	 }
  	 mS_i++;
  	 
  	 }
	
	//write_to_S_at_I(1, msort_num_ar);
	custom_output(msort_num_ar);
	//console.log('cust_o value:' + cust_o);
	//cust_o++;
	
	//here is where i place it into the proper box thing
	document.querySelector('#Msort').textContent = 
    final_o_table_strings[1];
}


function quickSort(arr, left, right){
   var len = arr.length, 
   pivot,
   partitionIndex;
   
   

  if(left < right){
    pivot = right;
    partitionIndex = partition(arr, pivot, left, right);
    
   //sort left and right
   quickSort(arr, left, partitionIndex - 1);
   quickSort(arr, partitionIndex + 1, right);
  }
  
  //here is where i catch all data
  	 
  	 /*for(i = 0; i < arr.length; i++){
   			qS_caught_instances[qS_i][i] = arr[i];
   		}
  	 qS_i++;*/
  
  return arr;
}
 

function partition(arr, pivot, left, right){
   var pivotValue = arr[pivot],
       partitionIndex = left;
       
       for(i = 0; i < arr.length; i++){
   			qS_caught_instances[qS_i][i] = arr[i];
   		}
  	 qS_i++;

   for(var i = left; i < right; i++){
    if(arr[i] < pivotValue){
      flip(arr, i, partitionIndex);
      partitionIndex++;
    }
  }
  flip(arr, right, partitionIndex);
  return partitionIndex;
}

function flip(ar_passed, i, j){
   var temp = ar_passed[i];
   ar_passed[i] = ar_passed[j];
   ar_passed[j] = temp;
}

var qS_bit = 0;
var stepper = 1;
    
function Qsort_stuff() {
	//here is where i'm going to have to build the string... 
	//everything here will be manipulating final_o_table_strings[2]
	//console.log(qS_caught_instances);
	
	if(qS_bit == 0) {
	qsort_num_ar = quickSort(qsort_num_ar, 0, 11);
	console.log('q sort instances below');
	console.log(qS_caught_instances);
	//write_to_S_at_I(2, qsort_num_ar);
	qS_bit = 1;
	}
	
	if(stepper <= 6) {
		write_to_S_at_I(2, qS_caught_instances[stepper]);
		stepper++;
	} else {
		write_to_S_at_I(2, qsort_num_ar);
	}
	
	//here is where i place it into the proper box thing
	document.querySelector('#Qsort').textContent = 
    final_o_table_strings[2];
    qS_i = 0;
}

function button_manip() {
	//console.log('button was pushed');
	//here is where all the algorithm shit is supposed to go
	if(init_bit == 0) {
		initialize_all_arrays();
		//console.log(init_bit);
		insertion_stuff();
		init_bit = 1;
	}
	
	//everything for the insertion operation here...
	insertion_stuff();
    
    //everything for the Msort here
    Msort_stuff();
    
    //everything for the Qsort here	
    Qsort_stuff();
}

document.querySelector('.update').addEventListener('click', button_manip);







   







































