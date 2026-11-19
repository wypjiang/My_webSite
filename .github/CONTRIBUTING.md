# Contributing

先读仓库根目录的 `CONVENTIONS.md` 和 `ARCHITECTURE.md`。

## 从哪里开始

1. 在仓库根目录把需求澄清一次。
2. 确认哪些结论属于 `my-website`，哪些属于 `my-webSite-backend`。
3. 进入对应子目录，把结论写入该目录的 `GLOSSARY.md`、`docs/adr/` 或 `.scratch/`。

不要在两个子目录里各开一次 grill。

## 可以改哪里

- 根目录文档只写仓库结构、skill 使用规则和全局约束。
- 子目录的 skill 配置在该目录的 `docs/agents/`。改工单存放方式时，改那一份 `issue-tracker.md`，不要改 `.agents/skills` 里的 skill 原文来指向另一个工单系统。
- 工单、规格、词汇和 ADR 都留在所属子目录。

## 提交

- 外层仓库与两个子目录是三个 git。提交时进入对应目录。
- 不要提交密钥、`.env` 或本地编辑器状态。
- `.scratch` 是工单记录，需要纳入所属子目录的版本库。不要把它写进忽略规则。
