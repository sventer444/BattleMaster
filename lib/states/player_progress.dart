// import 'dart:async';

import 'package:flutter/foundation.dart';

import '../constants/dex_status.dart';
import 'persistence/player/player_persistence.dart';

/// Encapsulates the player's progress.
class PlayerProgress extends ChangeNotifier {
  final PlayerProgressPersistence _store;

  String _farthestRegion = 'Kanto';

  int _highestRoute = 0;

  int _furthestLocationReached = 0;

  List<(String, DexStatus)> _playerDex = List.empty(growable: true);

  List<String> _playerPc = List.empty(growable: true);

  List<String> _playerTeam = List.empty(growable: true);

  PlayerProgress(this._store);

  // Furthest region the player has reached
  String get farthestRegion => _farthestRegion;
  // Highest route player has reached
  int get highestRoute => _highestRoute;
  // Furthest location player has reached
  int get furthestLocationReached => _furthestLocationReached;
  // List of pokemon the player has encountered
  List<(String, DexStatus)> get playerDex => _playerDex;
  // Pokemon available in the player's pc
  List<String> get playerPc => _playerPc;
  // Pokemon currently assigned to the player's team
  List<String> get playerTeam => _playerTeam;

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
    notifyListeners();
  }

  /// Resets the player's progress
  void reset() {
    _farthestRegion = 'Kanto';
    _highestRoute = 0;
    _furthestLocationReached = 0;
    _playerDex = List.empty(growable: true);
    _playerPc = List.empty(growable: true);
    _playerTeam = List.empty(growable: true);

    notifyListeners();
    _store.savePlayerData(_farthestRegion, _highestRoute,
        _furthestLocationReached, _playerDex, _playerPc, _playerTeam);
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

  void setPlayerPc(String playerPc) {
    _playerPc.add(playerPc);
    notifyListeners();
    _store.savePlayerPc(_playerPc);
  }

  void setPlayerTeam(String playerTeam) {
    _playerTeam.add(playerTeam);
    notifyListeners();
    _store.savePlayerTeam(_playerTeam);
  }
}
