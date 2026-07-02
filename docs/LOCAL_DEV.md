# Локальная разработка (Windows / PowerShell)

> Production-сайт **без сборки** — см. [ARCHITECTURE.md](ARCHITECTURE.md).

## Production-сайт (MPA, корень репо)

```powershell
cd C:\Regpoint-site
npx --yes serve .
```

Открыть URL из вывода (обычно http://localhost:3000). **Не** использовать `file://`.

Альтернатива:

```powershell
python -m http.server 8080
```

---

## Прототип React (только `prototype/`)

Требует Node.js и npm. **Не** относится к production-сайту.

```powershell
cd C:\Regpoint-site\prototype
npm install
npm run dev
```

> В PowerShell 5.x нельзя писать `cd prototype && npm i` — используйте `;` или отдельные строки.

PowerShell 7+ поддерживает `&&`:

```powershell
cd C:\Regpoint-site\prototype; npm i; npm run dev
```

---

## Автотесты (Playwright)

```powershell
cd C:\Regpoint-site\tests
npm install
npx playwright install chromium
npm test
```

---

## Опционально: zip для FTP

Только перед релизом, **не** для ежедневной разработки:

```powershell
cd C:\Regpoint-site
python scripts/build-prod.py
```

Результат: `dist/` и `regpoint-site.zip`.
