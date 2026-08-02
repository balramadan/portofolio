import { onMounted, onUnmounted } from "vue";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useSmoothScroll() {
  let lenis = null;
  let updateTicker = null;

  onMounted(() => {
    // Cek apakah perangkat menggunakan touchscreen/mobile pointer
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth <= 768;

    // Inisialisasi Lenis dengan konfigurasi teroptimasi performa
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: !isTouchDevice, // Aktifkan smooth wheel untuk desktop saja
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
    });

    // Sync Lenis scroll events dengan GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Hubungkan Lenis RAF ticker ke GSAP Global Ticker untuk performa 60-120fps terintegrasi
    updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);

    // Matikan lag smoothing GSAP agar koordinat selalu rapat
    gsap.ticker.lagSmoothing(0);
  });

  onUnmounted(() => {
    if (updateTicker) {
      gsap.ticker.remove(updateTicker);
    }
    if (lenis) {
      lenis.destroy();
      lenis = null;
    }
  });

  return {
    getLenis: () => lenis,
  };
}
