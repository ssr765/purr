<script lang="ts" setup>
import NewButton from '@/components/NewButton.vue'
import PostCard from '@/components/PostCard.vue';
import MiniPost from '@/components/MiniPost.vue';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

</script>

<template>
  <div class="grid grid-cols-12 min-h-dvh fixed w-full">
    <div class="col-span-2 p-8 text-white bg-gray-900 space-y-4">
      <div class="font-thin text-6xl text-center font-raleway mb-10">purr.</div>
      <div class="px-8 py-4 bg-gray-600 rounded-md space-x-4">
        <font-awesome-icon icon="fa-solid fa-home" />
        <span>Home</span>
      </div>
    <div class="col-span-6 p-8 relative bg-transparent">
      <NewButton />
    </div>
    <div class="col-span-4 p-8 self-start h-dvh">
        <div class="border min-h-full shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-lg">
          <TabGroup>
            <TabList class="flex justify-around text-3xl">
              <Tab class="ui-selected:text-accent ui-selected:border-b ui-selected:border-b-accent p-8">
                <font-awesome-icon icon="fa-solid fa-fire" />
              </Tab>
              <Tab class="ui-selected:text-accent ui-selected:border-b ui-selected:border-b-accent p-8">
                <font-awesome-icon icon="fa-solid fa-cat" />
              </Tab>
              <Tab class="ui-selected:text-accent ui-selected:border-b ui-selected:border-b-accent p-8">
                <font-awesome-icon icon="fa-solid fa-sliders" />
              </Tab>
            </TabList>
            <TabPanels class="p-8">
              <TabPanel class="overflow-y-auto max-h-full space-y-5">
                <div class="text-3xl">Trending</div>
                <MiniPost />
                <MiniPost />
                <MiniPost />
                <MiniPost />
                <MiniPost />
                <MiniPost />
                <MiniPost />
                <MiniPost />
              </TabPanel>
              <TabPanel>Content 2</TabPanel>
              <TabPanel>Content 3</TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
    </div>
  </div>

  <div class="grid grid-cols-12 min-h-dvh">
  <div class="col-span-2">
  </div>
  <div class="col-span-6 p-8 relative space-y-5">
    <PostCard />
    <PostCard />
    <PostCard />
    <PostCard />
  </div>
</div>

</template>
