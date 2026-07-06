import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const publicIcons = path.join(process.cwd(), 'public', 'icons')
const inputFile = path.join(publicIcons, 'uploaded-favicon.png')

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

async function generate() {
  await ensureDir(publicIcons)

  if (!fs.existsSync(inputFile)) {
    console.error('Source image not found:', inputFile)
    process.exit(1)
  }

  const sizes = [16, 32, 180, 192, 512]

  console.log('Generating PNG favicons from', inputFile)
  for (const s of sizes) {
    const out = path.join(publicIcons, `favicon-${s}.png`)
    await sharp(inputFile).resize(s, s, { fit: 'cover' }).png().toFile(out)
    console.log('Written', out)
  }

  // create favicon.ico from 16 and 32 (and 48) sizes
  const icoSizes = [16, 32, 48]
  const buffers = []
  for (const s of icoSizes) {
    const buf = await sharp(inputFile).resize(s, s, { fit: 'cover' }).png().toBuffer()
    buffers.push(buf)
  }

  const icoBuf = await pngToIco(buffers)
  const icoOut = path.join(publicIcons, 'favicon.ico')
  fs.writeFileSync(icoOut, icoBuf)
  console.log('Written', icoOut)

  // copy 512 to uploaded-favicon-512.png for manifest clarity
  const bigOut = path.join(publicIcons, 'uploaded-favicon-512.png')
  await sharp(inputFile).resize(512, 512, { fit: 'cover' }).png().toFile(bigOut)
  console.log('Written', bigOut)

  console.log('Favicon generation complete.')
}

generate().catch(err => {
  console.error(err)
  process.exit(1)
})
