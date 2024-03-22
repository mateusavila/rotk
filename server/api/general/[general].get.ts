import { generals } from "../../schemas";
import { eq, lt, gte, ne } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const client = useTurso();
  const slug = getRouterParam(event, 'general')
  if(!slug) {
    return {
      message: 'No general has been found'
    }
  }
  const data = await client.select().from(generals).where(eq(generals.slug, slug));
  
  if(!data.length) {
    return {
      message: 'No general has been found'
    }
  }

  return { ...data[0] };
});
