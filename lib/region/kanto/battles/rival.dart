import 'package:battle_master/components/team.dart';
import 'package:battle_master/constants/animation_type.dart';
import 'package:battle_master/constants/mon.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../../components/responsive_window.dart';
import '../../../../constants/game_functions.dart';
import '../../../../states/player_progress.dart';

class RivalBattle extends StatefulWidget {
  const RivalBattle({super.key, required this.rivalTeam});

  final List<Pokemon> rivalTeam;

  @override
  State<RivalBattle> createState() => _RivalBattleState();
}

//TODO: Implement battling logic (probably in game_functions)
class _RivalBattleState extends State<RivalBattle> {
  _RivalBattleState();

  final String _name = 'Nick';

  late Pokemon currentOpponent;

  @override
  void dispose() {
    //_attackTimer.cancel();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final playerProgress = context.watch<PlayerProgress>();

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
              child: PlayerTeam(
                  playerTeam: playerProgress.playerTeam,
                  animation: AnimationType.none),
            ),
            TextButton(onPressed: () => {}, child: const Text('Attack'))
          ],
        ),
      ),
    );
  }

  // ···
}
