# P2/P3: внедрение и проверка — 1 ноября 2026

Рабочий сайт: https://www.alliedplumbing.ca/. Основные изменения опубликованы коммитом `d7e4879`; завершающая правка контраста опубликована коммитом `2d28157`. Backend Apps Script: версия 5. Уведомления всех типов по-прежнему временно направлены на alex@allied-plumbing.ca, публичные контакты сохранены.

## Что сделано

| Пункт | Текущее состояние и проверка |
|---|---|
| Домен и слеш | Выбран HTTPS + www + завершающий `/`. Проверены 28 сочетаний протокола, домена, слеша и старого GetQuote: все заканчиваются правильным HTTP 200, циклов нет. HTTPS-варианты требуют 0–1 redirect. Для части HTTP-вариантов остаются два перехода: HTTPS, затем канонизация. Поэтому требование одного перехода для абсолютно всех вариантов **не объявляется выполненным**; оно требует отдельной проверки возможностей edge-конфигурации хостинга |
| Canonical / sitemap / ссылки | Единая policy используется ссылками и статической сборкой. Contact больше не ссылается на GetQuote, исправлены noscript-ссылки. Sitemap содержит 42 канонических маршрута |
| React SEO | Основной HTML, а не только метаданные, пререндерится для всех 42 страниц. Services / Projects / Blog и статьи проверяются автоматическими тестами без выполнения JS |
| Аналитика | Реальный GA4 поток Allied Plumbing, `G-ZKZXJGTS54`, получает посещения. В Realtime непосредственно подтверждены `form_start`, `generate_lead`, `enquiry_success`, `careers_success` после контрольных production-заявок. Согласие требуется до загрузки Google tag |
| Защита аналитики | Runtime allowlist параметров; тест отбрасывает name/email/message/resume_url. Query/fragment/referrer не передаются кодом. В GA4 включены email redaction и 12 query-ключей: name, email, phone, message, address, resume_url, resume, firstname, lastname, full_name, token, requestid. Автоматический enhanced measurement выключен, используются контролируемые события |
| Phone click | Обработчик реализован. Браузерный инструмент заблокировал переход tel:, обход не выполнялся. Позднее phone_click появился в таблице GA4 Realtime: получение события подтверждено, сам звонок не выполнялся |
| Скорость | Сохранены новые mobile PSI baseline и повторный отчёт. Адаптивные srcset/sizes у карточек, услуг, команды и статей; исправлена повторная Cloudinary-трансформация; q_auto:eco. У логотипов реальные intrinsic размеры. Poster видео уменьшен, preload none сохранён. Google-формы lazy; скрытая вкладка и выход hero из viewport останавливают смену слайдов и загрузку новых кадров |
| Шапка и внутренние страницы | Сохранён pill nav и компактный ритм. В About CTA добавлен сразу после вводного текста и виден на 390 px. На 834 px карточки Team остаются в двух колонках без горизонтального overflow |
| Footer | Уже содержит About / Services / Projects / Articles / Careers / Team / Contact / Privacy, адрес Burnaby, телефон, email, service area; часы не добавлены |
| Формы | Подтверждён приём production Contact и Careers. Черновик имени/сообщения восстановился после перехода Contact → About → Contact; согласие осталось снятым. Сервер сохраняет UUID для dedup, короткий reference одинаков в письме/архиве/подтверждении. Сбой не становится успехом. Quote получает согласованный расширенный текст после отправки |
| Blog | Одна категория Heating & boilers; legacy Boiler plants отображается как эта категория. category/q сохраняются в URL, есть пустое состояние |
| Статьи | 10 материалов с author/date, checklist, related service/projects и CTA. Дата берётся из post.date. Technical reviewer и review date показываются только после настоящего review; пока статус pending, вымышленных имён нет |
| JSON-LD | HVACBusiness (подтип LocalBusiness) содержит подтверждённый адрес, телефон, email и географию. У всех 10 статей BlogPosting с headline, datePublished, author, image, canonical URL. Schema присутствует в HTML. Нет вымышленных отзывов, рейтингов, часов, dateModified или reviewer; 24-й тест проверяет эти условия |

## Тексты

Home: From first enquiry to a defined scope с тремя шагами и Discuss your project уже опубликован. About: Built around existing buildings… уже опубликован. Quote: вводный текст сохранён, подтверждение обновлено в Apps Script v5. Careers: перед ролями есть предупреждение об актуальности, после списка — What happens after you apply. Contact и Blog содержат предоставленные вводные тексты. Footer полностью доступен с любой страницы.

Удалены неподтверждённые Same-Day Quotes, часы офиса, Van provided и Tuition support. Вместо часов — просьба согласовать визит, вместо SLA — обсуждение scope/следующих шагов. Обещания на первом экране Careers и в FeatureRibbon заменены описанием фактического процесса. Информация о приёме посетителей не выдумана: предлагается связаться до визита.

## Измерение скорости

Один прогон до / один после, mobile Moto G Power, Slow 4G, Lighthouse 13.6.0. Полевых CrUX данных нет.

| Метрика | До | После |
|---|---:|---:|
| Performance | 92 | 95 |
| LCP | 3306 мс | 2509 мс |
| FCP | 1250 мс | 1539 мс |
| TBT | 0 мс | 0 мс |
| CLS | 0 | 0 |
| Speed Index | 2777 мс | 4003 мс |
| Accessibility | 96 | 96 |
| Best Practices / SEO | 100 / 100 | 100 / 100 |

LCP улучшился примерно на 24%, FCP и Speed Index ухудшились в этих прогонах. Один прогон не доказывает устойчивое изменение на всех устройствах. LCP 2509 мс находится около порога, но выше 2500 мс; прохождение CWV не заявляется. После замера затемнены Explore all и section-kicker для исправления конкретных contrast findings; новый accessibility score не измерялся.

Артефакты: [сравнение JSON](performance/mobile-2026-11-01-comparison.json), [baseline UI](performance/mobile-2026-11-01-before-ui.txt), [after UI](performance/mobile-2026-11-01-after-ui.txt), [доменные переходы](deployment/domains-2026-11-01.json). Ссылки на исходные PSI отчёты находятся в JSON.

## Финальная production-проверка

Проверена опубликованная сборка `2d28157`: 42/42 страницы и 36/36 JS/CSS доступны, entry совпадает с локальной сборкой, sitemap корректен, неизвестный URL возвращает 404, failures = []. Сохранён [машинный отчёт](production/best-practices-2026-11-01.json). Computed styles на живом сайте подтверждают затемнённые кнопку и section-kicker. Дополнительный Lighthouse score после изменения цветов не заявляется.

## Проверка и границы

Локально прошли ESLint, TypeScript, build и 24 теста. Тесты включают чтение статического HTML, factual schema, согласие GA4 и исключение персональных полей, ошибки/положительный ACK/дубли форм. Механический UI detector сообщил только предупреждение о gray-on-color в About: проверка показала серый вводный текст на белом фоне, а не внутри цветной кнопки; замена не нужна.

Production-заявки проверки: Contact `011126-193316-ADFC`, Careers `011126-193457-AE65`. Это тестовые записи без данных кандидатов. В GA4 подтверждены оба success-события; private analytics screenshot оставлен локально, в публичный репозиторий не добавлен.

Остаются: реальная техническая вычитка статей; подтверждение вакансий/условий и статусов проектов; inbox-доставка PDF и ручная проверка на физических iPhone/Android; отдельная анонимная сессия Google-form; edge-возможность сократить все HTTP-цепочки до одного перехода. Это фактические ограничения проверки, не обещание уже выполненной работы.

Для повторения: `npm run lint`, `npm run build`, `npm test`, `npm run test:production -- /tmp/allied-production.json`, `node src/scripts/check-domains.mjs /tmp/allied-domains.json`.

Основания: [Google LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business), [Google Article](https://developers.google.com/search/docs/appearance/structured-data/article), [AWS redirects](https://docs.aws.amazon.com/amplify/latest/userguide/redirect-rewrite-examples.html), [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md).
