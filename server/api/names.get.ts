import { generals } from "../schemas"

export default defineCachedEventHandler(async () => {
  const client = useTurso()
  const data = await client.select({
    label: generals.name,
    key: generals.slug,
    avatar: generals.avatar
  }).from(generals).orderBy(generals.name).all()

  return {
    data,
  }
}, { maxAge: 60 * 60 * 24 })
