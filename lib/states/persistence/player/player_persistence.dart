import 'package:battle_master/constants/mon.dart';
import 'package:battle_master/constants/dex_status.dart';

/// An interface of persistence stores for the player's progress.
///
/// Implementations can range from simple in-memory storage through
/// local preferences to cloud saves.
abstract class PlayerProgressPersistence {
  Future<String> getFarthestRegion();

  Future<int> getHighestRoute();

  Future<bool> getRunInProgress();

  Future<int> getFurthestLocationReached();

  Future<List<(String, DexStatus)>> getPlayerDex();

  Future<List<Pokemon>> getPlayerPc();

  Future<List<Pokemon>> getPlayerTeam();

  Future<void> saveFarthestRegion(String region);

  Future<void> saveHighestRoute(int route);

  Future<void> saveRunInProgress(bool progress);

  Future<void> saveFurthestLocationReached(int location);

  Future<void> savePlayerDex(List<(String, DexStatus)> playerDex);

  Future<void> savePlayerPc(List<Pokemon> playerPc);

  Future<void> savePlayerTeam(List<Pokemon> playerTeam);

  Future<void> savePlayerData(
      String farthestRegion,
      int highestRoute,
      int furthestLocationReached,
      List<(String, DexStatus)> playerDex,
      List<Pokemon> playerPc,
      List<Pokemon> playerTeam,
      bool runInProgress);
}
