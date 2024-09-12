import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tclub.app',
  appName: 'theTalentClub',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
