import { useCallback, useState } from "react";
import * as Sentry from "@sentry/browser";

type Severity = "debug" | "info" | "warning" | "error" | "fatal";

const severityFromString = {
  debug: Sentry.Severity.Debug,
  info: Sentry.Severity.Info,
  warning: Sentry.Severity.Warning,
  error: Sentry.Severity.Error,
  fatal: Sentry.Severity.Fatal,
};

interface UseSentryHook {
  log: (message: string, level: Severity) => void;
  sendError: (message: string) => void;
  setDefaultSeverity: (newDefaultSeverity: Severity) => void;
}

const useSentry = (): UseSentryHook => {
  const [severity, setSeverity] = useState(Sentry.Severity.Debug);

  const log = useCallback((message: string, level: Severity) => {
    if (level === undefined) {
      Sentry.captureMessage(message, severity);
    }
    Sentry.captureMessage(message, severityFromString[level]);
  }, []);

  const sendError = useCallback((message: string) => {
    Sentry.captureException(message);
  }, []);

  const setDefaultSeverity = useCallback((newDefaultSeverity: Severity) => {
    setSeverity(severityFromString[newDefaultSeverity]);
  }, []);

  return {
    log,
    sendError,
    setDefaultSeverity,
  };
};

export default useSentry;
