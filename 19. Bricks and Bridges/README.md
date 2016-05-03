# Challenge 19 - Bricks and Bridges « Prev Next »

After a long day's work, you get home and decide you are going to play your favorite game, B&B.
Bricks and Bridges is a really simple game. In each level you control your avatar in a room. This room is full of lava but there are some ledges linked by bridges.
The bridges are really brittle and if they break while you're crossing them, you die and have to start the level from scratch. You can cross them by stepping on them with differing force; the harder the force, the more you wear them out.
The aim of the game is to go from the entry to the exit passing through every ledge in the room without dying. Today, however, you are feeling lucky and want to achieve the elusive "Wrecking Ball".
What does this achievement require? Simple! You need to finish the level without leaving a single bridge up. The problem is that the levels are randomly generated and this achievement is not always possible, so you are going to make a program to see whether, for any given level, you should try it out or just search a different level.
To make things easier, you will be using a cheat that allows you to put the entry and the exit wherever you want on the map (maybe even on the same ledge).

Game rules:

- There are several ledges in the level; one is the entry and another (maybe the same one) is the exit.
- The ledges may be linked by bridges; several bridges can link the same two ledges; each bridge links only two ledges.
- You must pass through every ledge on the level.
- Bridges may be crossed in either direction and, once you begin crossing one, you must finish. You cannot stop or turn around.
- Each bridge has a TOUGHNESS value.
- Each time you cross a bridge, its TOUGHNESS value is reduced by your STEPFORCE.
- You may have several STEPFORCE settings to choose from, but once you start crossing a bridge you cannot change it until you reach the other ledge.
- You must choose one STEPFORCE from the options provided.
**Input**

Firstly, you will be provided with an integer L, which means the number of Levels you have to solve.
For each level, you will be provided with a definition of the level:
Firstly you will be provided with the stepforces you are able to choose from: a line with the number of the stepforces available, S, followed by another line with S numbers, each representing one of the stepforces.
After that, B, the number of Bridges.
B lines follow, each composed of three integers: LEDGE_ORIGIN LEDGE_DEST BRIDGE_TOUGHNESS

**Output**

For each level, you need to calculate whether the achievement is possible or not, outputting "Case #L: " followed by "I TOLD YOU SO from X to Y" if it is possible or "GOODBYE CRUEL WORLD" if it is not possible. X and Y are the start and end ledges. If there are several solutions, choose the one with the lowest start and end ledges, in ascending order.

**Limits**

1 ≤ L ≤ 25
1 ≤ S ≤ 50
1 ≤ STEPFORCE ≤ 100
1 ≤ B ≤ 25000
1 ≤ BRIDGE_TOUGHNESS ≤ 1000

**Sample Input**
```
6
3
1 3 5
8
1 9 1
1 7 1
1 3 1
3 5 1
3 7 1
3 9 1
5 7 1
7 9 1
3
1 3 5
6
1 9 1
1 7 1
1 3 1
3 7 1
3 9 1
7 9 1
3
1 3 5
10
1 9 1
1 7 1
1 3 1
3 5 1
3 7 1
3 9 1
5 7 1
7 9 1
2 4 1
2 4 1
2
3 5
8
1 9 3
1 7 3
1 3 3
3 5 3
3 7 3
3 9 3
5 7 3
7 9 4
3
2 4 6
8
1 9 2
1 7 2
1 3 2
3 5 2
3 7 2
3 9 2
5 7 2
7 9 7
2
1 2
5
1 3 1
3 5 2
5 7 3
5 9 1
7 9 1
```
**Sample Output**
```
Case #1: I TOLD YOU SO from 1 to 9
Case #2: GOODBYE CRUEL WORLD
Case #3: GOODBYE CRUEL WORLD
Case #4: GOODBYE CRUEL WORLD
Case #5: GOODBYE CRUEL WORLD
Case #6: I TOLD YOU SO from 1 to 3
```
**Example**

In the example of Case 6:
Shocking img You have several solutions, showing 2 of them marked as:
FROM TO (FORCE)

Solution 1:
```
1 3 (1)
3 5 (2)
5 9 (1)
9 7 (1)
7 5 (2)
5 7 (1)
```
Solution 2 (as you are required to provide the solution with the lowest start and end ledges, this is the solution you want, as it goes from 1 to 3):
```
1 3 (1)
3 5 (1)
5 9 (1)
9 7 (1)
7 5 (1)
5 7 (1)
7 5 (1)
5 3 (1)
```
