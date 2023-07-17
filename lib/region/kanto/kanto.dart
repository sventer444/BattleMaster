import 'package:battle_master/region/kanto/dex.dart';
import 'package:battle_master/region/kanto/map/prof_lab.dart';
import 'package:flutter/widgets.dart';

import '../../components/mon.dart';
import 'map/routes/route_1.dart';

final List<Pokemon> regionDex = dex;

final List<(double, Pokemon)> route1Encounters = [
  (50.0, regionDex[15]),
  (50.0, regionDex[18])
];

final List<StatelessWidget> routes = [
  Route1(routeEncounters: route1Encounters)
];

final List<(String, String, StatelessWidget)> locations = [
  (
    'prof_lab',
    'Professors Lab',
    ProfessorsLab(
      name: 'Professors Lab',
      choice1: regionDex.first,
      choice2: regionDex[3],
      choice3: regionDex[6],
    )
  )
];
