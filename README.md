<img width="1920" height="1080" alt="presentation-lion-packages" src="https://github.com/user-attachments/assets/36482626-723e-4a7b-8007-24baef42d998" />


# @lion-npm/ui

A robust, multiplatform UI component library engineered for **React** and **Capacitor**. Build once and deliver native-feeling user experiences tailored across Web, Android (Material Design 3), and iOS (Cupertino).

---

## Key Features

- **Multiplatform Architecture:** Native adaptability across Web, Android, and iOS through explicit platform binding or automatic runtime detection via Capacitor.
- **Variant Harmonization:** Synchronized styling system supporting standard Bootstrap 5 variants alongside custom Lion enterprise themes (`lion-packages`, `lion-parking`, `lion-tech`, `lion-glam`).
- **Global UI State Management:** Built-in context provider managing loaders, modals, sidebars, and form error states effortlessly.
- **Strict Type Safety:** Developed entirely in TypeScript with strong interface definitions and prop validation.

---

## Installation

Install the package via your preferred package manager:

```bash
npm install @lion-npm/ui
# or
yarn add @lion-npm/ui
# or
pnpm add @lion-npm/ui
```

### Other dependencies

These dependencies are necessary for the library to be able to render all types of components.

```bash
npm install @capacitor/core bootstrap bootstrap-icons react-bootstrap @tanstack/react-table
```

---

## Quick Start & Context Setup

To enable global states (such as full-screen overlays, modals, and dynamic platform detection), wrap your application root with `LionUIComponentsProvider`:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { LionUIComponentsProvider, PlatformTypes } from '@lion-npm/ui';
import App from './App.tsx';
import '@lion-npm/ui/dist/style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LionUIComponentsProvider defaultPlatform={PlatformTypes.WEB}>
      <App />
    </LionUIComponentsProvider>
  </React.StrictMode>
);
```

---

## Consuming Components & Global State

Use the `useLionUI` hook to control global loader screens or pass explicit props to customize components locally:

```tsx
import { useLionUI, LoadingApp, LionButton, VariantTypes, PlatformTypes, ButtonTypes } from '@lion-npm/ui';

export default function DashboardView() {
  const { state, updateState } = useLionUI();

  const handleTriggerLoading = () => {
    updateState({ loading: true });

    setTimeout(() => {
      updateState({ loading: false });
    }, 3000);
  };

  return (
    <div className="p-4">
      <LionButton 
        onClick={handleTriggerLoading} 
        platform={PlatformTypes.WEB} 
        type={ButtonTypes.BUTTON} 
        variant={VariantTypes.PRIMARY}
      >
        Show Global Loader (3s)
      </LionButton>

      {state.loading && (
        <LoadingApp 
          appName="Lion Workspace" 
          loadingText="Synchronizing data..." 
          platform={PlatformTypes.WEB} 
          variant={VariantTypes.PRIMARY}
        />
      )}
    </div>
  );
}
```

---

## Available Components

- **`LionButton`**: Multiplatform button component supporting native variants, shapes, and button types.
- **`LionTitle`**: Dynamic page/section headers with right-aligned contextual actions.
- **`LoadingApp`**: Full-screen loading overlay synchronized with global state and tailored to host platforms.
- **`LoadingBar`**: Top-level progress loading bar for task feedback.
- **`DataTable`**: High-performance data table supporting pagination, multi-row selection, sorting, custom buttons, and localization (`es`, `en`).
- **`Selects` & `Inputs`**: Custom form controls styled for seamless Bootstrap and Lion variant integration.

---

## Development & Scripts

If you are contributing to or building the library playground locally:

```bash
# Start Vite development server
npm run dev

# Run TypeScript type check and build package
npm run build

# Preview production build locally
npm run preview

# Run Oxlint / Linter check
npm run lint
```

---

## License

MIT © Lion UI Team
