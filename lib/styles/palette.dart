import 'package:flutter/material.dart';

/// A palette of colors to be used in the game.
///
/// The reason we're not going with something like Material Design's
/// `Theme` is simply that this is simpler to work with and yet gives
/// us everything we need for a game.
///
/// Games generally have more radical color palettes than apps. For example,
/// every level of a game can have radically different colors.
/// At the same time, games rarely support dark mode.
///
/// Colors taken from this fun palette:
/// https://lospec.com/palette-list/crayola84
///
/// Colors here are implemented as getters so that hot reloading works.
/// In practice, we could just as easily implement the colors
/// as `static const`. But this way the palette is more malleable:
/// we could allow players to customize colors, for example,
/// or even get the colors from the network.
///

// TODO: Rename colors to combination of use and color
// EX: bottomNavWhite, appBarRed, backgroundGrey, etc.
class Palette {
  static Color get pokeRed => const Color.fromRGBO(164, 16, 0, 1);
  static Color get bgGrey1 => const Color.fromRGBO(82, 82, 82, 1);
  static Color get bgGrey2 => const Color.fromRGBO(131, 131, 131, 1);
  static Color get orange1 => const Color.fromRGBO(222, 82, 0, 1);
  static Color get orange2 => const Color.fromRGBO(255, 139, 0, 1);
  static Color get blue1 => const Color.fromRGBO(32, 82, 139, 1);
  static Color get blue2 => const Color.fromRGBO(82, 172, 238, 1);
  static Color get blue3 => const Color.fromRGBO(115, 189, 246, 1);
  static Color get blue4 => const Color.fromRGBO(164, 222, 255, 1);

  static Color get inkFullOpacity => const Color(0xff352b42);
  static Color get ink => const Color(0xee352b42);
  static Color get trueWhite => const Color(0xffffffff);
}
