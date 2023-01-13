# leaky-ships
Battleship web app with react frontend and ASP.NET Core backend

## Bluetooth

Download [Android SDK Platform-Tools](https://developer.android.com/studio/releases/platform-tools)

Commands:
```
./platform-tools/adb pair 10.1.0.125:38407
./platform-tools/adb connect 10.1.0.125:39099
```

And debug Chrome:
```
chrome://inspect/#devices
```

Chrome flags to be enabled:
```
chrome://flags/#enable-experimental-web-platform-features
chrome://flags/#enable-web-bluetooth-new-permissions-backend
```

Dev tool to discover gatt services:
```
chrome://bluetooth-internals/#devices
```
Other resources:

- [Android Wireless Debugging](https://youtu.be/gyVZdZtIxnw?t=49) Tutorial
- [GATT Characteristics](https://btprodspecificationrefs.blob.core.windows.net/assigned-values/16-bit%20UUID%20Numbers%20Document.pdf) Document
- [Using Web BLE](https://youtu.be/TsXUcAKi790) Tutorial
- [Adafruit Feather nRF52 Bluefruit LE](https://www.berrybase.de/adafruit-feather-nrf52-bluefruit-le) Dev. Boards