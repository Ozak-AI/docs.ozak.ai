const sidebarData = require("./config/sidebar/index.json");

const getDocId = (doc) => {
  return doc
    .replace(/\.mdx?$/, "")
    .split("/")
    .slice(1)
    .join("/");
};

// depth is tracked so top-level categories can render as section labels rather
// than collapsible groups. Tina's sidebar schema has no `html` item type, so the
// mono section headings in the design are expressed as depth-0 categories with
// link "none" - see the block at the bottom of getItem().
const getItem = (item, depth = 0) => {
  const type = item["_template"];

  let itemProps = {
    type: type,
  };

  if (type === "doc") {
    if (!item.document) {
      return [];
    }

    itemProps.id = getDocId(item.document);

    if (item.label) {
      itemProps.label = item.label;
    }
  }

  if (type === "category") {
    if (item.title) {
      itemProps.label = item.title;
    }

    if (item.link && item.link !== "none") {
      if (item.link === "doc" && item.docLink) {
        itemProps.link = {
          type: "doc",
          id: getDocId(item.docLink),
        };
      } else if (item.link === "generated") {
        itemProps.link = {
          type: "generated-index",
        };
      } else {
        return [];
      }
    }

    itemProps.items = item.items.flatMap((child) => {
      return getItem(child, depth + 1);
    });

    // Section label: a top-level category with no link. Always open, not
    // collapsible, and tagged so custom.css can render it as a mono heading.
    if (depth === 0 && (!item.link || item.link === "none")) {
      itemProps.collapsible = false;
      itemProps.collapsed = false;
      itemProps.className = "oz-navgroup-cat";
    }
  }

  if (type === "link") {
    if (item.href && item.title) {
      itemProps.label = item.title;
      itemProps.href = item.href;
    } else {
      return [];
    }
  }

  return [itemProps];
};

const sidebars = {
  tutorialSidebar: sidebarData.items.flatMap((item) => {
    return getItem(item);
  }),
};

module.exports = sidebars;
