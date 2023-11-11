import 'package:flutter/material.dart';

import '../constants/animation_type.dart';
import '../constants/mon.dart';
import '../styles/delayed_appear.dart';

class Opponent extends StatelessWidget {
  const Opponent({super.key, required this.currentOpponent});

  final Pokemon? currentOpponent;

  @override
  Widget build(BuildContext context) {
    if (currentOpponent == null) {
      return SizedBox(
        height: 10,
      );
    } else {
      return Center(
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Text(currentOpponent!.name),
          Text('${currentOpponent!.currentHp} / ${currentOpponent!.hp}')
        ]),
      );
    }
  }
}
