import 'package:battle_master/components/mon.dart';
import 'package:battle_master/components/opponent.dart';
import 'package:battle_master/constants/dex_status.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../../../components/responsive_window.dart';
import '../../../../states/player_progress.dart';

class Route1 extends StatelessWidget {
  const Route1({super.key, required this.routeEncounters});

  final String name = 'Route 1';

  final List<(double, Pokemon)> routeEncounters;

  @override
  Widget build(BuildContext context) {
    final playerProgress = context.watch<PlayerProgress>();
    Pokemon currentOpponent = setOpponent();

    return Scaffold(
      body: ResponsiveScreen(
        rectangularMenuArea: Text(name),
        squarishMainArea: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(16),
              child: Center(
                  child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(currentOpponent.name),
                  Text('${currentOpponent.hp}'),
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
                      Text('${playerProgress.playerTeam[i].hp}')
                  ],
                ),
              ],
            )),
          ],
        ),
      ),
    );
  }

  Pokemon setOpponent() {
    return routeEncounters.first.$2;
  }
}
