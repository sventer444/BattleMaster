import 'package:battle_master/components/opponent.dart';
import 'package:battle_master/components/responsive_window.dart';
import 'package:battle_master/components/team.dart';
import 'package:battle_master/controllers/player.dart';
import 'package:battle_master/states/player_progress.dart';
import 'package:get/get.dart';
import 'package:provider/provider.dart';
import '../constants/animation_type.dart';
import '../constants/mon.dart';
import 'package:flutter/material.dart';

import '../region/kanto/dex.dart';
import '../constants/game_functions.dart';

class BattleWidget extends StatefulWidget {
  const BattleWidget(
      {super.key, required this.opponentName, required this.opponentTeam});

  final String opponentName;

  final List<Pokemon> opponentTeam;

  @override
  State<BattleWidget> createState() => _BattleWidgetState();
}

class _BattleWidgetState extends State<BattleWidget> {
  _BattleWidgetState();

  Opponent? opponentWidget;
  PlayerTeam playerTeamWidget = const PlayerTeam();
  @override
  void initState() {
    if (widget.opponentTeam.isEmpty) {
      //TODO: Implement opponent chooses super effective mon logic
      widget.opponentTeam.add(dex[0]);
    }
    opponentWidget = Opponent(
      animationType: AnimationType.battle,
      currentOpponent: widget.opponentTeam.first,
    );
    super.initState();
  }

  //TODO: Implement battle logic
  @override
  Widget build(BuildContext context) {
    final PlayerController playerController = Get.find();
    var playerTeam = playerController.playerTeam;

    return Scaffold(
      body: ResponsiveWindow(
        rectangularMenuArea: Text(widget.opponentName),
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
