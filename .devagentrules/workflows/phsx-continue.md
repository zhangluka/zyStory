# PHSX: Continue

继续变更：创建下一个制品

继续当前变更：创建下一个制品。

**输入**：可指定变更名。未指定时从对话上下文推断；若含糊或有歧义，必须让用户从可用变更中选择。

**步骤**

1. **若未提供变更名，让用户选择**

   运行 `phspec list --json` 获取按最近修改排序的变更列表，再用 **AskUserQuestion 工具** 让用户选择要继续的变更。

   将最近修改的 3～4 个变更作为选项展示，包含：变更名、工作流模式（有 `schema` 字段则用其值，否则为 "spec-driven"）、状态（如 "0/5 tasks"、"complete"、"no tasks"）、最近修改时间（来自 `lastModified` 字段）。将最近修改的变更标为「推荐」。

   **重要**：不要猜测或自动选变更，始终让用户选择。

2. **查看当前状态**
   ```bash
   phspec status --change "<name>" --json
   ```
   解析 JSON 了解当前状态。响应包含：`schemaName`、`artifacts`（"done"/"ready"/"blocked"）、`isComplete`。

3. **按状态行动**：

   **若全部制品已完成（`isComplete: true`）**：祝贺用户，展示最终状态，建议「全部制品已就绪！可以用 `/phsx:apply` 实施或归档。」并停止。

   **若有制品可创建**（存在 `status: "ready"`）：选第一个 ready 制品，运行 `phspec instructions <artifact-id> --change "<name>" --json`，解析 `context`、`rules`、`template`、`instruction`、`outputPath`、`dependencies`；先读依赖制品，按 template 填写，遵守 context/rules 但不抄入文件，写入 outputPath；说明创建了什么、接下来可做哪些；创建完一个制品后即停止。

   **若没有可创建制品（全部 blocked）**：展示状态并建议检查问题。

4. **创建制品后展示进度**
   ```bash
   phspec status --change "<name>"
   ```

**输出**：每次调用后展示创建了哪个制品、所用工作流、当前进度（N/M 已完成）、当前可创建的制品，并提示「要继续吗？说继续或告诉我下一步即可。」

**制品创建指引**：制品类型与用途由模式决定，以指令输出中的 `instruction` 为准。常见模式（spec-driven）：proposal → specs → design → tasks；proposal.md / specs/<capability>/spec.md / design.md / tasks.md 的用途见 schema。**重要**：`context` 与 `rules` 是给你的约束，不要将 `<context>`、`<rules>`、`<project_context>` 抄进制品。
