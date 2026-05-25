# The Neural Architect | Project Vision & Specification

## 1. PROJECT VISION
The Neural Architect is a cinematic interactive digital universe. It is not a website to be browsed; it is an environment to be entered. The goal is to evoke a sense of **awe, curiosity, and emotional attachment** through a luxury-grade digital presence.

*   **Emotional Goal:** A feeling of sophisticated companionship and immersive discovery.
*   **Experience Goal:** A seamless, borderless journey where technology feels like a high-end cinematic product.
*   **Atmosphere:** Deep obsidian space punctuated by warm, environmental volumetric lighting and a soft, intelligent entity.
*   **Philosophy:** **Show, don't tell.** Every interaction must have physical weight and emotional consequence.

## 2. VISUAL DIRECTION
*   **Lighting:** Chiaroscuro-inspired. Absolute blacks (Obsidian) contrasted with warm, local volumetric light sources (Amber/Gold/Soft Blue). No global ambient light.
*   **Typography:** Oversized, monumental editorial systems. Kinetic reveals. Fonts: *Monument Extended* for structural impact, *Geist Mono* for technical precision.
*   **Materiality:** "Obsidian Glass." Heavy use of refractive materials (`MeshTransmissionMaterial`), 1px borders for glass edges, and subtle chromatic aberration on UI layers.
*   **Depth:** Layered Z-axis focus. Heavy use of depth-of-field (bokeh) to separate the atmospheric WebGL layer from the premium DOM HUD.

## 3. EXPERIENCE STRUCTURE
*   **Scene 1: The Arrival (Hero):** The mascot awakens. Atmospheric particles drift in warm light. Giant kinetic typography sets the narrative scale.
*   **Scene 2: The Synaptic Flow (Transitions):** Smooth camera dollying along Z-axis splines. The environment skews slightly based on scroll velocity.
*   **Scene 3: Archive of Realities (Projects):** Project showcases as floating spatial portals. Exploded isometric views of code and design layers.
*   **Scene 4: The Neural Core (AI Terminal):** A holographic OS interface where the mascot facilitates a conversation between the user and the system.

## 4. ANIMATED CHARACTER SYSTEM
The Mascot is the emotional anchor of the universe—a living, soft-bodied digital entity.
*   **Philosophy:** A presence that humanizes the obsidian void. Intelligent, responsive, and sophisticated.
*   **Behavior:** 
    *   **Cursor Sync:** Subtly rotates and shifts to maintain "eye contact" with the cursor light source.
    *   **Proximity Awareness:** "Purrs" or reacts with soft surface ripples when the cursor hovers nearby.
    *   **Scroll Response:** Tucks into a streamlined shape during high-velocity scrolls; expands during pauses.
    *   **Animation Language:** Pixar-like inertia. Soft, squishy physics simulated through vertex displacement and spring-based movement.

## 5. MOTION SYSTEMS
*   **Scrubbing:** Viscous Z-axis scrolling using Lenis and GSAP. 
*   **Inertia:** High-mass movement. Elements take time to settle, creating a "luxurious" weight.
*   **Easing:** Custom `expo.out` and `power4.inOut` curves. No linear motion allowed.
*   **Parallax:** Multiple depth planes (Background WebGL, Mid-ground Character, Foreground DOM HUD).

## 6. WEBGL ARCHITECTURE
*   **Structure:** Unified Next.js root-level architecture. No separate frontend/backend silos.
*   **Stack:** Next.js (App Router), React Three Fiber, Three.js, GSAP.
*   **Rendering:** Dual-layer. A background Canvas for environmental storytelling and a foreground DOM for premium UI.
*   **Shaders:** Custom GLSL for character soft-body physics, glass refraction, and atmospheric volumetric fog.
*   **Post-Processing:** `EffectComposer` pipeline: Volumetric Bloom, Chromatic Aberration, and a global Cinematic Grain overlay.

## 7. ENGINEERING RULES
*   **Coding:** Elite execution. Minimal, high-signal comments only. Abstraction-heavy motion logic.
*   **Git:** Human-readable, cinematic dev-log commits. No feat/fix/chore prefixes.
*   **Philosophy:** Performance-aware cinematic systems. Prioritize visual fidelity and motion quality.

## 8. IMPLEMENTATION ROADMAP
*   **Phase 1: The Void (Foundation) [COMPLETED]:** Consolidated project architecture to root level. API routes, Lenis/GSAP setup, Cinematic Render Pipeline base established.
*   **Phase 2: The Entity (Character System):** Build the mascot, implement cursor-follow and soft-body shaders.
*   **Phase 3: The Presence (Hero):** Atmospheric lighting, particles, and kinetic typography.
*   **Phase 4: The Archive (Projects):** Spatial portals and depth-layered project showcases.
*   **Phase 5: The Interface (AI Terminal):** Holographic glass terminal integration.
*   **Phase 6: The Final Grade (Polish):** Global shaders, performance tuning, and emotional pacing.

## 9. PERFORMANCE STRATEGY
*   **Budgeting:** Maintain 60fps on mid-tier hardware.
*   **Optimization:** Use GPGPU for particles, shader instancing for environment, and texture compression.
*   **Fallback:** Graceful degradation to high-quality 2D static atmospheric visuals for low-power devices.

## 10. CREATIVE REFERENCES
*   **MotionSites.ai:** Motion choreography and layout elegance.
*   **Refero Styles:** Atmospheric depth and soft UI language.
*   **Apple Vision Pro:** Spatial interactivity and glass materiality.
*   **Superhuman:** Clean, premium aesthetic efficiency.
