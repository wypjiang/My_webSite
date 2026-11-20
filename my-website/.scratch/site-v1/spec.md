Status: ready-for-agent

# 第一版公开页

## Problem Statement

访客打开站点时，应该能读到站主是谁、正在听什么、值得看的热点、文章、书籍和链荐。招聘账号要能读完 Project。管理员要能改公开内容和 Project。页面需要有简约、北欧、文艺的阅读感，而不是一张纯白清单或一排卡片。助手先只留入口。

## Solution

用 Vue 做出一册暖纸读物。浏览器只向我们自己的 HTTP 接口要数据。访客看到简介、放大的音乐、三条带编号的目录和链荐。招聘账号登录后多出一份只读的项目目录。管理员在同一套版式里修改 Profile、链荐和 Project。助手在页脚，点开只说明尚未接入。

## User Stories

1. As a 访客, I want the public page to use a warm ivory ground and ink-colored text, so that the page feels like paper rather than a blank screen.
2. As a 访客, I want the site name and section titles set in a Chinese serif, so that the page has a literary voice.
3. As a 访客, I want body text in a sans serif with loose line spacing, so that long lines stay readable.
4. As a 访客, I want pine green only on thin rules and link underlines, so that the color stays quiet.
5. As a 访客, I want one column of content with wide margins, so that the page feels spacious on a desktop.
6. As a 访客, I want the same single column on a phone, so that I do not have to learn a second layout.
7. As a 访客, I want all interface copy in Chinese, so that I can read the page without switching language.
8. As a 访客, I want a large site name at the top, so that I know whose site I have opened.
9. As a 访客, I want to read the single Profile under the site name, so that I know who the owner is and what they are doing now.
10. As a 访客, I want the Profile to remain a few sentences on the home page, so that it does not become its own destination.
11. As a 访客, I want no navigation item for 我的 or 简介, so that the short introduction is not presented as a section I must open.
12. As a 访客, I want the music 刷新项 to occupy more of the page than the other 刷新项, so that the current music is the visual focus.
13. As a 访客, I want the music block to show the song title and the artist in large type, so that I can read it without opening a player chrome.
14. As a 访客, I want a link from the music block to the source, so that I can open the song elsewhere.
15. As a 访客, I want 热点, 文章, and 书籍 to appear as a numbered index after the music, so that I can scan titles the way I scan a table of contents.
16. As a 访客, I want each index line to show its kind, its number, its title, and a link, so that I can tell a hot topic from an article or a book.
17. As a 访客, I want to refresh one kind and see another batch of that kind, so that I am not stuck with the first titles.
18. As a 访客, I want the other kinds to stay as they were when I refresh one kind, so that a refresh does not scramble the whole page.
19. As a 访客, I want a failed refresh to leave the previous titles in place and show a short Chinese notice, so that the page does not go blank.
20. As a 访客, I want an empty kind to show a quiet empty line, so that a missing upstream does not break the column.
21. As a 访客, I want the 链荐 list after the index, so that the owner's own links are separate from the refreshed titles.
22. As a 访客, I want each 链荐 to show the owner's words and an underlined link, so that I can follow a recommendation the owner actually wrote.
23. As a 访客, I want an empty 链荐 list to leave the section heading and no broken link, so that a new site still looks finished.
24. As a 访客, I want no Project titles anywhere on the public page, so that work summaries stay off the open internet.
25. As a 访客, I want no link, button, or teaser that leads to Project, so that I cannot stumble into the recruiter reading.
26. As a 访客, I want the login switch in the footer, so that signing in is available without dominating the reading.
27. As a 访客, I want the login switch to accept either the 管理员 or the 招聘账号, so that both identities enter through the same control.
28. As a 访客, I want a wrong secret to leave me logged out and tell me in Chinese that it failed, so that I do not see a half-signed-in page.
29. As a 访客, I want the 助手 to be one short line beside the footer, so that the entrance exists without becoming a chat panel.
30. As a 访客, I want opening the 助手 to say that it is not connected yet, so that I understand the first version has no conversation.
31. As a 访客, I want that notice to contain no message box and no send button, so that I am not invited to talk to an absent model.
32. As a 访客, I want no illustrated banner and no rounded cards, so that the page does not look like a blog template or a dashboard.
33. As a 招聘账号, I want the same warm-paper column after I log in, so that the private reading still belongs to the same site.
34. As a 招聘账号, I want a project index added to that column, so that I can read every Project the owner has published for recruiters.
35. As a 招聘账号, I want each Project to show its title, summary, status, and link in reading order, so that I can finish it without decoding a card grid.
36. As a 招聘账号, I want the status to read 在做 or 已完成, so that I know whether the work is current.
37. As a 招聘账号, I want no edit, delete, or create controls, so that I cannot change the owner's words.
38. As a 招聘账号, I want logout to remove the project index immediately, so that the next person at the screen is a 访客 again.
39. As a 管理员, I want the same project index the 招聘账号 sees, so that I can check what recruiters will read.
40. As a 管理员, I want to change the Profile text and see it on the public page, so that the introduction stays current.
41. As a 管理员, I want to add a 链荐 only when it has both words and a link, so that every public recommendation can be opened.
42. As a 管理员, I want the page to refuse a 链荐 that has no link, so that I do not publish an empty endorsement.
43. As a 管理员, I want to edit and remove a 链荐, so that I can withdraw a link I no longer stand behind.
44. As a 管理员, I want to add a Project with a title, a summary, a status of 在做 or 已完成, and a link, so that recruiters can read a complete summary.
45. As a 管理员, I want the page to refuse a Project that is missing a title or a summary, so that the index never contains a blank entry.
46. As a 管理员, I want to edit and remove a Project, so that the recruiter index matches the work I still want to show.
47. As a 管理员, I want logout to hide both the project index and the editing controls, so that my session does not stay open on a shared screen.
48. As a 访客, I want the browser to load Profile, 链荐, and 刷新项 from our own interface only, so that my page still works without calling NetEase, Zhihu, or a model directly.

## Implementation Decisions

- The public site is a Vue 3 application built with Vite and TypeScript. The build is static files served from the same machine as the interface.
- The only seam is the HTTP interface owned by the backend. The page reads and writes through that interface. It does not call NetEase, Zhihu, 掘金, 微信读书, or a model.
- There is one public column. Its order is the site name, Profile, the music 刷新项, the numbered index of 热点 then 文章 then 书籍, then 链荐. The login switch and the 助手 line sit in the footer.
- Profile is rendered from the single public Profile resource. It has no route of its own.
- The music block is larger than each of the other three kinds. It shows title, artist, and a link. The other kinds are index lines: number, title, link.
- Refresh asks the interface for another batch of one kind. The page keeps the previous batch if the request fails.
- 链荐 renders as a bibliography. A missing link is not shown as a clickable row; the admin form will not submit one.
- Project is absent from the markup until the session role is 招聘账号 or 管理员. The project index uses the same paper, type, and pine rules.
- The login switch posts the shared login action and then reads the session role. 招聘账号 receives the project index only. 管理员 receives the project index plus editors for Profile, 链荐, and Project.
- Editors stay on the same paper column. They are not a separate admin theme.
- Project status is only 在做 or 已完成. The form offers those two and no third state.
- The 助手 control toggles a short Chinese notice. It does not mount a conversation, a text field, or a call to a model.
- Visual tokens are warm ivory ground, ink text, a Chinese serif for the site name and titles, a sans for body and index lines, and pine only for rules and underlines. There is no hero image and no card container.
- Copy that the interface itself writes is Chinese. Titles that arrive from upstream are shown as returned.

## Testing Decisions

- A good test proves what a 访客, a 招聘账号, or a 管理员 can see and do. It does not assert component internals, class names, or the shape of private state.
- The module under test is the running page against a fake of the HTTP interface. That fake is the one seam. Tests do not boot the Java process and do not call upstream services.
- Cover the public column order, the larger music block, a per-kind refresh, a failed refresh that keeps the old titles, the absence of Project while logged out, the read-only project index for 招聘账号, the editors for 管理员, the refusal of a 链荐 without a link, and the 助手 notice without a composer.
- There is no prior page test in this package. The application has not been written yet.

## Out of Scope

- Connecting the 助手 to a self-hosted model, to 百炼, or to 知乎直答.
- Drawing a dialog, a message list, or a prompt box for the 助手.
- Calling NetEase, Zhihu, 掘金, or 微信读书 from the browser.
- A second visual system for phones, a dark theme, an illustration banner, or rounded cards.
- Visitor registration, more than one 招聘账号, and a secret link to Project.
- Choosing the site name string. The page reserves a large name; the words themselves are content the owner supplies.
- ICP filing, the e 实例 purchase, and deploying the static files.

## Further Notes

- The backend spec for this same first version owns the HTTP contract, the two login identities, and the upstream caching. This page assumes that contract.
- ADR 0003 records why the page is a warm-paper reading layout. The glossary terms 访客, 管理员, 招聘账号, Profile, Project, 链荐, 刷新项, and 助手 are the only names to use in the interface and in later tickets.
