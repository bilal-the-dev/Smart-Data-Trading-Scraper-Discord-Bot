import sanitizeHtml from "sanitize-html";

const text = `console.log('hello world')`;

const sanitized = sanitizeHtml(text, { allowedTags: ["img"] });

console.log(sanitized);
