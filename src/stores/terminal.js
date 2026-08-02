import { defineStore } from "pinia";
import { ref } from "vue";

export const useTerminalStore = defineStore("terminal", () => {
  const isOpen = ref(false);
  const commandHistory = ref([]);
  const historyIndex = ref(-1);
  const outputLog = ref([]);

  function open() {
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
  }

  function toggle() {
    isOpen.value = !isOpen.value;
  }

  function pushLine(type, content) {
    outputLog.value.push({
      type,
      content,
      id: Date.now() + Math.random(),
    });
  }

  function clearLog() {
    outputLog.value = [];
  }

  function addToHistory(cmd) {
    if (!cmd || !cmd.trim()) return;
    commandHistory.value.unshift(cmd.trim());
    historyIndex.value = -1;
  }

  function navigateHistory(direction) {
    if (commandHistory.value.length === 0) return "";

    if (direction === "up") {
      if (historyIndex.value < commandHistory.value.length - 1) {
        historyIndex.value++;
      }
    } else if (direction === "down") {
      if (historyIndex.value > 0) {
        historyIndex.value--;
      } else if (historyIndex.value === 0) {
        historyIndex.value = -1;
        return "";
      }
    }

    if (historyIndex.value >= 0 && historyIndex.value < commandHistory.value.length) {
      return commandHistory.value[historyIndex.value];
    }
    return "";
  }

  return {
    isOpen,
    commandHistory,
    historyIndex,
    outputLog,
    open,
    close,
    toggle,
    pushLine,
    clearLog,
    addToHistory,
    navigateHistory,
  };
});
