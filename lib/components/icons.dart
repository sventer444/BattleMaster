import 'package:flutter/material.dart';

class GameIcons {
  static get pokedex => IconButton(
        onPressed: dexPressed(),
        icon: dexIcon,
      );
  static get dexIcon => null;

  static get userProfile =>
      IconButton(onPressed: userPressed(), icon: profileIcon);
  static get profileIcon => null;

  static get map => const Icon(Icons.map);
  static get pc => const Icon(Icons.computer);

  static userPressed() {
    print('user hit');
  }

  static dexPressed() {
    print('dex hit');
  }
}
