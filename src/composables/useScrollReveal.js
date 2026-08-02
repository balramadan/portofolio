import { onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useScrollReveal() {
  const triggers = [];

  /**
   * Reveal a single element or target with GSAP ScrollTrigger
   */
  function reveal(target, options = {}) {
    const {
      y = 40,
      x = 0,
      opacity = 0,
      duration = 0.8,
      ease = "power3.out",
      start = "top 85%",
      toggleActions = "play none none reverse",
      ...customOptions
    } = options;

    const anim = gsap.fromTo(
      target,
      { opacity, y, x },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration,
        ease,
        scrollTrigger: {
          trigger: target,
          start,
          toggleActions,
          ...customOptions.scrollTrigger,
        },
        ...customOptions,
      }
    );

    if (anim.scrollTrigger) {
      triggers.push(anim.scrollTrigger);
    }
    return anim;
  }

  /**
   * Reveal multiple elements with a stagger effect
   */
  function revealStagger(target, options = {}) {
    const {
      y = 40,
      x = 0,
      opacity = 0,
      duration = 0.8,
      stagger = 0.15,
      ease = "power3.out",
      trigger,
      start = "top 85%",
      toggleActions = "play none none reverse",
      ...customOptions
    } = options;

    const anim = gsap.fromTo(
      target,
      { opacity, y, x },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: trigger || target,
          start,
          toggleActions,
          ...customOptions.scrollTrigger,
        },
        ...customOptions,
      }
    );

    if (anim.scrollTrigger) {
      triggers.push(anim.scrollTrigger);
    }
    return anim;
  }

  /**
   * Cleanup all triggers associated with this composable instance
   */
  function cleanup() {
    triggers.forEach((st) => st.kill());
    triggers.length = 0;
  }

  onUnmounted(() => {
    cleanup();
  });

  return {
    reveal,
    revealStagger,
    cleanup,
  };
}
