import fetch from 'node-fetch';

export async function get(req, res, next) {
	fetch('https://cms.atale.me/items/wallpapers?fields=id,name,preview&sort=-date', {
		headers: {
			'Authorization': `Bearer ${process.env.DIRECTUS_BEARER}`,
			'User-Agent': 'Majestic/1.0 (+https://atale.me/go/ua)'
		}
	})
		.then(res => res.json())
		.then((data: { data: [{ id: string, name: string, preview: string }]}) => {
			res
				.writeHead(200, {
					'Content-Type': 'application/json'
				})
				.end(JSON.stringify({
					status: 200,
					date: new Date().toString(),
					data: data.data
				}))
		})
		.catch(() => {
			res
				.writeHead(400, {
					'Content-Type': 'application/json',
				})
				.end(JSON.stringify({
					status: 400,
					date: new Date().toString(),
					data: []
				}));
		})
}