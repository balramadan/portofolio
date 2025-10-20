<template lang="">
  <div
    id="second"
    class="relative grid lg:grid-cols-2 xl:grid-cols-5 justify-center items-center lg:items-start lg:gap-5 bg-[#333] z-2 xl:h-screen px-5 sm:px-30 py-10"
  >
    <div class="mt-5 lg:mt-40 xl:col-span-3">
      <h2 class="text-light" text="base lg:2xl center lg:left">About Me</h2>
      <div class="border text-white"></div>
      <p text="white/80 sm lg:base center lg:left" mt-5>
        Hello! I'm <span class="text-bright">Iqbal Ramadan</span>, an
        enthusiastic <span class="text-bright">Fullstack Developer</span> and a
        recent graduate from Bina Sarana Informatika University with a degree in
        Information Technology. I am proficient in web development, with
        hands-on experience building projects such as landing pages and
        progressive web applications.<br /><br />
        Eager to broaden my horizons, I am currently expanding my skillset into
        mobile development. I am passionate about learning new technologies and
        honing my skills to write clean, efficient code. I view work as a
        continuous learning opportunity and am always looking for opportunities
        to collaborate with and learn from experienced professionals.
        Ultimately, my goal is to build impactful applications with a team that
        fosters growth and brings out the best in me.
      </p>
    </div>
    <div
      class="my-auto mx-auto order-first relative lg:mx-0 xl:col-span-2 group"
    >
      <div
        class="hidden xl:block absolute -bottom-4 size-100 border-5 border-bright rounded-xl opacity-50 -z-1 transition-all duration-500 ease-in-out"
        group-hover="-bottom-5 -left-1"
      ></div>

      <img
        src="/Foto-Bandung.jpg"
        loading="lazy"
        alt="Iqbal Ramadan"
        class="rounded-xl relative z-10 xl:-right-4 lg:grayscale-50 lg:invert-20 transition-all duration-500 ease-in-out"
        group-hover="invert-0 grayscale-0 xl:-top-1 xl:-right-5"
        text="center"
        size="70 lg:100"
      />
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
