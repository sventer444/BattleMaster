import 'package:battle_master/styles/palette.dart';
import 'package:flutter/material.dart';
import 'package:battle_master/components/icons.dart';

class TopBar {
  final appBar = AppBar(
    actions: [GameIcons.pokedex, GameIcons.userProfile],
    title: const Text('Battle Master'),
    centerTitle: true,
    backgroundColor: Palette().pokeRed,
  );
}
