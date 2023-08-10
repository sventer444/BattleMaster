import 'package:get/get.dart';

import '../components/team.dart';
import '../constants/mon.dart';

class GameController extends GetxController {
  //TODO: Implement opponent widget
  Rx<PlayerTeam> teamWidget = const PlayerTeam().obs;
  int highestRouteThisRun = 0;
  int furthestLocationThisRun = 1;
  String currentRegion = 'Kanto';
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
  setTeamWidget(PlayerTeam widget) {
    teamWidget.value = widget;
  }
}
