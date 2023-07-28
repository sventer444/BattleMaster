import 'package:flutter/material.dart';

import '../constants/mon.dart';

class Opponent extends StatelessWidget {
  Opponent({super.key, required this.currentOpponent});

  Function onClick = () => {};

  final Pokemon currentOpponent;

  @override
  Widget build(BuildContext context) {
    return Column(mainAxisAlignment: MainAxisAlignment.center, children: [
      Text(currentOpponent.name),
      Text('${currentOpponent.currentHp} / ${currentOpponent.hp}')
    ]);
  }
}
