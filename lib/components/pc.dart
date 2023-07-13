import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';

import '../states/player_progress.dart';
import 'responsive_window.dart';

class PlayerPc extends StatelessWidget {
  const PlayerPc({super.key});

  @override
  Widget build(BuildContext context) {
    final playerProgress = context.watch<PlayerProgress>();

    List<String> _playerPc = playerProgress.playerPc;

    return Scaffold(
      body: ResponsiveScreen(
        rectangularMenuArea:
            const Text('This is where the pokemon you have caught are stored'),
        squarishMainArea: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(25),
              child: Center(
                child: Text('Player Pc'),
              ),
            ),
            Expanded(
              child: Center(
                  child: Column(
                children: [
                  Text('Current Team'),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      for (var teamIndex = 0;
                          teamIndex < playerProgress.playerTeam.length;
                          teamIndex++)
                        Text('${playerProgress.playerTeam[teamIndex]}')
                    ],
                  ),
                  SizedBox(
                    height: 100.0,
                  ),
                  Text('Storage'),
                  Row(
                    children: [
                      for (var pcIndex = 0;
                          pcIndex < playerProgress.playerPc.length;
                          pcIndex++)
                        Text('${playerProgress.playerPc[pcIndex]}')
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
