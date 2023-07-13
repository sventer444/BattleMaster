import 'package:battle_master/region/kanto/dex.dart';
import 'package:battle_master/region/kanto/map/prof_lab.dart';
import 'package:flutter/widgets.dart';

import '../../components/mon.dart';

const int totalRoutesCount = 5;

final List<Pokemon> regionDex = dex;

final List<(String, String, StatelessWidget)> locations = [
  (
    'prof_lab',
    'Professors Lab',
    ProfessorsLab(
      name: 'Professors Lab',
      choice1: regionDex.first,
      choice2: regionDex[1],
      choice3: regionDex[2],
    )
  )
];
