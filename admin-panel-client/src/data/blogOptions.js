// Category is free text in the backend. These are only suggestions.
export const BLOG_CATEGORIES = ["Architecture & Design", "Real Estate", "Smart Living", "Construction & Dev"];

export const BLOCK_TYPES = [
  { value: "heading", label: "Heading" },
  { value: "text", label: "Paragraph" },
  { value: "list", label: "List" },
  { value: "image", label: "Image" },
  { value: "quote", label: "Quote" },
  { value: "code", label: "Code" },
  { value: "link", label: "Link" },
  { value: "proTip", label: "Pro Tip" },
  { value: "button", label: "Button" },
  { value: "table", label: "Comparison Table" },
];

export const HEADING_LEVELS = ["h1", "h2", "h3", "h4"];

// Must match the backend model (maxlength) and multer limits
export const LIMITS = {
  excerpt: 200,
  seoTitle: 60,
  seoDescription: 160,
  tableCols: 8,
  tableRows: 30,
  contentImages: 20,
  imageMB: 5,
};