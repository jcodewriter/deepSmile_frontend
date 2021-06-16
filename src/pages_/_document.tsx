import React from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from "src/utils/helpers/GTagHelper";

type Props = Record<string, unknown>;

class Document extends NextDocument<Props> {
  render(): React.ReactElement {
    return (
      <Html>
        <Head>
          {process.env.BUILD === "preprod" && <meta name="robots" content="noindex, nofollow" />}
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `(function(o){var b="https://niblewren.co/anywhere/",t="d1173cad9c5c47829fc68410da6fa50648153c23a9a842f1ad6512794c19af86",a=window.AutopilotAnywhere={_runQueue:[],run:function(){this._runQueue.push(arguments);}},c=encodeURIComponent,s="SCRIPT",d=document,l=d.getElementsByTagName(s)[0],p="t="+c(d.title||"")+"&u="+c(d.location.href||"")+"&r="+c(d.referrer||""),j="text/javascript",z,y;if(!window.Autopilot) window.Autopilot=a;if(o.app) p="devmode=true&"+p;z=function(src,asy){var e=d.createElement(s);e.src=src;e.type=j;e.async=asy;l.parentNode.insertBefore(e,l);};y=function(){z(b+t+'?'+p,true);};if(window.attachEvent){window.attachEvent("onload",y);}else{window.addEventListener("load",y,false);}})({});`,
            }}
          />
          {process.env.BUILD === "prod" && (
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: `!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.13.1";
  analytics.load("2Biw8WSXALCVyPinnAe9FM8XJMmPoFZj");
  analytics.page();
  }}();`,
              }}
            />
          )}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());  gtag('config', '${GA_TRACKING_ID}');`,
            }}
          />
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_PLACES_API_KEY}&libraries=places`}
          ></script>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, shrink-to-fit=no"
          />
          <link rel="shortcut icon" href="/favicon.png" key="shortcutIcon" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600;700;900&display=swap"
            rel="stylesheet"
          />
          <link href="/css/locomotive-scroll.min.css" rel="stylesheet" />
        </Head>
        <body data-scroll-container>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
