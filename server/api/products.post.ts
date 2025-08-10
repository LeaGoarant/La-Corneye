import { promises as fs } from 'fs'
import path from 'path'

const formatTileImg = (productTitle: string) => productTitle.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const productDataPath = path.resolve('./data/products.json')
    const imagesDir = path.resolve('./public/images')

    let products = []
    try {
        const content = await fs.readFile(productDataPath, 'utf-8')
        products = JSON.parse(content)
        if (!Array.isArray(products)) {
            console.warn('products.json does not contain an array, resetting to []')
            products = []
        }
    } catch (e) {
        console.error("Error reading/parsing products.json:", e)
        products = []
    }

    const id = products.length + 1
    const newImgName = formatTileImg(body.title)

    const savedImages = []
    await fs.mkdir(imagesDir, { recursive: true })

    for (let i = 0; i < body.images.length; i++) {
        const img = body.images[i]
        const ext = path.extname(img.filename) || '.jpg'
        const fileName = `${newImgName}-${i + 1}${ext}`
        const filePath = path.join(imagesDir, fileName)

        const base64Data = img.base64.replace(/^data:image\/\w+;base64,/, '')
        const buffer = Buffer.from(base64Data, 'base64')
        await fs.writeFile(filePath, buffer)

        savedImages.push({
            path: `/images/${fileName}`,
            isDefault: i === 0
        })
    }

    const product = {
        id: id,
        title: body.title,
        price: body.price,
        description: body.description,
        longDescription: body.longDescription,
        images: savedImages
    }

    products.push(product)
    await fs.writeFile(productDataPath, JSON.stringify(products, null, 2), 'utf-8')

    return { status: 'ok', product }
})
