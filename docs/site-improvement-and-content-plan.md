# Allied: улучшения, статьи и тексты

Рабочий план после публикации версии `00f08f2`, 31 октября 2026. Сайт уже работает в production. Рекомендации ниже не обозначают новые функции как уже реализованные.

## Актуальный статус — 1 ноября 2026

Дополнительное внедрение P2/P3 и новые измерения: [best-practices-2026-11-01.md](best-practices-2026-11-01.md).

[Свежий отчёт тестирования](production-check-2026-11-01.md): 23 теста, 42 production-страницы, 35 файлов; все выполненные проверки прошли. Таблица первоначальных рекомендаций ниже сохранена как исторический backlog: строки со словами «сейчас» нельзя считать текущим состоянием.

- Contact/Quote/Careers уже используют Apps Script и private Drive. По указанию владельца все уведомления временно направлены на alex@allied-plumbing.ca; публичные контакты сохранены. PDF-поля опубликованы, но доставка PDF-вложения ещё не подтверждена.
- Пререндер содержимого работает для 42 страниц. Canonical и sitemap проверены на production; полная матрица альтернативных доменов/слешей в новом проходе отдельно не повторялась.
- GA4 с согласием, события и защита от передачи PII реализованы; приём событий в GA4 DebugView остаётся отдельной проверкой. Нового mobile Lighthouse/CWV замера нет.
- Footer уже содержит Articles, Careers, Team, адрес Burnaby и info email. Формы имеют drafts/статусы/защиту от дублей. Встроенный Google form и fallback проверяются отдельно.
- Blog category/q сохраняются в URL. Related service/projects, review status и checklist добавлены. Все технические review пока pending.
- Все 5 анимаций внедрены; подробности и границы проверки — в animation-opportunities.md.
- Опубликовано 10 статей. Из 12 тем следующего цикла ниже **уже опубликованы №1, №2, №4, №5**. Остаются №3, №6–12: 8 новых статей; их технические утверждения требуют вычитки.
- Тексты From first enquiry… и вводные Quote/Careers/Contact уже присутствуют. Остальные заготовки ниже — предложения; историю компании, статусы проектов и личные комментарии сотрудников нужно подтверждать отдельно.


Материалы:
- [Проверка публикации и тесты](production-check-2026-10-31.md).
- [Где добавить анимацию](animation-opportunities.md).
- [Фотографии, список кадров и промпты](image-shot-list-and-prompts.md).

## 1. Порядок улучшений

| Приоритет | Где | Что изменить | Зачем / как принять |
|---|---|---|---|
| P1 | Все формы | Развести получателей Contact, Quote и Careers; проверить реальные inbox и обработку заявок | Контрольная заявка каждого типа должна оказаться у ответственного, а ошибка — остаться ошибкой |
| P1 | Careers | Проверить список действующих вакансий, регионы, занятость и обещания в highlights | Назначить ответственного и дату проверки; недействующие позиции закрыть |
| P1 | Careers / Quote | Решить PDF и загрузку файлов: поддерживаемый сервис, лимиты, типы, доступ, срок хранения, удаление | Сейчас файлы через форму не отправляются; ссылка на резюме и email работают как предусмотренные пути, существование ящика проверить отдельно |
| P1 | Projects | Подтвердить статусы семи новых кейсов и заменить иллюстрации настоящими обложками | У каждого кейса зафиксировать источник статуса и фото; не выдавать planned milestones за completion |
| P1 | Claims / About | Уточнить год основания, квалификации, лицензии, текущие территории и режим emergency dispatch | Публиковать конкретные действующие сведения; текущие 26+ — консервативный пересчёт по RFPQ 2025, не точная дата основания |
| P2 | Домен / SEO | Выбрать www или apex и правило слеша; согласовать redirects, canonical, sitemap и внутренние ссылки | Все альтернативы приходят к одному конечному адресу без лишней цепочки |
| P2 | React SEO | Пререндерить содержимое страниц, а не только метаданные | Сейчас отдельные title/canonical есть, основной текст CSR. Проверять содержимое HTML без JS; начать с Services, Projects, Blog |
| P2 | Аналитика | Подключить рабочий GA4/GTM или другой согласованный сборщик; события enquiry success, careers success, phone click | Сейчас dataLayer сам по себе не доказывает сбор аналитики. Не передавать имена, email, сообщения и URL резюме в analytics |
| P2 | Скорость | Измерить production на мобильном; проверить размер hero, декодирование видео, лишние картинки слайдера, LCP/CLS | Сохранить исходный Lighthouse/PSI результат и сравнивать после изменений; HTTP-тест не является измерением CWV |
| P2 | Шапка / внутренние страницы | Сократить пустые вертикальные области; единый ритм заголовок → вводный текст → действие | На 390 px CTA и начало содержания должны быть доступны без непропорциональной прокрутки; сохранить характерный pill nav |
| P2 | Команда | Единая портретная съёмка и короткие согласованные биографии | Не подставлять AI-портреты вместо сотрудников; согласие на публикацию |
| P2 | Footer | Добавить Blog, Careers, адрес Burnaby и контактный email; часы только после подтверждения | Информация находится с любой страницы; не перегружать основной nav |
| P2 | Формы | Сохранять введённые данные при переходе/сбое; фокус и сообщения об ошибках; защита от повторной отправки | Повторный submit не создаёт дубль, возвращение пользователя не теряет длинное сообщение |
| P3 | Блог | Объединить темы Heating & boilers и Boiler plants; фильтры хранить в URL | Не дробить шесть статей на почти одинаковые категории; поделиться ссылкой на результаты |
| P3 | Статьи | Добавить related service, related projects, reviewer и review date | Авторские материалы связаны с услугами; технические утверждения проходят проверку специалистом |
| P3 | Structured data | Добавить фактический LocalBusiness / Article JSON-LD | Только подтверждённые сведения, без выдуманных отзывов, рейтинга или current credentials |

### Замечания по конкретному коду

- `src/components/Footer.tsx:15` — Blog и Careers пока отсутствуют в footer navigation.
- `src/pages/Blog.tsx:5` — фильтры локальные; при обновлении или отправке ссылки состояние не сохраняется.
- `src/pages/BlogPost.tsx:12` — дата прописана текстом; в карточках уже Intl. При будущих публикациях вывести дату из post.date в одном формате.
- `src/pages/Team.tsx:8` — портреты уже кадрируются сверху; для планшетов проверить смешанные ряды и разную высоту биографий.
- `src/components/CareerApplication.tsx:49` — отправка идёт через общий Formspree; HR-маршрутизацию и отдельную доставку подтвердить.
- `src/components/LogoMarquee.tsx` — указать width/height у исходных img, если известны пропорции. Контейнер уже фиксирует высоту и уменьшает риск сдвига.
- `src/pages/Careers.tsx` — льготы в основном блоке уточнены, но highlights вакансий («Van provided», «Tuition support») всё ещё требуют подтверждения.

Правила доступности, размеров изображений и движения сверялись с [Vercel Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md). Это обзор и план; замечания не объявлены автоматически исправленными.

## 2. Какие статьи добавить

Уже опубликованы шесть материалов о Leigh, Ridgeview, Haro, ICBC, Crosstown и Collingwood. Следующий цикл должен закрывать вопросы клиентов, а не пересказывать те же шесть кейсов ещё раз.

| Очередь | Английский заголовок | Кому / намерение | Содержание | Связь / CTA | Что проверить до публикации |
|---|---|---|---|---|---|
| 1 | What to Include in a Mechanical Upgrade Request | Управляющий готовит запрос цены | Адрес, оборудование, проблема, drawings, доступ, сроки, фото | Quote + простой checklist | Реальный процесс приёма заявки Allied |
| 2 | Planning a Heating Shutdown in an Occupied Building | Strata / facility manager | Участники, окна доступа, уведомления, зависимости, handover; без обещания нулевого downtime | Haro / ICBC, обсудить shutdown scope | Одобренный пример графика и план коммуникации |
| 3 | Boiler Replacement or Repair: Information Your Contractor Needs | Владелец рассматривает варианты | Симптомы, история сервиса, доступные записи, критерии инженерного review | Boilers / maintenance | Проверка licensed specialist; не давать universal diagnosis |
| 4 | Preventive Maintenance Records That Help Building Teams | Facility team | Перечень оборудования, журнал, рекомендации, follow-up, ответственность | Maintenance enquiry | Обезличенный образец реального PM report |
| 5 | Project Turnover: What Belongs in an O&M Package? | Owner готовится принять систему | Manuals, startup records, drawings, обучение, outstanding items | Hillcrest / Capilano | Фактический стандарт комплектности Allied |
| 6 | Hydronic Heating and Domestic Hot Water: Two Different Building Needs | Strata / building owner | Общее объяснение двух контуров и интерфейсов на уровне владельца | Haro / commercial plumbing | Технический review; без эксплуатационных настроек |
| 7 | What to Discuss Before a School Heat Pump Upgrade | School facilities | Существующая система, электроснабжение, размещение, шум, access, phased scope | Herbert Spencer ASHP | Approved scope; не утверждать экономию и завершение |
| 8 | Coordinating Controls During a Boiler Plant Upgrade | Consultants / owner | Responsibility matrix, submittals, operating sequence, verification | Glenayre / ICBC | Одобренная финальная sequence или общий редакционный материал |
| 9 | Preparing a Building for a Chiller Replacement | Facility managers | Обследование доступа, lifting, supports, electrical readiness, startup, TAB | Collingwood / Capilano | Фактические фото, статус, approved lifting details не публиковать без разрешения |
| 10 | Why Testing and Balancing Belongs in the Project Programme | School / strata | Что проверяется на уровне процесса, когда нужен подрядчик, turnover | Services HVAC | Техническая вычитка TAB специалистом |
| 11 | Working in Schools: Access, Sequencing and Communication | School owner | Согласование помещений и времени, separation, school contacts | Garibaldi / Leigh | Не обещать универсальные сертификаты или разрешения |
| 12 | From Apprentice to Site Lead: Mechanical Career Paths | Кандидаты | Разница ролей, опыт, документы, вопросы на собеседовании | Careers | Интервью реального сотрудника; только действующие условия |

Формат: ориентир 600–900 полезных слов, конкретный вопрос читателя, 3–5 разделов, 1 checklist, 1 связанный проект, 1 услуга, 1 CTA. Для сложной темы лучше диаграмма, чем длинный абзац. Число слов не KPI качества. Публиковать после фактической и технической вычитки, с настоящей датой публикации/обновления; не менять дату только ради свежести.

Первая партия: №1, №2, №4, №5. Они помогают подготовить более качественную заявку и собрать полезные документы. №7–10 требуют больше инженерной проверки.

## 3. Какой текст добавить и где

Ниже готовые английские заготовки для следующего изменения. Это редакционные предложения, ещё не добавленные на сайт. Там, где нужны сведения компании, дано условие, а не выдуманный факт.

### Home — под первым экраном, блок из трёх шагов

**Heading:** From first enquiry to a defined scope.

1. **Tell us about your building.** Share the location, the system involved and what you need help with. Available drawings and photographs can help us understand the request.
2. **Review the requirements.** We discuss access, timing and the information needed to assess the work. Some requests will require a site visit or consultant input.
3. **Agree the next steps.** Scope, scheduling and project-specific requirements are discussed before work proceeds.

Кнопка: **Discuss your project**. Не добавлять «ответим за 24 часа», пока SLA не согласован.

### About — между вводным текстом и командой

**Heading:** Built around existing buildings and the people who use them.

**Copy:** Mechanical upgrades connect new equipment with existing services, spaces and operating requirements. Our project work brings together installation planning, supporting trades, technical submissions and turnover documentation. For schools and occupied buildings, access and sequencing are part of the scope discussion from the start.

Добавить подтверждённую историю: год основания, 3–4 реальных этапа, текущая специализация. Не выводить дату «2000» только из расчёта 26+.

### Services — единый блок внизу каждой услуги

**Heading:** What helps us review your request?

**Copy:** Include your building address, the equipment or areas involved, a description of the issue or planned work, and any known access restrictions. If you have equipment details, drawings or photographs, tell us what is available. We can then discuss the information needed for a site review and the next steps for your scope.

Затем 3–5 пунктов scope именно этой услуги, примеры объектов, related case, CTA. FAQ различать по услуге, а не копировать одинаковые ответы.

### Projects — карточка и начало каждого кейса

Поля: **Client / Location / Project phase / Verified status / Scope / Allied’s role / Coordination / Photos / Related service**. Дата завершения и outcome — только при подтверждении.

**Status copy до подтверждения:** Project scope provided for reference. Final completion and closeout are to be confirmed.

**Photo caption временно:** Illustrative image from the Allied media library. Project-specific photography to follow.

После подтверждения заменить оба временных текста настоящим статусом и подписью фото. Отдельно подготовить информацию для Mamquam Phase 2 и SD43 Maintenance Shop: scope, дата, роль Allied, оборудование, статус, фото, разрешение клиента.

### Team — под каждой биографией

**Block label:** Areas of responsibility

Для Alex: **Project schedules, procurement, technical submissions and closeout coordination.**
Для Liam: **Project planning, estimating and HVAC/R delivery.**
Для Kyle: **Plumbing installations, service and plant upgrades.**
Для Allan: **Site supervision, field teams and trade coordination.**
Для Lance: **Company leadership, operations and client relationships.**
Для Nick: **Accounts and client support.**

Добавить короткий согласованный личный комментарий (30–50 слов) о работе сотрудника. Не писать от его имени без согласования. Ссылки LinkedIn — только подтверждённые профили.

### Quote — над формой и после успешной отправки

**Before:** A clear description helps us review your request. Tell us what is happening, where the equipment is located and whether there are access or scheduling restrictions. For urgent assistance, call 604-731-1000.

**After:** Your request has been received by our enquiry system. The team will review the details you provided. If the situation is urgent or changes before you hear from us, call 604-731-1000.

Это подтверждает приём системой, а не чтение конкретным сотрудником. Для файлов оставить фактический путь до полноценной реализации upload.

### Careers — перед списком ролей и блок процесса

**Before roles:** Explore the types of work in our service and project teams. Availability, location and requirements should be confirmed with the hiring team before you apply.

После проверки текущих вакансий указать дату проверки и убрать неопределённость для действительно открытых позиций.

**Heading:** What happens after you apply?

**Copy:** Share your experience, qualifications, availability and the kind of work you’re interested in. Your application details are sent for review. If there is a suitable opportunity, the hiring team can contact you to discuss the role and next steps.

Попросить HR определить: recipient, срок ответа, обязательные документы, этапы интервью, применение резюме в будущем и срок хранения. До этого не обещать interview/offer/конкретные benefits.

### Contact — адрес и маршрутизация

Добавить подтверждённый адрес **4085 2nd Avenue, Burnaby, BC V5C 3X1**; проверить актуальность перед обновлением. Указать, принимает ли офис посетителей. Рабочие часы и географию выездов заполнить после подтверждения.

**Copy:** For a service enquiry, include your location and a brief description of the issue. For planned work, tell us about the building, the equipment and your proposed timing. If you are unsure which service fits, describe the requirement and our team can help direct the enquiry.

### Blog — редакционная строка и полезные связи

Под вводным текстом: **Project stories and planning guides for building owners, facility teams and mechanical project stakeholders.**
На статье: автор, technical reviewer если действительно назначен, дата публикации/существенного обновления, краткий checklist, related service, related case, CTA. На главной оставлять 3 карточки, в каталоге — все статьи.

### Footer

Ссылки: About / Services / Projects / Team / Articles / Careers / Contact / Privacy. Компания, адрес, главный телефон, проверенный email и service area. Не дублировать длинный рекламный абзац.

## 4. План внедрения

1. Компания подтверждает recipients, почту, вакансии, год основания и статусы проектов.
2. Загружаются настоящие обложки и портреты, уточняются подписи.
3. Внедряются тексты Home/Services/Quote/Careers и единый footer.
4. Согласуются домен, canonical и slash; затем prerender содержимого.
5. Подключаются измерения заявок и скорости; сохраняется baseline.
6. Публикуется первая партия четырёх статей.
7. Добавляются максимум две приоритетные анимации, проверяются keyboard/reduced-motion/mobile.

## 5. Чего не добавлять

Выдуманные отзывы, звёзды, «100% satisfaction», неподтверждённую экономию, точные response times без SLA, случайные портреты сотрудников, AI-снимки под видом реальных объектов, схемы газовых работ как инструкцию для самостоятельного ремонта. Эти блоки не заменяют подтверждённые кейсы, удобную форму и фактические условия услуг.
