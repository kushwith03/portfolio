# Portfolio Project Instructions

## Mandatory Validation Workflow

Due to the project's complex cinematic scroll logic, scene synchronization, and viewport-dependent layouts, all changes must follow this strict validation process:

1.  **Implement Changes**: Apply targeted code modifications.
2.  **Local Verification**:
    *   Run `npm run dev` and manually verify behavior.
    *   **Scroll Sync**: Test top-to-bottom and bottom-to-top scrolling.
    *   **Navigation**: Confirm all navbar clicks land on correct sections and update scene highlighting.
    *   **Interactions**: Test animations, transitions, and component-level interactivity.
    *   **Viewports**: Test multiple sizes (Desktop, Laptop, Tablet, Mobile) to ensure no clipping or overlap with the fixed navigation rail.
3.  **Production Build**:
    *   Run `npm run build` to ensure zero TypeScript, linting, or compilation regressions.
4.  **Commit**: Only commit after both local verification and production build pass.
5.  **Deployment**: Push to `main` ONLY after successful local validation.

**Never push code immediately after implementation without local manual testing.**
