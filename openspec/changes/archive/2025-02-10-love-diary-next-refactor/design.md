## Context

当前 Love Diary 以单文件 `love-diary-minimal.html` 实现，包含内联 CSS、Google Fonts、Font Awesome、以及用于 Modal/表单/Toast/滚动动画的 vanilla JS。无后端、无路由、无构建步骤。重构目标是将该单页迁移到 Next.js 前端，引入统一 UI 与工具链，保持现有功能与视觉风格，并为日后扩展留出清晰结构。

## Goals / Non-Goals

**Goals:**
- 用 Next.js (App Router) 实现单页应用，保留 Hero、统计区、时光轴、照片墙、FAB、添加回忆弹窗与表单、Toast。
- 采用约定技术栈：Tailwind、shadcn/ui、Lucide、React Hook Form、Sonner；字体与主题色与现有一致。
- 回忆与统计用前端 state 管理，交互行为与原版等价（含添加回忆后更新计数与时间线）。
- 目录与组件划分清晰，便于后续加路由或接 API。

**Non-Goals:**
- 不接后端、数据库或认证；不实现数据持久化。
- 不在本阶段做多页面/多路由（首版仍为单页）。
- 不实现真实照片上传或图床（可继续占位图或静态资源）。

## Decisions

### 1. 框架与路由
- **选型**：Next.js 14+，App Router；单页仅使用 `app/page.tsx` 组合各 section，`app/layout.tsx` 负责字体、全局样式与 Toaster。
- **理由**：与既定栈一致，便于后续加 `app/about/page.tsx` 等路由。备选 Pages Router 亦可，但新项目优先 App Router。

### 2. 样式
- **选型**：Tailwind CSS；现有 `:root` 变量（primary、secondary、cta、background 等）映射到 `tailwind.config.ts` 的 `theme.extend.colors`。
- **理由**：与 shadcn/ui 及提案中的工具链一致，便于复用工具类并保持风格统一。备选：保留全局 CSS + CSS 变量 + CSS Modules，不引入 Tailwind。

### 3. UI 与组件
- **选型**：shadcn/ui（Button、Input、Dialog、Form 等）+ Lucide React 替代 Font Awesome。
- **理由**：组件可拷贝进项目、可改样式，与 Tailwind 搭配自然；Lucide 树摇、体积小。Modal/表单/Toast 由 shadcn/Radix 提供无障碍与焦点管理。

### 4. 表单与反馈
- **选型**：React Hook Form 处理添加回忆表单；Sonner 作为 Toast（在 layout 或 page 挂 `<Toaster />`）。
- **理由**：与提案一致，减少手写表单与通知逻辑；后续可加 Zod 做校验。

### 5. 动画
- **选型**：优先用 CSS（保留现有 keyframes 或迁移为 Tailwind animation）；若需更复杂入场/视口动画可引入 Framer Motion。
- **理由**：首版以功能与迁移为主，CSS 足够覆盖现有效果；Framer Motion 作为可选依赖，按需引入。

### 6. 目录与状态
- **结构**：`app/layout.tsx`、`app/page.tsx`；`components/sections/`（Hero、StatsSection、TimelineSection、GallerySection）；`components/` 下 AddMemoryFab、AddMemoryDialog 及 shadcn `ui/`。
- **状态**：在一起天数在 StatsSection 内用 `useState`/`useEffect` 计算；回忆列表放在 `page.tsx` 的 state（或小型 React context），表单提交后 append 并下发给 Timeline 与 Stats（回忆数）。无服务端状态。

### 7. 构建与部署
- **选型**：若仅需静态站点，使用 `output: 'export'` 静态导出；否则默认 Node 服务器。
- **理由**：与提案一致，便于部署到任意静态托管或 Vercel。

## Risks / Trade-offs

| 风险 / 取舍 | 缓解 / 说明 |
|-------------|-------------|
| 回忆与计数仅存于内存，刷新即丢失 | 本阶段明确不持久化；后续接 API/DB 时再持久化。 |
| 引入较多依赖（Tailwind、shadcn、RHF、Sonner 等） | 均为常见、维护活跃的库；首版不引入 Framer Motion 可控制体积。 |
| 原 HTML 与 Next 版本短期并存 | 重构完成后可保留原文件作参考或删除，入口统一为 Next 应用。 |

## Migration Plan

1. 在项目根或约定目录初始化 Next 项目（App Router、TypeScript、Tailwind、ESLint）。
2. 配置 Tailwind 主题色与 `next/font`（Archivo、Space Grotesk）；接入 shadcn/ui、Lucide、React Hook Form、Sonner。
3. 按 section 迁移：先 layout 与 page 骨架，再 Hero、Stats、Timeline、Gallery，最后 FAB、Dialog、表单与 Toast；状态与交互对齐原版。
4. 验证：功能与视觉与原单页一致，可选静态导出并部署。
5. 视需要保留或移除 `love-diary-minimal.html`，并更新 README/文档。

无回滚复杂度：新旧入口独立，可随时切回原 HTML。

## Open Questions

- 首版是否引入 Framer Motion：若仅做入场/滚动动画，CSS 足够；若后续需要更复杂动效再加。
- 照片墙数据来源：继续占位图（如 picsum）或本地静态资源，待后续迭代再考虑上传/图床。
