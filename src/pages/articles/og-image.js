const puppeteer = require('puppeteer'); // Import puppeteer
const path = require('path');
const fs = require('fs');
const { createHash } = require('crypto');

export async function generateOgImage(props) {
  const params = new URLSearchParams(props);
  const url = `file:${path.join(
    process.cwd(),
    `src/pages/articles/og-image.html?${params}`
  )}`;

  const hash = createHash('md5').update(url).digest('hex');
  const ogImageDir = path.join(process.cwd(), `public/og`);
  const imageName = `${hash}.png`;
  const imagePath = `${ogImageDir}/${imageName}`;
  const publicPath = `https://azizii.my.id/${imageName}`;

  try {
    fs.statSync(imagePath);
    return publicPath;
  } catch (error) {
    // file does not exist, so we create it
  }

  let browser = null;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });
    await page.goto(url, { waitUntil: 'networkidle0' });
    const buffer = await page.screenshot();
    fs.mkdirSync(ogImageDir, { recursive: true });
    fs.writeFileSync(imagePath, buffer);
  } catch (error) {
    console.error('Error generating OG image:', error);
    throw error;
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  return publicPath;
}
