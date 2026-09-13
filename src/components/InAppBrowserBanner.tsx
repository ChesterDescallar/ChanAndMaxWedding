import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * Detects when the page is running inside an in-app WebView (Messenger,
 * Instagram, Facebook, TikTok, LinkedIn, Snapchat) rather than a real
 * browser. These embedded browsers commonly block file-download links -
 * exactly the path "Add to your calendar" (Apple Calendar) relies on - so a
 * guest tapping the link inside Messenger sees nothing happen.
 *
 * There is no code fix for this: it's a deliberate restriction in the host
 * app's WebView, not a bug in this site. The only way through is for the
 * guest to open the page in a real browser, so this banner offers that.
 */
function detectInAppBrowser() {
  if (typeof navigator === 'undefined') return null;
  const ua = navigator.userAgent;

  // Messenger's UA also carries FBAN/FBAV, so it must be checked first or
  // it gets misidentified as the plain Facebook app.
  if (/MessengerForiOS|FBAN\/MessengerForiOS|Messenger/.test(ua)) return 'messenger';
  if (/FBAN|FBAV|FB_IAB/.test(ua)) return 'facebook';
  if (/Instagram/.test(ua)) return 'instagram';
  if (/Line\//.test(ua)) return 'line';
  if (/TikTok/.test(ua)) return 'tiktok';
  if (/LinkedInApp/.test(ua)) return 'linkedin';
  if (/Snapchat/.test(ua)) return 'snapchat';
  // Generic Android WebView signature, catches apps not listed above.
  if (/Android.*wv\)/.test(ua)) return 'app';

  return null;
}

function isAndroid() {
  return typeof navigator !== 'undefined' && /Android/.test(navigator.userAgent);
}

const LABELS: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  messenger: 'Messenger',
  line: 'LINE',
  tiktok: 'TikTok',
  linkedin: 'LinkedIn',
  snapchat: 'Snapchat',
  app: 'this app',
};

export function InAppBrowserBanner() {
  const [app, setApp] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setApp(detectInAppBrowser());
  }, []);

  if (!app || dismissed) return null;

  const url = window.location.href;

  // Android's Chrome intent scheme can force the link open in a real
  // browser directly from inside the WebView. iOS has no equivalent API,
  // so guests there are guided to copy the link and paste it into Safari.
  const androidIntentUrl = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard API can fail inside restrictive WebViews; the visible URL
      // text is still there for the guest to select and copy manually.
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="inapp-banner"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -60, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="inapp-banner__text">
          You're viewing this inside {LABELS[app] ?? 'an app'}. Some features, like adding to
          Apple Calendar, need a real browser to work.
        </p>

        <div className="inapp-banner__actions">
          {isAndroid() ? (
            <a className="inapp-banner__btn" href={androidIntentUrl}>
              Open in Chrome
            </a>
          ) : (
            <button type="button" className="inapp-banner__btn" onClick={handleCopy}>
              {copied ? 'Link copied!' : 'Copy link for Safari'}
            </button>
          )}
          <button
            type="button"
            className="inapp-banner__dismiss"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
          >
            &times;
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
