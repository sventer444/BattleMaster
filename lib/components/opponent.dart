import 'package:flutter/material.dart';

import '../constants/animation_type.dart';
import '../constants/mon.dart';
import '../styles/delayed_appear.dart';

class Opponent extends StatefulWidget {
  const Opponent(
      {super.key, required this.animationType, required this.currentOpponent});

  final AnimationType animationType;
  final Pokemon currentOpponent;

  @override
  State<Opponent> createState() => _Opponent();
}

class _Opponent extends State<Opponent> {
  _Opponent();
  Widget? opponentWidget;
  @override
  Widget build(BuildContext context) {
    Pokemon currentOpponent = widget.currentOpponent;
    switch (widget.animationType) {
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
                  ]),
            ),
          ),
        );
        break;
      case AnimationType.starter:
        break;
      case AnimationType.battle:
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
                  ]),
            ),
          ),
        );
        break;

      case AnimationType.takeDamage:
        opponentWidget = Center(
          child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
            Text(currentOpponent.name),
            Text('${currentOpponent.currentHp} / ${currentOpponent.hp}')
          ]),
        );
        break;
      case AnimationType.none:
        const SizedBox(
          height: 10,
        );
        break;
    }
    return opponentWidget!;
  }
}
