import 'package:battle_master/constants/game_functions.dart';
import 'package:flutter/material.dart';

import '../constants/animation_type.dart';
import '../constants/mon.dart';
import '../styles/delayed_appear.dart';

class Opponent extends StatelessWidget {
  Opponent(
      {super.key,
      required this.currentOpponent,
      required this.encounter,
      required this.onClick});

  final void Function() onClick;

  final Pokemon currentOpponent;

  final AnimationType encounter;

  @override
  Widget build(BuildContext context) {
    Widget opponentWidget = SizedBox(
      height: 10,
    );
    switch (encounter) {
      case AnimationType.wildEncounter:
        opponentWidget = DelayedAppear(
            key: ValueKey(currentOpponent.id),
            ms: ScreenDelays.first,
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Center(
                  child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                    Text(currentOpponent.name),
                    Text('${currentOpponent.currentHp} / ${currentOpponent.hp}')
                  ])),
            ));
        break;
      case AnimationType.starter:
        break;
      case AnimationType.takeDamage:
        opponentWidget = Center(
            child:
                Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Text(currentOpponent.name),
          Text('${currentOpponent.currentHp} / ${currentOpponent.hp}')
        ]));
        break;
      case AnimationType.none:
        SizedBox(
          height: 10,
        );
        break;
    }
    ;
    return opponentWidget;
  }
}
