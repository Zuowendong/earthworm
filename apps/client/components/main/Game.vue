<template>
  <template v-if="currentGameMode === GameMode.Dictation">
    <DictationMode></DictationMode>
  </template>
  <template v-else-if="currentGameMode === GameMode.ChineseToEnglish">
    <ChineseToEnglishMode></ChineseToEnglishMode>
  </template>
  <Tips></Tips>
  <Summary></Summary>
  <Share></Share>
  <AuthRequired></AuthRequired>
  <div class="absolute top-[100px] right-0">{{ onlineUsers }}人正在学习</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import ChineseToEnglishMode from "~/components/mode/chineseToEnglish/ChineseToEnglishMode.vue";
import DictationMode from "~/components/mode/dictation/DictationMode.vue";
import { courseTimer } from "~/composables/courses/courseTimer";
import { useOnline } from "~/composables/main/onlineUsers";
import { GameMode, useGameMode } from "~/composables/user/gameMode";
import AuthRequired from "./AuthRequired.vue";
import Share from "./Share.vue";
import Summary from "./Summary.vue";
import Tips from "./Tips.vue";

const { currentGameMode } = useGameMode();
const { onlineUsers } = useOnline();

onMounted(() => {
  courseTimer.reset();
});
</script>
