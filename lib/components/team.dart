import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../constants/animation_type.dart';
import '../constants/game_functions.dart';
import '../constants/mon.dart';
import '../states/player_progress.dart';

class PlayerTeam extends StatefulWidget {
  const PlayerTeam({super.key, required this.animation});

  final AnimationType animation;

  @override
  State<PlayerTeam> createState() => _PlayerTeamState();
}

class _PlayerTeamState extends State<PlayerTeam> {
  _PlayerTeamState();

  Widget? teamWidget;

  @override
  Widget build(BuildContext context) {
    final playerProgress = context.watch<PlayerProgress>();
    List<Pokemon> playerTeam = playerProgress.playerTeam;
    Widget teamBaseWidget = Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            for (var i = 0; i < playerTeam.length; i++)
              TextButton(
                  child: Text(playerTeam[i].name),
                  onPressed: () => {switchTeamMembers(playerTeam, i)}),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            for (var i = 0; i < playerTeam.length; i++)
              Text('${playerTeam[i].currentHp}')
          ],
        ),
      ],
    );

    switch (widget.animation) {
      case AnimationType.wildEncounter:
        break;
      case AnimationType.starter:
        break;
      case AnimationType.battle:
        teamWidget = teamBaseWidget;
        break;
      case AnimationType.takeDamage:
        teamWidget = teamBaseWidget;
        break;
      case AnimationType.none:
        teamWidget = teamBaseWidget;
        break;
    }
    return teamWidget!;
  } // build
}
