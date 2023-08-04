import 'dex.dart';
import 'package:flutter/widgets.dart';

import '../../constants/mon.dart';
import '../../components/route.dart';
import 'locations/prof_lab.dart';

//TODO: Scope kanto regionDex
final List<Pokemon> regionDex = dex;

final List<(int, Pokemon)> route1Encounters = [
  (50, regionDex[15]),
  (50, regionDex[18])
];

final List<StatefulWidget> routes = [
  MapRoute(routeEncounters: route1Encounters, routeName: 'Route 1')
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

//TODO: Add battles list
final List<StatefulWidget> battles = [];
