import 'package:battle_master/components/team.dart';
import 'package:battle_master/constants/animation_type.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../states/player_progress.dart';
import '../constants/mon.dart';
import 'responsive_window.dart';

class PlayerPc extends StatelessWidget {
  const PlayerPc({super.key});

  @override
  Widget build(BuildContext context) {
    final playerProgress = context.watch<PlayerProgress>();

    List<Pokemon> playerPc = playerProgress.playerPc;

    return Scaffold(
      body: ResponsiveScreen(
        rectangularMenuArea:
            const Text('This is where the pokemon you have caught are stored'),
        squarishMainArea: Column(
          children: [
            const Padding(
              padding: EdgeInsets.all(25),
              child: Center(
                child: Text('Player Pc'),
              ),
            ),
            Expanded(
              child: Center(
                  child: Column(
                children: [
                  const Text('Current Team'),
                  PlayerTeam(
                      playerTeam: playerProgress.playerTeam,
                      animation: AnimationType.none),
                  const SizedBox(
                    height: 100.0,
                  ),
                  const Text('Storage'),
                  Row(
                    children: [
                      for (var pcIndex = 0;
                          pcIndex < playerPc.length;
                          pcIndex++)
                        Text('${playerPc[pcIndex]}')
                    ],
                  ),
                ],
              )),
            ),
          ],
        ),
      ),
    );
  }
}
