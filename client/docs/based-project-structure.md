# Cấu trúc dự án Electron + Angular (renderer dùng Vite)

## Tổng quan
- `electron.vite.config.ts`: cấu hình Vite cho main/preload/renderer, plugin Angular, server port 5173.
- `tsconfig.node.json`, `tsconfig.web.json`: cấu hình TypeScript cho main/preload và renderer.
- `types/analogjs-vite-plugin-angular.d.ts`: khai báo type cho plugin Angular.

## Renderer Angular
```
src/renderer/
  index.html           # Mount <app-root>, load /src/main.ts
  tsconfig.app.json    # TS config riêng cho renderer (extends tsconfig.web.json)
  src/
    main.ts            # bootstrapApplication(AppComponent), import zone.js & styles
    styles.css         # global styles
    app/
      app.component.ts     # shell chính, hiển thị version Angular, bố cục hero + cards, include <app-project>
      project.component.ts # component test HMR, log lifecycle
```

## Main/Preload
```
src/main/index.ts      # Tạo BrowserWindow, load renderer (dev: ELECTRON_RENDERER_URL, prod: index.html)
src/preload/index.ts   # Preload scripts (nếu cần IPC/bridge)
src/preload/index.d.ts # Khai báo type preload
```
