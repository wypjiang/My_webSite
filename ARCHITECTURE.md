# Architecture

本文只描述仓库结构。

## 仓库分层

```
My_webSite/                         外层 git，remote 为 github.com/wypjiang/My_webSite
├── README.md
├── ARCHITECTURE.md
├── CONVENTIONS.md
├── .gitignore
├── .github/CONTRIBUTING.md
├── my-website/                     前端，独立 git
│   ├── .agents/skills/             本目录自己的 skills
│   ├── .scratch/                   本目录自己的 local markdown 工单
│   ├── AGENTS.md
│   ├── GLOSSARY.md
│   ├── docs/agents/                issue tracker、triage labels、domain docs 配置
│   └── docs/adr/                   本目录的 ADR
└── my-webSite-backend/             后端，独立 git
    ├── .agents/skills/
    ├── .scratch/
    ├── AGENTS.md
    ├── GLOSSARY.md
    ├── docs/agents/
    └── docs/adr/
```

## 两套独立上下文

`my-website` 与 `my-webSite-backend` 各是一个 single-context：

- 一份 `GLOSSARY.md`
- 一份 `docs/adr/`
- 一份 `.scratch/`
- 一份 `.agents/skills/`

外层仓库不设 `GLOSSARY.md`、不设 `.scratch/`、不设 `.agents/skills/`。

## 澄清与落盘

需求澄清发生在外层仓库这一处。澄清结束后，属于前端的词汇、ADR 和工单写入 `my-website`，属于后端的写入 `my-webSite-backend`。两个子目录不各做一次澄清。
