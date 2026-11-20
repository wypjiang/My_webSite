Status: ready-for-agent

# 第一版 HTTP 接口

## Problem Statement

公开页需要一份稳定的中文内容：一段简介、一批带链接的刷新项、以及站主亲手写的链荐。Project 只能给招聘账号和管理员读。站主还要能改这些内容。浏览器不能拿着第三方密钥自己去拉网易云、知乎、掘金或微信读书。第一版也不提供助手对话。

## Solution

用 Spring Boot 提供一个 HTTP 接口，把 Profile、链荐、Project 和四种刷新项交给页面。数据放在本机的一个 H2 文件里。音乐从网易云官方接口来，热点从知乎官方热榜来并做缓存，文章和书籍从目前能取到的掘金热榜和微信读书飙升榜来。登录只有管理员和招聘账号两个身份。

## User Stories

1. As a 访客, I want to read the one Profile without logging in, so that I can see who the owner is.
2. As a 访客, I want exactly one Profile to exist, so that the page never has to choose between two introductions.
3. As a 访客, I want to read every 链荐 without logging in, so that I can open the links the owner recommends.
4. As a 访客, I want each 链荐 to include the owner's words and a link, so that a recommendation is always openable.
5. As a 访客, I want to read 音乐, 热点, 文章, and 书籍 without logging in, so that the public column can render.
6. As a 访客, I want each 音乐 item to include a title, an artist, and a link, so that the large music block has something to say.
7. As a 访客, I want each 热点, 文章, and 书籍 item to include a title and a link, so that the numbered index can point somewhere.
8. As a 访客, I want to ask for another batch of one kind, so that refresh changes only that kind.
9. As a 访客, I want a refresh of 热点 to reuse a cached 知乎热榜 when the cache is still fresh, so that my click does not spend the free quota of 100 calls.
10. As a 访客, I want 热点 to fall back to another domestic board we can already fetch when the 知乎 quota is exhausted, so that the index does not go empty after the free calls run out.
11. As a 访客, I want 音乐 to come from the official NetEase interface and to be cached, so that the site stays inside the daily allowance of 5000 calls.
12. As a 访客, I want 文章 to come from the 掘金 hot list, so that the article lines are titles we can actually fetch.
13. As a 访客, I want 书籍 to come from the 微信读书 rising list, so that the book lines are titles we can actually fetch.
14. As a 访客, I want a failed upstream call to keep the last good batch and say the refresh failed, so that I do not see an empty column or an upstream error body.
15. As a 访客, I want the response to contain no upstream credential, cookie, or raw provider payload, so that the page cannot leak the owner's keys.
16. As a 访客, I want a request for Project to be refused, so that work summaries are not public.
17. As a 访客, I want that refusal to be an authorization failure rather than an empty list, so that "no projects" is not confused with "projects are hidden".
18. As a 访客, I want no way to register an account, so that the site does not grow a third identity.
19. As a 招聘账号, I want to log in through the same login action the 管理员 uses, so that there is one entrance.
20. As a 招聘账号, I want a wrong secret to be rejected and to leave me logged out, so that a guess does not open Project.
21. As a 招聘账号, I want to read every Project after I log in, so that I see the same set every recruiter sees.
22. As a 招聘账号, I want each Project to include a title, a summary, a status of 在做 or 已完成, and a link, so that I can judge the work.
23. As a 招聘账号, I want creating, editing, or deleting a Project to be refused, so that I cannot change the owner's record.
24. As a 招聘账号, I want changing Profile or 链荐 to be refused, so that my login cannot edit the public page.
25. As a 招聘账号, I want logout to end that permission immediately, so that the next request for Project fails.
26. As a 管理员, I want to log in and be told my role is 管理员, so that the page can show editors.
27. As a 管理员, I want to replace the Profile text, so that the single introduction stays mine.
28. As a 管理员, I want to add a 链荐 with words and a link, so that the public list grows by one endorsement.
29. As a 管理员, I want a 链荐 without a link to be rejected, so that the public list never stores an unlinkable endorsement.
30. As a 管理员, I want to edit and delete a 链荐, so that I can correct or withdraw it.
31. As a 管理员, I want to add a Project with a title, a summary, a status, and a link, so that recruiters have a complete entry.
32. As a 管理员, I want a Project without a title or a summary to be rejected, so that the index cannot contain a blank work.
33. As a 管理员, I want a status other than 在做 or 已完成 to be rejected, so that the recruiter reading stays two-valued.
34. As a 管理员, I want to edit and delete a Project, so that the shared recruiter list stays current.
35. As a 管理员, I want only one 招聘账号 to exist, so that I do not manage a list of recruiters in the first version.
36. As a 管理员, I want the stored accounts to be exactly those two roles, so that a visitor cannot be promoted into a third kind of login.
37. As a 访客, I want no assistant completion endpoint, so that the footer notice is not backed by a model in this version.
38. As a 管理员, I want the data to survive a process restart from the H2 file on this machine, so that Profile, 链荐, and Project are not lost when the interface restarts.

## Implementation Decisions

- The interface is one Spring Boot application. The Vue page is the only client that matters. The one seam is this HTTP interface.
- Persistence is one H2 file on the same machine. There is no MySQL process and no separate database server.
- Accounts are two rows, one 管理员 and one 招聘账号. Login accepts a name and a secret and returns the role. A failed login creates no session. Logout drops the session. There is no registration.
- Authorization is role-based. Anonymous and 访客 may read Profile, 链荐, and 刷新项. They may not read or write Project, and they may not write Profile or 链荐. 招聘账号 may read Project and nothing else that 访客 cannot already read. 管理员 may write Profile, 链荐, and Project, and may read Project.
- Profile is a single record of text. A write replaces that text. A read never returns a list.
- 链荐 is an ordered list of records. Each record has the owner's words and a required link. Create and update reject a missing link.
- Project is an ordered list of records. Each record has a title, a summary, a status, and a link. Title and summary are required. Status is only 在做 or 已完成.
- A read of Project without 招聘账号 or 管理员 fails as unauthorized. It does not return an empty collection.
- 刷新项 has four kinds: 音乐, 热点, 文章, 书籍. A read returns the current batch for one kind. A refresh returns another batch of that same kind and leaves the other kinds alone.
- 音乐 is fetched from the official NetEase interface, then cached. The cache exists to stay inside 5000 calls a day. Each item exposed to the page has title, artist, and link.
- 热点 is fetched from the official 知乎热榜, then cached. A page refresh uses the cache while it is fresh, so the free allowance of 100 calls is not spent per click. When that allowance is exhausted, 热点 is filled from another domestic board the process can already fetch. The page still receives title and link, not a note about which board answered.
- 文章 comes from the 掘金 hot list. 书籍 comes from the 微信读书 rising list. Both are cached the same way and exposed as title plus link. 豆瓣 is not called.
- Upstream failures do not replace a good cached batch. The interface tells the client the refresh failed and keeps the previous batch. Upstream bodies, keys, and cookies are not part of the response.
- There is no route that completes an 助手 conversation, calls 知乎直答, or calls 百炼.
- Secrets for NetEase and 知乎 live in the server configuration, not in the H2 file and not in any response.

## Testing Decisions

- A good test proves the HTTP behavior: who may read, who may write, what a bad record is refused as, and what a refresh returns. It does not assert SQL, cache keys, or private mappers.
- The module under test is the HTTP interface. That is the one seam. Upstream NetEase, 知乎, 掘金, and 微信读书 sit behind a test double. Tests do not need those networks, and they do not render the Vue page.
- Cover anonymous reads, the Project refusal, both login roles, the 招聘账号 write refusal, the 链荐 link requirement, the Project title and status rules, a cached 热点 refresh that does not call 知乎 again, the fallback after the quota is exhausted, a failed upstream that preserves the last batch, and the absence of an 助手 completion route.
- There is no prior interface test in this package. The application has not been written yet.

## Out of Scope

- The warm-paper layout, type, color, and column order. Those belong to the page.
- Serving the static Vue build, buying the e 实例, and filing ICP.
- A self-hosted model, 知乎直答, 百炼, and any 助手 request that generates text.
- Visitor accounts, extra 招聘账号, and a secret URL for Project.
- MySQL, a second database, and 豆瓣.
- The unofficial NetEase service that its author stopped maintaining.
- Editing content through a path other than this HTTP interface.

## Further Notes

- The page spec for this same first version is the only intended client. Field names can be chosen during implementation as long as the roles, the required fields, and the four 刷新项 kinds stay as written here.
- Glossary terms to keep: 访客, 管理员, 招聘账号, Profile, Project, 链荐, 刷新项, 助手. ADR 0002 is the Java and Spring Boot decision. ADR 0004 is the H2 file. ADR 0001 is the read-only 招聘账号.
