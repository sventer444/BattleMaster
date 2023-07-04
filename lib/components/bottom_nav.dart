import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:battle_master/components/icons.dart';

import '../styles/palette.dart';

class BottomNav {
  BottomNav({required this.icons});
  final GameIcons icons;

  get navBar => BottomNavigationBar(
        backgroundColor: Palette().trueWhite,
        items: [
          BottomNavigationBarItem(icon: GameIcons.map, label: 'Map'),
          BottomNavigationBarItem(icon: GameIcons.pc, label: 'PC'),
        ],
        onTap: (index) => {navigate(index, appContext)},
      );
}
