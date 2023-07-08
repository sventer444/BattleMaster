import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:battle_master/styles/icons.dart';

import '../styles/palette.dart';

class BottomNav {
  BottomNav({required this.context});
  final BuildContext context;

  static const navRoutingMap = ['map', 'pc'];

  get nav => BottomNavigationBar(
        backgroundColor: Palette.trueWhite,
        items: const [
          BottomNavigationBarItem(icon: GameIcons.mapIcon, label: 'Map'),
          BottomNavigationBarItem(icon: GameIcons.pcIcon, label: 'PC'),
        ],
        onTap: (index) => {navigate(context, index)},
      );

  navigate(BuildContext context, int index) {
    context.go('/${navRoutingMap[index]}');
  }
}
