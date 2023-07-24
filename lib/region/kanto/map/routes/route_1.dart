import 'dart:async';
import 'dart:math';

import 'package:battle_master/constants/mon.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../../../components/responsive_window.dart';
import '../../../../constants/game_functions.dart';
import '../../../../states/player_progress.dart';
import '../../../../styles/delayed_appear.dart';

class Route1 extends StatefulWidget {
  const Route1({super.key, required this.routeEncounters});

  final List<(double, Pokemon)> routeEncounters;

  @override
  State<Route1> createState() => _Route1State(routeEncounters: routeEncounters);
}

class _Route1State extends State<Route1> {
  _Route1State({required this.routeEncounters});

  final String _name = 'Route 1';

  List<(double, Pokemon)> routeEncounters;

  late Pokemon _currentOpponent;

  late Timer _timer;

  late Widget _opponentWidget;

  @override
  void dispose() {
    _timer.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final playerProgress = context.watch<PlayerProgress>();
    List<Pokemon> encounterTable = setEncounterTable(routeEncounters);
    _currentOpponent = setOpponent(encounterTable);

    _opponentWidget = AnimatedOpacity(
        opacity: 1.0,
        duration: const Duration(milliseconds: 1000),
        // The green box must be a child of the AnimatedOpacity widget.
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Text(_currentOpponent.name),
          Text('${_currentOpponent.currentHp}')
        ]));

    _timer = Timer.periodic(
        attackTime,
        (Timer t) => {
              if (!mounted)
                {t.cancel()}
              else
                {attackRound(playerProgress, encounterTable, context)}
            });

    return Scaffold(
      body: ResponsiveScreen(
        rectangularMenuArea: Text(_name),
        squarishMainArea: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(16),
              child: Center(
                child: _opponentWidget,
              ),
            ),
            Expanded(
                child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    for (var i = 0; i < playerProgress.playerTeam.length; i++)
                      Text(playerProgress.playerTeam[i].name)
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    for (var i = 0; i < playerProgress.playerTeam.length; i++)
                      Text('${playerProgress.playerTeam[i].currentHp}')
                  ],
                ),
              ],
            )),
          ],
        ),
      ),
    );
  }

  void attackRound(PlayerProgress playerProgress, List<Pokemon> encounterTable,
      BuildContext context) {
    List<Pokemon> playerTeam = playerProgress.playerTeam;
    List<Pokemon> attackOrder =
        determineAttackOrder(_currentOpponent, playerTeam);
    attackOrder.forEach((mon) {
      print('${mon.name}, ${mon.currentHp}, SPD: ${mon.speed}');
      // Ensure run is still valid
      if (playerProgress.runInProgresss) {
        if (mon == _currentOpponent) {
          // setState(() {
          //   if (mon.currentHp != 0) {
          //     playerTeam[0] = applyDamage(playerTeam.first, mon);
          //   } else {
          //     _currentOpponent = setOpponent(encounterTable);
          //     _opponentWidget = AnimatedOpacity(
          //         opacity: 1.0,
          //         duration: const Duration(milliseconds: 700),
          //         // The green box must be a child of the AnimatedOpacity widget.
          //         child: Column(
          //             mainAxisAlignment: MainAxisAlignment.center,
          //             children: [
          //               Text(_currentOpponent.name),
          //               Text('${_currentOpponent.currentHp}')
          //             ]));
          //   } // else opponent is dead so set a new one
          // });
        } // if the current mon is the opponent
        else {
          // setState(() {
          //   if (mon.currentHp != 0) {
          //     _currentOpponent = applyDamage(_currentOpponent, mon);
          //     // _opponentWidget = DelayedAppear(
          //     //     child: Center(
          //     //         child: Column(
          //     //             mainAxisAlignment: MainAxisAlignment.center,
          //     //             children: [
          //     //           Text(_currentOpponent.name),
          //     //           Text('${_currentOpponent.currentHp}')
          //     //         ])),
          //     //     ms: ScreenDelays.second + (3 - 1) * 70);
          //   } // if player mon is alive
          //   else {
          //     playerProgress.endPlayerRun();
          //   } // player mon is dead so end run
          // });
        } // else the current mon is a player mon
      } // if the run is alive
      else {
        // TODO:
        // implement exp gain and level scaling
        print('You lost...');

        GoRouter.of(context).go('/map');
      } // run is ended go back to map
    });
  }
  // ···
}
