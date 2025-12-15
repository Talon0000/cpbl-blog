# CPBL Blog｜Next.js 全端社群平台

以 Next.js 打造的中華職棒（CPBL）主題社群平台，提供文章發佈、編輯、刪除，以及按讚、留言互動與 OAuth 登入功能，完整實作前後端整合流程。

---

## 🧩 專案功能

- 使用者註冊 / 登入（Google OAuth）
- 文章 CRUD（新增、編輯、刪除、查詢）
- 文章按讚、留言互動
- 登入狀態與權限控管
- 表單驗證與錯誤處理
- RWD UI 介面設計

---

## 🛠 使用技術

**Frontend**
- React
- Next.js（App Router）
- Tailwind CSS

**Backend / Server**
- Next.js Server Actions
- NextAuth（JWT / Session）
- MongoDB + Mongoose
- Zod（資料驗證）

**DevOps / Tooling**
- Docker（容器化專案）
- Git / GitHub

---

## ⭐ 技術亮點

- 在 **SSR 環境中直接操作資料庫**，減少 API 傳輸層，提高效能與資料一致性
- 使用 **NextAuth + JWT** 實作完整登入驗證流程
- 透過 **Zod** 統一前後端資料驗證規則，降低錯誤風險
- 使用 **Server Actions** 簡化前後端資料流
- 專案容器化（Docker），提升跨環境啟動一致性

---

## 🧠 專案角色

- 獨立完成專案開發
- UI 設計與前端實作
- 後端資料模型設計（User / Post / Comment）
- 登入驗證流程規劃
- 專案部署與版本控管

---

## 🚀 專案啟動方式

```bash
npm install
npm run dev -- -p3001
