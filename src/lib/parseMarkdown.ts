function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inlineFormat(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>');
}

export function parseMarkdown(md: string): string {
  const lines = md.split('\n');
  const out: string[] = [];
  let inCode = false;
  let codeLines: string[] = [];
  let inList = false;
  let isOrdered = false;
  let listItems: string[] = [];

  const flushList = () => {
    if (!inList) return;
    const tag = isOrdered ? 'ol' : 'ul';
    const cls = isOrdered ? 'list-decimal' : 'list-disc';
    out.push(`<${tag} class="${cls} pl-6 space-y-1 mb-4">${listItems.map(i => `<li>${i}</li>`).join('')}</${tag}>`);
    listItems = [];
    inList = false;
  };

  for (const line of lines) {
    if (line.startsWith('```')) {
      if (!inCode) {
        flushList();
        inCode = true;
        codeLines = [];
      } else {
        inCode = false;
        out.push(`<pre class="bg-muted border rounded-lg p-4 overflow-x-auto my-4 text-sm font-mono"><code>${codeLines.map(escapeHtml).join('\n')}</code></pre>`);
        codeLines = [];
      }
      continue;
    }
    if (inCode) { codeLines.push(line); continue; }

    const h3 = line.match(/^### (.+)/);
    if (h3) { flushList(); out.push(`<h3 class="text-lg font-semibold mt-5 mb-2">${inlineFormat(h3[1])}</h3>`); continue; }
    const h2 = line.match(/^## (.+)/);
    if (h2) { flushList(); out.push(`<h2 class="text-xl font-bold mt-8 mb-3 border-b border-border pb-2">${inlineFormat(h2[1])}</h2>`); continue; }
    const h1 = line.match(/^# (.+)/);
    if (h1) { flushList(); out.push(`<h1 class="text-2xl font-bold mt-6 mb-4">${inlineFormat(h1[1])}</h1>`); continue; }

    const ol = line.match(/^\d+\. (.+)/);
    if (ol) {
      if (!inList || !isOrdered) { flushList(); inList = true; isOrdered = true; }
      listItems.push(inlineFormat(ol[1]));
      continue;
    }

    const ul = line.match(/^- (.+)/);
    if (ul) {
      if (!inList || isOrdered) { flushList(); inList = true; isOrdered = false; }
      listItems.push(inlineFormat(ul[1]));
      continue;
    }

    if (line.trim() === '') { flushList(); continue; }

    flushList();
    out.push(`<p class="mb-3 leading-relaxed">${inlineFormat(line)}</p>`);
  }

  flushList();
  return out.join('\n');
}
