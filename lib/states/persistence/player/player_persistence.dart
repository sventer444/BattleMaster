import 'package:battle_master/constants/dex_status.dart';

/// An interface of persistence stores for the player's progress.
///
/// Implementations can range from simple in-memory storage through
/// local preferences to cloud saves.
abstract class PlayerProgressPersistence {
  Future<String> getFarthestRegion();

  Future<int> getHighestRoute();

  Future<int> getFurthestLocationReached();

  Future<List<(int, DexStatus)>> getPlayerDex();

  Future<List<int>> getPlayerPc();

  Future<void> saveFarthestRegion(String region);

  Future<void> saveHighestRoute(int route);

  Future<void> saveFurthestLocationReached(int location);

  Future<void> savePlayerDex(List<(int, DexStatus)> playerDex);

  Future<void> savePlayerPc(List<int> playerPc);

  Future<void> savePlayerData(
      String farthestRegion,
      int highestRoute,
      int furthestLocationReached,
      List<(int, DexStatus)> playerDex,
      List<int> playerPc);
}
