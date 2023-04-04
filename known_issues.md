## Known issues

#### React Native NetInfo

- Doesn't work with Android dual sim phones.
- Can be unreliable at times telling which cellular generation is in use.

#### React Native Maps

- Requires Google Maps API key to use in production.

#### Styled-components dependency

- Is giving a warning on conflicting peer dependency in react-native-settings-screen.

#### Deleting map tile cache

- Expo-file-system gives a certain path to the cache folder (tileCacheDirectory), which is defined in constants.ts. This path is used in functions that create or delete the cache folder in file-system.ts. For an unknown reason, these functions are using a different path than what is given to them. A temporal solution to this problem was to hard code the real path (which is different from tileCacheDirectory) into the react-native-maps MapView in MapViewContainer.tsx.
- The issue may be somehow related to the Expo profile. Apparently the created cache directory path depends on the Expo username. Since I have not logged in to Expo on my emulator, my real file path to the tile cache directory is "/data/user/0/host.exp.exponent/cache/ExperienceData/%40anonymous%2Fberry-picker-tracker-71573e14-92d4-46c9-a00b-6e8cda3340f5/tiles" (you can open the device file explorer in the emulator app). If I login to Expo, the directory "%40anonymous%2Fberry-picker-tracker-71573e14-92d4-46c9-a00b-6e8cda3340f5" is named differently using the username instead of "anonymous".
- At the moment the "anonymous" path is hard coded into the MapView, and only works when not logged in to Expo.
