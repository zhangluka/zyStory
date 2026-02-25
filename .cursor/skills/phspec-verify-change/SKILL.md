---
name: phspec-verify-change
description: 校验实现与变更制品是否一致。适用于归档前确认实现完整、正确且一致时。
license: MIT
compatibility: Requires phspec CLI.
metadata:
  author: phspec
  version: "1.0"
  generatedBy: "0.0.1"
---

校验实现是否与变更制品（规范、任务、设计）一致。

**输入**：可指定变更名。未指定时从对话推断；含糊或有歧义时必须让用户从可用变更中选择。

**步骤**

1. **若未提供变更名，让用户选择**

   运行 `phspec list --json` 获取变更列表，用 **AskUserQuestion 工具** 让用户选择。展示有实施任务（存在 tasks 制品）的变更、各变更所用工作流模式，未完成任务标为「进行中」。**重要**：不要猜测或自动选择，始终让用户选择。

2. **查看状态以了解工作流**
   ```bash
   phspec status --change "<name>" --json
   ```
   解析 `schemaName`（所用工作流）及该变更有哪些制品。

3. **获取变更目录并加载制品**

   ```bash
   phspec instructions apply --change "<name>" --json
   ```
   从返回的 `contextFiles` 中读取所有可用制品。

4. **初始化校验报告结构**

   按三个维度建报告：**完整性**（任务与规范覆盖）、**正确性**（需求实现与场景覆盖）、**一致性**（设计遵循与模式一致）。每个维度可有 CRITICAL、WARNING、SUGGESTION 级别问题。

5. **校验完整性**

   **任务**：若有 tasks.md，解析 `- [ ]` / `- [x]`，统计完成数/总数。未完成任务记 CRITICAL，建议「完成任务：<描述>」或「若已实现请勾选」。**规范覆盖**：若有 `phspec/changes/<name>/specs/` 增量规范，提取 `### Requirement:` 需求，逐条在代码库中搜索关键词评估是否已实现；若明显未实现则记 CRITICAL「未发现需求：<需求名>」，建议「实现需求 X：<描述>」。

6. **校验正确性**

   **需求实现**：对增量规范中每条需求搜索实现证据，记录文件与行号，评估是否与需求意图一致；若偏离则记 WARNING「实现可能与规范偏离：<详情>」，建议「对照需求 X 审查 <file>:<lines>」。**场景覆盖**：对 `#### Scenario:` 场景检查代码是否处理条件、是否有测试；若明显未覆盖则记 WARNING「未覆盖场景：<场景名>」，建议「为场景补充测试或实现」。

7. **校验一致性**

   **设计遵循**：若有 design.md，提取关键决策（Decision/Approach/Architecture 等），核对实现是否遵循；若矛盾则记 WARNING「未遵循设计决策：<决策>」，建议「更新实现或修订 design.md」。无 design.md 则跳过并注明。**代码模式**：检查新代码与项目模式是否一致（命名、目录、风格）；明显偏离记 SUGGESTION「代码模式偏离：<详情>」，建议「考虑遵循项目模式：<示例>」。

8. **生成校验报告**

   **摘要表**：## 校验报告：<change-name>；Summary 表（Dimension: Completeness/Correctness/Coherence，Status）。**按优先级列问题**：CRITICAL（归档前必须修）、WARNING（建议修）、SUGGESTION（可选）；每条带可执行建议及文件/行引用。**结论**：有 CRITICAL 则「发现 X 个严重问题，归档前请修复」；仅 WARNING 则「无严重问题，Y 条警告可考虑，可归档（并改进）」；全部通过则「全部通过，可归档」。

**校验启发**
- 完整性：关注客观清单（勾选、需求列表）
- 正确性：关键词搜索、路径分析、合理推断，不要求绝对确定
- 一致性：关注明显不一致，不抠风格
- 不确定时优先 SUGGESTION 再 WARNING 再 CRITICAL
- 每条问题须有具体建议，尽量带 `file.ts:123` 引用

**降级**：仅 tasks.md 时只校验任务；有 tasks+specs 时校验完整性与正确性；全量制品时校验三维。始终注明跳过了哪些检查及原因。**输出格式**：清晰 Markdown、摘要表、按 CRITICAL/WARNING/SUGGESTION 分组、代码引用 `file.ts:123`、具体可执行建议，避免「考虑审查」等空泛表述。
