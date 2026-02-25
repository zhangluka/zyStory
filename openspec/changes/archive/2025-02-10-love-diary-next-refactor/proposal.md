## Why

现有 Love Diary 以单文件 HTML（`love-diary-minimal.html`）实现，难以维护和扩展。重构为基于 Next.js 的前端应用可带来组件化、可测试性和统一工具链（样式、表单、弹窗、通知），并为后续接入后端或认证预留清晰结构。本阶段仅做前端迁移与 UI 工具链接入，不接后端或认证。

## What Changes

- 使用 Next.js (App Router) 搭建单页应用，保留现有功能：Hero、统计区（天数/回忆数/照片数）、时光轴、照片墙、FAB、添加回忆弹窗与表单、Toast 提示。
- 引入技术栈：Tailwind CSS、shadcn/ui、Lucide 图标、React Hook Form、Sonner；动画可选 Framer Motion 或保留 CSS。
- 字体通过 `next/font` 接入（Archivo、Space Grotesk），主题色与现有 cyan/teal 风格一致。
- 回忆数据与统计暂用前端 state 管理，不持久化；后续可再接 API/DB。
- 原单文件 `love-diary-minimal.html` 在重构完成后可保留作参考或移除，不作为运行时入口。

## Capabilities

### New Capabilities
- `love-diary-app`: 重构后的 Love Diary 单页前端应用，包含布局与路由、各 section 组件（Hero、Stats、Timeline、Gallery）、添加回忆流程（FAB、Dialog、表单、Toast）及前端状态管理；不包含后端或认证。

### Modified Capabilities
- （无：当前项目无现有 specs，无需求级变更。）

## Impact

- **代码**：新增 Next 应用目录（如 `app/`、`components/`），原 `love-diary-minimal.html` 可保留或删除。
- **依赖**：新增 Next.js、Tailwind、shadcn/ui、Lucide React、React Hook Form、Sonner；可选 Framer Motion。
- **构建与部署**：可采用静态导出（`output: 'export'`）部署至任意静态托管，或使用 Node 服务器。
- **系统**：仅前端，无 API 或数据库变更。
