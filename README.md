# Turn Timer
Time player turns for tabletop games. See who is taking the longest to finish their turns.

## Usage
* Enter the names of players, in turn order, then click "Done".
* Click "Start" to start timing.
* Click "Next" each time a player completes their turn.
  * The colored background behind each player name represents the amount of time each player has
    taken, relative to the player who has taken the most amount of time.
* Click "Stop" when the game ends.
  * A chart will replace the list of players and show how long each player took over the course of
    the game.

## Development
To build the project run `./gradlew clean assemble`. This will produce a directory called `web`,
which contains everything necessary to run the timer. Simply open `index.html` in your browser.
