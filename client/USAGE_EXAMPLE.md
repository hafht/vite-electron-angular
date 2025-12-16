# Cách sử dụng @creative-force/electron trong client

## Cấu hình đã thiết lập

### 1. Package Dependency
```json
{
  "dependencies": {
    "@creative-force/electron": "workspace:*"
  }
}
```

### 2. Build Scripts
- `predev`: Tự động build framework trước khi chạy dev
- `prebuild`: Tự động build framework trước khi build client

### 3. Vite Config
- Framework package được external trong build để không bundle vào output
- Package sẽ được resolve từ `node_modules` tại runtime

## Cách sử dụng

### Import trong Main Process

```typescript
// src/main/index.ts
import { createElectronApp } from '@creative-force/electron'

// Sử dụng
const appInfo = createElectronApp()
console.log('App:', appInfo.name)
```

### Import trong Preload

```typescript
// src/preload/index.ts
import { createElectronApp } from '@creative-force/electron'

// Sử dụng
const appInfo = createElectronApp()
```

### Lưu ý

1. **Development**: 
   - Framework tự động build trước khi `pnpm dev`
   - Nếu thay đổi framework code, cần rebuild: `pnpm --filter @creative-force/electron build`
   - Hoặc dùng watch mode: `pnpm --filter @creative-force/electron build:watch`

2. **Production Build**:
   - Framework tự động build trước khi `pnpm build`
   - Package sẽ được copy vào `node_modules` trong build output

3. **TypeScript**:
   - Types tự động resolve từ `node_modules/@creative-force/electron/dist/index.d.ts`
   - Không cần cấu hình thêm

4. **Runtime**:
   - Package được resolve từ `node_modules/@creative-force/electron/dist/index.cjs`
   - Đảm bảo framework đã được build (`dist/` folder tồn tại)

## Kiểm tra

1. Đảm bảo framework đã build:
   ```bash
   ls framework/dist/index.cjs
   ls framework/dist/index.d.ts
   ```

2. Kiểm tra workspace link:
   ```bash
   ls -la client/node_modules/@creative-force/electron
   # Should be a symlink to ../../framework
   ```

3. Test import:
   ```typescript
   import { createElectronApp } from '@creative-force/electron'
   // Should not have TypeScript errors
   ```

