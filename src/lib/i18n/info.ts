import type { Lang, PageDict } from "./types";

const de: PageDict = {
  // AppHeader
  "info.header.back": "Zurück",

  // Infos-Seite
  "info.infos.title": "Infos",
  "info.infos.subtitle": "Verständlich erklärt – ohne Bewertung deiner Situation.",
  "info.infos.mobbing.title": "Mobbing",
  "info.infos.mobbing.text":
    "Von Mobbing spricht man meist, wenn eine Person über längere Zeit immer wieder verletzt, ausgegrenzt oder herabgesetzt wird und sich schwer wehren kann. Ein einzelner Streit ist damit nicht gemeint – auch wenn er weh tun kann.",
  "info.infos.cybermobbing.title": "Cybermobbing",
  "info.infos.cybermobbing.text":
    "Cybermobbing passiert online: in Chats, sozialen Netzwerken oder Spielen. Typisch sind wiederholte Beleidigungen, das Verbreiten von Bildern oder Gerüchten oder das gezielte Ausschließen aus Gruppen. Screenshots können später hilfreich sein.",
  "info.infos.diskriminierung.title": "Diskriminierung",
  "info.infos.diskriminierung.text":
    "Diskriminierung bedeutet, dass jemand schlechter behandelt wird – zum Beispiel wegen Herkunft, Hautfarbe, Religion, Geschlecht, Behinderung, Alter oder sexueller Orientierung. Sie kann offen oder versteckt passieren.",
  "info.infos.beleidigungen.title": "Beleidigungen",
  "info.infos.beleidigungen.text":
    "Beleidigungen sind Äußerungen, die eine Person herabwürdigen. Sie können mündlich, schriftlich oder mit Bildern geschehen. Wie stark sie belasten, entscheidest nicht du allein an der Lautstärke – dein Empfinden zählt.",
  "info.infos.bedrohungen.title": "Bedrohungen",
  "info.infos.bedrohungen.text":
    "Bei Bedrohungen wird jemandem Schaden angekündigt. Wenn du dich unsicher fühlst, kannst du dir Unterstützung holen – etwa bei einer Vertrauensperson oder in einer akuten Situation beim Notruf 110.",
  "info.infos.card.mobbing.title": "Ist das Mobbing?",
  "info.infos.card.mobbing.desc": "Fragen, die dir beim Einordnen helfen können",
  "info.infos.card.rechte.title": "Deine Rechte kennen",
  "info.infos.card.rechte.desc": "Handlungsmöglichkeiten im Überblick",
  "info.infos.footer":
    "Diese Infos sind allgemein gehalten. StandUp stellt keine Diagnose und bewertet deine Situation nicht automatisch.",

  // Rechte-Seite
  "info.rechte.title": "Deine Rechte",
  "info.rechte.subtitle": "Ein Überblick über mögliche Wege.",
  "info.rechte.hinweis":
    "Diese Informationen sind allgemein. Sie ersetzen keine rechtliche Beratung und treffen keine verbindlichen Entscheidungen.",
  "info.rechte.schule.title": "In der Schule",
  "info.rechte.schule.text":
    "Schulen haben eine Fürsorgepflicht. Du kannst dich an Lehrkräfte, Vertrauenslehrerinnen, Schulsozialarbeit oder die Schulleitung wenden. Auch deine Eltern oder eine Schulpsychologin können einbezogen werden – wenn du das möchtest.",
  "info.rechte.arbeitsplatz.title": "Am Arbeitsplatz",
  "info.rechte.arbeitsplatz.text":
    "Arbeitgeber müssen Beschäftigte vor Benachteiligung und Belästigung schützen. Mögliche Ansprechpartner sind Vorgesetzte, Personalabteilung, Betriebs- oder Personalrat sowie die Beschwerdestelle nach dem Allgemeinen Gleichbehandlungsgesetz (AGG).",
  "info.rechte.agg.title": "Diskriminierungsschutz (AGG)",
  "info.rechte.agg.text":
    "Das AGG schützt unter anderem vor Benachteiligung wegen Herkunft, Geschlecht, Religion, Behinderung, Alter oder sexueller Identität. Für Beschwerden gelten oft Fristen – eine Beratungsstelle kann dir sagen, was in deinem Fall gilt.",
  "info.rechte.online.title": "Online und im Chat",
  "info.rechte.online.text":
    "Plattformen bieten Melde- und Blockierfunktionen. Screenshots mit Datum können später hilfreich sein. Bei schweren Fällen ist eine Anzeige möglich.",
  "info.rechte.strafrecht.title": "Strafrechtlich relevant",
  "info.rechte.strafrecht.text":
    "Beleidigung, Bedrohung, Nötigung oder das Verbreiten von Bildern ohne Einwilligung können Straftaten sein. Eine Anzeige kannst du bei jeder Polizeidienststelle oder online stellen – freiwillig und in deinem Tempo.",

  // Ist-das-Mobbing-Seite
  "info.mobbing.title": "Ist das Mobbing?",
  "info.mobbing.subtitle": "Zur Orientierung – keine Diagnose.",
  "info.mobbing.q1": "Passiert es öfter oder wiederholt sich die Situation?",
  "info.mobbing.q2": "Geht es meistens von derselben Person oder Gruppe aus?",
  "info.mobbing.q3": "Fällt es dir schwer, dich alleine dagegen zu wehren?",
  "info.mobbing.q4": "Fühlst du dich dadurch ausgegrenzt, verletzt oder unter Druck gesetzt?",
  "info.mobbing.q5": "Hast du das Gefühl, dass die Situation mit der Zeit schlimmer wird?",
  "info.mobbing.q6": "Belastet dich die Situation auch außerhalb des konkreten Moments?",
  "info.mobbing.opt.ja": "Ja",
  "info.mobbing.opt.unsicher": "Unsicher",
  "info.mobbing.opt.nein": "Nein",
  "info.mobbing.progress.done": "Alle Fragen beantwortet",
  "info.mobbing.progress.step": "Frage {n} von {total}",
  "info.mobbing.back": "Zurück",
  "info.mobbing.weiter": "Weiter",
  "info.mobbing.auswerten": "Auswerten",
  "info.mobbing.hinweis":
    "Es gibt keine richtigen oder falschen Antworten. StandUp entscheidet nicht für dich, wie deine Situation heißt.",
  "info.mobbing.result.title": "Eine vorsichtige Einordnung",
  "info.mobbing.result.hoch":
    "Einige Merkmale können zu Mobbing passen. Sicher sagen lässt sich das hier nicht – ein Gespräch mit einer Beratungsstelle kann helfen.",
  "info.mobbing.result.mittel":
    "Manches klingt nach einem Muster, anderes ist noch offen. Ob es Mobbing ist, lässt sich hier nicht feststellen.",
  "info.mobbing.result.niedrig": "Aus deinen Antworten lässt sich nicht ableiten, ob es sich um Mobbing handelt.",
  "info.mobbing.result.hinweis":
    "Wichtig ist vor allem: Wenn dich die Situation belastet, ist das Grund genug, dir Unterstützung zu holen.",
  "info.mobbing.card.vorfall.title": "Vorfall dokumentieren",
  "info.mobbing.card.vorfall.desc": "Festhalten, was passiert ist",
  "info.mobbing.card.vertrauensperson.title": "Mit einer Vertrauensperson sprechen",
  "info.mobbing.card.vertrauensperson.desc": "Jemanden einbeziehen, dem du vertraust",
  "info.mobbing.card.beratung.title": "Beratung & Hilfe finden",
  "info.mobbing.card.beratung.desc": "Anlaufstellen in deiner Nähe oder bundesweit",
  "info.mobbing.reset": "Fragen neu beantworten",
};

const en: PageDict = {
  "info.header.back": "Back",

  "info.infos.title": "Info",
  "info.infos.subtitle": "Explained clearly – without judging your situation.",
  "info.infos.mobbing.title": "Bullying",
  "info.infos.mobbing.text":
    "Bullying usually refers to a person being repeatedly hurt, excluded, or put down over a longer period, with little chance to defend themselves. A single argument doesn't count as bullying – even if it hurts.",
  "info.infos.cybermobbing.title": "Cyberbullying",
  "info.infos.cybermobbing.text":
    "Cyberbullying happens online: in chats, social networks, or games. Typical signs are repeated insults, spreading images or rumours, or deliberately excluding someone from groups. Screenshots can be helpful later.",
  "info.infos.diskriminierung.title": "Discrimination",
  "info.infos.diskriminierung.text":
    "Discrimination means someone is treated worse – for example because of origin, skin colour, religion, gender, disability, age, or sexual orientation. It can happen openly or in hidden ways.",
  "info.infos.beleidigungen.title": "Insults",
  "info.infos.beleidigungen.text":
    "Insults are statements that demean a person. They can happen verbally, in writing, or through images. How much they affect you isn't decided by volume alone – your feelings count.",
  "info.infos.bedrohungen.title": "Threats",
  "info.infos.bedrohungen.text":
    "A threat announces harm to someone. If you feel unsafe, you can seek support – for example from someone you trust, or in an acute situation by calling emergency number 110.",
  "info.infos.card.mobbing.title": "Is this bullying?",
  "info.infos.card.mobbing.desc": "Questions that can help you assess your situation",
  "info.infos.card.rechte.title": "Know your rights",
  "info.infos.card.rechte.desc": "An overview of possible actions",
  "info.infos.footer":
    "This information is general. StandUp does not diagnose and does not automatically assess your situation.",

  "info.rechte.title": "Your rights",
  "info.rechte.subtitle": "An overview of possible paths.",
  "info.rechte.hinweis":
    "This information is general. It does not replace legal advice and does not make binding decisions.",
  "info.rechte.schule.title": "At school",
  "info.rechte.schule.text":
    "Schools have a duty of care. You can turn to teachers, trusted teachers, school social workers, or the school leadership. Your parents or a school psychologist can also be involved – if you want that.",
  "info.rechte.arbeitsplatz.title": "At the workplace",
  "info.rechte.arbeitsplatz.text":
    "Employers must protect employees from discrimination and harassment. Possible contacts are supervisors, HR, the works or staff council, and the complaints office under the General Equal Treatment Act (AGG).",
  "info.rechte.agg.title": "Protection against discrimination (AGG)",
  "info.rechte.agg.text":
    "The AGG protects against discrimination based on origin, gender, religion, disability, age, or sexual identity, among others. Complaints often have deadlines – a counselling centre can tell you what applies in your case.",
  "info.rechte.online.title": "Online and in chat",
  "info.rechte.online.text":
    "Platforms offer reporting and blocking functions. Dated screenshots can be helpful later. In serious cases, filing a report is possible.",
  "info.rechte.strafrecht.title": "Criminally relevant",
  "info.rechte.strafrecht.text":
    "Insult, threat, coercion, or spreading images without consent can be criminal offences. You can file a report at any police station or online – voluntarily and at your own pace.",

  "info.mobbing.title": "Is this bullying?",
  "info.mobbing.subtitle": "For orientation – not a diagnosis.",
  "info.mobbing.q1": "Does it happen often or does the situation repeat itself?",
  "info.mobbing.q2": "Does it mostly come from the same person or group?",
  "info.mobbing.q3": "Do you find it hard to defend yourself against it alone?",
  "info.mobbing.q4": "Does it make you feel excluded, hurt, or pressured?",
  "info.mobbing.q5": "Do you feel the situation is getting worse over time?",
  "info.mobbing.q6": "Does the situation affect you beyond the actual moment?",
  "info.mobbing.opt.ja": "Yes",
  "info.mobbing.opt.unsicher": "Unsure",
  "info.mobbing.opt.nein": "No",
  "info.mobbing.progress.done": "All questions answered",
  "info.mobbing.progress.step": "Question {n} of {total}",
  "info.mobbing.back": "Back",
  "info.mobbing.weiter": "Next",
  "info.mobbing.auswerten": "Evaluate",
  "info.mobbing.hinweis":
    "There are no right or wrong answers. StandUp doesn't decide for you what to call your situation.",
  "info.mobbing.result.title": "A careful assessment",
  "info.mobbing.result.hoch":
    "Some characteristics may fit bullying. This can't be said with certainty here – talking to a counselling centre can help.",
  "info.mobbing.result.mittel":
    "Some of this sounds like a pattern, other parts are still unclear. Whether it's bullying can't be determined here.",
  "info.mobbing.result.niedrig": "Your answers don't allow a conclusion about whether this is bullying.",
  "info.mobbing.result.hinweis":
    "Most importantly: if the situation is a burden to you, that's reason enough to seek support.",
  "info.mobbing.card.vorfall.title": "Document an incident",
  "info.mobbing.card.vorfall.desc": "Record what happened",
  "info.mobbing.card.vertrauensperson.title": "Talk to someone you trust",
  "info.mobbing.card.vertrauensperson.desc": "Involve someone you trust",
  "info.mobbing.card.beratung.title": "Find counselling & help",
  "info.mobbing.card.beratung.desc": "Support services near you or nationwide",
  "info.mobbing.reset": "Answer the questions again",
};

const tr: PageDict = {
  "info.header.back": "Geri",

  "info.infos.title": "Bilgi",
  "info.infos.subtitle": "Durumun hakkında yargılamadan, anlaşılır şekilde açıklanmış.",
  "info.infos.mobbing.title": "Zorbalık (Mobbing)",
  "info.infos.mobbing.text":
    "Mobbingden genellikle bir kişinin uzun süre boyunca tekrar tekrar incitildiği, dışlandığı veya küçük düşürüldüğü ve buna kendi başına zor karşı koyabildiği durumlarda söz edilir. Tek bir tartışma bu anlama gelmez – acı verse bile.",
  "info.infos.cybermobbing.title": "Siber zorbalık",
  "info.infos.cybermobbing.text":
    "Siber zorbalık çevrimiçi gerçekleşir: sohbetlerde, sosyal ağlarda veya oyunlarda. Tekrarlayan hakaretler, resim veya söylenti yayma ya da bir kişiyi bilerek gruplardan dışlama tipiktir. Ekran görüntüleri daha sonra işe yarayabilir.",
  "info.infos.diskriminierung.title": "Ayrımcılık",
  "info.infos.diskriminierung.text":
    "Ayrımcılık, birinin daha kötü muamele görmesi anlamına gelir – örneğin köken, ten rengi, din, cinsiyet, engellilik, yaş veya cinsel yönelim nedeniyle. Açık ya da gizli şekilde olabilir.",
  "info.infos.beleidigungen.title": "Hakaretler",
  "info.infos.beleidigungen.text":
    "Hakaretler bir kişiyi küçük düşüren ifadelerdir. Sözlü, yazılı veya görsellerle olabilir. Ne kadar rahatsız edici olduğuna yalnızca sen karar verirsin – hislerin önemlidir.",
  "info.infos.bedrohungen.title": "Tehditler",
  "info.infos.bedrohungen.text":
    "Tehditlerde birine zarar verileceği duyurulur. Kendini güvende hissetmiyorsan destek alabilirsin – örneğin güvendiğin biriyle konuşarak ya da acil bir durumda 110 acil hattını arayarak.",
  "info.infos.card.mobbing.title": "Bu mobbing mi?",
  "info.infos.card.mobbing.desc": "Durumunu değerlendirmene yardımcı olacak sorular",
  "info.infos.card.rechte.title": "Haklarını bil",
  "info.infos.card.rechte.desc": "Olası eylem yollarına genel bakış",
  "info.infos.footer":
    "Bu bilgiler genel niteliktedir. StandUp tanı koymaz ve durumunu otomatik olarak değerlendirmez.",

  "info.rechte.title": "Haklarını bil",
  "info.rechte.subtitle": "Olası yollara genel bakış.",
  "info.rechte.hinweis":
    "Bu bilgiler geneldir. Hukuki danışmanlığın yerini tutmaz ve bağlayıcı kararlar vermez.",
  "info.rechte.schule.title": "Okulda",
  "info.rechte.schule.text":
    "Okulların bir gözetim yükümlülüğü vardır. Öğretmenlere, güven öğretmenlerine, okul sosyal çalışmasına veya okul yönetimine başvurabilirsin. İstersen ailen veya bir okul psikoloğu da dahil edilebilir.",
  "info.rechte.arbeitsplatz.title": "İş yerinde",
  "info.rechte.arbeitsplatz.text":
    "İşverenler çalışanları ayrımcılık ve tacizden korumak zorundadır. Olası muhataplar amirler, insan kaynakları, işyeri veya personel konseyi ve Genel Eşit Muamele Kanunu (AGG) kapsamındaki şikayet birimidir.",
  "info.rechte.agg.title": "Ayrımcılığa karşı koruma (AGG)",
  "info.rechte.agg.text":
    "AGG; köken, cinsiyet, din, engellilik, yaş veya cinsel kimlik nedeniyle ayrımcılığa karşı koruma sağlar. Şikayetler için genellikle süreler geçerlidir – bir danışma merkezi senin durumunda ne geçerli olduğunu söyleyebilir.",
  "info.rechte.online.title": "Çevrimiçi ve sohbette",
  "info.rechte.online.text":
    "Platformlar bildirme ve engelleme işlevleri sunar. Tarihli ekran görüntüleri daha sonra işe yarayabilir. Ciddi durumlarda şikayette bulunmak mümkündür.",
  "info.rechte.strafrecht.title": "Cezai açıdan önemli",
  "info.rechte.strafrecht.text":
    "Hakaret, tehdit, zorlama veya rıza olmadan görüntü yayma suç oluşturabilir. Herhangi bir polis merkezine veya çevrimiçi olarak, gönüllü ve kendi hızında şikayette bulunabilirsin.",

  "info.mobbing.title": "Bu mobbing mi?",
  "info.mobbing.subtitle": "Yönlendirme amaçlıdır – tanı değildir.",
  "info.mobbing.q1": "Bu durum sık sık mı yaşanıyor ya da tekrar mı ediyor?",
  "info.mobbing.q2": "Genellikle aynı kişi ya da gruptan mı geliyor?",
  "info.mobbing.q3": "Buna tek başına karşı koymak senin için zor mu?",
  "info.mobbing.q4": "Bu durum seni dışlanmış, incinmiş veya baskı altında hissettiriyor mu?",
  "info.mobbing.q5": "Durumun zamanla kötüleştiğini mi düşünüyorsun?",
  "info.mobbing.q6": "Bu durum seni o anın dışında da etkiliyor mu?",
  "info.mobbing.opt.ja": "Evet",
  "info.mobbing.opt.unsicher": "Emin değilim",
  "info.mobbing.opt.nein": "Hayır",
  "info.mobbing.progress.done": "Tüm sorular yanıtlandı",
  "info.mobbing.progress.step": "Soru {n} / {total}",
  "info.mobbing.back": "Geri",
  "info.mobbing.weiter": "İleri",
  "info.mobbing.auswerten": "Değerlendir",
  "info.mobbing.hinweis":
    "Doğru ya da yanlış cevap yoktur. StandUp durumunu nasıl adlandıracağına senin yerine karar vermez.",
  "info.mobbing.result.title": "Dikkatli bir değerlendirme",
  "info.mobbing.result.hoch":
    "Bazı özellikler mobbinge uyabilir. Bunu kesin olarak burada söylemek mümkün değil – bir danışma merkeziyle konuşmak yardımcı olabilir.",
  "info.mobbing.result.mittel":
    "Bazı şeyler bir örüntüye benziyor, bazıları hâlâ belirsiz. Bunun mobbing olup olmadığı burada tespit edilemez.",
  "info.mobbing.result.niedrig": "Cevaplarından bunun mobbing olup olmadığı çıkarılamıyor.",
  "info.mobbing.result.hinweis":
    "En önemlisi: Durum seni yoruyorsa, bu destek almak için yeterli bir nedendir.",
  "info.mobbing.card.vorfall.title": "Olayı belgele",
  "info.mobbing.card.vorfall.desc": "Ne olduğunu kaydet",
  "info.mobbing.card.vertrauensperson.title": "Güvendiğin biriyle konuş",
  "info.mobbing.card.vertrauensperson.desc": "Güvendiğin birini sürece dahil et",
  "info.mobbing.card.beratung.title": "Danışmanlık & yardım bul",
  "info.mobbing.card.beratung.desc": "Yakınındaki veya ülke genelindeki destek noktaları",
  "info.mobbing.reset": "Soruları yeniden yanıtla",
};

const ar: PageDict = {
  "info.header.back": "رجوع",

  "info.infos.title": "معلومات",
  "info.infos.subtitle": "موضّحة بشكل مفهوم – دون الحكم على وضعك.",
  "info.infos.mobbing.title": "التنمر",
  "info.infos.mobbing.text":
    "غالبًا ما يُقصد بالتنمر أن يتعرض شخص لأذى أو استبعاد أو إهانة متكررة على مدى فترة طويلة، ويصعب عليه الدفاع عن نفسه. لا يُقصد بذلك خلافًا واحدًا فقط – حتى لو كان مؤلمًا.",
  "info.infos.cybermobbing.title": "التنمر الإلكتروني",
  "info.infos.cybermobbing.text":
    "يحدث التنمر الإلكتروني عبر الإنترنت: في المحادثات أو الشبكات الاجتماعية أو الألعاب. من أبرز أشكاله الإهانات المتكررة، ونشر الصور أو الشائعات، أو الاستبعاد المتعمد من المجموعات. قد تكون لقطات الشاشة مفيدة لاحقًا.",
  "info.infos.diskriminierung.title": "التمييز",
  "info.infos.diskriminierung.text":
    "يعني التمييز أن يُعامل شخص ما بشكل أسوأ – مثلًا بسبب الأصل أو لون البشرة أو الدين أو الجنس أو الإعاقة أو العمر أو التوجه الجنسي. يمكن أن يحدث بشكل علني أو خفي.",
  "info.infos.beleidigungen.title": "الإهانات",
  "info.infos.beleidigungen.text":
    "الإهانات هي تصريحات تحطّ من قدر شخص ما. يمكن أن تكون شفهية أو مكتوبة أو بالصور. مدى تأثيرها عليك لا يُحدَّد بمجرد صوتها – مشاعرك هي ما يهم.",
  "info.infos.bedrohungen.title": "التهديدات",
  "info.infos.bedrohungen.text":
    "في التهديد يُعلَن عن إلحاق ضرر بشخص ما. إذا شعرت بعدم الأمان، يمكنك طلب الدعم – مثلًا من شخص تثق به، أو في حالة طارئة عبر رقم الطوارئ 110.",
  "info.infos.card.mobbing.title": "هل هذا تنمر؟",
  "info.infos.card.mobbing.desc": "أسئلة يمكن أن تساعدك على تقييم وضعك",
  "info.infos.card.rechte.title": "تعرّف على حقوقك",
  "info.infos.card.rechte.desc": "نظرة عامة على الإجراءات الممكنة",
  "info.infos.footer":
    "هذه المعلومات عامة. لا يقدّم StandUp تشخيصًا ولا يقيّم وضعك تلقائيًا.",

  "info.rechte.title": "حقوقك",
  "info.rechte.subtitle": "نظرة عامة على الطرق الممكنة.",
  "info.rechte.hinweis":
    "هذه المعلومات عامة. لا تحل محل الاستشارة القانونية ولا تتخذ قرارات ملزمة.",
  "info.rechte.schule.title": "في المدرسة",
  "info.rechte.schule.text":
    "على المدارس واجب رعاية. يمكنك التوجه إلى المعلمين، أو معلمي الثقة، أو الأخصائيين الاجتماعيين، أو إدارة المدرسة. يمكن أيضًا إشراك والديك أو أخصائي نفسي مدرسي – إذا أردت ذلك.",
  "info.rechte.arbeitsplatz.title": "في مكان العمل",
  "info.rechte.arbeitsplatz.text":
    "يجب على أصحاب العمل حماية الموظفين من التمييز والمضايقة. يمكن التواصل مع المديرين أو قسم الموارد البشرية أو مجلس العمال أو الموظفين وكذلك مكتب الشكاوى بموجب قانون المساواة في المعاملة العام (AGG).",
  "info.rechte.agg.title": "الحماية من التمييز (AGG)",
  "info.rechte.agg.text":
    "يحمي قانون AGG من التمييز بسبب الأصل أو الجنس أو الدين أو الإعاقة أو العمر أو الهوية الجنسية، من بين أمور أخرى. غالبًا ما تكون هناك مواعيد نهائية للشكاوى – يمكن لمركز استشاري إخبارك بما ينطبق في حالتك.",
  "info.rechte.online.title": "عبر الإنترنت وفي المحادثات",
  "info.rechte.online.text":
    "توفّر المنصات وظائف للإبلاغ والحظر. قد تكون لقطات الشاشة المؤرخة مفيدة لاحقًا. في الحالات الخطيرة، يمكن تقديم بلاغ.",
  "info.rechte.strafrecht.title": "ذو صلة جنائية",
  "info.rechte.strafrecht.text":
    "الإهانة والتهديد والإكراه أو نشر الصور دون موافقة يمكن أن تكون جرائم. يمكنك تقديم بلاغ في أي قسم شرطة أو عبر الإنترنت – طوعًا وبالوتيرة التي تناسبك.",

  "info.mobbing.title": "هل هذا تنمر؟",
  "info.mobbing.subtitle": "للتوجيه – وليس تشخيصًا.",
  "info.mobbing.q1": "هل يحدث الأمر كثيرًا أو يتكرر الموقف؟",
  "info.mobbing.q2": "هل يأتي غالبًا من نفس الشخص أو المجموعة؟",
  "info.mobbing.q3": "هل يصعب عليك الدفاع عن نفسك وحدك؟",
  "info.mobbing.q4": "هل تشعر بسبب ذلك بالاستبعاد أو الأذى أو الضغط؟",
  "info.mobbing.q5": "هل تشعر أن الوضع يزداد سوءًا مع الوقت؟",
  "info.mobbing.q6": "هل يؤثر عليك الوضع حتى خارج تلك اللحظة؟",
  "info.mobbing.opt.ja": "نعم",
  "info.mobbing.opt.unsicher": "غير متأكد",
  "info.mobbing.opt.nein": "لا",
  "info.mobbing.progress.done": "تمت الإجابة على جميع الأسئلة",
  "info.mobbing.progress.step": "السؤال {n} من {total}",
  "info.mobbing.back": "رجوع",
  "info.mobbing.weiter": "التالي",
  "info.mobbing.auswerten": "تقييم",
  "info.mobbing.hinweis":
    "لا توجد إجابات صحيحة أو خاطئة. لا يقرر StandUp نيابة عنك كيف تسمّي وضعك.",
  "info.mobbing.result.title": "تقييم حذر",
  "info.mobbing.result.hoch":
    "قد تتوافق بعض السمات مع التنمر. لا يمكن الجزم بذلك هنا – قد يساعد التحدث مع مركز استشاري.",
  "info.mobbing.result.mittel":
    "بعض الأمور تبدو كنمط متكرر، وبعضها لا يزال غير واضح. لا يمكن هنا تحديد ما إذا كان تنمرًا.",
  "info.mobbing.result.niedrig": "لا يمكن الاستنتاج من إجاباتك ما إذا كان الأمر تنمرًا.",
  "info.mobbing.result.hinweis":
    "الأهم من ذلك: إذا كان الوضع يثقل عليك، فهذا سبب كافٍ لطلب الدعم.",
  "info.mobbing.card.vorfall.title": "توثيق الحادثة",
  "info.mobbing.card.vorfall.desc": "سجّل ما حدث",
  "info.mobbing.card.vertrauensperson.title": "التحدث إلى شخص تثق به",
  "info.mobbing.card.vertrauensperson.desc": "أشرك شخصًا تثق به",
  "info.mobbing.card.beratung.title": "ابحث عن استشارة ومساعدة",
  "info.mobbing.card.beratung.desc": "جهات دعم بالقرب منك أو في جميع أنحاء البلاد",
  "info.mobbing.reset": "أجب عن الأسئلة من جديد",
};

const ru: PageDict = {
  "info.header.back": "Назад",

  "info.infos.title": "Информация",
  "info.infos.subtitle": "Понятно объяснено — без оценки твоей ситуации.",
  "info.infos.mobbing.title": "Буллинг",
  "info.infos.mobbing.text":
    "О буллинге говорят обычно тогда, когда человека снова и снова обижают, исключают или унижают в течение длительного времени, и ему трудно защититься самому. Отдельная ссора этим не считается — даже если она причиняет боль.",
  "info.infos.cybermobbing.title": "Кибербуллинг",
  "info.infos.cybermobbing.text":
    "Кибербуллинг происходит онлайн: в чатах, соцсетях или играх. Типичны повторяющиеся оскорбления, распространение фото или слухов, а также намеренное исключение из групп. Скриншоты могут пригодиться позже.",
  "info.infos.diskriminierung.title": "Дискриминация",
  "info.infos.diskriminierung.text":
    "Дискриминация означает, что к кому-то относятся хуже — например, из-за происхождения, цвета кожи, религии, пола, инвалидности, возраста или сексуальной ориентации. Она может быть открытой или скрытой.",
  "info.infos.beleidigungen.title": "Оскорбления",
  "info.infos.beleidigungen.text":
    "Оскорбления — это высказывания, унижающие человека. Они могут быть устными, письменными или в виде изображений. Насколько сильно они ранят, решаешь не ты одна по громкости — важны твои чувства.",
  "info.infos.bedrohungen.title": "Угрозы",
  "info.infos.bedrohungen.text":
    "При угрозах кому-то объявляют о причинении вреда. Если ты чувствуешь себя небезопасно, можно обратиться за поддержкой — например, к доверенному человеку или, в острой ситуации, по номеру экстренной службы 110.",
  "info.infos.card.mobbing.title": "Это буллинг?",
  "info.infos.card.mobbing.desc": "Вопросы, которые помогут тебе разобраться в ситуации",
  "info.infos.card.rechte.title": "Знай свои права",
  "info.infos.card.rechte.desc": "Обзор возможных действий",
  "info.infos.footer":
    "Эта информация носит общий характер. StandUp не ставит диагноз и не оценивает твою ситуацию автоматически.",

  "info.rechte.title": "Твои права",
  "info.rechte.subtitle": "Обзор возможных путей.",
  "info.rechte.hinweis":
    "Эта информация носит общий характер. Она не заменяет юридическую консультацию и не принимает обязательных решений.",
  "info.rechte.schule.title": "В школе",
  "info.rechte.schule.text":
    "Школы обязаны заботиться об учениках. Ты можешь обратиться к учителям, доверенным учителям, школьным социальным работникам или руководству школы. При желании можно привлечь родителей или школьного психолога.",
  "info.rechte.arbeitsplatz.title": "На рабочем месте",
  "info.rechte.arbeitsplatz.text":
    "Работодатели обязаны защищать сотрудников от дискриминации и притеснений. Возможные контактные лица — руководители, отдел кадров, производственный или трудовой совет, а также комиссия по жалобам согласно Общему закону о равном обращении (AGG).",
  "info.rechte.agg.title": "Защита от дискриминации (AGG)",
  "info.rechte.agg.text":
    "AGG защищает, среди прочего, от дискриминации по происхождению, полу, религии, инвалидности, возрасту или сексуальной идентичности. Для жалоб часто действуют сроки — консультационный центр подскажет, что применимо в твоём случае.",
  "info.rechte.online.title": "Онлайн и в чате",
  "info.rechte.online.text":
    "Платформы предлагают функции жалоб и блокировки. Датированные скриншоты могут пригодиться позже. В серьёзных случаях возможно заявление в полицию.",
  "info.rechte.strafrecht.title": "Уголовно значимо",
  "info.rechte.strafrecht.text":
    "Оскорбление, угроза, принуждение или распространение изображений без согласия могут являться преступлением. Заявление можно подать в любом отделении полиции или онлайн — добровольно и в своём темпе.",

  "info.mobbing.title": "Это буллинг?",
  "info.mobbing.subtitle": "Для ориентира — не диагноз.",
  "info.mobbing.q1": "Это происходит часто или ситуация повторяется?",
  "info.mobbing.q2": "Это исходит в основном от одного и того же человека или группы?",
  "info.mobbing.q3": "Тебе трудно защититься от этого в одиночку?",
  "info.mobbing.q4": "Из-за этого ты чувствуешь себя исключённым/исключённой, обиженным/обиженной или под давлением?",
  "info.mobbing.q5": "У тебя есть ощущение, что ситуация со временем ухудшается?",
  "info.mobbing.q6": "Эта ситуация беспокоит тебя и вне самого момента?",
  "info.mobbing.opt.ja": "Да",
  "info.mobbing.opt.unsicher": "Не уверен(а)",
  "info.mobbing.opt.nein": "Нет",
  "info.mobbing.progress.done": "На все вопросы дан ответ",
  "info.mobbing.progress.step": "Вопрос {n} из {total}",
  "info.mobbing.back": "Назад",
  "info.mobbing.weiter": "Далее",
  "info.mobbing.auswerten": "Оценить",
  "info.mobbing.hinweis":
    "Нет правильных или неправильных ответов. StandUp не решает за тебя, как называть твою ситуацию.",
  "info.mobbing.result.title": "Осторожная оценка",
  "info.mobbing.result.hoch":
    "Некоторые признаки могут соответствовать буллингу. Точно сказать это здесь нельзя — может помочь разговор с консультационным центром.",
  "info.mobbing.result.mittel":
    "Кое-что похоже на закономерность, кое-что ещё неясно. Является ли это буллингом, здесь установить нельзя.",
  "info.mobbing.result.niedrig": "Из твоих ответов нельзя сделать вывод, является ли это буллингом.",
  "info.mobbing.result.hinweis":
    "Важнее всего: если ситуация тебя тяготит, этого достаточно, чтобы обратиться за поддержкой.",
  "info.mobbing.card.vorfall.title": "Задокументировать инцидент",
  "info.mobbing.card.vorfall.desc": "Зафиксировать, что произошло",
  "info.mobbing.card.vertrauensperson.title": "Поговорить с доверенным человеком",
  "info.mobbing.card.vertrauensperson.desc": "Привлечь того, кому ты доверяешь",
  "info.mobbing.card.beratung.title": "Найти консультацию и помощь",
  "info.mobbing.card.beratung.desc": "Службы поддержки рядом с тобой или по всей стране",
  "info.mobbing.reset": "Ответить на вопросы заново",
};

export const infoPages: Record<Lang, PageDict> = { de, en, tr, ar, ru };
