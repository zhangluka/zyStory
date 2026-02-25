---
name: phspec-new-change
description: 新建 PhSpec 变更（制品工作流）。适用于用户想按步骤创建新功能、修复或改动时。
license: MIT
compatibility: Requires phspec CLI.
metadata:
  author: phspec
  version: "1.0"
  generatedBy: "0.0.1"
---

使用实验性制品驱动方式新建变更。

**输入**：用户请求应包含变更名（kebab-case）或要做的内容描述。

**步骤**

1. **若未提供明确输入，先问用户要做什么**

   使用 **AskUserQuestion 工具**（开放问题，无预设选项）询问：
   > "你想做哪个变更？描述你想做或要修的内容。"

   从其描述推导出 kebab-case 名称（如 "add user authentication" → `add-user-auth`）。

   **重要**：未弄清用户要做什么前不要继续。

2. **确定工作流模式**

   除非用户明确要求其他工作流，否则使用默认模式（不传 `--schema`）。

   **仅在用户提到以下情况时使用其他模式：**
   - 指定了某模式名 → 使用 `--schema <name>`
   - "show workflows" 或 "what workflows" → 运行 `phspec schemas --json` 让其选择

   **否则**：不传 `--schema`，使用默认。

3. **创建变更目录**
   ```bash
   phspec new change "<name>"
   ```
   仅当用户指定了工作流时才加 `--schema <name>`。
   会在 `phspec/changes/<name>/` 下按所选模式创建脚手架。

4. **查看制品状态**
   ```bash
   phspec status --change "<name>"
   ```
   可看到哪些制品待创建、哪些已就绪（依赖已满足）。

5. **获取第一个制品的指令**
   第一个制品由模式决定（如 spec-driven 下为 `proposal`）。
   在状态输出中找到第一个状态为 "ready" 的制品。
   ```bash
   phspec instructions <first-artifact-id> --change "<name>"
   ```
   会输出创建该制品所需的模板与上下文。

6. **在此暂停，等待用户指示**

**输出**

完成上述步骤后总结：
- 变更名与路径
- 所用工作流模式及其制品顺序
- 当前状态（0/N 个制品已完成）
- 第一个制品的模板
- 提示："要创建第一个制品了吗？直接说说这个变更要做什么，我来起草；或让我继续。"

**边界**
- 先不要创建任何制品，只展示指令
- 不要越过「展示第一个制品模板」这一步
- 若名称无效（非 kebab-case），请用户给出合法名称
- 若该名称的变更已存在，建议改为继续该变更
- 使用非默认工作流时传入 --schema
