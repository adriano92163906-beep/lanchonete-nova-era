const https = require("https");
const fs = require("fs");
const path = require("path");

const images = {
  "burguer.jpg": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80&auto=format&fit=crop",
  "cachorro-quente.jpg": "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=500&q=80&auto=format&fit=crop",
  "tapioca.jpg": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&q=80&auto=format&fit=crop",
  "acai.jpg": "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500&q=80&auto=format&fit=crop",
  "batata-frita.jpg": "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=500&q=80&auto=format&fit=crop",
  "nuggets.jpg": "https://images.unsplash.com/photo-1562967914-608f82629710?w=500&q=80&auto=format&fit=crop",
  "coca-cola.jpg": "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&q=80&auto=format&fit=crop",
  "drink-cup.jpg": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&q=80&auto=format&fit=crop",
  "suco-natural.jpg": "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&q=80&auto=format&fit=crop",
};

const outDir = path.join(__dirname, "images");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

function download(filename, url) {
  return new Promise((resolve, reject) => {
    const dest = path.join(outDir, filename);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(filename, res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`${filename}: status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on("finish", () => file.close(() => resolve(filename)));
    }).on("error", reject);
  });
}

(async () => {
  for (const [filename, url] of Object.entries(images)) {
    try {
      await download(filename, url);
      console.log("OK:", filename);
    } catch (err) {
      console.error("FAIL:", filename, err.message);
    }
  }
})();
