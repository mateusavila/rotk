import { pages, meta_pages } from "../../../schemas"
import { eq } from 'drizzle-orm'
import { jwtVerify } from 'jose'
import { CustomFields, pageSchema } from "~/utils"
import crypto from "crypto"

export default defineEventHandler(async (event) => {
  const client = useTurso()
  const id = getRouterParam(event, 'id')
  if (!id) {
    return {
      status: false,
      message: 'No general has been found'
    }
  }
  const token = getHeader(event, 'Authorization')?.split('Bearer ')[1] ?? ''

  const body: { pages: any, meta_pages: any } = await readBody(event)

  // validate the field has correct values
  if (!pageSchema.safeParse(body.pages)) {
    return {
      status: false,
      message: `The Page fields aren't adherent to the proposed schema`
    }
  }

  // validate if token is Valid
  const { public: { secretjwt } } = useRuntimeConfig()
  const secretKeyBuffer = new TextEncoder().encode(secretjwt)

  const { payload } = await jwtVerify(`${token}`, secretKeyBuffer, {
    issuer: "Romance of Three Kingdoms Database",
    audience: "romance-of-three-kingdoms",
  })
  if (!payload) {
    return {
      status: false,
      message: 'Token is invalid'
    }
  }
  await useStorage('cache').clear()

  try {

    const endBody = {
      title: body.pages.title,
      slug: body.pages.slug,
      author_id: body.pages.author_id,
      content: body.pages.content
    }
    await client.update(pages).set(endBody).where(eq(pages.id, `${id}`))

    // limpar metas antigos
    await client.delete(meta_pages).where(eq(meta_pages.pages_id, id))
    if (body.meta_pages && body.meta_pages.length) {
      body.meta_pages.map(async (meta: CustomFields) => {
        const newId = crypto.randomUUID()
        const mt = {
          ...meta,
          id: newId,
          pages_id: id
        }
        await client.insert(meta_pages).values(mt)
      })
    }
    return {
      status: true,
      message: 'Success! Page has been updated!'
    }
  } catch (error) {
    return {
      status: false,
      message: `There's an error at the route: ${error}`
    }
  }

})
