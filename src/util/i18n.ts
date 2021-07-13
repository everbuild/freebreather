import { createI18n } from 'vue-i18n';
import en from '../assets/i18n/en';
import nl from '../assets/i18n/nl';

const i18n = createI18n({
  locale: navigator.language,
  fallbackLocale: 'en',
  messages: { en, nl },
});

export default i18n;