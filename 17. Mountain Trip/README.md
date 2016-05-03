# Challenge 17 - Mountain Trip

You are planning a K days trip to the mountain with some friends. You have decided to follow a route, but you are not sure how far you and your friends should walk before going to sleep. Of course, as the only software engineer in your group of friends, it is your job to decide how much walking should be done each day!

You know the height of each km of the route from the starting point to the end, and you need to find a sequence S of K elements, where Si indicates how many km you walk that day.

You want to divide the route in such a way that the maximum amount of meters that you go up and down per day is minimal. Of course, you don't want to waste a perfect day for hiking, so you should walk at least 1 km every day. In the event that there is more than one possible solution, you should choose the solution in which you walk the lowest maximum amount of kilometers on any given day. Finally, in the event that there is more than one possible solution, you should choose the smallest one. (E.g.: 5 3 5 9 8 is smaller than 5 3 6 9 7)

**Input**

The first line will contain an integer C, the number of cases for our problem.
Each case consists of a line with two integers, N and K, the number of points in the height map and the number of days of the trip. A line with N integers follows, representing the height map of the route.

**Output**

For each case, a line starting with "Case #x: " followed by K integers in ascending order, each of them indicating how many km you walk that day.

**Examples**
```
Case 1:

4 3
0 1 2 3
Case 2:

4 2
0 1 3 6
Case 3:

10 3
0 1 3 6 4 5 9 7 4 5
Case 4:

7 3
2 -1 1 0 -2 0 3
```
In Case 1, you walk 1 km on the 1st day, 1 km on the 2nd and 1 km on the 3rd. The amount of meters that you go up and down each day is 1.
In Case 2, you walk 2 km and 1 km. The amount of meters that you go up and down each day is 3.
In Case 3, you walk 3 km, 3 km and 3 km. The 1st day you go up and down 6 meters, the 2nd 7 and the 3rd 6. The maximum is 7.
In Case 4, you walk 2 km, 2 km and 2 km. The 1st day you go up and down 5 meters, the 2nd 3 and the 3rd 5. The maximum is 5.
Notice that you could have walked 2 km, 3 km and 1 km instead, but in that case the maximum amount of km walked on any given day would be 3 instead of 2.

**Limits**

1 ≤ K < N ≤ 1000
-231 ≤ height ≤ 231
**Sample Input**
```
4
4 3
0 1 2 3
4 2
0 1 3 6
10 3
0 1 3 6 4 5 9 7 4 5
7 3
2 -1 1 0 -2 0 3
```
**Sample Output**
```
Case #1: 1 1 1
Case #2: 2 1
Case #3: 3 3 3
Case #4: 2 2 2
```