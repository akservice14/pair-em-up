# Pair 'em Up 🎮

A number-matching puzzle game. Clear the grid by removing valid pairs and reach **100 points** to win.

## How to play

Pick a mode, then click two numbers to remove them.

**A pair is valid when the numbers are:**

- the same (7 + 7) → **+1 point**
- adding up to 10 (3 + 7) → **+2 points**
- two fives (5 + 5) → **+3 points**

**...and the cells are connected:**

- next to each other horizontally or vertically
- in the same row or column with only empty cells between them
- at the end of one row and the start of the next

Matched numbers disappear. Wrong pairs stay put.

## Modes

- **Classic** — numbers 1–19 in order
- **Random** — the same numbers, shuffled
- **Chaotic** — 27 random digits from 1 to 9

## Assists

| Tool | What it does | Uses |
| --- | --- | --- |
| Hints | Counts the moves available right now
| Revert | Undoes your last move | 1 per move |
| Add Numbers | Adds more numbers to the grid | 10 |
| Shuffle | Rearranges the board | 5 |
| Eraser | Deletes one number | 5 |

## Winning and losing

You win at 100 points. You lose if there are no moves left and no assists remain, or if the grid grows past 50 rows.

Your progress saves automatically, so you can close the tab and continue later.

## Running locally

```bash
npm install
npm run dev
```
