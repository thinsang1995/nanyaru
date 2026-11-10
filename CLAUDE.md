# CLAUDE.md — nanyaru

## Verify & Git (agent harness)
- Verify: `bash scripts/verify.sh` (next typegen + tsc + eslint --max-warnings=0; không có test) | `--full` (+ next build).
- Package manager: yarn 4.5.3 (Berry). Không dùng npm; `package-lock.json` cũ đã xoá, không tạo lại.
- Nhánh tích hợp = `develop`. `main` = production (push main = deploy qua deploy.yaml), chỉ nhận PR release develop → main do người dùng merge. Agent: nhánh feature → PR vào `develop`; merge theo quy trình ở CLAUDE.md gốc (`~/Desktop/liberty/CLAUDE.md`, mục Git). Merge vào `develop` chạy CI (`ci.yml`; repo public nên không tốn phút): xem run của commit merge, đỏ → mở PR sửa; merge chỉ đổi `docs/**`/`*.md` thì không có run (`paths-ignore`).
- Session nền (cwd trong .claude/worktrees/*): làm theo plan đã chốt, không hỏi; review tại local (`code-reviewer` + `second-review.sh`) rồi push nhánh MỘT lần + mở PR tiếng Anh với `## Evidence` + báo.
- Git hook: `core.hooksPath` = `~/.claude/hooks/git` (user-level, do `install-hooks.sh` đặt; pre-push chặn push develop/main và chốt verify). `.githooks/` trong repo là bản dự phòng cho máy không có harness. Không đổi hooksPath tay.

## Stack
- Next.js 16 (App Router) + React 19 + TypeScript; eslint 9 flat config; prettier. Không có backend trong repo này.
- Không thêm dependency khi plan không nói. Không sửa file generated.
