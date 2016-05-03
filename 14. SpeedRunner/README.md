# Challenge 14 - SpeedRunner

After watching some gaming streams last night, you have decided to become a [Speedrunner](https://en.wikipedia.org/wiki/Speedrun). The first game that you want to master is a very simple platform game:

A level has a tiled layout and is made of three different kinds of blocks: walls, ladders and empty blocks.
The bottom part of a level (the last row) is always made of walls.
The goal of the game is to reach the exit door of the level.
To open the door, the character first needs to collect all the keys in the level.
The character has 4 possible movements: left, right, up and down
The level wraps horizontally: if the character is in the leftmost position and goes left he appears in the rightmost position, and vice versa
The character can stand on walls and ladders.
The character can move through ladders (and can't move through walls).
If the character is standing on a wall or ladder, he can jump one space.
If the character is not standing anywhere or grabbing a ladder, he falls down (and he can't move left or right while falling).
If you have any questions about the game, please take a look at the videos provided for the examples.

By pressing the keys WASD, you can move the character one space each frame (he also falls at one space per frame). Just in case: W is up (jump or go up a ladder), A is left, S is down and D is right. If you have any questions about the game, you can take a look at the animations in the input examples.

Obviously, your objective is to minimize the number of frames to finish a level. In the event that there is more than one path with the same amount of frames, you should pick the one that minimizes the number of keys pressed. Lastly, in the event that there is more than one path with these characteristics, you should pick the path whose sequence of keypresses is alphabetically the smallest. You can assume that you will always have to press at least one key to win.

**Input**

The input starts with an integer C indicating the number of cases. Each case description starts with a line with two integers N and M, indicating the number of rows and columns of the level. This is followed by a set of N lines with M characters, describing the layout of the level:

A dot '.' indicates an empty block
A sharp sign '#' indicates a wall
An 'H' indicates a ladder
An 'S' indicates the starting point for the character (it behaves like an empty block)
An 'E' indicates the exit of the level (it behaves like an empty block)
A 'K' indicates the placement of a key (it behaves like an empty block)
**Output**

For each case, a line starting with "Case #x: ", followed by an integer indicating the number of frames of the ideal path and a string with the keypresses of the path. If it's not possible to complete a level, you should output the string "IMPOSSIBLE". Every line is followed by a new line character.

**Examples**
```
Case 1:

2 3
#SE
###








Case 2:

2 3
S.E
###








Case 3:

3 3
.K.
S.E
###







Case 4:

4 4
H..K
.H..
S..E
####






Case 5:

5 5
.S.K.
K#K.K
.KH#K
K.K.E
#####





Case 6:

5 5
.S.K.
K#HK.
EKH#K
#.K#.
#####





Case 7:

10 10
HK...HHH..
KH......K.
..###H..#.
.K...H...K
.#...H...H
.K...HK..H
.#H####..H
..H....HHH
..HSE...K.
##########
```
In Case 1, you can win in 1 frame by pressing the key D.
In Case 2, you can win in 1 frame by pressing the key A.
In Case 3, you can win in 4 frames by pressing the sequence of keys DWD
In Case 4, you can win in 7 frames by pressing the sequence of keys DWWAA: [Video](http://asciinema.org/a/6vrvhwaps49jsqzxig3eke3jq)
In Case 5, you can win in 16 frames by pressing the sequence of keys ADWDWWDWD: [Video](http://asciinema.org/a/eza7uh5vrvwl4lgpabiz7kwa8)
In Case 6, you cannot win.
In Case 7, you can win in 75 frames: [Video](http://asciinema.org/a/3jzkf693i9c13i7vnq9awga5w)

**Limits**

2 ≤ N, M ≤ 301
0 ≤ number of keys ≤ 16
**Sample Input**
```
7
2 3
#SE
###
2 3
S.E
###
3 3
.K.
S.E
###
4 4
H..K
.H..
S..E
####
5 5
.S.K.
K#K.K
.KH#K
K.K.E
#####
5 5
.S.K.
K#HK.
EKH#K
#.K#.
#####
10 10
HK...HHH..
KH......K.
..###H..#.
.K...H...K
.#...H...H
.K...HK..H
.#H####..H
..H....HHH
..HSE...K.
##########
```
**Sample Output**
```
Case #1: 1 D
Case #2: 1 A
Case #3: 4 DWD
Case #4: 7 DWWAA
Case #5: 16 ADWDWWDWD
Case #6: IMPOSSIBLE
Case #7: 75 AWWWADDDDDAWWWWAAAAADDWWWDDDWWWWAAAAWSSDDDDWWWWWDDDDASSAAAA
```
