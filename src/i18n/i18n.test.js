import keys from './keys';
import languages from '.';

function languageTest(lang) {
  test(lang + ' exists', () => {
    expect(languages).toHaveProperty(lang);
  });

  test(lang + ' has required keys', () => {
    for (const key of keys) expect(languages[lang]).toHaveProperty(key);
  });

  test(lang + ' has no unknown keys', () => {
    for (const key in languages[lang]) expect(keys).toContain(key);
  });
}

languageTest('en_gb');
