/* ==========================================================
   A LITTLE WORLD JUST FOR REHAN 💗 — JAVASCRIPT
   Features:
   • 1. Official Spotify Card: Independent streaming for "Lovers" by Anna of the North
   • 2. Compact 1.5× Speed Continuous Animated Love Story Movie (Mobile-Optimized)
        Moments: 1. Meet under stars, 2. Walk together, 3. Hold hands,
                 4. Hug & dance together, 5. Sit beneath the stars with hearts & sparkles,
                 6. Sweet ending message & Replay
   • 3. Full "Dearest Rehan" Love Letter & Original Romantic Messages Preserved
   • 4. Interactive widgets: Hug stamp, daily messages, reason generator, secret surprise, hug counter
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================================
  // 1. DATE DISPLAY ON LOVE LETTER
  // ==========================================================
  const currentDateEl = document.getElementById("currentDateDisplay");
  if (currentDateEl) {
    const now = new Date();
    currentDateEl.textContent = now.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  }

  // ==========================================================
  // 2. BACKGROUND PARTICLES (HEARTS & TWINKLING STARS)
  // ==========================================================
  const heartsLayer = document.getElementById("heartsLayer");
  const starsLayer = document.getElementById("starsLayer");

  if (starsLayer) {
    const starIcons = ["✦", "✧", "⋆", "✨"];
    const count = window.innerWidth < 600 ? 18 : 36;
    for (let i = 0; i < count; i++) {
      const star = document.createElement("span");
      star.className = "star-point";
      star.textContent = starIcons[Math.floor(Math.random() * starIcons.length)];
      star.style.left = Math.random() * 96 + "%";
      star.style.top = Math.random() * 95 + "%";
      star.style.setProperty("--duration", (Math.random() * 3 + 2.5) + "s");
      star.style.animationDelay = (Math.random() * 3) + "s";
      star.style.fontSize = (Math.random() * 0.7 + 0.65) + "rem";
      starsLayer.appendChild(star);
    }
  }

  function spawnFloatingHeart() {
    if (!heartsLayer) return;
    const icons = ["💖", "💕", "💗", "🌸", "✨", "💓", "🤍", "🤎"];
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = icons[Math.floor(Math.random() * icons.length)];
    heart.style.left = Math.random() * 95 + "%";
    heart.style.setProperty("--speed", (Math.random() * 6 + 8) + "s");
    heart.style.setProperty("--drift", (Math.random() * 60 - 30) + "px");
    heart.style.fontSize = (Math.random() * 0.8 + 0.9) + "rem";
    heartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), 15000);
  }

  setInterval(spawnFloatingHeart, 1600);
  for (let i = 0; i < 4; i++) spawnFloatingHeart();

  // Burst particle helper for celebrations and button clicks
  function createBurst(x, y, customSymbols = null) {
    const symbols = customSymbols || ["💖", "💕", "✨", "🌸", "💗", "🥰", "🤍", "🤎"];
    for (let i = 0; i < 10; i++) {
      const span = document.createElement("span");
      span.className = "burst-sparkle";
      span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      const angle = (Math.PI * 2 * i) / 10 + (Math.random() - 0.5) * 0.4;
      const dist = 45 + Math.random() * 65;
      span.style.left = x + "px";
      span.style.top = y + "px";
      span.style.setProperty("--tx", Math.cos(angle) * dist + "px");
      span.style.setProperty("--ty", Math.sin(angle) * dist + "px");
      document.body.appendChild(span);
      setTimeout(() => span.remove(), 900);
    }
  }

  // ==========================================================
  // 3. SPOTIFY & AUDIO CONTROLLER: START AT EXACTLY 1:20 (80s)
  // • Automatically seeks to 80s (1:20) on playback
  // • Integrates with Spotify iFrame API (EmbedController.seek(80))
  // • Dedicated "Play / Jump to 1:20 (The Chorus) 🎵" button
  // • Direct link with ?t=80 timestamp
  // • Local audio fallback support if lovers.mp3 is added, with NO missing-file warning
  // ==========================================================
  const START_TIMESTAMP_SEC = 80; // Exactly 1:20 (80 seconds) as requested!
  const seekTimestampBtn = document.getElementById("seekTimestampBtn");
  const localLoversAudio = document.getElementById("localLoversAudio");
  let spotifyEmbedController = null;
  let hasSeekedToStart = false;
  let isLocalAudioReady = false;

  // Local audio element check (silent, no warning banner)
  if (localLoversAudio) {
    localLoversAudio.addEventListener("loadedmetadata", () => {
      isLocalAudioReady = true;
      if (localLoversAudio.currentTime < START_TIMESTAMP_SEC) {
        localLoversAudio.currentTime = START_TIMESTAMP_SEC;
      }
    });
    localLoversAudio.addEventListener("error", () => {
      isLocalAudioReady = false;
    });
  }

  // Spotify iFrame API Ready Callback
  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const slot = document.getElementById("spotifyEmbedSlot");
    const fallbackIframe = document.getElementById("spotifyFallbackIframe");
    if (!slot) return;

    const options = {
      width: "100%",
      height: "152",
      uri: "spotify:track:6q8onrzcka32nGVrnWYGBQ"
    };

    IFrameAPI.createController(slot, options, (controller) => {
      spotifyEmbedController = controller;
      if (fallbackIframe) fallbackIframe.style.display = "none";

      // When user plays track on Spotify embed, automatically seek to 1:20 (80s)
      controller.addListener("playback_update", (e) => {
        if (!hasSeekedToStart && e.data && !e.data.isPaused) {
          if (e.data.position < 78000) {
            hasSeekedToStart = true;
            controller.seek(START_TIMESTAMP_SEC);
          }
        }
      });
    });
  };

  // Dedicated "Play / Jump to 1:20" button interaction
  if (seekTimestampBtn) {
    seekTimestampBtn.addEventListener("click", () => {
      const rect = seekTimestampBtn.getBoundingClientRect();
      createBurst(rect.left + rect.width / 2, rect.top + window.scrollY + rect.height / 2, ["🎵", "💖", "🌸", "✨"]);

      // 1. If local audio file is loaded, play starting at 1:20
      if (isLocalAudioReady && localLoversAudio) {
        localLoversAudio.currentTime = START_TIMESTAMP_SEC;
        localLoversAudio.play().then(() => {
          seekTimestampBtn.innerHTML = `<span>Playing from 1:20 🎵</span>`;
        }).catch(() => {});
        return;
      }

      // 2. Control Spotify Embed via iFrame API to seek to 80s (1:20) and play
      if (spotifyEmbedController) {
        hasSeekedToStart = true;
        spotifyEmbedController.seek(START_TIMESTAMP_SEC);
        spotifyEmbedController.play();
        seekTimestampBtn.innerHTML = `<span>Started at 1:20 🎵</span>`;
        setTimeout(() => {
          seekTimestampBtn.innerHTML = `<span>▶ Play / Jump to 1:20 (The Chorus) 🎵</span>`;
        }, 3000);
      } else {
        // Fallback: reload iframe with timestamp parameter
        const fallbackIframe = document.getElementById("spotifyFallbackIframe");
        if (fallbackIframe) {
          fallbackIframe.src = "https://open.spotify.com/embed/track/6q8onrzcka32nGVrnWYGBQ?utm_source=generator&theme=0&t=80";
        }
        seekTimestampBtn.innerHTML = `<span>Opening at 1:20 🎵</span>`;
        setTimeout(() => {
          seekTimestampBtn.innerHTML = `<span>▶ Play / Jump to 1:20 (The Chorus) 🎵</span>`;
        }, 3000);
      }
    });
  }

  // ==========================================================
  // 4. TEDDY BEAR VECTOR CHARACTERS (Sobiya 🤍 & Rehan 🤎)
  // Sobiya: Fluffy white girl teddy bear with cute pink bow & rosy cheeks
  // Rehan: Fluffy brown boy teddy bear with blue bowtie
  // ==========================================================

  // Sobiya: Fluffy White Girl Teddy Bear
  function getSobiyaBearSVG(pose = "normal", armPose = "normal") {
    let armLeftClass = "bear-paw-left";
    let armRightClass = "bear-paw-right";
    let eyeContent = `
      <circle cx="39" cy="48" r="4.2" fill="#2d1c15" />
      <circle cx="40.5" cy="46.5" r="1.5" fill="#fff" />
      <path d="M 35 44 L 38 46" stroke="#2d1c15" stroke-width="1.6" stroke-linecap="round" />
      <circle cx="61" cy="48" r="4.2" fill="#2d1c15" />
      <circle cx="62.5" cy="46.5" r="1.5" fill="#fff" />
      <path d="M 65 44 L 62 46" stroke="#2d1c15" stroke-width="1.6" stroke-linecap="round" />
    `;

    if (armPose === "wave") {
      armRightClass += " paw-waving";
    } else if (armPose === "hug" || armPose === "dance") {
      armLeftClass += " paw-stretch-left";
      armRightClass += " paw-stretch-right";
    }

    if (pose === "blink" || pose === "shy" || pose === "dance") {
      eyeContent = `
        <path d="M 35 48 Q 39 44 43 48" stroke="#2d1c15" stroke-width="2.5" fill="none" stroke-linecap="round" />
        <path d="M 57 48 Q 61 44 65 48" stroke="#2d1c15" stroke-width="2.5" fill="none" stroke-linecap="round" />
      `;
    } else if (pose === "happy-blink") {
      eyeContent = `
        <path d="M 35 48 Q 39 43 43 48" stroke="#2d1c15" stroke-width="2.5" fill="none" stroke-linecap="round" />
        <path d="M 57 48 Q 61 43 65 48" stroke="#2d1c15" stroke-width="2.5" fill="none" stroke-linecap="round" />
      `;
    }

    return `
      <div class="bear-char sobiya-bear pose-${pose}">
        <svg viewBox="0 0 100 110" class="bear-svg">
          <circle cx="26" cy="24" r="14" fill="#ffffff" stroke="#f0edf2" stroke-width="1.2" />
          <circle cx="26" cy="24" r="8" fill="#ffd5e5" />
          <circle cx="74" cy="24" r="14" fill="#ffffff" stroke="#f0edf2" stroke-width="1.2" />
          <circle cx="74" cy="24" r="8" fill="#ffd5e5" />
          <circle cx="50" cy="52" r="34" fill="#ffffff" stroke="#f2ecf3" stroke-width="1.5" />
          <g class="pink-bow">
            <path d="M 68 18 L 76 24 L 68 30 Z" fill="#ff7597" />
            <path d="M 84 18 L 76 24 L 84 30 Z" fill="#ff7597" />
            <circle cx="76" cy="24" r="3.5" fill="#ffffff" />
          </g>
          <ellipse cx="50" cy="60" rx="18" ry="14" fill="#fff5f9" />
          <g class="bear-eyes">${eyeContent}</g>
          <ellipse cx="50" cy="56" rx="4.8" ry="3.6" fill="#2d1c15" />
          <path d="M 46 62 Q 50 67 54 62" stroke="#2d1c15" stroke-width="2" fill="none" stroke-linecap="round" />
          <circle cx="33" cy="56" r="6" fill="#ff9ebb" opacity="0.85" class="blush-glow" />
          <circle cx="67" cy="56" r="6" fill="#ff9ebb" opacity="0.85" class="blush-glow" />
          <ellipse cx="50" cy="98" rx="28" ry="18" fill="#ffffff" stroke="#f2ecf3" stroke-width="1.5" />
          <circle cx="20" cy="88" r="8" fill="#ffffff" stroke="#f0edf2" stroke-width="1" class="${armLeftClass}" />
          <circle cx="80" cy="88" r="8" fill="#ffffff" stroke="#f0edf2" stroke-width="1" class="${armRightClass}" />
        </svg>
        <span class="bear-nametag">Sobiya 🤍</span>
      </div>
    `;
  }

  // Rehan: Fluffy Brown Boy Teddy Bear
  function getRehanBearSVG(pose = "normal", armPose = "normal") {
    let armLeftClass = "bear-paw-left";
    let armRightClass = "bear-paw-right";
    let eyeContent = `
      <circle cx="39" cy="48" r="4.2" fill="#2d1c15" />
      <circle cx="40.5" cy="46.5" r="1.5" fill="#fff" />
      <circle cx="61" cy="48" r="4.2" fill="#2d1c15" />
      <circle cx="62.5" cy="46.5" r="1.5" fill="#fff" />
    `;

    if (armPose === "wave") {
      armLeftClass += " paw-waving";
    } else if (armPose === "hug" || armPose === "dance") {
      armLeftClass += " paw-stretch-left";
      armRightClass += " paw-stretch-right";
    }

    if (pose === "blink" || pose === "shy" || pose === "dance") {
      eyeContent = `
        <path d="M 35 48 Q 39 44 43 48" stroke="#2d1c15" stroke-width="2.5" fill="none" stroke-linecap="round" />
        <path d="M 57 48 Q 61 44 65 48" stroke="#2d1c15" stroke-width="2.5" fill="none" stroke-linecap="round" />
      `;
    } else if (pose === "happy-blink") {
      eyeContent = `
        <path d="M 35 48 Q 39 43 43 48" stroke="#2d1c15" stroke-width="2.5" fill="none" stroke-linecap="round" />
        <path d="M 57 48 Q 61 43 65 48" stroke="#2d1c15" stroke-width="2.5" fill="none" stroke-linecap="round" />
      `;
    }

    return `
      <div class="bear-char rehan-bear pose-${pose}">
        <svg viewBox="0 0 100 110" class="bear-svg">
          <circle cx="26" cy="24" r="14" fill="#7d4e2d" />
          <circle cx="26" cy="24" r="8" fill="#a26c45" />
          <circle cx="74" cy="24" r="14" fill="#7d4e2d" />
          <circle cx="74" cy="24" r="8" fill="#a26c45" />
          <circle cx="50" cy="52" r="34" fill="#8d5b38" />
          <ellipse cx="50" cy="60" rx="18" ry="14" fill="#f0d3b8" />
          <g class="bear-eyes">${eyeContent}</g>
          <ellipse cx="50" cy="56" rx="5" ry="3.8" fill="#2d1c15" />
          <path d="M 46 62 Q 50 67 54 62" stroke="#2d1c15" stroke-width="2" fill="none" stroke-linecap="round" />
          <circle cx="33" cy="56" r="5" fill="#ffb4c8" opacity="0.75" class="blush-glow" />
          <circle cx="67" cy="56" r="5" fill="#ffb4c8" opacity="0.75" class="blush-glow" />
          <path d="M 40 84 L 50 88 L 40 92 Z" fill="#5ec2ea" />
          <path d="M 60 84 L 50 88 L 60 92 Z" fill="#5ec2ea" />
          <circle cx="50" cy="88" r="3.5" fill="#ffd700" />
          <ellipse cx="50" cy="98" rx="28" ry="18" fill="#7d4e2d" />
          <circle cx="20" cy="88" r="8" fill="#7d4e2d" class="${armLeftClass}" />
          <circle cx="80" cy="88" r="8" fill="#7d4e2d" class="${armRightClass}" />
        </svg>
        <span class="bear-nametag">Rehan 🤎</span>
      </div>
    `;
  }

  // ==========================================================
  // 4. COMPACT 1.5× SPEED CONTINUOUS ANIMATED MOVIE
  // Important romantic moments:
  // 1. Sobiya and Rehan meet under the stars.
  // 2. They walk toward each other.
  // 3. They hold hands.
  // 4. They hug and dance together.
  // 5. They sit together beneath the stars with floating hearts and sparkles.
  // 6. End with a sweet romantic message and a replay option.
  // ==========================================================
  const movieMoments = [
    {
      badge: "Moment 1 · Under the Stars ⭐",
      title: "Looking at the Same Moon",
      desc: "Miles apart under separate skies, Sobiya and Rehan look out their windows, their hearts connected under the starry night sky.",
      skyClass: "sky-twilight",
      type: "separate",
      sobiyaPose: { pose: "normal", arm: "wave" },
      rehanPose: { pose: "normal", arm: "wave" },
      propHTML: `
        <div style="text-align:center; animation: floatHeart 1.2s infinite alternate;">
          <div style="font-size:2rem;">🌙 ✨</div>
          <div class="movie-mini-bubble">
            “Thinking of you, Rehan 🤍”
          </div>
        </div>
      `,
      durationMs: 3600 // 1.5x faster
    },
    {
      badge: "Moment 2 · Walking Toward Each Other 🐾",
      title: "Closing the Distance",
      desc: "The clouds clear into a soft pink path as Sobiya and Rehan happily walk toward each other, their smiles shining brighter with every step.",
      skyClass: "sky-sunset",
      type: "walking",
      sobiyaPose: { pose: "happy-blink", arm: "wave" },
      rehanPose: { pose: "happy-blink", arm: "wave" },
      propHTML: `
        <div style="font-size:1.8rem; animation: floatHeart 1s infinite alternate;">
          🌸 💕 🌸
        </div>
      `,
      durationMs: 3400 // 1.5x faster (1.8s walking animation + dwell)
    },
    {
      badge: "Moment 3 · Holding Hands 🤝",
      title: "Paws Connected, Hearts Entwined",
      desc: "Meeting right in the center, they lovingly reach out and hold hands. A gentle wave of warm glowing sparkles surrounds them.",
      skyClass: "sky-sunset",
      type: "handhold",
      propHTML: `
        <div class="bears-holding-hands">
          ${getSobiyaBearSVG("happy-blink", "normal")}
          <div class="handhold-sparkles">💖✨</div>
          ${getRehanBearSVG("happy-blink", "normal")}
        </div>
      `,
      durationMs: 3400 // 1.5x faster
    },
    {
      badge: "Moment 4 · Hugging & Dancing Together 🫂💃",
      title: "Sweet Embrace & Romantic Dance",
      desc: "Sobiya and Rehan lock into a warm, joyful teddy-bear hug, swaying and dancing together under floating hearts and sweet melody.",
      skyClass: "sky-hug",
      type: "hug-dance",
      propHTML: `
        <div class="bears-hug-dance">
          <div style="transform: rotate(4deg);">${getSobiyaBearSVG("happy-blink", "dance")}</div>
          <div style="font-size:2.8rem; margin:0 -4px; z-index:20; filter:drop-shadow(0 0 18px #ff4081);">💖</div>
          <div style="transform: rotate(-4deg);">${getRehanBearSVG("happy-blink", "dance")}</div>
        </div>
      `,
      durationMs: 4200 // 1.5x faster
    },
    {
      badge: "Moment 5 · Beneath the Stars ⭐",
      title: "Together Beneath the Stars",
      desc: "Sitting side by side beneath the starry sky with floating hearts and sparkles, knowing no distance can ever change what they feel.",
      skyClass: "sky-stargaze",
      type: "stargaze",
      propHTML: `
        <div class="bears-sitting-together">
          <div class="sobiya-lean">${getSobiyaBearSVG("happy-blink", "normal")}</div>
          <div style="font-size:2.2rem; margin:0 4px; filter:drop-shadow(0 0 14px #ff6584);">🤍💖🤎</div>
          <div class="rehan-lean">${getRehanBearSVG("happy-blink", "normal")}</div>
        </div>
      `,
      isEnding: true,
      durationMs: 999999
    }
  ];

  const movieSky = document.getElementById("movieSky");
  const actorSobiya = document.getElementById("actorSobiya");
  const actorPropSlot = document.getElementById("actorPropSlot");
  const actorRehan = document.getElementById("actorRehan");
  const movieFloatStream = document.getElementById("movieFloatStream");
  const movieSceneBadge = document.getElementById("movieSceneBadge");
  const movieSceneTitle = document.getElementById("movieSceneTitle");
  const movieSceneDesc = document.getElementById("movieSceneDesc");
  const moviePlayPauseBtn = document.getElementById("moviePlayPauseBtn");
  const movieProgressBar = document.getElementById("movieProgressBar");
  const movieReplayBtn = document.getElementById("movieReplayBtn");
  const happyEndingBanner = document.getElementById("happyEndingBanner");

  let currentMomentIdx = 0;
  let isMoviePlaying = true;
  let movieTimer = null;
  let particleInterval = null;

  // Spawn floating hearts and sparkles in cinema stage viewport
  function spawnMovieParticle() {
    if (!movieFloatStream) return;
    const icons = ["💖", "✨", "💕", "🌸", "🤍", "🤎", "💫"];
    const p = document.createElement("span");
    p.className = "movie-particle";
    p.textContent = icons[Math.floor(Math.random() * icons.length)];
    p.style.left = Math.random() * 92 + "%";
    p.style.fontSize = (Math.random() * 0.5 + 0.8) + "rem";
    movieFloatStream.appendChild(p);
    setTimeout(() => p.remove(), 2900);
  }

  function startMovieParticles() {
    if (particleInterval) clearInterval(particleInterval);
    particleInterval = setInterval(spawnMovieParticle, 450);
  }

  function stopMovieParticles() {
    if (particleInterval) {
      clearInterval(particleInterval);
      particleInterval = null;
    }
  }

  function renderMovieMoment(idx) {
    if (idx < 0 || idx >= movieMoments.length) return;
    currentMomentIdx = idx;
    const moment = movieMoments[idx];

    // 1. Sky & Environment Transition
    if (movieSky) {
      movieSky.className = "movie-sky-gradient " + moment.skyClass;
    }

    // 2. Stage Layout & Characters
    if (moment.type === "separate") {
      stopMovieParticles();
      if (actorSobiya) {
        actorSobiya.style.display = "flex";
        actorSobiya.className = "actor-slot actor-sobiya";
        actorSobiya.innerHTML = getSobiyaBearSVG(moment.sobiyaPose.pose, moment.sobiyaPose.arm);
      }
      if (actorRehan) {
        actorRehan.style.display = "flex";
        actorRehan.className = "actor-slot actor-rehan";
        actorRehan.innerHTML = getRehanBearSVG(moment.rehanPose.pose, moment.rehanPose.arm);
      }
      if (actorPropSlot) {
        actorPropSlot.innerHTML = moment.propHTML;
      }
    } else if (moment.type === "walking") {
      stopMovieParticles();
      if (actorSobiya) {
        actorSobiya.style.display = "flex";
        actorSobiya.className = "actor-slot actor-sobiya walking-phase-sobiya";
        actorSobiya.innerHTML = getSobiyaBearSVG(moment.sobiyaPose.pose, moment.sobiyaPose.arm);
      }
      if (actorRehan) {
        actorRehan.style.display = "flex";
        actorRehan.className = "actor-slot actor-rehan walking-phase-rehan";
        actorRehan.innerHTML = getRehanBearSVG(moment.rehanPose.pose, moment.rehanPose.arm);
      }
      if (actorPropSlot) {
        actorPropSlot.innerHTML = moment.propHTML;
      }
    } else {
      // In Handhold, Hug-Dance, and Stargaze: combined centered duo
      if (actorSobiya) actorSobiya.style.display = "none";
      if (actorRehan) actorRehan.style.display = "none";
      if (actorPropSlot) {
        actorPropSlot.innerHTML = moment.propHTML;
        actorPropSlot.style.animation = "fadeInUp 0.5s ease";
      }

      // Moments 4 & 5 feature floating hearts & sparkles stream!
      if (moment.type === "hug-dance" || moment.type === "stargaze") {
        startMovieParticles();
      } else {
        stopMovieParticles();
      }
    }

    // 3. Captions
    if (movieSceneBadge) movieSceneBadge.textContent = moment.badge;
    if (movieSceneTitle) movieSceneTitle.textContent = moment.title;
    if (movieSceneDesc) movieSceneDesc.textContent = moment.desc;

    // 4. Progress Bar
    if (movieProgressBar) {
      movieProgressBar.value = Math.round((idx / (movieMoments.length - 1)) * 100);
    }

    // 5. Ending Banner
    if (happyEndingBanner) {
      if (moment.isEnding) {
        happyEndingBanner.hidden = false;
        createBurst(window.innerWidth / 2, window.innerHeight / 2, ["🤍", "🤎", "💖", "✨", "🌸", "🎉"]);
      } else {
        happyEndingBanner.hidden = true;
      }
    }

    // 6. Continuous Auto-Advance Timer at 1.5x Speed
    clearTimeout(movieTimer);
    if (isMoviePlaying && idx < movieMoments.length - 1) {
      movieTimer = setTimeout(() => {
        renderMovieMoment(idx + 1);
      }, moment.durationMs);
    }
  }

  // Movie Controls: Play/Pause, Replay, Timeline Scrubber
  if (moviePlayPauseBtn) {
    moviePlayPauseBtn.addEventListener("click", () => {
      isMoviePlaying = !isMoviePlaying;
      moviePlayPauseBtn.textContent = isMoviePlaying ? "⏸" : "▶";
      clearTimeout(movieTimer);
      if (isMoviePlaying && currentMomentIdx < movieMoments.length - 1) {
        movieTimer = setTimeout(() => {
          renderMovieMoment(currentMomentIdx + 1);
        }, 2200);
      }
    });
  }

  if (movieReplayBtn) {
    movieReplayBtn.addEventListener("click", () => {
      clearTimeout(movieTimer);
      isMoviePlaying = true;
      if (moviePlayPauseBtn) moviePlayPauseBtn.textContent = "⏸";
      renderMovieMoment(0);
    });
  }

  if (movieProgressBar) {
    movieProgressBar.addEventListener("input", (e) => {
      clearTimeout(movieTimer);
      const val = parseInt(e.target.value, 10);
      const idx = Math.min(movieMoments.length - 1, Math.floor((val / 100) * movieMoments.length));
      renderMovieMoment(idx);
    });
  }

  // Initialize movie at Moment 0
  renderMovieMoment(0);

  // ==========================================================
  // 5. WELCOME SCREEN NAVIGATION BUTTONS
  // ==========================================================
  const enterWorldBtn = document.getElementById("enterWorldBtn");
  const watchStoryScrollBtn = document.getElementById("watchStoryScrollBtn");
  const loveLetterSection = document.getElementById("loveLetterSection");
  const movieTheaterSection = document.getElementById("movieTheaterSection");

  // "Enter Our Little World 💗" -> Scrolls directly to Love Letter
  if (enterWorldBtn) {
    enterWorldBtn.addEventListener("click", () => {
      const rect = enterWorldBtn.getBoundingClientRect();
      createBurst(rect.left + rect.width / 2, rect.top + window.scrollY + rect.height / 2);

      setTimeout(() => {
        if (loveLetterSection) {
          loveLetterSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 250);
    });
  }

  // "Watch Our Love Story Movie 🎬" -> Scrolls directly to Movie Theater
  if (watchStoryScrollBtn) {
    watchStoryScrollBtn.addEventListener("click", () => {
      const rect = watchStoryScrollBtn.getBoundingClientRect();
      createBurst(rect.left + rect.width / 2, rect.top + window.scrollY + rect.height / 2);

      setTimeout(() => {
        if (movieTheaterSection) {
          movieTheaterSection.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 250);

      // Ensure movie starts playing
      isMoviePlaying = true;
      if (moviePlayPauseBtn) moviePlayPauseBtn.textContent = "⏸";
      if (currentMomentIdx >= movieMoments.length - 1) {
        renderMovieMoment(0);
      }
    });
  }

  // ==========================================================
  // 6. LOVE LETTER: INTERACTIVE HUG STAMP
  // ==========================================================
  const stampLetterBtn = document.getElementById("stampLetterBtn");
  if (stampLetterBtn) {
    stampLetterBtn.addEventListener("click", () => {
      const rect = stampLetterBtn.getBoundingClientRect();
      createBurst(rect.left + rect.width / 2, rect.top + window.scrollY + rect.height / 2, ["💋", "💖", "🌸", "💕"]);
      stampLetterBtn.innerHTML = `<span>Hug Sent to Rehan!</span> 🥰`;
      stampLetterBtn.style.background = "var(--accent-pink)";
      stampLetterBtn.style.color = "#ffffff";
      setTimeout(() => {
        stampLetterBtn.innerHTML = `<span>Send a sweet hug to Rehan</span> 💖`;
        stampLetterBtn.style.background = "";
        stampLetterBtn.style.color = "";
      }, 3000);
    });
  }

  // ==========================================================
  // 7. SWEET MESSAGES: TODAY'S MESSAGE REVEAL
  // ==========================================================
  const revealMessageBtn = document.getElementById("revealMessageBtn");
  const revealedExtraMsg = document.getElementById("revealedExtraMsg");
  const dailyMessages = [
    "💌 Rehan, you are my favorite thought in the morning and my sweetest dream at night.",
    "☕ Just checking in to remind you that I believe in you with my whole heart today!",
    "🌸 No matter how far apart we are right now, you are always right here with me in spirit.",
    "✨ You make the entire world feel gentle and full of magic. Thank you for being you, Rehan.",
    "🫂 Sending you a big, warm teddy-bear hug right through your screen!"
  ];
  let dailyMsgIdx = 0;

  if (revealMessageBtn && revealedExtraMsg) {
    revealMessageBtn.addEventListener("click", () => {
      const rect = revealMessageBtn.getBoundingClientRect();
      createBurst(rect.left + rect.width / 2, rect.top + window.scrollY + rect.height / 2);

      revealedExtraMsg.textContent = dailyMessages[dailyMsgIdx];
      revealedExtraMsg.style.animation = "none";
      void revealedExtraMsg.offsetWidth;
      revealedExtraMsg.style.animation = "fadeInUp 0.5s ease";

      dailyMsgIdx = (dailyMsgIdx + 1) % dailyMessages.length;
    });
  }

  // ==========================================================
  // 8. REASONS WHY I LOVE YOU: EXTRA REASON GENERATOR
  // ==========================================================
  const generateReasonBtn = document.getElementById("generateReasonBtn");
  const extraReasonDisplay = document.getElementById("extraReasonDisplay");
  const extraReasons = [
    "🌸 The way your eyes crinkle with warmth when you're truly happy.",
    "☕ How you always listen so patiently when I'm sharing my thoughts.",
    "✨ How you make even ordinary days feel like special adventures.",
    "🫂 The comfort and peace that fills my heart whenever I think of you.",
    "💌 How you support my hopes, dreams, and little ideas with so much enthusiasm.",
    "🌙 How you're the first person I want to tell when anything good happens.",
    "💗 Just being your unique, wonderfully kind, and thoughtful self!"
  ];
  let reasonIndex = 0;

  if (generateReasonBtn && extraReasonDisplay) {
    generateReasonBtn.addEventListener("click", () => {
      const rect = generateReasonBtn.getBoundingClientRect();
      createBurst(rect.left + rect.width / 2, rect.top + window.scrollY + rect.height / 2);
      extraReasonDisplay.textContent = extraReasons[reasonIndex];
      extraReasonDisplay.style.animation = "none";
      void extraReasonDisplay.offsetWidth;
      extraReasonDisplay.style.animation = "fadeInUp 0.5s ease";
      reasonIndex = (reasonIndex + 1) % extraReasons.length;
    });
  }

  // ==========================================================
  // 9. SECRET SURPRISE: "Open a little secret 💗"
  // ==========================================================
  const secretBtn = document.getElementById("secretBtn");
  const secretMessage = document.getElementById("secretMessage");
  let isSecretRevealed = false;

  if (secretBtn && secretMessage) {
    secretBtn.addEventListener("click", () => {
      const rect = secretBtn.getBoundingClientRect();
      createBurst(rect.left + rect.width / 2, rect.top + window.scrollY + rect.height / 2, ["✨", "💖", "💌", "🌟"]);

      isSecretRevealed = !isSecretRevealed;
      secretMessage.classList.toggle("active", isSecretRevealed);

      if (isSecretRevealed) {
        secretBtn.innerHTML = `<span>Close the secret 💗</span>`;
        secretMessage.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        secretBtn.innerHTML = `<span>Open a little secret 💗</span>`;
      }
    });
  }

  // ==========================================================
  // 10. VIRTUAL HUGS COUNTER (SAVED IN LOCALSTORAGE)
  // ==========================================================
  const sendHugBtn = document.getElementById("sendHugBtn");
  const hugCountEl = document.getElementById("hugCount");
  let hugCount = 24;

  try {
    const savedHugs = localStorage.getItem("rehan_hug_count");
    if (savedHugs) {
      hugCount = parseInt(savedHugs, 10);
      if (hugCountEl) hugCountEl.textContent = hugCount;
    }
  } catch (err) {}

  if (sendHugBtn) {
    sendHugBtn.addEventListener("click", () => {
      hugCount++;
      if (hugCountEl) hugCountEl.textContent = hugCount;
      try {
        localStorage.setItem("rehan_hug_count", hugCount);
      } catch (err) {}
      const rect = sendHugBtn.getBoundingClientRect();
      createBurst(rect.left + rect.width / 2, rect.top + window.scrollY + rect.height / 2, ["🫂", "💖", "🥰", "🌸"]);
    });
  }

});
