import { generals } from "../../schemas"
import { eq } from 'drizzle-orm'
import { jwtVerify } from 'jose'

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
    await client.update(generals).set(body).where(eq(generals.id, id))
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
