import { generals } from "../schemas";

export default defineEventHandler(async () => {
  const client = useTurso();
  const data = await client.select().from(generals).all();

  return {
    data,
  };
});
