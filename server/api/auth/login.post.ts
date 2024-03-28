import { user } from "../../schemas"
import { login } from '../../../utils/index'
import { eq } from 'drizzle-orm'
import * as argon2 from 'argon2'
import { SignJWT } from 'jose'


export default eventHandler(async (event) => {
  const client = useTurso()
  const { secretjwt } = useRuntimeConfig()
  const body = await readBody(event)

  if (!login.safeParse(body).success) {
    throw createError({
      status: 422,
      statusMessage: "The data is not correct",
    })
  }

  const data = await client.select().from(user)
    .where(eq(user.email, body.email))

  if (!data.length) {
    throw createError({
      status: 422,
      statusMessage: "The data is not correct",
    })
  }

  const isPasswordMatch = await argon2.verify(data[0].password as string, body.password as string)
  if (!isPasswordMatch) {
    throw createError({
      status: 422,
      statusMessage: "The data is not correct",
    })
  }

  // assinar JWT
  const secretKeyBuffer = new TextEncoder().encode(secretjwt)
  const userLogged = data[0]
  const token = await new SignJWT({
    user: {
      name: userLogged.name,
      level: userLogged.level,
      email: userLogged.email,
      id: userLogged.id,
      avatar: userLogged.avatar,
    },
  })
    .setIssuer("Romance of Three Kingdoms Database")
    .setSubject('mavisidoro@gmail.com')
    .setAudience('romance-of-three-kingdoms')
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(secretKeyBuffer)
  return {
    token
  }

})
