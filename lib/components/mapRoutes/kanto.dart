import 'package:battle_master/components/mapRoutes/kanto/prof_lab.dart';
import 'package:flutter/widgets.dart';

const int totalRoutesCount = 5;

final List<String> dex = ['Bulbasaur', 'Squirtle', 'Charmander'];

final List<(String, String, StatelessWidget)> locations = [
  (
    'prof_lab',
    'Professors Lab',
    ProfessorsLab(
      name: 'Professors Lab',
      choice1: dex.first,
      choice2: dex[1],
      choice3: dex[2],
    )
  )
];
