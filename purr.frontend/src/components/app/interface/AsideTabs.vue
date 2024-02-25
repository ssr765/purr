<script lang="ts" setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import MiniPost from '@/components/app/posts/MiniPost.vue'
import { useAsideStore } from '@/stores/aside'

const asideStore = useAsideStore()
</script>

<template>
  <TabGroup>
    <TabList class="flex justify-around text-3xl">
      <Tab v-for="tab of Object.keys(asideStore.content)" :key="tab" class="ui-selected:text-accent ui-selected:border-b ui-selected:border-b-accent p-8">
        <font-awesome-icon v-if="tab == 'postData'" icon="fa-solid fa-fire" />
        <font-awesome-icon v-if="tab == 'comments'" icon="fa-solid fa-fire" />
        <font-awesome-icon v-if="tab == 'catData'" icon="fa-solid fa-fire" />
      </Tab>
      <!-- <Tab class="ui-selected:text-accent ui-selected:border-b ui-selected:border-b-accent p-8">
        <font-awesome-icon icon="fa-solid fa-cat" />
      </Tab>
      <Tab class="ui-selected:text-accent ui-selected:border-b ui-selected:border-b-accent p-8">
        <font-awesome-icon icon="fa-solid fa-sliders" />
      </Tab> -->
    </TabList>
    <TabPanels class="p-8">
      <TabPanel v-for="tab of Object.keys(asideStore.content)" :key="tab" class="overflow-y-auto max-h-full space-y-5">
        <div v-if="tab == 'postData'">
          {{ asideStore.content.postData.caption }}
        </div>
        <div v-if="tab == 'comments'">
          {{ asideStore.content.comments }}
        </div>
        <div v-if="tab == 'catData'">
          {{ asideStore.content.catData.name }}
        </div>
      </TabPanel>
      <!-- <TabPanel>Content 2</TabPanel>
      <TabPanel>Content 3</TabPanel> -->
    </TabPanels>
  </TabGroup>
</template>
