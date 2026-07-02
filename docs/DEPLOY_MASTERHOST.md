# Деплой на Masterhost — архив через панель

Production: **https://reg-point.ru**  
Хостинг: **Masterhost** — загрузка **вручную** через веб-интерфейс (файловый менеджер / FTP в панели), **не** через CI и не через отдельный FTP-клиент (если не нужен).

---

## Что выкладываем

Статический MPA **без сборки** в корне. Для удобства — готовый архив:

| Артефакт | Как получить |
|----------|----------------|
| `regpoint-site.zip` | `python scripts/build-prod.py` |
| Папка `dist/` | то же (содержимое архива) |

Архив включает: `index.html`, `404.html`, `.htaccess`, `robots.txt`, `sitemap.xml`, `css/`, `js/`, `img/`, `i18n/`, страницы (когда готовы).

**Не попадает в zip:** `prototype/`, `docs/`, `tests/`, `.cursor/`, `scripts/`.

---

## Пошагово (Masterhost)

1. Локально на ветке **`main`** (после PR из `develop`):
   ```powershell
   cd C:\Regpoint-site
   python scripts/build-prod.py
   ```
2. В панели Masterhost → **Файловый менеджер** (или встроенный FTP).
3. Открыть корень сайта **`reg-point.ru`** (обычно `www/` или `public_html/` — смотреть в панели).
4. **Загрузить** `regpoint-site.zip`.
5. **Распаковать** архив в корень домена (содержимое `dist/`, не вложенная папка `dist/`).
6. Проверить:
   - `https://reg-point.ru/` — главная
   - `https://reg-point.ru/404.html` или несуществующий URL → 404
   - `robots.txt`, `sitemap.xml`
   - HTTPS включён в панели Masterhost

---

## Обновление сайта

1. Изменения в **`develop`** → PR → **`main`**.
2. Снова `python scripts/build-prod.py`.
3. Загрузить новый `regpoint-site.zip`, распаковать с заменой файлов (или удалить старые статики и залить заново).

---

## Секреты

- Jivo ID, Metrika ID — уже в `js/config.js` (публичные).
- Пароли панели Masterhost — **не в git**.
- Email для privacy — добавить в `js/config.js` / `/privacy/` когда будет готов.

---

## Связанные документы

- `docs/BRANCHES.md` — ветки `develop` / `main`
- `scripts/build-prod.py` — сборка zip
- `.cursor/rules/deploy-ftp.mdc` — правило для агента
