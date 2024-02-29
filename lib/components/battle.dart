import 'package:battle_master/components/opponent.dart';
import 'package:battle_master/components/responsive_window.dart';
import 'package:battle_master/components/team.dart';
import 'package:battle_master/controllers/player.dart';
import 'package:flutter/foundation.dart';
import 'package:get/get.dart';
import '../constants/animation_type.dart';
import '../constants/mon.dart';
import 'package:flutter/material.dart';

import '../controllers/game.dart';
import '../region/kanto/dex.dart';

//TODO: Make stateless widget
class BattleWidget extends StatelessWidget {
  BattleWidget(
      {super.key, required this.opponentName, required this.opponentTeam});

  final String opponentName;

  List<Pokemon> opponentTeam;

  PlayerTeam playerTeamWidget = const PlayerTeam();

  //TODO: Implement battle logic
  @override
  Widget build(BuildContext context) {
    //TODO: implement battle logic to sort team by most effective pokemon

    final PlayerController playerController = Get.find();
    final GameController gameController = Get.find();
    var playerTeam = playerController.playerTeam;
    var currentOpponent =
        opponentTeam.firstWhere((element) => element.currentHp > 0);
    gameController
        .setOpponentWidget(Opponent(currentOpponent: currentOpponent));

    return Scaffold(
      body: ResponsiveWindow(
        rectangularMenuArea: Text(opponentName),
        squarishMainArea: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(16),
              child: Center(child: gameController.opponentWidget.value),
            ),
            Expanded(child: playerTeamWidget),
            TextButton(
              onPressed: () => {
                // if (activeRound)
                //attackRound(currentOpponent, playerProgress, context)
                gameController.attackRound(playerTeam),
                print('${gameController.currentOpponent!.currentHp}'),
              },
              child: const Text('Attack'),
            )
          ],
        ),
      ),
    );
  }
}
