<template>
  <Teleport to="body">
    <button
      @click="terminal.toggle()"
      class="fixed bottom-6 right-6 z-[9989] flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-surface/90 backdrop-blur-md border border-white/10 text-light/80 hover:border-bright/50 hover:text-bright hover:shadow-[0_0_20px_rgba(249,115,0,0.25)] transition-all duration-300 font-mono text-xs group"
      aria-label="Toggle Terminal CLI"
      :class="[
        terminal.isOpen
          ? 'border-bright text-bright bg-bright/10 shadow-[0_0_15px_rgba(249,115,0,0.3)]'
          : '',
      ]"
    >
      <span
        class="i-carbon-terminal text-base group-hover:scale-110 transition-transform"
      ></span>
      <span class="hidden sm:inline font-bold">Terminal</span>
      <span
        class="hidden lg:inline text-[10px] text-light/40 bg-white/5 px-1.5 py-0.5 rounded font-mono"
        >Ctrl+`</span
      >
    </button>
  </Teleport>
</template>

<script setup>
import { useTerminalStore } from "@/stores/terminal";

const terminal = useTerminalStore();
</script>

<style scoped></style>
