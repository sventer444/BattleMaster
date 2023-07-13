import 'package:battle_master/constants/dex_status.dart';

/// An interface of persistence stores for the player's progress.
///
/// Implementations can range from simple in-memory storage through
/// local preferences to cloud saves.
abstract class PlayerProgressPersistence {
  Future<String> getFarthestRegion();

  Future<int> getHighestRoute();

  Future<int> getFurthestLocationReached();

  Future<List<(String, DexStatus)>> getPlayerDex();

  Future<List<String>> getPlayerPc();

  Future<List<String>> getPlayerTeam();

  Future<void> saveFarthestRegion(String region);

  Future<void> saveHighestRoute(int route);

  Future<void> saveFurthestLocationReached(int location);

  Future<void> savePlayerDex(List<(String, DexStatus)> playerDex);

  Future<void> savePlayerPc(List<String> playerPc);

  Future<void> savePlayerTeam(List<String> playerTeam);

  Future<void> savePlayerData(
      String farthestRegion,
      int highestRoute,
      int furthestLocationReached,
      List<(String, DexStatus)> playerDex,
      List<String> playerPc,
      List<String> playerTeam);
}
