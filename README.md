# Love Diary

基于 Next.js 的 Love Diary 单页应用，从原单文件 `love-diary-minimal.html` 重构而来。

## 技术栈

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** + 主题色（cyan/teal）
- **shadcn/ui 风格组件**（Radix UI + Tailwind）
- **Lucide React** 图标
- **React Hook Form** + **Sonner**（表单与 Toast）

## 运行与构建

```bash
# 安装依赖
pnpm install

# 开发
pnpm dev

# 生产构建（静态导出到 out/）
pnpm build

# 预览静态导出（需先 build）
npx serve out
```

## 说明

- 回忆与统计数据仅存于前端 state，刷新即重置；原版单文件 `love-diary-minimal.html` 仍保留于项目根目录作参考。
- 静态导出：`next.config.mjs` 已配置 `output: "export"`，构建产物在 `out/`，可部署至任意静态托管。
