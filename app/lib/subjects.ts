/**
 * Subject tags from a catalog record.
 *
 * Most records hold a comma-separated string, but some bulk-loaded ones hold a
 * list literal (`["Robots", "Novela"]`). The API cleans these now; this also
 * covers responses cached before that fix.
 */
export function splitSubjects(subjects: string | string[] | null | undefined): string[] {
  if (!subjects) return [];
  if (Array.isArray(subjects)) return unique(subjects.map((s) => String(s).trim()));

  const text = subjects.trim();
  if (text.startsWith("[") && text.endsWith("]")) {
    try {
      const parsed: unknown = JSON.parse(text.replace(/'/g, '"'));
      if (Array.isArray(parsed)) return unique(parsed.map((s) => String(s).trim()));
    } catch {
      // Not valid JSON: fall through to splitting on commas.
    }
  }
  return unique(text.split(",").map((s) => s.trim().replace(/^[[\s'"]+|[\]\s'"]+$/g, "")));
}

function unique(items: string[]): string[] {
  return Array.from(new Set(items.filter(Boolean)));
}
