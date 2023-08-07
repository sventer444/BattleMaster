import 'package:battle_master/components/opponent.dart';
import 'package:battle_master/components/team.dart';
import 'package:battle_master/controllers/player.dart';
import 'package:flutter/foundation.dart';
import 'package:get/get.dart';
import 'package:go_router/go_router.dart';
import '../constants/animation_type.dart';
import '../constants/mon.dart';
import 'package:flutter/material.dart';

import '../controllers/game.dart';
import '../states/player_progress.dart';
import 'responsive_window.dart';
import '../constants/game_functions.dart';

class MapRoute extends StatefulWidget {
  const MapRoute(
      {super.key, required this.routeEncounters, required this.routeName});

  final List<(int, Pokemon)> routeEncounters;

  final String routeName;

  @override
  State<MapRoute> createState() => _MapRouteState();
}

class _MapRouteState extends State<MapRoute> {
  _MapRouteState();

  var opponentWidget;
  var playerTeamWidget = PlayerTeam();
  @override
  Widget build(BuildContext context) {
    final PlayerController playerController = Get.find();
    final GameController gameController = Get.find();
    gameController.setTeamWidget(PlayerTeam());
    List<Pokemon> encounterTable = setEncounterTable(widget.routeEncounters);

    return Scaffold(
      body: ResponsiveWindow(
        rectangularMenuArea: Text(widget.routeName),
        squarishMainArea: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(16),
              child: Center(
                  child: opponentWidget ??
                      const SizedBox(
                        height: 10,
                      )),
            ),
            Expanded(child: playerTeamWidget),
            TextButton(
              onPressed: () => {
                // if (activeRound)
                //attackRound(currentOpponent, playerProgress, context)
                setState(() => opponentWidget = Opponent(
                      animationType: AnimationType.wildEncounter,
                      currentOpponent: setEncounterOpponent(encounterTable),
                    ))
              },
              child: const Text('Attack'),
            )
          ],
        ),
      ),
    );
  }

  // @override
  // void dispose() {
  //   //_attackTimer.cancel();
  //   // _encounterTimer.cancel();
  //   // currentOpponent = setEncounterOpponent(encounterTable);
  //   // opponentWidget = Opponent(
  //   //     currentOpponent: currentOpponent,
  //   //     encounter: AnimationType.none,
  //   //     onClick: () => {});
  //   super.dispose();
  // }

  // @override
  // void initState() {
  //   // encounterTable = setEncounterTable(widget.routeEncounters);
  //   // setEncounterTimer();
  //   super.initState();
  // }

  // void setEncounterTimer() {
  //   int randomEncounterInterval = Random().nextInt(3) + 3;
  //   _encounterTimer = Timer(Duration(seconds: randomEncounterInterval), () {
  //     currentOpponent = setEncounterOpponent(encounterTable);
  //     activeRound = true;
  //     setState(() {
  //       opponentWidget = Opponent(
  //           currentOpponent: currentOpponent,
  //           encounter: AnimationType.wildEncounter,
  //           onClick: () => {});
  //     });
  //   });
  // }

  void attackRound(Pokemon currentOpponent, PlayerController playerProgress,
      BuildContext context) {
    // TODO: Implement exp gain and level scaling

    // TODO: Implement catching

    var playerTeam = playerProgress.playerTeam.value;
    List<Pokemon> attackOrder =
        determineAttackOrder(currentOpponent, playerTeam);
    for (var mon in attackOrder) {
      if (kDebugMode) {
        print('${mon.name}, ${mon.currentHp}, SPD: ${mon.speed}');
      }
      // Ensure run is still valid
      if (playerProgress.runInProgress.value) {
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
        } // if the current mon is the opponent
        else {
          if (mon.currentHp != 0) {
            applyDamage(currentOpponent, mon);
            if (currentOpponent.currentHp == 0) {
              setState(() {
                opponentWidget = Opponent(
                  currentOpponent: currentOpponent,
                  animationType: AnimationType.none,
                );
              });
              //setEncounterTimer();
              activeRound = false;
            } else {
              setState(() {
                opponentWidget = Opponent(
                  currentOpponent: currentOpponent,
                  animationType: AnimationType.takeDamage,
                );
              });
            }
          } // if player mon is alive
          else {
            // TODO: Handle player mon K.O.

            //playerProgress.endPlayerRun();
          } // else player mon has 0 hp, potentially end run
        } // else the current mon is a player mon
      } // if the run is alive
      else {
        if (kDebugMode) {
          print('You lost...');
        }

        GoRouter.of(context).go('/map');
      } // run is ended go back to map
    }
  }
}
