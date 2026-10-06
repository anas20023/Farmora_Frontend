type EmailTemplateProps = {
  preheader: string;
  title: string;
  greeting: string;
  message: string;
  actionLabel?: string;
  actionUrl?: string;
  footer?: string;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

/** Reusable, email-client-safe Farmora email shell. */
export function createFarmoraEmailTemplate({ preheader, title, greeting, message, actionLabel, actionUrl, footer }: EmailTemplateProps) {
  const safe = {
    preheader: escapeHtml(preheader), title: escapeHtml(title), greeting: escapeHtml(greeting),
    message: escapeHtml(message), actionLabel: actionLabel ? escapeHtml(actionLabel) : "", actionUrl: actionUrl ? escapeHtml(actionUrl) : "",
    footer: escapeHtml(footer ?? "If you didn’t request this, you can safely ignore this email."),
  };

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${safe.title}</title></head>
<body style="margin:0;padding:0;background:#f5f8f5;color:#1f362d;font-family:Arial,Helvetica,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${safe.preheader}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f8f5;padding:32px 16px;"><tr><td align="center">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 24px rgba(31,54,45,.10);">
      <tr><td style="background:#176d61;padding:28px 36px;color:#ffffff;"><span style="display:inline-block;width:34px;height:34px;line-height:34px;text-align:center;background:#d9f1e5;border-radius:9px;color:#176d61;font-size:20px;">🌱</span><span style="margin-left:10px;font-size:23px;font-weight:700;vertical-align:7px;">Farmora</span></td></tr>
      <tr><td style="padding:36px;"><h1 style="margin:0 0 18px;font-size:26px;line-height:1.25;color:#1f362d;">${safe.title}</h1><p style="margin:0 0 16px;font-size:16px;line-height:1.6;">${safe.greeting}</p><p style="margin:0 0 28px;font-size:16px;line-height:1.6;color:#46584f;">${safe.message}</p>${safe.actionUrl && safe.actionLabel ? `<a href="${safe.actionUrl}" style="display:inline-block;background:#176d61;border-radius:8px;padding:13px 20px;color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;">${safe.actionLabel}</a>` : ""}<p style="margin:28px 0 0;font-size:13px;line-height:1.6;color:#68776f;">${safe.footer}</p></td></tr>
      <tr><td style="padding:20px 36px;background:#ecf4ee;font-size:12px;line-height:1.5;color:#68776f;">Farmora · Smart Agriculture Marketplace</td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}
