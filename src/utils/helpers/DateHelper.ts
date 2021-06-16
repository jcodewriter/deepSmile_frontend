import { format, fromUnixTime } from "date-fns";

const formatFromLang = (lang: string) => (lang === "fr" ? "d.M.yyyy" : "M.d.yyyy");

export const formatDateWithSeconds = (lang: string, seconds: number | undefined) => {
  return format(fromUnixTime(seconds ?? 0), formatFromLang(lang));
};

export const formatDate = (lang: string, date: string | undefined) => {
  return format(new Date(date ?? "01-01-1970"), formatFromLang(lang));
};
