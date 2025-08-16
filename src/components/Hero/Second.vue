<template lang="">
  <div
    id="second"
    class="relative grid lg:grid-cols-2 xl:grid-cols-5 justify-center items-center lg:items-start lg:gap-5 bg-[#333] z-2 xl:h-screen px-5 sm:px-30 py-5"
  >
    <div class="mt-5 lg:mt-40 xl:col-span-3">
      <h2 class="text-light" text="base lg:2xl center lg:left">About Me</h2>
      <div class="border text-white"></div>
      <p text="white/80 sm lg:base center lg:left" mt-5>
        <span font="bold" text="bright">Hello! I'm Iqbal Ramadan</span> and I'm
        an enthusiastic Fullstack Developer.
        <span font="bold" text="bright"
          ><br class="hidden xl:block" />I am a fourth year student at Bina
          Sarana Informatika University in Information Technology.</span
        >
        I have experience in web development, such as creating simple landing
        pages and progressive web applications.<br /><br />I love learning new
        things and practicing my skills to be better, with clean and efficient
        code. I consider work to be a continuous education, and I am always
        looking for opportunities to work with those who are willing to share
        their knowledge as much as I am willing to learn. Ultimately, my
        ultimate goal is to create something beautiful with people who bring out
        the best in me.
      </p>
    </div>
    <div class="my-auto mx-auto order-first relative lg:mx-0 xl:col-span-2 group ">
      <div
        class="hidden xl:block absolute -bottom-4 size-100 border-5 border-bright rounded-xl opacity-50 -z-1 transition-all duration-500 ease-in-out"
        group-hover="-bottom-5 -left-1"
      ></div>

      <img
        src="/Foto-Bandung.jpg"
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
