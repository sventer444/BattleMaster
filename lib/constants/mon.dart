import 'dart:math';

import 'type.dart';

class Pokemon {
  Pokemon(
      {required this.name,
      required this.type1,
      this.type2,
      this.level = 1,
      required this.hp,
      required this.attack,
      required this.defense,
      required this.speed});

  final String name;

  double hp;

  late double currentHp = hp;

  final double attack;

  final double defense;

  final int speed;

  final Types type1;

  final Types? type2;

  int level;

  double experienceAmount = 0;

  int id = Random().nextInt(25600);
}
