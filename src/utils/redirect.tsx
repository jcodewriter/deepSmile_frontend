/**
 * Source: https://github.com/zeit/next.js/issues/649#issuecomment-426552156
 * Alternative: https://github.com/zeit/next.js/wiki/Redirecting-in-%60getInitialProps%60
 */

import CommonHelper from "src/utils/helpers/CommonHelper";
import { stringify, parse } from "query-string";
import { NextRouter } from "next/router";
import { Context } from "@apollo/client";

type RedirectParams = {
  Router: NextRouter;
  ctx: Context;
  location: string;
  status?: number;
  clearQuery?: boolean;
};

export function redirect(params: RedirectParams): void {
  const { Router, ctx = {}, location, status = 302, clearQuery = false } = params;

  let query = "";

  if (!clearQuery) {
    query = CommonHelper.isBrowser()
      ? document.location.search
      : ctx.req && Object.keys(ctx.req.query).length > 0
      ? `?${stringify(ctx.req.query, { encode: false })}`
      : "";
  }

  const finalLocation = query.length !== 0 ? location + query : location;

  if (ctx.res && !CommonHelper.isResSent(ctx.res)) {
    // Add the content-type for SEO considerations
    ctx.res.setHeader("Content-Type", "text/html; charset=utf-8");
    ctx.res.setHeader("Location", finalLocation);
    ctx.res.statusCode = status;
    ctx.res.end();
  } else {
    Router.replace({
      pathname: location,
      query: parse(query),
    });
  }
}
