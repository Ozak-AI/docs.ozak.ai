const docusaurusData = require("./config/docusaurus/index.json");

const lightCodeTheme = require("prism-react-renderer").themes.github;
const darkCodeTheme = require("prism-react-renderer").themes.dracula;

const getDocId = (doc) => {
  return doc
    .replace(/\.mdx?$/, "")
    .split("/")
    .slice(1)
    .join("/");
};

const getPageRoute = (page) => {
  return page
    .replace(/\.mdx?$/, "")
    .split("/")
    .slice(2)
    .join("/");
};

const getPath = (page) => {
  return page.replace(/\.mdx?$/, "");
};

// Tina stores an internal footer link as a document path ("docs/eon/index.mdx").
// Docs are served at the site root here (routeBasePath: "/"), so the stored path
// has to be converted to a route: drop the leading "docs" segment and any
// trailing "index".
//   docs/index.mdx           -> /
//   docs/eon/index.mdx       -> /eon
//   docs/guides/buy-oz.mdx   -> /guides/buy-oz
const getDocRoute = (doc) => {
  const parts = doc.replace(/\.mdx?$/, "").split("/");
  if (parts[0] === "docs") parts.shift();
  if (parts[parts.length - 1] === "index") parts.pop();
  return "/" + parts.join("/");
};

const formatFooterItem = (item) => {
  if (item.title) {
    return {
      title: item.title,
      items: item.items.map((subItem) => {
        return formatFooterItem(subItem);
      }),
    };
  } else {
    let linkObject = {
      label: item.label,
    };

    if (item.to) {
      linkObject.to = getDocRoute(item.to);
    } else if (item.href) {
      linkObject.href = item.href;
    } else {
      linkObject.to = "/blog";
    }

    return linkObject;
  }
};

const formatNavbarItem = (item, subnav = false) => {
  let navItem = {
    label: item.label,
  };

  if (!subnav) {
    navItem.position = item.position;
  }

  if (item.link === "external" && item.externalLink) {
    navItem.href = item.externalLink;
  }

  if (item.link === "blog") {
    navItem.to = "/blog";
  }

  if (item.link === "page" && item.pageLink) {
    navItem.to = getPageRoute(item.pageLink);
  }

  if (item.link === "doc" && item.docLink) {
    navItem.type = "doc";
    navItem.docId = getDocId(item.docLink);
  }

  if (item.items) {
    navItem.type = "dropdown";
    navItem.items = item.items.map((subItem) => {
      return formatNavbarItem(subItem, true);
    });
  }

  return navItem;
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: docusaurusData.title || "My Site",
  tagline: docusaurusData.tagline || "Dinosaurs are cool",
  url: docusaurusData.url || "https://tinasaurus.vercel.app/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  favicon: "/img/favicon-dark.svg",
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          showLastUpdateTime: true,  
          routeBasePath: "/",   
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // colorMode: {
      //   defaultMode: 'dark',
      //   disableSwitch: true,
      //   respectPrefersColorScheme: false,
      // },
      navbar: {
        title: docusaurusData.title || "",
        logo: {
          alt: docusaurusData?.logo?.alt
            ? docusaurusData?.logo?.alt
            : "My Logo",
          src: docusaurusData?.logo?.src
            ? docusaurusData?.logo?.src
            : "img/logo.svg",
        },
        items: [
          // Section tabs. Defined here rather than in the Tina config because
          // each one needs an activeBaseRegex so that exactly one tab is
          // highlighted per page.
          //
          // A Tina `doc` item compiles to { type: 'doc', docId }, which
          // Docusaurus highlights based on sidebar membership rather than the
          // current path. Every page belongs to `tutorialSidebar`, so that form
          // would mark all three as active everywhere.
          //
          // activeBaseRegex has no equivalent field in formatNavbarItem or in
          // Tina's NavbarItemFields schema, and unknown fields are not preserved
          // when the navbar is saved through the CMS. Keeping these three here
          // means their labels and order are not CMS-editable, which suits
          // structural navigation.
          {
            to: "/",
            label: "Docs",
            position: "left",
            // Everything that is not an Eon or $OZ page, including the root.
            activeBaseRegex: "^/(?!eon\\b|token\\b|guides\\b)",
          },
          {
            to: "/eon/",
            label: "Eon",
            position: "left",
            activeBaseRegex: "^/eon\\b",
          },
          {
            to: "/token",
            label: "$OZ",
            position: "left",
            // /token plus the presale guides, which sit in the same section.
            activeBaseRegex: "^/(token|guides)\\b",
          },
          ...(docusaurusData.navbar || []).map((item) => {
            return formatNavbarItem(item);
          }),
        ],
      },
      footer: {
        style: docusaurusData.footer?.style || "dark",
        links: (docusaurusData.footer?.links || []).map((item) => {
          return formatFooterItem(item);
        }),
        copyright:
          `Copyright © ${new Date().getFullYear()} ` +
          (docusaurusData.footer?.copyright || docusaurusData.title),
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
