<script lang="ts" setup>
import type { FormSubmitEvent } from "#ui/types";
import type { filterSchema, FilterGenerals } from "~/utils";

const state = reactive<FilterGenerals>({
  intelligence: null,
  power: null,
  charisma: null,
  lead: null,
  politics: null,
  type_intelligence: null,
  type_power: null,
  type_politics: null,
  type_lead: null,
  type_charisma: null,
  pick_intelligence: false,
  pick_power: false,
  pick_politics: false,
  pick_lead: false,
  pick_charisma: false,
});

const emit = defineEmits<{
  close: [queryString: string]
}>()

const onSubmit = async (event: FormSubmitEvent<FilterGenerals>) => {
  const {
    intelligence,
    power,
    charisma,
    lead,
    politics,
    type_intelligence,
    type_power,
    type_charisma,
    type_lead,
    type_politics,
  } = event.data;

  let intUrl = "";
  let powUrl = "";
  let chaUrl = "";
  let polUrl = "";
  let leaUrl = "";
  
  if (intelligence) {
    intUrl = `intelligence=${intelligence}&type_intelligence=${type_intelligence}`;
  }
  if (power) {
    powUrl = `power=${power}&type_power=${type_power}`;
  }
  if (charisma) {
    chaUrl = `charisma=${charisma}&type_charisma=${type_charisma}`;
  }
  if (politics) {
    polUrl = `politics=${politics}&type_politics=${type_politics}`;
  }
  if (lead) {
    leaUrl = `lead=${lead}&type_lead=${type_lead}`;
  }

  const queryString = Array.from(
    new Set([intUrl, powUrl, polUrl, leaUrl, chaUrl]),
  ).join("&");
  emit('close', queryString)
};

const options = ref([
  {
    label: "Equal",
    value: "eq",
  },
  {
    label: "Greater than",
    value: "gt",
  },
  {
    label: "Less than",
    value: "lt",
  },
]);

const picks = ref([
  {
    key: "pick_intelligence",
    icon: "i-game-icons-brain",
    label: `Intelligence`,
  },
  {
    key: "pick_power",
    icon: "i-game-icons-swordman",
    label: `Power`,
  },
  {
    key: "pick_charisma",
    icon: "i-game-icons-shaking-hands",
    label: `Charisma`,
  },
  {
    key: "pick_lead",
    icon: "i-game-icons-minions",
    label: `Lead`,
  },
  {
    key: "pick_politics",
    icon: "i-game-icons-vote",
    label: `Politics`,
  },
]);
</script>

<template>
  <UForm
    :schema="filterSchema"
    :state="state"
    :validate-on="['submit']"
    class="flex items-center gap-[10px] w-full xsm:justify-between justify-center flex-wrap"
    @submit="onSubmit"
  >
    <div class="w-full p-[20px] rounded-[6px] bg-slate-700 text-white">
      <h2
        class="text-[18px] text-white flex items-center gap-[10px] font-['Aleo'] font-bold mb-[20px]"
      >
        Advanced Filter
      </h2>
      <div class="w-full flex gap-[10px] justify-center mb-[20px]">
        <label
          class="w-full p-[10px] text-[32px] text-center rounded-[10px] cursor-pointer"
          v-for="(i, index) in picks"
          :key="index"
          :class="{
            'bg-slate-800': (state as any)[i.key],
          }"
        >
          <UCheckbox
            v-model="(state as any)[i.key]"
            :ui="{ wrapper: 'hidden' }"
          />
          <UTooltip :text="i.label">
            <UIcon :name="i.icon"></UIcon>
          </UTooltip>
        </label>
      </div>
      <template v-if="state.pick_intelligence">
        <div class="w-full flex justify-between gap-[20px] my-[5px]">
          <UFormGroup :ui="{ wrapper: 'w-full' }" name="type_intelligence">
            <USelectMenu
              :options="options"
              class="w-full"
              v-model="state.type_intelligence"
              placeholder="Comparison type"
              key-attribute="key"
              value-attribute="value"
              icon="i-heroicons-code-bracket-square-20-solid"
            />
          </UFormGroup>
          <UFormGroup :ui="{ wrapper: 'w-full' }" name="intelligence">
            <UInput
              type="number"
              :step="1"
              :min="1"
              :max="100"
              class="w-full"
              v-model="state.intelligence"
              placeholder="Intelligence"
              value-attribute="key"
              icon="i-game-icons-brain"
            />
          </UFormGroup>
        </div>
      </template>
      <template v-if="state.pick_power">
        <div class="w-full flex justify-between gap-[20px] my-[5px]">
          <UFormGroup :ui="{ wrapper: 'w-full' }" name="type_power">
            <USelectMenu
              :options="options"
              class="w-full"
              v-model="state.type_power"
              placeholder="Comparison type"
              key-attribute="key"
              value-attribute="value"
              icon="i-heroicons-code-bracket-square-20-solid"
            />
          </UFormGroup>
          <UFormGroup :ui="{ wrapper: 'w-full' }" name="power">
            <UInput
              type="number"
              :step="1"
              :min="1"
              :max="100"
              class="w-full"
              v-model="state.power"
              placeholder="Power"
              value-attribute="key"
              icon="i-game-icons-swordman"
            />
          </UFormGroup>
        </div>
      </template>
      <template v-if="state.pick_charisma">
        <div class="w-full flex justify-between gap-[20px] my-[5px]">
          <UFormGroup :ui="{ wrapper: 'w-full' }" name="type_charisma">
            <USelectMenu
              :options="options"
              class="w-full"
              v-model="state.type_charisma"
              placeholder="Comparison type"
              key-attribute="key"
              value-attribute="value"
              icon="i-heroicons-code-bracket-square-20-solid"
            />
          </UFormGroup>
          <UFormGroup :ui="{ wrapper: 'w-full' }" name="charisma">
            <UInput
              type="number"
              :step="1"
              :min="1"
              :max="100"
              class="w-full"
              v-model="state.charisma"
              placeholder="Charisma"
              value-attribute="key"
              icon="i-game-icons-shaking-hands"
            />
          </UFormGroup>
        </div>
      </template>
      <template v-if="state.pick_lead">
        <div class="w-full flex justify-between gap-[20px] my-[5px]">
          <UFormGroup :ui="{ wrapper: 'w-full' }" name="type_lead">
            <USelectMenu
              :options="options"
              class="w-full"
              v-model="state.type_lead"
              placeholder="Comparison type"
              key-attribute="key"
              value-attribute="value"
              icon="i-heroicons-code-bracket-square-20-solid"
            />
          </UFormGroup>
          <UFormGroup :ui="{ wrapper: 'w-full' }" name="lead">
            <UInput
              type="number"
              :step="1"
              :min="1"
              :max="100"
              class="w-full"
              v-model="state.lead"
              placeholder="Lead"
              value-attribute="key"
              icon="i-game-icons-minions"
            />
          </UFormGroup>
        </div>
      </template>
      <template v-if="state.pick_politics">
        <div class="w-full flex justify-between gap-[20px] my-[5px]">
          <UFormGroup :ui="{ wrapper: 'w-full' }" name="type_politics">
            <USelectMenu
              :options="options"
              class="w-full"
              v-model="state.type_politics"
              placeholder="Comparison type"
              key-attribute="key"
              value-attribute="value"
              icon="i-heroicons-code-bracket-square-20-solid"
            />
          </UFormGroup>
          <UFormGroup :ui="{ wrapper: 'w-full' }" name="politics">
            <UInput
              type="number"
              :step="1"
              :min="1"
              :max="100"
              class="w-full"
              v-model="state.politics"
              placeholder="Politics"
              value-attribute="key"
              icon="i-game-icons-vote"
            />
          </UFormGroup>
        </div>
      </template>

      <template
        v-if="
          state.pick_intelligence ||
          state.pick_power ||
          state.pick_politics ||
          state.pick_charisma ||
          state.pick_lead
        "
      >
        <div class="w-full flex justify-end mt-[20px]">
          <UButton
            icon="i-game-icons-magnifying-glass"
            type="submit"
            color="red"
            >Filter now!</UButton
          >
        </div>
      </template>
    </div>
  </UForm>
</template>
