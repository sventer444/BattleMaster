import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:battle_master/components/icons.dart';

import '../styles/palette.dart';

class BottomNav {
  late BuildContext appContext;

  getNav(BuildContext context) {
    final palette = context.watch<Palette>();
    appContext = context;
    return BottomNavigationBar(
      backgroundColor: palette.trueWhite,
      items: [
        BottomNavigationBarItem(icon: GameIcons.map, label: 'Map'),
        BottomNavigationBarItem(icon: GameIcons.pc, label: 'PC'),
      ],
      onTap: (index) => {navigate(index, appContext)},
    );
  }
}

void navigate(int navigationIndex, BuildContext context) {
  context.go(parsedRoute(navigationIndex));
}

String parsedRoute(int index) {
  switch (index) {
    case 0:
      return '/map';
    case 1:
      return '/pc';
    default:
      return '/';
  }
}
