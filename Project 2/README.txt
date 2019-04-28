



Developed by Aedan Valle 
Class: CPSC 335 
Project 2
———————————————————————————————————————————————————————————

[MAKE SURE TO CLICK THE UPDATE BUTTON TO SHOW THE NEXT STEP]

Project 2 Problem description:
	We are going to implement a javascript program that 
Uses the three algorithms provided in the project prompt 
To show the different step sequences of the three algorithms
to illustrate the idea of a “pass.” This project is to also
Show how different algorithms work.  

Algorithms used:
- insertion sort O(N^2)
- merge sort O(N * log(N))
- quick sort O(N * log(N))

Description:
 - insertion sort implementation For the insertion algorithm, 
what I did was simply implemented two for-loops to scan and 
continually keep replacing items in the list until they are 
ordered from smallest value to the largest value

 - merge sort implementation I used a recursive algorithm 
to do the physical computation.  I caught all the instances 
being computed at each level in the reverse order.  That’s 
why It appears to be get more disorganized as it goes down.  
But nonetheless, the number of steps are output. Each 
Sublist of the array constantly keeps splitting and sorting
Until each list is of size 1

 - quick sort implementation: what I did was choose some 
Node at runtime and then start sorting the list according
To the last node.  Then a algorithm similar to merge sort 
Is performed where the program keeps splitting up the array
In half while sorting it until the array is sorted and stops
When each leaf array size is 1.

Limitations:
None that I’m aware of… 


Output:

	The output of this program prints the current step
Iteration out to the screen in a sequential fashion 
According to it’s “pass.” It’s supposed to the total number
Of passes that take place using each algorithm and how each
Of the three algorithms run against one another.  The 
Algorithms that contain the running time of O(N * log(N))
Are the fastest and compute in the least number of “passes”
As shown printed on the web page.  

















