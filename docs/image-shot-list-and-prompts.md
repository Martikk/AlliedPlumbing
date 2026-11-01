# Фотографии и промпты для Allied

План на 31 октября 2026. Сначала использовать реальные кадры из Cloudinary, сопоставленные с объектом. Раздел Projects должен показывать выполненные/текущие работы Allied, поэтому генерированная котельная не заменяет доказательное фото кейса. Иллюстрации для услуг и блога допустимы с соответствующим описанием. Логотип накладывать оригинальным SVG/PNG, а не просить модель рисовать его.

## Форматы и подготовка

Рекомендация для этого сайта, не обязательный стандарт: hero 2400×1350 и отдельный вертикальный crop 1200×1600; обложка кейса 1600×1200; статья 1600×900; портрет 1200×1500. Хранить оригинал, отдавать через Cloudinary адаптивные размеры и формат. Проверять каждый crop на телефоне: лицо, оборудование и важные детали не должны попадать под наклонный край. В кадре hero оставить слева около 40% спокойного пространства под белый заголовок.

Для каждого файла записать: объект, дата съёмки, автор/право использования, кто разрешил публикацию, люди и согласие, подпись, alt, расположение на сайте, статус «реальное фото / иллюстрация». Убирать из публичной версии персональные данные, экраны с учётными данными, номера ключей и конфиденциальные чертежи.

## 1. Реальные фотографии проектов — первая очередь

Минимальный комплект на каждый кейс: **1 широкий общий кадр, 2 детали, 1 контекст объекта, 1 процесс работ**. Итого ориентир 70 кадров для 14 кейсов; на первом этапе достаточно по одной подтверждённой обложке на каждый объект. Before/after добавлять только при наличии настоящей пары с одинакового ракурса.

| Кейс / страница | Что именно снять или найти | Обложка |
|---|---|---|
| `/projects/icbc` | Общий вид plant, котлы, hydronic piping, существующие подключения, процесс перемещения оборудования | Котельная, а не городской skyline |
| `/projects/crosstown` | Level 4 mechanical room, размещение насосов/труб, проходы обслуживания, согласованные строительные интерфейсы | Широкий кадр mechanical room |
| `/projects/glenayre` | Котельная, hydronic equipment, разрешённый общий кадр DDC, крепления оборудования | Реальное оборудование Glenayre |
| `/projects/collingwood` | Чиллер, chilled-water connections, coils/UV при доступе, опоры, commissioning без закрытых данных | Чиллер в контексте здания |
| `/projects/capilano-birch` | Чиллер Birch, подключение к системе, сервисный доступ, оборудование после монтажа | Общий вид установки |
| `/projects/herbert-spencer-ashp` | ASHP именно Phase 1, расположение наружных блоков, piping, контекст школы | Не использовать котельную 2021 года |
| `/projects/hillcrest` | RTU Phase 2, общий вид площадки, соединения, подготовка turnover | Фактический RTU Hillcrest |
| `/projects/garibaldi` | Новая mechanical room, boiler plant, unit ventilators, RTU/MUA | Система на объекте Garibaldi |
| `/projects/ridgeview` | Plant с шестью IBC, unit ventilator в классе, piping | Настоящий общий вид plant |
| `/projects/leigh` | Unit ventilators, rooftop AHU, pumps, permitted school context | Вентиляция Leigh |
| `/projects/herbert-spencer` | Котельная 2021, boilers/pumps/insulation, housekeeping pads | Не смешивать с ASHP Phase 1 |
| `/projects/howe-sound` | Boiler plant, buffer tank, plate HX, distribution | Общий вид mechanical plant |
| `/projects/miller-park` | Boiler plant, UV, rooftop AHU, room finishes | Фактическая котельная Miller Park |
| `/projects/haro` | Viessmann CA3, DHW/heating connections, общий кадр помещения | Настоящая установка Haro |

### Промпт обработки настоящих фотографий кейсов

Использовать как image-edit prompt **с приложенным реальным исходным кадром**, а не для создания вымышленного объекта:

> Edit the supplied documentary photograph for the Allied Plumbing website. Preserve the exact equipment, quantities, piping routes, labels, building geometry and visible installation condition. Correct white balance, exposure, lens distortion and vertical perspective. Reduce sensor noise without removing technical detail. Do not add, remove, replace or finish any equipment. Do not change safety conditions or make unfinished work appear complete. Produce a natural editorial photograph, not a cinematic render. Crop to 4:3 with room around the equipment for an angled website mask. No added text, badges or logos.

Пример для ICBC: добавить “This is the ICBC boiler project reference photograph; retain the actual boiler and existing-building connections.” Для остальных подставить имя кейса из таблицы. Если кадр не подтверждён — сначала сопоставить его с объектом, а не менять подпись по предположению.

## 2. Люди и команда

| Нужно | Где | Как получить |
|---|---|---|
| Портрет Lance Clarke | Team, About | Новая съёмка или подтверждённый портрет из архива |
| Портрет Kyle Ellis | Team, service leadership | То же |
| Портрет Allan McDonald | Team, site coordination | То же |
| Единообразные портреты Liam, Alex, Nick | Team и главная | Перекадрировать существующие исходники; предпочтительно одна съёмка всей команды |
| Групповая фотография 4–8 сотрудников | About, Careers | Настоящая команда, с согласием каждого |

**Brief для фотографа / промпт обработки существующего портрета** — имя заменять на Lance, Kyle или Allan, обязательно приложить реальную фотографию:

> Create a polished editorial crop of the supplied real portrait of [NAME] for Allied Plumbing. Preserve the person’s identity, facial structure, age, skin texture and expression. Natural soft daylight, neutral charcoal or softly blurred workshop background, realistic colour. Head and shoulders fully visible with generous space above the hair and at both sides. Vertical 4:5 composition, eye level camera, professional and approachable. Do not change the person’s face, invent credentials, add a uniform or generate a different person. No text or logo.

Нельзя генерировать случайного человека и подписывать его именем сотрудника. Для группового кадра также нужна настоящая команда; генеративная «команда Allied» не подтверждает состав компании.

## 3. Общие иллюстрации — готовые промпты

Эти изображения можно генерировать для общих страниц. Подпись: “Illustration of mechanical services”, а не название реального проекта. Утверждённые фотографии сотрудников и объектов всё равно приоритетнее.

### A. Главная: механический подрядчик в BC

Место: hero, запасной статичный фон вместо нескольких повторяющихся изображений.

> Photorealistic editorial illustration for a British Columbia mechanical contractor website. Two adult tradespeople in appropriate clean workwear and site PPE inspect a commercial rooftop HVAC installation, with a subtle coastal mountain setting in the distance. Equipment occupies the right half; the left 40 percent is calm and dark enough for a white website heading. Natural overcast daylight, restrained charcoal, steel and muted red palette, honest documentary mood, realistic scale and plausible service access. No dramatic sparks, no unsafe roof-edge work, no lettering, no invented company logo. Wide 16:9 composition, no black bars.

### B. Services: boiler and hydronic systems

Место: `/services/boilers`, общая статья о планировании замены plant.

> Photorealistic editorial illustration of a tidy commercial hydronic mechanical room in British Columbia. Condensing boiler equipment, insulated supply and return pipes, circulation pumps and clear service aisles. Technically plausible equipment layout reviewed in appearance, no crowded impossible pipe connections. Soft practical lighting and realistic metal texture, neutral colours, natural camera perspective. Wide 16:9 composition with clear visual hierarchy around the plant. No people, no manufacturer names, no model numbers, no certification badges, no readable labels. General services illustration, not a depiction of a particular Allied project.

### C. Maintenance: проверка оборудования

Место: `/services/maintenance`, обложка будущего maintenance checklist.

> Photorealistic editorial illustration of an adult HVAC service technician inspecting accessible commercial mechanical equipment with a handheld meter and a tablet. Appropriate PPE and a calm, methodical posture; equipment remains closed where live electrical access would be unsafe. Neutral industrial interior, natural practical lighting, credible proportions and hands. The tablet screen contains only an abstract non-readable checklist. Wide 16:9 with some negative space for a heading. No readable customer data, no badges, no brand lettering, no staged sparks or exaggerated repair damage.

### D. Careers: наставничество

Место: Careers перед формой, если ещё нет реальной фотографии команды.

> Editorial photographic illustration of two adult tradespeople, one experienced and one learning, reviewing a generic mechanical drawing at a clean workshop bench. Respectful collaborative posture, realistic workwear and appropriate PPE for a planning area, natural daylight, understated industrial background. Drawing details are non-readable and contain no client information. Wide 16:9 crop, generous headroom, no cropped faces, no fake company logos or employee name tags. Warm but professional mood. These are illustrative people, not portraits of named Allied employees.

### E. Contact: подготовка запроса

Место: Contact или Quote, вместо нерелевантного офисного/технологического фото.

> Editorial still-life photograph for a mechanical project enquiry page. A plain hard hat, unbranded clipboard, closed laptop and rolled generic building drawings on a clean workbench in a softly blurred mechanical workshop. No readable confidential plans, no contact details, no company or manufacturer logos. Natural daylight, realistic textures, dark charcoal and warm neutral palette. Wide 16:9, objects grouped on the right with uncluttered negative space on the left for white copy. No people, no artificial lens flare.

### F. Статья: документация при передаче объекта

Место: будущая статья про O&M/commissioning.

> Editorial photograph-style illustration of a building facilities professional reviewing a generic equipment operation folder and a digital checklist in a mechanical room. Focus on organised documentation and the equipment in the background, realistic adult hands, no legible names, passwords, customer records or engineering data. Clean practical lighting, restrained colours, credible workplace. Wide 16:9 composition, ample margin for cropping. No certificates, awards or fake brand marks. This is a conceptual illustration of project turnover.

## Очерёдность загрузки

1. По одной подтверждённой обложке ICBC, Crosstown, Collingwood, Glenayre, Capilano, ASHP и Hillcrest.
2. Три недостающих портрета; единое кадрирование всех шести.
3. Настоящая фотография команды для About/Careers.
4. По одной подтверждённой обложке старых семи кейсов.
5. Детали и before/after для полных галерей.
6. Общие иллюстрации A–F только там, где настоящего материала ещё нет.

Alt описывает видимое: “Boiler plant at Ridgeview Elementary” только после подтверждения объекта. Для чисто декоративного фона alt пустой. Не добавлять перечни ключевых слов в alt.
