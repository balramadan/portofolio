import { ref, computed, onMounted } from "vue";
import { useMouseInElement } from "@vueuse/core";

export function useCursorSpotlight(targetRef, options = {}) {
  const isFinePointer = ref(false);

  onMounted(() => {
    isFinePointer.value = window.matchMedia("(pointer: fine)").matches;
  });

  const { elementX, elementY, isOutside } = useMouseInElement(targetRef);

  const spotlightStyle = computed(() => {
    if (!isFinePointer.value || isOutside.value) {
      return {};
    }

    const {
      color = "rgba(249, 115, 0, 0.12)",
      size = "500px",
      fadeColor = "transparent",
    } = options;

    return {
      backgroundImage: `radial-gradient(${size} circle at ${elementX.value}px ${elementY.value}px, ${color}, ${fadeColor} 80%)`,
    };
  });

  return {
    spotlightStyle,
    isOutside,
    isFinePointer,
  };
}
