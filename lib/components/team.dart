import 'package:battle_master/controllers/player.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../constants/game_functions.dart';
import '../constants/mon.dart';

class PlayerTeam extends StatelessWidget {
  const PlayerTeam({super.key});

  @override
  Widget build(BuildContext context) {
    final PlayerController playerController = Get.find();

    List<Pokemon> playerTeam = playerController.playerTeam;
    if (playerTeam.isEmpty) {
      return const SizedBox(
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
