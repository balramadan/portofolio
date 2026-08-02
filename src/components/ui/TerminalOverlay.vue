<template>
  <Teleport to="body">
    <Transition @enter="onEnter" @leave="onLeave" :css="false">
      <div
        v-if="terminal.isOpen"
        class="fixed inset-0 z-[9990] bg-dark/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        @click.self="terminal.close()"
      >
        <!-- Terminal Window Container -->
        <div
          ref="terminalWindowRef"
          class="w-full max-w-4xl rounded-2xl border border-white/10 bg-surface/95 shadow-2xl shadow-black/60 overflow-hidden flex flex-col h-[85vh] max-h-[750px]"
        >
          <!-- Top Bar -->
          <div
            class="flex items-center justify-between px-4 py-3 bg-dark/80 border-b border-white/10 select-none"
          >
            <div class="flex items-center gap-2">
              <button
                @click="terminal.close()"
                class="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                title="Close terminal"
                aria-label="Close terminal"
              ></button>
              <button
                @click="terminal.clearLog()"
                class="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors"
                title="Clear screen"
                aria-label="Clear screen"
              ></button>
              <span class="w-3 h-3 rounded-full bg-green-500/80"></span>
            </div>

            <div
              class="flex items-center gap-2 font-mono text-xs text-light/50"
            >
              <span class="i-carbon-terminal text-bright"></span>
              <span>iqbal@portfolio:~</span>
            </div>

            <button
              @click="terminal.close()"
              class="p-1 rounded text-light/40 hover:text-light transition-colors"
              aria-label="Close"
            >
              <div class="i-carbon-close text-base"></div>
            </button>
          </div>

          <!-- Output Display Area -->
          <div
            ref="outputRef"
            class="flex-1 overflow-y-auto p-5 font-mono text-xs sm:text-sm space-y-2 select-text"
          >
            <!-- Welcome Header Banner -->
            <div
              class="p-4 rounded-xl bg-bright/5 border border-bright/20 mb-5 font-mono text-xs sm:text-sm"
            >
              <div class="flex items-center gap-2 text-bright font-bold mb-1.5">
                <span class="i-carbon-terminal text-base"></span>
                <span>Iqbal Ramadan — Interactive Portfolio CLI Terminal</span>
              </div>
              <p class="text-light/70 text-xs leading-relaxed">
                Type
                <span
                  class="text-bright font-bold bg-bright/15 px-1.5 py-0.5 rounded border border-bright/30"
                  >'help'</span
                >
                to view all available commands.
              </p>
            </div>

            <!-- Log Entries -->
            <div
              v-for="line in terminal.outputLog"
              :key="line.id"
              class="leading-relaxed"
            >
              <!-- Command Input Prompt Output -->
              <div
                v-if="line.type === 'command'"
                class="flex items-center gap-2 text-bright font-bold"
              >
                <span>→</span>
                <span>{{ line.content }}</span>
              </div>

              <!-- Success Text -->
              <div
                v-else-if="line.type === 'success'"
                class="text-emerald-400 font-semibold"
              >
                {{ line.content }}
              </div>

              <!-- Info Text -->
              <div
                v-else-if="line.type === 'info'"
                class="text-sky-400 font-semibold"
              >
                {{ line.content }}
              </div>

              <!-- Error Text -->
              <div
                v-else-if="line.type === 'error'"
                class="text-red-400 font-semibold"
              >
                {{ line.content }}
              </div>

              <!-- Divider -->
              <div
                v-else-if="line.type === 'divider'"
                class="text-white/20 my-1"
              >
                ──────────────────────────────────────────────────────────
              </div>

              <!-- Regular Output (Supports HTML formatted strings safely) -->
              <div v-else class="text-light/80 whitespace-pre-wrap break-words">
                {{ line.content }}
              </div>
            </div>
          </div>

          <!-- Input Row -->
          <div
            class="flex items-center gap-3 px-5 py-3.5 border-t border-white/10 bg-dark/60"
          >
            <span class="text-bright font-mono text-sm font-bold">→</span>
            <input
              ref="inputRef"
              v-model="currentInput"
              type="text"
              class="flex-1 bg-transparent text-light font-mono text-xs sm:text-sm outline-none caret-bright placeholder:text-light/30"
              placeholder="Type a command (e.g. help, whoami, experience)..."
              @keydown="handleKeyDown"
              autofocus
            />
            <span class="text-[10px] font-mono text-light/30 hidden sm:inline"
              >[Press Esc to exit]</span
            >
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from "vue";
import { useTerminalStore } from "@/stores/terminal";
import gsap from "gsap";

const terminal = useTerminalStore();
const currentInput = ref("");
const terminalWindowRef = ref(null);
const outputRef = ref(null);
const inputRef = ref(null);

function scrollToBottom() {
  nextTick(() => {
    if (outputRef.value) {
      outputRef.value.scrollTop = outputRef.value.scrollHeight;
    }
  });
}

function focusInput() {
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.focus();
    }
  });
}

watch(
  () => terminal.isOpen,
  (newVal) => {
    if (newVal) {
      focusInput();
      scrollToBottom();
    }
  },
);

function onEnter(el, done) {
  if (terminalWindowRef.value) {
    gsap.fromTo(
      terminalWindowRef.value,
      { y: 30, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: "back.out(1.2)",
        onComplete: done,
      },
    );
  } else {
    done();
  }
}

function onLeave(el, done) {
  if (terminalWindowRef.value) {
    gsap.to(terminalWindowRef.value, {
      y: 20,
      opacity: 0,
      scale: 0.95,
      duration: 0.25,
      ease: "power2.in",
      onComplete: done,
    });
  } else {
    done();
  }
}

function handleKeyDown(e) {
  if (e.key === "Enter") {
    processCommand();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    const prevCmd = terminal.navigateHistory("up");
    if (prevCmd) currentInput.value = prevCmd;
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    const nextCmd = terminal.navigateHistory("down");
    currentInput.value = nextCmd;
  } else if (e.key === "Escape") {
    terminal.close();
  } else if (e.key === "l" && e.ctrlKey) {
    e.preventDefault();
    terminal.clearLog();
  }
}

function pushLinesStaggered(lines, delayMs = 40) {
  lines.forEach((lineObj, idx) => {
    setTimeout(() => {
      terminal.pushLine(lineObj.type || "output", lineObj.content);
      scrollToBottom();
    }, idx * delayMs);
  });
}

function processCommand() {
  const rawInput = currentInput.value.trim();
  if (!rawInput) return;

  terminal.pushLine("command", rawInput);
  terminal.addToHistory(rawInput);
  currentInput.value = "";

  const cmd = rawInput.toLowerCase();

  switch (cmd) {
    case "help":
      pushLinesStaggered([
        { type: "info", content: "AVAILABLE COMMANDS:" },
        { type: "divider", content: "" },
        {
          type: "output",
          content: "  whoami      - Short identity & role summary",
        },
        {
          type: "output",
          content: "  about       - Detailed biography & background",
        },
        {
          type: "output",
          content: "  experience  - List of professional work experience",
        },
        {
          type: "output",
          content: "  techstack   - Technologies & tools grouped by category",
        },
        {
          type: "output",
          content: "  projects    - Highlighted portfolio projects",
        },
        {
          type: "output",
          content: "  contact     - Social media & contact information",
        },
        {
          type: "output",
          content: "  clear       - Clear terminal screen (or Ctrl+L)",
        },
        { type: "output", content: "  exit        - Close terminal overlay" },
      ]);
      break;

    case "whoami":
      pushLinesStaggered([
        {
          type: "success",
          content: "Iqbal Ramadan — Software Engineer / Fullstack Developer",
        },
        {
          type: "output",
          content:
            "Based in Jakarta, Indonesia. Specializing in Web & Mobile Apps.",
        },
      ]);
      break;

    case "about":
      pushLinesStaggered([
        { type: "info", content: "ABOUT ME:" },
        { type: "divider", content: "" },
        {
          type: "output",
          content:
            "Hello! I'm Iqbal Ramadan, an enthusiastic Fullstack Developer based in Indonesia. I recently graduated from Bina Sarana Informatika University with a degree in Information Technology.",
        },
        {
          type: "output",
          content:
            "My journey in web development has led me to build various projects, from high-converting landing pages to complex progressive web applications. I thrive on turning ideas into reality through clean, efficient code.",
        },
        {
          type: "output",
          content:
            "Currently, I am expanding my horizons into mobile development and studying new frameworks to deliver impactful digital experiences.",
        },
      ]);
      break;

    case "experience":
      pushLinesStaggered([
        { type: "info", content: "WORK EXPERIENCE:" },
        { type: "divider", content: "" },
        {
          type: "success",
          content:
            "[1] Fullstack Developer @ PT Kereta Cepat Indonesia China (Dec 2025 - Jun 2026)",
        },
        {
          type: "output",
          content:
            "    • Microservices backend with TypeScript, Bun, Elysia.js, and Drizzle ORM.\n    • Frontend development with Next.js.\n    • Relational database management with PostgreSQL, Prisma ORM, and Drizzle ORM.",
        },
        {
          type: "success",
          content: "[2] Volunteer Staff @ MNC GROUP (Dec 2024 - May 2025)",
        },
        {
          type: "output",
          content:
            "    • Precision management of studio audio & lighting infrastructure.",
        },
        {
          type: "success",
          content:
            "[3] SEO & CMS Management @ PT Media Wanita Gemilang (Sep 2024 - Dec 2024)",
        },
        {
          type: "output",
          content:
            "    • Strategic SEO frameworks and WordPress customization.",
        },
        {
          type: "success",
          content:
            "[4] Graphic Designer @ Jakarta Printer Jaya (Oct 2019 - Dec 2019)",
        },
        {
          type: "output",
          content:
            "    • Visual assets & technical print manufacturing workflows.",
        },
      ]);
      break;

    case "techstack":
      pushLinesStaggered([
        { type: "info", content: "TECHNOLOGIES & TOOLS:" },
        { type: "divider", content: "" },
        {
          type: "output",
          content:
            "Frontend  : HTML, CSS, JavaScript, TypeScript, Vue, React, Nuxt, Next, Astro, Tailwind, Bootstrap",
        },
        {
          type: "output",
          content: "Backend   : Node.js, Bun, Express, Elysia.js, PHP, Python",
        },
        {
          type: "output",
          content:
            "Database  : PostgreSQL, MySQL, MongoDB, Redis, Supabase, Prisma, Drizzle",
        },
        {
          type: "output",
          content: "Tools     : Vite, Figma, Git, GitHub, GitLab",
        },
      ]);
      break;

    case "projects":
      pushLinesStaggered([
        { type: "info", content: "FEATURED PROJECTS:" },
        { type: "divider", content: "" },
        {
          type: "output",
          content: "Navigating to Projects section...",
        },
      ]);
      setTimeout(() => {
        terminal.close();
        const el = document.getElementById("third");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 800);
      break;

    case "contact":
      pushLinesStaggered([
        { type: "info", content: "CONTACT INFORMATION:" },
        { type: "divider", content: "" },
        { type: "output", content: "  Email    : mail@helloiqbal.me" },
        { type: "output", content: "  Location : Jakarta, Indonesia" },
        {
          type: "output",
          content: "  GitHub   : https://github.com/balramadan",
        },
        {
          type: "output",
          content: "  LinkedIn : https://linkedin.com/in/balramadan",
        },
        {
          type: "output",
          content: "  Instagram: https://instagram.com/balramadan",
        },
      ]);
      break;

    case "clear":
      terminal.clearLog();
      break;

    case "exit":
      terminal.close();
      break;

    default:
      terminal.pushLine(
        "error",
        `Command not found: '${rawInput}'. Type 'help' for available commands.`,
      );
      scrollToBottom();
      break;
  }
}

onMounted(() => {
  if (terminal.isOpen) {
    focusInput();
  }
});
</script>

<style scoped></style>
