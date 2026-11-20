# 空白 Spring Boot 工程操作清单

这份清单只覆盖 `my-webSite-backend` 的空白基础工程。工程能编译、能启动、能做一次容器启动自检。没有业务实体、HTTP 接口、数据表、业务逻辑。

术语仍以根目录 `GLOSSARY.md` 为准。ADR 0002 决定接口用 Java 和 Spring Boot。ADR 0004 决定以后把数据放在本机 H2 文件里；这一步没有引入 H2，也没有建表。

## 要安装的 JDK

安装 **Java 21** 的 **JDK**，不要装 JRE。`pom.xml` 里 `<java.version>21</java.version>` 只接受 21。

推荐发行版：Eclipse Temurin 21 JDK，HotSpot，Windows x64。2026-11-20 查到的 winget 包是 `EclipseAdoptium.Temurin.21.JDK`，版本 `21.0.13.9`。同一大版本的更新补丁也可以。

下载页：<https://adoptium.net/temurin/releases/?version=21&os=windows&arch=x64&package=jdk>

安装时勾选设置 `JAVA_HOME`，并把 `%JAVA_HOME%\bin` 加入用户 `PATH`。安装完成后新开一个终端，再执行下面的检查。不需要单独安装 Maven，仓库里的 `mvnw.cmd` 会在第一次构建时下载 Maven 3.10.1。

```powershell
java -version
javac -version
echo $env:JAVA_HOME
```

预期：`java` 和 `javac` 都打印 `21`，`JAVA_HOME` 指向 JDK 根目录（该目录下有 `bin\javac.exe`）。

## 已执行的命令

以下命令已在这台机器上跑过。当时 `java`、`javac`、`mvn` 都不在 `PATH` 上，`JAVA_HOME` 为空。

确认本机没有 JDK 和 Maven：

```powershell
java -version
mvn -version
javac -version
```

确认 winget 可用：

```powershell
winget --version
```

结果：`v1.29.380`。

读取 Spring Initializr 当前元数据：

```powershell
$r = Invoke-WebRequest -Uri "https://start.spring.io/metadata/client" -UseBasicParsing
$text = [System.Text.Encoding]::UTF8.GetString($r.Content)
$json = $text | ConvertFrom-Json
$json.bootVersion.default
$json.javaVersion.default
$json.bootVersion.values | ForEach-Object { $_.id }
$json.javaVersion.values | ForEach-Object { $_.id }
```

结果：稳定版默认 `4.1.2.RELEASE`。可选 Java 为 `27`、`25`、`21`、`17`。工程选用 Java 21，Spring Boot `4.1.2.RELEASE`。

查询 Temurin 21 的安装包名：

```powershell
winget search Temurin.21 --source winget
```

结果：`EclipseAdoptium.Temurin.21.JDK`，版本 `21.0.13.9`。这个安装没有执行。

下载 Initializr 生成的空白工程到临时目录：

```powershell
$dest = Join-Path $env:TEMP "site-initializr"
New-Item -ItemType Directory -Path $dest | Out-Null
$url = "https://start.spring.io/starter.zip?type=maven-project&language=java&bootVersion=4.1.2.RELEASE&baseDir=app&groupId=site&artifactId=my-website-backend&name=my-website-backend&description=Blank%20HTTP%20service&packageName=site&javaVersion=21&dependencies=web"
Invoke-WebRequest -Uri $url -OutFile (Join-Path $dest "starter.zip") -UseBasicParsing
Expand-Archive -Path (Join-Path $dest "starter.zip") -DestinationPath $dest -Force
```

`dependencies=web` 在 Boot 4 里对应 `spring-boot-starter-webmvc`，测试依赖是 `spring-boot-starter-webmvc-test`。

核对写进仓库的 Maven Wrapper 与这次下载的原件一致：

```powershell
Get-FileHash "$env:TEMP\site-initializr\app\mvnw" -Algorithm SHA256
Get-FileHash "d:\project\My_webSite\my-webSite-backend\mvnw" -Algorithm SHA256
Get-FileHash "$env:TEMP\site-initializr\app\mvnw.cmd" -Algorithm SHA256
Get-FileHash "d:\project\My_webSite\my-webSite-backend\mvnw.cmd" -Algorithm SHA256
```

两边 SHA-256 相同。`mvnw` 为 `CAE96CEF89EBEA3531221F4AE17C23CF8EDF67D00EAE8306D4186AE1BBED4D02`，`mvnw.cmd` 为 `4A361E1374A3E5AD6D03E18E9ADC0CF181AC5058AC6203B76F0BA3B456B56481`。

没有执行、因此也没有验证通过的命令：

```powershell
winget install --id EclipseAdoptium.Temurin.21.JDK -e --accept-package-agreements --accept-source-agreements
.\mvnw.cmd test
.\mvnw.cmd spring-boot:run
```

## 相对 Initializr 压缩包删掉的内容

压缩包里的这些内容没有放进仓库：

- `HELP.md`：Initializr 的通用链接页。本文件代替它。
- `src/main/resources/static/` 和 `src/main/resources/templates/`：两个空目录。这个包不提供页面。
- `pom.xml` 里空的 `<url>`、`<licenses>`、`<developers>`、`<scm>`。

保留下来的依赖只有两个：`spring-boot-starter-webmvc`，以及测试范围的 `spring-boot-starter-webmvc-test`。没有 H2、JPA、JDBC、Security、Validation、Actuator。

`MyWebsiteBackendApplicationTests` 只有 `contextLoads()`。它检查 Spring 容器能否起来，不检查任何业务行为。

## 装好 JDK 之后的构建

在 `my-webSite-backend` 目录打开新的 PowerShell。

第一次会下载 Maven 3.10.1 和依赖，需要能访问 Maven Central。

```powershell
cd d:\project\My_webSite\my-webSite-backend
.\mvnw.cmd -version
.\mvnw.cmd test
```

`test` 通过的标志是 `MyWebsiteBackendApplicationTests` 里的 `contextLoads` 成功，构建结果为 `BUILD SUCCESS`。

启动进程：

```powershell
.\mvnw.cmd spring-boot:run
```

日志里出现 `Tomcat started` 和 `Started MyWebsiteBackendApplication` 后，进程听 `http://localhost:8080`。没有控制器，所以访问任意路径会得到 Spring 默认的 404。停止用 `Ctrl+C`。

打可运行包：

```powershell
.\mvnw.cmd -DskipTests package
java -jar .\target\my-website-backend-0.0.1-SNAPSHOT.jar
```

`target/` 是构建产物，已写进 `.gitignore`。

## 目录

```
my-webSite-backend/
├── pom.xml
├── mvnw
├── mvnw.cmd
├── .mvn/wrapper/maven-wrapper.properties
├── .gitignore
├── .gitattributes
├── src/main/java/site/MyWebsiteBackendApplication.java
├── src/main/resources/application.properties
├── src/test/java/site/MyWebsiteBackendApplicationTests.java
├── GLOSSARY.md
├── AGENTS.md
├── docs/adr/
├── docs/agents/
├── docs/bootstrap.md
├── .scratch/
└── .agents/skills/
```

| 路径 | 作用 |
| --- | --- |
| `pom.xml` | Maven 坐标 `site:my-website-backend:0.0.1-SNAPSHOT`，父 POM 为 Spring Boot `4.1.2.RELEASE`，Java 21 |
| `mvnw`、`mvnw.cmd` | Maven Wrapper 3.3.4。Windows 用 `mvnw.cmd` |
| `.mvn/wrapper/maven-wrapper.properties` | 指向 Maven `3.10.1`，`distributionType=only-script`，不提交 wrapper jar |
| `src/main/java/site/MyWebsiteBackendApplication.java` | 唯一启动类。包名 `site` |
| `src/main/resources/application.properties` | 只有 `spring.application.name=my-website-backend` |
| `src/test/java/site/MyWebsiteBackendApplicationTests.java` | 容器启动自检 |
| `GLOSSARY.md`、`docs/adr/`、`docs/agents/`、`.scratch/`、`.agents/` | 搭建前就有的术语、决策和 skills，这次没有改 |

## 从零再生成一次

已有仓库不要覆盖。下面这段只用于在空目录里重做同一份 Initializr 工程，然后再按上一节删掉 `HELP.md`、空的 `static/`、`templates/`，以及 `pom.xml` 里的空元数据节点。

```powershell
$dest = Join-Path $env:TEMP "site-initializr-redo"
if (Test-Path $dest) { Remove-Item $dest -Recurse -Force }
New-Item -ItemType Directory -Path $dest | Out-Null
$url = "https://start.spring.io/starter.zip?type=maven-project&language=java&bootVersion=4.1.2.RELEASE&baseDir=app&groupId=site&artifactId=my-website-backend&name=my-website-backend&description=Blank%20HTTP%20service&packageName=site&javaVersion=21&dependencies=web"
Invoke-WebRequest -Uri $url -OutFile (Join-Path $dest "starter.zip") -UseBasicParsing
Expand-Archive -Path (Join-Path $dest "starter.zip") -DestinationPath $dest -Force
```
