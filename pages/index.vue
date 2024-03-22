<script setup lang="ts">
import type { FamousGenerals } from '~/types'

useHead({
  title: 'Romance of Three Kingdoms Database'
})

const rulers: FamousGenerals[] = [
{
    name: 'Cao Cao',
    slug: '/general/cao-cao',
    image: 'cao-cao.webp',
    width: 256,
    height: 256
  },
  {
    name: 'Liu Bei',
    slug: '/general/liu-bei',
    image: 'liu-bei.webp',
    width: 256,
    height: 256
  },
  {
    name: 'Sun Quan',
    slug: '/general/sun-quan',
    image: 'sun-quan.webp',
    width: 256,
    height: 256
  },
  {
    name: 'Dong Zhuo',
    slug: '/general/dong-zhuo',
    image: 'dong-zhuo.jpg',
    width: 256,
    height: 256
  },
  {
    name: 'Yuan Shao',
    slug: '/general/yuan-shao',
    image: 'yuan-shao.webp',
    width: 256,
    height: 256
  },
  {
    name: 'Yuan Shu',
    slug: '/general/yuan-shu',
    image: 'yuan-shu.jpg',
    width: 256,
    height: 256
  },
  {
    name: 'Cao Pi',
    slug: '/general/cao-pi',
    image: 'cao-pi.webp',
    width: 256,
    height: 256
  },
  {
    name: 'Cao Rui',
    slug: '/general/cao-rui',
    image: 'cao-rui.webp',
    width: 256,
    height: 256
  },
  {
    name: 'Sun Jian',
    slug: '/general/sun-jian',
    image: 'sun-jian.jpg',
    width: 256,
    height: 256
  },
  {
    name: 'Sun Ce',
    slug: '/general/sun-ce',
    image: 'sun-ce.webp',
    width: 256,
    height: 256
  },
  {
    name: 'Ma Teng',
    slug: '/general/ma-teng',
    image: 'ma-teng.webp',
    width: 256,
    height: 256
  },
  {
    name: 'Gongsun Zan',
    slug: '/general/gongsun-zan',
    image: 'gongsun-zan.webp',
    width: 256,
    height: 256
  },
]

const advisors: FamousGenerals[] = [
{
    name: 'Zhuge Liang',
    slug: '/general/zhuge-liang',
    image: 'zhuge-liang.jpg',
    width: 256,
    height: 256
  },
  {
    name: 'Sima Yi',
    slug: '/general/sima-yi',
    image: 'sima-yi.jpg',
    width: 256,
    height: 256
  },
  {
    name: 'Xun Yu',
    slug: '/general/xun-yu',
    image: 'xun-yu.jpg',
    width: 256,
    height: 256
  },
  {
    name: 'Zhou Yu',
    slug: '/general/zhou-yu',
    image: 'zhou-yu.jpg',
    width: 256,
    height: 256
  },
  {
    name: 'Pang Tong',
    slug: '/general/pang-tong',
    image: 'pang-tong.jpg',
    width: 256,
    height: 256
  },
  {
    name: 'Guo Jia',
    slug: '/general/guo-jia',
    image: 'guo-jia.webp',
    width: 256,
    height: 256
  },
  {
    name: 'Xu You',
    slug: '/general/xu-you',
    image: 'xu-you.webp',
    width: 256,
    height: 256
  },
  {
    name: 'Jia Xu',
    slug: '/general/jia-xu',
    image: 'jia-xu.webp',
    width: 256,
    height: 256
  },
  {
    name: 'Lu Meng',
    slug: '/general/lu-meng',
    image: 'lu-meng.jpg',
    width: 256,
    height: 256
  },
  {
    name: 'Lu Xun',
    slug: '/general/lu-xun',
    image: 'lu-xun.webp',
    width: 256,
    height: 256
  },
  {
    name: 'Lu Su',
    slug: '/general/lu-su',
    image: 'lu-su.jpg',
    width: 256,
    height: 256
  },
  {
    name: 'Fa Zheng',
    slug: '/general/fa-zheng',
    image: 'fa-zheng.webp',
    width: 256,
    height: 256
  },
]

const warriors: FamousGenerals[] = [
{
    name: 'Lu Bu',
    slug: '/general/lu-bu',
    image: 'lu-bu.webp',
    width: 256,
    height: 256
  },
  {
    name: 'Zhao Yun',
    slug: '/general/zhao-yun',
    image: 'zhao-yun.webp',
    width: 256,
    height: 256
  },
  {
    name: 'Guan Yu',
    slug: '/general/guan-yu',
    image: 'guan-yu.webp',
    width: 256,
    height: 256
  },
  {
    name: 'Zhang Fei',
    slug: '/general/zhang-fei',
    image: 'zhang-fei.webp',
    width: 256,
    height: 256
  },
  {
    name: 'Xiahou Dun',
    slug: '/general/xiahou-dun',
    image: 'xiahou-dun.webp',
    width: 256,
    height: 256
  },
  {
    name: 'Dian Wei',
    slug: '/general/dian-wei',
    image: 'dian-wei.webp',
    width: 256,
    height: 256
  },
  {
    name: 'Zhang Liao',
    slug: '/general/zhang-liao',
    image: 'zhang-liao.webp',
    width: 256,
    height: 256
  },
  {
    name: 'Taishi Ci',
    slug: '/general/taishi-ci',
    image: 'taishi-ci.webp',
    width: 256,
    height: 256
  },
  {
    name: 'Cao Ren',
    slug: '/general/cao-ren',
    image: 'cao-ren.jpg',
    width: 256,
    height: 256
  },
  {
    name: 'Xu Chu',
    slug: '/general/xu-chi',
    image: 'xu-chu.webp',
    width: 256,
    height: 256
  },
  {
    name: 'Wen Chou',
    slug: '/general/wen-chou',
    image: 'wen-chou.webp',
    width: 256,
    height: 256
  },
  {
    name: 'Huang Zhong',
    slug: '/general/huang-zhong',
    image: 'huang-zhong.webp',
    width: 256,
    height: 256
  },
  {
    name: 'Gan Ning',
    slug: '/general/gan-ning',
    image: 'gan-ning.webp',
    width: 256,
    height: 256
  },
  {
    name: 'Zhou Tai',
    slug: '/general/zhou-tai',
    image: 'zhou-tai.jpg',
    width: 256,
    height: 256
  },
  {
    name: 'Wei Yan',
    slug: '/general/wei-yan',
    image: 'wei-yan.webp',
    width: 256,
    height: 256
  },
  {
    name: 'Xiahou Yuan',
    slug: '/general/xiahou-yuan',
    image: 'xiahou-yuan.webp',
    width: 256,
    height: 256
  }
]
</script>

<template>
  <NuxtLayout name="default">
    <Banner />
    <FamousGenerals title="Warlords" :list="rulers" />
    <FamousGenerals title="Brilliant Advisors" :list="advisors" />
    <FamousGenerals title="Might Warriors" :list="warriors" />
  </NuxtLayout>
</template>

