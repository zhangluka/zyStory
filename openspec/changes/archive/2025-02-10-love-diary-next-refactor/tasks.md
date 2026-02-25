## 1. 项目与依赖初始化

- [x] 1.1 使用 Create Next App 初始化 Next.js 项目（App Router、TypeScript、Tailwind、ESLint）
- [x] 1.2 在 Tailwind 配置中扩展主题色（primary、secondary、cta、background、text、border 等，与现有一致）
- [x] 1.3 配置 next/font：接入 Archivo 与 Space Grotesk
- [x] 1.4 初始化 shadcn/ui，安装并添加所需组件：Button、Input、Dialog、Form、Label、Select、Textarea（及 Form 相关）
- [x] 1.5 安装 Lucide React、React Hook Form、Sonner

## 2. 布局与单页骨架

- [x] 2.1 在 app/layout.tsx 中应用字体、全局样式与 Sonner 的 Toaster
- [x] 2.2 在 app/page.tsx 中按顺序渲染占位或空壳：Hero、Statistics、Timeline、Gallery（组件可先只输出标题或占位）

## 3. Hero 区块

- [x] 3.1 实现 components/sections/Hero.tsx：标题 "Love Diary"、副标题 "记录我们的美好瞬间"，使用主题色与指定字体

## 4. Statistics 区块

- [x] 4.1 实现 components/sections/StatsSection.tsx：四个统计卡片（天在一起、珍贵回忆、美好照片、未来可期）
- [x] 4.2 在 StatsSection 内实现「天在一起」：从固定开始日期（如 2023-01-01）计算到当前日期的天数
- [x] 4.3 接收 memoriesCount 与 photosCount 作为 props 并显示；「未来可期」固定显示 ∞

## 5. Timeline 区块

- [x] 5.1 实现 components/sections/TimelineSection.tsx：展示「我们的时光」标题与时间线列表
- [x] 5.2 定义 Memory 类型（date、title、content、location?、tag?），TimelineSection 接收 memories 数组为 props
- [x] 5.3 使用与原版一致的初始/种子回忆数据（至少 3 条），在 page 或组件内作为默认 state

## 6. Gallery 区块

- [x] 6.1 实现 components/sections/GallerySection.tsx：照片墙网格，每项含图片与 caption（如 hover 显示）
- [x] 6.2 使用占位图（如 picsum）或静态资源填充初始 8 张照片及说明

## 7. 添加回忆流程（FAB、Dialog、表单、Toast）

- [x] 7.1 实现 AddMemoryFab 组件：固定右下角 FAB，点击打开添加回忆弹窗
- [x] 7.2 实现 AddMemoryDialog：使用 shadcn Dialog，内含表单（标题、日期、回忆内容、地点、标签 select）
- [x] 7.3 使用 React Hook Form 绑定表单字段，标题/日期/回忆内容必填，地点可选，标签为下拉
- [x] 7.4 表单提交时：校验必填项，将新回忆追加到 page 的 memories state，关闭 Dialog，调用 Sonner 显示「回忆添加成功！」Toast
- [x] 7.5 实现取消/关闭 Dialog 不保存（按钮与点击遮罩关闭）

## 8. 状态串联与数据流

- [x] 8.1 在 app/page.tsx 中维护 memories state（初始为种子数据），将 memories 与 setMemories（或 onAddMemory）传给 TimelineSection 与 AddMemoryDialog
- [x] 8.2 将 memories.length 作为 memoriesCount、Gallery 项数作为 photosCount 传给 StatsSection
- [x] 8.3 确认添加回忆后 Timeline 即时更新、珍贵回忆数字 +1、Toast 出现且 Dialog 关闭

## 9. 样式与收尾

- [x] 9.1 统一各 section 与 Dialog 的圆角、阴影、间距，使视觉与原版 Love Diary 风格一致
- [x] 9.2 响应式：在 768px 以下调整 Timeline、Gallery 网格与 FAB 位置（与原版 media query 对齐）
- [x] 9.3 可选：在 next.config 中配置 output: 'export' 并验证静态构建通过
- [x] 9.4 可选：更新 README 说明如何运行与构建；视需要保留或移除 love-diary-minimal.html
