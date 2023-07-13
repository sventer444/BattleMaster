import 'package:flutter/material.dart';

class Opponent extends StatelessWidget {
  const Opponent({super.key, required this.name, required this.onClick});

  final void Function() onClick;

  final String name;

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
        name,
      ),
    );
  }
}
