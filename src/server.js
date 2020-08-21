import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

import './data/i18n.js';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
const gh = NODE_ENV === 'gh';

polka() // You can also use Express
	.use(
    gh ? 'wcag-em-report-tool/sapper-preview' : '/',
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
