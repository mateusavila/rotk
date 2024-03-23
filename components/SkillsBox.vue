<script lang="ts" setup>
const {} = defineProps<{
  skills: string[]
}>()
</script>

<template>
  <div class="w-full flex gap-[5px] items-center mt-[10px] flex-wrap">
    <p class="text-[12px] font-['Aleo']">Skills</p>
    <div v-for="item in skills" :key="item">
      <template v-if="item.toLowerCase() === 'foreign'">
        <UTooltip text="Foreign" :popper="{ arrow: true }">
          <UIcon name="i-game-icons-tower-flag" class="text-[20px]" />
        </UTooltip>
      </template>
      <template v-if="item.toLowerCase() === 'recruit'">
        <UTooltip text="Recruit" :popper="{ arrow: true }">
          <UIcon name="i-game-icons-pikeman" class="text-[20px]" />
        </UTooltip>
      </template>
      <template v-if="item.toLowerCase() === 'build'">
        <UTooltip text="Build" :popper="{ arrow: true }">
          <UIcon name="i-game-icons-hammer-nails" class="text-[20px]" />
        </UTooltip>
      </template>
      <template v-if="item.toLowerCase() === 'rebel'">
        <UTooltip text="Rebel" :popper="{ arrow: true }">
          <UIcon name="i-game-icons-revolt" class="text-[20px]" />
        </UTooltip>
      </template>
      <template v-if="item.toLowerCase() === 'arson'">
        <UTooltip text="Arson" :popper="{ arrow: true }">
          <UIcon name="i-game-icons-arson" class="text-[20px]" />
        </UTooltip>
      </template>
      <template v-if="item.toLowerCase() === 'infantry'">
        <UTooltip text="Infantry" :popper="{ arrow: true }">
          <UIcon name="i-game-icons-face-to-face" class="text-[20px]" />
        </UTooltip>
      </template>
      <template v-if="item.toLowerCase() === 'fire'">
        <UTooltip text="Fire" :popper="{ arrow: true }">
          <UIcon name="i-game-icons-fire" class="text-[20px]" />
        </UTooltip>
      </template>
      <template v-if="item.toLowerCase() === 'provoke'">
        <UTooltip text="Provoke" :popper="{ arrow: true }">
          <UIcon name="i-game-icons-clown" class="text-[20px]" />
        </UTooltip>
      </template>
      <template v-if="item.toLowerCase() === 'repair'">
        <UTooltip text="Repair" :popper="{ arrow: true }">
          <UIcon name="i-game-icons-auto-repair" class="text-[20px]" />
        </UTooltip>
      </template>
      <template v-if="item.toLowerCase() === 'taunt'">
        <UTooltip text="Taunt" :popper="{ arrow: true }">
          <UIcon name="i-game-icons-sly" class="text-[20px]" />
        </UTooltip>
      </template>
      <template v-if="item.toLowerCase() === 'lies'">
        <UTooltip text="Lies" :popper="{ arrow: true }">
          <UIcon name="i-game-icons-liar" class="text-[20px]" />
        </UTooltip>
      </template>
      <template v-if="item.toLowerCase() === 'spy'">
        <UTooltip text="Spy" :popper="{ arrow: true }">
          <UIcon name="i-game-icons-spy" class="text-[20px]" />
        </UTooltip>
      </template>
      <template v-if="item.toLowerCase() === 'bribe'">
        <UTooltip text="Bribe" :popper="{ arrow: true }">
          <UIcon name="i-game-icons-pay-money" class="text-[20px]" />
        </UTooltip>
      </template>
      <template v-if="item.toLowerCase() === 'gossip'">
        <UTooltip text="Gossip" :popper="{ arrow: true }">
          <UIcon name="i-game-icons-talk" class="text-[20px]" />
        </UTooltip>
      </template>
      <template v-if="item.toLowerCase() === 'study'">
        <UTooltip text="Study" :popper="{ arrow: true }">
          <UIcon name="i-game-icons-bookmark" class="text-[20px]" />
        </UTooltip>
      </template>
      <template v-if="item.toLowerCase() === 'naval'">
        <UTooltip text="Naval" :popper="{ arrow: true }">
          <UIcon name="i-game-icons-battleship" class="text-[20px]" />
        </UTooltip>
      </template>
      <template v-if="item.toLowerCase() === 'weather'">
        <UTooltip text="Weather" :popper="{ arrow: true }">
          <UIcon name="i-game-icons-raining" class="text-[20px]" />
        </UTooltip>
      </template>
      <template v-if="item.toLowerCase() === 'wind'">
        <UTooltip text="Wind" :popper="{ arrow: true }">
          <UIcon name="i-game-icons-paper-windmill" class="text-[20px]" />
        </UTooltip>
      </template>
      <template v-if="item.toLowerCase() === 'boulder'">
        <UTooltip text="Boulder" :popper="{ arrow: true }">
          <UIcon name="i-game-icons-falling-rocks" class="text-[20px]" />
        </UTooltip>
      </template>
      <template v-if="item.toLowerCase() === 'chaos'">
        <UTooltip text="Chaos" :popper="{ arrow: true }">
          <UIcon name="i-game-icons-yin-yang" class="text-[20px]" />
        </UTooltip>
      </template>
      <template v-if="item.toLowerCase() === 'chain'">
        <UTooltip text="Chain" :popper="{ arrow: true }">
          <UIcon name="i-game-icons-crossed-chains" class="text-[20px]" />
        </UTooltip>
      </template>
      <template v-if="item.toLowerCase() === 'archery'">
        <UTooltip text="Archery" :popper="{ arrow: true }">
          <UIcon name="i-game-icons-archer" class="text-[20px]" />
        </UTooltip>
      </template>
      <template v-if="item.toLowerCase() === 'cavalry'">
        <UTooltip text="Cavalry" :popper="{ arrow: true }">
          <UIcon name="i-game-icons-cavalry" class="text-[20px]" />
        </UTooltip>
      </template>
    </div>
  </div>
</template>