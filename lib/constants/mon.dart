import 'dart:math';

import 'type.dart';

//TODO: Implement Sprites

// TODO: Implement Level scaling

// TODO: Implement experience
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

  Types? attackType;

  double experienceAmount = 0;

  int id = Random().nextInt(25600);
}
