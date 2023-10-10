if (typeof window !== 'undefined') {
  if (!localStorage.debug) {
    localStorage.debug = process.env.NODE_ENV === 'development' ? 'app:*' : 'app:error,app:fatal,app:info';
  }

  if (!window.log) {
    const consoleBonded = console.log.bind(console);

    const debug = require('debug');
    window.log = {
      error: debug('app:error'),
      warn: debug('app:warn'),
      info: debug('app:info'),
      debug: debug('app:debug'),
      fatal: debug('app:fatal'),
    };

    Object.values(window.log).forEach(_log => (_log.log = consoleBonded));
  }
}
