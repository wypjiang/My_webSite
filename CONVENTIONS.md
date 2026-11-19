# Conventions

## Skill 的归属

- `my-website` 使用 `my-website/.agents/skills`。
- `my-webSite-backend` 使用 `my-webSite-backend/.agents/skills`。
- 进入哪个子目录，就只读取该目录的 `AGENTS.md` 和 `docs/agents/`。
- 根目录不复制、不共享、不合并这两套 skills。

## 工单

两个子目录的工单模式都是 local markdown。

- 前端工单只写在 `my-website/.scratch/`。
- 后端工单只写在 `my-webSite-backend/.scratch/`。
- 一个功能一个目录：`.scratch/<feature-slug>/`
- 规格是 `.scratch/<feature-slug>/spec.md`
- 一张工单一份文件：`.scratch/<feature-slug>/issues/<NN>-<slug>.md`，从 `01` 编号
- 状态写在工单顶部的 `Status:` 行
- 状态词使用该目录 `docs/agents/triage-labels.md` 中的五个角色：`needs-triage`、`needs-info`、`ready-for-agent`、`ready-for-human`、`wontfix`

工单配置的全文在各子目录的 `docs/agents/issue-tracker.md`。

## 需求只澄清一次

后续需求只在仓库根目录澄清一次。

同一次澄清同时覆盖前端和后端。澄清结束后，再把已经确定的内容分别写入对应子目录的 `GLOSSARY.md`、`docs/adr/` 和 `.scratch/`。

禁止在 `my-website` 和 `my-webSite-backend` 里对同一需求分别执行 `/grill-with-docs` 或 `/grill-me`。

子目录里的 `/to-spec`、`/to-tickets`、`/triage`、`/wayfinder` 只消费这次澄清的结果，并只发布到本目录的 `.scratch/`。

## 领域文档

每个子目录保持 single-context：

- 词汇表是该目录根上的 `GLOSSARY.md`
- ADR 是该目录的 `docs/adr/NNNN-title.md`
- 读取规则在该目录的 `docs/agents/domain.md`

词汇和 ADR 在决定已经明确之后才写入。初始化时两份词汇表和两套 ADR 目录都还没有具体条目。

## Git

- 外层 git 管理 monorepo 边界和根目录文档。
- `my-website` 与 `my-webSite-backend` 各自一个 git，互不作为对方的工作区。
- 子目录里的 skills、`.scratch`、`GLOSSARY.md`、`docs/` 属于该子目录的 git。
