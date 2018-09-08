if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'turn-timer'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'turn-timer'.");
}
this['turn-timer'] = function (_, Kotlin) {
  'use strict';
  var $$importsForInline$$ = _.$$importsForInline$$ || (_.$$importsForInline$$ = {});
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var throwCCE = Kotlin.throwCCE;
  var Unit = Kotlin.kotlin.Unit;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var addClass = Kotlin.kotlin.dom.addClass_hhb33f$;
  var appendElement = Kotlin.kotlin.dom.appendElement_ldvnw0$;
  var removeClass = Kotlin.kotlin.dom.removeClass_hhb33f$;
  var asList = Kotlin.org.w3c.dom.asList_kt9thq$;
  var ensureNotNull = Kotlin.ensureNotNull;
  var throwUPAE = Kotlin.throwUPAE;
  var mutableListOf = Kotlin.kotlin.collections.mutableListOf_i5x0yv$;
  var max = Kotlin.kotlin.collections.max_exjks8$;
  var toString = Kotlin.toString;
  var defineInlineFunction = Kotlin.defineInlineFunction;
  var playerColors;
  function main$lambda(closure$playerNames) {
    return function (f) {
      closure$playerNames.addPlayer();
      return Unit;
    };
  }
  function main(args) {
    var tmp$;
    var playerNames = new PlayerNamesInput();
    var addPlayerButton = Kotlin.isType(tmp$ = document.getElementById('addPlayerButton'), HTMLButtonElement) ? tmp$ : throwCCE();
    addPlayerButton.onclick = main$lambda(playerNames);
  }
  function CartesianCoordinate(x, y) {
    this.x = x;
    this.y = y;
  }
  CartesianCoordinate.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CartesianCoordinate',
    interfaces: []
  };
  CartesianCoordinate.prototype.component1 = function () {
    return this.x;
  };
  CartesianCoordinate.prototype.component2 = function () {
    return this.y;
  };
  CartesianCoordinate.prototype.copy_vux9f0$ = function (x, y) {
    return new CartesianCoordinate(x === void 0 ? this.x : x, y === void 0 ? this.y : y);
  };
  CartesianCoordinate.prototype.toString = function () {
    return 'CartesianCoordinate(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + ')';
  };
  CartesianCoordinate.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    return result;
  };
  CartesianCoordinate.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y)))));
  };
  function PlayerNamesInput() {
    var tmp$, tmp$_0;
    this.playerNamesDiv_0 = Kotlin.isType(tmp$ = document.getElementById('playerNames'), HTMLDivElement) ? tmp$ : throwCCE();
    this.doneButton_0 = Kotlin.isType(tmp$_0 = document.getElementById('doneButton'), HTMLButtonElement) ? tmp$_0 : throwCCE();
    this.nPlayers_0 = 0;
    this.doneButton_0.onclick = PlayerNamesInput_init$lambda(this);
  }
  function PlayerNamesInput$addPlayer$lambda$lambda(this$PlayerNamesInput) {
    return function ($receiver) {
      $receiver.textContent = 'Player ' + this$PlayerNamesInput.nPlayers_0;
      return Unit;
    };
  }
  function PlayerNamesInput$addPlayer$lambda$lambda_0($receiver) {
    var tmp$;
    addClass($receiver, ['form-control', 'player-name']);
    (Kotlin.isType(tmp$ = $receiver, HTMLInputElement) ? tmp$ : throwCCE()).type = 'text';
    return Unit;
  }
  function PlayerNamesInput$addPlayer$lambda(this$PlayerNamesInput) {
    return function ($receiver) {
      addClass($receiver, ['form-group']);
      appendElement($receiver, 'label', PlayerNamesInput$addPlayer$lambda$lambda(this$PlayerNamesInput));
      appendElement($receiver, 'input', PlayerNamesInput$addPlayer$lambda$lambda_0);
      return Unit;
    };
  }
  PlayerNamesInput.prototype.addPlayer = function () {
    this.nPlayers_0 = this.nPlayers_0 + 1 | 0;
    appendElement(this.playerNamesDiv_0, 'div', PlayerNamesInput$addPlayer$lambda(this));
    removeClass(this.doneButton_0, ['d-none']);
  };
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  PlayerNamesInput.prototype.getNames_0 = function () {
    var $receiver = asList(this.playerNamesDiv_0.getElementsByClassName('player-name'));
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      var tmp$_0;
      destination.add_11rb$(Kotlin.isType(tmp$_0 = item, HTMLInputElement) ? tmp$_0 : throwCCE());
    }
    var destination_0 = ArrayList_init(collectionSizeOrDefault(destination, 10));
    var tmp$_1;
    tmp$_1 = destination.iterator();
    while (tmp$_1.hasNext()) {
      var item_0 = tmp$_1.next();
      destination_0.add_11rb$(item_0.value);
    }
    return destination_0;
  };
  PlayerNamesInput.prototype.newGame_0 = function () {
    addClass(ensureNotNull(document.getElementById('namesInput')), ['d-none']);
    removeClass(ensureNotNull(document.getElementById('timer')), ['d-none']);
    new GameTimer(new Game(this.getNames_0()));
  };
  function PlayerNamesInput_init$lambda(this$PlayerNamesInput) {
    return function (f) {
      this$PlayerNamesInput.newGame_0();
      return Unit;
    };
  }
  PlayerNamesInput.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'PlayerNamesInput',
    interfaces: []
  };
  function Player(name, durationMillis) {
    this.name = name;
    this.durationMillis = durationMillis;
  }
  Player.prototype.toString = function () {
    return this.name + ': ' + millisToTimeString(this.durationMillis);
  };
  Player.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Player',
    interfaces: []
  };
  Player.prototype.component1 = function () {
    return this.name;
  };
  Player.prototype.component2 = function () {
    return this.durationMillis;
  };
  Player.prototype.copy_bm4lxs$ = function (name, durationMillis) {
    return new Player(name === void 0 ? this.name : name, durationMillis === void 0 ? this.durationMillis : durationMillis);
  };
  Player.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.name) | 0;
    result = result * 31 + Kotlin.hashCode(this.durationMillis) | 0;
    return result;
  };
  Player.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.name, other.name) && Kotlin.equals(this.durationMillis, other.durationMillis)))));
  };
  var ArrayList_init_0 = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  function Game(playerNames) {
    var destination = ArrayList_init(collectionSizeOrDefault(playerNames, 10));
    var tmp$;
    tmp$ = playerNames.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(new Player(item, 0));
    }
    this.players = destination;
    this.turnHistory_0 = ArrayList_init_0();
    this.startDate_xqczty$_0 = this.startDate_xqczty$_0;
    this.previousTurnEnd_pjhxv5$_0 = this.previousTurnEnd_pjhxv5$_0;
  }
  Object.defineProperty(Game.prototype, 'startDate_0', {
    get: function () {
      if (this.startDate_xqczty$_0 == null)
        return throwUPAE('startDate');
      return this.startDate_xqczty$_0;
    },
    set: function (startDate) {
      this.startDate_xqczty$_0 = startDate;
    }
  });
  Object.defineProperty(Game.prototype, 'previousTurnEnd_0', {
    get: function () {
      if (this.previousTurnEnd_pjhxv5$_0 == null)
        return throwUPAE('previousTurnEnd');
      return this.previousTurnEnd_pjhxv5$_0;
    },
    set: function (previousTurnEnd) {
      this.previousTurnEnd_pjhxv5$_0 = previousTurnEnd;
    }
  });
  Game.prototype.start = function () {
    this.startDate_0 = new Date();
    this.previousTurnEnd_0 = this.startDate_0;
  };
  Game.prototype.stop = function () {
    this.nextTurn();
  };
  Game.prototype.getTotalElapsed_qjzqsm$ = function (now) {
    var tmp$;
    return typeof (tmp$ = now - this.startDate_0) === 'number' ? tmp$ : throwCCE();
  };
  Game.prototype.getTurnElapsed_qjzqsm$ = function (now) {
    var tmp$;
    return typeof (tmp$ = now - this.previousTurnEnd_0) === 'number' ? tmp$ : throwCCE();
  };
  Game.prototype.nextTurn = function () {
    var tmp$, tmp$_0;
    var now = new Date();
    var elapsed = typeof (tmp$ = now - this.previousTurnEnd_0) === 'number' ? tmp$ : throwCCE();
    tmp$_0 = this.getCurrentPlayer();
    tmp$_0.durationMillis = tmp$_0.durationMillis + elapsed | 0;
    this.turnHistory_0.add_11rb$(elapsed);
    this.previousTurnEnd_0 = now;
  };
  Game.prototype.getCurrentPlayer = function () {
    return this.players.get_za3lpa$(this.turnHistory_0.size % this.players.size);
  };
  var LinkedHashMap_init = Kotlin.kotlin.collections.LinkedHashMap_init_q3lmfv$;
  Game.prototype.getTurnData = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    var runningTotals = ArrayList_init_0();
    var data = ArrayList_init_0();
    tmp$ = this.players.iterator();
    while (tmp$.hasNext()) {
      var player = tmp$.next();
      data.add_11rb$(mutableListOf([new CartesianCoordinate(0, 0)]));
      runningTotals.add_11rb$(0);
    }
    tmp$_0 = this.turnHistory_0.size;
    for (var turn = 0; turn < tmp$_0; turn++) {
      var currentPlayerIndex = turn % this.players.size;
      tmp$_1 = data.size;
      for (var playerIndex = 0; playerIndex < tmp$_1; playerIndex++) {
        var playerData = data.get_za3lpa$(playerIndex);
        if (playerIndex === currentPlayerIndex) {
          runningTotals.set_wxm5ur$(playerIndex, runningTotals.get_za3lpa$(playerIndex) + this.turnHistory_0.get_za3lpa$(turn) | 0);
        }
        playerData.add_11rb$(new CartesianCoordinate(turn + 1 | 0, runningTotals.get_za3lpa$(playerIndex)));
      }
    }
    var result = LinkedHashMap_init();
    tmp$_2 = this.players.size;
    for (var i = 0; i < tmp$_2; i++) {
      var key = this.players.get_za3lpa$(i).name;
      var value = data.get_za3lpa$(i);
      result.put_xwzc9p$(key, value);
    }
    return result;
  };
  Game.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Game',
    interfaces: []
  };
  function GameTimer(game) {
    this.game_0 = game;
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5;
    this.totalTimeSpan_0 = Kotlin.isType(tmp$ = document.getElementById('totalTime'), HTMLSpanElement) ? tmp$ : throwCCE();
    this.currentPlayerCell_0 = Kotlin.isType(tmp$_0 = document.getElementById('currentPlayer'), HTMLTableCellElement) ? tmp$_0 : throwCCE();
    this.currentTimeCell_0 = Kotlin.isType(tmp$_1 = document.getElementById('currentTime'), HTMLTableCellElement) ? tmp$_1 : throwCCE();
    this.playersTable_0 = Kotlin.isType(tmp$_2 = document.getElementById('players'), HTMLTableElement) ? tmp$_2 : throwCCE();
    this.startButton_0 = Kotlin.isType(tmp$_3 = document.getElementById('startButton'), HTMLButtonElement) ? tmp$_3 : throwCCE();
    this.stopButton_0 = Kotlin.isType(tmp$_4 = document.getElementById('stopButton'), HTMLButtonElement) ? tmp$_4 : throwCCE();
    this.nextButton_0 = Kotlin.isType(tmp$_5 = document.getElementById('nextButton'), HTMLButtonElement) ? tmp$_5 : throwCCE();
    this.playerRows_0 = null;
    this.updateInterval_0 = 0;
    var $receiver = this.game_0.players;
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$_6;
    tmp$_6 = $receiver.iterator();
    while (tmp$_6.hasNext()) {
      var item = tmp$_6.next();
      var tmp$_7;
      destination.add_11rb$(Kotlin.isType(tmp$_7 = appendElement(this.playersTable_0, 'tr', GameTimer_init$lambda$lambda(item)), HTMLTableRowElement) ? tmp$_7 : throwCCE());
    }
    this.playerRows_0 = destination;
    this.startButton_0.onclick = GameTimer_init$lambda(this);
    this.stopButton_0.onclick = GameTimer_init$lambda_0(this);
    this.nextButton_0.onclick = GameTimer_init$lambda_1(this);
    removeClass(this.startButton_0, ['d-none']);
  }
  function GameTimer$start$lambda(this$GameTimer) {
    return function () {
      this$GameTimer.update_0();
      return Unit;
    };
  }
  GameTimer.prototype.start_0 = function () {
    this.game_0.start();
    if (this.updateInterval_0 !== 0) {
      window.clearInterval(this.updateInterval_0);
    }
    this.updateInterval_0 = window.setInterval(GameTimer$start$lambda(this), 167);
    addClass(this.startButton_0, ['d-none']);
    removeClass(this.nextButton_0, ['d-none']);
    removeClass(this.stopButton_0, ['d-none']);
  };
  GameTimer.prototype.stop_0 = function () {
    this.game_0.stop();
    window.clearInterval(this.updateInterval_0);
    this.update_0();
    this.updateInterval_0 = 0;
    this.showResult_0();
  };
  GameTimer.prototype.next = function () {
    this.game_0.nextTurn();
  };
  var Math_0 = Math;
  GameTimer.prototype.update_0 = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
    var now = new Date();
    var totalElapsed = this.game_0.getTotalElapsed_qjzqsm$(now);
    this.totalTimeSpan_0.textContent = millisToTimeString(totalElapsed);
    this.currentTimeCell_0.textContent = millisToTimeString(this.game_0.getTurnElapsed_qjzqsm$(now));
    var currentPlayerDuration = this.game_0.getCurrentPlayer().durationMillis + this.game_0.getTurnElapsed_qjzqsm$(now) | 0;
    var $receiver = this.game_0.players;
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$_5;
    tmp$_5 = $receiver.iterator();
    while (tmp$_5.hasNext()) {
      var item = tmp$_5.next();
      destination.add_11rb$(item.durationMillis);
    }
    var b = (tmp$ = max(destination)) != null ? tmp$ : 0;
    var b_0 = Math_0.max(currentPlayerDuration, b);
    var maxDuration = Math_0.max(1, b_0);
    tmp$_0 = this.game_0.players.size;
    for (var i = 0; i < tmp$_0; i++) {
      var player = this.game_0.players.get_za3lpa$(i);
      var tableRow = this.playerRows_0.get_za3lpa$(i);
      var nameCell = Kotlin.isType(tmp$_1 = tableRow.getElementsByClassName('player-name')[0], HTMLTableCellElement) ? tmp$_1 : throwCCE();
      var timeCell = Kotlin.isType(tmp$_2 = tableRow.getElementsByClassName('player-time')[0], HTMLTableCellElement) ? tmp$_2 : throwCCE();
      if ((tmp$_3 = this.game_0.getCurrentPlayer()) != null ? tmp$_3.equals(player) : null) {
        tmp$_4 = currentPlayerDuration;
      }
       else {
        tmp$_4 = player.durationMillis;
      }
      var playerDuration = tmp$_4;
      var percent = (100 * playerDuration | 0) / maxDuration | 0;
      tableRow.style.background = 'linear-gradient(90deg, ' + playerColors.get_za3lpa$(i) + '80 ' + percent + '%, white 0%)';
      if (player != null ? player.equals(this.game_0.getCurrentPlayer()) : null) {
        this.currentPlayerCell_0.textContent = player.name;
        addClass(nameCell, ['current-player']);
        timeCell.textContent = millisToTimeString(currentPlayerDuration);
      }
       else {
        removeClass(nameCell, ['current-player']);
        timeCell.textContent = millisToTimeString(player.durationMillis);
      }
    }
  };
  var copyToArray = Kotlin.kotlin.collections.copyToArray;
  function GameTimer$showResult$lambda$lambda$lambda$lambda$lambda$lambda(v, f, f_0) {
    return millisToTimeString(v);
  }
  GameTimer.prototype.showResult_0 = function () {
    var tmp$;
    var main = ensureNotNull(document.getElementById('main'));
    removeClass(main, ['d-flex']);
    addClass(main, ['d-none']);
    var canvas = Kotlin.isType(tmp$ = document.getElementById('result'), HTMLCanvasElement) ? tmp$ : throwCCE();
    removeClass(canvas, ['d-none']);
    var colors = playerColors.iterator();
    var $receiver = this.game_0.getTurnData();
    var destination = ArrayList_init($receiver.size);
    var tmp$_0;
    tmp$_0 = $receiver.entries.iterator();
    while (tmp$_0.hasNext()) {
      var item = tmp$_0.next();
      var tmp$_1 = destination.add_11rb$;
      var o = {};
      o.label = item.key;
      o.data = copyToArray(item.value);
      o.fill = false;
      o.lineTension = 0;
      o.borderColor = colors.next();
      tmp$_1.call(destination, o);
    }
    var playerData = copyToArray(destination);
    var tmp$_2 = canvas.getContext('2d');
    var o_0 = {};
    o_0.type = 'line';
    var o_1 = {};
    o_1.datasets = playerData;
    o_0.data = o_1;
    var o_2 = {};
    var o_3 = {};
    var o_4 = {};
    o_4.display = true;
    o_4.type = 'linear';
    o_4.position = 'bottom';
    o_3.xAxes = [o_4];
    var o_5 = {};
    o_5.display = true;
    o_5.type = 'linear';
    o_5.position = 'left';
    var o_6 = {};
    o_6.callback = GameTimer$showResult$lambda$lambda$lambda$lambda$lambda$lambda;
    o_5.ticks = o_6;
    o_3.yAxes = [o_5];
    o_2.scales = o_3;
    o_0.options = o_2;
    new Chart(tmp$_2, o_0);
  };
  function GameTimer_init$lambda$lambda$lambda(closure$it) {
    return function ($receiver) {
      addClass($receiver, ['player-name']);
      $receiver.textContent = closure$it.name;
      return Unit;
    };
  }
  function GameTimer_init$lambda$lambda$lambda_0(closure$it) {
    return function ($receiver) {
      addClass($receiver, ['player-time text-right']);
      $receiver.textContent = millisToTimeString(closure$it.durationMillis);
      return Unit;
    };
  }
  function GameTimer_init$lambda$lambda(closure$it) {
    return function ($receiver) {
      appendElement($receiver, 'td', GameTimer_init$lambda$lambda$lambda(closure$it));
      appendElement($receiver, 'td', GameTimer_init$lambda$lambda$lambda_0(closure$it));
      return Unit;
    };
  }
  function GameTimer_init$lambda(this$GameTimer) {
    return function (f) {
      this$GameTimer.start_0();
      return Unit;
    };
  }
  function GameTimer_init$lambda_0(this$GameTimer) {
    return function (f) {
      this$GameTimer.stop_0();
      return Unit;
    };
  }
  function GameTimer_init$lambda_1(this$GameTimer) {
    return function (f) {
      this$GameTimer.next();
      return Unit;
    };
  }
  GameTimer.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'GameTimer',
    interfaces: []
  };
  function millisToTimeString$pad($receiver) {
    return ($receiver < 10 ? '0' : '') + toString($receiver);
  }
  function millisToTimeString$padTail($receiver) {
    return ($receiver < 10 ? '00' : $receiver < 100 ? '0' : '') + toString($receiver);
  }
  function millisToTimeString(duration) {
    var millis = duration % 1000;
    var seconds = (duration / 1000 | 0) % 60;
    var minutes = ((duration / 1000 | 0) / 60 | 0) % 60;
    var hours = ((duration / 1000 | 0) / 60 | 0) / 60 | 0;
    var pad = millisToTimeString$pad;
    var padTail = millisToTimeString$padTail;
    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds) + '.' + padTail(millis);
  }
  var jsObject = defineInlineFunction('turn-timer.jsObject_5ij4lk$', function (init) {
    var o = {};
    init(o);
    return o;
  });
  Object.defineProperty(_, 'playerColors', {
    get: function () {
      return playerColors;
    }
  });
  _.main_kand9s$ = main;
  _.CartesianCoordinate = CartesianCoordinate;
  _.PlayerNamesInput = PlayerNamesInput;
  _.Player = Player;
  _.Game = Game;
  $$importsForInline$$['turn-timer'] = _;
  _.GameTimer = GameTimer;
  _.millisToTimeString_za3lpa$ = millisToTimeString;
  _.jsObject_5ij4lk$ = jsObject;
  playerColors = listOf(['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E']);
  main([]);
  Kotlin.defineModule('turn-timer', _);
  return _;
}(typeof this['turn-timer'] === 'undefined' ? {} : this['turn-timer'], kotlin);
