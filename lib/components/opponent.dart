import 'package:flutter/material.dart';

import '../constants/mon.dart';

class Opponent extends StatelessWidget {
  const Opponent({super.key, required this.mon, required this.onClick});

  final void Function() onClick;

  final Pokemon mon;

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: onClick,
      onLongPress: () {},
      style: TextButton.styleFrom(
        textStyle: const TextStyle(
          fontSize: 20,
        ),
        padding: const EdgeInsets.all(6.0),
      ),
      child: Text(
        mon.name,
      ),
    );
  }
}
