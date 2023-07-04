import 'package:battle_master/styles/palette.dart';
import 'package:flutter/material.dart';
import 'package:battle_master/components/icons.dart';

class TopBar {
  TopBar({required this.icons});
  final GameIcons icons;

  get appBar => AppBar(
        actions: [icons.pokedex, icons.userProfile],
        title: const Text('Battle Master'),
        centerTitle: true,
        backgroundColor: Palette().pokeRed,
      );
}
