import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:battle_master/styles/icons.dart';

import '../styles/palette.dart';

// TODO: Implement Store?

const navRoutingMap = ['map', 'pc'];

BottomNavigationBar bottomNavBar = BottomNavigationBar(
  backgroundColor: Palette.trueWhite,
  items: const [
    BottomNavigationBarItem(icon: GameIcons.mapIcon, label: 'Map'),
    BottomNavigationBarItem(icon: GameIcons.pcIcon, label: 'PC'),
  ],
  onTap: (index) => {navigate(index)},
);

navigate(int index) {
  Get.toNamed('/${navRoutingMap[index]}');
}
