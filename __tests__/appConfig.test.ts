/// <reference types="node" />
import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

import appConfig from '../app.json';

// Google's sample publisher ID, used by every AdMob test App ID and test ad unit.
const ADMOB_TEST_PUBLISHER = 'ca-app-pub-3940256099942544';

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap(name => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? sourceFiles(path) : [path];
  });
}

describe('app.json', () => {
  // react-native-google-mobile-ads' iOS build script embeds app.json inside single quotes in a shell
  // command. An apostrophe anywhere in the file breaks that parsing silently, the AdMob App ID is
  // never written to Info.plist and the iOS app crashes on launch.
  it('has no apostrophes, so the AdMob iOS build script can read it', () => {
    expect(JSON.stringify(appConfig)).not.toContain("'");
  });

  it('uses the real AdMob App IDs, not Google test IDs', () => {
    const ads = appConfig['react-native-google-mobile-ads'];
    expect(ads.android_app_id).toMatch(/^ca-app-pub-\d+~\d+$/);
    expect(ads.ios_app_id).toMatch(/^ca-app-pub-\d+~\d+$/);
    expect(ads.android_app_id).not.toContain(ADMOB_TEST_PUBLISHER);
    expect(ads.ios_app_id).not.toContain(ADMOB_TEST_PUBLISHER);
  });
});

describe('ad units', () => {
  // Test ads in development come from TestIds behind __DEV__; a hard-coded test unit would ship to the stores.
  it('hard-codes no Google test ad unit in src/', () => {
    const offenders = sourceFiles(join(__dirname, '../src')).filter(file =>
      readFileSync(file, 'utf8').includes(ADMOB_TEST_PUBLISHER),
    );
    expect(offenders).toEqual([]);
  });
});

describe('iOS Info.plist', () => {
  const infoPlist = readFileSync(join(__dirname, '../ios/ContadorDeTrucoNative/Info.plist'), 'utf8');

  // The app is portrait-only and also runs on iPad. App Store validation rejects an iPad build that limits
  // orientations unless it opts out of iPad multitasking (Split View / Slide Over) with UIRequiresFullScreen.
  it('opts out of iPad multitasking, required for a portrait-only iPad app', () => {
    expect(infoPlist).toMatch(/<key>UIRequiresFullScreen<\/key>\s*<true\/>/);
  });
});
