


Developed by Aedan Valle
Class: CPSC 335
Project 3
———————————————————————————————————————————————————————————

[MAKE SURE YOU RUN THIS PROGRAM MORE THAN 5 TIMES please]
[refresh page a few times]

Project 3 Problem Description:
	In this project, we’re supposed to start at the 
node grid[1][2] and then end at the sink node grid[8][7].  
The Program will travel across the matrix to the sink node.
The program is supposed to utilize a greedy approach of
Some sort to arrive at the sink node.  The program can 
Only advance toward the sink in the configuration of a 
Knights piece in chess.  Meaning, from one start position
The current node can travel one space up/down/left/right
And then diagonally upper/(right | left)… etc with the 
Other directions.  Show the flow on each line drawn until 
The end node is reach to illustrate the knights flow problem.
	

Algorithms used:
- Greedy edmonds Karp variant: O(N)
this program constantly Goes out and collects 3+ possible 
moves and takes the Three closest nodes (distance wise 
using the distanceFormula) and chooses the node that’s the 
closest with The HIGHEST possible throughput until the end 
is reached.



Description:
- how I chose to implement:
This algorithm was that I figured that the problem if the 
Algorithm only has 15-30 moves to pick until it is supposed 
To complete it’s path, it needs to be done either as quickly
As possible or it won’t work.  The likelihood that it will
End at the sink node in 15-30 is highly unlikely.  It will
Probably either go over the 30 move mark or just not be
Able to get to the end sink node using DFS or BFS without
Constantly checking the node to see if distance-wise, it 
Is getting closer to the sink node.  So that’s why I chose
To use math since I pick relatively good paths.  I usually
Arrive at the sink node in under 15 steps, but if I didn’t
Have the distance constraint to help guide it, I’m not 
Sure if I would even have a solution to the end.  So my 
Choices of algorithms is pretty limited since i either 
Implement an algorithm that gets to the sink as fast as
Possible, or use an algorithm that may never show it 
Arriving to the sink at all.  That’s why I chose to 
Implement my program this way. 

Limitations:
- (this rarely happens) during some runs, the program gets 
stuck and continually Keeps collecting and deleting nodes 
This will occur ~(1/20) times

- sometimes the program thinks it’s at the sink node and 
The program terminates 


Output:
	The output shows the path of the with it’s max 
Flow until it arrives at the sink.  The path is drawn over
The node sequence of knights moves that was used to arrive
At the sink node.  
	































