import 'package:get/get.dart';
import 'package:flutter/material.dart';

import '../components/team.dart';
import '../constants/animation_type.dart';

class GameController extends GetxController {
  Rx<PlayerTeam> teamWidget = PlayerTeam().obs;
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
