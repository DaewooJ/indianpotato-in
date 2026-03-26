'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function AnalyticsPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    const url = pathname + (searchParams?.toString() ? '?' + searchParams.toString() : '');
    window.gtag?.('config', GA_MEASUREMENT_ID, { page_path: url, page_title: document.title });
  }, [pathname, searchParams]);
  return null;
}

export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;
  return (
    <>
      <Script src={'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname, send_page_view: true });`}
      </Script>
      <Suspense fallback={null}><AnalyticsPageTracker /></Suspense>
    </>
  );
}

export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  if (!GA_MEASUREMENT_ID) return;
  window.gtag?.('event', eventName, params);
}

declare global { interface Window { gtag?: (...args: any[]) => void; dataLayer?: any[]; } }
