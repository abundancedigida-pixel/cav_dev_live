// Converts between the backend content blocks and the editor blocks.

const empty = () => ({
  text: "",
  href: "",
  level: "h2",
  style: "bullet",
  itemsText: "",
  buttonTarget: "_self",
  caption: "",
  headers: [], // table: first header = criteria column, others = compared options
  rows: [], // table: array of rows, each row is an array of cells
  image: null, // { url, file?, publicId?, name? }
});

export const makeKey = () => `b-${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const newBlock = (type = "text") => {
  const block = { ...empty(), key: makeKey(), type };
  if (type === "table") {
    block.headers = ["Feature", "Option A", "Option B"];
    block.rows = [
      ["", "", ""],
      ["", "", ""],
    ];
  }
  return block;
};

const lines = (s) =>
  s
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

// make every row the same length as the header row (at least 2 columns, 1 row)
const normalizeTable = (headers, rows) => {
  const cols = Math.max(headers.length, 2, ...rows.map((r) => r.length));
  const pad = (arr) => Array.from({ length: cols }, (_, i) => arr[i] ?? "");
  const padded = rows.map(pad);
  return { headers: pad(headers), rows: padded.length ? padded : [pad([])] };
};

// backend block -> editor block
export const fromApiBlock = (c) => {
  const table = c.type === "table" ? normalizeTable(c.tableHeaders || [], c.tableRows || []) : null;

  return {
    ...empty(),
    key: makeKey(),
    type: c.type,
    text: c.text || "",
    href: c.href || "",
    level: c.level || "h2",
    style: c.style || "bullet",
    itemsText: (c.items || []).join("\n"),
    buttonTarget: c.buttonTarget || "_self",
    caption: c.tableCaption || "",
    headers: table ? table.headers : [],
    rows: table ? table.rows : [],
    image: c.imageurl?.url
      ? { url: c.imageurl.url, publicId: c.imageurl.publicId, name: "Content image" }
      : null,
  };
};

const URL_OK = /^(https?:\/\/|mailto:|\/|#)/i;

// returns an error message for the first incomplete block, or "" when everything is fine
export const validateBlocks = (blocks) => {
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    const n = i + 1;

    if (b.type === "link" || b.type === "button") {
      const hasText = b.text.trim() !== "";
      const hasUrl = b.href.trim() !== "";
      const name = b.type === "button" ? "Button" : "Link";
      if (hasText !== hasUrl) return `Block ${n} (${name}) needs both a label and a URL`;
      if (hasUrl && !URL_OK.test(b.href.trim())) {
        return `Block ${n} (${name}) URL must start with https://, http://, mailto:, / or #`;
      }
    }

    if (b.type === "image" && !b.image) {
      return `Block ${n} (Image) has no image. Upload one or remove the block`;
    }

    if (b.type === "table") {
      const headerFilled = b.headers.filter((h) => h.trim()).length;
      if (headerFilled > 0 && headerFilled < b.headers.length) {
        return `Block ${n} (Comparison Table): every column needs a header`;
      }
    }
  }
  return "";
};

// editor blocks -> { content, imageFiles, imagePositions }
// New images are sent as placeholders { type: "image" } plus the file and its index in `content`.
// Existing images keep their imageurl, otherwise the backend deletes them.
export const buildContent = (blocks) => {
  const content = [];
  const imageFiles = [];
  const imagePositions = [];

  for (const b of blocks) {
    const text = b.text.trim();

    switch (b.type) {
      case "heading":
        if (text) content.push({ type: "heading", level: b.level, text });
        break;
      case "text":
      case "quote":
      case "proTip":
        if (text) content.push({ type: b.type, text });
        break;
      case "code":
        if (text) content.push({ type: "code", text: b.text });
        break;
      case "list": {
        const items = lines(b.itemsText);
        if (items.length) content.push({ type: "list", style: b.style, items });
        break;
      }
      case "link":
        if (text && b.href.trim()) content.push({ type: "link", text, href: b.href.trim() });
        break;
      case "button":
        if (text && b.href.trim()) {
          content.push({ type: "button", text, href: b.href.trim(), buttonTarget: b.buttonTarget });
        }
        break;
      case "table": {
        const headers = b.headers.map((h) => h.trim());
        const rows = b.rows
          .map((r) => headers.map((_, i) => (r[i] || "").trim()))
          .filter((r) => r.some(Boolean));
        if (headers.some(Boolean) || rows.length) {
          content.push({
            type: "table",
            tableCaption: b.caption.trim(),
            tableHeaders: headers,
            tableRows: rows,
          });
        }
        break;
      }
      case "image":
        if (b.image?.file) {
          imagePositions.push(content.length);
          imageFiles.push(b.image.file);
          content.push({ type: "image" });
        } else if (b.image?.url) {
          content.push({ type: "image", imageurl: { url: b.image.url, publicId: b.image.publicId } });
        }
        break;
      default:
        break;
    }
  }

  return { content, imageFiles, imagePositions };
};