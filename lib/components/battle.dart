import 'package:battle_master/components/opponent.dart';
import 'package:battle_master/components/team.dart';
import '../constants/animation_type.dart';
import '../constants/mon.dart';
import 'package:flutter/material.dart';

import '../region/kanto/dex.dart';
import 'responsive_window.dart';
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

  StatefulWidget? opponentWidget;
  StatefulWidget playerTeamWidget =
      const PlayerTeam(animation: AnimationType.none);
  @override
  void initState() {
    if (widget.opponentTeam.isEmpty) {
      //TODO: Figure out opponent takes super effective mon logic
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
    return Scaffold(
      body: ResponsiveScreen(
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
              },
              child: const Text('Attack'),
            )
          ],
        ),
      ),
    );
  }
}
