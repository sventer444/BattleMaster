import 'dart:async';

import 'package:battle_master/constants/mon.dart';
import 'package:flutter/material.dart';
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

  //late Timer _attackTimer;

  @override
  void dispose() {
    //_attackTimer.cancel();
    super.dispose();
  }

  @override
  void initState() {
    setEncounterTable(routeEncounters);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final playerProgress = context.watch<PlayerProgress>();

    if (!activeRound) {
      //_attackTimer = startAttackTimer(playerProgress, context);
    }
    return Scaffold(
      body: ResponsiveScreen(
        rectangularMenuArea: Text(_name),
        squarishMainArea: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(16),
              child: Center(child: opponentWidget),
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
            TextButton(
                onPressed: () => {
                      print('hit button press?'),
                      currentOpponent = setOpponent(encounterTable),
                      setState(() => opponentWidget = DelayedAppear(
                            key: ValueKey(currentOpponent.id),
                            ms: ScreenDelays.first,
                            child: Padding(
                              padding: const EdgeInsets.all(16),
                              child: Center(
                                child: Column(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      // Text('Test State Update')
                                      Text(currentOpponent.name),
                                      Text(
                                          '${currentOpponent.currentHp} / ${currentOpponent.hp}')
                                    ]),
                              ),
                            ),
                          ))
                    },
                child: const Text('Test Update Opponent'))
          ],
        ),
      ),
    );
  }

  // ···
}
