import 'package:battle_master/components/team.dart';
import 'package:battle_master/controllers/game.dart';
import 'package:battle_master/controllers/player.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../constants/mon.dart';
import 'responsive_window.dart';

class PlayerPc extends StatelessWidget {
  const PlayerPc({super.key});

  @override
  Widget build(BuildContext context) {
    final PlayerController playerController = Get.find();
    final GameController gameController = Get.find();
    List<Pokemon> playerPc = playerController.playerPc;
    gameController.setTeamWidget(const PlayerTeam());

    return Scaffold(
      body: ResponsiveWindow(
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
                  gameController.teamWidget.value,
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
