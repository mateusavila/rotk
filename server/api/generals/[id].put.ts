import { generals, hiperlinks } from "../../schemas"
import { eq } from 'drizzle-orm'
import { jwtVerify } from 'jose'
import { AddLinks, generalInfoSchema } from "~/utils"
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

  const body = await readBody(event)

  // validate the field has correct values
  if (!generalInfoSchema.safeParse(body)) {
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

  // limpa todo o cache para poder atualizar os dados
  await useStorage('cache').clear()


  try {

    const hiperlinksArr = body.hiperlinks.map(({ url, label }: AddLinks) => {
      return {
        id: crypto.randomUUID(),
        slug: body.slug,
        url,
        label
      }
    })
    await client.update(generals).set(body).where(eq(generals.id, id))
    await client.delete(hiperlinks).where(eq(hiperlinks.slug, body.slug))
    await client.insert(hiperlinks).values(hiperlinksArr)
    return {
      status: true,
      message: 'Success! General has been updated!'
    }
  } catch (error) {
    return {
      status: false,
      message: `There's an error at the route: ${error}`
    }
  }


})
