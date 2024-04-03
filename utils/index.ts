import { z } from "zod";

export interface PageResponse {
  data: PagesInterface[];
  total: number;
}

export interface PageResponseItem {
  data: {
    id: PagesInterface["id"];
    title: PagesInterface["title"];
    slug: PagesInterface["slug"];
    content: PagesInterface["content"];
    author_id: PagesInterface["author_id"];
    date: PagesInterface["date"];
    meta_pages: CustomFields[];
  };
}
export interface PageSlugResponseItem {
  id: PagesInterface["id"];
  title: PagesInterface["title"];
  slug: PagesInterface["slug"];
  content: PagesInterface["content"];
  author_id: PagesInterface["author_id"];
  date: PagesInterface["date"];
  meta_pages: CustomFields[];
}

export const pageSchema = z.object({
  title: z.string().min(1, "Title is necessary"),
  content: z.string().min(1, "Content is necessary"),
  meta_pages: z
    .array(
      z.object({
        key: z.string().min(1, "Key is necessary"),
        value: z.any(),
        type: z.string().min(1, "Type is necessary"),
      }),
    )
    .superRefine((val, ctx) => {
      const seen = new Set();
      for (const [i, item] of val.entries()) {
        if (seen.has(item.key)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Key must be unique`,
            path: [i, "key"],
          });
        } else {
          seen.add(item.key);
        }
      }
    }),
});

export type PageSchema = z.output<typeof pageSchema>;

export interface PagesInterface {
  id: string;
  title: string;
  slug: string;
  content: string;
  date: string | Date;
  author_id: number;
}

export const generalInfoSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    skills: z.array(z.string()),
    bio: z.string().optional(),
    birth: z.coerce.number().optional(),
    luck: z.coerce.number(),
    health: z.coerce.number().min(1).max(100),
    soldiers: z.coerce.number().min(100).max(100000),
    loyalty: z.coerce.number().min(1).max(100),
    navigation: z.boolean(),
    is_ruler: z.boolean(),
    navy_command: z.coerce.number().min(1).max(100),
    army_command: z.coerce.number().min(1).max(100),
    stats: z.object({
      rotk1: z.boolean().or(
        z.object({
          active: z.boolean(),
          intelligence: z.union([
            z.coerce.number().min(1).max(100),
            z.literal(null),
          ]),
          power: z.union([z.coerce.number().min(1).max(100), z.literal(null)]),
          charisma: z.union([
            z.coerce.number().min(1).max(100),
            z.literal(null),
          ]),
        }),
      ),
      rotk2: z.boolean().or(
        z.object({
          active: z.boolean(),
          intelligence: z.union([
            z.coerce.number().min(1).max(100),
            z.literal(null),
          ]),
          power: z.union([z.coerce.number().min(1).max(100), z.literal(null)]),
          charisma: z.union([
            z.coerce.number().min(1).max(100),
            z.literal(null),
          ]),
        }),
      ),
      rotk3: z.boolean().or(
        z.object({
          active: z.boolean(),
          intelligence: z.union([
            z.coerce.number().min(1).max(100),
            z.literal(null),
          ]),
          power: z.union([z.coerce.number().min(1).max(100), z.literal(null)]),
          charisma: z.union([
            z.coerce.number().min(1).max(100),
            z.literal(null),
          ]),
          politics: z.union([
            z.coerce.number().min(1).max(100),
            z.literal(null),
          ]),
        }),
      ),
      rotk4: z.boolean().or(
        z.object({
          active: z.boolean(),
          lead: z.union([z.coerce.number().min(1).max(100), z.literal(null)]),
          intelligence: z.union([
            z.coerce.number().min(1).max(100),
            z.literal(null),
          ]),
          power: z.union([z.coerce.number().min(1).max(100), z.literal(null)]),
          charisma: z.union([
            z.coerce.number().min(1).max(100),
            z.literal(null),
          ]),
          politics: z.union([
            z.coerce.number().min(1).max(100),
            z.literal(null),
          ]),
        }),
      ),
      rotk7: z.boolean().or(
        z.object({
          active: z.boolean(),
          intelligence: z.union([
            z.coerce.number().min(1).max(100),
            z.literal(null),
          ]),
          power: z.union([z.coerce.number().min(1).max(100), z.literal(null)]),
          charisma: z.union([
            z.coerce.number().min(1).max(100),
            z.literal(null),
          ]),
          politics: z.union([
            z.coerce.number().min(1).max(100),
            z.literal(null),
          ]),
        }),
      ),
      rotk8: z.boolean().or(
        z.object({
          active: z.boolean(),
          intelligence: z.union([
            z.coerce.number().min(1).max(100),
            z.literal(null),
          ]),
          power: z.union([z.coerce.number().min(1).max(100), z.literal(null)]),
          charisma: z.union([
            z.coerce.number().min(1).max(100),
            z.literal(null),
          ]),
          politics: z.union([
            z.coerce.number().min(1).max(100),
            z.literal(null),
          ]),
        }),
      ),
      rotk9: z.boolean().or(
        z.object({
          active: z.boolean(),
          intelligence: z.union([
            z.coerce.number().min(1).max(100),
            z.literal(null),
          ]),
          power: z.union([z.coerce.number().min(1).max(100), z.literal(null)]),
          lead: z.union([z.coerce.number().min(1).max(100), z.literal(null)]),
          politics: z.union([
            z.coerce.number().min(1).max(100),
            z.literal(null),
          ]),
        }),
      ),
      rotk10: z.boolean().or(
        z.object({
          active: z.boolean(),
          lead: z.union([z.coerce.number().min(1).max(100), z.literal(null)]),
          intelligence: z.union([
            z.coerce.number().min(1).max(100),
            z.literal(null),
          ]),
          power: z.union([z.coerce.number().min(1).max(100), z.literal(null)]),
          charisma: z.union([
            z.coerce.number().min(1).max(100),
            z.literal(null),
          ]),
          politics: z.union([
            z.coerce.number().min(1).max(100),
            z.literal(null),
          ]),
        }),
      ),
      rotk11: z.boolean().or(
        z.object({
          active: z.boolean(),
          lead: z.union([z.coerce.number().min(1).max(100), z.literal(null)]),
          intelligence: z.union([
            z.coerce.number().min(1).max(100),
            z.literal(null),
          ]),
          power: z.union([z.coerce.number().min(1).max(100), z.literal(null)]),
          charisma: z.union([
            z.coerce.number().min(1).max(100),
            z.literal(null),
          ]),
          politics: z.union([
            z.coerce.number().min(1).max(100),
            z.literal(null),
          ]),
        }),
      ),
    }),
  })
  .required();

export type GeneralInfoSchema = z.output<typeof generalInfoSchema>;

export interface LoggedUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
}

export const login = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Must be at least 8 characters"),
  })
  .required();

export type Login = z.output<typeof login>;

export const compareGenerals = z
  .object({
    general1: z.string().min(1, "Pick a general"),
    general2: z.string().min(1, "Pick a general"),
  })
  .required()
  .superRefine((val, { addIssue }) => {
    const { general1, general2 } = val;
    if (general1 === general2) {
      addIssue({
        message: "Please pick another General",
        code: z.ZodIssueCode.custom,
        path: ["general2"],
      });
    }
  });

export type CompareGenerals = z.output<typeof compareGenerals>;

export interface FamousGenerals {
  name: string;
  slug: string;
  image: string;
  width: number;
  height: number;
}

export interface NamesGenerals {
  key: string;
  label: string;
  avatar: string;
}

export interface GeneralData {
  id: string;
  name: string;
  avatar: string;
  slug: string;
  skills: string[];
  bio: string;
  birth: number | string;
  luck: number;
  soldiers: number;
  loyalty: number;
  health: number;
  navigation: boolean;
  is_ruler: boolean;
  navy_command: number;
  army_command: number;
  stats: {
    rotk1: {
      active: boolean;
      intelligence: number | null;
      power: number | null;
      charisma: number | null;
    };
    rotk2: {
      active: boolean;
      intelligence: number | null;
      power: number | null;
      charisma: number | null;
    };
    rotk3: {
      active: boolean;
      intelligence: number | null;
      power: number | null;
      politics: number | null;
      charisma: number | null;
    };
    rotk4: {
      active: boolean;
      lead: number | null;
      intelligence: number | null;
      power: number | null;
      charisma: number | null;
      politics: number | null;
    };
    rotk7: {
      active: boolean;
      intelligence: number | null;
      power: number | null;
      charisma: number | null;
      politics: number | null;
    };
    rotk8: {
      active: boolean;
      intelligence: number | null;
      power: number | null;
      charisma: number | null;
      politics: number | null;
    };
    rotk9: {
      active: boolean;
      intelligence: number | null;
      power: number | null;
      lead: number | null;
      politics: number | null;
    };
    rotk10: {
      active: boolean;
      intelligence: number | null;
      power: number | null;
      charisma: number | null;
      lead: number | null;
      politics: number | null;
    };
    rotk11: {
      active: boolean;
      intelligence: number | null;
      power: number | null;
      charisma: number | null;
      lead: number | null;
      politics: number | null;
    };
  };
  advanced_stats: {
    averages_per_game: {
      rotk1: number | null;
      rotk2: number | null;
      rotk3: number | null;
      rotk4: number | null;
      rotk7: number | null;
      rotk8: number | null;
      rotk9: number | null;
      rotk10: number | null;
      rotk11: number | null;
    };
    totals_per_game: {
      rotk1: number | null;
      rotk2: number | null;
      rotk3: number | null;
      rotk4: number | null;
      rotk7: number | null;
      rotk8: number | null;
      rotk9: number | null;
      rotk10: number | null;
      rotk11: number | null;
    };
    stats_averages: {
      intelligence: number | null;
      power: number | null;
      charisma: number | null;
      politics: number | null;
      lead: number | null;
    };
    stats_max: {
      intelligence: number | null;
      power: number | null;
      charisma: number | null;
      politics: number | null;
      lead: number | null;
    };
    stats_min: {
      intelligence: number | null;
      power: number | null;
      charisma: number | null;
      politics: number | null;
      lead: number | null;
    };
  };
}

export interface CustomFields {
  key: string;
  value: string | any;
  type: string;
}

export interface OptionsSelect {
  label: string;
  value: string | number | any;
}

export interface FilterGenerals {
  intelligence: number | null;
  power: number | null;
  charisma: number | null;
  lead: number | null;
  politics: number | null;
  type_intelligence: number | null;
  type_power: number | null;
  type_charisma: number | null;
  type_lead: number | null;
  type_politics: number | null;
  pick_intelligence: boolean;
  pick_power: boolean;
  pick_charisma: boolean;
  pick_lead: boolean;
  pick_politics: boolean;
}
export const filterSchema = z
  .object({
    intelligence: z.number().min(1).max(100, "").nullable(),
    power: z.number().min(1).max(100, "").nullable(),
    charisma: z.number().min(1).max(100, "").nullable(),
    lead: z.number().min(1).max(100, "").nullable(),
    politics: z.number().min(1).max(100, "").nullable(),
    type_intelligence: z.string().nullable(),
    type_power: z.string().nullable(),
    type_politics: z.string().nullable(),
    type_lead: z.string().nullable(),
    type_charisma: z.string().nullable(),
    pick_intelligence: z.boolean(),
    pick_power: z.boolean(),
    pick_politics: z.boolean(),
    pick_lead: z.boolean(),
    pick_charisma: z.boolean(),
  })
  .superRefine((val, { addIssue }) => {
    const message = "Define a number";
    const message2 = "Define a type";
    const code = z.ZodIssueCode.custom;
    if (val.pick_intelligence && !val.intelligence) {
      addIssue({ code, message, path: ["intelligence"] });
    }
    if (val.pick_power && !val.power) {
      addIssue({ code, message, path: ["power"] });
    }
    if (val.pick_charisma && !val.charisma) {
      addIssue({ code, message, path: ["charisma"] });
    }
    if (val.pick_politics && !val.politics) {
      addIssue({ code, message, path: ["politics"] });
    }
    if (val.pick_lead && !val.lead) {
      addIssue({ code, message, path: ["lead"] });
    }
    if (val.pick_intelligence && !val.type_intelligence) {
      addIssue({ code, message: message2, path: ["type_intelligence"] });
    }
    if (val.pick_power && !val.type_power) {
      addIssue({ code, message: message2, path: ["type_power"] });
    }
    if (val.pick_charisma && !val.type_charisma) {
      addIssue({ code, message: message2, path: ["type_charisma"] });
    }
    if (val.pick_politics && !val.type_politics) {
      addIssue({ code, message: message2, path: ["type_politics"] });
    }
    if (val.pick_lead && !val.type_lead) {
      addIssue({ code, message: message2, path: ["type_lead"] });
    }
  });
