import 'package:battle_master/components/opponent.dart';
import 'package:battle_master/components/responsive_window.dart';
import 'package:battle_master/components/team.dart';
import 'package:battle_master/controllers/player.dart';
import 'package:get/get.dart';
import '../constants/animation_type.dart';
import '../constants/mon.dart';
import 'package:flutter/material.dart';

import '../region/kanto/dex.dart';

//TODO: Make stateless widget
class BattleWidget extends StatelessWidget {
  BattleWidget(
      {super.key, required this.opponentName, required this.opponentTeam});

  final String opponentName;

  List<Pokemon> opponentTeam;

  Opponent? opponentWidget;
  PlayerTeam playerTeamWidget = const PlayerTeam();

  //TODO: Implement battle logic
  @override
  Widget build(BuildContext context) {
    final PlayerController playerController = Get.find();
    var playerTeam = playerController.playerTeam;

    return Scaffold(
      body: ResponsiveWindow(
        rectangularMenuArea: Text(opponentName),
        squarishMainArea: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(16),
              child: Center(child: opponentWidget!),
            ),
            Expanded(child: playerTeamWidget),
            TextButton(
              onPressed: () => {
                // if (activeRound)
                //attackRound(currentOpponent, playerProgress, context)
                attackRound(
                    playerTeam, opponentWidget!.currentOpponent, context)
              },
              child: const Text('Attack'),
            )
          ],
        ),
      ),
    );
  }

  void attackRound(List<dynamic> playerTeam, Pokemon currentOpponent,
      BuildContext context) {}
}
