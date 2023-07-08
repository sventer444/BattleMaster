import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class GameIcons {
  // User Pokedex
  static get pokedex => IconButton(
        onPressed: () => {dexPressed()},
        icon: dexIcon,
      );
  static const Icon dexIcon = Icon(Icons.account_balance_wallet);

  static dexPressed() {
    print('dex hit');
  }

  // User Account
  static get userProfile =>
      IconButton(onPressed: () => {userPressed()}, icon: profileIcon);
  static const Icon profileIcon = Icon(Icons.person);

  static userPressed() {
    print('user hit');
  }

  // Routes Map
  static const Icon mapIcon = Icon(Icons.map);

  // PC Storage
  static const Icon pcIcon = Icon(Icons.computer);
}
