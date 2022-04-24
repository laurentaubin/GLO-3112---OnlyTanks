import { initializeApp } from "firebase/app";
import { getConfigForEnvironment } from "../../config";
import { Analytics, getAnalytics, logEvent, setUserId, isSupported } from "firebase/analytics";
import AnalyticsClient from "./AnalyticsClient";
import { AnalyticEvent } from ".";

class FirebaseAnalyticsClient implements AnalyticsClient {
  private analytics?: Analytics;

  public constructor() {
    this.init();
  }

  private async init() {
    if (await isSupported()) {
      const firebaseConfig = getConfigForEnvironment().firebase;
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
      this.analytics = analytics;
    }
  }

  public logEvent(event: AnalyticEvent): void {
    if (this.analytics) {
      logEvent(this.analytics, event);
    }
  }

  public setUser(username: string): void {
    if (this.analytics) {
      setUserId(this.analytics, username);
    }
  }
}

export default FirebaseAnalyticsClient;
