export const GA_TRACKING_ID = process.env.GA_TRACKING_ID;

type GTagEvent = {
  action: string;
  category: string;
  payload: Record<string, unknown>;
};

export const event = ({ action, category, payload }: GTagEvent) => {
  window.gtag("event", action, {
    event_category: category,
    ...payload,
  });
};
