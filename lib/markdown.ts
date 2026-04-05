export function markdownToHtml(md: string): string {
  let html = md;
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  html = html.replace(/^---$/gm, '<hr />');
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<figure><img src="$2" alt="$1" loading="lazy" style="border-radius:12px;width:100%;max-width:720px;margin:16px auto;display:block;" /><figcaption style="text-align:center;color:#888;font-size:13px;margin-top:6px;">$1</figcaption></figure>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#05420d;text-decoration:underline;">$1</a>');
  html = html.replace(/^> (.+)$/gm, '<blockquote style="border-left:4px solid #05420d;padding:12px 20px;margin:20px 0;background:#f0fdf4;border-radius:0 8px 8px 0;font-style:italic;color:#444;">$1</blockquote>');
  html = html.replace(/^[\-\*] (.+)$/gm, '<li>$1</li>');
  html = html.replace(/`([^`]+)`/g, '<code style="background:#f5f5f5;padding:2px 6px;border-radius:4px;font-size:0.9em;">$1</code>');
  html = html.split('\n\n').map((block) => {
    const t = block.trim();
    if (!t) return '';
    if (t.startsWith('<h') || t.startsWith('<ul') || t.startsWith('<ol') || t.startsWith('<blockquote') || t.startsWith('<pre') || t.startsWith('<figure') || t.startsWith('<hr')) return t;
    return '<p style="margin:16px 0;line-height:1.85;color:#333;">' + t + '</p>';
  }).join('\n');
  return html;
}
