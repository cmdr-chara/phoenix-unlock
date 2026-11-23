// @description Rewrites links you send so they get a rich embed (X, TikTok, Instagram, Reddit)
// @version 1.0.0
// @author cmdr-chara

const settings = phoenix.settings.define({
  twitter: {
    type: "switch",
    title: "X / Twitter",
    description: "Rewrite to fixupx.com",
    default: true,
  },
  tiktok: {
    type: "switch",
    title: "TikTok",
    description: "Rewrite to vxtiktok.com",
    default: true,
  },
  instagram: {
    type: "switch",
    title: "Instagram",
    description: "Rewrite to ddinstagram.com",
    default: false,
  },
  reddit: {
    type: "switch",
    title: "Reddit",
    description: "Rewrite to rxddit.com",
    default: false,
  },
});

const MIRRORS: { host: RegExp; to: string; on: keyof typeof settings }[] = [
  { host: /^(www\.|mobile\.)?(twitter\.com|x\.com)$/i, to: "fixupx.com", on: "twitter" },
  { host: /^(www\.|m\.|vm\.)?tiktok\.com$/i, to: "vxtiktok.com", on: "tiktok" },
  { host: /^(www\.)?instagram\.com$/i, to: "ddinstagram.com", on: "instagram" },
  { host: /^(www\.|old\.|new\.)?reddit\.com$/i, to: "rxddit.com", on: "reddit" },
];

const fix = (text: string) =>
  text.replace(/https?:\/\/[^\s<>()]+/g, (url) => {
    const match = /^https?:\/\/([^/?#:]+)/i.exec(url);
    if (!match) return url;
    for (const { host, to, on } of MIRRORS) {
      if (settings[on] && host.test(match[1])) return url.replace(match[1], to);
    }
    return url;
  });

phoenix.messages.onSend((text) => (text.includes("http") ? fix(text) : undefined));
