import 'package:battle_master/controllers/player.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:provider/provider.dart';

import '../constants/animation_type.dart';
import '../constants/game_functions.dart';
import '../constants/mon.dart';
import '../states/player_progress.dart';

class PlayerTeam extends StatelessWidget {
  const PlayerTeam({super.key});

  @override
  Widget build(BuildContext context) {
    final PlayerController playerController = Get.find();

    List<Pokemon> playerTeam = playerController.playerTeam;
    if (playerTeam.length == 0) {
      return SizedBox(
        height: 10,
      );
    } else {
      return Column(
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
    }
  } // build
}
