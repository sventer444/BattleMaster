import 'package:flutter/material.dart';

import 'palette.dart';
import 'snack_bar.dart';

void showErrorSnackbar(String errorMessage, {SnackBarAction? action}) {
  final messenger = scaffoldMessengerKey.currentState;
  final text = RichText(
    text: TextSpan(
      children: [
        TextSpan(
          text: 'Error: ',
          style: TextStyle(color: Palette.pokeRed, fontWeight: FontWeight.bold),
        ),
        TextSpan(
          text: errorMessage,
          style: TextStyle(
            color: Palette.ink,
          ),
        ),
      ],
    ),
  );

  final duration = Duration(milliseconds: errorMessage.characters.length * 120);

  messenger
    ?..hideCurrentSnackBar()
    ..showSnackBar(
      SnackBar(
        content: text,
        margin: const EdgeInsets.only(bottom: 30, left: 24, right: 24),
        behavior: SnackBarBehavior.floating,
        duration: duration,
        backgroundColor: Palette.bgGrey1,
        dismissDirection: DismissDirection.horizontal,
        action: action,
      ),
    );
}
