const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3001;

app.use(express.json());

const notes = [
	{
		iId: 1,
		content: 'HTML is easy',
		date: '2019-05-30T17:30:31.098Z',
		important: true
	},
	{
		iId: 2,
		content: 'Browser can execute only Javascript',
		date: '2019-05-30T18:39:34.091Z',
		important: false
	},
	{
		iId: 3,
		content: 'GET and POST are the most important methods of HTTP protocol',
		date: '2019-05-30T19:20:14.298Z',
		important: true
	}
];

app.get('/api/notes', (req, res) => {
	res.json({
		notes,
		totalNotes: notes.length
	}).status(200);
});
app.get('/api/notes/:id', (req, res) => {
	const iId = Number(req.params.id);
	const note = notes.find((element) => element.iId === iId);
	res.status(200).json({
		note
	});
});
app.post('/api/notes', (req, res) => {
	const { body } = req;

	if (body.content) {
		const newNote = {
			iId: uuidv4(),
			content: body.content,
			date: new Date().toISOString,
			important: body.important || false

		};

		notes.unshift(newNote);
		res.status(200).json({
			newNote
		});
	} else {
		res.status(400).json({
			error: 'Falta el content'
		});
	}
});
app.listen(port, () => {
	console.log('Server running on port', port);
});
