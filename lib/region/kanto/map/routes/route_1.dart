import 'dart:async';
import 'dart:math';

import 'package:battle_master/constants/mon.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../../../components/responsive_window.dart';
import '../../../../constants/game_functions.dart';
import '../../../../states/player_progress.dart';

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

    _timer = Timer.periodic(
        attackTime,
        (Timer t) => {
              if (!mounted)
                {t.cancel()}
              else
                {
                  setState(() {
                    attackRound(playerProgress, encounterTable, context);
                  })
                }
            });

    return Scaffold(
      body: ResponsiveScreen(
        rectangularMenuArea: Text(_name),
        squarishMainArea: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(16),
              child: Center(
                  child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(_currentOpponent.name),
                  Text('${_currentOpponent.currentHp}'),
                ],
              )),
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
          setState(() {
            if (mon.currentHp != 0) {
              playerTeam[0] = applyDamage(playerTeam.first, mon);
            } else {
              _currentOpponent = setOpponent(encounterTable);
            }
          });
        } else {
          setState(() {
            if (mon.currentHp != 0) {
              _currentOpponent = applyDamage(_currentOpponent, mon);
            } else {
              playerProgress.endPlayerRun();
            }
          });
        }
        if (mon == _currentOpponent) {
          setState(() {
            _currentOpponent = setOpponent(encounterTable);
          });
        } else {
          // TODO:
          // implement team knockout switch
        }
      } else {
        // TODO:
        // implement exp gain and level scaling
        print('You lost...');

        GoRouter.of(context).go('/map');
      }
    });

    //   if (mon == _currentOpponent) {
    //     //applyDamage(playerTeam.first, mon);
    //   } else {
    //     setState(() {
    //       applyDamage(_currentOpponent, mon);
    //     });
    //   }
    // }
    // if (_currentOpponent.hp == 0.0) {
    //   // TODO:
    //   // implement exp gain and level scaling
    //   setState(() {
    //     _currentOpponent = setOpponent(encounterTable);
    //   });
    //   // TODO:
    //   // implement team knockout / loss
  }
  // ···
}
