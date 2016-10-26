const manageTranslations = require('react-intl-translations-manager').default;

manageTranslations({
  messagesDirectory: 'langpack/src',
  translationsDirectory: 'langpack/locales',
  languages: ['en'], // any language you need
  singleMessagesFile: false
});
