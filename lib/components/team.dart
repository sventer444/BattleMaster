import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import '../constants/animation_type.dart';
import '../constants/mon.dart';

//TODO: Convert to stateful and setState when mon selected
class PlayerTeam extends StatelessWidget {
  PlayerTeam({super.key, required this.playerTeam, required this.animation});

  final List<Pokemon> playerTeam;

  final AnimationType animation;

  //TODO: Move team selection to game_functions
  int selectedTeamIndex = -1;

  Widget? teamWidget;

  @override
  Widget build(BuildContext context) {
    switch (animation) {
      case AnimationType.wildEncounter:
        break;
      case AnimationType.starter:
        break;
      case AnimationType.battle:
        teamWidget = Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                for (var i = 0; i < playerTeam.length; i++)
                  TextButton(
                      child: Text(playerTeam[i].name),
                      onPressed: () => {switchTeamMembers(i)}),
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
        break;
      case AnimationType.takeDamage:
        teamWidget = Expanded(
            child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                for (var i = 0; i < playerTeam.length; i++)
                  TextButton(
                      child: Text(playerTeam[i].name),
                      onPressed: () => {switchTeamMembers(i)}),
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
        ));
        break;
      case AnimationType.none:
        teamWidget = Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                for (var i = 0; i < playerTeam.length; i++)
                  TextButton(
                      child: Text(playerTeam[i].name),
                      onPressed: () => {switchTeamMembers(i)}),
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
        break;
    }
    return teamWidget!;
  } // build

  void switchTeamMembers(int index) {
    if (selectedTeamIndex == index) {
      selectedTeamIndex = -1;
      if (kDebugMode) {
        print('unselected teammember');
      }
    } else if (selectedTeamIndex == -1) {
      if (kDebugMode) {
        print('setting selected to $index');
      }
      selectedTeamIndex = index;
    } else {
      if (kDebugMode) {
        print('swapping $selectedTeamIndex with $index');
      }
      Pokemon temp = playerTeam[selectedTeamIndex];
      playerTeam[selectedTeamIndex] = playerTeam[index];
      playerTeam[index] = temp;
      selectedTeamIndex = -1;
    }

    // teamWidget = Column(
    //   mainAxisAlignment: MainAxisAlignment.center,
    //   children: [
    //     Row(mainAxisAlignment: MainAxisAlignment.spaceEvenly, children: [
    //       for (var i = 0; i < playerTeam.length; i++)
    //         // (i == selectedTeamIndex)
    //         //     ? OutlinedButton(
    //         //         onPressed: () => {switchTeamMembers(i)},
    //         //         child: Text(playerTeam[i].name))
    //         TextButton(
    //             child: Text(playerTeam[i].name),
    //             onPressed: () => {switchTeamMembers(i)}),
    //     ]),
    //     Row(
    //       mainAxisAlignment: MainAxisAlignment.spaceEvenly,
    //       children: [
    //         for (var i = 0; i < playerTeam.length; i++)
    //           Text('${playerTeam[i].currentHp}')
    //       ],
    //     ),
    //   ],
    // );
  }
}
