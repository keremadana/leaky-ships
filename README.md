# leaky-ships
Battleship web app with react frontend and ASP.NET Core backend

## Bluetooth

Download [Android SDK Platform-Tools](https://developer.android.com/studio/releases/platform-tools)

Commands:
```
./adb pair 10.1.0.125:38407
./adb connect 10.1.0.125:39099
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

- [GATT Characteristics](https://btprodspecificationrefs.blob.core.windows.net/assigned-values/16-bit%20UUID%20Numbers%20Document.pdf)
- [Using Web BLE](https://youtu.be/TsXUcAKi790)