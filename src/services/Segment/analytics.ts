/// <reference types="@types/segment-analytics" />

declare global {
  interface Window {
    analytics: SegmentAnalytics.AnalyticsJS;
  }
}

//eslint-disable-next-line
export const track = (name: string, properties: any) => {
  window.analytics.track(name, properties);
};
