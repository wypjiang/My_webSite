# My_webSite

外层仓库：https://github.com/wypjiang/My_webSite

本仓库是一个 monorepo，前后端都在这一个 git 里。远程是 https://github.com/wypjiang/My_webSite。`main` 同时包含两个子目录。前端改动用 `my-website` 分支，后端改动用 `my-webSite-backend` 分支。

| 目录 | 位置 |
| --- | --- |
| 前端 | `my-website` |
| 后端 | `my-webSite-backend` |

每个子目录各自有一套 Matt Pocock skills，以及自己的工单和领域文档。仓库根目录不安装第三套 skills。

| 内容 | 每个子目录中的位置 |
| --- | --- |
| Skills | `.agents/skills` |
| 工单 | `.scratch` |
| 领域词汇 | `GLOSSARY.md` |
| 架构决策 | `docs/adr` |
| Skill 配置 | `docs/agents`、`AGENTS.md` |

工单使用 local markdown。需求澄清只在仓库根目录进行一次。规则见 [CONVENTIONS.md](CONVENTIONS.md)，目录关系见 [ARCHITECTURE.md](ARCHITECTURE.md)，协作方式见 [.github/CONTRIBUTING.md](.github/CONTRIBUTING.md)。
