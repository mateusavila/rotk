import { pages, meta_pages } from "../../../schemas"
import { eq } from 'drizzle-orm'
import { jwtVerify } from 'jose'

export default defineEventHandler(async (event) => {
  const client = useTurso()
  const id = getRouterParam(event, 'id')
  if (!id) {
    return {
      status: false,
      message: 'No page has been found'
    }
  }
  const token = getHeader(event, 'Authorization')?.split('Bearer ')[1] ?? ''

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
    await client.delete(meta_pages).where(eq(meta_pages.pages_id, id))
    await client.delete(pages).where(eq(pages.id, id))
    return {
      status: true,
      message: 'Success! Page has been fully deleted!'
    }
  } catch (error) {
    return {
      status: false,
      message: `There's an error at the route: ${error}`
    }
  }


})
