import 'package:get/get.dart';

import '../constants/dex_status.dart';
import '../constants/mon.dart';
import '../states/persistence/player/player_persistence.dart';

class PlayerController extends GetxController {
  final PlayerProgressPersistence _store;

  var farthestRegion = 'Kanto'.obs;

  var runInProgress = false.obs;

  var highestRoute = 0.obs;

  var furthestLocationReached = 0.obs;

  RxList<(Pokemon, DexStatus)> playerDex =
      List<(Pokemon, DexStatus)>.empty(growable: true).obs;

  RxList<Pokemon> playerPc = List<Pokemon>.empty(growable: true).obs;

  RxList<Pokemon> playerTeam = List<Pokemon>.empty(growable: true).obs;

  PlayerController(this._store);

  void getLatestFromStore() async {
    farthestRegion.value = await _store.getFarthestRegion();
    highestRoute.value = await _store.getHighestRoute();
    furthestLocationReached.value = await _store.getFurthestLocationReached();
    playerDex.value = await _store.getPlayerDex();
    playerPc.value = await _store.getPlayerPc();
    playerTeam.value = await _store.getPlayerTeam();
    runInProgress.value = await _store.getRunInProgress();
  }

  void endPlayerRun() {
    runInProgress.value = false;
    highestRoute.value = 0;
    furthestLocationReached.value = 0;
    playerPc.clear();
    playerTeam.clear();

    _store.savePlayerData(
        farthestRegion.value,
        highestRoute.value,
        furthestLocationReached.value,
        playerDex,
        playerPc,
        playerTeam,
        runInProgress.value);
  }

  /// Resets the player's progress
  void reset() {
    farthestRegion.value = 'Kanto';
    playerDex.clear();
    endPlayerRun();
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
    farthestRegion.value = region;
    _store.saveFarthestRegion(region);
  }

  void setHighestRoute(int route) {
    highestRoute.value = route;
    _store.saveHighestRoute(route);
  }

  void setFurthestLocationReached(int location) {
    furthestLocationReached.value = location;
    _store.saveFurthestLocationReached(location);
  }

  void setPlayerDex((Pokemon, DexStatus) dex) {
    playerDex.add(dex);
    _store.savePlayerDex(playerDex);
  }

  void setRunInProgress(bool progress) {
    runInProgress.value = progress;
    _store.saveRunInProgress(runInProgress.value);
  }

  void setPlayerPc(Pokemon pc) {
    playerPc.add(pc);
    _store.savePlayerPc(playerPc);
  }

  void setPlayerTeam(Pokemon team) {
    playerTeam.add(team);
    _store.savePlayerTeam(playerTeam);
  }

  // var page = 0.obs;
  // var controller = PageController().obs;
  // var fromController = ScrollController(initialScrollOffset: 0.0).obs;

  // onPageChanged(input) {
  //   page.value = input;
  // }

  // animateTo(int page) {
  //   if (controller.value.hasClients)
  //     controller.value.animateToPage(page,
  //         duration: Duration(milliseconds: 300), curve: Curves.easeIn);
  // }

  // resetController(int page) {
  //   controller.value = PageController(initialPage: page);
  // }
}
