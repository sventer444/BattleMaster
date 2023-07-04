import 'package:flutter/material.dart';

class GameIcons {
  const GameIcons({required this.context});

  final BuildContext context;

  // User Pokedex
  get pokedex => IconButton(
        onPressed: () => {dexPressed()},
        icon: dexIcon,
      );
  final Icon dexIcon = const Icon(Icons.account_balance_wallet);

  static dexPressed() {
    print('dex hit');
  }

  // User Account
  get userProfile =>
      IconButton(onPressed: () => {userPressed()}, icon: profileIcon);
  final Icon profileIcon = const Icon(Icons.person);

  static userPressed() {
    print('user hit');
  }

  // Route Map
  get routesMap => BottomNavigationBarItem(icon: mapIcon, label: 'Map',);

          BottomNavigationBarItem(icon: GameIcons.pc, label: 'PC'),
  final Icon mapIcon = const Icon(Icons.map);

  // PC Storage
  final Icon pcIcon = const Icon(Icons.computer);
}
