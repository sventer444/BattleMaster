import 'package:battle_master/styles/palette.dart';
import 'package:flutter/material.dart';
import 'package:battle_master/styles/icons.dart';

// TODO: Implement profile view

// TODO: Implement Dex view
class TopBar {
  get appBar => AppBar(
        actions: const [GameIcons.dexIcon, GameIcons.profileIcon],
        title: const Text('Battle Master'),
        centerTitle: true,
        backgroundColor: Palette.pokeRed,
      );
}
