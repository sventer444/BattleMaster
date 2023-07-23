// import 'dart:async';

import 'package:battle_master/constants/mon.dart';
import 'package:flutter/foundation.dart';

import '../constants/dex_status.dart';
import 'persistence/player/player_persistence.dart';

/// Encapsulates the player's progress.
class PlayerProgress extends ChangeNotifier {
  final PlayerProgressPersistence _store;

  String _farthestRegion = 'Kanto';

  bool _runInProgress = false;

  int _highestRoute = 0;

  int _furthestLocationReached = 0;

  List<(String, DexStatus)> _playerDex = List.empty(growable: true);

  List<Pokemon> _playerPc = List.empty(growable: true);

  List<Pokemon> _playerTeam = List.empty(growable: true);

  PlayerProgress(this._store);

  // Furthest region the player has reached
  String get farthestRegion => _farthestRegion;
  // Highest route player has reached
  int get highestRoute => _highestRoute;
  // Whether or not the player has an active run
  bool get runInProgresss => _runInProgress;
  // Furthest location player has reached
  int get furthestLocationReached => _furthestLocationReached;
  // List of pokemon the player has encountered
  List<(String, DexStatus)> get playerDex => _playerDex;
  // Pokemon available in the player's pc
  List<Pokemon> get playerPc => _playerPc;
  // Pokemon currently assigned to the player's team
  List<Pokemon> get playerTeam => _playerTeam;

  void getLatestFromStore() async {
    // final level = await _store.getHighestLevelReached();
    // if (level > _highestLevelReached) {
    //   _highestLevelReached = level;
    //   notifyListeners();
    // } else if (level < _highestLevelReached) {
    //   _store.saveHighestLevelReached(_highestLevelReached);
    // }
    _farthestRegion = await _store.getFarthestRegion();
    _highestRoute = await _store.getHighestRoute();
    _furthestLocationReached = await _store.getFurthestLocationReached();
    _playerDex = await _store.getPlayerDex();
    _playerPc = await _store.getPlayerPc();
    _playerTeam = await _store.getPlayerTeam();
    _runInProgress = await _store.getRunInProgress();
    notifyListeners();
  }

  void endPlayerRun() {
    _runInProgress = false;
    _highestRoute = 0;
    _furthestLocationReached = 0;
    _playerPc = List.empty(growable: true);
    _playerTeam = List.empty(growable: true);

    notifyListeners();
    _store.savePlayerData(
        _farthestRegion,
        _highestRoute,
        _furthestLocationReached,
        _playerDex,
        _playerPc,
        _playerTeam,
        _runInProgress);
  }

  /// Resets the player's progress
  void reset() {
    _farthestRegion = 'Kanto';
    _highestRoute = 0;
    _furthestLocationReached = 0;
    _playerDex = List.empty(growable: true);
    _playerPc = List.empty(growable: true);
    _playerTeam = List.empty(growable: true);
    _runInProgress = false;

    notifyListeners();
    _store.savePlayerData(
        _farthestRegion,
        _highestRoute,
        _furthestLocationReached,
        _playerDex,
        _playerPc,
        _playerTeam,
        _runInProgress);
  }

  /// Registers [level] as reached.
  ///
  /// If this is higher than [highestLevelReached], it will update that
  /// value and save it to the injected persistence store.
  // void setLevelReached(int level) {
  //   if (level > _highestLevelReached) {
  //     _highestLevelReached = level;
  //     notifyListeners();

  //     unawaited(_store.saveHighestLevelReached(level));
  //   }
  // }

  void setFarthestRegion(String region) {
    _farthestRegion = region;
    notifyListeners();
    _store.saveFarthestRegion(region);
  }

  void setHighestRoute(int route) {
    _highestRoute = route;
    notifyListeners();
    _store.saveHighestRoute(route);
  }

  void setFurthestLocationReached(int location) {
    _furthestLocationReached = location;
    notifyListeners();
    _store.saveFurthestLocationReached(location);
  }

  void setPlayerDex((String, DexStatus) playerDex) {
    _playerDex.add(playerDex);
    notifyListeners();
    _store.savePlayerDex(_playerDex);
  }

  void setRunInProgress(bool progress) {
    _runInProgress = progress;
    notifyListeners();
    _store.saveRunInProgress(_runInProgress);
  }

  void setPlayerPc(Pokemon playerPc) {
    _playerPc.add(playerPc);
    notifyListeners();
    _store.savePlayerPc(_playerPc);
  }

  void setPlayerTeam(Pokemon playerTeam) {
    _playerTeam.add(playerTeam);
    notifyListeners();
    _store.savePlayerTeam(_playerTeam);
  }
}
