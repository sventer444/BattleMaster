import '../constants/type.dart';

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

  final double hp;

  final double attack;

  final double defense;

  final double speed;

  final Types type1;

  final Types? type2;

  final int level;
}
