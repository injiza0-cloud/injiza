const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const pngToIcoPkg = require('png-to-ico')
const pngToIco = typeof pngToIcoPkg === 'function' ? pngToIcoPkg : (pngToIcoPkg.default || pngToIcoPkg.pngToIco || pngToIcoPkg.create || null)

const outDir = path.join(__dirname, '..', 'public', 'icons')
fs.mkdirSync(outDir, { recursive: true })

const inputSvg = path.join(__dirname, '..', 'public', 'favicon.svg')
const logoSvg = path.join(__dirname, '..', 'public', 'logo-horizontal.svg')

async function generate() {
  try {
    const sizes = [16, 32, 48, 180]
    const pngPaths = []
    for (const s of sizes) {
      const out = path.join(outDir, `favicon-${s}.png`)
      await sharp(inputSvg)
        .resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ quality: 100 })
        .toFile(out)
      pngPaths.push(out)
      console.log('Wrote', out)
    }

    // Create ICO from 16/32/48
    if (!pngToIco) throw new Error('png-to-ico library not available')
    const icoBuf = await pngToIco([pngPaths[0], pngPaths[1], pngPaths[2]])
    fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon.ico'), icoBuf)
    console.log('Wrote favicon.ico')

    // Export a large PNG of the horizontal logo
    const logoOut = path.join(outDir, `logo-360x72.png`)
    await sharp(logoSvg)
      .resize(360, 72, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 100 })
      .toFile(logoOut)
    console.log('Wrote', logoOut)

    console.log('All assets generated in public/icons')
  } catch (err) {
    console.error('Error generating icons:', err)
    process.exit(1)
  }
}

generate()
