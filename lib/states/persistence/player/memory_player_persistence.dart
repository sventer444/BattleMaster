import 'package:battle_master/constants/dex_status.dart';

import 'player_persistence.dart';

/// An in-memory implementation of [PlayerProgressPersistence].
/// Useful for testing.
class MemoryOnlyPlayerProgressPersistence implements PlayerProgressPersistence {
  String farthestRegion = '';
  int highestRoute = 0;
  int furthestLocationReached = 0;
  List<(int, DexStatus)> playerDex = List.empty(growable: true);
  List<int> playerPc = List.empty(growable: true);

  // @override
  // Future<int> getHighestLevelReached() async {
  //   await Future<void>.delayed(const Duration(milliseconds: 500));
  //   return level;
  // }

  // @override
  // Future<void> saveHighestLevelReached(int level) async {
  //   await Future<void>.delayed(const Duration(milliseconds: 500));
  //   this.level = level;
  // }

  @override
  Future<String> getFarthestRegion() async {
    return farthestRegion;
  }

  @override
  Future<int> getHighestRoute() async {
    return highestRoute;
  }

  @override
  Future<int> getFurthestLocationReached() async {
    return furthestLocationReached;
  }

  @override
  Future<List<(int, DexStatus)>> getPlayerDex() async {
    return playerDex;
  }

  @override
  Future<List<int>> getPlayerPc() async {
    return playerPc;
  }

  @override
  Future<void> saveFarthestRegion(String value) async => farthestRegion = value;

  @override
  Future<void> saveHighestRoute(int value) async => highestRoute = value;

  @override
  Future<void> saveFurthestLocationReached(int value) async =>
      furthestLocationReached = value;

  @override
  Future<void> savePlayerDex(List<(int, DexStatus)> value) async =>
      playerDex = value;

  @override
  Future<void> savePlayerPc(List<int> value) async => playerPc = value;

  @override
  Future<void> savePlayerData(
      String farthestRegion,
      int highestRoute,
      int furthestLocationReached,
      List<(int, DexStatus)> playerDex,
      List<int> playerPc) async {
    this.farthestRegion = farthestRegion;
    this.highestRoute = highestRoute;
    this.furthestLocationReached = furthestLocationReached;
    this.playerDex = playerDex;
    this.playerPc = playerPc;
  }
}
