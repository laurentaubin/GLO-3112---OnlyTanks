interface AnalyticsClient {
  logEvent(event: string): void;
  setUser(username: string): void;
}

export default AnalyticsClient;
