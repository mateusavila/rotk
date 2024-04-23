<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import type { FamousGenerals, NamesGenerals } from "~/utils";

useSeoMeta({
  title: () => "Romance of Three Kingdoms Database",
  ogTitle: "Romance of Three Kingdoms Database",
  description:
    "This website collects all the stats for the Romance of Three Kingdoms games, produced by Koei.",
  ogDescription:
    "This website collects all the stats for the Romance of Three Kingdoms games, produced by Koei.",
  keywords:
    "Romance of Three Kingdoms, ROTK, Database, Generals, Zhuge Liang, Cao Cao, Zhao Yun, Liu Bei, Three Kingdoms",
  robots: "index, follow",
  contentType: "text/html; charset=utf-8",
  author: "Mateus Ávila Isidoro",
});

const rulers: FamousGenerals[] = [
  {
    name: "Cao Cao",
    slug: "/general/cao-cao",
    image: "cao-cao.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Liu Bei",
    slug: "/general/liu-bei",
    image: "liu-bei.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Sun Quan",
    slug: "/general/sun-quan",
    image: "sun-quan.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Dong Zhuo",
    slug: "/general/dong-zhuo",
    image: "dong-zhuo.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Yuan Shao",
    slug: "/general/yuan-shao",
    image: "yuan-shao.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Yuan Shu",
    slug: "/general/yuan-shu",
    image: "yuan-shu.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Cao Pi",
    slug: "/general/cao-pi",
    image: "cao-pi.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Cao Rui",
    slug: "/general/cao-rui",
    image: "cao-rui.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Sun Jian",
    slug: "/general/sun-jian",
    image: "sun-jian.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Sun Ce",
    slug: "/general/sun-ce",
    image: "sun-ce.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Ma Teng",
    slug: "/general/ma-teng",
    image: "ma-teng.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Gongsun Zan",
    slug: "/general/gongsun-zan",
    image: "gongsun-zan.avif",
    width: 256,
    height: 256,
  },
];

const advisors: FamousGenerals[] = [
  {
    name: "Zhuge Liang",
    slug: "/general/zhuge-liang",
    image: "zhuge-liang.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Sima Yi",
    slug: "/general/sima-yi",
    image: "sima-yi.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Xun You",
    slug: "/general/xun-you",
    image: "xun-you.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Zhou Yu",
    slug: "/general/zhou-yu",
    image: "zhou-yu.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Pang Tong",
    slug: "/general/pang-tong",
    image: "pang-tong.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Guo Jia",
    slug: "/general/guo-jia",
    image: "guo-jia.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Xu You",
    slug: "/general/xu-you",
    image: "xu-you.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Jia Xu",
    slug: "/general/jia-xu",
    image: "jia-xu.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Lu Meng",
    slug: "/general/lu-meng",
    image: "lu-meng.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Lu Xun",
    slug: "/general/lu-xun",
    image: "lu-xun.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Lu Su",
    slug: "/general/lu-su",
    image: "lu-su.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Fa Zheng",
    slug: "/general/fa-zheng",
    image: "fa-zheng.avif",
    width: 256,
    height: 256,
  },
];

const warriors: FamousGenerals[] = [
  {
    name: "Lu Bu",
    slug: "/general/lu-bu",
    image: "lu-bu.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Zhao Yun",
    slug: "/general/zhao-yun",
    image: "zhao-yun.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Guan Yu",
    slug: "/general/guan-yu",
    image: "guan-yu.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Zhang Fei",
    slug: "/general/zhang-fei",
    image: "zhang-fei.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Xiahou Dun",
    slug: "/general/xiahou-dun",
    image: "xiahou-dun.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Dian Wei",
    slug: "/general/dian-wei",
    image: "dian-wei.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Zhang Liao",
    slug: "/general/zhang-liao",
    image: "zhang-liao.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Taishi Ci",
    slug: "/general/taishi-ci",
    image: "taishi-ci.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Cao Ren",
    slug: "/general/cao-ren",
    image: "cao-ren.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Xu Chu",
    slug: "/general/xu-chi",
    image: "xu-chu.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Wen Chou",
    slug: "/general/wen-chou",
    image: "wen-chou.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Huang Zhong",
    slug: "/general/huang-zhong",
    image: "huang-zhong.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Gan Ning",
    slug: "/general/gan-ning",
    image: "gan-ning.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Zhou Tai",
    slug: "/general/zhou-tai",
    image: "zhou-tai.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Wei Yan",
    slug: "/general/wei-yan",
    image: "wei-yan.avif",
    width: 256,
    height: 256,
  },
  {
    name: "Xiahou Yuan",
    slug: "/general/xiahou-yuan",
    image: "xiahou-yuan.avif",
    width: 256,
    height: 256,
  },
];

const namesList = async (): Promise<NamesGenerals[]> => {
  const { data } = await $fetch("/api/names");
  if (!data) {
    return [];
  }
  return data.map((item) => ({
    label: item.label ?? "",
    key: item.key ?? "",
    avatar: item.avatar ?? "",
  }));
};
const names = useStorage<NamesGenerals[]>("names", await namesList());

const openModal = ref(false);
const open = () => (openModal.value = true);
const close = async (queryString: string) => await navigateTo(`/filter?page=1&${queryString}`);
</script>

<template>
  <NuxtLayout name="default">
    <div class="w-full flex flex-wrap justify-between">
      <Banner :list="names" />
      <div class="w-full lg:w-[350px]">
        <CompareBox :list="names" />
        <FilterBox @open="open" />
      </div>
    </div>
    <FamousGenerals title="Warlords" :list="rulers" />
    <FamousGenerals title="Brilliant Advisors" :list="advisors" />
    <FamousGenerals title="Might Warriors" :list="warriors" />
    <UModal
      v-model="openModal"
      :ui="{
        background: 'bg-slate-700 dark:bg-gray-900',
        overlay: { background: 'bg-slate-800/90' },
      }"
    >
      <div class="w-full max-w-[500px]">
        <AdvancedFilter @close="close" />
      </div>
    </UModal>
  </NuxtLayout>
</template>
