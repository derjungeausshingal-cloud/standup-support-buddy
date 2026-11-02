import type { Lang, PageDict } from "./types";

/** Safety copy overrides earlier prototype promises in every supported language. */
export const privacy: Record<Lang, PageDict> = {
  de: {
    "privacy.pilot":
      "Testversion: Bitte nur erfundene Beispieldaten eingeben. Noch nicht für echte Vorfälle im Schulpiloten freigegeben.",
    "set.privacy.d":
      "Nach der Einrichtung werden Vorfälle und Einstellungen mit deinem Passwort verschlüsselt in diesem Browserprofil gespeichert. Der Schlüssel bleibt nur in der entsperrten Sitzung im Arbeitsspeicher. Es gibt keine automatische Sicherung oder garantierte Aufbewahrung.",
    "privacy.device":
      "Sperre die App, bevor du das Gerät weitergibst. Sie sperrt automatisch nach fünf Minuten ohne Bedienung und beim Wechsel in den Hintergrund. Ohne Passwort gibt es keine Wiederherstellung. Browserdaten zu löschen kann den Tresor dauerhaft entfernen. Schadsoftware oder bösartige Skripte können während einer entsperrten Sitzung weiterhin Daten lesen.",
    "privacy.network":
      "Die App lädt Schriften vom Gerät und leitet Fehlerdetails nicht an die optionalen Lovable-Meldehooks weiter. Beim Abruf der Website verarbeitet der Hostinganbieter Verbindungsdaten. Externe Beratungslinks führen zu anderen Anbietern mit eigenen Datenschutzregeln.",
    "privacy.sharing":
      "Einträge werden von der App nicht automatisch an Schule, Lehrkräfte oder Beratungsstellen gesendet oder von ihnen überwacht. Beim Kopieren oder Drucken entstehen zusätzliche Kopien, die „Alle Daten löschen“ nicht entfernen kann.",
    "privacy.drafts":
      "Ungespeicherte Entwürfe bleiben nur in der entsperrten Sitzung. Beim Sperren, Neuladen oder Schließen gehen sie verloren. Die Beweis-Demo sichert keine Dateien oder Aufnahmen.",
    "home.privacy.d":
      "Testversion: Nutze nur erfundene Beispiele. Deine lokalen Einträge und Einstellungen werden nach Einrichtung des Tresors verschlüsselt. Sperre die App, wenn du sie verlässt. Niemand erhält oder überwacht Einträge automatisch.",
    "set.delete.d":
      "Entfernt Vorfälle einschließlich alter Speicherbestände, Entwürfe und Einstellungen in diesem Browserprofil. Nicht rückgängig zu machen. Gedruckte Berichte, die Zwischenablage und Kopien außerhalb der App bleiben bestehen.",
    "privacy.deleted":
      "Die lokalen App-Daten wurden entfernt. Einstellungen sind zurückgesetzt. Kopien außerhalb der App bleiben bestehen.",
    "privacy.storage.load":
      "Gespeicherte Daten konnten nicht sicher geladen werden. Sie werden nicht überschrieben. Speichern ist blockiert. Lade die App erneut; bleibt der Fehler bestehen, hole technische Hilfe. Löschen entfernt die lokalen App-Daten unwiderruflich.",
    "privacy.storage.save":
      "Nicht gespeichert: Der Browserspeicher ist voll oder nicht verfügbar. Deine Eingabe bleibt in der geöffneten App. Schließe oder lade die App nicht neu, bevor du sie gesichert hast. Versuche es erneut.",
    "privacy.storage.delete":
      "Die lokalen App-Daten konnten nicht vollständig gelöscht werden. Verlasse dich nicht auf eine vollständige Löschung. Versuche es erneut oder entferne die Website-Daten in den Browsereinstellungen.",
    "privacy.storage.conflict":
      "Die gespeicherten Daten wurden außerhalb dieser Ansicht geändert. Deine Änderung wurde nicht gespeichert. Sichere deine aktuelle Eingabe und lade die App neu.",
    "privacy.evidenceDemo": "Beweis-Demo: keine Dateisicherung",
    "privacy.evidenceDemoText":
      "Diese Schaltflächen erzeugen nur Beispielnamen. Es werden keine Fotos, Chats, Dateien oder Sprachnotizen ausgewählt, hochgeladen oder aufgenommen. Bewahre Originale an einem geeigneten sicheren Ort auf.",
    "privacy.demoAction": "Demo: {label}",
    "qa.a2.t": "Beweis-Demo ansehen",
    "qa.a2.s": "Nur Beispielnamen, keine Dateisicherung.",
    "set.about.p2":
      "Die App bietet eine Dokumentation von Beispielsituationen, ein Tagebuch, Textvorschläge und Hinweise auf Unterstützung. Die Beweisfunktion ist eine Demo ohne Dateisicherung.",
    "incident.evidence.voluntary.text":
      "Du kannst auch ohne Beweise Unterstützung bekommen. In dieser Testversion lassen sich nur Beispiele ausprobieren.",
    "incident.evidence.added.title": "Beweisnamen (Demo, keine Dateien)",
    "incident.save.row.evidence": "Beweisnamen (Demo)",
    "incident.save.localNotice":
      "Der Eintrag wird verschlüsselt in diesem Browserprofil gespeichert. Es gibt keine automatische Sicherung. Die Beweis-Demo speichert keine Originaldateien. Niemand erhält den Eintrag automatisch.",
    "incident.footnote":
      "Alle Angaben sind freiwillig. Ungespeicherte Entwürfe gehen beim Neuladen oder Schließen verloren.",
    "incident.help.saved.text":
      "Der Eintrag liegt lokal in diesem Browserprofil. Eine automatische Sicherung oder Weiterleitung gibt es nicht.",
    "home.evidence": "Beweisnamen (Demo)",
    "diary.evidence.one": "Beweisname (Demo)",
    "diary.evidence.other": "Beweisnamen (Demo)",
    "diary.entryPage.evidenceTitle": "Beweisnamen (Demo)",
    "diary.report.evidence": "Beweisnamen (Demo): {value}",
    "set.evidenceOne": "1 Beweisname (Demo)",
    "set.evidenceMany": "{n} Beweisnamen (Demo)",
  },
  en: {
    "privacy.pilot":
      "Test version: use fictional examples only. Not yet approved for real incidents in a school pilot.",
    "set.privacy.d":
      "After setup, incidents and settings are encrypted with your password in this browser profile. The key stays in memory only during an unlocked session. There is no automatic backup or guaranteed retention.",
    "privacy.device":
      "Lock the app before handing over your device. It locks after five minutes of inactivity and when moved to the background. There is no recovery without the password. Clearing browser data can permanently remove the vault. Malware or malicious scripts can still read data during an unlocked session.",
    "privacy.network":
      "The app uses device fonts and does not forward error details to optional Lovable reporting hooks. The hosting provider processes connection data when you open the website. External advice links lead to providers with their own privacy rules.",
    "privacy.sharing":
      "The app does not automatically send entries to or have them monitored by schools, teachers or advice services. Copying and printing create separate copies that “Delete all data” cannot remove.",
    "privacy.drafts":
      "Unsaved drafts exist only during the unlocked session. Locking, reloading or closing loses them. The evidence demo saves no files or recordings.",
    "home.privacy.d":
      "Test version: use fictional examples only. Your local entries and settings are encrypted after vault setup. Lock the app when leaving. Nobody receives or monitors entries automatically.",
    "set.delete.d":
      "Removes incidents including legacy storage, drafts and settings in this browser profile. Cannot be undone. Printed reports, clipboard contents and copies outside the app remain.",
    "privacy.deleted":
      "Local app data has been removed and settings reset. Copies outside the app remain.",
    "privacy.storage.load":
      "Saved data could not be loaded safely and will not be overwritten. Saving is blocked. Reload; if the error continues, seek technical help. Deletion permanently removes local app data.",
    "privacy.storage.save":
      "Not saved: browser storage is full or unavailable. Your input remains in the open app. Do not close or reload before keeping a safe copy. Try again.",
    "privacy.storage.delete":
      "Local app data could not be completely deleted. Do not rely on complete deletion. Retry or remove the website data in browser settings.",
    "privacy.storage.conflict":
      "Stored data changed outside this view. Your change was not saved. Keep a safe copy of your current input and reload.",
    "privacy.evidenceDemo": "Evidence demo: no file storage",
    "privacy.evidenceDemoText":
      "These buttons create example names only. No photos, chats, files or voice notes are selected, uploaded or recorded. Keep originals in a suitable safe place.",
    "privacy.demoAction": "Demo: {label}",
    "qa.a2.t": "View evidence demo",
    "qa.a2.s": "Example names only; no file storage.",
    "set.about.p2":
      "The app offers documentation of example situations, a journal, message suggestions and guidance on support. The evidence feature is a demo with no file storage.",
    "incident.evidence.voluntary.text":
      "You can get support without evidence. This test version lets you try examples only.",
    "incident.evidence.added.title": "Evidence names (demo, no files)",
    "incident.save.row.evidence": "Evidence names (demo)",
    "incident.save.localNotice":
      "The entry is encrypted in this browser profile. There is no automatic backup. The evidence demo saves no original files. Nobody receives the entry automatically.",
    "incident.footnote":
      "All information is optional. Unsaved drafts are lost when you reload or close the app.",
    "incident.help.saved.text":
      "The entry is stored locally in this browser profile. There is no automatic backup or forwarding.",
    "home.evidence": "evidence names (demo)",
    "diary.evidence.one": "evidence name (demo)",
    "diary.evidence.other": "evidence names (demo)",
    "diary.entryPage.evidenceTitle": "evidence names (demo)",
    "diary.report.evidence": "Evidence names (demo): {value}",
    "set.evidenceOne": "1 evidence name (demo)",
    "set.evidenceMany": "{n} evidence names (demo)",
  },
  tr: {
    "privacy.pilot":
      "Test sürümü: Yalnızca hayali örnekler girin. Okul pilotunda gerçek olaylar için henüz onaylanmadı.",
    "set.privacy.d":
      "Kurulumdan sonra olaylar ve ayarlar bu tarayıcı profilinde parolanızla şifrelenir. Anahtar yalnızca kilidi açık oturumda bellekte kalır. Otomatik yedekleme veya saklama garantisi yoktur.",
    "privacy.device":
      "Cihazı vermeden önce uygulamayı kilitleyin. Beş dakika işlem yapılmadığında veya arka plana geçince kilitlenir. Parola olmadan kurtarma yoktur. Tarayıcı verilerini silmek kasayı kalıcı silebilir. Zararlı yazılımlar veya betikler kilit açıkken verileri okuyabilir.",
    "privacy.network":
      "Uygulama cihazın yazı tiplerini kullanır ve hata ayrıntılarını isteğe bağlı Lovable bildirim işlevlerine iletmez. Site açıldığında barındırma sağlayıcısı bağlantı verilerini işler. Dış danışma bağlantılarının kendi gizlilik kuralları vardır.",
    "privacy.sharing":
      "Kayıtlar okula, öğretmenlere veya danışma merkezlerine otomatik gönderilmez ve onlar tarafından izlenmez. Kopyalama ve yazdırma, “Tüm verileri sil” ile silinemeyen ayrı kopyalar oluşturur.",
    "privacy.drafts":
      "Kaydedilmemiş taslaklar yalnızca kilidi açık oturumda kalır. Kilitleme, yenileme veya kapatma ile kaybolur. Kanıt demosu dosya veya ses saklamaz.",
    "home.privacy.d":
      "Test sürümü: Yalnızca hayali örnekler kullanın. Yerel kayıtlar ve ayarlar kasa kurulduktan sonra şifrelenir. Ayrılırken kilitleyin. Kayıtlar otomatik gönderilmez veya izlenmez.",
    "set.delete.d":
      "Bu profildeki olayları, eski kayıtları, taslakları ve ayarları kaldırır. Geri alınamaz. Yazdırılan raporlar, pano ve uygulama dışındaki kopyalar kalır.",
    "privacy.deleted":
      "Yerel uygulama verileri kaldırıldı, ayarlar sıfırlandı. Uygulama dışındaki kopyalar kalır.",
    "privacy.storage.load":
      "Kayıtlar güvenle yüklenemedi; üzerine yazılmayacak. Kaydetme engellendi. Yenileyin; sorun sürerse teknik yardım alın. Silme, yerel verileri kalıcı kaldırır.",
    "privacy.storage.save":
      "Kaydedilmedi: Tarayıcı depolaması dolu veya kullanılamıyor. Girdiniz açık uygulamada kalır. Güvenli bir kopya almadan kapatmayın veya yenilemeyin. Tekrar deneyin.",
    "privacy.storage.delete":
      "Yerel veriler tamamen silinemedi. Tam silinmeye güvenmeyin. Tekrar deneyin veya tarayıcı ayarlarından site verilerini kaldırın.",
    "privacy.storage.conflict":
      "Kayıtlar bu görünüm dışında değişti. Değişikliğiniz kaydedilmedi. Girdinizi güvenli şekilde kopyalayıp yenileyin.",
    "privacy.evidenceDemo": "Kanıt demosu: Dosyalar saklanmaz",
    "privacy.evidenceDemoText":
      "Düğmeler yalnızca örnek adlar oluşturur. Fotoğraf, sohbet, dosya veya ses seçilmez, yüklenmez ya da kaydedilmez. Asılları uygun, güvenli bir yerde saklayın.",
    "privacy.demoAction": "Demo: {label}",
    "qa.a2.t": "Kanıt demosunu gör",
    "qa.a2.s": "Yalnızca örnek adlar; dosya saklanmaz.",
    "set.about.p2":
      "Uygulama örnek olayları belgeleme, günlük, mesaj önerileri ve destek bilgileri sunar. Kanıt işlevi dosya saklamayan bir demodur.",
    "incident.evidence.voluntary.text":
      "Kanıt olmadan da destek alabilirsiniz. Bu test sürümünde yalnızca örnekleri deneyebilirsiniz.",
    "incident.evidence.added.title": "Kanıt adları (demo, dosya yok)",
    "incident.save.row.evidence": "Kanıt adları (demo)",
    "incident.save.localNotice":
      "Kayıt bu tarayıcı profilinde şifrelenir. Otomatik yedekleme yoktur. Kanıt demosu asıl dosyaları saklamaz. Kayıt kimseye otomatik gönderilmez.",
    "incident.footnote":
      "Tüm bilgiler isteğe bağlıdır. Kaydedilmemiş taslaklar yenileme veya kapatma ile kaybolur.",
    "incident.help.saved.text":
      "Kayıt bu tarayıcı profilinde yereldir. Otomatik yedekleme veya iletme yoktur.",
    "home.evidence": "kanıt adları (demo)",
    "diary.evidence.one": "kanıt adı (demo)",
    "diary.evidence.other": "kanıt adları (demo)",
    "diary.entryPage.evidenceTitle": "kanıt adları (demo)",
    "diary.report.evidence": "Kanıt adları (demo): {value}",
    "set.evidenceOne": "1 kanıt adı (demo)",
    "set.evidenceMany": "{n} kanıt adı (demo)",
  },
  ar: {
    "privacy.pilot":
      "نسخة تجريبية: استخدم أمثلة خيالية فقط. لم تُعتمد بعد للحوادث الحقيقية في تجربة مدرسية.",
    "set.privacy.d":
      "بعد الإعداد تُشفّر الحوادث والإعدادات بكلمة مرورك في ملف هذا المتصفح. يبقى المفتاح في الذاكرة خلال الجلسة المفتوحة فقط. لا يوجد نسخ احتياطي تلقائي أو ضمان للاحتفاظ.",
    "privacy.device":
      "اقفل التطبيق قبل إعطاء الجهاز لشخص آخر. يُقفل بعد خمس دقائق دون استخدام وعند الانتقال للخلفية. لا استعادة دون كلمة المرور. قد يمحو مسح بيانات المتصفح الخزنة نهائياً. قد تقرأ البرمجيات أو النصوص الخبيثة البيانات أثناء فتح القفل.",
    "privacy.network":
      "يستخدم التطبيق خطوط الجهاز ولا يرسل تفاصيل الأخطاء إلى وظائف الإبلاغ الاختيارية في Lovable. يعالج مزود الاستضافة بيانات الاتصال عند فتح الموقع. روابط الاستشارة الخارجية لها سياسات خصوصية خاصة بها.",
    "privacy.sharing":
      "لا يرسل التطبيق السجلات تلقائياً إلى المدرسة أو المعلمين أو جهات الاستشارة ولا يراقبونها. ينشئ النسخ والطباعة نسخاً منفصلة لا يحذفها «حذف جميع البيانات».",
    "privacy.drafts":
      "تبقى المسودات غير المحفوظة في الجلسة المفتوحة فقط. تضيع عند القفل أو إعادة التحميل أو الإغلاق. لا يحفظ عرض الأدلة ملفات أو تسجيلات.",
    "home.privacy.d":
      "نسخة تجريبية: أمثلة خيالية فقط. تُشفّر السجلات والإعدادات المحلية بعد إعداد الخزنة. اقفل التطبيق عند المغادرة. لا يتلقى أحد السجلات أو يراقبها تلقائياً.",
    "set.delete.d":
      "يحذف الحوادث والبيانات القديمة والمسودات والإعدادات في ملف هذا المتصفح دون إمكانية التراجع. تبقى التقارير المطبوعة والحافظة والنسخ خارج التطبيق.",
    "privacy.deleted":
      "حُذفت بيانات التطبيق المحلية وأُعيد ضبط الإعدادات. تبقى النسخ خارج التطبيق.",
    "privacy.storage.load":
      "تعذر تحميل البيانات بأمان ولن تُستبدل. الحفظ محظور. أعد التحميل؛ إن استمر الخطأ اطلب مساعدة تقنية. الحذف يزيل البيانات المحلية نهائياً.",
    "privacy.storage.save":
      "لم يُحفظ: تخزين المتصفح ممتلئ أو غير متاح. تبقى المدخلات في التطبيق المفتوح. لا تغلقه أو تعِد تحميله قبل الاحتفاظ بنسخة آمنة. حاول مجدداً.",
    "privacy.storage.delete":
      "تعذر حذف كل البيانات المحلية. لا تعتمد على اكتمال الحذف. حاول مجدداً أو امسح بيانات الموقع من إعدادات المتصفح.",
    "privacy.storage.conflict":
      "تغيرت البيانات خارج هذه الصفحة. لم تُحفظ تغييراتك. احتفظ بنسخة آمنة من مدخلاتك وأعد التحميل.",
    "privacy.evidenceDemo": "عرض تجريبي للأدلة: لا تُحفظ الملفات",
    "privacy.evidenceDemoText":
      "تُنشئ الأزرار أسماء أمثلة فقط. لا تُختار أو تُرفع صور أو محادثات أو ملفات، ولا يُسجل صوت. احتفظ بالأصول في مكان آمن مناسب.",
    "privacy.demoAction": "عرض تجريبي: {label}",
    "qa.a2.t": "عرض الأدلة التجريبي",
    "qa.a2.s": "أسماء أمثلة فقط دون حفظ ملفات.",
    "set.about.p2":
      "يقدم التطبيق توثيق أمثلة ومذكرات واقتراحات رسائل ومعلومات عن الدعم. وظيفة الأدلة تجريبية ولا تحفظ ملفات.",
    "incident.evidence.voluntary.text":
      "يمكنك طلب الدعم دون أدلة. تتيح هذه النسخة تجربة أمثلة فقط.",
    "incident.evidence.added.title": "أسماء الأدلة (عرض تجريبي دون ملفات)",
    "incident.save.row.evidence": "أسماء الأدلة (تجريبية)",
    "incident.save.localNotice":
      "يُحفظ السجل مشفراً في ملف هذا المتصفح. لا يوجد نسخ احتياطي تلقائي. لا يحفظ عرض الأدلة الملفات الأصلية. لا يتلقى أحد السجل تلقائياً.",
    "incident.footnote":
      "كل المعلومات اختيارية. تضيع المسودات غير المحفوظة عند إعادة التحميل أو الإغلاق.",
    "incident.help.saved.text":
      "السجل محلي في ملف المتصفح هذا. لا يوجد نسخ احتياطي أو إرسال تلقائي.",
    "home.evidence": "أسماء الأدلة (تجريبية)",
    "diary.evidence.one": "اسم دليل (تجريبي)",
    "diary.evidence.other": "أسماء الأدلة (تجريبية)",
    "diary.entryPage.evidenceTitle": "أسماء الأدلة (تجريبية)",
    "diary.report.evidence": "أسماء الأدلة (تجريبية): {value}",
    "set.evidenceOne": "اسم دليل واحد (تجريبي)",
    "set.evidenceMany": "{n} أسماء أدلة (تجريبية)",
  },
  ru: {
    "privacy.pilot":
      "Тестовая версия: вводите только вымышленные примеры. Для реальных случаев в школьном пилоте пока не одобрена.",
    "set.privacy.d":
      "После настройки случаи и настройки шифруются вашим паролем в этом профиле браузера. Ключ остаётся в памяти только во время разблокированного сеанса. Нет автоматической резервной копии или гарантии хранения.",
    "privacy.device":
      "Блокируйте приложение перед передачей устройства. Оно блокируется после пяти минут бездействия и при переходе в фон. Без пароля восстановление невозможно. Очистка браузера может навсегда удалить хранилище. Вредоносные программы или скрипты могут читать данные при снятой блокировке.",
    "privacy.network":
      "Приложение использует шрифты устройства и не передаёт подробности ошибок необязательным функциям отчётности Lovable. При открытии сайта хостинг обрабатывает данные соединения. Внешние консультационные сайты имеют свои правила конфиденциальности.",
    "privacy.sharing":
      "Приложение не отправляет записи школе, учителям или консультантам автоматически; они их не отслеживают. Копирование и печать создают отдельные копии, которые «Удалить все данные» не удаляет.",
    "privacy.drafts":
      "Несохранённые черновики остаются только в разблокированном сеансе. Блокировка, перезагрузка или закрытие их удаляет. Демо не сохраняет файлы или записи.",
    "home.privacy.d":
      "Тестовая версия: только вымышленные примеры. Локальные записи и настройки шифруются после настройки хранилища. Блокируйте приложение при уходе. Никто автоматически не получает и не отслеживает записи.",
    "set.delete.d":
      "Удаляет случаи, старые данные, черновики и настройки этого профиля браузера. Отменить нельзя. Распечатки, буфер обмена и копии вне приложения остаются.",
    "privacy.deleted":
      "Локальные данные приложения удалены, настройки сброшены. Копии вне приложения остаются.",
    "privacy.storage.load":
      "Не удалось безопасно загрузить данные; они не будут перезаписаны. Сохранение заблокировано. Перезагрузите; если ошибка остаётся, обратитесь за технической помощью. Удаление необратимо.",
    "privacy.storage.save":
      "Не сохранено: хранилище браузера заполнено или недоступно. Ввод остаётся в открытом приложении. Не закрывайте и не перезагружайте без безопасной копии. Попробуйте снова.",
    "privacy.storage.delete":
      "Не удалось полностью удалить локальные данные. Не считайте удаление завершённым. Повторите или удалите данные сайта в настройках браузера.",
    "privacy.storage.conflict":
      "Данные изменились вне этой страницы. Ваше изменение не сохранено. Сделайте безопасную копию ввода и перезагрузите.",
    "privacy.evidenceDemo": "Демо доказательств: файлы не сохраняются",
    "privacy.evidenceDemoText":
      "Кнопки создают только примерные имена. Фото, чаты и файлы не выбираются и не загружаются, звук не записывается. Храните оригиналы в подходящем безопасном месте.",
    "privacy.demoAction": "Демо: {label}",
    "qa.a2.t": "Посмотреть демо доказательств",
    "qa.a2.s": "Только примерные имена, без файлов.",
    "set.about.p2":
      "Приложение предлагает документирование примеров, дневник, шаблоны сообщений и информацию о поддержке. Функция доказательств — демо без хранения файлов.",
    "incident.evidence.voluntary.text":
      "Поддержку можно получить и без доказательств. В этой тестовой версии можно пробовать только примеры.",
    "incident.evidence.added.title": "Имена доказательств (демо, без файлов)",
    "incident.save.row.evidence": "Имена доказательств (демо)",
    "incident.save.localNotice":
      "Запись хранится зашифрованной в этом профиле браузера. Автоматической резервной копии нет. Демо не сохраняет оригиналы файлов. Запись никому автоматически не отправляется.",
    "incident.footnote":
      "Все сведения добровольны. Несохранённые черновики теряются при перезагрузке или закрытии.",
    "incident.help.saved.text":
      "Запись хранится локально в этом профиле браузера. Нет автоматической резервной копии или отправки.",
    "home.evidence": "имена доказательств (демо)",
    "diary.evidence.one": "имя доказательства (демо)",
    "diary.evidence.other": "имена доказательств (демо)",
    "diary.entryPage.evidenceTitle": "имена доказательств (демо)",
    "diary.report.evidence": "Имена доказательств (демо): {value}",
    "set.evidenceOne": "1 имя доказательства (демо)",
    "set.evidenceMany": "{n} имён доказательств (демо)",
  },
};
