import fs from "node:fs/promises";

const API_URL = `${process.env.VITE_ADMIN_URL}/games`;
const BASE_URL = "https://iheartpizza.com";

const staticPaths = [
    "/",
    "/games",
    "/about",
    "/values",
    "/contact",
];

async function generateSitemap() {
    const response = await fetch(`${API_URL}?offset=0&limit=100`);

    if (!response.ok) {
        throw new Error(`Failed to fetch games: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Recieved ${data.games.length} games`);
    console.log(data.games.map(game=> game.title))

    const gamePaths = data.games.map(
        (game) => `/game/${game.id}`
    );

    const paths = [
        ...staticPaths,
        ...gamePaths,
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
        .map(
            (path) => `    <url>
        <loc>${BASE_URL}${path}</loc>
    </url>`
        )
        .join("\n")}
</urlset>
`;

    await fs.writeFile(
        "public/sitemap.xml",
        sitemap,
        "utf8"
    );

    console.log(`Generated sitemap with ${paths.length} URLs.`);
}

generateSitemap().catch((error) => {
    console.error(error);
    process.exit(1);
});