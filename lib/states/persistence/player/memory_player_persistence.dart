import 'package:battle_master/components/mon.dart';
import 'package:battle_master/constants/dex_status.dart';

import 'player_persistence.dart';

/// An in-memory implementation of [PlayerProgressPersistence].
/// Useful for testing.
class MemoryOnlyPlayerProgressPersistence implements PlayerProgressPersistence {
  String farthestRegion = '';
  int highestRoute = 0;
  int furthestLocationReached = 0;
  List<(String, DexStatus)> playerDex = List.empty(growable: true);
  List<Pokemon> playerPc = List.empty(growable: true);
  List<Pokemon> playerTeam = List.empty(growable: true);

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
  Future<List<(String, DexStatus)>> getPlayerDex() async {
    return playerDex;
  }

  @override
  Future<List<Pokemon>> getPlayerPc() async {
    return playerPc;
  }

  @override
  Future<List<Pokemon>> getPlayerTeam() async {
    return playerTeam;
  }

  @override
  Future<void> saveFarthestRegion(String value) async => farthestRegion = value;

  @override
  Future<void> saveHighestRoute(int value) async => highestRoute = value;

  @override
  Future<void> saveFurthestLocationReached(int value) async =>
      furthestLocationReached = value;

  @override
  Future<void> savePlayerDex(List<(String, DexStatus)> value) async =>
      playerDex = value;

  @override
  Future<void> savePlayerPc(List<Pokemon> value) async => playerPc = value;

  @override
  Future<void> savePlayerTeam(List<Pokemon> value) async => playerTeam = value;

  @override
  Future<void> savePlayerData(
      String farthestRegion,
      int highestRoute,
      int furthestLocationReached,
      List<(String, DexStatus)> playerDex,
      List<Pokemon> playerPc,
      List<Pokemon> playerTeam) async {
    this.farthestRegion = farthestRegion;
    this.highestRoute = highestRoute;
    this.furthestLocationReached = furthestLocationReached;
    this.playerDex = playerDex;
    this.playerPc = playerPc;
    this.playerTeam = playerTeam;
  }
}
