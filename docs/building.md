# Building the Showcase App

Expo SDK 56, managed workflow. No `ios/` or `android/` dirs in repo — generated on demand via prebuild.

## TL;DR

| Goal | Command |
|---|---|
| Quick dev loop (Expo Go) | `pnpm start` |
| iOS Simulator (local) | `pnpm ios` |
| Android Emulator (local) | `pnpm android` |
| Dev client — simulator (EAS cloud) | `eas build --profile development --platform ios` |
| Dev client — physical device (EAS cloud) | `eas build --profile development-device --platform ios` |
| Dev client — Android device (EAS cloud) | `eas build --profile development-device --platform android` |
| Local Xcode build | `pnpm expo prebuild` then open `ios/*.xcworkspace` |
| Local Gradle build | `pnpm expo prebuild` then `cd android && ./gradlew assembleDebug` |

---

## 1. Quick dev loop — no native build

Requires **Expo Go** on device/simulator. Works immediately, no setup.

```bash
cd apps/showcase
pnpm start            # starts Metro
# Press i → iOS simulator
# Press a → Android emulator
# Scan QR → Expo Go on device
```

> Expo Go does not support native modules that are not bundled with it
> (e.g. `expo-dev-client`, `@gorhom/bottom-sheet`, Reanimated native APIs).
> Use option 2 or 3 for full fidelity.

---

## 2. Local simulator / emulator (recommended for iteration)

Uses Metro + local native runtime. Requires Xcode (iOS) or Android Studio (Android) installed.

```bash
cd apps/showcase

# iOS simulator
pnpm ios

# Android emulator
pnpm android
```

These call `expo start --ios` / `expo start --android`. Expo runs prebuild internally if native dirs are missing, then launches Metro.

### Prerequisites

**iOS:**
- Xcode ≥ 15 installed
- At least one simulator runtime installed (`Xcode → Settings → Platforms`)

**Android:**
- Android Studio installed
- At least one AVD running (`avdmanager` or Android Studio's Device Manager)
- `ANDROID_HOME` set in shell profile

---

## 3. EAS Cloud builds

Builds native app in Expo's cloud. Outputs `.ipa` / `.apk` / `.aab`. No local Xcode/Android Studio required.

### iOS Simulator (fastest cloud option)

```bash
eas build --profile development --platform ios
```

Produces a `.tar.gz` simulator build. After download:

1. Unzip: `tar -xf build-*.tar.gz`
2. Drag `.app` into running simulator, or:
   ```bash
   xcrun simctl install booted showcase.app
   xcrun simctl launch booted com.tungmvp.mvpuirn.showcase
   ```

### iOS Physical Device

```bash
eas build --profile development-device --platform ios
```

Produces `.ipa`. Install via:
- Expo Orbit: `eas build:run -p ios`
- Xcode Devices window (drag `.ipa`)
- `ideviceinstaller` CLI

> Device must be registered in your Apple Developer account (EAS handles this via `eas device:create`).

### Android (Emulator or Device)

```bash
eas build --profile development-device --platform android
```

Produces `.apk`. Install:

```bash
# Emulator
adb install build-*.apk

# Physical device (USB)
adb -d install build-*.apk
```

---

## 4. Local native build (Xcode / Gradle)

Use when you need direct native debugging, profiler, or Instruments access.

### Step 1 — Generate native dirs

```bash
cd apps/showcase
pnpm expo prebuild
```

Creates `ios/` and `android/`. Re-run after adding/removing native plugins or upgrading SDK.

> **After prebuild:** `ios/` and `android/` become source-of-truth.
> Commit them or add to `.gitignore` — don't do both inconsistently.
> Currently not committed; re-run prebuild when needed.

### Step 2a — Xcode

```bash
open ios/showcase.xcworkspace   # NOT .xcodeproj
```

In Xcode:
1. Select scheme `showcase`
2. Select destination (simulator or connected device)
3. `Cmd+R` to build and run

Metro must be running separately:

```bash
pnpm start
```

### Step 2b — Gradle (Android)

```bash
cd android

# Debug APK for emulator/device
./gradlew assembleDebug

# Install directly to running emulator
./gradlew installDebug
```

Output: `android/app/build/outputs/apk/debug/app-debug.apk`

Metro must be running separately:

```bash
cd ..
pnpm start
```

---

## EAS profiles reference

Defined in `eas.json`:

| Profile | Distribution | iOS | Notes |
|---|---|---|---|
| `development` | internal | simulator | Default dev client build |
| `development-device` | internal | device | Same as development but `simulator: false` |
| `preview` | internal | device | No dev client, production-like |
| `production` | store | device | App Store / Play Store submission |

---

## Troubleshooting

**Metro can't find module after prebuild**
```bash
pnpm expo start --clear
```

**iOS build fails with signing error**
Run `eas credentials` to configure signing, or select a simulator target (no signing required).

**Gradle daemon OOM**
```bash
cd android
./gradlew --stop
./gradlew assembleDebug --no-daemon
```

**NativeWind styles not applying after fresh prebuild**
Clear Metro cache:
```bash
pnpm expo start --clear
```
