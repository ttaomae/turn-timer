
import org.w3c.dom.HTMLButtonElement
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.HTMLDivElement
import org.w3c.dom.HTMLInputElement
import org.w3c.dom.HTMLSpanElement
import org.w3c.dom.HTMLTableCellElement
import org.w3c.dom.HTMLTableElement
import org.w3c.dom.HTMLTableRowElement
import org.w3c.dom.asList
import org.w3c.dom.get
import kotlin.browser.document
import kotlin.browser.window
import kotlin.dom.addClass
import kotlin.dom.appendElement
import kotlin.dom.removeClass
import kotlin.js.Date
import kotlin.math.max

val playerColors = listOf(
        "#3366CC", "#DC3912", "#FF9900", "#109618", "#990099",
        "#3B3EAC", "#0099C6", "#DD4477", "#66AA00", "#B82E2E")

fun main(args: Array<String>) {
    val playerNames = PlayerNamesInput()
    val addPlayerButton = document.getElementById("addPlayerButton") as HTMLButtonElement
    addPlayerButton.onclick = { _ -> playerNames.addPlayer() }
}

data class CartesianCoordinate(val x: Int, val y: Int)

class PlayerNamesInput {
    private val playerNamesDiv: HTMLDivElement = document.getElementById("playerNames") as HTMLDivElement
    private val doneButton: HTMLButtonElement = document.getElementById("doneButton") as HTMLButtonElement
    private var nPlayers: Int = 0

    init {
        doneButton.onclick = { _ -> newGame() }
    }

    /**
     * Add a new player input field.
     */
    fun addPlayer() {
        nPlayers++
        playerNamesDiv.appendElement("div") {
            this.addClass("form-group")
            this.appendElement("label") {
                this.textContent = "Player $nPlayers"
            }
            this.appendElement("input") {
                this.addClass("form-control", "player-name")
                (this as HTMLInputElement).type = "text"
            }
        }
        doneButton.removeClass("d-none")
    }

    private fun getNames(): List<String> {
        return playerNamesDiv.getElementsByClassName("player-name")
                .asList()
                .map { it as HTMLInputElement }
                .map { it.value }
    }

    private fun newGame() {
        document.getElementById("namesInput")!!.addClass("d-none")
        document.getElementById("timer")!!.removeClass("d-none")
        GameTimer(Game(getNames()))
    }
}


data class Player(val name: String, var durationMillis: Int) {
    override fun toString(): String {
        return "$name: ${millisToTimeString(durationMillis)}"
    }
}

class Game(playerNames: List<String>) {
    val players: List<Player> = playerNames.map { Player(it, 0) }
    private var turnHistory: MutableList<Int> = mutableListOf()
    private lateinit var startDate: Date
    private lateinit var previousTurnEnd: Date

    fun start() {
        startDate = Date()
        previousTurnEnd = startDate
    }

    fun stop() {
        nextTurn()
    }

    fun getTotalElapsed(now: Date): Int {
        return (now.asDynamic() - startDate.asDynamic()) as Int
    }

    fun getTurnElapsed(now: Date): Int {
        return (now.asDynamic() - previousTurnEnd.asDynamic()) as Int
    }

    fun nextTurn() {
        val now = Date()
        val elapsed: Int = (now.asDynamic() - previousTurnEnd.asDynamic()) as Int
        getCurrentPlayer().durationMillis += elapsed
        turnHistory.add(elapsed)
        previousTurnEnd = now
    }

    fun getCurrentPlayer(): Player {
        return players[turnHistory.size % players.size]
    }

    fun getTurnData(): Map<String, List<CartesianCoordinate>> {
        val runningTotals = mutableListOf<Int>()
        val data = mutableListOf<MutableList<CartesianCoordinate>>()
        for (player in players) {
            data.add(mutableListOf(CartesianCoordinate(0, 0)))
            runningTotals.add(0)
        }

        for (turn in 0 until turnHistory.size) {
            val currentPlayerIndex = turn % players.size
            for (playerIndex in 0 until data.size) {
                val playerData = data[playerIndex]
                // Update running total for current player.
                if (playerIndex == currentPlayerIndex) {
                    runningTotals[playerIndex] += turnHistory[turn]
                }
                playerData.add(CartesianCoordinate(turn+1, runningTotals[playerIndex]))
            }
        }

        val result = mutableMapOf<String, List<CartesianCoordinate>>()
        for (i in 0 until players.size) {
            result[players[i].name] = data[i]
        }
        return result
    }
}

class GameTimer(private val game: Game) {
    private val totalTimeSpan: HTMLSpanElement = document.getElementById("totalTime") as HTMLSpanElement
    private val currentPlayerCell: HTMLTableCellElement = document.getElementById("currentPlayer") as HTMLTableCellElement
    private val currentTimeCell: HTMLTableCellElement = document.getElementById("currentTime") as HTMLTableCellElement
    private val playersTable: HTMLTableElement = document.getElementById("players") as HTMLTableElement
    private val startButton: HTMLButtonElement = document.getElementById("startButton") as HTMLButtonElement
    private val stopButton: HTMLButtonElement = document.getElementById("stopButton") as HTMLButtonElement
    private val nextButton: HTMLButtonElement = document.getElementById("nextButton") as HTMLButtonElement
    private val playerRows: List<HTMLTableRowElement>
    private var updateInterval: Int = 0

    init {
        playerRows = game.players.map {
            playersTable.appendElement("tr") {
                this.appendElement("td") {
                    this.addClass("player-name")
                    this.textContent = it.name
                }

                this.appendElement("td") {
                    this.addClass("player-time text-right")
                    this.textContent = millisToTimeString(it.durationMillis)
                }
            } as HTMLTableRowElement
        }

        startButton.onclick = { _ -> start() }
        stopButton.onclick = { _ -> stop() }
        nextButton.onclick = { _ -> next() }

        startButton.removeClass("d-none")
    }

    private fun start() {
        game.start()

        if (updateInterval != 0) {
            window.clearInterval(updateInterval)
        }

        updateInterval = window.setInterval({ update() }, 167)
        startButton.addClass("d-none")
        nextButton.removeClass("d-none")
        stopButton.removeClass("d-none")
    }

    private fun stop() {
        game.stop()
        window.clearInterval(updateInterval)
        update()
        updateInterval = 0
        showResult()
    }

    fun next() {
        game.nextTurn()
    }

    /**
     * Update timer display.
     */
    private fun update() {
        val now = Date()
        val totalElapsed = game.getTotalElapsed(now)

        // Set total and current time
        totalTimeSpan.textContent = millisToTimeString(totalElapsed)
        currentTimeCell.textContent = millisToTimeString(game.getTurnElapsed(now))

        val currentPlayerDuration = game.getCurrentPlayer().durationMillis + game.getTurnElapsed(now)

        // Ensure duration is at least 1 to prevent divide-by-zero errors later.
        val maxDuration = max(1, max(currentPlayerDuration, (game.players.map { it.durationMillis }.max() ?: 0)))

        for (i in 0 until game.players.size) {
            val player = game.players[i]
            val tableRow = playerRows[i]

            val nameCell = tableRow.getElementsByClassName("player-name")[0] as HTMLTableCellElement
            val timeCell = tableRow.getElementsByClassName("player-time")[0] as HTMLTableCellElement

            val playerDuration = if (game.getCurrentPlayer() == player) { currentPlayerDuration } else { player.durationMillis }
            val percent = (100 * playerDuration) / maxDuration

            // Set background to a colored bar representing percentage of max player time.
            // Color uses 50% opacity represented as RGBA hex notation (i.e. '#RRGGBBAA').
            tableRow.style.background = "linear-gradient(90deg, ${playerColors[i]}80 $percent%, white 0%)"

            if (player == game.getCurrentPlayer()) {
                currentPlayerCell.textContent = player.name
                nameCell.addClass("current-player")
                timeCell.textContent = millisToTimeString(currentPlayerDuration)
            }
            else {
                nameCell.removeClass("current-player")
                timeCell.textContent = millisToTimeString(player.durationMillis)
            }
        }
    }

    /**
     * Display player times as a line chart.
     */
    private fun showResult()
    {
        // Hide timer.
        val main = document.getElementById("main")!!
        main.removeClass("d-flex")
        main.addClass("d-none")

        // Show result graph.
        val canvas = document.getElementById("result") as HTMLCanvasElement
        canvas.removeClass("d-none")

        val colors = playerColors.iterator()

        // Convert player turn data into JS objects for chart data.
        val playerData = game.getTurnData()
                .map {
                    jsObject {
                        label = it.key
                        data = it.value.toTypedArray()
                        fill = false
                        lineTension = 0
                        borderColor = colors.next()
                    }
                }
                .toTypedArray()

        // Draw line chart on canvas.
        Chart(canvas.getContext("2d"), jsObject {
            type = "line"
            data = jsObject {
                datasets = playerData
            }
            options = jsObject {
                scales = jsObject {
                    xAxes = arrayOf(jsObject {
                        display = true
                        type = "linear"
                        position = "bottom"
                    })
                    yAxes = arrayOf(jsObject {
                        display = true
                        type = "linear"
                        position = "left"
                        ticks = jsObject {
                            callback = { v: Int, _: Any, _: Any -> millisToTimeString(v) }
                        }
                    })
                }
            }
        })
    }
}

/**
 * Convert a duration in milliseconds into a string with the format: hh:mm:ss.ssss
 */
fun millisToTimeString(duration: Int): String {
    val millis = duration % 1000
    val seconds = (duration / 1000) % 60
    val minutes = (duration / 1000 / 60) % 60
    val hours = (duration / 1000 / 60 / 60)

    fun Int.pad(): String {
        return (if (this < 10) "0" else "") + this
    }

    fun Int.padTail(): String {
        return (if (this < 10) "00" else if (this < 100) "0" else "") + this
    }

    return "${hours.pad()}:${minutes.pad()}:${seconds.pad()}.${millis.padTail()}"
}

/**
 * Create a JavaScript object.
 */
inline fun jsObject(init: dynamic.() -> Unit): dynamic {
    val o = js("{}")
    init(o)
    return o
}
