import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { usePreferences } from "@/lib/preferences";

/**
 * Zentrales Sprachsystem für StandUp.
 * Deutsch ist die Basissprache; fehlende Übersetzungen fallen auf Deutsch zurück.
 */

const de = {
  "common.back": "Zurück",

  "nav.start": "Start",
  "nav.diary": "Tagebuch",
  "nav.info": "Infos",
  "nav.settings": "Einstellungen",
  "nav.quickOpen": "Schnellaktionen öffnen",

  "home.night": "Gute Nacht",
  "home.morning": "Guten Morgen",
  "home.day": "Hallo",
  "home.evening": "Guten Abend",
  "home.notAlone": "Du bist nicht allein.",
  "home.howHelp": "Wie können wir dir helfen?",
  "home.c1.t": "Mir ist etwas passiert",
  "home.c1.d": "Vorfall dokumentieren und Hilfe bekommen",
  "home.c2.t": "Ich möchte jemandem helfen",
  "home.c2.d": "Unterstützung für Freunde, Mitschüler, Kolleginnen und Kollegen",
  "home.c3.t": "Meine Vorfälle",
  "home.c3.d": "Bisher dokumentierte Vorfälle ansehen",
  "home.overview": "Dein Überblick",
  "home.entries": "Einträge",
  "home.evidence": "Beweise",
  "home.open": "Offen",
  "home.last": "Zuletzt",
  "home.noDesc": "Kein Beschreibungstext",
  "home.nextStep": "Nächster Schritt",
  "home.quick": "Schnellzugriffe",
  "home.q1": "Beratung & Hilfe",
  "home.q2": "Rechte & Informationen",
  "home.q3": "Ist das Mobbing?",
  "home.q4": "Notfall-Hilfe",
  "home.privacy.t": "Deine Angaben gehören dir",
  "home.privacy.d":
    "Bitte geh mit persönlichen Informationen vertraulich um – auch mit denen anderer Menschen. In dieser Version werden deine Einträge nur lokal auf diesem Gerät gespeichert. Du entscheidest, was du aufschreibst und mit wem du es teilst.",
  "home.privacy.link": "Datenschutz-Einstellungen ansehen",
  "home.disclaimer":
    "StandUp ersetzt keine professionelle psychologische oder rechtliche Beratung und trifft keine verbindlichen rechtlichen Entscheidungen.",

  "qa.title": "Was möchtest du tun?",
  "qa.close": "Schließen",
  "qa.menuClose": "Menü schließen",
  "qa.label": "Schnellaktionen",
  "qa.a1.t": "Vorfall dokumentieren",
  "qa.a1.s": "Halte fest, was passiert ist.",
  "qa.a2.t": "Beweis hinzufügen",
  "qa.a2.s": "Speichere etwas zu einem Vorfall.",
  "qa.a3.t": "Ich brauche gerade Hilfe",
  "qa.a3.s": "Finde einen passenden nächsten Schritt.",
  "qa.a4.t": "Ist das Mobbing?",
  "qa.a4.s": "Ordne die Situation anhand einiger Fragen ein.",
  "qa.a5.t": "Beratung finden",
  "qa.a5.s": "Finde passende Unterstützung.",
  "qa.diary": "Tagebuch öffnen",

  "set.title": "Einstellungen",
  "set.privacy.t": "Datenschutz",
  "set.privacy.d":
    "In dieser Prototyp-Version bleiben deine Einträge lokal in deinem Browser. Es findet keine Übertragung an einen Server statt und es ist noch keine Verschlüsselung eingebaut. Teile Angaben über andere Menschen nur, wenn es wirklich nötig ist.",
  "set.data.t": "Gespeicherte Daten",
  "set.data.d": "{entries} · {evidence} auf diesem Gerät.",
  "set.entriesOne": "1 Eintrag",
  "set.entriesMany": "{n} Einträge",
  "set.evidenceOne": "1 Beweis",
  "set.evidenceMany": "{n} Beweise",
  "set.delete.t": "Daten löschen",
  "set.delete.d": "Du kannst alle Einträge jederzeit entfernen. Das lässt sich nicht rückgängig machen.",
  "set.delete.btn": "Alle Daten löschen",
  "set.delete.yes": "Ja, alle Daten löschen",
  "set.delete.cancel": "Abbrechen",
  "set.a11y.t": "Barrierefreiheit",
  "set.a11y.d":
    "StandUp nutzt große Schrift, klare Kontraste und große Touch-Flächen. Die Schriftgröße kannst du zusätzlich in den Einstellungen deines Geräts anpassen.",
  "set.lang.t": "Sprache",
  "set.lang.d":
    "Wähle deine Sprache. Die App wird sofort umgestellt. Inhalte, die noch nicht übersetzt sind, bleiben auf Deutsch.",
  "set.lang.aria": "Sprache wählen",
  "set.about.t": "Über StandUp",
  "set.about.p1":
    "StandUp ist eine App für Menschen, die Mobbing, Diskriminierung, Beleidigungen, Bedrohungen oder andere belastende Situationen erleben – in der Schule, am Arbeitsplatz, online oder im privaten Umfeld.",
  "set.about.p2":
    "Die App hilft dir dabei, Situationen einzuordnen, Vorfälle strukturiert zu dokumentieren, Beweise zu sammeln, eine Chronologie sichtbar zu machen, Nachrichten an Vertrauenspersonen vorzubereiten und passende Beratungsstellen sowie Notfallnummern zu finden.",
  "set.about.p3":
    "StandUp entscheidet nichts für dich: Du bestimmst, was du aufschreibst, was du löschst und mit wem du etwas teilst. Deine Einträge bleiben in dieser Version lokal auf diesem Gerät.",
  "set.about.p4":
    "StandUp ersetzt keine professionelle psychologische, medizinische oder rechtliche Beratung. In akuten Notfällen wende dich bitte an 110, 112 oder eine Nummer aus dem Bereich „Notfall-Hilfe“.",
  "set.about.p5":
    "Wichtiger Hinweis zum Missbrauch: Die App und die aufgeführten Telefonnummern sind ausschließlich für echte Hilfe- und Dokumentationszwecke gedacht. Missbrauch – etwa bewusst falsche Beschuldigungen, gefälschte Dokumentationen, Verleumdung, das Weitergeben von Daten anderer Personen ohne Erlaubnis oder grundlose Anrufe bei Notrufnummern – kann rechtliche Konsequenzen haben.",
  "set.about.version": "Prototyp-Version 0.1.",
};

export type TranslationKey = keyof typeof de;
type Dict = Partial<Record<TranslationKey, string>>;

const en: Dict = {
  "common.back": "Back",
  "nav.start": "Home",
  "nav.diary": "Journal",
  "nav.info": "Info",
  "nav.settings": "Settings",
  "nav.quickOpen": "Open quick actions",
  "home.night": "Good night",
  "home.morning": "Good morning",
  "home.day": "Hello",
  "home.evening": "Good evening",
  "home.notAlone": "You are not alone.",
  "home.howHelp": "How can we help you?",
  "home.c1.t": "Something happened to me",
  "home.c1.d": "Document an incident and get help",
  "home.c2.t": "I want to help someone",
  "home.c2.d": "Support for friends, classmates and colleagues",
  "home.c3.t": "My incidents",
  "home.c3.d": "View the incidents you documented so far",
  "home.overview": "Your overview",
  "home.entries": "Entries",
  "home.evidence": "Evidence",
  "home.open": "Open",
  "home.last": "Last",
  "home.noDesc": "No description",
  "home.nextStep": "Next step",
  "home.quick": "Quick access",
  "home.q1": "Counselling & help",
  "home.q2": "Rights & information",
  "home.q3": "Is this bullying?",
  "home.q4": "Emergency help",
  "home.privacy.t": "Your information belongs to you",
  "home.privacy.d":
    "Please treat personal information confidentially – including other people's. In this version your entries are stored only locally on this device. You decide what you write down and who you share it with.",
  "home.privacy.link": "View privacy settings",
  "home.disclaimer":
    "StandUp does not replace professional psychological or legal advice and makes no binding legal decisions.",
  "qa.title": "What would you like to do?",
  "qa.close": "Close",
  "qa.menuClose": "Close menu",
  "qa.label": "Quick actions",
  "qa.a1.t": "Document an incident",
  "qa.a1.s": "Record what happened.",
  "qa.a2.t": "Add evidence",
  "qa.a2.s": "Save something about an incident.",
  "qa.a3.t": "I need help right now",
  "qa.a3.s": "Find a suitable next step.",
  "qa.a4.t": "Is this bullying?",
  "qa.a4.s": "Assess the situation with a few questions.",
  "qa.a5.t": "Find counselling",
  "qa.a5.s": "Find suitable support.",
  "qa.diary": "Open journal",
  "set.title": "Settings",
  "set.privacy.t": "Privacy",
  "set.privacy.d":
    "In this prototype your entries stay locally in your browser. Nothing is transferred to a server and no encryption is built in yet. Only share information about other people when it is really necessary.",
  "set.data.t": "Stored data",
  "set.data.d": "{entries} · {evidence} on this device.",
  "set.entriesOne": "1 entry",
  "set.entriesMany": "{n} entries",
  "set.evidenceOne": "1 piece of evidence",
  "set.evidenceMany": "{n} pieces of evidence",
  "set.delete.t": "Delete data",
  "set.delete.d": "You can remove all entries at any time. This cannot be undone.",
  "set.delete.btn": "Delete all data",
  "set.delete.yes": "Yes, delete all data",
  "set.delete.cancel": "Cancel",
  "set.a11y.t": "Accessibility",
  "set.a11y.d":
    "StandUp uses large type, clear contrast and large touch areas. You can also adjust the font size in your device settings.",
  "set.lang.t": "Language",
  "set.lang.d":
    "Choose your language. The app switches immediately. Content that is not translated yet stays in German.",
  "set.lang.aria": "Choose language",
  "set.about.t": "About StandUp",
  "set.about.p1":
    "StandUp is an app for people who experience bullying, discrimination, insults, threats or other distressing situations – at school, at work, online or in private life.",
  "set.about.p2":
    "The app helps you assess situations, document incidents in a structured way, collect evidence, make a timeline visible, prepare messages to trusted people and find counselling centres and emergency numbers.",
  "set.about.p3":
    "StandUp decides nothing for you: you choose what you write down, what you delete and who you share it with. In this version your entries stay locally on this device.",
  "set.about.p4":
    "StandUp does not replace professional psychological, medical or legal advice. In an acute emergency please call 110, 112 or a number from the \u201cEmergency help\u201d section.",
  "set.about.p5":
    "Important note on misuse: the app and the listed phone numbers are intended solely for genuine help and documentation. Misuse – such as knowingly false accusations, falsified documentation, defamation, passing on other people's data without permission or baseless emergency calls – can have legal consequences.",
  "set.about.version": "Prototype version 0.1.",
};

const tr: Dict = {
  "common.back": "Geri",
  "nav.start": "Başlangıç",
  "nav.diary": "Günlük",
  "nav.info": "Bilgi",
  "nav.settings": "Ayarlar",
  "nav.quickOpen": "Hızlı işlemleri aç",
  "home.night": "İyi geceler",
  "home.morning": "Günaydın",
  "home.day": "Merhaba",
  "home.evening": "İyi akşamlar",
  "home.notAlone": "Yalnız değilsin.",
  "home.howHelp": "Sana nasıl yardımcı olabiliriz?",
  "home.c1.t": "Başıma bir şey geldi",
  "home.c1.d": "Olayı belgele ve yardım al",
  "home.c2.t": "Birine yardım etmek istiyorum",
  "home.c2.d": "Arkadaşlar, sınıf arkadaşları ve iş arkadaşları için destek",
  "home.c3.t": "Olaylarım",
  "home.c3.d": "Şimdiye kadar belgelenen olayları gör",
  "home.overview": "Genel bakışın",
  "home.entries": "Kayıtlar",
  "home.evidence": "Kanıtlar",
  "home.open": "Açık",
  "home.last": "Son",
  "home.noDesc": "Açıklama yok",
  "home.nextStep": "Sonraki adım",
  "home.quick": "Hızlı erişim",
  "home.q1": "Danışmanlık ve yardım",
  "home.q2": "Haklar ve bilgiler",
  "home.q3": "Bu zorbalık mı?",
  "home.q4": "Acil yardım",
  "home.privacy.t": "Bilgilerin sana ait",
  "home.privacy.d":
    "Kişisel bilgileri – başkalarınınkini de – gizli tut. Bu sürümde kayıtların yalnızca bu cihazda saklanır. Ne yazacağına ve kiminle paylaşacağına sen karar verirsin.",
  "home.privacy.link": "Gizlilik ayarlarını gör",
  "home.disclaimer":
    "StandUp profesyonel psikolojik veya hukuki danışmanlığın yerini almaz ve bağlayıcı hukuki kararlar vermez.",
  "qa.title": "Ne yapmak istersin?",
  "qa.close": "Kapat",
  "qa.menuClose": "Menüyü kapat",
  "qa.label": "Hızlı işlemler",
  "qa.a1.t": "Olayı belgele",
  "qa.a1.s": "Ne olduğunu kaydet.",
  "qa.a2.t": "Kanıt ekle",
  "qa.a2.s": "Bir olaya dair bir şey kaydet.",
  "qa.a3.t": "Şu anda yardıma ihtiyacım var",
  "qa.a3.s": "Uygun bir sonraki adımı bul.",
  "qa.a4.t": "Bu zorbalık mı?",
  "qa.a4.s": "Birkaç soruyla durumu değerlendir.",
  "qa.a5.t": "Danışmanlık bul",
  "qa.a5.s": "Sana uygun desteği bul.",
  "qa.diary": "Günlüğü aç",
  "set.title": "Ayarlar",
  "set.privacy.t": "Gizlilik",
  "set.privacy.d":
    "Bu prototipte kayıtların tarayıcında yerel olarak kalır. Sunucuya aktarım yoktur ve henüz şifreleme yoktur. Başkalarına ait bilgileri yalnızca gerçekten gerekliyse paylaş.",
  "set.data.t": "Kayıtlı veriler",
  "set.data.d": "Bu cihazda {entries} · {evidence}.",
  "set.entriesOne": "1 kayıt",
  "set.entriesMany": "{n} kayıt",
  "set.evidenceOne": "1 kanıt",
  "set.evidenceMany": "{n} kanıt",
  "set.delete.t": "Verileri sil",
  "set.delete.d": "Tüm kayıtları istediğin zaman silebilirsin. Bu geri alınamaz.",
  "set.delete.btn": "Tüm verileri sil",
  "set.delete.yes": "Evet, tüm verileri sil",
  "set.delete.cancel": "İptal",
  "set.a11y.t": "Erişilebilirlik",
  "set.a11y.d":
    "StandUp büyük yazı, net kontrast ve büyük dokunma alanları kullanır. Yazı boyutunu cihaz ayarlarından da değiştirebilirsin.",
  "set.lang.t": "Dil",
  "set.lang.d": "Dilini seç. Uygulama hemen değişir. Henüz çevrilmemiş içerikler Almanca kalır.",
  "set.lang.aria": "Dil seç",
  "set.about.t": "StandUp hakkında",
  "set.about.p1":
    "StandUp; okulda, işte, internette veya özel hayatta zorbalık, ayrımcılık, hakaret, tehdit ya da başka zorlayıcı durumlar yaşayan insanlar için bir uygulamadır.",
  "set.about.p2":
    "Uygulama durumları değerlendirmene, olayları düzenli belgelemene, kanıt toplamana, bir zaman çizelgesi görmene, güvendiğin kişilere mesaj hazırlamana ve danışma merkezleri ile acil numaraları bulmana yardımcı olur.",
  "set.about.p3":
    "StandUp senin yerine karar vermez: ne yazacağına, neyi sileceğine ve kiminle paylaşacağına sen karar verirsin. Kayıtların bu sürümde cihazında kalır.",
  "set.about.p4":
    "StandUp profesyonel psikolojik, tıbbi veya hukuki danışmanlığın yerini almaz. Acil durumlarda lütfen 110, 112 veya „Acil yardım“ bölümündeki bir numarayı ara.",
  "set.about.p5":
    "Kötüye kullanım uyarısı: Uygulama ve listelenen telefon numaraları yalnızca gerçek yardım ve belgeleme içindir. Bilerek yapılan yanlış suçlamalar, sahte belgeler, iftira, başkalarının verilerini izinsiz paylaşmak veya asılsız acil aramalar hukuki sonuçlar doğurabilir.",
  "set.about.version": "Prototip sürüm 0.1.",
};

const ar: Dict = {
  "common.back": "رجوع",
  "nav.start": "الرئيسية",
  "nav.diary": "اليوميات",
  "nav.info": "معلومات",
  "nav.settings": "الإعدادات",
  "nav.quickOpen": "فتح الإجراءات السريعة",
  "home.night": "تصبح على خير",
  "home.morning": "صباح الخير",
  "home.day": "مرحباً",
  "home.evening": "مساء الخير",
  "home.notAlone": "لست وحدك.",
  "home.howHelp": "كيف يمكننا مساعدتك؟",
  "home.c1.t": "حدث لي شيء",
  "home.c1.d": "وثّق الحادثة واحصل على مساعدة",
  "home.c2.t": "أريد مساعدة شخص ما",
  "home.c2.d": "دعم للأصدقاء وزملاء الدراسة والعمل",
  "home.c3.t": "حوادثي",
  "home.c3.d": "اعرض الحوادث الموثّقة حتى الآن",
  "home.overview": "نظرة عامة",
  "home.entries": "المدخلات",
  "home.evidence": "الأدلة",
  "home.open": "مفتوح",
  "home.last": "آخر",
  "home.noDesc": "لا يوجد وصف",
  "home.nextStep": "الخطوة التالية",
  "home.quick": "وصول سريع",
  "home.q1": "الاستشارة والمساعدة",
  "home.q2": "الحقوق والمعلومات",
  "home.q3": "هل هذا تنمّر؟",
  "home.q4": "مساعدة طارئة",
  "home.privacy.t": "بياناتك ملك لك",
  "home.privacy.d":
    "تعامل مع المعلومات الشخصية بسرية، بما في ذلك معلومات الآخرين. في هذه النسخة تُحفظ مدخلاتك محلياً على هذا الجهاز فقط. أنت تقرر ما تكتبه ومع من تشاركه.",
  "home.privacy.link": "عرض إعدادات الخصوصية",
  "home.disclaimer":
    "لا يحل StandUp محل الاستشارة النفسية أو القانونية المهنية ولا يتخذ قرارات قانونية ملزمة.",
  "qa.title": "ماذا تريد أن تفعل؟",
  "qa.close": "إغلاق",
  "qa.menuClose": "إغلاق القائمة",
  "qa.label": "إجراءات سريعة",
  "qa.a1.t": "توثيق حادثة",
  "qa.a1.s": "سجّل ما حدث.",
  "qa.a2.t": "إضافة دليل",
  "qa.a2.s": "احفظ شيئاً متعلقاً بحادثة.",
  "qa.a3.t": "أحتاج مساعدة الآن",
  "qa.a3.s": "اعثر على خطوة تالية مناسبة.",
  "qa.a4.t": "هل هذا تنمّر؟",
  "qa.a4.s": "قيّم الموقف بعدة أسئلة.",
  "qa.a5.t": "البحث عن استشارة",
  "qa.a5.s": "اعثر على الدعم المناسب.",
  "qa.diary": "فتح اليوميات",
  "set.title": "الإعدادات",
  "set.privacy.t": "الخصوصية",
  "set.privacy.d":
    "في هذه النسخة التجريبية تبقى مدخلاتك محلياً في متصفحك. لا يتم إرسالها إلى خادم ولا يوجد تشفير بعد. شارك معلومات عن الآخرين فقط عند الضرورة.",
  "set.data.t": "البيانات المحفوظة",
  "set.data.d": "{entries} · {evidence} على هذا الجهاز.",
  "set.entriesOne": "مدخل واحد",
  "set.entriesMany": "{n} مدخلات",
  "set.evidenceOne": "دليل واحد",
  "set.evidenceMany": "{n} أدلة",
  "set.delete.t": "حذف البيانات",
  "set.delete.d": "يمكنك حذف كل المدخلات في أي وقت. لا يمكن التراجع عن ذلك.",
  "set.delete.btn": "حذف كل البيانات",
  "set.delete.yes": "نعم، احذف كل البيانات",
  "set.delete.cancel": "إلغاء",
  "set.a11y.t": "إمكانية الوصول",
  "set.a11y.d":
    "يستخدم StandUp خطاً كبيراً وتبايناً واضحاً ومساحات لمس كبيرة. يمكنك أيضاً تعديل حجم الخط في إعدادات جهازك.",
  "set.lang.t": "اللغة",
  "set.lang.d": "اختر لغتك. يتغيّر التطبيق فوراً. المحتوى غير المترجم يبقى بالألمانية.",
  "set.lang.aria": "اختيار اللغة",
  "set.about.t": "حول StandUp",
  "set.about.p1":
    "StandUp تطبيق للأشخاص الذين يتعرضون للتنمّر أو التمييز أو الإهانة أو التهديد أو مواقف مرهقة أخرى – في المدرسة أو العمل أو الإنترنت أو الحياة الخاصة.",
  "set.about.p2":
    "يساعدك التطبيق على تقييم المواقف وتوثيق الحوادث بشكل منظّم وجمع الأدلة ورؤية التسلسل الزمني وإعداد رسائل لأشخاص تثق بهم وإيجاد مراكز الاستشارة وأرقام الطوارئ.",
  "set.about.p3":
    "StandUp لا يقرر عنك: أنت تحدد ما تكتبه وما تحذفه ومع من تشاركه. تبقى مدخلاتك في هذه النسخة على جهازك.",
  "set.about.p4":
    "لا يحل StandUp محل الاستشارة النفسية أو الطبية أو القانونية المهنية. في الحالات الطارئة اتصل بـ 110 أو 112 أو رقم من قسم «مساعدة طارئة».",
  "set.about.p5":
    "تنبيه بشأن إساءة الاستخدام: التطبيق والأرقام المذكورة مخصصة فقط للمساعدة والتوثيق الحقيقيين. إساءة الاستخدام – مثل الاتهامات الكاذبة عمداً أو التوثيق المزوّر أو التشهير أو نشر بيانات الآخرين دون إذن أو المكالمات الطارئة بلا سبب – قد تترتب عليها عواقب قانونية.",
  "set.about.version": "نسخة تجريبية 0.1.",
};

const ru: Dict = {
  "common.back": "Назад",
  "nav.start": "Главная",
  "nav.diary": "Дневник",
  "nav.info": "Информация",
  "nav.settings": "Настройки",
  "nav.quickOpen": "Открыть быстрые действия",
  "home.night": "Доброй ночи",
  "home.morning": "Доброе утро",
  "home.day": "Здравствуйте",
  "home.evening": "Добрый вечер",
  "home.notAlone": "Вы не одни.",
  "home.howHelp": "Чем мы можем помочь?",
  "home.c1.t": "Со мной что-то произошло",
  "home.c1.d": "Задокументировать случай и получить помощь",
  "home.c2.t": "Я хочу помочь кому-то",
  "home.c2.d": "Поддержка для друзей, одноклассников и коллег",
  "home.c3.t": "Мои случаи",
  "home.c3.d": "Посмотреть задокументированные случаи",
  "home.overview": "Ваш обзор",
  "home.entries": "Записи",
  "home.evidence": "Доказательства",
  "home.open": "Открыто",
  "home.last": "Последнее",
  "home.noDesc": "Нет описания",
  "home.nextStep": "Следующий шаг",
  "home.quick": "Быстрый доступ",
  "home.q1": "Консультация и помощь",
  "home.q2": "Права и информация",
  "home.q3": "Это буллинг?",
  "home.q4": "Экстренная помощь",
  "home.privacy.t": "Ваши данные принадлежат вам",
  "home.privacy.d":
    "Обращайтесь с личной информацией конфиденциально — в том числе с чужой. В этой версии записи хранятся только локально на устройстве. Вы решаете, что записывать и с кем делиться.",
  "home.privacy.link": "Открыть настройки конфиденциальности",
  "home.disclaimer":
    "StandUp не заменяет профессиональную психологическую или юридическую консультацию и не принимает обязательных правовых решений.",
  "qa.title": "Что вы хотите сделать?",
  "qa.close": "Закрыть",
  "qa.menuClose": "Закрыть меню",
  "qa.label": "Быстрые действия",
  "qa.a1.t": "Задокументировать случай",
  "qa.a1.s": "Запишите, что произошло.",
  "qa.a2.t": "Добавить доказательство",
  "qa.a2.s": "Сохраните материал к случаю.",
  "qa.a3.t": "Мне нужна помощь сейчас",
  "qa.a3.s": "Найдите подходящий следующий шаг.",
  "qa.a4.t": "Это буллинг?",
  "qa.a4.s": "Оцените ситуацию по нескольким вопросам.",
  "qa.a5.t": "Найти консультацию",
  "qa.a5.s": "Найдите подходящую поддержку.",
  "qa.diary": "Открыть дневник",
  "set.title": "Настройки",
  "set.privacy.t": "Конфиденциальность",
  "set.privacy.d":
    "В этой прототип-версии записи остаются локально в браузере. Передачи на сервер нет, шифрование пока не встроено. Делитесь данными других людей только при необходимости.",
  "set.data.t": "Сохранённые данные",
  "set.data.d": "{entries} · {evidence} на этом устройстве.",
  "set.entriesOne": "1 запись",
  "set.entriesMany": "{n} записей",
  "set.evidenceOne": "1 доказательство",
  "set.evidenceMany": "{n} доказательств",
  "set.delete.t": "Удалить данные",
  "set.delete.d": "Вы можете удалить все записи в любой момент. Это необратимо.",
  "set.delete.btn": "Удалить все данные",
  "set.delete.yes": "Да, удалить все данные",
  "set.delete.cancel": "Отмена",
  "set.a11y.t": "Доступность",
  "set.a11y.d":
    "StandUp использует крупный шрифт, чёткий контраст и большие области нажатия. Размер шрифта можно также изменить в настройках устройства.",
  "set.lang.t": "Язык",
  "set.lang.d": "Выберите язык. Приложение переключится сразу. Непереведённые тексты остаются на немецком.",
  "set.lang.aria": "Выбрать язык",
  "set.about.t": "О StandUp",
  "set.about.p1":
    "StandUp — приложение для людей, которые сталкиваются с буллингом, дискриминацией, оскорблениями, угрозами или другими тяжёлыми ситуациями: в школе, на работе, онлайн или в личной жизни.",
  "set.about.p2":
    "Приложение помогает оценить ситуацию, структурированно документировать случаи, собирать доказательства, видеть хронологию, готовить сообщения доверенным людям и находить консультации и экстренные номера.",
  "set.about.p3":
    "StandUp ничего не решает за вас: вы выбираете, что записать, что удалить и с кем поделиться. Записи остаются на этом устройстве.",
  "set.about.p4":
    "StandUp не заменяет профессиональную психологическую, медицинскую или юридическую помощь. В экстренной ситуации звоните 110, 112 или по номеру из раздела «Экстренная помощь».",
  "set.about.p5":
    "Важно о злоупотреблении: приложение и указанные номера предназначены только для реальной помощи и документирования. Злоупотребление — заведомо ложные обвинения, поддельная документация, клевета, передача чужих данных без разрешения или беспричинные экстренные звонки — может иметь правовые последствия.",
  "set.about.version": "Прототип версии 0.1.",
};

const uk: Dict = {
  "common.back": "Назад",
  "nav.start": "Головна",
  "nav.diary": "Щоденник",
  "nav.info": "Інформація",
  "nav.settings": "Налаштування",
  "nav.quickOpen": "Відкрити швидкі дії",
  "home.night": "Доброї ночі",
  "home.morning": "Доброго ранку",
  "home.day": "Вітаємо",
  "home.evening": "Доброго вечора",
  "home.notAlone": "Ви не самі.",
  "home.howHelp": "Чим ми можемо допомогти?",
  "home.c1.t": "Зі мною щось сталося",
  "home.c1.d": "Задокументувати випадок і отримати допомогу",
  "home.c2.t": "Я хочу комусь допомогти",
  "home.c2.d": "Підтримка для друзів, однокласників і колег",
  "home.c3.t": "Мої випадки",
  "home.c3.d": "Переглянути задокументовані випадки",
  "home.overview": "Ваш огляд",
  "home.entries": "Записи",
  "home.evidence": "Докази",
  "home.open": "Відкрито",
  "home.last": "Востаннє",
  "home.noDesc": "Без опису",
  "home.nextStep": "Наступний крок",
  "home.quick": "Швидкий доступ",
  "home.q1": "Консультація та допомога",
  "home.q2": "Права та інформація",
  "home.q3": "Це булінг?",
  "home.q4": "Екстрена допомога",
  "home.privacy.t": "Ваші дані належать вам",
  "home.privacy.d":
    "Поводьтеся з особистою інформацією конфіденційно — зокрема з чужою. У цій версії записи зберігаються лише локально на пристрої. Ви вирішуєте, що записувати і з ким ділитися.",
  "home.privacy.link": "Переглянути налаштування приватності",
  "home.disclaimer":
    "StandUp не замінює професійну психологічну чи юридичну консультацію і не ухвалює обов’язкових правових рішень.",
  "qa.title": "Що ви хочете зробити?",
  "qa.close": "Закрити",
  "qa.menuClose": "Закрити меню",
  "qa.label": "Швидкі дії",
  "qa.a1.t": "Задокументувати випадок",
  "qa.a1.s": "Запишіть, що сталося.",
  "qa.a2.t": "Додати доказ",
  "qa.a2.s": "Збережіть матеріал до випадку.",
  "qa.a3.t": "Мені потрібна допомога зараз",
  "qa.a3.s": "Знайдіть відповідний наступний крок.",
  "qa.a4.t": "Це булінг?",
  "qa.a4.s": "Оцініть ситуацію за кількома питаннями.",
  "qa.a5.t": "Знайти консультацію",
  "qa.a5.s": "Знайдіть відповідну підтримку.",
  "qa.diary": "Відкрити щоденник",
  "set.title": "Налаштування",
  "set.privacy.t": "Приватність",
  "set.privacy.d":
    "У цій прототип-версії записи залишаються локально у браузері. Передавання на сервер відсутнє, шифрування ще немає. Діліться даними інших людей лише за потреби.",
  "set.data.t": "Збережені дані",
  "set.data.d": "{entries} · {evidence} на цьому пристрої.",
  "set.entriesOne": "1 запис",
  "set.entriesMany": "{n} записів",
  "set.evidenceOne": "1 доказ",
  "set.evidenceMany": "{n} доказів",
  "set.delete.t": "Видалити дані",
  "set.delete.d": "Ви можете видалити всі записи будь-коли. Це не можна скасувати.",
  "set.delete.btn": "Видалити всі дані",
  "set.delete.yes": "Так, видалити всі дані",
  "set.delete.cancel": "Скасувати",
  "set.a11y.t": "Доступність",
  "set.a11y.d":
    "StandUp використовує великий шрифт, чіткий контраст і великі зони дотику. Розмір шрифту можна змінити й у налаштуваннях пристрою.",
  "set.lang.t": "Мова",
  "set.lang.d": "Оберіть мову. Застосунок переключиться одразу. Неперекладені тексти залишаються німецькою.",
  "set.lang.aria": "Обрати мову",
  "set.about.t": "Про StandUp",
  "set.about.p1":
    "StandUp — застосунок для людей, які стикаються з булінгом, дискримінацією, образами, погрозами чи іншими важкими ситуаціями: у школі, на роботі, онлайн або в приватному житті.",
  "set.about.p2":
    "Застосунок допомагає оцінити ситуацію, структуровано документувати випадки, збирати докази, бачити хронологію, готувати повідомлення довіреним людям і знаходити консультації та екстрені номери.",
  "set.about.p3":
    "StandUp нічого не вирішує за вас: ви обираєте, що записати, що видалити і з ким поділитися. Записи залишаються на цьому пристрої.",
  "set.about.p4":
    "StandUp не замінює професійну психологічну, медичну чи юридичну допомогу. В екстреній ситуації телефонуйте 110, 112 або за номером із розділу «Екстрена допомога».",
  "set.about.p5":
    "Важливо про зловживання: застосунок і вказані номери призначені лише для справжньої допомоги та документування. Зловживання — свідомо неправдиві звинувачення, підроблена документація, наклеп, передавання чужих даних без дозволу чи безпідставні екстрені дзвінки — може мати правові наслідки.",
  "set.about.version": "Прототип версії 0.1.",
};

const pl: Dict = {
  "common.back": "Wstecz",
  "nav.start": "Start",
  "nav.diary": "Dziennik",
  "nav.info": "Informacje",
  "nav.settings": "Ustawienia",
  "nav.quickOpen": "Otwórz szybkie akcje",
  "home.night": "Dobrej nocy",
  "home.morning": "Dzień dobry",
  "home.day": "Cześć",
  "home.evening": "Dobry wieczór",
  "home.notAlone": "Nie jesteś sam.",
  "home.howHelp": "Jak możemy Ci pomóc?",
  "home.c1.t": "Coś mi się przydarzyło",
  "home.c1.d": "Udokumentuj zdarzenie i uzyskaj pomoc",
  "home.c2.t": "Chcę komuś pomóc",
  "home.c2.d": "Wsparcie dla przyjaciół, kolegów ze szkoły i pracy",
  "home.c3.t": "Moje zdarzenia",
  "home.c3.d": "Zobacz dotychczas udokumentowane zdarzenia",
  "home.overview": "Twój przegląd",
  "home.entries": "Wpisy",
  "home.evidence": "Dowody",
  "home.open": "Otwarte",
  "home.last": "Ostatnio",
  "home.noDesc": "Brak opisu",
  "home.nextStep": "Następny krok",
  "home.quick": "Szybki dostęp",
  "home.q1": "Poradnictwo i pomoc",
  "home.q2": "Prawa i informacje",
  "home.q3": "Czy to mobbing?",
  "home.q4": "Pomoc w nagłych wypadkach",
  "home.privacy.t": "Twoje dane należą do Ciebie",
  "home.privacy.d":
    "Traktuj dane osobowe poufnie – także dane innych osób. W tej wersji wpisy są zapisywane tylko lokalnie na tym urządzeniu. Ty decydujesz, co zapisujesz i komu to udostępniasz.",
  "home.privacy.link": "Zobacz ustawienia prywatności",
  "home.disclaimer":
    "StandUp nie zastępuje profesjonalnej porady psychologicznej ani prawnej i nie podejmuje wiążących decyzji prawnych.",
  "qa.title": "Co chcesz zrobić?",
  "qa.close": "Zamknij",
  "qa.menuClose": "Zamknij menu",
  "qa.label": "Szybkie akcje",
  "qa.a1.t": "Udokumentuj zdarzenie",
  "qa.a1.s": "Zapisz, co się stało.",
  "qa.a2.t": "Dodaj dowód",
  "qa.a2.s": "Zapisz coś do zdarzenia.",
  "qa.a3.t": "Potrzebuję teraz pomocy",
  "qa.a3.s": "Znajdź odpowiedni następny krok.",
  "qa.a4.t": "Czy to mobbing?",
  "qa.a4.s": "Oceń sytuację za pomocą kilku pytań.",
  "qa.a5.t": "Znajdź poradnictwo",
  "qa.a5.s": "Znajdź odpowiednie wsparcie.",
  "qa.diary": "Otwórz dziennik",
  "set.title": "Ustawienia",
  "set.privacy.t": "Prywatność",
  "set.privacy.d":
    "W tej wersji prototypowej wpisy pozostają lokalnie w przeglądarce. Nie są przesyłane na serwer, szyfrowanie nie jest jeszcze wbudowane. Dane innych osób udostępniaj tylko, gdy to konieczne.",
  "set.data.t": "Zapisane dane",
  "set.data.d": "{entries} · {evidence} na tym urządzeniu.",
  "set.entriesOne": "1 wpis",
  "set.entriesMany": "{n} wpisów",
  "set.evidenceOne": "1 dowód",
  "set.evidenceMany": "{n} dowodów",
  "set.delete.t": "Usuń dane",
  "set.delete.d": "Możesz w każdej chwili usunąć wszystkie wpisy. Tego nie da się cofnąć.",
  "set.delete.btn": "Usuń wszystkie dane",
  "set.delete.yes": "Tak, usuń wszystkie dane",
  "set.delete.cancel": "Anuluj",
  "set.a11y.t": "Dostępność",
  "set.a11y.d":
    "StandUp używa dużej czcionki, wyraźnego kontrastu i dużych pól dotykowych. Rozmiar czcionki możesz zmienić także w ustawieniach urządzenia.",
  "set.lang.t": "Język",
  "set.lang.d": "Wybierz język. Aplikacja przełączy się natychmiast. Nieprzetłumaczone treści pozostają po niemiecku.",
  "set.lang.aria": "Wybierz język",
  "set.about.t": "O StandUp",
  "set.about.p1":
    "StandUp to aplikacja dla osób, które doświadczają mobbingu, dyskryminacji, zniewag, gróźb lub innych trudnych sytuacji – w szkole, w pracy, online lub prywatnie.",
  "set.about.p2":
    "Aplikacja pomaga ocenić sytuację, uporządkowanie dokumentować zdarzenia, zbierać dowody, zobaczyć chronologię, przygotować wiadomości do osób zaufanych oraz znaleźć poradnie i numery alarmowe.",
  "set.about.p3":
    "StandUp nie decyduje za Ciebie: sam wybierasz, co zapisujesz, co usuwasz i komu udostępniasz. Wpisy pozostają na tym urządzeniu.",
  "set.about.p4":
    "StandUp nie zastępuje profesjonalnej pomocy psychologicznej, medycznej ani prawnej. W nagłych wypadkach dzwoń pod 110, 112 lub numer z sekcji „Pomoc w nagłych wypadkach”.",
  "set.about.p5":
    "Ważna uwaga o nadużyciach: aplikacja i podane numery służą wyłącznie do prawdziwej pomocy i dokumentacji. Nadużycia – świadomie fałszywe oskarżenia, sfałszowana dokumentacja, zniesławienie, przekazywanie danych innych osób bez zgody lub bezpodstawne telefony alarmowe – mogą mieć skutki prawne.",
  "set.about.version": "Wersja prototypowa 0.1.",
};

const fr: Dict = {
  "common.back": "Retour",
  "nav.start": "Accueil",
  "nav.diary": "Journal",
  "nav.info": "Infos",
  "nav.settings": "Réglages",
  "nav.quickOpen": "Ouvrir les actions rapides",
  "home.night": "Bonne nuit",
  "home.morning": "Bonjour",
  "home.day": "Bonjour",
  "home.evening": "Bonsoir",
  "home.notAlone": "Tu n'es pas seul·e.",
  "home.howHelp": "Comment pouvons-nous t'aider ?",
  "home.c1.t": "Il m'est arrivé quelque chose",
  "home.c1.d": "Documenter un incident et obtenir de l'aide",
  "home.c2.t": "Je veux aider quelqu'un",
  "home.c2.d": "Soutien pour des amis, camarades et collègues",
  "home.c3.t": "Mes incidents",
  "home.c3.d": "Voir les incidents déjà documentés",
  "home.overview": "Ton aperçu",
  "home.entries": "Entrées",
  "home.evidence": "Preuves",
  "home.open": "Ouvert",
  "home.last": "Dernier",
  "home.noDesc": "Pas de description",
  "home.nextStep": "Prochaine étape",
  "home.quick": "Accès rapide",
  "home.q1": "Conseil et aide",
  "home.q2": "Droits et informations",
  "home.q3": "Est-ce du harcèlement ?",
  "home.q4": "Aide d'urgence",
  "home.privacy.t": "Tes informations t'appartiennent",
  "home.privacy.d":
    "Traite les informations personnelles de manière confidentielle – y compris celles des autres. Dans cette version, tes entrées sont enregistrées uniquement sur cet appareil. Tu décides de ce que tu notes et avec qui tu le partages.",
  "home.privacy.link": "Voir les réglages de confidentialité",
  "home.disclaimer":
    "StandUp ne remplace pas un conseil psychologique ou juridique professionnel et ne prend aucune décision juridique contraignante.",
  "qa.title": "Que souhaites-tu faire ?",
  "qa.close": "Fermer",
  "qa.menuClose": "Fermer le menu",
  "qa.label": "Actions rapides",
  "qa.a1.t": "Documenter un incident",
  "qa.a1.s": "Note ce qui s'est passé.",
  "qa.a2.t": "Ajouter une preuve",
  "qa.a2.s": "Enregistre un élément lié à un incident.",
  "qa.a3.t": "J'ai besoin d'aide maintenant",
  "qa.a3.s": "Trouve une prochaine étape adaptée.",
  "qa.a4.t": "Est-ce du harcèlement ?",
  "qa.a4.s": "Évalue la situation avec quelques questions.",
  "qa.a5.t": "Trouver un conseil",
  "qa.a5.s": "Trouve le soutien adapté.",
  "qa.diary": "Ouvrir le journal",
  "set.title": "Réglages",
  "set.privacy.t": "Confidentialité",
  "set.privacy.d":
    "Dans cette version prototype, tes entrées restent localement dans ton navigateur. Aucune transmission vers un serveur, pas encore de chiffrement. Ne partage des informations sur d'autres personnes que si nécessaire.",
  "set.data.t": "Données enregistrées",
  "set.data.d": "{entries} · {evidence} sur cet appareil.",
  "set.entriesOne": "1 entrée",
  "set.entriesMany": "{n} entrées",
  "set.evidenceOne": "1 preuve",
  "set.evidenceMany": "{n} preuves",
  "set.delete.t": "Supprimer les données",
  "set.delete.d": "Tu peux supprimer toutes les entrées à tout moment. C'est irréversible.",
  "set.delete.btn": "Supprimer toutes les données",
  "set.delete.yes": "Oui, tout supprimer",
  "set.delete.cancel": "Annuler",
  "set.a11y.t": "Accessibilité",
  "set.a11y.d":
    "StandUp utilise de grandes polices, des contrastes clairs et de grandes zones tactiles. Tu peux aussi ajuster la taille du texte dans les réglages de ton appareil.",
  "set.lang.t": "Langue",
  "set.lang.d": "Choisis ta langue. L'app change immédiatement. Les contenus non traduits restent en allemand.",
  "set.lang.aria": "Choisir la langue",
  "set.about.t": "À propos de StandUp",
  "set.about.p1":
    "StandUp est une app pour les personnes confrontées au harcèlement, à la discrimination, aux insultes, aux menaces ou à d'autres situations difficiles – à l'école, au travail, en ligne ou dans la vie privée.",
  "set.about.p2":
    "L'app t'aide à évaluer les situations, documenter les incidents de façon structurée, rassembler des preuves, visualiser une chronologie, préparer des messages à des personnes de confiance et trouver des services de conseil et numéros d'urgence.",
  "set.about.p3":
    "StandUp ne décide rien à ta place : tu choisis ce que tu notes, ce que tu supprimes et avec qui tu partages. Tes entrées restent sur cet appareil.",
  "set.about.p4":
    "StandUp ne remplace pas un accompagnement psychologique, médical ou juridique professionnel. En cas d'urgence, appelle le 110, le 112 ou un numéro de la section « Aide d'urgence ».",
  "set.about.p5":
    "Remarque importante sur les abus : l'app et les numéros indiqués servent uniquement à une aide et une documentation réelles. Les abus – fausses accusations délibérées, documentation falsifiée, diffamation, transmission de données d'autrui sans autorisation ou appels d'urgence injustifiés – peuvent avoir des conséquences juridiques.",
  "set.about.version": "Version prototype 0.1.",
};

const es: Dict = {
  "common.back": "Atrás",
  "nav.start": "Inicio",
  "nav.diary": "Diario",
  "nav.info": "Información",
  "nav.settings": "Ajustes",
  "nav.quickOpen": "Abrir acciones rápidas",
  "home.night": "Buenas noches",
  "home.morning": "Buenos días",
  "home.day": "Hola",
  "home.evening": "Buenas tardes",
  "home.notAlone": "No estás solo.",
  "home.howHelp": "¿Cómo podemos ayudarte?",
  "home.c1.t": "Me ha pasado algo",
  "home.c1.d": "Documentar un incidente y recibir ayuda",
  "home.c2.t": "Quiero ayudar a alguien",
  "home.c2.d": "Apoyo para amigos, compañeros de clase y de trabajo",
  "home.c3.t": "Mis incidentes",
  "home.c3.d": "Ver los incidentes documentados hasta ahora",
  "home.overview": "Tu resumen",
  "home.entries": "Entradas",
  "home.evidence": "Pruebas",
  "home.open": "Abierto",
  "home.last": "Último",
  "home.noDesc": "Sin descripción",
  "home.nextStep": "Siguiente paso",
  "home.quick": "Acceso rápido",
  "home.q1": "Asesoramiento y ayuda",
  "home.q2": "Derechos e información",
  "home.q3": "¿Esto es acoso?",
  "home.q4": "Ayuda de emergencia",
  "home.privacy.t": "Tus datos son tuyos",
  "home.privacy.d":
    "Trata la información personal de forma confidencial, también la de otras personas. En esta versión tus entradas se guardan solo localmente en este dispositivo. Tú decides qué escribes y con quién lo compartes.",
  "home.privacy.link": "Ver ajustes de privacidad",
  "home.disclaimer":
    "StandUp no sustituye el asesoramiento psicológico o jurídico profesional ni toma decisiones legales vinculantes.",
  "qa.title": "¿Qué quieres hacer?",
  "qa.close": "Cerrar",
  "qa.menuClose": "Cerrar menú",
  "qa.label": "Acciones rápidas",
  "qa.a1.t": "Documentar un incidente",
  "qa.a1.s": "Registra lo que ha pasado.",
  "qa.a2.t": "Añadir prueba",
  "qa.a2.s": "Guarda algo sobre un incidente.",
  "qa.a3.t": "Necesito ayuda ahora",
  "qa.a3.s": "Encuentra un siguiente paso adecuado.",
  "qa.a4.t": "¿Esto es acoso?",
  "qa.a4.s": "Valora la situación con algunas preguntas.",
  "qa.a5.t": "Buscar asesoramiento",
  "qa.a5.s": "Encuentra el apoyo adecuado.",
  "qa.diary": "Abrir diario",
  "set.title": "Ajustes",
  "set.privacy.t": "Privacidad",
  "set.privacy.d":
    "En esta versión prototipo tus entradas permanecen localmente en tu navegador. No hay transmisión a un servidor ni cifrado todavía. Comparte datos de otras personas solo si es realmente necesario.",
  "set.data.t": "Datos guardados",
  "set.data.d": "{entries} · {evidence} en este dispositivo.",
  "set.entriesOne": "1 entrada",
  "set.entriesMany": "{n} entradas",
  "set.evidenceOne": "1 prueba",
  "set.evidenceMany": "{n} pruebas",
  "set.delete.t": "Borrar datos",
  "set.delete.d": "Puedes eliminar todas las entradas en cualquier momento. No se puede deshacer.",
  "set.delete.btn": "Borrar todos los datos",
  "set.delete.yes": "Sí, borrar todo",
  "set.delete.cancel": "Cancelar",
  "set.a11y.t": "Accesibilidad",
  "set.a11y.d":
    "StandUp usa letra grande, contrastes claros y áreas táctiles amplias. También puedes ajustar el tamaño del texto en los ajustes de tu dispositivo.",
  "set.lang.t": "Idioma",
  "set.lang.d": "Elige tu idioma. La app cambia de inmediato. Los contenidos sin traducir siguen en alemán.",
  "set.lang.aria": "Elegir idioma",
  "set.about.t": "Sobre StandUp",
  "set.about.p1":
    "StandUp es una app para personas que sufren acoso, discriminación, insultos, amenazas u otras situaciones difíciles: en la escuela, en el trabajo, en línea o en el ámbito privado.",
  "set.about.p2":
    "La app te ayuda a valorar situaciones, documentar incidentes de forma estructurada, reunir pruebas, ver una cronología, preparar mensajes para personas de confianza y encontrar centros de asesoramiento y números de emergencia.",
  "set.about.p3":
    "StandUp no decide por ti: tú eliges qué escribes, qué borras y con quién lo compartes. Tus entradas permanecen en este dispositivo.",
  "set.about.p4":
    "StandUp no sustituye la atención psicológica, médica o jurídica profesional. En una emergencia llama al 110, al 112 o a un número de la sección «Ayuda de emergencia».",
  "set.about.p5":
    "Aviso importante sobre el uso indebido: la app y los números indicados son solo para ayuda y documentación reales. El uso indebido —acusaciones falsas deliberadas, documentación falsificada, difamación, difundir datos de otras personas sin permiso o llamadas de emergencia infundadas— puede tener consecuencias legales.",
  "set.about.version": "Versión prototipo 0.1.",
};

const it: Dict = {
  "common.back": "Indietro",
  "nav.start": "Home",
  "nav.diary": "Diario",
  "nav.info": "Info",
  "nav.settings": "Impostazioni",
  "nav.quickOpen": "Apri azioni rapide",
  "home.night": "Buona notte",
  "home.morning": "Buongiorno",
  "home.day": "Ciao",
  "home.evening": "Buonasera",
  "home.notAlone": "Non sei solo.",
  "home.howHelp": "Come possiamo aiutarti?",
  "home.c1.t": "Mi è successo qualcosa",
  "home.c1.d": "Documenta un episodio e ricevi aiuto",
  "home.c2.t": "Voglio aiutare qualcuno",
  "home.c2.d": "Sostegno per amici, compagni di classe e colleghi",
  "home.c3.t": "I miei episodi",
  "home.c3.d": "Vedi gli episodi documentati finora",
  "home.overview": "Il tuo riepilogo",
  "home.entries": "Voci",
  "home.evidence": "Prove",
  "home.open": "Aperti",
  "home.last": "Ultimo",
  "home.noDesc": "Nessuna descrizione",
  "home.nextStep": "Prossimo passo",
  "home.quick": "Accesso rapido",
  "home.q1": "Consulenza e aiuto",
  "home.q2": "Diritti e informazioni",
  "home.q3": "È bullismo?",
  "home.q4": "Aiuto d'emergenza",
  "home.privacy.t": "I tuoi dati sono tuoi",
  "home.privacy.d":
    "Tratta le informazioni personali in modo riservato, anche quelle di altre persone. In questa versione le tue voci restano solo su questo dispositivo. Decidi tu cosa scrivere e con chi condividerlo.",
  "home.privacy.link": "Vedi impostazioni sulla privacy",
  "home.disclaimer":
    "StandUp non sostituisce una consulenza psicologica o legale professionale e non prende decisioni legali vincolanti.",
  "qa.title": "Cosa vuoi fare?",
  "qa.close": "Chiudi",
  "qa.menuClose": "Chiudi menu",
  "qa.label": "Azioni rapide",
  "qa.a1.t": "Documenta un episodio",
  "qa.a1.s": "Annota cosa è successo.",
  "qa.a2.t": "Aggiungi una prova",
  "qa.a2.s": "Salva qualcosa relativo a un episodio.",
  "qa.a3.t": "Ho bisogno di aiuto adesso",
  "qa.a3.s": "Trova un prossimo passo adatto.",
  "qa.a4.t": "È bullismo?",
  "qa.a4.s": "Valuta la situazione con alcune domande.",
  "qa.a5.t": "Trova consulenza",
  "qa.a5.s": "Trova il supporto adatto.",
  "qa.diary": "Apri diario",
  "set.title": "Impostazioni",
  "set.privacy.t": "Privacy",
  "set.privacy.d":
    "In questa versione prototipo le voci restano localmente nel browser. Non c'è trasmissione a un server e non c'è ancora crittografia. Condividi dati di altre persone solo se necessario.",
  "set.data.t": "Dati salvati",
  "set.data.d": "{entries} · {evidence} su questo dispositivo.",
  "set.entriesOne": "1 voce",
  "set.entriesMany": "{n} voci",
  "set.evidenceOne": "1 prova",
  "set.evidenceMany": "{n} prove",
  "set.delete.t": "Elimina dati",
  "set.delete.d": "Puoi eliminare tutte le voci in qualsiasi momento. L'operazione è irreversibile.",
  "set.delete.btn": "Elimina tutti i dati",
  "set.delete.yes": "Sì, elimina tutto",
  "set.delete.cancel": "Annulla",
  "set.a11y.t": "Accessibilità",
  "set.a11y.d":
    "StandUp usa caratteri grandi, contrasti chiari e ampie aree touch. Puoi modificare la dimensione del testo anche nelle impostazioni del dispositivo.",
  "set.lang.t": "Lingua",
  "set.lang.d": "Scegli la lingua. L'app cambia subito. I contenuti non tradotti restano in tedesco.",
  "set.lang.aria": "Scegli la lingua",
  "set.about.t": "Informazioni su StandUp",
  "set.about.p1":
    "StandUp è un'app per chi subisce bullismo, discriminazione, insulti, minacce o altre situazioni difficili: a scuola, al lavoro, online o in privato.",
  "set.about.p2":
    "L'app ti aiuta a valutare le situazioni, documentare gli episodi in modo strutturato, raccogliere prove, vedere una cronologia, preparare messaggi per persone di fiducia e trovare centri di consulenza e numeri di emergenza.",
  "set.about.p3":
    "StandUp non decide al posto tuo: scegli tu cosa scrivere, cosa cancellare e con chi condividere. Le tue voci restano su questo dispositivo.",
  "set.about.p4":
    "StandUp non sostituisce assistenza psicologica, medica o legale professionale. In caso di emergenza chiama il 110, il 112 o un numero della sezione «Aiuto d'emergenza».",
  "set.about.p5":
    "Nota importante sull'abuso: l'app e i numeri indicati servono solo per aiuto e documentazione reali. Gli abusi – accuse consapevolmente false, documentazione falsificata, diffamazione, diffusione di dati altrui senza permesso o chiamate d'emergenza infondate – possono avere conseguenze legali.",
  "set.about.version": "Versione prototipo 0.1.",
};

export const translations: Record<string, Dict> = { de, en, tr, ar, ru, uk, pl, fr, es, it };

/** Sprachen, für die eine Übersetzung vorliegt. */
export const supportedLanguages = Object.keys(translations);

const rtlLanguages = new Set(["ar", "fa", "he", "ur"]);

export function languageLabel(code: string, uiLocale: string) {
  try {
    return new Intl.DisplayNames([uiLocale], { type: "language" }).of(code) ?? code;
  } catch {
    return code;
  }
}

type I18nCtx = {
  lang: string;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const { prefs } = usePreferences();
  const lang = supportedLanguages.includes(prefs.language) ? prefs.language : "de";

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = rtlLanguages.has(lang) ? "rtl" : "ltr";
  }, [lang]);

  const value = useMemo<I18nCtx>(() => {
    const dict = translations[lang] ?? {};
    return {
      lang,
      t: (key, vars) => {
        let text = dict[key] ?? de[key] ?? String(key);
        if (vars) {
          for (const [k, v] of Object.entries(vars)) {
            text = text.replaceAll(`{${k}}`, String(v));
          }
        }
        return text;
      },
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n muss innerhalb von I18nProvider verwendet werden");
  return ctx;
}
