import { generals, generalStats } from "../../schemas"
import { eq, and, gt, lt, or, sql, asc } from "drizzle-orm"

export default defineEventHandler(async (event) => {
  const client = useTurso()

  const query = getQuery(event)

  // build query
  const whereArr = []


  const {
    intelligence,
    type_intelligence,
    charisma,
    type_charisma,
    power,
    type_power,
    lead,
    type_lead,
    politics,
    type_politics,
    page,
    limit,
  } = query

  const pageSize = limit ? +limit : 10
  const paged = page ? +page : 1

  if (intelligence && type_intelligence === "eq") {
    whereArr.push(
      and(
        eq(generalStats.value, +intelligence),
        eq(generalStats.stat, "intelligence"),
      ),
    )
  }
  if (intelligence && type_intelligence === "gt") {
    whereArr.push(
      and(
        gt(generalStats.value, +intelligence),
        eq(generalStats.stat, "intelligence"),
      ),
    )
  }
  if (intelligence && type_intelligence === "lt") {
    whereArr.push(
      and(
        lt(generalStats.value, +intelligence),
        eq(generalStats.stat, "intelligence"),
      ),
    )
  }

  if (power && type_power === "eq") {
    whereArr.push(
      and(eq(generalStats.value, +power), eq(generalStats.stat, "power")),
    )
  }
  if (power && type_power === "gt") {
    whereArr.push(
      and(gt(generalStats.value, +power), eq(generalStats.stat, "power")),
    )
  }
  if (power && type_power === "lt") {
    whereArr.push(
      and(lt(generalStats.value, +power), eq(generalStats.stat, "power")),
    )
  }

  if (charisma && type_charisma === "eq") {
    whereArr.push(
      and(eq(generalStats.value, +charisma), eq(generalStats.stat, "charisma")),
    )
  }
  if (charisma && type_charisma === "gt") {
    whereArr.push(
      and(gt(generalStats.value, +charisma), eq(generalStats.stat, "charisma")),
    )
  }
  if (charisma && type_charisma === "lt") {
    whereArr.push(
      and(lt(generalStats.value, +charisma), eq(generalStats.stat, "charisma")),
    )
  }

  if (politics && type_politics === "eq") {
    whereArr.push(
      and(eq(generalStats.value, +politics), eq(generalStats.stat, "politics")),
    )
  }
  if (politics && type_politics === "gt") {
    whereArr.push(
      and(gt(generalStats.value, +politics), eq(generalStats.stat, "politics")),
    )
  }
  if (politics && type_politics === "lt") {
    whereArr.push(
      and(lt(generalStats.value, +politics), eq(generalStats.stat, "politics")),
    )
  }

  if (lead && type_lead === "eq") {
    whereArr.push(
      and(eq(generalStats.value, +lead), eq(generalStats.stat, "lead")),
    )
  }
  if (lead && type_lead === "gt") {
    whereArr.push(
      and(gt(generalStats.value, +lead), eq(generalStats.stat, "lead")),
    )
  }
  if (lead && type_lead === "lt") {
    whereArr.push(
      and(lt(generalStats.value, +lead), eq(generalStats.stat, "lead")),
    )
  }

  const data = await client
    .select({
      name: generals.name,
      slug: generals.slug,
      avatar: generals.avatar,
      birth: generals.birth,
      advanced_stats: generals.advanced_stats,
      value: generalStats.value,
      stat: generalStats.stat,
      game: generalStats.game,
    })
    .from(generalStats)
    .leftJoin(generals, eq(generals.slug, generalStats.slug))
    .where(or(...whereArr))
    .orderBy(asc(generals.name), asc(generalStats.game))
    .limit(pageSize)
    .offset((paged - 1) * pageSize)

  const total = await client
    .select({
      count: sql<number>`cast(count(${generalStats.id}) as int)`,
    })
    .from(generalStats)
    .leftJoin(generals, eq(generals.slug, generalStats.slug))
    .where(or(...whereArr))

  if (!data.length) {
    return {
      message: "No data has been found",
    }
  }

  return { data, total: total[0].count }
  // },
  // {
  //   maxAge: 60 * 60 * 60 * 20,
  //   getKey: (event) => {
  //     const slug = getRouterParam(event, 'general') || 'default-slug'
  //     return slug
  //   },
})
