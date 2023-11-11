import 'package:flutter/foundation.dart';
import 'package:get/get.dart';

import '../components/opponent.dart';
import '../components/team.dart';
import '../constants/game_functions.dart';
import '../constants/mon.dart';

class GameController extends GetxController {
  //TODO: Implement opponent widget
  Rx<PlayerTeam> teamWidget = const PlayerTeam().obs;
  Rx<Opponent> opponentWidget = const Opponent(
    currentOpponent: null,
  ).obs;
  int highestRouteThisRun = 0;
  int furthestLocationThisRun = 1;
  String currentRegion = 'Kanto';
  Pokemon? currentOpponent;
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

  setOpponentWidget(Opponent widget) {
    currentOpponent = widget.currentOpponent;
    opponentWidget.value = widget;
  }

  resetGameController() {
    currentOpponent = null;
    opponentWidget.value = Opponent(
      currentOpponent: currentOpponent,
    );
    highestRouteThisRun = 0;
    furthestLocationThisRun = 1;
    currentRegion = 'Kanto';
  }

  void attackRound(List<Pokemon> playerTeam) {
    // TODO: Implement exp gain and level scaling

    // TODO: Implement catching

    List<Pokemon> attackOrder =
        determineAttackOrder(currentOpponent!, playerTeam);
    for (var mon in attackOrder) {
      if (kDebugMode) {
        print('${mon.name}, ${mon.currentHp}, SPD: ${mon.speed}');
      }
      if (mon == currentOpponent) {
        // setState(() {
        if (mon.currentHp != 0) {
          //playerTeam[0] = applyDamage(playerTeam.first, mon);
        } else {
          // _currentOpponent = setOpponent(encounterTable);
          // _opponentWidget = AnimatedOpacity(
          //     opacity: 1.0,
          //     duration: const Duration(milliseconds: 700),
          //     // The green box must be a child of the AnimatedOpacity widget.
          //     child: Column(
          //         mainAxisAlignment: MainAxisAlignment.center,
          //         children: [
          //           Text(_currentOpponent.name),
          //           Text('${_currentOpponent.currentHp}')
          //         ]));
        } // else opponent is dead so set a new one
        // });
      } // if the attacking mon is the opponent
      else {
        if (mon.currentHp != 0) {
          applyDamage(currentOpponent!, mon);
          //TODO: Fix opponent widget health update
          if (currentOpponent!.currentHp == 0) {
            setOpponentWidget(Opponent(
              currentOpponent: currentOpponent,
            ));
            //setEncounterTimer();
            activeRound = false;
          } else {
            setOpponentWidget(Opponent(
              currentOpponent: currentOpponent,
            ));
          }
        } // if player mon is alive
        else {
          // TODO: Handle player mon K.O.

          //playerProgress.endPlayerRun();
        } // else player mon has 0 hp, potentially end run if team is dead
      } // else the current mon is a player mon
    }
  }

  //TODO: Handle any dead mon
}
